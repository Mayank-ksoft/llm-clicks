import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const SECTIONS = ["features", "resources", "free_tools", "company", "legal", "none"] as const;

const AdminPageDetail = () => {
  const { id = "" } = useParams();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-page-detail", id],
    queryFn: async () => {
      const { data: page, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      const { data: seo } = await supabase
        .from("page_seo")
        .select("*")
        .eq("page_id", id)
        .maybeSingle();
      return { page, seo };
    },
    enabled: !!id,
  });

  const [section, setSection] = useState("none");
  const [parentId, setParentId] = useState<string>("");
  const [form, setForm] = useState({
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    og_title: "",
    og_description: "",
    og_image: "",
    schema_jsonld: "",
    tagline: "",
    robots: "",
    keywords: "",
    h1: "",
    subtitle: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!data) return;
    setSection(data.page.section ?? "none");
    setParentId(data.page.parent_id ?? "");
    const s: Record<string, unknown> = (data.seo as Record<string, unknown> | null) ?? {};
    const str = (k: string) => (typeof s[k] === "string" ? (s[k] as string) : "");
    setForm({
      meta_title: str("meta_title"),
      meta_description: str("meta_description"),
      canonical_url: str("canonical_url"),
      og_title: str("og_title"),
      og_description: str("og_description"),
      og_image: str("og_image"),
      schema_jsonld:
        s.schema_jsonld == null
          ? ""
          : typeof s.schema_jsonld === "string"
            ? (s.schema_jsonld as string)
            : JSON.stringify(s.schema_jsonld, null, 2),
      tagline: str("tagline"),
      robots: str("robots"),
      keywords: str("keywords"),
      h1: str("h1"),
      subtitle: str("subtitle"),
    });
  }, [data]);

  const { data: allPages } = useQuery({
    queryKey: ["pages-select"],
    queryFn: async () => {
      const { data } = await supabase
        .from("pages")
        .select("id, path, title")
        .order("path");
      return data ?? [];
    },
  });

  const save = async () => {
    setSaving(true);
    try {
      let schemaJsonValue: any = null;
      if (form.schema_jsonld.trim()) {
        try {
          schemaJsonValue = JSON.parse(form.schema_jsonld);
        } catch {
          throw new Error("Schema JSON-LD is not valid JSON");
        }
      }
      const { error: pErr } = await supabase
        .from("pages")
        .update({
          section: section as (typeof SECTIONS)[number],
          parent_id: parentId || null,
        })
        .eq("id", id);
      if (pErr) throw pErr;

      const seoPayload: Record<string, unknown> = {
        page_id: id,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        canonical_url: form.canonical_url || null,
        og_title: form.og_title || null,
        og_description: form.og_description || null,
        og_image: form.og_image || null,
        schema_jsonld: schemaJsonValue,
        tagline: form.tagline || null,
        robots: form.robots || null,
        keywords: form.keywords || null,
        h1: form.h1 || null,
        subtitle: form.subtitle || null,
      };
      const { error: sErr } = await supabase
        .from("page_seo")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .upsert(seoPayload as any);
      if (sErr) throw sErr;

      qc.invalidateQueries({ queryKey: ["page-seo"] });
      qc.invalidateQueries({ queryKey: ["admin-pages-list"] });
      toast.success("Saved. Changes will appear on the page after a refresh.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !data) {
    return (
      <AdminLayout>
        <div className="p-8 text-sm text-muted-foreground">Loading…</div>
      </AdminLayout>
    );
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl space-y-6">
        <Link to="/admin/pages" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to pages
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold">{data.page.title}</h1>
          <p className="text-sm font-mono text-muted-foreground">{data.page.path}</p>
        </div>

        <Card className="p-6 space-y-5">
          <h2 className="font-semibold text-sm">Parent & section</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Section</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Parent page</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="">(no parent)</option>
                {(allPages ?? []).filter((p) => p.id !== id).map((p) => (
                  <option key={p.id} value={p.id}>{p.path}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-5">
          <h2 className="font-semibold text-sm">Page hero</h2>
          <p className="text-xs text-muted-foreground -mt-2">
            Controls the visible eyebrow tag, H1 title, and subtitle at the top of this page.
          </p>
          <div className="space-y-2">
            <Label>Eyebrow / Tagline</Label>
            <Input value={form.tagline} onChange={set("tagline")} placeholder="ABOUT US" />
          </div>
          <div className="space-y-2">
            <Label>H1 title</Label>
            <Textarea rows={2} value={form.h1} onChange={set("h1")} placeholder="About LLMClicks.ai and Our Mission to Redefine AI Visibility" />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Textarea rows={2} value={form.subtitle} onChange={set("subtitle")} placeholder="Helping businesses understand and thrive in the age of AI-powered search." />
          </div>
        </Card>

        <Card className="p-6 space-y-5">
          <h2 className="font-semibold text-sm">SEO</h2>
          <div className="space-y-2">
            <Label>Meta title</Label>
            <Input value={form.meta_title} onChange={set("meta_title")} maxLength={70} />
          </div>
          <div className="space-y-2">
            <Label>Meta description</Label>
            <Textarea rows={2} value={form.meta_description} onChange={set("meta_description")} maxLength={200} />
          </div>
          <div className="space-y-2">
            <Label>Canonical URL</Label>
            <Input value={form.canonical_url} onChange={set("canonical_url")} placeholder="https://…" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>OG title</Label>
              <Input value={form.og_title} onChange={set("og_title")} />
            </div>
            <div className="space-y-2">
              <Label>OG image URL</Label>
              <Input value={form.og_image} onChange={set("og_image")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>OG description</Label>
            <Textarea rows={2} value={form.og_description} onChange={set("og_description")} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Robots</Label>
              <Input value={form.robots} onChange={set("robots")} placeholder="index,follow" />
            </div>
            <div className="space-y-2">
              <Label>Keywords</Label>
              <Input value={form.keywords} onChange={set("keywords")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Schema (JSON-LD)</Label>
            <Textarea
              rows={8}
              className="font-mono text-xs"
              value={form.schema_jsonld}
              onChange={set("schema_jsonld")}
              placeholder='{"@context":"https://schema.org","@type":"Article",...}'
            />
          </div>
          <div className="pt-2">
            <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPageDetail;