// @ts-nocheck
// Public API routes — no auth required
import { Hono } from 'hono';
import type { AppContext } from '../index';

export const publicRoutes = new Hono<AppContext>();

// ─── Site Settings ────────────────────────────────────
publicRoutes.get('/site-settings', async (c) => {
  const db = c.get('db');
  const doc = await db.get('site_settings', 'main');
  if (!doc) return c.json({ error: 'Site settings not found' }, 404);
  return c.json(doc);
});

// ─── Menu: categories + items ─────────────────────────
publicRoutes.get('/menu', async (c) => {
  const db = c.get('db');
  const [categories, items] = await Promise.all([
    db.list('categories'),
    db.list('menu_items'),
  ]);

  // Sort by order field
  categories.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  items.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  // Filter active items only
  const activeItems = items.filter((item: any) => item.is_active !== false);

  return c.json({ categories, items: activeItems });
});

// ─── Single menu item by slug ─────────────────────────
publicRoutes.get('/menu/:slug', async (c) => {
  const slug = c.req.param('slug');
  const db = c.get('db');
  const items = await db.query('menu_items', 'slug', 'EQUAL', slug, 1);
  if (items.length === 0) return c.json({ error: 'Menu item not found' }, 404);
  return c.json(items[0]);
});

// ─── Gallery ──────────────────────────────────────────
publicRoutes.get('/gallery', async (c) => {
  const db = c.get('db');
  const images = await db.list('gallery');
  const active = images
    .filter((img: any) => img.is_active !== false)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  return c.json(active);
});

// ─── About: team + brand values ───────────────────────
publicRoutes.get('/about', async (c) => {
  const db = c.get('db');
  const [team, values] = await Promise.all([
    db.list('team'),
    db.list('brand_values'),
  ]);

  team.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  values.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return c.json({ team, values });
});

// ─── Testimonials ─────────────────────────────────────
publicRoutes.get('/testimonials', async (c) => {
  const db = c.get('db');
  const all = await db.list('testimonials');
  const featured = all.filter((t: any) => t.is_featured !== false);
  return c.json(featured);
});

// ─── Contact form submission ──────────────────────────
publicRoutes.post('/contact', async (c) => {
  const body = await c.req.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return c.json({ error: 'Name, email, and message are required' }, 400);
  }

  const db = c.get('db');
  await db.create('contact_messages', {
    name,
    email,
    phone: phone || '',
    message,
    is_read: false,
    created_at: new Date().toISOString(),
  });

  return c.json({ success: true, message: 'Message sent successfully' });
});

// ─── Order placement ──────────────────────────────────
publicRoutes.post('/orders', async (c) => {
  const body = await c.req.json();
  const { items, customer_name, customer_phone, notes, total } = body;

  if (!items || !customer_name || !customer_phone) {
    return c.json({ error: 'Items, name, and phone are required' }, 400);
  }

  const db = c.get('db');
  const order = await db.create('orders', {
    items,
    customer_name,
    customer_phone,
    notes: notes || '',
    total: total || 0,
    status: 'pending',
    created_at: new Date().toISOString(),
  });

  return c.json({ success: true, order_id: order.id });
});
