import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { adminAuth, gallery, type GalleryItem } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [category, setCategory] = useState<GalleryItem["category"]>("residential");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!adminAuth.isLoggedIn()) { navigate({ to: "/login" }); return; }
    setItems(gallery.getAll());
  }, [navigate]);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const newItems: GalleryItem[] = [];
    let pending = files.length;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newItems.push({
          id: crypto.randomUUID(),
          url: reader.result as string,
          type: file.type.startsWith("video") ? "video" : "image",
          name: file.name.replace(/\.[^.]+$/, ""),
          category,
          createdAt: Date.now(),
        });
        pending--;
        if (pending === 0) {
          gallery.add(newItems);
          setItems(gallery.getAll());
          toast.success(`${newItems.length} item(s) uploaded.`);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function remove(id: string) {
    gallery.remove(id);
    setItems(gallery.getAll());
    toast.success("Removed.");
  }

  function logout() {
    adminAuth.logout();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-clay/30 px-6 py-5 flex items-center justify-between bg-cream sticky top-0 z-40">
        <Link to="/" className="font-display text-2xl text-charcoal">Luxe<span className="italic text-terracotta">.</span></Link>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link to="/" className="text-charcoal/70 hover:text-terracotta">View Site</Link>
          <button onClick={logout} className="px-4 py-2 bg-charcoal text-cream hover:bg-terracotta transition-colors">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">Dashboard</p>
        <h1 className="font-display text-4xl md:text-5xl mb-10">Manage <em>portfolio</em>.</h1>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60">Upload to:</span>
          {(["residential", "commercial", "videos"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] border ${
                category === c ? "bg-charcoal text-cream border-charcoal" : "border-clay/40 text-charcoal/70 hover:border-charcoal"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed p-16 text-center cursor-pointer transition-colors ${dragOver ? "border-terracotta bg-sand" : "border-clay/50 hover:border-terracotta"}`}
        >
          <p className="font-display text-2xl mb-2">Drop images or videos here</p>
          <p className="text-sm text-charcoal/60">or click to browse</p>
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl mb-6">Uploaded items <span className="text-charcoal/40 text-base">({items.length})</span></h2>
          {items.length === 0 ? (
            <p className="text-charcoal/50 italic font-display text-lg">No uploads yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it) => (
                <div key={it.id} className="group relative aspect-square overflow-hidden border border-clay/30">
                  {it.type === "video" ? (
                    <video src={it.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={it.url} alt={it.name} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                    <div className="text-cream text-sm text-center">{it.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-terracotta">{it.category}</div>
                    <button onClick={() => remove(it.id)} className="px-3 py-1.5 bg-destructive text-destructive-foreground text-[11px] uppercase tracking-[0.2em]">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}