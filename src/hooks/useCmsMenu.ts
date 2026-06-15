import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MenuLocation =
  | "primary_nav"
  | "footer_col_1"
  | "footer_col_2"
  | "footer_col_3"
  | "footer_col_4"
  | "footer_col_5";

export type MenuItemRow = {
  id: string;
  menu_id: string;
  parent_id: string | null;
  label: string;
  url: string | null;
  page_id: string | null;
  icon: string | null;
  description: string | null;
  is_mega_trigger: boolean;
  is_column_group: boolean;
  open_in_new_tab: boolean;
  position: number;
};

export type MenuNode = MenuItemRow & { children: MenuNode[] };

function buildTree(items: MenuItemRow[]): MenuNode[] {
  const byId = new Map<string, MenuNode>();
  items.forEach((i) => byId.set(i.id, { ...i, children: [] }));
  const roots: MenuNode[] = [];
  byId.forEach((node) => {
    if (node.parent_id && byId.has(node.parent_id)) {
      byId.get(node.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  const sortRec = (arr: MenuNode[]) => {
    arr.sort((a, b) => a.position - b.position);
    arr.forEach((n) => sortRec(n.children));
  };
  sortRec(roots);
  return roots;
}

export function useCmsMenu(location: MenuLocation) {
  return useQuery({
    queryKey: ["cms-menu", location],
    queryFn: async (): Promise<{ menuId: string | null; tree: MenuNode[] }> => {
      const { data: menu } = await supabase
        .from("menus")
        .select("id")
        .eq("location", location)
        .maybeSingle();
      if (!menu) return { menuId: null, tree: [] };
      const { data: items } = await supabase
        .from("menu_items")
        .select(
          "id, menu_id, parent_id, label, url, page_id, icon, description, is_mega_trigger, is_column_group, open_in_new_tab, position",
        )
        .eq("menu_id", menu.id)
        .order("position", { ascending: true });
      return { menuId: menu.id, tree: buildTree((items as MenuItemRow[]) ?? []) };
    },
    staleTime: 30_000,
  });
}