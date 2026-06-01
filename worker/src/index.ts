// @ts-nocheck
// Nâu Coffee — Cloudflare Worker API
// Hono + Firestore REST API

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { publicRoutes } from './routes/public';
import { adminRoutes } from './routes/admin';
import { seedRoutes } from './routes/seed';
import { FirestoreClient } from './lib/firestore';

export type Env = {
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  CORS_ORIGIN: string;
  ENVIRONMENT: string;
};

export type AppContext = {
  Bindings: Env;
  Variables: {
    db: FirestoreClient;
  };
};

const app = new Hono<AppContext>();

// ─── CORS ─────────────────────────────────────────────
app.use('*', async (c, next) => {
  const corsOrigin = c.env.CORS_ORIGIN || 'https://naucoffee.pages.dev';
  const corsMiddleware = cors({
    origin: [corsOrigin, 'http://localhost:5173', 'http://localhost:4173'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });
  return corsMiddleware(c, next);
});

// ─── Firestore Client Middleware ──────────────────────
app.use('/api/*', async (c, next) => {
  const db = new FirestoreClient(
    c.env.FIREBASE_PROJECT_ID,
    c.env.FIREBASE_CLIENT_EMAIL,
    c.env.FIREBASE_PRIVATE_KEY
  );
  c.set('db', db);
  await next();
});

// ─── Routes ───────────────────────────────────────────
app.route('/api/public', publicRoutes);
app.route('/api/admin', adminRoutes);
app.route('/api/admin', seedRoutes);

// ─── Health Check ─────────────────────────────────────
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    project: 'nau-coffee',
    env: c.env.ENVIRONMENT,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 ──────────────────────────────────────────────
app.notFound((c) => c.json({ error: 'Not found' }, 404));

// ─── Error Handler ────────────────────────────────────
app.onError((err, c) => {
  console.error(`[ERROR] ${err.message}`, err.stack);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;
