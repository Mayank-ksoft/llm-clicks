import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ContentEditorPage from "@/components/admin/ContentEditorPage";
import { webStoriesApi } from "@/lib/cms/contentApi";
const AdminWebStoriesEditor = () => (
  <ContentEditorPage
    api={webStoriesApi}
    basePath="/admin/web-stories"
    listQueryKey="admin-ws-list"
    itemQueryKey="admin-ws"
    publicPathPrefix="/web-stories"
    label="Story"
    extraFields={(d, u) => (
      <>
        <div><Label>Poster URL</Label><Input value={(d as any).poster ?? ""} onChange={(e) => u({ ...(d as any), poster: e.target.value } as any)} /></div>
        <div>
          <Label>Pages (JSON array)</Label>
          <Textarea rows={8} className="font-mono text-xs"
            value={(d as any).pages ? JSON.stringify((d as any).pages, null, 2) : ""}
            onChange={(e) => { try { u({ ...(d as any), pages: e.target.value ? JSON.parse(e.target.value) : null } as any); } catch { u({ ...(d as any), pages: e.target.value } as any); } }} />
        </div>
      </>
    )}
  />
);
export default AdminWebStoriesEditor;