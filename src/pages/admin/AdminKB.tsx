import ContentListPage from "@/components/admin/ContentListPage";
import { kbApi } from "@/lib/cms/contentApi";
const AdminKB = () => <ContentListPage title="Knowledge Hub" subtitle="Manage /knowledge-hub articles" basePath="/admin/knowledge-hub" publicPathPrefix="/knowledge-hub" queryKey="admin-kb-list" fetcher={kbApi.list} />;
export default AdminKB;