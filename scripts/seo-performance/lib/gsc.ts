/**
 * Google Search Console API client.
 *
 * Auth: service account JWT → access token (1h) → call API.
 * Docs:
 *   - Search Analytics: https://developers.google.com/webmaster-tools/v1/searchanalytics/query
 *   - URL Inspection:   https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect
 *
 * Required env:
 *   GSC_SA_JSON_BASE64   — base64-encoded service account JSON (避免 routine secret 长度限制)
 *   GSC_SITE_URL         — e.g. "sc-domain:jiangren.com.au" 或 "https://jiangren.com.au/"
 *
 * 注意: service account 的 client_email 必须先在 GSC 控制台被加为对应 site 的 user
 *       (Settings → Users and permissions → Add user → role: Restricted/Full)
 */

import { createSign } from 'node:crypto';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

interface ServiceAccountKey {
	client_email: string;
	private_key: string;
	token_uri?: string;
}

function loadServiceAccount(): ServiceAccountKey {
	const b64 = process.env.GSC_SA_JSON_BASE64;
	if (!b64) throw new Error('GSC_SA_JSON_BASE64 env var is required');
	const raw = Buffer.from(b64, 'base64').toString('utf8');
	const sa = JSON.parse(raw) as ServiceAccountKey;
	if (!sa.client_email || !sa.private_key) {
		throw new Error('Invalid service account JSON: missing client_email or private_key');
	}
	return sa;
}

function base64UrlEncode(input: Buffer | string): string {
	const buf = typeof input === 'string' ? Buffer.from(input) : input;
	return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function signJwt(sa: ServiceAccountKey): string {
	const now = Math.floor(Date.now() / 1000);
	const header = { alg: 'RS256', typ: 'JWT' };
	const payload = {
		iss: sa.client_email,
		scope: SCOPE,
		aud: sa.token_uri || TOKEN_URL,
		exp: now + 3600,
		iat: now,
	};
	const headerB64 = base64UrlEncode(JSON.stringify(header));
	const payloadB64 = base64UrlEncode(JSON.stringify(payload));
	const toSign = `${headerB64}.${payloadB64}`;
	const signer = createSign('RSA-SHA256');
	signer.update(toSign);
	signer.end();
	const signature = base64UrlEncode(signer.sign(sa.private_key));
	return `${toSign}.${signature}`;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
	if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
		return cachedToken.token;
	}
	const sa = loadServiceAccount();
	const jwt = signJwt(sa);
	const body = new URLSearchParams({
		grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
		assertion: jwt,
	});
	const res = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`GSC token exchange failed: ${res.status} ${text}`);
	}
	const data = (await res.json()) as { access_token: string; expires_in: number };
	cachedToken = {
		token: data.access_token,
		expiresAt: Date.now() + data.expires_in * 1000,
	};
	return data.access_token;
}

// ─── Search Analytics ──────────────────────────────────────────────────

export interface SearchAnalyticsRow {
	keys: string[];
	clicks: number;
	impressions: number;
	ctr: number;
	position: number;
}

export interface SearchAnalyticsParams {
	startDate: string;     // YYYY-MM-DD
	endDate: string;       // YYYY-MM-DD
	dimensions: Array<'query' | 'page' | 'country' | 'device' | 'date' | 'searchAppearance'>;
	rowLimit?: number;     // max 25000
	startRow?: number;     // for pagination
	dimensionFilterGroups?: unknown;
	type?: 'web' | 'image' | 'video' | 'news' | 'discover' | 'googleNews';
}

export async function searchAnalyticsQuery(
	siteUrl: string,
	params: SearchAnalyticsParams,
): Promise<SearchAnalyticsRow[]> {
	const token = await getAccessToken();
	const encoded = encodeURIComponent(siteUrl);
	const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encoded}/searchAnalytics/query`;
	const body = {
		startDate: params.startDate,
		endDate: params.endDate,
		dimensions: params.dimensions,
		rowLimit: params.rowLimit ?? 25000,
		startRow: params.startRow ?? 0,
		dimensionFilterGroups: params.dimensionFilterGroups,
		type: params.type ?? 'web',
	};
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`GSC searchAnalytics.query failed: ${res.status} ${text}`);
	}
	const data = (await res.json()) as { rows?: SearchAnalyticsRow[] };
	return data.rows ?? [];
}

/**
 * 自动分页拉满，处理 25000 上限。
 */
export async function searchAnalyticsAll(
	siteUrl: string,
	params: Omit<SearchAnalyticsParams, 'startRow'>,
): Promise<SearchAnalyticsRow[]> {
	const pageSize = params.rowLimit ?? 25000;
	const all: SearchAnalyticsRow[] = [];
	let startRow = 0;
	while (true) {
		const rows = await searchAnalyticsQuery(siteUrl, { ...params, rowLimit: pageSize, startRow });
		all.push(...rows);
		if (rows.length < pageSize) break;
		startRow += pageSize;
		if (startRow >= 250_000) break; // 安全阀，单次任务硬上限
	}
	return all;
}

// ─── URL Inspection ────────────────────────────────────────────────────

export interface UrlInspectionResult {
	indexStatusResult?: {
		verdict?: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL' | 'VERDICT_UNSPECIFIED';
		coverageState?: string;
		robotsTxtState?: string;
		indexingState?: string;
		lastCrawlTime?: string;
		pageFetchState?: string;
		googleCanonical?: string;
		userCanonical?: string;
		referringUrls?: string[];
		sitemap?: string[];
		crawledAs?: string;
	};
	mobileUsabilityResult?: unknown;
	richResultsResult?: unknown;
	ampResult?: unknown;
	inspectionResultLink?: string;
}

export async function inspectUrl(
	siteUrl: string,
	inspectionUrl: string,
	languageCode = 'en-AU',
): Promise<UrlInspectionResult> {
	const token = await getAccessToken();
	const url = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ inspectionUrl, siteUrl, languageCode }),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`GSC urlInspection failed for ${inspectionUrl}: ${res.status} ${text}`);
	}
	const data = (await res.json()) as { inspectionResult?: UrlInspectionResult };
	return data.inspectionResult ?? {};
}

// ─── Helpers ───────────────────────────────────────────────────────────

export function getSiteUrl(): string {
	const u = process.env.GSC_SITE_URL;
	if (!u) throw new Error('GSC_SITE_URL env var is required (e.g. "sc-domain:jiangren.com.au")');
	return u;
}
