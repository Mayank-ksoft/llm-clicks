import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as { from: (t: string) => any; storage: any; auth: any };
const BUCKET = "cms-media";

const AdminMedia = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const { data = [] } = useQuery({ queryKey: ["media"], queryFn: async () => {
    const { data, error } = await db.from("media_assets").select("*").order("created_at", { ascending: false });
    if (error) throw error; return data ?? [];
  }});

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const key = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error: upErr } = await db.storage.from(BUCKET).upload(key, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;
      const { data: pub } = db.storage.from(BUCKET).getPublicUrl(key);
      const { data: { user } } = await db.auth.getUser();
      const { error } = await db.from("media_assets").insert({
        storage_key: key, url: pub.publicUrl, filename: file.name, mime_type: file.type, size_bytes: file.size, uploaded_by: user?.id ?? null,
      });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["media"] });
      toast({ title: "Uploaded" });
    } catch (e: any) { toast({ title: "Upload failed", description: e.message, variant: "destructive" }); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  const del = async (asset: any) => {
    if (!confirm("Delete file?")) return;
    await db.storage.from(BUCKET).remove([asset.storage_key]);
    await db.from("media_assets").delete().eq("id", asset.id);
    qc.invalidateQueries({ queryKey: ["media"] });
  };

  const updateAlt = async (id: string, alt: string) => {
    await db.from("media_assets").update({ alt }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["media"] });
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Media Library</h1>
          <div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />{uploading ? "Uploading…" : "Upload"}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((m: any) => (
            <div key={m.id} className="border border-border rounded-lg bg-card p-3 space-y-2">
              <img src={m.url} alt={m.alt ?? m.filename} className="w-full h-32 object-cover rounded" />
              <p className="text-xs truncate text-muted-foreground">{m.filename}</p>
              <Input defaultValue={m.alt ?? ""} placeholder="Alt text" onBlur={(e) => updateAlt(m.id, e.target.value)} className="text-xs" />
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { navigator.clipboard.writeText(m.url); toast({ title: "Copied URL" }); }}>
                  <Copy className="h-3 w-3 mr-1" />Copy
                </Button>
                <Button size="sm" variant="ghost" onClick={() => del(m)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
          {data.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No media yet. Upload one to start.</p>}
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminMedia;