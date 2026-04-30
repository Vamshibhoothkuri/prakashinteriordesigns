import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/categories";
import { enquiriesStore } from "@/lib/admin-auth";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import aboutImg from "@/assets/about-studio.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Nav />
      <Hero />
      <CategoryShowcase />
      <Process />
      <Testimonials />
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
    { href: "#process", label: "Process" },
    { href: "#testimonials", label: "Testimonials" },
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
        <nav className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-charcoal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-terracotta transition-colors">
              {l.label}
            </a>
          ))}
          <Link to="/videos" className="hover:text-terracotta transition-colors">
            Videos
          </Link>
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
          <Link to="/videos" onClick={() => setOpen(false)}>Videos</Link>
          <a href="#contact" onClick={() => setOpen(false)} className="bg-charcoal text-cream px-5 py-2.5 text-center">Consult</a>
        </div>
      )}
    </header>
  );
}

/* ---------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section id="home" className="pt-24 md:pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-6">Interior Design Studio — Est. 2015</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8">
            Crafting spaces that <em className="text-terracotta font-light">whisper</em> your story.
          </h1>
          <p className="text-charcoal/85 text-lg max-w-md mb-10 leading-relaxed">
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
function CategoryShowcase() {
  return (
    <section id="services" className="bg-charcoal text-cream py-24 md:py-32 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-4">Browse our work</p>
          <h2 className="font-display text-4xl md:text-5xl">
            Explore <em className="text-clay">designs</em> by category.
          </h2>
          <p className="text-cream/85 text-sm mt-5 max-w-xl">
            Choose a category to browse the complete collection of designs in that space.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/category/$category"
              params={{ category: c.slug }}
              className="group relative block overflow-hidden aspect-[4/5] border border-cream/15 hover:border-terracotta transition-all"
            >
              <img
                src={c.cover}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-cream leading-tight group-hover:text-terracotta transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cream/70 mt-2">
                    {c.subcategories.length} sub-categories
                  </p>
                </div>
                <span className="shrink-0 w-11 h-11 rounded-full bg-cream/95 text-charcoal flex items-center justify-center group-hover:bg-terracotta group-hover:text-cream transition-colors">
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- TESTIMONIALS ------------------------ */
function Testimonials() {
  const items = [
    {
      quote: "Luxe transformed our apartment into a warm, soulful home. Every detail — from the wood tones to the lighting — feels intentional and timeless.",
      name: "Ananya & Rohan Mehta",
      role: "Residential · 3BHK Apartment",
    },
    {
      quote: "The team understood our brand instantly. Our café now has a personality our customers actually talk about. Bookings have doubled since the redesign.",
      name: "Karthik Reddy",
      role: "Owner, Brew & Bloom Café",
    },
    {
      quote: "Professional, calm, and incredibly detail-oriented. The home theatre design is beyond what we imagined. Worth every rupee.",
      name: "Priya Sharma",
      role: "Residential · Duplex Villa",
    },
    {
      quote: "From the first concept board to the final styling, the experience was seamless. Our office finally feels like us.",
      name: "Vikram Iyer",
      role: "Founder, Northbridge Studios",
    },
  ];
  return (
    <section id="testimonials" className="py-16 md:py-20 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">Kind words</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              What our <em>clients</em> say.
            </h2>
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible">
          {items.map((t) => (
            <figure
              key={t.name}
              className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-auto bg-sand border border-clay/30 p-5 flex flex-col"
            >
              <div className="text-terracotta text-xl leading-none mb-2">★★★★★</div>
              <blockquote className="text-charcoal/90 text-sm leading-relaxed mb-4 line-clamp-5">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto">
                <div className="text-charcoal text-sm font-medium">{t.name}</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-charcoal/70 mt-1">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
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
              <p className="text-charcoal/85 text-sm leading-relaxed">{s.d}</p>
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
          <p className="text-cream/70 mb-8 leading-relaxed">
            We have <span className="text-clay font-medium">professional carpenters and skilled craftsmen</span> in-house — every joint, finish and detail is built by hands that have spent years perfecting their craft.
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
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    enquiriesStore.add({
      id: crypto.randomUUID(),
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      projectType: String(fd.get("projectType") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
      createdAt: Date.now(),
    });
    toast.success("Thank you — we'll be in touch within 2 business days.");
    formRef.current?.reset();
  }
  const input = "w-full bg-cream border border-clay/40 rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-charcoal placeholder:text-charcoal/50";
  return (
    <section id="contact" className="py-16 md:py-20 px-6 bg-sand/40">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 bg-cream border border-clay/30 p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-2">Get in touch</p>
          <h2 className="font-display text-2xl md:text-3xl mb-6 text-charcoal">Let's design something <em>beautiful</em>.</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input name="firstName" required placeholder="First name" className={input} />
              <input name="lastName" required placeholder="Last name" className={input} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input name="email" required type="email" placeholder="Email" className={input} />
              <input name="phone" placeholder="Phone" className={input} />
            </div>
            <select name="projectType" className={input} defaultValue="">
              <option value="" disabled>Project type</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Hospitality</option>
              <option>Consultation only</option>
            </select>
            <textarea name="message" required rows={3} placeholder="Tell us about your space" className={input + " resize-none"} />
            <button type="submit" className="w-full sm:w-auto px-7 py-3 bg-charcoal text-cream text-xs uppercase tracking-[0.22em] hover:bg-terracotta transition-colors">Send Inquiry</button>
          </form>
        </div>
        <div className="md:col-span-2 bg-charcoal text-cream p-6 md:p-8">
          <h3 className="font-display text-xl mb-5">Studio</h3>
          <ul className="space-y-5 text-sm">
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
      <div className="text-cream/95">{value}</div>
    </li>
  );
}

/* ---------------------------- FOOTER --------------------------- */
function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-14">
        <div>
          <div className="font-display text-2xl text-cream mb-4">Luxe<span className="italic text-terracotta">.</span></div>
          <p className="text-sm text-cream/85 leading-relaxed">Interior design studio crafting warm, timeless spaces for those who live with intention.</p>
        </div>
        <FooterCol title="Services" items={["Residential", "Commercial", "Visualization", "Furniture"]} />
        <FooterCol title="Company" items={["About", "Process", "Testimonials", "Videos", "Contact"]} />
        <FooterCol title="Connect" items={["Instagram", "Pinterest", "LinkedIn", "Newsletter"]} />
      </div>
      <div className="border-t border-cream/20 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/70">
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
      <ul className="space-y-2 text-sm text-cream/85">
        {items.map((i) => <li key={i} className="hover:text-terracotta transition-colors cursor-pointer">{i}</li>)}
      </ul>
    </div>
  );
}
