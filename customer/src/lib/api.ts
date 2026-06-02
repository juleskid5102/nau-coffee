// Nâu Coffee — API Client
// Centralized fetch wrapper for all API calls

const API_BASE = import.meta.env.PROD
  ? 'https://nau-coffee-api.juleskid5102.workers.dev'
  : 'https://nau-coffee-api.juleskid5102.workers.dev'; // Use production API for now

// ─── Types ────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  featured: boolean;
  wide: boolean;
  order: number;
  is_active: boolean;
}

export interface GalleryImage {
  id: string;
  image: string;
  alt: string;
  is_tall: boolean;
  order: number;
  is_active: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  order: number;
}

export interface BrandValue {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
  is_featured: boolean;
}

export interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  social_instagram: string;
  social_facebook: string;
  philosophy_quote: string;
  philosophy_text: string;
  story_title: string;
  story_text: string;
  space_title: string;
  space_text_1: string;
  space_text_2: string;
}

export interface MenuResponse {
  categories: Category[];
  items: MenuItem[];
}

export interface AboutResponse {
  team: TeamMember[];
  values: BrandValue[];
}

// ─── Fetch Helper ─────────────────────────────────────

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error((error as { error?: string }).error || `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Public API ───────────────────────────────────────

export const api = {
  getSiteSettings: () => apiFetch<SiteSettings>('/api/public/site-settings'),
  getMenu: () => apiFetch<MenuResponse>('/api/public/menu'),
  getGallery: () => apiFetch<GalleryImage[]>('/api/public/gallery'),
  getAbout: () => apiFetch<AboutResponse>('/api/public/about'),
  getTestimonials: () => apiFetch<Testimonial[]>('/api/public/testimonials'),

  submitContact: (data: { name: string; email: string; phone?: string; message: string }) =>
    apiFetch<{ success: boolean }>('/api/public/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  submitOrder: (data: {
    items: { id: string; name: string; price: number; qty: number }[];
    customer_name: string;
    customer_phone: string;
    notes?: string;
    total: number;
  }) =>
    apiFetch<{ success: boolean; order_id: string }>('/api/public/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
