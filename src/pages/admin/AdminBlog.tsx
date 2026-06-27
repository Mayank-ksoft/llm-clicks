import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { blogApi } from "@/lib/cms/blogApi";

const AdminBlog = () => {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const { data, isLoading } = useQuery({ queryKey: ["admin-blog-list"], queryFn: blogApi.list });

  const rows = useMemo(() => {
    const list = data ?? [];
    return list.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (q && !`${p.title} ${p.slug}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [data, q, status]);

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Blog Posts</h1>
            <p className="text-sm text-muted-foreground">Manage articles published under /blog</p>
          </div>
          <Button asChild>
            <Link to="/admin/blog/new"><Plus className="h-4 w-4 mr-2" />New Post</Link>
          </Button>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or slug…" className="pl-9" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Loading…</TableCell></TableRow>
              )}
              {!isLoading && rows.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No posts found</TableCell></TableRow>
              )}
              {rows.map((p) => (
                <TableRow key={p.id} className="cursor-pointer">
                  <TableCell>
                    <Link to={`/admin/blog/${p.id}`} className="font-medium hover:underline">{p.title || "(untitled)"}</Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">/blog/{p.slug}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "published" ? "default" : "secondary"}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
