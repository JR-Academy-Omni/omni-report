/**
 * DataForSEO SERP API client (live regular).
 *
 * Docs: https://docs.dataforseo.com/v3/serp/google/organic/live/regular/
 *
 * Cost (参考值, setup 时核实): ~$0.0006/keyword × location 组合 = 约 $0.06/100 keywords。
 * 单次 POST 可批量 100 keywords，但要遵守 rate limit (默认 30/min, 可在 Account 提升)。
 *
 * Required env:
 *   DATAFORSEO_LOGIN     — registration email
 *   DATAFORSEO_PASSWORD  — 在 Dashboard → API access 拿到的密码
 */

const ENDPOINT = 'https://api.dataforseo.com/v3/serp/google/organic/live/regular';

function authHeader(): string {
	const login = process.env.DATAFORSEO_LOGIN;
	const password = process.env.DATAFORSEO_PASSWORD;
	if (!login || !password) {
		throw new Error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD env vars are required');
	}
	const token = Buffer.from(`${login}:${password}`).toString('base64');
	return `Basic ${token}`;
}

export interface SerpQueryItem {
	keyword: string;
	location_code: number;       // e.g. 2036=Australia, 2156=China, 2840=US
	language_code: string;       // e.g. "en", "zh"
	device?: 'desktop' | 'mobile';
	os?: 'windows' | 'macos' | 'android' | 'ios';
	depth?: number;              // 默认 100，最多 700
	tag?: string;                // 给响应打标签，方便对账
}

export interface SerpOrganicResult {
	type: string;
	rank_group?: number;
	rank_absolute?: number;
	domain?: string;
	title?: string;
	url?: string;
	description?: string;
	breadcrumb?: string;
	is_image?: boolean;
	is_video?: boolean;
	is_featured_snippet?: boolean;
	is_malicious?: boolean;
}

export interface SerpResultPayload {
	keyword: string;
	location_code: number;
	language_code: string;
	se_domain: string;
	check_url: string;
	datetime: string;
	spell?: unknown;
	item_types?: string[];
	se_results_count?: number;
	items_count?: number;
	items?: SerpOrganicResult[];
}

interface DataForSeoEnvelope<T> {
	status_code: number;
	status_message: string;
	tasks_count: number;
	tasks_error: number;
	cost: number;
	tasks: Array<{
		id: string;
		status_code: number;
		status_message: string;
		cost: number;
		data: SerpQueryItem & { se: string; se_type: string };
		result: T[] | null;
	}>;
}

/**
 * 批量查询 SERP。一次 HTTP 请求最多塞 100 个查询项；超过自动分批。
 */
export async function fetchSerpBatch(items: SerpQueryItem[]): Promise<SerpResultPayload[]> {
	const out: SerpResultPayload[] = [];
	const BATCH = 100;
	for (let i = 0; i < items.length; i += BATCH) {
		const slice = items.slice(i, i + BATCH);
		const res = await fetch(ENDPOINT, {
			method: 'POST',
			headers: {
				Authorization: authHeader(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(slice),
		});
		if (!res.ok) {
			const text = await res.text();
			throw new Error(`DataForSEO SERP failed: ${res.status} ${text}`);
		}
		const data = (await res.json()) as DataForSeoEnvelope<SerpResultPayload>;
		if (data.status_code !== 20000) {
			throw new Error(`DataForSEO error: ${data.status_code} ${data.status_message}`);
		}
		for (const task of data.tasks) {
			if (task.status_code !== 20000) {
				console.warn(`DataForSEO task error for "${task.data.keyword}": ${task.status_message}`);
				continue;
			}
			if (task.result) out.push(...task.result);
		}
	}
	return out;
}

/**
 * 找一个域名在 SERP 里第一次出现的位置。返回 null 表示前 depth 名内未命中。
 */
export function findDomainPosition(
	payload: SerpResultPayload,
	domain: string,
): { rank_absolute: number; url: string; title?: string } | null {
	if (!payload.items) return null;
	for (const item of payload.items) {
		if (item.type !== 'organic') continue;
		if (!item.url || !item.domain) continue;
		if (item.domain === domain || item.domain.endsWith('.' + domain) || item.url.includes(domain)) {
			return {
				rank_absolute: item.rank_absolute ?? -1,
				url: item.url,
				title: item.title,
			};
		}
	}
	return null;
}

// 常用 location code 速查（DataForSEO 官方编码）
export const LOCATIONS = {
	AU: 2036,
	US: 2840,
	UK: 2826,
	CN: 2156,
	NZ: 2554,
	SG: 2702,
	HK: 2344,
} as const;
