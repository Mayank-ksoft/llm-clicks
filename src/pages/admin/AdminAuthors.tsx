import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/cms/contentApi";

const db = supabase as unknown as { from: (t: string) => any };

const AdminAuthors = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data = [] } = useQuery({ queryKey: ["authors"], queryFn: async () => {
    const { data, error } = await db.from("authors").select("*").order("name"); if (error) throw error; return data ?? [];
  }});
  const [form, setForm] = useState({ name: "", slug: "", bio: "", avatar_url: "", twitter: "", linkedin: "", website: "" });
  const save = async () => {
    if (!form.name) return;
    const payload = { ...form, slug: form.slug || slugify(form.name) };
    const { error } = await db.from("authors").upsert(payload, { onConflict: "slug" });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setForm({ name: "", slug: "", bio: "", avatar_url: "", twitter: "", linkedin: "", website: "" });
    qc.invalidateQueries({ queryKey: ["authors"] });
    toast({ title: "Saved" });
  };
  const del = async (id: string) => {
    if (!confirm("Delete author?")) return;
    const { error } = await db.from("authors").delete().eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["authors"] });
  };
  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-display font-bold">Authors</h1>
        <Card><CardHeader><CardTitle className="text-sm">New Author</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} placeholder="auto from name" /></div>
            <div className="col-span-2"><Label>Bio</Label><Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
            <div><Label>Avatar URL</Label><Input value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} /></div>
            <div><Label>Website</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
            <div><Label>Twitter</Label><Input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} /></div>
            <div><Label>LinkedIn</Label><Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} /></div>
            <div className="col-span-2"><Button onClick={save}>Save Author</Button></div>
          </CardContent>
        </Card>
        <div className="border border-border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{data.map((a: any) => (
              <TableRow key={a.id}><TableCell>{a.name}</TableCell><TableCell className="text-muted-foreground text-sm">{a.slug}</TableCell>
                <TableCell><Button size="icon" variant="ghost" onClick={() => del(a.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell></TableRow>
            ))}</TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminAuthors;