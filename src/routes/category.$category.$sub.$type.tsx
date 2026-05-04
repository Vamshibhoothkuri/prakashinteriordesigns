import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getCat, getSub, getType } from "@/lib/taxonomy";
import { gallery, type GalleryItem } from "@/lib/admin-auth";

const WHATSAPP_NUMBER = "919999999999";

export const Route = createFileRoute("/category/$category/$sub/$type")({
  head: ({ params }) => {
    const tp = getType(params.category, params.sub, params.type);
    const title = tp ? `${tp.name} — Luxe Interiors` : "Type";
    return {
      meta: [
        { title },
        { name: "description", content: tp?.description ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: tp?.description ?? "" },
        { property: "og:image", content: tp?.cover ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const tp = getType(params.category, params.sub, params.type);
    if (!tp) throw notFound();
    return tp;
  },
  component: TypePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-charcoal px-6">
      <h1 className="font-display text-4xl mb-4">Type not found</h1>
      <Link to="/" className="text-terracotta uppercase tracking-[0.2em] text-xs">← Home</Link>
    </div>
  ),
});

function TypePage() {
  const { category, sub: subSlug, type: typeSlug } = useParams({
    from: "/category/$category/$sub/$type",
  });
  const cat = getCat(category)!;
  const sub = getSub(category, subSlug)!;
  const tp = getType(category, subSlug, typeSlug)!;

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const all = gallery.getAll();
    const matched = all.filter((i) => {
      if (i.typeSlug === tp.slug) return true;
      // legacy free-text service tag fallback
      if (i.service && i.service.trim().toLowerCase() === tp.name.toLowerCase()) return true;
      return false;
    });
    setItems(matched);
  }, [tp.slug, tp.name]);

  const waLink = useMemo(() => {
    const text = `Hi! I'm interested in ${tp.name} interior design. Can you share more details?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [tp.name]);

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <Link to="/category/$category" params={{ category: cat.slug }} className="hover:text-terracotta">{cat.name}</Link>
          <span>/</span>
          <Link to="/category/$category/$sub" params={{ category: cat.slug, sub: sub.slug }} className="hover:text-terracotta">{sub.name}</Link>
          <span>/</span>
          <span className="text-charcoal">{tp.name}</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">{sub.name}</p>
          <h1 className="font-display text-4xl md:text-6xl mb-4">{tp.name}</h1>
          <p className="text-charcoal/85 text-base md:text-lg leading-relaxed">{tp.description}</p>
        </header>

        {items.length === 0 ? (
          <div className="border border-dashed border-clay/50 p-16 text-center">
            <p className="font-display text-2xl mb-2">Gallery coming soon</p>
            <p className="text-sm text-charcoal/60">
              Photos & videos for this design will appear here once uploaded by our team.
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => setLightbox(it)}
                className="mb-4 w-full block break-inside-avoid relative group overflow-hidden border border-clay/30 hover:border-terracotta transition-colors bg-charcoal"
              >
                {it.type === "video" ? (
                  <>
                    <video src={it.url} className="w-full h-auto opacity-85 group-hover:opacity-100" muted />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-terracotta/90 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={it.url} alt={it.name} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white text-xs uppercase tracking-[0.22em] hover:opacity-90 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.595 5.39l-1 3.648 3.894-1.737z"/></svg>
            Interested in this? Chat with us
          </a>
        </div>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-6">
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-cream text-xs uppercase tracking-[0.2em] hover:text-terracotta">✕ Close</button>
          {lightbox.type === "video" ? (
            <video src={lightbox.url} controls autoPlay onClick={(e) => e.stopPropagation()} className="max-w-full max-h-[85vh]" />
          ) : (
            <img src={lightbox.url} alt={lightbox.name} onClick={(e) => e.stopPropagation()} className="max-w-full max-h-[85vh] object-contain" />
          )}
        </div>
      )}
    </div>
  );
}