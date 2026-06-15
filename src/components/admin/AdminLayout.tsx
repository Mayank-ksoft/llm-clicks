import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, MenuSquare, PanelBottom, FileText, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/menus", label: "Menus", icon: MenuSquare },
  { to: "/admin/footer", label: "Footer", icon: PanelBottom },
  { to: "/admin/pages", label: "Pages & SEO", icon: FileText },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Helmet>
        <title>Admin · LLMClicks CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <aside className="w-60 border-r border-border bg-card flex flex-col">
        <div className="px-5 py-4 border-b border-border">
          <p className="font-display font-bold text-lg">CMS</p>
          <p className="text-xs text-muted-foreground">LLMClicks Admin</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                )
              }
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40"
          >
            <ExternalLink className="h-4 w-4" /> View site
          </a>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;