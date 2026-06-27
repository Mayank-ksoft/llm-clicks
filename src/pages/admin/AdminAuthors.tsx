import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { blobImageSrc } from "@/lib/blobUrls";

const db = supabase as unknown as { from: (t: string) => any };

const AdminAuthors = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data, error } = await db.from("authors").select("*").order("name");
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Authors</h1>
            <p className="text-sm text-muted-foreground">Edit author profile pages shown at /author/&lt;slug&gt;.</p>
          </div>
          <Button asChild>
            <Link to="/admin/authors/new"><Plus className="h-4 w-4 mr-1" />New Author</Link>
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Role</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={5} className="text-muted-foreground">Loading…</TableCell></TableRow>}
              {!isLoading && data.length === 0 && <TableRow><TableCell colSpan={5} className="text-muted-foreground">No authors yet.</TableCell></TableRow>}
              {data.map((a: any) => (
                <TableRow key={a.id}>
                  <TableCell className="flex items-center gap-3">
                    {a.avatar_url ? <img src={blobImageSrc(a.avatar_url)} alt="" className="h-8 w-8 rounded-full object-cover" /> : <div className="h-8 w-8 rounded-full bg-muted" />}
                    <span className="font-medium">{a.name}</span>
                    {a.published === false && <Badge variant="secondary">Hidden</Badge>}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.slug}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.role_title ?? "—"}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" asChild><a href={`/author/${a.slug}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a></Button>
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" asChild><Link to={`/admin/authors/${a.id}`}><Pencil className="h-4 w-4" /></Link></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAuthors;
