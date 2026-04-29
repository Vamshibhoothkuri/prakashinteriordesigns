import { Link } from "@tanstack/react-router";
import type { Design } from "@/lib/categories";

export function DesignCard({ design }: { design: Design }) {
  return (
    <Link
      to="/design/$slug"
      params={{ slug: design.slug }}
      className="group relative block overflow-hidden aspect-[4/5] border border-clay/30 hover:border-terracotta transition-all"
    >
      <img
        src={design.cover}
        alt={design.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
      {design.featured && (
        <span className="absolute top-3 right-3 bg-terracotta text-cream px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]">
          ★ Premium
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h4 className="font-display text-xl md:text-2xl text-cream leading-tight group-hover:text-terracotta transition-colors">
          {design.title}
        </h4>
        <p className="text-cream/70 text-xs mt-1.5 line-clamp-2 leading-relaxed">
          {design.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {design.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] uppercase tracking-[0.18em] text-cream/80 border border-cream/30 px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}