/**
 * PageSpeed Insights API v5 client.
 *
 * Docs: https://developers.google.com/speed/docs/insights/v5/get-started
 *
 * Endpoint: GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed
 *
 * Key 可选（无 key 也能跑但配额低），强烈建议 setup PSI_API_KEY。
 *
 * Required env (optional):
 *   PSI_API_KEY  — GCP Console → APIs & Services → Credentials
 *
 * 注意: PSI 单次请求耗时 5-30s（Lighthouse 真跑），并发要克制（建议 ≤3）。
 */

const ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export type PsiStrategy = 'mobile' | 'desktop';

export interface CoreWebVitals {
	lcp_ms: number | null;       // Largest Contentful Paint
	inp_ms: number | null;       // Interaction to Next Paint (replaces FID since 2024-03)
	cls: number | null;          // Cumulative Layout Shift
	fcp_ms: number | null;       // First Contentful Paint
	ttfb_ms: number | null;      // Time To First Byte
	performance_score: number | null; // 0-100
	source: 'field' | 'lab' | 'unknown';
}

export interface PsiResult {
	url: string;
	strategy: PsiStrategy;
	fetched_at: string;
	mobile_friendly: boolean;
	cwv: CoreWebVitals;
	error?: string;
}

interface PsiApiResponse {
	id?: string;
	loadingExperience?: {
		metrics?: Record<string, { percentile?: number; category?: string }>;
		overall_category?: string;
	};
	originLoadingExperience?: {
		metrics?: Record<string, { percentile?: number; category?: string }>;
	};
	lighthouseResult?: {
		audits?: Record<string, {
			id: string;
			numericValue?: number;
			score?: number | null;
		}>;
		categories?: {
			performance?: { score?: number | null };
		};
	};
}

/**
 * 跑一个 URL 的 PSI。优先用 field data（CrUX 真实用户数据），fallback 到 lab data。
 */
export async function runPsi(url: string, strategy: PsiStrategy = 'mobile'): Promise<PsiResult> {
	const params = new URLSearchParams({
		url,
		strategy,
		category: 'performance',
	});
	const apiKey = process.env.PSI_API_KEY;
	if (apiKey) params.set('key', apiKey);

	const out: PsiResult = {
		url,
		strategy,
		fetched_at: new Date().toISOString(),
		mobile_friendly: false,
		cwv: {
			lcp_ms: null,
			inp_ms: null,
			cls: null,
			fcp_ms: null,
			ttfb_ms: null,
			performance_score: null,
			source: 'unknown',
		},
	};

	try {
		const res = await fetch(`${ENDPOINT}?${params}`);
		if (!res.ok) {
			const text = await res.text();
			out.error = `PSI ${res.status}: ${text.slice(0, 300)}`;
			return out;
		}
		const data = (await res.json()) as PsiApiResponse;

		// 1. Field data (CrUX) — 真实用户的 75th percentile
		const field = data.loadingExperience?.metrics ?? data.originLoadingExperience?.metrics;
		if (field && Object.keys(field).length > 0) {
			out.cwv.source = 'field';
			out.cwv.lcp_ms = field.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null;
			out.cwv.inp_ms = field.INTERACTION_TO_NEXT_PAINT?.percentile ?? null;
			out.cwv.cls = typeof field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile === 'number'
				? field.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
				: null;
			out.cwv.fcp_ms = field.FIRST_CONTENTFUL_PAINT_MS?.percentile ?? null;
			out.cwv.ttfb_ms = field.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile ?? null;
		}

		// 2. Lab data (Lighthouse) — 单次 emulated 跑分，作为 fallback
		const audits = data.lighthouseResult?.audits;
		if (audits) {
			if (out.cwv.lcp_ms === null) out.cwv.lcp_ms = audits['largest-contentful-paint']?.numericValue ?? null;
			if (out.cwv.cls === null) out.cwv.cls = audits['cumulative-layout-shift']?.numericValue ?? null;
			if (out.cwv.fcp_ms === null) out.cwv.fcp_ms = audits['first-contentful-paint']?.numericValue ?? null;
			if (out.cwv.ttfb_ms === null) out.cwv.ttfb_ms = audits['server-response-time']?.numericValue ?? null;
			if (out.cwv.source === 'unknown') out.cwv.source = 'lab';
		}

		const perfScore = data.lighthouseResult?.categories?.performance?.score;
		if (typeof perfScore === 'number') {
			out.cwv.performance_score = Math.round(perfScore * 100);
		}
	} catch (err) {
		out.error = err instanceof Error ? err.message : String(err);
	}

	return out;
}

/**
 * 批量跑 PSI，并发控制 + 单 URL 失败不阻塞整体。
 */
export async function runPsiBatch(
	urls: string[],
	options: { strategy?: PsiStrategy; concurrency?: number } = {},
): Promise<PsiResult[]> {
	const strategy = options.strategy ?? 'mobile';
	const concurrency = options.concurrency ?? 3;
	const results: PsiResult[] = [];
	let cursor = 0;
	async function worker() {
		while (cursor < urls.length) {
			const idx = cursor++;
			const url = urls[idx];
			const result = await runPsi(url, strategy);
			results[idx] = result;
		}
	}
	await Promise.all(Array.from({ length: concurrency }, () => worker()));
	return results;
}

/**
 * 判断单页 CWV 是否 "Good"（Google 官方阈值）。
 */
export function isGood(cwv: CoreWebVitals): boolean {
	if (cwv.lcp_ms !== null && cwv.lcp_ms > 2500) return false;
	if (cwv.inp_ms !== null && cwv.inp_ms > 200) return false;
	if (cwv.cls !== null && cwv.cls > 0.1) return false;
	return cwv.lcp_ms !== null || cwv.cls !== null;
}
