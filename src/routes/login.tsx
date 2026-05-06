import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminAuth, ensureDemoAdmin, DEMO_ADMIN } from "@/lib/admin-auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEMO_ADMIN.email);
  const [password, setPassword] = useState(DEMO_ADMIN.password);
  const [error, setError] = useState("");

  useEffect(() => {
    ensureDemoAdmin();
    if (adminAuth.isLoggedIn()) navigate({ to: "/admin" });
  }, [navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = adminAuth.login(email, password);
    if (!res.ok) { setError(res.error || "Login failed"); return; }
    toast.success("Welcome back.");
    navigate({ to: "/admin" });
  }

  const input = "w-full bg-transparent border-b border-charcoal/30 py-3 px-1 focus:outline-none focus:border-terracotta text-charcoal";

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="font-display text-2xl text-charcoal block text-center mb-10">Luxe<span className="italic text-terracotta">.</span></Link>
        <div className="border border-clay/40 p-10 bg-cream">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3 text-center">Admin Panel</p>
          <h1 className="font-display text-3xl text-center mb-8">Sign in</h1>
          <form onSubmit={submit} className="space-y-6">
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button type="submit" className="w-full py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.22em] hover:bg-terracotta transition-colors">Login</button>
          </form>
          <p className="text-center text-xs text-charcoal/50 mt-6">Forgot password? Contact your developer to reset.</p>
          <div className="mt-4 p-3 bg-sand/60 border border-clay/30 text-[11px] text-charcoal/70 text-center">
            <div className="uppercase tracking-[0.2em] text-terracotta mb-1">Demo credentials</div>
            <div>{DEMO_ADMIN.email} / {DEMO_ADMIN.password}</div>
          </div>
          {!adminAuth.exists() && (
            <p className="text-center text-xs text-charcoal/60 mt-4">No account yet? <Link to="/register" className="text-terracotta underline">Register</Link></p>
          )}
          <Link to="/" className="block text-center text-xs text-charcoal/50 mt-6 hover:text-terracotta">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}