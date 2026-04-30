import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { getCategory } from "@/lib/categories";
import { DesignCard } from "@/components/site/DesignCard";

export const Route = createFileRoute("/category/$category/$subcategory")({
  head: ({ params }) => {
    const cat = getCategory(params.category);
    const sc = cat?.subcategories.find((s) => s.slug === params.subcategory);
    const title = cat && sc ? `${sc.name} — ${cat.name} Designs` : "Designs — Luxe Interiors";
    const desc = cat && sc ? `Browse our ${sc.name.toLowerCase()} designs in ${cat.name.toLowerCase()}.` : "Browse our portfolio.";
    return { meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
    ]};
  },
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    const sc = cat.subcategories.find((s) => s.slug === params.subcategory);
    if (!sc) throw notFound();
    return { cat, sc };
  },
  component: SubcategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-charcoal px-6">
      <h1 className="font-display text-5xl mb-4">Not found</h1>
      <Link to="/" className="text-terracotta uppercase tracking-[0.2em] text-xs">← Back home</Link>
    </div>
  ),
});

function SubcategoryPage() {
  const { category: catSlug, subcategory: subSlug } = useParams({
    from: "/category/$category/$subcategory",
  });
  const cat = getCategory(catSlug)!;
  const sc = cat.subcategories.find((s) => s.slug === subSlug)!;
  const designs = cat.designs.filter((d) => d.subcategory === subSlug);

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>/</span>
          <Link to="/category/$category" params={{ category: cat.slug }} className="hover:text-terracotta transition-colors">
            {cat.name}
          </Link>
          <span>/</span>
          <span className="text-charcoal">{sc.name}</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">
            {cat.name} · {sc.name}
          </p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">
            {sc.name} <em className="text-terracotta">Designs</em>
          </h1>
          <p className="text-charcoal/70 text-base md:text-lg leading-relaxed">
            Explore our collection of {sc.name.toLowerCase()} in {cat.name.toLowerCase()}.
          </p>
        </header>

        {designs.length === 0 ? (
          <p className="text-center text-charcoal/50 py-20 italic font-display text-xl">
            No designs in this section yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {designs.map((d) => (
              <DesignCard key={d.slug} design={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}