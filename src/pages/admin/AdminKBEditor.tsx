import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentEditorPage from "@/components/admin/ContentEditorPage";
import { kbApi } from "@/lib/cms/contentApi";
const AdminKBEditor = () => (
  <ContentEditorPage
    api={kbApi}
    basePath="/admin/knowledge-hub"
    listQueryKey="admin-kb-list"
    itemQueryKey="admin-kb"
    publicPathPrefix="/knowledge-hub"
    label="Article"
    extraDefaults={{ category_slug: "" }}
    extraFields={(d, u) => (
      <div>
        <Label>Category Slug</Label>
        <Input value={d.category_slug ?? ""} onChange={(e) => u({ category_slug: e.target.value })} placeholder="e.g. seo-basics" />
      </div>
    )}
  />
);
export default AdminKBEditor;