import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { gallery, type GalleryItem } from "@/lib/admin-auth";
import { TAXONOMY, allTypes } from "@/lib/taxonomy";

export const Route = createFileRoute("/videos")({ component: VideosPage });

function VideosPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setItems(gallery.getAll().filter((i) => i.type === "video" || i.category === "videos"));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter(
      (i) => i.category === filter || i.subcategory === filter || i.typeSlug === filter
    );
  }, [items, filter]);

  const filters = useMemo(() => {
    const out: { key: string; label: string }[] = [{ key: "all", label: "All" }];
    for (const c of TAXONOMY) out.push({ key: c.slug, label: c.name });
    const subs = new Map<string, string>();
    for (const c of TAXONOMY) for (const s of c.subcategories) subs.set(s.slug, s.name);
    for (const [key, label] of subs) out.push({ key, label });
    for (const { type } of allTypes()) out.push({ key: type.slug, label: type.name });
    return out;
  }, []);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <header className="border-b border-clay/30 px-6 py-5 flex items-center justify-between bg-cream sticky top-0 z-40">
        <Link to="/" className="font-display text-2xl text-charcoal">
          Luxe<span className="italic text-terracotta">.</span>
        </Link>
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-charcoal/70 hover:text-terracotta">← Back to Home</Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">Watch our work</p>
        <h1 className="font-display text-4xl md:text-5xl mb-4">Project <em>videos</em>.</h1>
        <p className="text-charcoal/80 max-w-xl mb-8">Walkthroughs and reels of our completed interiors. Click any video to play.</p>

        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-clay/30">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] border transition-colors ${
                filter === f.key
                  ? "bg-charcoal text-cream border-charcoal"
                  : "border-clay/40 text-charcoal/70 hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-clay/50 p-16 text-center">
            <p className="font-display text-2xl mb-2">No videos yet</p>
            <p className="text-sm text-charcoal/60">Videos uploaded from the admin panel will appear here.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <button
                key={v.id}
                onClick={() => setActive(v)}
                className="group relative aspect-video overflow-hidden border border-clay/30 hover:border-terracotta transition-all bg-charcoal"
              >
                <video src={v.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" muted />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-terracotta/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal to-transparent p-4">
                  <div className="text-cream text-sm text-left">{v.name}</div>
                  {v.service && (
                    <div className="text-[10px] uppercase tracking-[0.2em] text-clay mt-1 text-left">{v.service}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {active && (
        <div onClick={() => setActive(null)} className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-6">
          <button onClick={() => setActive(null)} className="absolute top-6 right-6 text-cream text-xs uppercase tracking-[0.2em] hover:text-terracotta">✕ Close</button>
          <video src={active.url} controls autoPlay onClick={(e) => e.stopPropagation()} className="max-w-full max-h-[85vh]" />
        </div>
      )}
    </div>
  );
}
