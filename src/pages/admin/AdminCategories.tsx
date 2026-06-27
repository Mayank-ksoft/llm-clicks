import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/cms/contentApi";

const db = supabase as unknown as { from: (t: string) => any };
const TYPES = ["blog", "docs", "knowledge_hub"] as const;

const CategoryTab = ({ type }: { type: string }) => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data = [] } = useQuery({ queryKey: ["cats", type], queryFn: async () => {
    const { data, error } = await db.from("categories").select("*").eq("type", type).order("position"); if (error) throw error; return data ?? [];
  }});
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const save = async () => {
    if (!form.name) return;
    const { error } = await db.from("categories").upsert({ ...form, slug: form.slug || slugify(form.name), type }, { onConflict: "type,slug" });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setForm({ name: "", slug: "", description: "" });
    qc.invalidateQueries({ queryKey: ["cats", type] });
  };
  const del = async (id: string) => {
    if (!confirm("Delete category?")) return;
    const { error } = await db.from("categories").delete().eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["cats", type] });
  };
  return (
    <div className="space-y-4 pt-4">
      <Card><CardContent className="grid grid-cols-3 gap-3 pt-6">
        <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} /></div>
        <div className="flex items-end"><Button onClick={save}>Add</Button></div>
        <div className="col-span-3"><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
      </CardContent></Card>
      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>{data.map((c: any) => (
            <TableRow key={c.id}><TableCell>{c.name}</TableCell><TableCell className="text-muted-foreground text-sm">{c.slug}</TableCell>
              <TableCell><Button size="icon" variant="ghost" onClick={() => del(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell></TableRow>
          ))}</TableBody>
        </Table>
      </div>
    </div>
  );
};

const AdminCategories = () => (
  <AdminLayout>
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">Categories</h1>
      <Tabs defaultValue="blog">
        <TabsList>{TYPES.map((t) => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>
        {TYPES.map((t) => <TabsContent key={t} value={t}><CategoryTab type={t} /></TabsContent>)}
      </Tabs>
    </div>
  </AdminLayout>
);
export default AdminCategories;