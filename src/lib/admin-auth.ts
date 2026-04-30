const ADMIN_KEY = "LUXE_ADMIN_2025";
const CRED_KEY = "luxe_admin_credentials";
const SESSION_KEY = "luxe_is_admin_logged_in";
const GALLERY_KEY = "luxe_gallery_items";
const DESIGNS_KEY = "luxe_admin_designs";
const ENQUIRIES_KEY = "luxe_enquiries";

export interface AdminCredentials {
  name: string;
  email: string;
  password: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  type: "image" | "video";
  name: string;
  category: "residential" | "commercial" | "videos";
  service?: string;
  createdAt: number;
}

export interface AdminMedia {
  url: string;
  type: "image" | "video";
  name: string;
}

export interface AdminDesign {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  materials: string[];
  tags: string[];
  media: AdminMedia[];
  createdAt: number;
}

export interface Enquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  createdAt: number;
  read?: boolean;
}

export const adminAuth = {
  exists(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(CRED_KEY);
  },
  get(): AdminCredentials | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(CRED_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  register(data: AdminCredentials, key: string): { ok: boolean; error?: string } {
    if (key !== ADMIN_KEY) return { ok: false, error: "Invalid admin key." };
    if (adminAuth.exists()) return { ok: false, error: "Owner account already created." };
    localStorage.setItem(CRED_KEY, JSON.stringify(data));
    localStorage.setItem(SESSION_KEY, "true");
    return { ok: true };
  },
  login(email: string, password: string): { ok: boolean; error?: string } {
    const creds = adminAuth.get();
    if (!creds) return { ok: false, error: "No admin account exists. Please register first." };
    if (creds.email !== email || creds.password !== password) {
      return { ok: false, error: "Invalid email or password." };
    }
    localStorage.setItem(SESSION_KEY, "true");
    return { ok: true };
  },
  logout() {
    localStorage.removeItem(SESSION_KEY);
  },
  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SESSION_KEY) === "true";
  },
};

export const gallery = {
  getAll(): GalleryItem[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(GALLERY_KEY);
    return raw ? JSON.parse(raw) : [];
  },
  add(items: GalleryItem[]) {
    const current = gallery.getAll();
    localStorage.setItem(GALLERY_KEY, JSON.stringify([...items, ...current]));
  },
  remove(id: string) {
    const current = gallery.getAll().filter((i) => i.id !== id);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(current));
  },
  clear() {
    localStorage.removeItem(GALLERY_KEY);
  },
};

export const designsStore = {
  getAll(): AdminDesign[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(DESIGNS_KEY);
    return raw ? JSON.parse(raw) : [];
  },
  add(design: AdminDesign) {
    const current = designsStore.getAll();
    localStorage.setItem(DESIGNS_KEY, JSON.stringify([design, ...current]));
  },
  remove(id: string) {
    const current = designsStore.getAll().filter((d) => d.id !== id);
    localStorage.setItem(DESIGNS_KEY, JSON.stringify(current));
  },
};

export const enquiriesStore = {
  getAll(): Enquiry[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(ENQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  },
  add(e: Enquiry) {
    const current = enquiriesStore.getAll();
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify([e, ...current]));
  },
  remove(id: string) {
    const current = enquiriesStore.getAll().filter((e) => e.id !== id);
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(current));
  },
  markRead(id: string) {
    const current = enquiriesStore.getAll().map((e) => (e.id === id ? { ...e, read: true } : e));
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(current));
  },
};