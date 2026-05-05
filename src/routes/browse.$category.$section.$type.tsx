import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { findType, normalizeTag } from "@/lib/category-tree";
import { gallery, type GalleryItem } from "@/lib/admin-auth";

export const Route = createFileRoute("/browse/$category/$section/$type")({
  head: ({ params }) => {
    const typeName = decodeURIComponent(params.type);
    return {
      meta: [
        { title: `${typeName} — Luxe Interiors` },
        { name: "description", content: `${typeName} designs and project photos.` },
      ],
    };
  },
  loader: ({ params }) => {
    const sectionName = decodeURIComponent(params.section);
    const typeName = decodeURIComponent(params.type);
    const found = findType(params.category, sectionName, typeName);
    if (!found.type) throw notFound();
    return { ...found, sectionName, typeName, categorySlug: params.category };
  },
  component: TypePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-charcoal px-6">
      <h1 className="font-display text-5xl mb-4">Not found</h1>
      <Link to="/" className="text-terracotta uppercase tracking-[0.2em] text-xs">← Back home</Link>
    </div>
  ),
});

function TypePage() {
  const params = useParams({ from: "/browse/$category/$section/$type" });
  const sectionName = decodeURIComponent(params.section);
  const typeName = decodeURIComponent(params.type);
  const { cat, section, type } = findType(params.category, sectionName, typeName);

  const [uploads, setUploads] = useState<GalleryItem[]>([]);
  useEffect(() => {
    const target = normalizeTag(typeName);
    setUploads(
      gallery.getAll().filter((it) => {
        if (!it.service) return false;
        const s = normalizeTag(it.service);
        return s === target || s.includes(target) || target.includes(s);
      })
    );
  }, [typeName]);

  const images = useMemo(() => uploads.filter((u) => u.type === "image"), [uploads]);
  const videos = useMemo(() => uploads.filter((u) => u.type === "video"), [uploads]);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  if (!cat || !section || !type) return null;

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <Link to="/" hash="services" className="hover:text-terracotta">{cat.name}</Link>
          <span>/</span>
          <span>{section.name}</span>
          <span>/</span>
          <span className="text-charcoal">{type.name}</span>
        </nav>

        <Link to="/" hash="services" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal/70 hover:text-terracotta mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to browse
        </Link>

        <header className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">{cat.name} · {section.name}</p>
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            {type.name}
          </h1>
          <p className="text-charcoal/75 text-base md:text-lg leading-relaxed">
            Hand-picked references and recent project photos for {type.name.toLowerCase()}.
          </p>
        </header>

        {/* Sample references */}
        {type.samples && type.samples.length > 0 && (
          <section className="mb-14">
            <h2 className="font-display text-2xl mb-5">Reference designs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {type.samples.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox({ id: `s-${i}`, url: src, type: "image", name: type.name, category: cat.slug as GalleryItem["category"], createdAt: 0 })}
                  className="group relative aspect-square overflow-hidden border border-clay/30 hover:border-terracotta transition-colors"
                >
                  <img src={src} alt={`${type.name} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Admin uploads */}
        <section className="border-t border-clay/30 pt-10">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-2">From our recent work</p>
              <h2 className="font-display text-2xl md:text-3xl">Project photos & videos</h2>
            </div>
            <p className="text-charcoal/60 text-xs">{uploads.length} item(s)</p>
          </div>

          {uploads.length === 0 ? (
            <p className="text-charcoal/50 italic font-display text-lg py-10">
              No uploads tagged "{type.name}" yet. Check back soon.
            </p>
          ) : (
            <>
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {images.map((u) => (
                    <button key={u.id} onClick={() => setLightbox(u)} className="group relative aspect-square overflow-hidden border border-clay/30 hover:border-terracotta transition-colors">
                      <img src={u.url} alt={u.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </button>
                  ))}
                </div>
              )}
              {videos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((u) => (
                    <button key={u.id} onClick={() => setLightbox(u)} className="group relative aspect-video overflow-hidden border border-clay/30 hover:border-terracotta transition-colors bg-charcoal">
                      <video src={u.url} muted className="w-full h-full object-cover opacity-85 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-terracotta/90 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
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