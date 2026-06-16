import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCmsMenu, type MenuLocation, type MenuNode } from "@/hooks/useCmsMenu";
import { ICON_NAMES } from "@/lib/cms/iconMap";
import { Plus, Trash2, GripVertical, ChevronRight, ChevronDown } from "lucide-react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LOCATIONS: { value: MenuLocation; label: string }[] = [
  { value: "primary_nav", label: "Primary Navigation" },
  { value: "footer_col_1", label: "Footer · Column 1 (Product)" },
  { value: "footer_col_2", label: "Footer · Column 2 (Free Tools)" },
  { value: "footer_col_3", label: "Footer · Column 3 (Resources)" },
  { value: "footer_col_4", label: "Footer · Column 4 (Company)" },
  { value: "footer_col_5", label: "Footer · Column 5 (Legal)" },
];

type Draft = {
  id?: string;
  label: string;
  url: string;
  icon: string;
  description: string;
  is_mega_trigger: boolean;
  is_column_group: boolean;
  open_in_new_tab: boolean;
  parent_id: string | null;
};

const AdminMenus = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLocation = (searchParams.get("location") as MenuLocation) || "primary_nav";
  const [location, setLocation] = useState<MenuLocation>(initialLocation);

  useEffect(() => {
    const q = searchParams.get("location") as MenuLocation | null;
    if (q && q !== location) setLocation(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const { data, isLoading } = useCmsMenu(location);
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const refresh = () => qc.invalidateQueries({ queryKey: ["cms-menu", location] });

  const remove = async (id: string) => {
    if (!confirm("Delete this item and its children?")) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      refresh();
    }
  };

  const saveDraft = async (parentId: string | null) => {
    if (!editing) return;
    if (!data?.menuId) return toast.error("Menu not found");
    const payload = {
      menu_id: data.menuId,
      parent_id: parentId,
      label: editing.label,
      url: editing.url || null,
      icon: editing.icon || null,
      description: editing.description || null,
      is_mega_trigger: editing.is_mega_trigger,
      is_column_group: editing.is_column_group,
      open_in_new_tab: editing.open_in_new_tab,
    };
    if (editing.id) {
      const { error } = await supabase.from("menu_items").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
    } else {
      const siblings = parentId ? findChildrenById(data.tree, parentId) : data.tree;
      const nextPos = (siblings[siblings.length - 1]?.position ?? -1) + 1;
      const { error } = await supabase
        .from("menu_items")
        .insert({ ...payload, position: nextPos });
      if (error) return toast.error(error.message);
    }
    setEditing(null);
    refresh();
    toast.success("Saved");
  };

  // Reorder siblings via DnD — writes new positions to DB.
  const reorderSiblings = async (parentId: string | null, oldIndex: number, newIndex: number) => {
    if (!data) return;
    const siblings = parentId ? findChildrenById(data.tree, parentId) : data.tree;
    const reordered = arrayMove(siblings, oldIndex, newIndex);
    // Optimistic local update via React Query cache
    qc.setQueryData(["cms-menu", location], (old: any) => {
      if (!old) return old;
      const clone = structuredClone(old);
      const target = parentId ? findChildrenById(clone.tree, parentId) : clone.tree;
      const swapped = arrayMove(target, oldIndex, newIndex);
      // mutate in place
      if (parentId) {
        const parent = findNodeById(clone.tree, parentId);
        if (parent) parent.children = swapped.map((n: MenuNode, i: number) => ({ ...n, position: i }));
      } else {
        clone.tree = swapped.map((n: MenuNode, i: number) => ({ ...n, position: i }));
      }
      return clone;
    });
    // Persist new positions
    const updates = reordered.map((node, idx) =>
      supabase.from("menu_items").update({ position: idx }).eq("id", node.id),
    );
    const results = await Promise.all(updates);
    const err = results.find((r) => r.error);
    if (err?.error) {
      toast.error(err.error.message);
      refresh();
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Menus</h1>
          <p className="text-sm text-muted-foreground">
            Drag the handle to reorder items within the same parent. Use{" "}
            <em>Mega trigger</em> for top-level items that open a multi-column panel and{" "}
            <em>Column group</em> for child nodes that act as headings inside it.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={location}
            onChange={(e) => {
              const next = e.target.value as MenuLocation;
              setLocation(next);
              setSearchParams({ location: next });
            }}
          >
            {LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          <Button size="sm" onClick={() => setEditing(blankDraft(null))}>
            <Plus className="h-4 w-4 mr-1" /> Add top-level item
          </Button>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <Card className="p-4">
            {(data?.tree ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No items yet. Click "Add" above to create the first one.
              </p>
            ) : (
              <SortableTree
                nodes={data!.tree}
                parentId={null}
                depth={0}
                expanded={expanded}
                onToggleExpanded={(id) =>
                  setExpanded((s) => ({ ...s, [id]: !s[id] }))
                }
                onReorder={reorderSiblings}
                onEdit={(node) => setEditing(toDraft(node))}
                onAddChild={(parent) => setEditing(blankDraft(parent.id))}
                onDelete={remove}
              />
            )}
          </Card>
        )}

        {editing && (
          <Card className="p-6 space-y-3">
            <h3 className="font-semibold text-sm">
              {editing.id ? "Edit item" : "New item"}
              {editing.parent_id && (
                <span className="text-muted-foreground"> (child)</span>
              )}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs">Label</label>
                <Input
                  value={editing.label}
                  onChange={(e) => setEditing({ ...editing, label: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs">URL / path</label>
                <Input
                  value={editing.url}
                  onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                  placeholder="/about-us"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs">Icon</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                  value={editing.icon}
                  onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                >
                  <option value="">(none)</option>
                  {ICON_NAMES.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs">Description</label>
                <Input
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.is_mega_trigger}
                  onChange={(e) =>
                    setEditing({ ...editing, is_mega_trigger: e.target.checked })
                  }
                />
                Mega trigger
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.is_column_group}
                  onChange={(e) =>
                    setEditing({ ...editing, is_column_group: e.target.checked })
                  }
                />
                Column group
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.open_in_new_tab}
                  onChange={(e) =>
                    setEditing({ ...editing, open_in_new_tab: e.target.checked })
                  }
                />
                Open in new tab
              </label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => saveDraft(editing.parent_id)}
                disabled={!editing.label.trim()}
              >
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

/* ============================================================
 * Sortable tree (one DnD context per sibling list)
 * ============================================================ */

type RowProps = {
  node: MenuNode;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
  onToggleExpanded: (id: string) => void;
  onEdit: (n: MenuNode) => void;
  onAddChild: (parent: MenuNode) => void;
  onDelete: (id: string) => void;
};

const SortableRow = ({
  node,
  depth,
  isExpanded,
  hasChildren,
  onToggleExpanded,
  onEdit,
  onAddChild,
  onDelete,
}: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: node.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    paddingLeft: depth * 20 + 8,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 py-1.5 rounded hover:bg-muted/30 px-2"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <button
        onClick={() => hasChildren && onToggleExpanded(node.id)}
        className={`h-4 w-4 flex items-center justify-center ${
          hasChildren ? "text-muted-foreground hover:text-foreground" : "opacity-0"
        }`}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      >
        {isExpanded ? (
          <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
      </button>
      <span className="flex-1 text-sm">
        {node.label}
        {node.is_mega_trigger && (
          <span className="ml-2 text-[10px] uppercase text-accent">mega</span>
        )}
        {node.is_column_group && (
          <span className="ml-2 text-[10px] uppercase text-muted-foreground">
            column
          </span>
        )}
        {node.url && (
          <span className="ml-2 text-xs font-mono text-muted-foreground">
            {node.url}
          </span>
        )}
      </span>
      <Button size="sm" variant="ghost" onClick={() => onAddChild(node)}>
        <Plus className="h-3 w-3" /> Child
      </Button>
      <Button size="sm" variant="ghost" onClick={() => onEdit(node)}>
        Edit
      </Button>
      <Button size="icon" variant="ghost" onClick={() => onDelete(node.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const SortableTree = ({
  nodes,
  parentId,
  depth,
  expanded,
  onToggleExpanded,
  onReorder,
  onEdit,
  onAddChild,
  onDelete,
}: {
  nodes: MenuNode[];
  parentId: string | null;
  depth: number;
  expanded: Record<string, boolean>;
  onToggleExpanded: (id: string) => void;
  onReorder: (parentId: string | null, oldIndex: number, newIndex: number) => void;
  onEdit: (n: MenuNode) => void;
  onAddChild: (parent: MenuNode) => void;
  onDelete: (id: string) => void;
}) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const ids = useMemo(() => nodes.map((n) => n.id), [nodes]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = nodes.findIndex((n) => n.id === active.id);
    const newIndex = nodes.findIndex((n) => n.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onReorder(parentId, oldIndex, newIndex);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-0.5">
          {nodes.map((node) => {
            const isExpanded = expanded[node.id] ?? depth < 1;
            const hasChildren = node.children.length > 0;
            return (
              <div key={node.id}>
                <SortableRow
                  node={node}
                  depth={depth}
                  isExpanded={isExpanded}
                  hasChildren={hasChildren}
                  onToggleExpanded={onToggleExpanded}
                  onEdit={onEdit}
                  onAddChild={onAddChild}
                  onDelete={onDelete}
                />
                {hasChildren && isExpanded && (
                  <SortableTree
                    nodes={node.children}
                    parentId={node.id}
                    depth={depth + 1}
                    expanded={expanded}
                    onToggleExpanded={onToggleExpanded}
                    onReorder={onReorder}
                    onEdit={onEdit}
                    onAddChild={onAddChild}
                    onDelete={onDelete}
                  />
                )}
              </div>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

/* ============================================================
 * helpers
 * ============================================================ */

function blankDraft(parent_id: string | null): Draft {
  return {
    label: "",
    url: "",
    icon: "",
    description: "",
    is_mega_trigger: false,
    is_column_group: false,
    open_in_new_tab: false,
    parent_id,
  };
}
function toDraft(n: MenuNode): Draft {
  return {
    id: n.id,
    label: n.label,
    url: n.url ?? "",
    icon: n.icon ?? "",
    description: n.description ?? "",
    is_mega_trigger: n.is_mega_trigger,
    is_column_group: n.is_column_group,
    open_in_new_tab: n.open_in_new_tab,
    parent_id: n.parent_id,
  };
}
function findChildrenById(tree: MenuNode[], parentId: string): MenuNode[] {
  const n = findNodeById(tree, parentId);
  return n?.children ?? [];
}
function findNodeById(tree: MenuNode[], id: string): MenuNode | null {
  for (const n of tree) {
    if (n.id === id) return n;
    const r = findNodeById(n.children, id);
    if (r) return r;
  }
  return null;
}

export default AdminMenus;
