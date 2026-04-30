import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
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
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/10" />
      {design.featured && (
        <span className="absolute top-3 right-3 bg-terracotta text-cream px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]">
          ★ Premium
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
        <h4 className="font-display text-lg md:text-xl text-white leading-tight drop-shadow-md group-hover:text-terracotta transition-colors">
          {design.title}
        </h4>
        <span className="shrink-0 w-9 h-9 rounded-full bg-cream/95 text-charcoal flex items-center justify-center group-hover:bg-terracotta group-hover:text-cream transition-colors">
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </span>
      </div>
    </Link>
  );
}