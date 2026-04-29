import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getCategory } from "@/lib/categories";
import { DesignCard } from "@/components/site/DesignCard";

export const Route = createFileRoute("/category/$category")({
  head: ({ params }) => {
    const cat = getCategory(params.category);
    const title = cat ? `${cat.name} Designs — Luxe Interiors` : "Category — Luxe Interiors";
    const desc = cat?.tagline ?? "Browse our portfolio by category.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return cat;
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-charcoal px-6">
      <h1 className="font-display text-5xl mb-4">Category not found</h1>
      <Link to="/" className="text-terracotta uppercase tracking-[0.2em] text-xs">← Back home</Link>
    </div>
  ),
});

function CategoryPage() {
  const { category: categorySlug } = useParams({ from: "/category/$category" });
  const cat = getCategory(categorySlug)!;
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(
    () => (active === "all" ? cat.designs : cat.designs.filter((d) => d.subcategory === active)),
    [cat, active]
  );

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal">{cat.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">
            {cat.name} Projects
          </p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">
            {cat.name} <em className="text-terracotta">Designs</em>
          </h1>
          <p className="text-charcoal/70 text-base md:text-lg leading-relaxed">{cat.tagline}</p>
          <p className="text-charcoal/50 text-sm mt-2">{cat.description}</p>
        </header>

        {/* Subcategory tabs */}
        <div className="overflow-x-auto -mx-6 px-6 mb-10 border-b border-clay/30">
          <div className="flex gap-1 min-w-max">
            <SubTab label="All" active={active === "all"} onClick={() => setActive("all")} />
            {cat.subcategories.map((sc) => (
              <SubTab
                key={sc.slug}
                label={sc.name}
                active={active === sc.slug}
                onClick={() => setActive(sc.slug)}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-charcoal/50 py-20 italic font-display text-xl">
            No designs in this section yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d) => (
              <DesignCard key={d.slug} design={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SubTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 text-[11px] uppercase tracking-[0.22em] whitespace-nowrap transition-all border-b-2 -mb-px ${
        active
          ? "border-terracotta text-charcoal"
          : "border-transparent text-charcoal/60 hover:text-charcoal"
      }`}
    >
      {label}
    </button>
  );
}