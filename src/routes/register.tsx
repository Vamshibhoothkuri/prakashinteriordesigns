import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminAuth } from "@/lib/admin-auth";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (adminAuth.exists()) navigate({ to: "/login" });
  }, [navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = adminAuth.register({ name, email, password }, key);
    if (!res.ok) { setError(res.error || "Registration failed"); return; }
    toast.success("Owner account created.");
    navigate({ to: "/admin" });
  }

  const input = "w-full bg-transparent border-b border-charcoal/30 py-3 px-1 focus:outline-none focus:border-terracotta text-charcoal";

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="font-display text-2xl text-charcoal block text-center mb-10">Luxe<span className="italic text-terracotta">.</span></Link>
        <div className="border border-clay/40 p-10 bg-cream">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3 text-center">One-time Setup</p>
          <h1 className="font-display text-3xl text-center mb-8">Create owner account</h1>
          <form onSubmit={submit} className="space-y-6">
            <input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className={input} />
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
            <input required type="password" placeholder="Secret admin key" value={key} onChange={(e) => setKey(e.target.value)} className={input} />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button type="submit" className="w-full py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.22em] hover:bg-terracotta transition-colors">Create Account</button>
          </form>
          <Link to="/login" className="block text-center text-xs text-charcoal/50 mt-6 hover:text-terracotta">Already registered? Sign in</Link>
        </div>
      </div>
    </div>
  );
}