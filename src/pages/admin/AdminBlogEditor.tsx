import { useEffect, useMemo, useState } from "react";
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
import { ArrowLeft, Save, Trash2, ExternalLink, Plus, X } from "lucide-react";
import {
  blogApi,
  authorsApi,
  categoriesApi,
  tagsApi,
  slugify,
} from "@/lib/cms/blogApi";
import type { BlogPostRow, BlogStatus } from "@/lib/cms/blogTypes";

type Draft = Partial<BlogPostRow>;

const empty: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  body_markdown: "",
  hero_image: "",
  status: "draft",
  author_id: null,
  category_id: null,
  meta_title: "",
  meta_description: "",
  canonical_url: "",
  og_image: "",
  robots: "index,follow",
  keywords: "",
  reading_time: "",
};

const AdminBlogEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [draft, setDraft] = useState<Draft>(empty);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const { data: post, isLoading } = useQuery({
    queryKey: ["admin-blog", id],
    queryFn: () => (isNew ? Promise.resolve(null) : blogApi.get(id!)),
    enabled: !isNew,
  });
  const { data: authors = [] } = useQuery({ queryKey: ["authors"], queryFn: authorsApi.list });
  const { data: categories = [] } = useQuery({
    queryKey: ["cats-blog"],
    queryFn: () => categoriesApi.listByType("blog"),
  });
  const { data: tags = [] } = useQuery({ queryKey: ["tags"], queryFn: tagsApi.list });
  const { data: postTagIds } = useQuery({
    queryKey: ["post-tags", id],
    queryFn: () => (isNew ? Promise.resolve([]) : blogApi.tagsForPost(id!)),
    enabled: !isNew,
  });

  useEffect(() => {
    if (post) setDraft(post);
  }, [post]);
  useEffect(() => {
    if (postTagIds) setTagIds(postTagIds);
  }, [postTagIds]);

  const update = (patch: Draft) => setDraft((d) => ({ ...d, ...patch }));

  const handleTitleChange = (title: string) => {
    update({ title, slug: !draft.id && !draft.slug ? slugify(title) : draft.slug });
  };

  const save = async (publish?: boolean) => {
    if (!draft.title || !draft.slug) {
      toast({ title: "Title and slug required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload: Draft = { ...draft };
      if (publish !== undefined) {
        payload.status = (publish ? "published" : "draft") as BlogStatus;
        if (publish && !payload.published_at) payload.published_at = new Date().toISOString();
      }
      const saved = await blogApi.upsert(payload);
      await blogApi.setTags(saved.id, tagIds);
      toast({ title: "Saved", description: `Post "${saved.title}" updated.` });
      queryClient.invalidateQueries({ queryKey: ["admin-blog-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blog", saved.id] });
      if (isNew) navigate(`/admin/blog/${saved.id}`, { replace: true });
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!draft.id || !confirm("Delete this post permanently?")) return;
    try {
      await blogApi.remove(draft.id);
      toast({ title: "Deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-blog-list"] });
      navigate("/admin/blog");
    } catch (e: any) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    }
  };

  const addNewTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const t = await tagsApi.create(newTagName.trim(), slugify(newTagName));
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      setTagIds((prev) => [...prev, t.id]);
      setNewTagName("");
    } catch (e: any) {
      toast({ title: "Tag failed", description: e.message, variant: "destructive" });
    }
  };

  const selectedTags = useMemo(() => tags.filter((t) => tagIds.includes(t.id)), [tags, tagIds]);

  if (isLoading && !isNew) {
    return <AdminLayout><div className="p-8 text-muted-foreground">Loading…</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/blog"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-xl font-display font-bold">
                {isNew ? "New Blog Post" : draft.title || "(untitled)"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {draft.slug ? `/blog/${draft.slug}` : "Slug not set"}
              </p>
            </div>
            <Badge variant={draft.status === "published" ? "default" : "secondary"}>{draft.status}</Badge>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && draft.status === "published" && (
              <Button variant="outline" size="sm" asChild>
                <a href={`/blog/${draft.slug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />View
                </a>
              </Button>
            )}
            {!isNew && (
              <Button variant="ghost" size="sm" onClick={remove} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>
              Save Draft
            </Button>
            <Button size="sm" onClick={() => save(true)} disabled={saving}>
              <Save className="h-4 w-4 mr-1" />{draft.status === "published" ? "Update" : "Publish"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Content</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input value={draft.title ?? ""} onChange={(e) => handleTitleChange(e.target.value)} />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={draft.slug ?? ""} onChange={(e) => update({ slug: slugify(e.target.value) })} />
                </div>
                <div>
                  <Label>Excerpt</Label>
                  <Textarea rows={3} value={draft.excerpt ?? ""} onChange={(e) => update({ excerpt: e.target.value })} />
                </div>
                <div>
                  <Label>Hero Image URL</Label>
                  <Input value={draft.hero_image ?? ""} onChange={(e) => update({ hero_image: e.target.value })} placeholder="/legacy-assets/hero.webp" />
                </div>
                <div data-color-mode="light">
                  <Label className="mb-2 block">Body (Markdown)</Label>
                  <MDEditor
                    value={draft.body_markdown ?? ""}
                    onChange={(v) => update({ body_markdown: v ?? "" })}
                    height={500}
                    preview="live"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">SEO</CardTitle></CardHeader>
              <CardContent>
                <Tabs defaultValue="basic">
                  <TabsList>
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-3 pt-4">
                    <div><Label>Meta Title</Label><Input value={draft.meta_title ?? ""} onChange={(e) => update({ meta_title: e.target.value })} /></div>
                    <div><Label>Meta Description</Label><Textarea rows={2} value={draft.meta_description ?? ""} onChange={(e) => update({ meta_description: e.target.value })} /></div>
                    <div><Label>Canonical URL</Label><Input value={draft.canonical_url ?? ""} onChange={(e) => update({ canonical_url: e.target.value })} /></div>
                    <div><Label>Keywords (comma separated)</Label><Input value={draft.keywords ?? ""} onChange={(e) => update({ keywords: e.target.value })} /></div>
                  </TabsContent>
                  <TabsContent value="social" className="space-y-3 pt-4">
                    <div><Label>OG Image URL</Label><Input value={draft.og_image ?? ""} onChange={(e) => update({ og_image: e.target.value })} /></div>
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
                      <Textarea
                        rows={6}
                        className="font-mono text-xs"
                        value={typeof draft.schema_jsonld === "string" ? draft.schema_jsonld : draft.schema_jsonld ? JSON.stringify(draft.schema_jsonld, null, 2) : ""}
                        onChange={(e) => update({ schema_jsonld: e.target.value as any })}
                        placeholder='{ "@context": "https://schema.org", "@type": "Article" }'
                      />
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
                  <Select value={draft.status ?? "draft"} onValueChange={(v) => update({ status: v as BlogStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Published At</Label>
                  <Input
                    type="datetime-local"
                    value={draft.published_at ? draft.published_at.slice(0, 16) : ""}
                    onChange={(e) => update({ published_at: e.target.value ? new Date(e.target.value).toISOString() : null })}
                  />
                </div>
                <div>
                  <Label>Reading Time</Label>
                  <Input value={draft.reading_time ?? ""} onChange={(e) => update({ reading_time: e.target.value })} placeholder="5 min read" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Author & Category</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Author</Label>
                  <Select value={draft.author_id ?? "none"} onValueChange={(v) => update({ author_id: v === "none" ? null : v })}>
                    <SelectTrigger><SelectValue placeholder="Select author" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— None —</SelectItem>
                      {authors.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={draft.category_id ?? "none"} onValueChange={(v) => update({ category_id: v === "none" ? null : v })}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— None —</SelectItem>
                      {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Tags</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {selectedTags.map((t) => (
                    <Badge key={t.id} variant="secondary" className="gap-1">
                      {t.name}
                      <button onClick={() => setTagIds((ids) => ids.filter((id) => id !== t.id))} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={(v) => setTagIds((ids) => ids.includes(v) ? ids : [...ids, v])}>
                  <SelectTrigger><SelectValue placeholder="Add existing tag…" /></SelectTrigger>
                  <SelectContent>
                    {tags.filter((t) => !tagIds.includes(t.id)).map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="New tag name" />
                  <Button size="icon" variant="outline" onClick={addNewTag}><Plus className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
