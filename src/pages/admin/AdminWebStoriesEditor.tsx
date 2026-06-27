import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import ContentEditorPage from "@/components/admin/ContentEditorPage";
import { webStoriesApi } from "@/lib/cms/contentApi";

type Slide = {
  heading?: string;
  body?: string;
  video?: string;
  poster?: string;
  image?: string;
  cta?: { label: string; href: string };
};

const emptySlide: Slide = { heading: "", body: "", video: "", poster: "", image: "" };

const SlidesEditor = ({ slides, onChange }: { slides: Slide[]; onChange: (s: Slide[]) => void }) => {
  const updateAt = (i: number, patch: Partial<Slide>) =>
    onChange(slides.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= slides.length) return;
    const next = slides.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {slides.length === 0 && (
        <p className="text-xs text-muted-foreground">No slides yet. Add one to begin.</p>
      )}
      {slides.map((s, i) => (
        <Card key={i} className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Slide {i + 1}</span>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="h-3 w-3" /></Button>
              <Button size="icon" variant="ghost" onClick={() => move(i, 1)} disabled={i === slides.length - 1}><ArrowDown className="h-3 w-3" /></Button>
              <Button size="icon" variant="ghost" className="text-destructive" onClick={() => onChange(slides.filter((_, idx) => idx !== i))}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </div>
          <div><Label className="text-xs">Heading</Label><Input value={s.heading ?? ""} onChange={(e) => updateAt(i, { heading: e.target.value })} /></div>
          <div><Label className="text-xs">Body</Label><Textarea rows={2} value={s.body ?? ""} onChange={(e) => updateAt(i, { body: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><Label className="text-xs">Video URL</Label><Input value={s.video ?? ""} onChange={(e) => updateAt(i, { video: e.target.value })} placeholder="/web-stories-media/clip.mp4" /></div>
            <div><Label className="text-xs">Poster URL</Label><Input value={s.poster ?? ""} onChange={(e) => updateAt(i, { poster: e.target.value })} /></div>
          </div>
          <div><Label className="text-xs">Image URL (no video)</Label><Input value={s.image ?? ""} onChange={(e) => updateAt(i, { image: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><Label className="text-xs">CTA Label</Label><Input value={s.cta?.label ?? ""} onChange={(e) => updateAt(i, { cta: { ...(s.cta ?? { href: "" }), label: e.target.value } })} placeholder="optional" /></div>
            <div><Label className="text-xs">CTA Link</Label><Input value={s.cta?.href ?? ""} onChange={(e) => updateAt(i, { cta: { ...(s.cta ?? { label: "" }), href: e.target.value } })} placeholder="/pricing" /></div>
          </div>
        </Card>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...slides, { ...emptySlide }])}>
        <Plus className="h-3 w-3 mr-1" /> Add slide
      </Button>
    </div>
  );
};

const AdminWebStoriesEditor = () => (
  <ContentEditorPage
    api={webStoriesApi}
    basePath="/admin/web-stories"
    listQueryKey="admin-ws-list"
    itemQueryKey="admin-ws"
    publicPathPrefix="/web-stories"
    label="Story"
    extraFields={(d, u) => {
      const pages: Slide[] = Array.isArray((d as any).pages) ? (d as any).pages : [];
      return (
        <>
          <div><Label>Poster URL</Label><Input value={(d as any).poster ?? ""} onChange={(e) => u({ ...(d as any), poster: e.target.value } as any)} placeholder="Cover image shown in the story list" /></div>
          <div><Label>Poster Alt Text</Label><Input value={(d as any).poster_alt ?? ""} onChange={(e) => u({ ...(d as any), poster_alt: e.target.value } as any)} /></div>
          <div className="pt-2 border-t border-border">
            <Label className="mb-2 block">Slides</Label>
            <SlidesEditor slides={pages} onChange={(s) => u({ ...(d as any), pages: s } as any)} />
          </div>
        </>
      );
    }}
  />
);
export default AdminWebStoriesEditor;