// @ts-nocheck
// Firestore REST API Client for Cloudflare Workers
// Uses Web Crypto API for JWT signing — no Node.js dependencies
//
// CONFIG: After copying, change:
// CONFIG: - Collection names in your route files (not in this file)
// CONFIG: - wrangler.toml env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL
// CONFIG: - .dev.vars secrets: FIREBASE_PRIVATE_KEY
// CONFIG: - CORS origins in index.ts

// ─── Firestore Value Conversion ──────────────────────────────────

type FirestoreValue =
    | { stringValue: string }
    | { integerValue: string }
    | { doubleValue: number }
    | { booleanValue: boolean }
    | { nullValue: null }
    | { timestampValue: string }
    | { mapValue: { fields: Record<string, FirestoreValue> } }
    | { arrayValue: { values?: FirestoreValue[] } };

export function toFirestoreValue(value: unknown): FirestoreValue {
    if (value === null || value === undefined) return { nullValue: null };
    if (typeof value === 'string') return { stringValue: value };
    if (typeof value === 'boolean') return { booleanValue: value };
    if (typeof value === 'number') {
        if (Number.isInteger(value)) return { integerValue: String(value) };
        return { doubleValue: value };
    }
    if (Array.isArray(value)) {
        return { arrayValue: { values: value.map(toFirestoreValue) } };
    }
    if (typeof value === 'object') {
        const fields: Record<string, FirestoreValue> = {};
        for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            fields[k] = toFirestoreValue(v);
        }
        return { mapValue: { fields } };
    }
    return { stringValue: String(value) };
}

export function fromFirestoreValue(val: FirestoreValue): unknown {
    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return Number(val.integerValue);
    if ('doubleValue' in val) return val.doubleValue;
    if ('booleanValue' in val) return val.booleanValue;
    if ('nullValue' in val) return null;
    if ('timestampValue' in val) return val.timestampValue;
    if ('arrayValue' in val) {
        return (val.arrayValue.values || []).map(fromFirestoreValue);
    }
    if ('mapValue' in val) {
        const obj: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
            obj[k] = fromFirestoreValue(v);
        }
        return obj;
    }
    return null;
}

export function fromFirestoreDoc(doc: any): Record<string, unknown> {
    const obj: Record<string, unknown> = {};
    if (!doc.fields) return obj;
    for (const [k, v] of Object.entries(doc.fields)) {
        obj[k] = fromFirestoreValue(v as FirestoreValue);
    }
    // Extract document ID from name: projects/.../documents/collection/DOC_ID
    if (doc.name) {
        const parts = doc.name.split('/');
        obj.id = parts[parts.length - 1];
    }
    return obj;
}

function toFirestoreFields(data: Record<string, unknown>): Record<string, FirestoreValue> {
    const fields: Record<string, FirestoreValue> = {};
    for (const [k, v] of Object.entries(data)) {
        if (k === 'id') continue; // Don't store ID as a field
        fields[k] = toFirestoreValue(v);
    }
    return fields;
}

// ─── JWT / Auth Token ────────────────────────────────────────────

async function getFirebaseAuthToken(clientEmail: string, privateKey: string): Promise<string> {
    const header = { alg: 'RS256', typ: 'JWT' };
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;

    const payload = {
        iss: clientEmail,
        sub: clientEmail,
        aud: 'https://oauth2.googleapis.com/token',
        iat,
        exp,
        scope: 'https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/firebase.messaging'
    };

    const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    // Parse PEM private key
    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';
    if (!privateKey.includes(pemHeader)) {
        throw new Error('Invalid private key format');
    }

    const pemContents = privateKey.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
    const binaryDerString = atob(pemContents);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
        binaryDer[i] = binaryDerString.charCodeAt(i);
    }

    const key = await crypto.subtle.importKey(
        'pkcs8',
        binaryDer.buffer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signatureText = new TextEncoder().encode(signatureInput);
    const signatureBuffer = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, signatureText);
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const jwt = `${signatureInput}.${signatureBase64}`;

    // Exchange JWT for access token
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });

    const data = await response.json() as any;
    if (!response.ok) {
        throw new Error(`Failed to get auth token: ${JSON.stringify(data)}`);
    }
    return data.access_token;
}

// ─── Firestore Client ────────────────────────────────────────────

export class FirestoreClient {
    private projectId: string;
    private token: string | null = null;
    private clientEmail: string;
    private privateKey: string;
    private tokenExp: number = 0;

    constructor(projectId: string, clientEmail: string, privateKey: string) {
        this.projectId = projectId;
        this.clientEmail = clientEmail;
        this.privateKey = privateKey.replace(/\\n/g, '\n');
    }

    private async getToken(): Promise<string> {
        if (this.token && Date.now() < this.tokenExp) {
            return this.token;
        }
        this.token = await getFirebaseAuthToken(this.clientEmail, this.privateKey);
        this.tokenExp = Date.now() + 3000 * 1000; // ~50 mins
        return this.token;
    }

    private baseUrl(collection: string, documentId?: string): string {
        const base = `https://firestore.googleapis.com/v1/projects/${this.projectId}/databases/(default)/documents/${collection}`;
        return documentId ? `${base}/${documentId}` : base;
    }

    private async request(url: string, method: string, body?: any): Promise<any> {
        const token = await this.getToken();
        const headers: Record<string, string> = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const res = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Firestore ${method} ${url} failed (${res.status}): ${err}`);
        }

        if (res.status === 204) return null; // DELETE returns no content
        return res.json();
    }

    // ─── CRUD Methods ─────────────────────────────────────

    /** List all documents in a collection */
    async list(collection: string): Promise<Record<string, unknown>[]> {
        const url = this.baseUrl(collection);
        const data = await this.request(url, 'GET');
        if (!data.documents) return [];
        return data.documents.map(fromFirestoreDoc);
    }

    /** Get a single document by ID */
    async get(collection: string, id: string): Promise<Record<string, unknown> | null> {
        try {
            const url = this.baseUrl(collection, id);
            const data = await this.request(url, 'GET');
            return fromFirestoreDoc(data);
        } catch (e: any) {
            if (e.message?.includes('404')) return null;
            throw e;
        }
    }

    /** Query documents with a single field filter */
    async query(
        collection: string,
        field: string,
        op: 'EQUAL' | 'LESS_THAN' | 'GREATER_THAN' | 'ARRAY_CONTAINS',
        value: unknown,
        limitCount?: number
    ): Promise<Record<string, unknown>[]> {
        const url = `https://firestore.googleapis.com/v1/projects/${this.projectId}/databases/(default)/documents:runQuery`;

        const structuredQuery: any = {
            from: [{ collectionId: collection }],
            where: {
                fieldFilter: {
                    field: { fieldPath: field },
                    op,
                    value: toFirestoreValue(value),
                },
            },
        };

        if (limitCount) {
            structuredQuery.limit = limitCount;
        }

        const data = await this.request(url, 'POST', { structuredQuery });

        // runQuery returns an array of results, each may have a `document` field
        if (!Array.isArray(data)) return [];
        return data
            .filter((r: any) => r.document)
            .map((r: any) => fromFirestoreDoc(r.document));
    }

    /** Create a document. If docId is provided, uses it; otherwise auto-generates. */
    async create(collection: string, data: Record<string, unknown>, docId?: string): Promise<Record<string, unknown>> {
        const fields = toFirestoreFields(data);

        if (docId) {
            // Use PATCH to create with specific ID
            const url = this.baseUrl(collection, docId);
            const result = await this.request(url, 'PATCH', { fields });
            return fromFirestoreDoc(result);
        } else {
            // POST to auto-generate ID
            const url = this.baseUrl(collection);
            const result = await this.request(url, 'POST', { fields });
            return fromFirestoreDoc(result);
        }
    }

    /** Update (partial) a document */
    async update(collection: string, id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
        const fields = toFirestoreFields(data);
        // Build updateMask to only update specified fields
        const fieldPaths = Object.keys(data).filter(k => k !== 'id');
        const maskParams = fieldPaths.map(f => `updateMask.fieldPaths=${f}`).join('&');
        const url = `${this.baseUrl(collection, id)}?${maskParams}`;
        const result = await this.request(url, 'PATCH', { fields });
        return fromFirestoreDoc(result);
    }

    /** Delete a document */
    async delete(collection: string, id: string): Promise<void> {
        const url = this.baseUrl(collection, id);
        await this.request(url, 'DELETE');
    }

    // ─── FCM Push Notification Methods ─────────────────────

    /** Send a push notification via FCM V1 API */
    async sendFCM(message: any): Promise<void> {
        const token = await this.getToken();
        const url = `https://fcm.googleapis.com/v1/projects/${this.projectId}/messages:send`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`FCM Error ${response.status}: ${text}`);
        }
    }

    /** Save an FCM token for an admin user (deduplicates) */
    async saveFCMToken(uid: string, fcmToken: string): Promise<void> {
        // Check if token already exists
        const existing = await this.query('fcm_tokens', 'token', 'EQUAL', fcmToken, 1);
        if (existing.length > 0) return;

        // Create new token document
        await this.create('fcm_tokens', {
            uid,
            token: fcmToken,
            createdAt: new Date().toISOString(),
            platform: 'web',
        });
    }

    /** Get all registered admin FCM tokens */
    async getAdminFCMTokens(): Promise<string[]> {
        const docs = await this.list('fcm_tokens');
        return docs
            .filter(doc => doc.token)
            .map(doc => doc.token as string)
            .filter(Boolean);
    }

    /** Send push notification to all admins when a new order arrives */
    async sendAdminOrderNotification(customerName: string, productName: string): Promise<void> {
        const tokens = await this.getAdminFCMTokens();
        if (tokens.length === 0) return;

        await Promise.all(tokens.map(token =>
            this.sendFCM({
                message: {
                    token,
                    notification: {
                        title: '🔔 Đơn hàng mới!',
                        body: `${customerName} — ${productName}`,
                    },
                    webpush: {
                        fcm_options: { link: '/' },
                        notification: {
                            icon: '/logo.svg',
                            badge: '/logo.svg',
                            vibrate: [200, 100, 200],
                            tag: `order-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                        }
                    }
                }
            }).catch(e => console.error('FCM send failed:', e))
        ));
    }
}
