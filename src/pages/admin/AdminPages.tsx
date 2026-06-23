import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  BookOpen,
  Newspaper,
  Sparkles,
  Building2,
  Wrench,
  Layers,
  Home,
  Search,
  Hash,
} from "lucide-react";

type PageRow = {
  id: string;
  path: string;
  title: string;
  section: string;
  parent_id: string | null;
};

type CategoryKey =
  | "blog_posts"
  | "blog_categories"
  | "knowledge_hub"
  | "web_stories"
  | "docs"
  | "industries"
  | "features"
  | "free_tools"
  | "core";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  description: string;
  icon: typeof FileText;
  match: (p: PageRow) => boolean;
}[] = [
  {
    key: "blog_posts",
    label: "Blog Posts",
    description: "Individual articles published under /blog/…",
    icon: Newspaper,
    match: (p) =>
      p.path.startsWith("/blog/") && !p.path.startsWith("/blog/category/"),
  },
  {
    key: "blog_categories",
    label: "Blog Categories",
    description: "Blog category landing pages.",
    icon: Hash,
    match: (p) => p.path.startsWith("/blog/category/"),
  },
  {
    key: "knowledge_hub",
    label: "Knowledge Hub",
    description: "Knowledge Hub articles and category pages.",
    icon: BookOpen,
    match: (p) => p.path.startsWith("/knowledge-hub/"),
  },
  {
    key: "web_stories",
    label: "Web Stories",
    description: "AMP-style web story pages.",
    icon: Sparkles,
    match: (p) => p.path.startsWith("/web-stories/"),
  },
  {
    key: "docs",
    label: "Docs",
    description: "Documentation articles under /docs/…",
    icon: FileText,
    match: (p) => p.path.startsWith("/docs/"),
  },
  {
    key: "industries",
    label: "Industry Pages",
    description: "Per-industry landing pages.",
    icon: Building2,
    match: (p) => p.path.startsWith("/industries/"),
  },
  {
    key: "features",
    label: "Feature Pages",
    description: "Product feature pages.",
    icon: Layers,
    match: (p) => p.section === "features",
  },
  {
    key: "free_tools",
    label: "Free Tools",
    description: "Free public tool pages.",
    icon: Wrench,
    match: (p) => p.section === "free_tools",
  },
  {
    key: "core",
    label: "Core Pages",
    description: "Home, About, Pricing, Contact, Legal and other top-level pages.",
    icon: Home,
    match: () => true, // fallback – assigned last
  },
];

const categorize = (rows: PageRow[]) => {
  const buckets: Record<CategoryKey, PageRow[]> = {
    blog_posts: [],
    blog_categories: [],
    knowledge_hub: [],
    web_stories: [],
    docs: [],
    industries: [],
    features: [],
    free_tools: [],
    core: [],
  };
  for (const row of rows) {
    const cat = CATEGORIES.find((c) => c.key !== "core" && c.match(row));
    buckets[cat ? cat.key : "core"].push(row);
  }
  for (const key of Object.keys(buckets) as CategoryKey[]) {
    buckets[key].sort((a, b) => a.path.localeCompare(b.path));
  }
  return buckets;
};

const AdminPages = () => {
  const [activeTab, setActiveTab] = useState<CategoryKey>("blog_posts");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-pages-list"],
    queryFn: async (): Promise<PageRow[]> => {
      const { data, error } = await supabase
        .from("pages")
        .select("id, path, title, section, parent_id")
        .order("path");
      if (error) throw error;
      return data as PageRow[];
    },
  });

  const buckets = useMemo(() => categorize(data ?? []), [data]);

  const filteredRows = useMemo(() => {
    const rows = buckets[activeTab] ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.path.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q),
    );
  }, [buckets, activeTab, search]);

  const activeMeta = CATEGORIES.find((c) => c.key === activeTab)!;

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl">
        <h1 className="font-display text-2xl font-bold mb-2">Content &amp; SEO</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Content is grouped by type for easier navigation. Click a page to edit its
          parent section and SEO. Page body content is managed in code.
        </p>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as CategoryKey)}
            className="w-full"
          >
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/40 p-1">
              {CATEGORIES.map((c) => {
                const count = buckets[c.key].length;
                const Icon = c.icon;
                return (
                  <TabsTrigger
                    key={c.key}
                    value={c.key}
                    className="gap-2 data-[state=active]:bg-background"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{c.label}</span>
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 px-1.5 text-[10px]"
                    >
                      {count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {CATEGORIES.map((c) => (
              <TabsContent key={c.key} value={c.key} className="mt-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                      <activeMeta.icon className="h-5 w-5 text-accent" />
                      {activeMeta.label}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activeMeta.description}
                    </p>
                  </div>
                  <div className="relative w-72 max-w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search title or path…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-border overflow-hidden">
                  {filteredRows.length === 0 ? (
                    <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                      No pages in this section
                      {search ? " match your search." : " yet."}
                    </div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40 text-left">
                        <tr>
                          <th className="px-4 py-2 font-medium">Title</th>
                          <th className="px-4 py-2 font-medium">Path</th>
                          <th className="px-4 py-2 font-medium">Section</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRows.map((p) => (
                          <tr
                            key={p.id}
                            className="border-t border-border hover:bg-muted/20"
                          >
                            <td className="px-4 py-2">
                              <Link
                                to={`/admin/pages/${p.id}`}
                                className="text-accent hover:underline font-medium"
                              >
                                {p.title}
                              </Link>
                            </td>
                            <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                              {p.path}
                            </td>
                            <td className="px-4 py-2 text-xs text-muted-foreground">
                              {p.section && p.section !== "none" ? p.section : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
