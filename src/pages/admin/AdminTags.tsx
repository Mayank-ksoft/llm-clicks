import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/cms/contentApi";

const db = supabase as unknown as { from: (t: string) => any };

const AdminTags = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data = [] } = useQuery({ queryKey: ["tags"], queryFn: async () => {
    const { data, error } = await db.from("tags").select("*").order("name"); if (error) throw error; return data ?? [];
  }});
  const [name, setName] = useState("");
  const add = async () => {
    if (!name.trim()) return;
    const { error } = await db.from("tags").upsert({ name: name.trim(), slug: slugify(name) }, { onConflict: "slug" });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setName(""); qc.invalidateQueries({ queryKey: ["tags"] });
  };
  const del = async (id: string) => {
    if (!confirm("Delete tag?")) return;
    const { error } = await db.from("tags").delete().eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["tags"] });
  };
  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-display font-bold">Tags</h1>
        <div className="flex gap-2"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New tag name" /><Button onClick={add}>Add</Button></div>
        <div className="border border-border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{data.map((t: any) => (
              <TableRow key={t.id}><TableCell>{t.name}</TableCell><TableCell className="text-muted-foreground text-sm">{t.slug}</TableCell>
                <TableCell><Button size="icon" variant="ghost" onClick={() => del(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell></TableRow>
            ))}</TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminTags;