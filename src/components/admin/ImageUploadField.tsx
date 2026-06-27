import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X, Loader2 } from "lucide-react";

interface Props {
  label: string;
  value: string | null | undefined;
  onChange: (url: string) => void;
  recommended?: string;
  /**
   * When provided, the previous value is deleted from Vercel Blob after a new
   * upload (only if the previous URL was itself a Blob URL).
   */
  manageDeletion?: boolean;
}

const BLOB_HOST = ".public.blob.vercel-storage.com";

const isBlobUrl = (u: string | null | undefined) => !!u && u.includes(BLOB_HOST);

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function deleteBlobUrl(url: string | null | undefined): Promise<void> {
  if (!isBlobUrl(url)) return;
  try {
    await fetch("/api/blob-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ url }),
    });
  } catch {
    // best-effort
  }
}

const ImageUploadField = ({ label, value, onChange, recommended, manageDeletion = true }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const upload = async (file: File) => {
    if (file.size > 15 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 15 MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/blob-upload", {
        method: "POST",
        headers: await authHeader(),
        body: fd,
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Upload failed (${res.status})`);
      }
      const { url } = (await res.json()) as { url: string };
      const prev = value;
      onChange(url);
      if (manageDeletion && prev && prev !== url) {
        void deleteBlobUrl(prev);
      }
      toast({ title: "Uploaded" });
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = () => {
    const prev = value;
    onChange("");
    if (manageDeletion) void deleteBlobUrl(prev);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="rounded-md border border-border bg-muted/30 p-3 space-y-3">
          <img src={value} alt="" className="max-h-48 rounded object-contain mx-auto" />
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Upload className="h-4 w-4 mr-1" />}
              Replace
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={remove} disabled={uploading} className="text-destructive">
              <X className="h-4 w-4 mr-1" />Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) upload(f); }}
          className="rounded-md border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 cursor-pointer p-6 text-center text-sm text-muted-foreground transition-colors"
        >
          {uploading ? (
            <span className="inline-flex items-center"><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading…</span>
          ) : (
            <>
              <Upload className="h-5 w-5 mx-auto mb-1" />
              Click to upload or drag &amp; drop
              {recommended && <div className="text-xs mt-1 opacity-75">{recommended}</div>}
            </>
          )}
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }}
      />
      <Input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={recommended ? `Or paste a URL (${recommended})` : "Or paste a URL"}
        className="text-xs"
      />
    </div>
  );
};

export default ImageUploadField;
