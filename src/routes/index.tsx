import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { gallery, type GalleryItem } from "@/lib/admin-auth";
import heroImg from "@/assets/hero-interior.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import aboutImg from "@/assets/about-studio.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

/* ----------------------------- NAV ----------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-cream/80 border-b border-clay/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="font-display text-2xl tracking-tight text-charcoal">
          Luxe<span className="italic text-terracotta">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-charcoal/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-terracotta transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] hover:bg-terracotta transition-colors"
        >
          Consult
        </a>
        <button
          className="md:hidden text-charcoal"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-cream border-t border-clay/20 px-6 py-5 flex flex-col gap-4 text-sm uppercase tracking-[0.18em]">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="bg-charcoal text-cream px-5 py-2.5 text-center">Consult</a>
        </div>
      )}
    </header>
  );
}

/* ---------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section id="home" className="pt-32 md:pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-6">Interior Design Studio — Est. 2015</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8">
            Crafting spaces that <em className="text-terracotta font-light">whisper</em> your story.
          </h1>
          <p className="text-charcoal/70 text-lg max-w-md mb-10 leading-relaxed">
            Warm, timeless interiors designed around how you truly live. From intimate residences to considered commercial spaces.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#portfolio" className="px-7 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.22em] hover:bg-terracotta transition-colors">View Portfolio</a>
            <a href="#contact" className="px-7 py-3.5 border border-charcoal text-charcoal text-xs uppercase tracking-[0.22em] hover:bg-charcoal hover:text-cream transition-colors">Get Consultation</a>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-3">
          <img src={heroImg} alt="Interior" className="col-span-2 w-full h-72 md:h-96 object-cover" />
          <img src={p1} alt="Design" loading="lazy" className="w-full h-48 md:h-56 object-cover" />
          <img src={p3} alt="Design" loading="lazy" className="w-full h-48 md:h-56 object-cover" />
          <div className="absolute -bottom-8 -left-4 md:-left-10 bg-cream border border-clay/40 p-6 shadow-xl grid grid-cols-3 gap-5 text-center">
            <Stat n="180+" l="Projects" />
            <Stat n="10" l="Years" />
            <Stat n="98%" l="Satisfaction" />
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl md:text-3xl text-terracotta">{n}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mt-1">{l}</div>
    </div>
  );
}

/* -------------------------- SERVICES --------------------------- */
function Services() {
  const items = [
    { n: "01", t: "Residential Design", d: "Homes that reflect the rhythm of your daily life." },
    { n: "02", t: "Commercial Spaces", d: "Brand-forward environments for hospitality and retail." },
    { n: "03", t: "3D Visualization", d: "Photorealistic previews before a single wall is touched." },
    { n: "04", t: "Space Planning", d: "Floor plans engineered around flow and light." },
    { n: "05", t: "Furniture & Décor", d: "Curated bespoke pieces sourced from our ateliers." },
    { n: "06", t: "Full Project Management", d: "End-to-end execution from concept to handover." },
  ];
  return (
    <section id="services" className="bg-charcoal text-cream py-24 md:py-32 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">What we do</p>
          <h2 className="font-display text-4xl md:text-5xl"><em className="text-clay">Services</em> tailored to every space.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10">
          {items.map((i) => (
            <div key={i.n} className="group bg-charcoal hover:bg-terracotta transition-colors duration-500 p-10 min-h-[240px] relative overflow-hidden">
              <div className="font-display text-7xl text-cream/10 absolute top-4 right-6 group-hover:text-cream/30 transition-colors">{i.n}</div>
              <h3 className="font-display text-2xl mb-3 relative z-10">{i.t}</h3>
              <p className="text-cream/70 text-sm leading-relaxed relative z-10">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- PORTFOLIO -------------------------- */
const defaultPortfolio: GalleryItem[] = [
  { id: "d1", url: p1, type: "image", name: "Serene Bedroom Retreat", category: "residential", createdAt: 0 },
  { id: "d2", url: p2, type: "image", name: "Terracotta Lounge", category: "residential", createdAt: 0 },
  { id: "d3", url: p3, type: "image", name: "Atelier Workspace", category: "commercial", createdAt: 0 },
  { id: "d4", url: p4, type: "image", name: "Classic Dining Hall", category: "residential", createdAt: 0 },
  { id: "d5", url: heroImg, type: "image", name: "Studio Loft", category: "commercial", createdAt: 0 },
];

function Portfolio() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial" | "videos">("all");
  const [items, setItems] = useState<GalleryItem[]>(defaultPortfolio);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const saved = gallery.getAll();
    setItems([...saved, ...defaultPortfolio]);
  }, []);

  const filtered = items.filter((i) =>
    filter === "all" ? true : filter === "videos" ? i.type === "video" : i.category === filter
  );

  const tabs = [
    { k: "all", l: "All" },
    { k: "residential", l: "Residential" },
    { k: "commercial", l: "Commercial" },
    { k: "videos", l: "Videos" },
  ] as const;

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">Selected Work</p>
            <h2 className="font-display text-4xl md:text-5xl">Our <em>portfolio</em>.</h2>
          </div>
          <div className="flex flex-wrap gap-1 border border-clay/40">
            {tabs.map((t) => (
              <button
                key={t.k}
                onClick={() => setFilter(t.k)}
                className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  filter === t.k ? "bg-charcoal text-cream" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-charcoal/50 py-16 italic font-display text-xl">No items in this category yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item)}
                className={`group relative block w-full mb-4 overflow-hidden break-inside-avoid ${
                  idx % 5 === 0 ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                {item.type === "video" ? (
                  <>
                    <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                    <span className="absolute top-4 right-4 bg-cream/90 text-charcoal px-3 py-1 text-[10px] uppercase tracking-[0.2em]">▶ Video</span>
                  </>
                ) : (
                  <img src={item.url} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <div className="text-left">
                    <div className="font-display text-xl text-cream">{item.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-terracotta mt-1">{item.category}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-cream hover:text-terracotta text-3xl"
            aria-label="close"
          >
            ×
          </button>
          <div className="max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "video" ? (
              <video src={lightbox.url} controls autoPlay className="w-full max-h-[85vh] object-contain" />
            ) : (
              <img src={lightbox.url} alt={lightbox.name} className="w-full max-h-[85vh] object-contain" />
            )}
            <div className="mt-4 text-center">
              <div className="font-display text-2xl text-cream">{lightbox.name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-terracotta mt-1">{lightbox.category}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* --------------------------- PROCESS --------------------------- */
function Process() {
  const steps = [
    { n: "01", t: "Discovery Call", d: "We listen. You share your story, lifestyle, and vision for the space." },
    { n: "02", t: "Concept Design", d: "Mood boards, material palettes, and layout studies crafted for you." },
    { n: "03", t: "Design Development", d: "3D visualisations, drawings, and bespoke sourcing of every piece." },
    { n: "04", t: "Installation", d: "White-glove execution, styled and handed over ready to live in." },
  ];
  return (
    <section id="process" className="bg-sand py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">How we work</p>
          <h2 className="font-display text-4xl md:text-5xl">A considered <em>process</em>.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-display text-7xl text-clay/40 mb-2">{s.n}</div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-charcoal mb-3">{s.t}</div>
              <p className="text-charcoal/70 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- ABOUT ---------------------------- */
function About() {
  return (
    <section id="about" className="bg-charcoal text-cream py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">Our story</p>
          <h2 className="font-display text-4xl md:text-5xl mb-8">A decade of designing <em className="text-clay">warm,</em> considered interiors.</h2>
          <p className="text-cream/70 mb-5 leading-relaxed">
            Luxe was founded on the belief that great design is quiet. We blend natural materials, honest craftsmanship, and editorial restraint to create spaces that feel like they've always been yours.
          </p>
          <p className="text-cream/70 mb-8 leading-relaxed">
            From our studio, we've shaped over 180 homes, boutiques, and hospitality spaces across the globe — each one tailored to the people who call it theirs.
          </p>
          <a href="#contact" className="inline-flex px-7 py-3.5 border border-cream text-cream text-xs uppercase tracking-[0.22em] hover:bg-cream hover:text-charcoal transition-colors">Work with us</a>
        </div>
        <div className="relative">
          <img src={aboutImg} alt="Studio" loading="lazy" className="w-full h-[520px] object-cover" />
        </div>
      </div>
    </section>
  );
}

/* --------------------------- CONTACT --------------------------- */
function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Thank you — we'll be in touch within 2 business days.");
    formRef.current?.reset();
  }
  const input = "w-full bg-transparent border-b border-charcoal/30 py-3 px-1 focus:outline-none focus:border-terracotta transition-colors text-charcoal placeholder:text-charcoal/40";
  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">Get in touch</p>
          <h2 className="font-display text-4xl md:text-5xl mb-10">Let's design something <em>beautiful</em>.</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <input required placeholder="First name" className={input} />
              <input required placeholder="Last name" className={input} />
            </div>
            <input required type="email" placeholder="Email" className={input} />
            <input placeholder="Phone" className={input} />
            <select className={input} defaultValue="">
              <option value="" disabled>Project type</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Hospitality</option>
              <option>Consultation only</option>
            </select>
            <textarea required rows={4} placeholder="Tell us about your space" className={input + " resize-none"} />
            <button type="submit" className="px-8 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.22em] hover:bg-terracotta transition-colors">Send Inquiry</button>
          </form>
        </div>
        <div className="bg-sand p-10">
          <h3 className="font-display text-2xl mb-8">Studio</h3>
          <ul className="space-y-7 text-sm">
            <ContactRow label="Address" value="14 Rue de la Lumière, Paris 75004" />
            <ContactRow label="Phone" value="+33 1 42 00 00 00" />
            <ContactRow label="Email" value="studio@luxe-interiors.com" />
            <ContactRow label="Hours" value="Mon – Fri · 9:00 – 18:00" />
          </ul>
        </div>
      </div>
    </section>
  );
}
function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <li>
      <div className="text-[10px] uppercase tracking-[0.25em] text-terracotta mb-1">{label}</div>
      <div className="text-charcoal">{value}</div>
    </li>
  );
}

/* ---------------------------- FOOTER --------------------------- */
function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-14">
        <div>
          <div className="font-display text-2xl text-cream mb-4">Luxe<span className="italic text-terracotta">.</span></div>
          <p className="text-sm text-cream/60 leading-relaxed">Interior design studio crafting warm, timeless spaces for those who live with intention.</p>
        </div>
        <FooterCol title="Services" items={["Residential", "Commercial", "Visualization", "Furniture"]} />
        <FooterCol title="Company" items={["About", "Process", "Portfolio", "Contact"]} />
        <FooterCol title="Connect" items={["Instagram", "Pinterest", "LinkedIn", "Newsletter"]} />
      </div>
      <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/40">
        <div>© {new Date().getFullYear()} Luxe Interiors. All rights reserved.</div>
        <Link to="/login" className="hover:text-terracotta transition-colors">Admin Login</Link>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-cream mb-4">{title}</div>
      <ul className="space-y-2 text-sm text-cream/60">
        {items.map((i) => <li key={i} className="hover:text-terracotta transition-colors cursor-pointer">{i}</li>)}
      </ul>
    </div>
  );
}
