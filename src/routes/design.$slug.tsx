import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { getDesign, getCategory } from "@/lib/categories";

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
  const images = design.gallery.length ? design.gallery : [design.cover];

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
      </div>
    </div>
  );
}