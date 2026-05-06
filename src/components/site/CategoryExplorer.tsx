import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, Sparkles } from "lucide-react";
import { CATEGORY_TREE, type TreeCategory, type TreeSection } from "@/lib/category-tree";

type Step = "category" | "section" | "type";

const STORAGE_KEY = "explorer-state-v1";

export function CategoryExplorer() {
  const [step, setStep] = useState<Step>("category");
  const [cat, setCat] = useState<TreeCategory | null>(null);
  const [section, setSection] = useState<TreeSection | null>(null);

  // Restore last position so users return to the section list after viewing a type page.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { catSlug?: string; sectionName?: string; step?: Step };
      const c = CATEGORY_TREE.find((x) => x.slug === saved.catSlug) || null;
      const s = c?.sections.find((x) => x.name === saved.sectionName) || null;
      if (saved.step === "section" && c) { setCat(c); setStep("section"); }
      else if (saved.step === "type" && c && s) { setCat(c); setSection(s); setStep("section"); }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        catSlug: cat?.slug, sectionName: section?.name, step,
      }));
    } catch {}
  }, [step, cat, section]);

  return (
    <section id="services" className="bg-charcoal text-cream py-20 md:py-28 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">Browse our work</p>
          <h2 className="font-display text-4xl md:text-5xl">
            Explore <em className="text-clay">designs</em>.
          </h2>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8 text-[11px] uppercase tracking-[0.22em] text-cream/70">
          <button
            onClick={() => { setStep("category"); setCat(null); setSection(null); }}
            className={`hover:text-terracotta transition-colors ${step === "category" ? "text-cream" : ""}`}
          >
            Categories
          </button>
          {cat && (
            <>
              <span>/</span>
              <button
                onClick={() => { setStep("section"); setSection(null); }}
                className={`hover:text-terracotta transition-colors ${step === "section" ? "text-cream" : ""}`}
              >
                {cat.name}
              </button>
            </>
          )}
          {section && (
            <>
              <span>/</span>
              <span className="text-cream">{section.name}</span>
            </>
          )}
          {step !== "category" && (
            <button
              onClick={() => {
                if (step === "type") { setStep("section"); setSection(null); }
                else { setStep("category"); setCat(null); }
              }}
              className="ml-auto inline-flex items-center gap-1 text-cream/70 hover:text-terracotta"
            >
              <ChevronLeft className="w-3 h-3" /> Back
            </button>
          )}
        </div>

        {step === "category" && (
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {CATEGORY_TREE.map((c) => (
              <button
                key={c.slug}
                onClick={() => { setCat(c); setStep("section"); }}
                className="group relative overflow-hidden border border-cream/15 hover:border-terracotta transition-colors text-left"
              >
                <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                  <img src={c.cover} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/10" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex items-end justify-between gap-2">
                  <div>
                    <div className="text-lg md:text-2xl mb-0.5">{c.icon}</div>
                    <h3 className="font-display text-base md:text-2xl text-cream drop-shadow-md leading-tight">{c.name}</h3>
                    <p className="hidden md:block text-cream/95 text-xs mt-1">{c.tagline}</p>
                  </div>
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-terracotta flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-5 md:h-5 text-cream" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === "section" && cat && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.sections.map((s) => (
              <button
                key={s.name}
                onClick={() => { setSection(s); setStep("type"); }}
                className={`group relative overflow-hidden border text-left transition-colors ${
                  s.premium
                    ? "border-terracotta/60 hover:border-terracotta bg-gradient-to-br from-charcoal to-[#1a1410]"
                    : "border-cream/15 hover:border-terracotta"
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.cover} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-charcoal/20" />
                {s.premium && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-terracotta text-cream text-[9px] uppercase tracking-[0.22em]">
                    <Sparkles className="w-3 h-3" /> Premium
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl text-cream drop-shadow-md">{s.name}</h3>
                    <p className="text-cream/90 text-[11px] uppercase tracking-[0.18em] mt-1">{s.types.length} styles</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-cream/10 group-hover:bg-terracotta flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-cream" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === "type" && cat && section && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.types.map((t) => (
              <Link
                key={t.name}
                to="/browse/$category/$section/$type"
                params={{
                  category: cat.slug,
                  section: encodeURIComponent(section.name),
                  type: encodeURIComponent(t.name),
                }}
                className="group relative overflow-hidden border border-cream/15 hover:border-terracotta transition-colors block"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={t.cover} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/65 to-charcoal/15" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                  <h3 className="font-display text-base text-cream leading-tight drop-shadow-md">{t.name}</h3>
                  <div className="w-8 h-8 rounded-full bg-cream/10 group-hover:bg-terracotta flex items-center justify-center transition-colors shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 text-cream" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}