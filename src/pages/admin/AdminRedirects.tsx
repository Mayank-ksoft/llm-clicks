import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as { from: (t: string) => any };

const AdminRedirects = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data = [] } = useQuery({ queryKey: ["redirects"], queryFn: async () => {
    const { data, error } = await db.from("redirects").select("*").order("from_path"); if (error) throw error; return data ?? [];
  }});
  const [form, setForm] = useState({ from_path: "", to_path: "", status_code: 301, enabled: true });
  const save = async () => {
    if (!form.from_path || !form.to_path) return;
    const { error } = await db.from("redirects").upsert(form, { onConflict: "from_path" });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setForm({ from_path: "", to_path: "", status_code: 301, enabled: true });
    qc.invalidateQueries({ queryKey: ["redirects"] });
  };
  const del = async (id: string) => {
    const { error } = await db.from("redirects").delete().eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["redirects"] });
  };
  const toggle = async (id: string, enabled: boolean) => {
    const { error } = await db.from("redirects").update({ enabled }).eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["redirects"] });
  };
  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-display font-bold">Redirects</h1>
        <Card><CardContent className="grid grid-cols-4 gap-3 pt-6">
          <div className="col-span-2"><Label>From</Label><Input value={form.from_path} onChange={(e) => setForm({ ...form, from_path: e.target.value })} placeholder="/old-path" /></div>
          <div className="col-span-2"><Label>To</Label><Input value={form.to_path} onChange={(e) => setForm({ ...form, to_path: e.target.value })} placeholder="/new-path" /></div>
          <div><Label>Code</Label>
            <Select value={String(form.status_code)} onValueChange={(v) => setForm({ ...form, status_code: Number(v) })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{[301,302,307,308].map((c) => <SelectItem key={c} value={String(c)}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="col-span-2 flex items-end gap-2"><Switch checked={form.enabled} onCheckedChange={(v) => setForm({ ...form, enabled: v })} /><span className="text-sm">Enabled</span></div>
          <div className="flex items-end"><Button onClick={save}>Add</Button></div>
        </CardContent></Card>
        <div className="border border-border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>From</TableHead><TableHead>To</TableHead><TableHead>Code</TableHead><TableHead>Enabled</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{data.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.from_path}</TableCell>
                <TableCell className="font-mono text-xs">{r.to_path}</TableCell>
                <TableCell>{r.status_code}</TableCell>
                <TableCell><Switch checked={r.enabled} onCheckedChange={(v) => toggle(r.id, v)} /></TableCell>
                <TableCell><Button size="icon" variant="ghost" onClick={() => del(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminRedirects;