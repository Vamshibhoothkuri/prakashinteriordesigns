import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { adminAuth, gallery, enquiries, type GalleryItem, type Enquiry } from "@/lib/admin-auth";
import { CATEGORIES } from "@/lib/categories";
import { CATEGORY_TREE } from "@/lib/category-tree";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"uploads" | "enquiries">("uploads");
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [enqs, setEnqs] = useState<Enquiry[]>([]);
  const [category, setCategory] = useState<GalleryItem["category"]>("residential");
  const [sectionName, setSectionName] = useState<string>("");
  const [typeName, setTypeName] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<{ name: string; url: string; type: "image" | "video" }[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!adminAuth.isLoggedIn()) { navigate({ to: "/login" }); return; }
    setItems(gallery.getAll());
    setEnqs(enquiries.getAll());
    setReady(true);
  }, [navigate]);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (category !== "videos") {
      if (!sectionName) { toast.error("Please choose a section (e.g. Bedroom)."); return; }
      if (!typeName) { toast.error("Please choose a type (e.g. Master Bedroom)."); return; }
    }
    const newFiles = Array.from(files);
    setPendingFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPendingPreviews((prev) => [
          ...prev,
          {
            name: file.name.replace(/\.[^.]+$/, ""),
            url: reader.result as string,
            type: file.type.startsWith("video") ? "video" : "image",
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }

  function clearPending() {
    setPendingFiles([]);
    setPendingPreviews([]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function submitUploads() {
    if (pendingFiles.length === 0) { toast.error("Please select files first."); return; }
    if (category !== "videos") {
      if (!sectionName) { toast.error("Please choose a section (e.g. Bedroom)."); return; }
      if (!typeName) { toast.error("Please choose a type (e.g. Master Bedroom)."); return; }
    }
    setUploading(true);
    const newItems: GalleryItem[] = [];
    let processed = 0;
    pendingFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const tag = typeName || service.trim() || undefined;
        newItems.push({
          id: crypto.randomUUID(),
          url: reader.result as string,
          type: file.type.startsWith("video") ? "video" : "image",
          name: file.name.replace(/\.[^.]+$/, ""),
          category,
          service: tag,
          createdAt: Date.now(),
        });
        processed++;
        if (processed === pendingFiles.length) {
          gallery.add(newItems);
          setItems(gallery.getAll());
          setPendingFiles([]);
          setPendingPreviews([]);
          setUploading(false);
          if (fileRef.current) fileRef.current.value = "";
          const pathLabel = [category, sectionName, typeName].filter(Boolean).join(" → ");
          toast.success(`${newItems.length} item(s) uploaded to ${pathLabel}.`);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function remove(id: string) {
    gallery.remove(id);
    setItems(gallery.getAll());
    toast.success("Removed.");
  }

  function logout() {
    adminAuth.logout();
    navigate({ to: "/" });
  }

  if (!ready) {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-charcoal/60 text-sm uppercase tracking-[0.2em]">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-clay/30 px-6 py-5 flex items-center justify-between bg-cream sticky top-0 z-40">
        <Link to="/" className="font-display text-2xl text-charcoal">Luxe<span className="italic text-terracotta">.</span></Link>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link to="/" className="text-charcoal/70 hover:text-terracotta">View Site</Link>
          <button onClick={logout} className="px-4 py-2 bg-charcoal text-cream hover:bg-terracotta transition-colors">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">Dashboard</p>
        <h1 className="font-display text-4xl md:text-5xl mb-8">Owner <em>dashboard</em>.</h1>

        <div className="flex gap-2 mb-10 border-b border-clay/30">
          {([["uploads", "Uploads"], ["enquiries", `Enquiries (${enqs.length})`]] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-5 py-3 text-[11px] uppercase tracking-[0.22em] border-b-2 -mb-px ${
                tab === k ? "border-terracotta text-charcoal" : "border-transparent text-charcoal/60 hover:text-charcoal"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {tab === "uploads" && (
        <>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60">Upload to:</span>
          {(["residential", "commercial", "home-theatre", "videos"] as const).map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setSectionName(""); setTypeName(""); }}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] border ${
                category === c ? "bg-charcoal text-cream border-charcoal" : "border-clay/40 text-charcoal/70 hover:border-charcoal"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {category !== "videos" && (() => {
          const tree = CATEGORY_TREE.find((c) => c.slug === category);
          const sections = tree?.sections ?? [];
          const currentSection = sections.find((s) => s.name === sectionName);
          const types = currentSection?.types ?? [];
          return (
            <div className="mb-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60 w-24">Section:</span>
                {sections.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => { setSectionName(s.name); setTypeName(""); }}
                    className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border ${
                      sectionName === s.name ? "bg-terracotta text-cream border-terracotta" : "border-clay/40 text-charcoal/70 hover:border-terracotta"
                    }`}
                  >{s.name}</button>
                ))}
              </div>
              {currentSection && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60 w-24">Type:</span>
                  {types.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setTypeName(t.name)}
                      className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border ${
                        typeName === t.name ? "bg-charcoal text-cream border-charcoal" : "border-clay/40 text-charcoal/70 hover:border-charcoal"
                      }`}
                    >{t.name}</button>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-charcoal/60">
                Path: <span className="text-charcoal">{category}</span>
                {sectionName && <> → <span className="text-charcoal">{sectionName}</span></>}
                {typeName && <> → <span className="text-charcoal">{typeName}</span></>}
              </p>
            </div>
          );
        })()}

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60">Tag service (optional):</span>
          <input
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Override tag (defaults to selected type)"
            list="service-suggestions"
            className="px-4 py-2 text-sm border border-clay/40 bg-cream focus:border-terracotta focus:outline-none min-w-[280px]"
          />
          <datalist id="service-suggestions">
            {Array.from(new Set([
              ...CATEGORIES.flatMap((c) => c.designs.map((d) => d.title)),
              ...CATEGORY_TREE.flatMap((c) => c.sections.flatMap((s) => s.types.map((t) => t.name))),
            ])).map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          <p className="w-full text-[11px] text-charcoal/60 mt-1">
            Optional override. Leave empty to use the selected Type as the tag.
          </p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed p-16 text-center cursor-pointer transition-colors ${dragOver ? "border-terracotta bg-sand" : "border-clay/50 hover:border-terracotta"}`}
        >
          <p className="font-display text-2xl mb-2">Drop images or videos here</p>
          <p className="text-sm text-charcoal/60">or click to browse</p>
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>

        {pendingPreviews.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl">Selected files <span className="text-charcoal/40 text-base">({pendingPreviews.length})</span></h3>
              <div className="flex gap-2">
                <button onClick={clearPending} className="px-4 py-2 border border-clay/40 text-charcoal/70 text-[11px] uppercase tracking-[0.2em] hover:border-charcoal hover:text-charcoal transition-colors">Clear</button>
                <button
                  onClick={submitUploads}
                  disabled={uploading}
                  className="px-4 py-2 bg-terracotta text-cream text-[11px] uppercase tracking-[0.2em] hover:bg-charcoal transition-colors disabled:opacity-50"
                >
                  {uploading ? "Uploading…" : "Submit Uploads"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {pendingPreviews.map((p, i) => (
                <div key={i} className="relative aspect-square overflow-hidden border border-clay/30">
                  {p.type === "video" ? (
                    <video src={p.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-charcoal/60 text-cream text-[10px] px-2 py-1 truncate">{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pendingPreviews.length > 0 && (
          <div className="sticky bottom-0 inset-x-0 mt-8 -mx-6 px-6 py-4 bg-charcoal text-cream border-t border-terracotta/40 flex flex-wrap items-center justify-between gap-4 z-30">
            <div className="text-[11px] uppercase tracking-[0.2em]">
              <span className="text-cream/60">Submitting to:</span>{" "}
              <span className="text-terracotta">{category}</span>
              {sectionName && <> → <span className="text-terracotta">{sectionName}</span></>}
              {typeName && <> → <span className="text-terracotta">{typeName}</span></>}
              <span className="ml-3 text-cream/60">{pendingPreviews.length} file(s)</span>
            </div>
            <div className="flex gap-2">
              <button onClick={clearPending} className="px-4 py-2 border border-cream/30 text-cream text-[11px] uppercase tracking-[0.2em] hover:border-terracotta hover:text-terracotta transition-colors">Cancel</button>
              <button
                onClick={submitUploads}
                disabled={uploading}
                className="px-6 py-2 bg-terracotta text-cream text-[11px] uppercase tracking-[0.2em] hover:bg-cream hover:text-charcoal transition-colors disabled:opacity-50"
              >
                {uploading ? "Uploading…" : "Submit all"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-display text-2xl mb-6">Uploaded items <span className="text-charcoal/40 text-base">({items.length})</span></h2>
          {items.length === 0 ? (
            <p className="text-charcoal/50 italic font-display text-lg">No uploads yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it) => (
                <div key={it.id} className="group relative aspect-square overflow-hidden border border-clay/30">
                  {it.type === "video" ? (
                    <video src={it.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={it.url} alt={it.name} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                    <div className="text-cream text-sm text-center">{it.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-terracotta">{it.category}</div>
                    {it.service && (
                      <div className="text-[10px] uppercase tracking-[0.2em] text-clay">{it.service}</div>
                    )}
                    <button onClick={() => remove(it.id)} className="px-3 py-1.5 bg-destructive text-destructive-foreground text-[11px] uppercase tracking-[0.2em]">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
        )}

        {tab === "enquiries" && (
          <div>
            <h2 className="font-display text-2xl mb-6">Client enquiries</h2>
            {enqs.length === 0 ? (
              <p className="text-charcoal/50 italic font-display text-lg">No enquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {enqs.map((e) => (
                  <div key={e.id} className="border border-clay/30 bg-cream p-5">
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                      <div>
                        <div className="font-display text-xl text-charcoal">{e.firstName} {e.lastName}</div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-terracotta mt-1">
                          {e.projectType || "General enquiry"} · {new Date(e.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {e.phone && (
                          <a
                            href={`https://wa.me/${e.phone.replace(/\D/g, "")}`}
                            target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.2em]"
                          >WhatsApp</a>
                        )}
                        <a href={`mailto:${e.email}`} className="px-3 py-1.5 bg-charcoal text-cream text-[11px] uppercase tracking-[0.2em]">Email</a>
                        <button
                          onClick={() => { enquiries.remove(e.id); setEnqs(enquiries.getAll()); toast.success("Removed."); }}
                          className="px-3 py-1.5 bg-destructive text-destructive-foreground text-[11px] uppercase tracking-[0.2em]"
                        >Delete</button>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-charcoal/85 mb-3">
                      <div><span className="text-charcoal/50">Email:</span> {e.email}</div>
                      {e.phone && <div><span className="text-charcoal/50">Phone:</span> {e.phone}</div>}
                    </div>
                    <p className="text-charcoal/80 text-sm leading-relaxed whitespace-pre-wrap">{e.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}