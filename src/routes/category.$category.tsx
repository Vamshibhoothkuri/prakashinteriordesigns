import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { getCat } from "@/lib/taxonomy";

export const Route = createFileRoute("/category/$category")({
  head: ({ params }) => {
    const cat = getCat(params.category);
    const title = cat ? `${cat.name} Designs — Luxe Interiors` : "Category — Luxe Interiors";
    const desc = cat?.tagline ?? "Browse our portfolio by category.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: cat?.cover ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const cat = getCat(params.category);
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
  const { category } = useParams({ from: "/category/$category" });
  const cat = getCat(category)!;

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <span className="text-charcoal">{cat.name}</span>
        </nav>

        <header className="mb-12 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">{cat.name}</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">
            {cat.name} <em className="text-terracotta">designs</em>
          </h1>
          <p className="text-charcoal/85 text-base md:text-lg leading-relaxed">{cat.tagline}</p>
          <p className="text-charcoal/60 text-sm mt-2">{cat.description}</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cat.subcategories.map((sc) => {
            const isPremium = sc.slug === "home-theatre";
            return (
              <Link
                key={sc.slug}
                to="/category/$category/$sub"
                params={{ category: cat.slug, sub: sc.slug }}
                className={`group relative block overflow-hidden aspect-[4/5] border transition-all ${
                  isPremium ? "border-terracotta" : "border-clay/30 hover:border-terracotta"
                }`}
              >
                <img src={sc.cover} alt={sc.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute inset-0 ${isPremium ? "bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/30" : "bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/10"}`} />
                {isPremium && (
                  <span className="absolute top-3 right-3 bg-terracotta text-cream px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]">★ Premium</span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl text-white mb-1">{sc.name}</h3>
                  <p className="text-cream/85 text-xs leading-relaxed line-clamp-2">{sc.description}</p>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-terracotta">
                    {sc.types.length} types →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
