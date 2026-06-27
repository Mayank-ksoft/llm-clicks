import ContentListPage from "@/components/admin/ContentListPage";
import { docsApi } from "@/lib/cms/contentApi";
const AdminDocs = () => <ContentListPage title="Docs Articles" subtitle="Manage /docs help articles" basePath="/admin/docs" publicPathPrefix="/docs" queryKey="admin-docs-list" fetcher={docsApi.list} />;
export default AdminDocs;