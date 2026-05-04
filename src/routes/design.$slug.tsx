import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getDesign, getCategory } from "@/lib/categories";
import { gallery, type GalleryItem } from "@/lib/admin-auth";

export const Route = createFileRoute("/design/$slug")({
  head: ({ params }) => {
    const d = getDesign(params.slug);
    const title = d ? `${d.title} — Luxe Interiors` : "Design — Luxe Interiors";
    const desc = d?.description ?? "Explore our interior design portfolio.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(d ? [{ property: "og:image" as const, content: d.cover }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const d = getDesign(params.slug);
    if (!d) throw notFound();
    return d;
  },
  component: DesignPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-charcoal px-6">
      <h1 className="font-display text-5xl mb-4">Design not found</h1>
      <Link to="/" className="text-terracotta uppercase tracking-[0.2em] text-xs">← Back home</Link>
    </div>
  ),
});

function DesignPage() {
  const { slug } = useParams({ from: "/design/$slug" });
  const design = getDesign(slug)!;
  const category = getCategory(design.category);
  const [active, setActive] = useState(0);

  const [uploads, setUploads] = useState<GalleryItem[]>([]);
  useEffect(() => {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
    const target = norm(design.title);
    const targetSlug = norm(design.slug);
    setUploads(
      gallery.getAll().filter((it) => {
        if (!it.service) return false;
        const s = norm(it.service);
        return s === target || s === targetSlug || s.includes(target) || target.includes(s);
      })
    );
  }, [design.slug, design.title]);

  const uploadedPhotos = useMemo(() => uploads.filter((u) => u.type === "image"), [uploads]);
  const uploadedVideos = useMemo(() => uploads.filter((u) => u.type === "video"), [uploads]);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const images = [
    ...(design.gallery.length ? design.gallery : [design.cover]),
    ...uploadedPhotos.map((u) => u.url),
  ];

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>/</span>
          {category && (
            <>
              <Link
                to="/category/$category"
                params={{ category: category.slug }}
                className="hover:text-terracotta transition-colors"
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-charcoal">{design.title}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Gallery */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] overflow-hidden bg-sand mb-3">
              <img
                src={images[active]}
                alt={design.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-square overflow-hidden border-2 transition-all ${
                      i === active ? "border-terracotta" : "border-transparent hover:border-clay"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">
              {category?.name} · {design.subcategory.replace(/-/g, " ")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl mb-5 leading-tight">
              {design.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {design.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-[0.22em] border border-clay px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-charcoal/75 leading-relaxed mb-8">{design.description}</p>

            <div className="border-t border-clay/30 pt-6 mb-8">
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-terracotta mb-4">
                Materials & Features
              </h3>
              <ul className="space-y-2">
                {design.materials.map((m) => (
                  <li key={m} className="text-charcoal/80 text-sm flex gap-3">
                    <span className="text-terracotta">—</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/"
              hash="contact"
              className="inline-flex px-7 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.22em] hover:bg-terracotta transition-colors"
            >
              Enquire about this design
            </Link>
          </div>
        </div>

        {(uploadedPhotos.length > 0 || uploadedVideos.length > 0) && (
          <section className="mt-20 border-t border-clay/30 pt-14">
            <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">
              From our recent work
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-8">
              Project <em>photos & videos</em>.
            </h2>

            {uploadedPhotos.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-charcoal/70 mb-4">
                  Photos ({uploadedPhotos.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uploadedPhotos.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setLightbox(p)}
                      className="group aspect-square overflow-hidden border border-clay/30 hover:border-terracotta transition-colors"
                    >
                      <img
                        src={p.url}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {uploadedVideos.length > 0 && (
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-charcoal/70 mb-4">
                  Videos ({uploadedVideos.length})
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {uploadedVideos.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setLightbox(v)}
                      className="group relative aspect-video overflow-hidden border border-clay/30 hover:border-terracotta transition-colors bg-charcoal"
                    >
                      <video src={v.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" muted />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-terracotta/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-6"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-cream text-xs uppercase tracking-[0.2em] hover:text-terracotta"
          >
            ✕ Close
          </button>
          {lightbox.type === "video" ? (
            <video
              src={lightbox.url}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh]"
            />
          ) : (
            <img
              src={lightbox.url}
              alt={lightbox.name}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
}