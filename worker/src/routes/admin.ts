// @ts-nocheck
// Admin API routes — will require Firebase Auth in production
import { Hono } from 'hono';
import type { AppContext } from '../index';

export const adminRoutes = new Hono<AppContext>();

// ─── Generic CRUD factory ─────────────────────────────
function createCRUD(collection: string) {
  const router = new Hono<AppContext>();

  // List all
  router.get('/', async (c) => {
    const db = c.get('db');
    const docs = await db.list(collection);
    return c.json(docs);
  });

  // Get one
  router.get('/:id', async (c) => {
    const db = c.get('db');
    const doc = await db.get(collection, c.req.param('id'));
    if (!doc) return c.json({ error: 'Not found' }, 404);
    return c.json(doc);
  });

  // Create
  router.post('/', async (c) => {
    const db = c.get('db');
    const body = await c.req.json();
    body.created_at = new Date().toISOString();
    body.updated_at = new Date().toISOString();
    const doc = await db.create(collection, body);
    return c.json(doc, 201);
  });

  // Update
  router.patch('/:id', async (c) => {
    const db = c.get('db');
    const body = await c.req.json();
    body.updated_at = new Date().toISOString();
    const doc = await db.update(collection, c.req.param('id'), body);
    return c.json(doc);
  });

  // Delete
  router.delete('/:id', async (c) => {
    const db = c.get('db');
    await db.delete(collection, c.req.param('id'));
    return c.json({ success: true });
  });

  return router;
}

// ─── Mount CRUD routes ────────────────────────────────
adminRoutes.route('/menu-items', createCRUD('menu_items'));
adminRoutes.route('/categories', createCRUD('categories'));
adminRoutes.route('/gallery', createCRUD('gallery'));
adminRoutes.route('/team', createCRUD('team'));
adminRoutes.route('/brand-values', createCRUD('brand_values'));
adminRoutes.route('/testimonials', createCRUD('testimonials'));

// ─── Site Settings (single doc) ───────────────────────
adminRoutes.get('/site-settings', async (c) => {
  const db = c.get('db');
  const doc = await db.get('site_settings', 'main');
  return c.json(doc || {});
});

adminRoutes.patch('/site-settings', async (c) => {
  const db = c.get('db');
  const body = await c.req.json();
  body.updated_at = new Date().toISOString();
  const doc = await db.update('site_settings', 'main', body);
  return c.json(doc);
});

// ─── Orders (read-only for admin) ─────────────────────
adminRoutes.get('/orders', async (c) => {
  const db = c.get('db');
  const orders = await db.list('orders');
  orders.sort((a: any, b: any) =>
    new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime()
  );
  return c.json(orders);
});

adminRoutes.patch('/orders/:id', async (c) => {
  const db = c.get('db');
  const body = await c.req.json();
  const doc = await db.update('orders', c.req.param('id'), body);
  return c.json(doc);
});

// ─── Contact Messages (read-only for admin) ───────────
adminRoutes.get('/contact-messages', async (c) => {
  const db = c.get('db');
  const messages = await db.list('contact_messages');
  messages.sort((a: any, b: any) =>
    new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime()
  );
  return c.json(messages);
});

adminRoutes.patch('/contact-messages/:id', async (c) => {
  const db = c.get('db');
  const body = await c.req.json();
  const doc = await db.update('contact_messages', c.req.param('id'), body);
  return c.json(doc);
});
