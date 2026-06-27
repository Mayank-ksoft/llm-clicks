import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Trash2, ExternalLink } from "lucide-react";
import { slugify, type ContentRow, type ContentStatus } from "@/lib/cms/contentApi";
import { categoriesApi } from "@/lib/cms/blogApi";
import ImageUploadField, { deleteBlobUrl } from "@/components/admin/ImageUploadField";

interface Api {
  list: () => Promise<ContentRow[]>;
  get: (id: string) => Promise<ContentRow | null>;
  upsert: (row: Partial<ContentRow>) => Promise<ContentRow>;
  remove: (id: string) => Promise<void>;
}

interface Props {
  api: Api;
  basePath: string;
  listQueryKey: string;
  itemQueryKey: string;
  publicPathPrefix?: string;
  label: string;
  extraDefaults?: Partial<ContentRow>;
  extraFields?: (draft: Partial<ContentRow>, update: (p: Partial<ContentRow>) => void) => React.ReactNode;
  /** When set, shows a Category picker populated from `categories` table for this type. */
  categoryType?: "blog" | "docs" | "knowledge_hub";
  /** Which legacy column to keep in sync with the picked category ('category_slug' for KB, 'category_label' for docs). */
  categoryMirrorField?: "category_slug" | "category_label";
}

type Draft = Partial<ContentRow>;

const ContentEditorPage = ({ api, basePath, listQueryKey, itemQueryKey, publicPathPrefix, label, extraDefaults, extraFields, categoryType, categoryMirrorField }: Props) => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const empty: Draft = { slug: "", title: "", excerpt: "", body_markdown: "", hero_image: "", status: "draft", robots: "index,follow", ...extraDefaults };
  const [draft, setDraft] = useState<Draft>(empty);
  const [saving, setSaving] = useState(false);

  const { data: row, isLoading } = useQuery({
    queryKey: [itemQueryKey, id],
    queryFn: () => (isNew ? Promise.resolve(null) : api.get(id!)),
    enabled: !isNew,
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["cats", categoryType],
    queryFn: () => categoriesApi.listByType(categoryType!),
    enabled: !!categoryType,
  });
  useEffect(() => { if (row) setDraft(row); }, [row]);

  const update = (patch: Draft) => setDraft((d) => ({ ...d, ...patch }));
  const handleTitle = (title: string) => update({ title, slug: !draft.id && !draft.slug ? slugify(title) : draft.slug });

  const save = async (publish?: boolean) => {
    if (!draft.title || !draft.slug) { toast({ title: "Title and slug required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const payload: Draft = { ...draft };
      if (publish !== undefined) {
        payload.status = (publish ? "published" : "draft") as ContentStatus;
        if (publish && !payload.published_at) payload.published_at = new Date().toISOString();
      }
      const saved = await api.upsert(payload);
      toast({ title: "Saved", description: `${label} "${saved.title}" updated.` });
      qc.invalidateQueries({ queryKey: [listQueryKey] });
      qc.invalidateQueries({ queryKey: [itemQueryKey, saved.id] });
      if (isNew) navigate(`${basePath}/${saved.id}`, { replace: true });
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  const remove = async () => {
    if (!draft.id || !confirm(`Delete this ${label.toLowerCase()} permanently?`)) return;
    try { await api.remove(draft.id); qc.invalidateQueries({ queryKey: [listQueryKey] }); navigate(basePath); }
    catch (e: any) { toast({ title: "Delete failed", description: e.message, variant: "destructive" }); }
  };

  if (isLoading && !isNew) return <AdminLayout><div className="p-8 text-muted-foreground">Loading…</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild><Link to={basePath}><ArrowLeft className="h-4 w-4" /></Link></Button>
            <div>
              <h1 className="text-xl font-display font-bold">{isNew ? `New ${label}` : draft.title || "(untitled)"}</h1>
              <p className="text-xs text-muted-foreground">{draft.slug ? `${publicPathPrefix ?? ""}/${draft.slug}` : "Slug not set"}</p>
            </div>
            <Badge variant={draft.status === "published" ? "default" : "secondary"}>{draft.status}</Badge>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && draft.status === "published" && publicPathPrefix && (
              <Button variant="outline" size="sm" asChild>
                <a href={`${publicPathPrefix}/${draft.slug}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4 mr-1" />View</a>
              </Button>
            )}
            {!isNew && <Button variant="ghost" size="sm" onClick={remove} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>}
            <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>Save Draft</Button>
            <Button size="sm" onClick={() => save(true)} disabled={saving}><Save className="h-4 w-4 mr-1" />{draft.status === "published" ? "Update" : "Publish"}</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Content</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Title</Label><Input value={draft.title ?? ""} onChange={(e) => handleTitle(e.target.value)} /></div>
                <div><Label>Slug</Label><Input value={draft.slug ?? ""} onChange={(e) => update({ slug: slugify(e.target.value) })} /></div>
                <div><Label>Excerpt</Label><Textarea rows={3} value={draft.excerpt ?? ""} onChange={(e) => update({ excerpt: e.target.value })} /></div>
                <div data-color-mode="light">
                  <Label className="mb-2 block">Body (Markdown)</Label>
                  <MDEditor value={draft.body_markdown ?? ""} onChange={(v) => update({ body_markdown: v ?? "" })} height={500} preview="live" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Featured Image</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <ImageUploadField
                  label="Image"
                  value={draft.hero_image}
                  onChange={(url) => { const prev = draft.hero_image; update({ hero_image: url }); if (prev && prev !== url) void deleteBlobUrl(prev); }}
                  recommended="1600×900 recommended"
                  manageDeletion={false}
                />
                <div><Label>Alt Text</Label><Input value={draft.hero_image_alt ?? ""} onChange={(e) => update({ hero_image_alt: e.target.value })} placeholder="Describe the image for screen readers and SEO" /></div>
                <div><Label>Image Title</Label><Input value={draft.hero_image_title ?? ""} onChange={(e) => update({ hero_image_title: e.target.value })} placeholder="Tooltip shown on hover" /></div>
                <div><Label>Caption / Description</Label><Textarea rows={2} value={draft.hero_image_caption ?? ""} onChange={(e) => update({ hero_image_caption: e.target.value })} placeholder="Optional caption rendered below the image" /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">SEO</CardTitle></CardHeader>
              <CardContent>
                <Tabs defaultValue="basic">
                  <TabsList>
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="og">Open Graph</TabsTrigger>
                    <TabsTrigger value="twitter">Twitter</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-3 pt-4">
                    <div><Label>Meta Title</Label><Input value={draft.meta_title ?? ""} onChange={(e) => update({ meta_title: e.target.value })} /></div>
                    <div><Label>Meta Description</Label><Textarea rows={2} value={draft.meta_description ?? ""} onChange={(e) => update({ meta_description: e.target.value })} /></div>
                    <div><Label>Canonical URL</Label><Input value={draft.canonical_url ?? ""} onChange={(e) => update({ canonical_url: e.target.value })} /></div>
                    <div><Label>Keywords</Label><Input value={draft.keywords ?? ""} onChange={(e) => update({ keywords: e.target.value })} /></div>
                  </TabsContent>
                  <TabsContent value="og" className="space-y-3 pt-4">
                    <p className="text-xs text-muted-foreground">Used by Facebook, LinkedIn, Slack and most link-preview crawlers. Falls back to meta title / description / featured image when blank.</p>
                    <div><Label>OG Title</Label><Input value={draft.og_title ?? ""} onChange={(e) => update({ og_title: e.target.value })} /></div>
                    <div><Label>OG Description</Label><Textarea rows={2} value={draft.og_description ?? ""} onChange={(e) => update({ og_description: e.target.value })} /></div>
                    <ImageUploadField label="OG Image" value={draft.og_image} onChange={(url) => { const prev = draft.og_image; update({ og_image: url }); if (prev && prev !== url) void deleteBlobUrl(prev); }} recommended="1200×630" manageDeletion={false} />
                  </TabsContent>
                  <TabsContent value="twitter" className="space-y-3 pt-4">
                    <p className="text-xs text-muted-foreground">Twitter/X uses these for its summary cards. Leave blank to inherit from Open Graph.</p>
                    <div><Label>Twitter Title</Label><Input value={draft.twitter_title ?? ""} onChange={(e) => update({ twitter_title: e.target.value })} /></div>
                    <div><Label>Twitter Description</Label><Textarea rows={2} value={draft.twitter_description ?? ""} onChange={(e) => update({ twitter_description: e.target.value })} /></div>
                    <div><Label>Twitter Image URL</Label><Input value={draft.twitter_image ?? ""} onChange={(e) => update({ twitter_image: e.target.value })} placeholder="Recommended 1200×675" /></div>
                  </TabsContent>
                  <TabsContent value="advanced" className="space-y-3 pt-4">
                    <div>
                      <Label>Robots</Label>
                      <Select value={draft.robots ?? "index,follow"} onValueChange={(v) => update({ robots: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="index,follow">index, follow</SelectItem>
                          <SelectItem value="noindex,follow">noindex, follow</SelectItem>
                          <SelectItem value="index,nofollow">index, nofollow</SelectItem>
                          <SelectItem value="noindex,nofollow">noindex, nofollow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>JSON-LD Schema</Label>
                      <Textarea rows={6} className="font-mono text-xs"
                        value={typeof draft.schema_jsonld === "string" ? draft.schema_jsonld : draft.schema_jsonld ? JSON.stringify(draft.schema_jsonld, null, 2) : ""}
                        onChange={(e) => update({ schema_jsonld: e.target.value as any })} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Publishing</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={draft.status ?? "draft"} onValueChange={(v) => update({ status: v as ContentStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Published At</Label>
                  <Input type="datetime-local"
                    value={draft.published_at ? draft.published_at.slice(0, 16) : ""}
                    onChange={(e) => update({ published_at: e.target.value ? new Date(e.target.value).toISOString() : null })} />
                </div>
                <div>
                  <Label>Reading Time</Label>
                  <Input value={draft.reading_time ?? ""} onChange={(e) => update({ reading_time: e.target.value })} placeholder="5 min read" />
                </div>
              </CardContent>
            </Card>
            {categoryType && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Category</CardTitle></CardHeader>
                <CardContent>
                  <Select
                    value={draft.category_id ?? "none"}
                    onValueChange={(v) => {
                      if (v === "none") {
                        update({ category_id: null, ...(categoryMirrorField ? { [categoryMirrorField]: "" } as any : {}) });
                        return;
                      }
                      const c = categories.find((c: any) => c.id === v);
                      update({
                        category_id: v,
                        ...(categoryMirrorField && c
                          ? { [categoryMirrorField]: categoryMirrorField === "category_slug" ? c.slug : c.name } as any
                          : {}),
                      });
                    }}
                  >
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— None —</SelectItem>
                      {(categories as any[]).map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-muted-foreground">Manage the list under <Link to="/admin/categories" className="underline">Categories</Link>.</p>
                </CardContent>
              </Card>
            )}
            {extraFields && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Extra</CardTitle></CardHeader>
                <CardContent className="space-y-3">{extraFields(draft, update)}</CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentEditorPage;
