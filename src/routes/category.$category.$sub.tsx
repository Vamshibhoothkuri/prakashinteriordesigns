import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { getCat, getSub } from "@/lib/taxonomy";
import { gallery } from "@/lib/admin-auth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/category/$category/$sub")({
  head: ({ params }) => {
    const sub = getSub(params.category, params.sub);
    const title = sub ? `${sub.name} — Luxe Interiors` : "Sub-category";
    return {
      meta: [
        { title },
        { name: "description", content: sub?.description ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: sub?.description ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const sub = getSub(params.category, params.sub);
    if (!sub) throw notFound();
    return sub;
  },
  component: SubPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-charcoal px-6">
      <h1 className="font-display text-4xl mb-4">Sub-category not found</h1>
      <Link to="/" className="text-terracotta uppercase tracking-[0.2em] text-xs">← Home</Link>
    </div>
  ),
});

function SubPage() {
  const { category, sub: subSlug } = useParams({ from: "/category/$category/$sub" });
  const cat = getCat(category)!;
  const sub = getSub(category, subSlug)!;
  const [thumbs, setThumbs] = useState<Record<string, string>>({});

  useEffect(() => {
    const items = gallery.getAll();
    const map: Record<string, string> = {};
    for (const tp of sub.types) {
      const first = items.find((i) => i.typeSlug === tp.slug && i.type === "image");
      if (first) map[tp.slug] = first.url;
    }
    setThumbs(map);
  }, [sub]);

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <Link to="/category/$category" params={{ category: cat.slug }} className="hover:text-terracotta">{cat.name}</Link>
          <span>/</span>
          <span className="text-charcoal">{sub.name}</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">{cat.name}</p>
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            {sub.name} <em className="text-terracotta">designs</em>
          </h1>
          <p className="text-charcoal/80 text-base md:text-lg leading-relaxed">{sub.description}</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sub.types.map((tp) => (
            <Link
              key={tp.slug}
              to="/category/$category/$sub/$type"
              params={{ category: cat.slug, sub: sub.slug, type: tp.slug }}
              className="group relative block overflow-hidden aspect-[4/5] border border-clay/30 hover:border-terracotta transition-all"
            >
              <img
                src={thumbs[tp.slug] ?? tp.cover}
                alt={tp.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-xl text-white">{tp.name}</h3>
                <p className="text-cream/85 text-xs mt-1">{tp.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}