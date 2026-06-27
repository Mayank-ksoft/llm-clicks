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
    categoryType="knowledge_hub"
    categoryMirrorField="category_slug"
    extraDefaults={{ category_slug: "" }}
  />
);
export default AdminKBEditor;