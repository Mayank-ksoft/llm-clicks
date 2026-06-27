import ContentListPage from "@/components/admin/ContentListPage";
import { webStoriesApi } from "@/lib/cms/contentApi";
const AdminWebStories = () => <ContentListPage title="Web Stories" subtitle="Manage /web-stories" basePath="/admin/web-stories" publicPathPrefix="/web-stories" queryKey="admin-ws-list" fetcher={webStoriesApi.list} />;
export default AdminWebStories;