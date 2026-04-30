import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, Inbox, LogOut, Trash2, Image as ImageIcon, FileVideo, Mail } from "lucide-react";
import {
  adminAuth,
  designsStore,
  enquiriesStore,
  type AdminDesign,
  type AdminMedia,
  type Enquiry,
} from "@/lib/admin-auth";
import { CATEGORIES } from "@/lib/categories";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type Tab = "upload" | "enquiries";

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("upload");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!adminAuth.isLoggedIn()) {
      navigate({ to: "/login" });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) return null;

  function logout() {
    adminAuth.logout();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-charcoal text-cream flex flex-col sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-cream/10">
          <Link to="/" className="font-display text-2xl">
            Luxe<span className="italic text-terracotta">.</span>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <SidebarBtn
            active={tab === "upload"}
            onClick={() => setTab("upload")}
            icon={<Upload size={16} />}
            label="Upload Designs"
          />
          <SidebarBtn
            active={tab === "enquiries"}
            onClick={() => setTab("enquiries")}
            icon={<Inbox size={16} />}
            label="View Enquiries"
          />
        </nav>
        <div className="p-3 border-t border-cream/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-[0.2em] text-cream/70 hover:bg-cream/10 hover:text-cream transition-colors"
          >
            View Site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-[0.2em] text-cream/70 hover:bg-terracotta hover:text-cream transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 md:p-12 overflow-x-hidden">
        {tab === "upload" ? <UploadDesigns /> : <EnquiriesView />}
      </main>
    </div>
  );
}

function SidebarBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${
        active
          ? "bg-terracotta text-cream"
          : "text-cream/75 hover:bg-cream/10 hover:text-cream"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ----------------------- Upload Designs ----------------------- */
function UploadDesigns() {
  const [designs, setDesigns] = useState<AdminDesign[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [subcategory, setSubcategory] = useState(CATEGORIES[0].subcategories[0]?.slug ?? "");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState<AdminMedia[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDesigns(designsStore.getAll());
  }, []);

  const cat = CATEGORIES.find((c) => c.slug === category) ?? CATEGORIES[0];

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const next: AdminMedia[] = [];
    let pending = files.length;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        next.push({
          url: reader.result as string,
          type: file.type.startsWith("video") ? "video" : "image",
          name: file.name,
        });
        pending--;
        if (pending === 0) setMedia((prev) => [...prev, ...next]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removeMedia(idx: number) {
    setMedia((prev) => prev.filter((_, i) => i !== idx));
  }

  function reset() {
    setTitle("");
    setDescription("");
    setMaterials("");
    setTags("");
    setMedia([]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    if (media.length === 0) {
      toast.error("Please upload at least one image or video.");
      return;
    }
    const design: AdminDesign = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category,
      subcategory,
      description: description.trim(),
      materials: materials.split(",").map((s) => s.trim()).filter(Boolean),
      tags: tags.split(",").map((s) => s.trim()).filter(Boolean),
      media,
      createdAt: Date.now(),
    };
    designsStore.add(design);
    setDesigns(designsStore.getAll());
    toast.success("Design saved.");
    reset();
  }

  function removeDesign(id: string) {
    designsStore.remove(id);
    setDesigns(designsStore.getAll());
    toast.success("Design removed.");
  }

  const inputCls =
    "w-full bg-cream border border-clay/40 rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-terracotta transition-colors text-charcoal placeholder:text-charcoal/50";

  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">Dashboard</p>
      <h1 className="font-display text-3xl md:text-4xl mb-8 text-charcoal">
        Upload a <em>new design</em>.
      </h1>

      <form onSubmit={submit} className="bg-white border border-clay/30 p-6 md:p-8 space-y-4 mb-12">
        <div>
          <Label>Design title</Label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Modern Modular Kitchen"
            className={inputCls}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => {
                const slug = e.target.value;
                setCategory(slug);
                const c = CATEGORIES.find((x) => x.slug === slug);
                setSubcategory(c?.subcategories[0]?.slug ?? "");
              }}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Subcategory</Label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className={inputCls}
            >
              {cat.subcategories.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe the design, finish and feel."
            className={`${inputCls} resize-none`}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Materials (comma separated)</Label>
            <input
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="Quartz countertop, Acrylic shutters"
              className={inputCls}
            />
          </div>
          <div>
            <Label>Tags (comma separated)</Label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Modern, Modular"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <Label>Images & Videos</Label>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-clay/50 hover:border-terracotta cursor-pointer p-8 text-center transition-colors"
          >
            <p className="text-sm text-charcoal/70">Click to upload images or videos</p>
            <p className="text-xs text-charcoal/50 mt-1">You can upload multiple files</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          {media.length > 0 && (
            <div className="mt-3 grid grid-cols-3 md:grid-cols-5 gap-2">
              {media.map((m, i) => (
                <div key={i} className="relative aspect-square border border-clay/30 group">
                  {m.type === "video" ? (
                    <video src={m.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(i)}
                    className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-cream transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            className="px-7 py-3 bg-charcoal text-cream text-xs uppercase tracking-[0.22em] hover:bg-terracotta transition-colors"
          >
            Save Design
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-7 py-3 border border-charcoal/30 text-charcoal text-xs uppercase tracking-[0.22em] hover:bg-charcoal hover:text-cream transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      <div>
        <h2 className="font-display text-2xl mb-5 text-charcoal">
          Saved designs <span className="text-charcoal/40 text-base">({designs.length})</span>
        </h2>
        {designs.length === 0 ? (
          <p className="text-charcoal/50 italic font-display text-lg">No designs uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.map((d) => {
              const cover = d.media[0];
              return (
                <div key={d.id} className="bg-white border border-clay/30 overflow-hidden">
                  <div className="aspect-[4/3] bg-sand relative">
                    {cover ? (
                      cover.type === "video" ? (
                        <video src={cover.url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={cover.url} alt={d.title} className="w-full h-full object-cover" />
                      )
                    ) : null}
                    <span className="absolute top-2 left-2 bg-charcoal/80 text-cream text-[10px] uppercase tracking-[0.2em] px-2 py-1 flex items-center gap-1">
                      {cover?.type === "video" ? <FileVideo size={10} /> : <ImageIcon size={10} />}
                      {d.media.length}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-terracotta mb-1">
                      {d.category} · {d.subcategory}
                    </p>
                    <h3 className="font-display text-lg text-charcoal mb-2">{d.title}</h3>
                    <p className="text-xs text-charcoal/70 line-clamp-2 mb-3">{d.description}</p>
                    <button
                      onClick={() => removeDesign(d.id)}
                      className="text-[11px] uppercase tracking-[0.2em] text-destructive hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.22em] text-charcoal/70 mb-1.5">
      {children}
    </label>
  );
}

/* ----------------------- Enquiries ----------------------- */
function EnquiriesView() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    setItems(enquiriesStore.getAll());
  }, []);

  function open(e: Enquiry) {
    setSelected(e);
    if (!e.read) {
      enquiriesStore.markRead(e.id);
      setItems(enquiriesStore.getAll());
    }
  }

  function remove(id: string) {
    enquiriesStore.remove(id);
    setItems(enquiriesStore.getAll());
    if (selected?.id === id) setSelected(null);
    toast.success("Enquiry deleted.");
  }

  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta mb-3">Inbox</p>
      <h1 className="font-display text-3xl md:text-4xl mb-8 text-charcoal">
        User <em>enquiries</em>{" "}
        <span className="text-charcoal/40 text-2xl">({items.length})</span>
      </h1>

      {items.length === 0 ? (
        <div className="bg-white border border-clay/30 p-12 text-center">
          <Mail className="mx-auto text-charcoal/30 mb-3" size={32} />
          <p className="text-charcoal/60 italic font-display text-lg">No enquiries yet.</p>
          <p className="text-xs text-charcoal/50 mt-2">
            Submissions from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-5">
          <div className="md:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {items.map((e) => (
              <button
                key={e.id}
                onClick={() => open(e)}
                className={`w-full text-left bg-white border p-4 transition-colors ${
                  selected?.id === e.id
                    ? "border-terracotta"
                    : "border-clay/30 hover:border-charcoal"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-base text-charcoal">
                    {e.firstName} {e.lastName}
                  </span>
                  {!e.read && (
                    <span className="w-2 h-2 rounded-full bg-terracotta" aria-label="unread" />
                  )}
                </div>
                <div className="text-[11px] text-charcoal/60 mb-1">{e.email}</div>
                <div className="text-xs text-charcoal/70 line-clamp-2">{e.message}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mt-2">
                  {new Date(e.createdAt).toLocaleString()}
                </div>
              </button>
            ))}
          </div>

          <div className="md:col-span-3">
            {selected ? (
              <div className="bg-white border border-clay/30 p-6">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="font-display text-2xl text-charcoal">
                      {selected.firstName} {selected.lastName}
                    </h2>
                    <p className="text-xs text-charcoal/60 mt-1">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(selected.id)}
                    className="text-[11px] uppercase tracking-[0.2em] text-destructive hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
                <Field label="Email" value={selected.email} />
                {selected.phone && <Field label="Phone" value={selected.phone} />}
                {selected.projectType && (
                  <Field label="Project type" value={selected.projectType} />
                )}
                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-terracotta mb-2">
                    Message
                  </div>
                  <p className="text-sm text-charcoal/85 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
                <a
                  href={`mailto:${selected.email}`}
                  className="mt-6 inline-flex px-5 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] hover:bg-terracotta transition-colors"
                >
                  Reply by email
                </a>
              </div>
            ) : (
              <div className="bg-white border border-clay/30 p-12 text-center text-charcoal/50">
                Select an enquiry to view details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <div className="text-[10px] uppercase tracking-[0.25em] text-terracotta mb-1">{label}</div>
      <div className="text-sm text-charcoal">{value}</div>
    </div>
  );
}