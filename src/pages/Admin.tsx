import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Trash2, RefreshCw, LogOut } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  mode: string;
  preferred_time: string | null;
  status: string;
  created_at: string;
}

const STATUSES = ["new", "in_progress", "resolved", "archived"];

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem("admin_pw") || "");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const call = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("admin-contacts", { body });
    if (error) throw error;
    if ((data as any)?.error) throw new Error((data as any).error);
    return data as any;
  };

  const load = async (pw = password) => {
    setLoading(true);
    try {
      const data = await call({ password: pw, action: "list" });
      setSubmissions(data.submissions || []);
      setAuthed(true);
      sessionStorage.setItem("admin_pw", pw);
    } catch (e) {
      toast({ title: "Login failed", description: (e as Error).message, variant: "destructive" });
      setAuthed(false);
      sessionStorage.removeItem("admin_pw");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) load(password);
    document.title = "Admin · Contact Submissions";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await call({ password, action: "updateStatus", id, status });
      setSubmissions((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    } catch (e) {
      toast({ title: "Update failed", description: (e as Error).message, variant: "destructive" });
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await call({ password, action: "delete", id });
      setSubmissions((s) => s.filter((x) => x.id !== id));
    } catch (e) {
      toast({ title: "Delete failed", description: (e as Error).message, variant: "destructive" });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_pw");
    setPassword("");
    setAuthed(false);
    setSubmissions([]);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to view contact submissions.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(password);
            }}
            className="space-y-3"
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full" disabled={loading || !password}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const filtered = filter === "all" ? submissions : submissions.filter((s) => s.status === filter);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Contact Submissions</h1>
            <p className="text-sm text-muted-foreground">{submissions.length} total</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => load()} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          {["all", ...STATUSES].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "outline"}
              onClick={() => setFilter(s)}
            >
              {s} {s !== "all" && `(${submissions.filter((x) => x.status === s).length})`}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">No submissions.</Card>
          )}
          {filtered.map((s) => (
            <Card key={s.id} className="p-4 space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleString()} · mode: {s.mode}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="text-xs border rounded px-2 py-1 bg-background"
                    value={s.status}
                    onChange={(e) => updateStatus(s.id, e.target.value)}
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <Button size="icon" variant="ghost" onClick={() => remove(s.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                {s.email && <div><span className="text-muted-foreground">Email:</span> <a className="underline" href={`mailto:${s.email}`}>{s.email}</a></div>}
                {s.phone && <div><span className="text-muted-foreground">Phone:</span> <a className="underline" href={`tel:${s.phone}`}>{s.phone}</a></div>}
                {s.preferred_time && <div><span className="text-muted-foreground">Preferred time:</span> {s.preferred_time}</div>}
              </div>
              {s.message && (
                <p className="text-sm whitespace-pre-wrap border-l-2 border-primary/40 pl-3 mt-2">{s.message}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
