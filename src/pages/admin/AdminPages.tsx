import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";


type PageRow = {
  id: string;
  path: string;
  title: string;
  section: string;
  parent_id: string | null;
};

const SECTION_LABELS: Record<string, string> = {
  features: "Features",
  resources: "Resources",
  free_tools: "Free Tools",
  company: "Company",
  legal: "Legal",
  none: "—",
};

const AdminPages = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-pages-list"],
    queryFn: async (): Promise<PageRow[]> => {
      const { data, error } = await supabase
        .from("pages")
        .select("id, path, title, section, parent_id")
        .order("section")
        .order("path");
      if (error) throw error;
      return data as PageRow[];
    },
  });

  const parentMap = new Map((data ?? []).map((p) => [p.id, p.path]));

  // Group rows by section for readability.
  const grouped = (data ?? []).reduce<Record<string, PageRow[]>>((acc, p) => {
    const key = p.section ?? "none";
    (acc[key] ||= []).push(p);
    return acc;
  }, {});
  const sectionOrder = ["features", "resources", "free_tools", "company", "legal", "none"];

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl">
        <h1 className="font-display text-2xl font-bold mb-2">Pages</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Click a page to edit its parent section and SEO. Page body content is managed in code.
        </p>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="space-y-8">
            {sectionOrder
              .filter((s) => grouped[s]?.length)
              .map((section) => (
                <div key={section}>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    {SECTION_LABELS[section] ?? section}
                  </h2>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40 text-left">
                        <tr>
                          <th className="px-4 py-2 font-medium">Title</th>
                          <th className="px-4 py-2 font-medium">Path</th>
                          <th className="px-4 py-2 font-medium">Parent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grouped[section].map((p) => (
                          <tr key={p.id} className="border-t border-border hover:bg-muted/20">
                            <td className="px-4 py-2">
                              <Link to={`/admin/pages/${p.id}`} className="text-accent hover:underline font-medium">
                                {p.title}
                              </Link>
                            </td>
                            <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{p.path}</td>
                            <td className="px-4 py-2 text-xs text-muted-foreground">
                              {p.parent_id ? parentMap.get(p.parent_id) ?? "—" : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPages;