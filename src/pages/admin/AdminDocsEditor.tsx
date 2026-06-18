import ContentEditorPage from "@/components/admin/ContentEditorPage";
import { docsApi } from "@/lib/cms/contentApi";
const AdminDocsEditor = () => <ContentEditorPage api={docsApi} basePath="/admin/docs" listQueryKey="admin-docs-list" itemQueryKey="admin-docs" publicPathPrefix="/docs" label="Doc" />;
export default AdminDocsEditor;