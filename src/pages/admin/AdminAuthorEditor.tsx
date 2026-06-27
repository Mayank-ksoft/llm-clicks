import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Trash2, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/cms/contentApi";
import ImageUploadField, { deleteBlobUrl } from "@/components/admin/ImageUploadField";

const db = supabase as unknown as { from: (t: string) => any };

interface Draft {
  id?: string;
  slug: string; name: string; bio: string; avatar_url: string;
  twitter: string; linkedin: string; website: string;
  role_title: string; tagline: string; long_bio_md: string;
  location: string; experience: string; specialization: string;
  expertise_tags: string[];
  stats: { num: string; label: string }[];
  founded_companies: { name: string; role: string; href: string }[];
  cta_calendly_url: string;
  meta_title: string; meta_description: string; og_image: string;
  published: boolean;
}

const empty: Draft = {
  slug: "", name: "", bio: "", avatar_url: "",
  twitter: "", linkedin: "", website: "",
  role_title: "", tagline: "", long_bio_md: "",
  location: "", experience: "", specialization: "",
  expertise_tags: [], stats: [], founded_companies: [],
  cta_calendly_url: "",
  meta_title: "", meta_description: "", og_image: "",
  published: true,
};

const AdminAuthorEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();

  const [draft, setDraft] = useState<Draft>(empty);
  const [initialAvatar, setInitialAvatar] = useState<string>("");
  const [initialOg, setInitialOg] = useState<string>("");
  const [tagInput, setTagInput] = useState("");

  const { data: author, isLoading } = useQuery({
    queryKey: ["admin-author", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await db.from("authors").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!author) return;
    setDraft({
      ...empty,
      ...author,
      bio: author.bio ?? "", avatar_url: author.avatar_url ?? "",
      twitter: author.twitter ?? "", linkedin: author.linkedin ?? "", website: author.website ?? "",
      role_title: author.role_title ?? "", tagline: author.tagline ?? "", long_bio_md: author.long_bio_md ?? "",
      location: author.location ?? "", experience: author.experience ?? "", specialization: author.specialization ?? "",
      expertise_tags: author.expertise_tags ?? [],
      stats: author.stats ?? [],
      founded_companies: author.founded_companies ?? [],
      cta_calendly_url: author.cta_calendly_url ?? "",
      meta_title: author.meta_title ?? "", meta_description: author.meta_description ?? "", og_image: author.og_image ?? "",
      published: author.published ?? true,
    });
    setInitialAvatar(author.avatar_url ?? "");
    setInitialOg(author.og_image ?? "");
  }, [author]);

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (!draft.expertise_tags.includes(t)) update({ expertise_tags: [...draft.expertise_tags, t] });
    setTagInput("");
  };
  const removeTag = (t: string) => update({ expertise_tags: draft.expertise_tags.filter((x) => x !== t) });

  const addStat = () => update({ stats: [...draft.stats, { num: "", label: "" }] });
  const updateStat = (i: number, patch: Partial<{ num: string; label: string }>) =>
    update({ stats: draft.stats.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  const removeStat = (i: number) => update({ stats: draft.stats.filter((_, idx) => idx !== i) });

  const addCompany = () => update({ founded_companies: [...draft.founded_companies, { name: "", role: "", href: "" }] });
  const updateCompany = (i: number, patch: Partial<{ name: string; role: string; href: string }>) =>
    update({ founded_companies: draft.founded_companies.map((c, idx) => (idx === i ? { ...c, ...patch } : c)) });
  const removeCompany = (i: number) => update({ founded_companies: draft.founded_companies.filter((_, idx) => idx !== i) });

  const save = async () => {
    if (!draft.name || !draft.slug) {
      toast({ title: "Name and slug required", variant: "destructive" });
      return;
    }
    try {
      const payload: any = {
        ...draft,
        slug: slugify(draft.slug),
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await db.from("authors").upsert(payload, { onConflict: "slug" }).select("*").single();
      if (error) throw error;
      // Cleanup replaced blobs.
      if (initialAvatar && initialAvatar !== draft.avatar_url) void deleteBlobUrl(initialAvatar);
      if (initialOg && initialOg !== draft.og_image) void deleteBlobUrl(initialOg);
      setInitialAvatar(draft.avatar_url);
      setInitialOg(draft.og_image);
      toast({ title: "Saved" });
      qc.invalidateQueries({ queryKey: ["authors"] });
      qc.invalidateQueries({ queryKey: ["author", data.slug] });
      if (isNew) navigate(`/admin/authors/${data.id}`, { replace: true });
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    }
  };

  const remove = async () => {
    if (!draft.id || !confirm("Delete this author?")) return;
    try {
      const { error } = await db.from("authors").delete().eq("id", draft.id);
      if (error) throw error;
      void deleteBlobUrl(draft.avatar_url);
      void deleteBlobUrl(draft.og_image);
      qc.invalidateQueries({ queryKey: ["authors"] });
      navigate("/admin/authors");
    } catch (e: any) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    }
  };

  if (isLoading && !isNew) {
    return <AdminLayout><div className="p-8 text-muted-foreground">Loading…</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild><Link to="/admin/authors"><ArrowLeft className="h-4 w-4" /></Link></Button>
            <div>
              <h1 className="text-xl font-display font-bold">{isNew ? "New Author" : draft.name || "(untitled)"}</h1>
              <p className="text-xs text-muted-foreground">{draft.slug ? `/author/${draft.slug}` : "Slug not set"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && draft.slug && (
              <Button variant="outline" size="sm" asChild><a href={`/author/${draft.slug}`} target="_blank" rel="noopener noreferrer">View</a></Button>
            )}
            {!isNew && (
              <Button variant="ghost" size="sm" onClick={remove} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
            )}
            <Button size="sm" onClick={save}><Save className="h-4 w-4 mr-1" />Save</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Basic Info</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <div><Label>Name</Label><Input value={draft.name} onChange={(e) => update({ name: e.target.value, slug: !draft.id && !draft.slug ? slugify(e.target.value) : draft.slug })} /></div>
                <div><Label>Slug</Label><Input value={draft.slug} onChange={(e) => update({ slug: slugify(e.target.value) })} /></div>
                <div className="col-span-2"><Label>Role Title</Label><Input value={draft.role_title} onChange={(e) => update({ role_title: e.target.value })} placeholder="Founder & CEO, LLMClicks.ai" /></div>
                <div className="col-span-2"><Label>Tagline (hero subtitle)</Label><Textarea rows={2} value={draft.tagline} onChange={(e) => update({ tagline: e.target.value })} /></div>
                <div className="col-span-2"><Label>Short Bio (legacy / fallback)</Label><Textarea rows={2} value={draft.bio} onChange={(e) => update({ bio: e.target.value })} /></div>
                <div className="col-span-2">
                  <Label>Long Bio (markdown, use blank lines between paragraphs; **bold** supported)</Label>
                  <Textarea rows={10} value={draft.long_bio_md} onChange={(e) => update({ long_bio_md: e.target.value })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Avatar</CardTitle></CardHeader>
              <CardContent>
                <ImageUploadField label="Profile photo" value={draft.avatar_url} onChange={(url) => update({ avatar_url: url })} recommended="square, 400×400+" manageDeletion={false} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Expertise Tags</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {draft.expertise_tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent">
                      {t}
                      <button onClick={() => removeTag(t)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add expertise tag and press Enter" />
                  <Button size="icon" variant="outline" onClick={addTag}><Plus className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Hero Stats</CardTitle>
                <Button size="sm" variant="outline" onClick={addStat}><Plus className="h-3 w-3 mr-1" />Add</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {draft.stats.length === 0 && <p className="text-xs text-muted-foreground">No stats yet.</p>}
                {draft.stats.map((s, i) => (
                  <div key={i} className="grid grid-cols-[120px_1fr_auto] gap-2">
                    <Input value={s.num} onChange={(e) => updateStat(i, { num: e.target.value })} placeholder="15+" />
                    <Input value={s.label} onChange={(e) => updateStat(i, { label: e.target.value })} placeholder="Years in SEO" />
                    <Button size="icon" variant="ghost" onClick={() => removeStat(i)}><X className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Founded Companies</CardTitle>
                <Button size="sm" variant="outline" onClick={addCompany}><Plus className="h-3 w-3 mr-1" />Add</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {draft.founded_companies.length === 0 && <p className="text-xs text-muted-foreground">No companies yet.</p>}
                {draft.founded_companies.map((c, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                    <Input value={c.name} onChange={(e) => updateCompany(i, { name: e.target.value })} placeholder="Name" />
                    <Input value={c.role} onChange={(e) => updateCompany(i, { role: e.target.value })} placeholder="Role / description" />
                    <Input value={c.href} onChange={(e) => updateCompany(i, { href: e.target.value })} placeholder="https://…" />
                    <Button size="icon" variant="ghost" onClick={() => removeCompany(i)}><X className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Publishing</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Published</Label>
                  <Switch checked={draft.published} onCheckedChange={(v) => update({ published: v })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Sidebar Details</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><Label>Experience</Label><Input value={draft.experience} onChange={(e) => update({ experience: e.target.value })} placeholder="15+ years in SEO & SaaS" /></div>
                <div><Label>Specialization</Label><Input value={draft.specialization} onChange={(e) => update({ specialization: e.target.value })} /></div>
                <div><Label>Based in</Label><Input value={draft.location} onChange={(e) => update({ location: e.target.value })} /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Social & CTAs</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><Label>LinkedIn URL</Label><Input value={draft.linkedin} onChange={(e) => update({ linkedin: e.target.value })} /></div>
                <div><Label>Twitter / X URL</Label><Input value={draft.twitter} onChange={(e) => update({ twitter: e.target.value })} /></div>
                <div><Label>Website</Label><Input value={draft.website} onChange={(e) => update({ website: e.target.value })} /></div>
                <div><Label>Calendly / booking URL</Label><Input value={draft.cta_calendly_url} onChange={(e) => update({ cta_calendly_url: e.target.value })} /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">SEO</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><Label>Meta Title</Label><Input value={draft.meta_title} onChange={(e) => update({ meta_title: e.target.value })} /></div>
                <div><Label>Meta Description</Label><Textarea rows={3} value={draft.meta_description} onChange={(e) => update({ meta_description: e.target.value })} /></div>
                <ImageUploadField label="OG Image" value={draft.og_image} onChange={(url) => update({ og_image: url })} recommended="1200×630" manageDeletion={false} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAuthorEditor;
