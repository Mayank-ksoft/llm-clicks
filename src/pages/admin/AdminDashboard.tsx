import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { FileText, MenuSquare, PanelBottom } from "lucide-react";

const useCounts = () =>
  useQuery({
    queryKey: ["admin-dashboard-counts"],
    queryFn: async () => {
      const [pages, menuItems] = await Promise.all([
        supabase.from("pages").select("*", { count: "exact", head: true }),
        supabase.from("menu_items").select("*", { count: "exact", head: true }),
      ]);
      return {
        pages: pages.count ?? 0,
        menuItems: menuItems.count ?? 0,
      };
    },
  });

const AdminDashboard = () => {
  const { data } = useCounts();
  const tiles = [
    { to: "/admin/menus", label: "Menus", icon: MenuSquare, value: data?.menuItems ?? "—", sub: "menu items" },
    { to: "/admin/footer", label: "Footer", icon: PanelBottom, value: "5", sub: "widget columns" },
    { to: "/admin/pages", label: "Pages", icon: FileText, value: data?.pages ?? "—", sub: "indexed pages" },
  ];
  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl">
        <h1 className="font-display text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage navigation, footer widgets, and per-page SEO.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to}>
              <Card className="p-5 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <t.icon className="h-5 w-5 text-accent" />
                </div>
                <p className="text-2xl font-display font-bold">{t.value}</p>
                <p className="text-xs text-muted-foreground">{t.sub}</p>
                <p className="text-sm font-medium mt-3">{t.label} →</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;