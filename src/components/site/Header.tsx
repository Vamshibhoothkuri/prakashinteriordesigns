import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, role, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Maison<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">Home</Link>
          <Link to="/portfolio" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">Portfolio</Link>
          <Link to="/about" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">About</Link>
          <Link to="/contact" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">Contact</Link>
          {user && <Link to="/my-designs" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">My Designs</Link>}
          {role === "admin" && <Link to="/admin" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">Admin</Link>}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign out</Button>
          ) : (
            <Link to="/auth"><Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">Sign in</Button></Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
        <div>© {new Date().getFullYear()} Maison Interiors. Crafted with care.</div>
        <div className="flex gap-6">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}