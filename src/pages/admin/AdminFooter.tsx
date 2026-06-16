import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useFooterSettings, type SocialLink } from "@/hooks/useFooterSettings";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ICON_NAMES } from "@/lib/cms/iconMap";

const AdminFooter = () => {
  const { data, isLoading } = useFooterSettings();
  const qc = useQueryClient();
  const [blurb, setBlurb] = useState("");
  const [copyright, setCopyright] = useState("");
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setBlurb(data.brand_blurb ?? "");
      setCopyright(data.copyright ?? "");
      setSocials(data.social_links ?? []);
    }
  }, [data]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("footer_settings")
      .update({ brand_blurb: blurb, copyright, social_links: socials })
      .eq("id", 1);
    setSaving(false);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["footer-settings"] });
    toast.success("Footer saved");
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Footer</h1>
          <p className="text-sm text-muted-foreground">
            Brand blurb, social icons, and copyright. The five footer column link lists are
            managed under <Link to="/admin/menus" className="text-accent underline">Menus</Link>.
          </p>
        </div>

        <Card className="p-6 space-y-3">
          <h2 className="font-semibold text-sm">Footer columns</h2>
          <p className="text-xs text-muted-foreground -mt-1">
            Click a column to edit its links in the Menus screen.
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { loc: "footer_col_1", label: "Column 1 · Product" },
              { loc: "footer_col_2", label: "Column 2 · Free Tools" },
              { loc: "footer_col_3", label: "Column 3 · Resources" },
              { loc: "footer_col_4", label: "Column 4 · Company" },
              { loc: "footer_col_5", label: "Column 5 · Legal" },
            ].map((c) => (
              <Link
                key={c.loc}
                to={`/admin/menus?location=${c.loc}`}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40"
              >
                <span>{c.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <Card className="p-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="blurb">Brand blurb</Label>
              <Textarea id="blurb" rows={3} value={blurb} onChange={(e) => setBlurb(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="copyright">Copyright text</Label>
              <Input id="copyright" value={copyright} onChange={(e) => setCopyright(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Social links</Label>
              <div className="space-y-2">
                {socials.map((s, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <select
                      className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                      value={s.icon}
                      onChange={(e) => {
                        const next = [...socials];
                        next[i] = { ...s, icon: e.target.value };
                        setSocials(next);
                      }}
                    >
                      {ICON_NAMES.map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                    <Input
                      placeholder="https://…"
                      value={s.href}
                      onChange={(e) => {
                        const next = [...socials];
                        next[i] = { ...s, href: e.target.value };
                        setSocials(next);
                      }}
                    />
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSocials(socials.filter((_, j) => j !== i))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSocials([...socials, { icon: "Linkedin", href: "" }])}
              >
                <Plus className="h-4 w-4 mr-1" /> Add social link
              </Button>
            </div>

            <div className="pt-2">
              <Button onClick={save} disabled={saving}>
                {saving ? "Saving…" : "Save footer"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFooter;