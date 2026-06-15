import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCmsMenu, type MenuLocation, type MenuNode } from "@/hooks/useCmsMenu";
import { ICON_NAMES } from "@/lib/cms/iconMap";
import { ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react";

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
  const [location, setLocation] = useState<MenuLocation>("primary_nav");
  const { data, isLoading } = useCmsMenu(location);
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["cms-menu", location] });

  const move = async (item: MenuNode, dir: -1 | 1) => {
    const siblings = item.parent_id
      ? flattenFindChildren(data?.tree ?? [], item.parent_id)
      : data?.tree ?? [];
    const idx = siblings.findIndex((s) => s.id === item.id);
    const swap = siblings[idx + dir];
    if (!swap) return;
    await supabase.from("menu_items").update({ position: swap.position }).eq("id", item.id);
    await supabase.from("menu_items").update({ position: item.position }).eq("id", swap.id);
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item and its children?")) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); refresh(); }
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
      // append at end
      const siblings = parentId
        ? flattenFindChildren(data.tree, parentId)
        : data.tree;
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

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Menus</h1>
          <p className="text-sm text-muted-foreground">
            Manage navigation items. Toggle <em>Mega trigger</em> for top-level items that open a
            multi-column panel, and <em>Column group</em> for child nodes that act as headings
            inside a mega panel.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value as MenuLocation)}
          >
            {LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
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
              <ul className="space-y-1">
                {data!.tree.map((n) => (
                  <MenuRow
                    key={n.id}
                    node={n}
                    depth={0}
                    onEdit={(node) => setEditing(toDraft(node))}
                    onAddChild={(parent) => setEditing(blankDraft(parent.id))}
                    onMove={move}
                    onDelete={remove}
                  />
                ))}
              </ul>
            )}
          </Card>
        )}

        {editing && (
          <Card className="p-6 space-y-3">
            <h3 className="font-semibold text-sm">
              {editing.id ? "Edit item" : "New item"}
              {editing.parent_id && <span className="text-muted-foreground"> (child)</span>}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs">Label</label>
                <Input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs">URL / path</label>
                <Input value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} placeholder="/about-us" />
              </div>
              <div className="space-y-1">
                <label className="text-xs">Icon</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                  value={editing.icon}
                  onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                >
                  <option value="">(none)</option>
                  {ICON_NAMES.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs">Description</label>
                <Input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_mega_trigger} onChange={(e) => setEditing({ ...editing, is_mega_trigger: e.target.checked })} />
                Mega trigger
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_column_group} onChange={(e) => setEditing({ ...editing, is_column_group: e.target.checked })} />
                Column group
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.open_in_new_tab} onChange={(e) => setEditing({ ...editing, open_in_new_tab: e.target.checked })} />
                Open in new tab
              </label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => saveDraft(editing.parent_id)} disabled={!editing.label.trim()}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

function blankDraft(parent_id: string | null): Draft {
  return { label: "", url: "", icon: "", description: "", is_mega_trigger: false, is_column_group: false, open_in_new_tab: false, parent_id };
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
function flattenFindChildren(tree: MenuNode[], parentId: string): MenuNode[] {
  for (const n of tree) {
    if (n.id === parentId) return n.children;
    const r = flattenFindChildren(n.children, parentId);
    if (r.length) return r;
  }
  return [];
}

const MenuRow = ({
  node, depth, onEdit, onAddChild, onMove, onDelete,
}: {
  node: MenuNode;
  depth: number;
  onEdit: (n: MenuNode) => void;
  onAddChild: (parent: MenuNode) => void;
  onMove: (n: MenuNode, dir: -1 | 1) => void;
  onDelete: (id: string) => void;
}) => (
  <li>
    <div className="flex items-center gap-2 py-1.5 rounded hover:bg-muted/30 px-2" style={{ paddingLeft: depth * 20 + 8 }}>
      <span className="flex-1 text-sm">
        {node.label}
        {node.is_mega_trigger && <span className="ml-2 text-[10px] uppercase text-accent">mega</span>}
        {node.is_column_group && <span className="ml-2 text-[10px] uppercase text-muted-foreground">column</span>}
        {node.url && <span className="ml-2 text-xs font-mono text-muted-foreground">{node.url}</span>}
      </span>
      <Button size="icon" variant="ghost" onClick={() => onMove(node, -1)}><ChevronUp className="h-4 w-4" /></Button>
      <Button size="icon" variant="ghost" onClick={() => onMove(node, 1)}><ChevronDown className="h-4 w-4" /></Button>
      <Button size="sm" variant="ghost" onClick={() => onAddChild(node)}><Plus className="h-3 w-3" /> Child</Button>
      <Button size="sm" variant="ghost" onClick={() => onEdit(node)}>Edit</Button>
      <Button size="icon" variant="ghost" onClick={() => onDelete(node.id)}><Trash2 className="h-4 w-4" /></Button>
    </div>
    {node.children.length > 0 && (
      <ul>
        {node.children.map((c) => (
          <MenuRow key={c.id} node={c} depth={depth + 1} onEdit={onEdit} onAddChild={onAddChild} onMove={onMove} onDelete={onDelete} />
        ))}
      </ul>
    )}
  </li>
);

export default AdminMenus;