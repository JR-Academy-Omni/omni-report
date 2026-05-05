#!/usr/bin/env bun
/**
 * 5 秒烟雾测试：验证 GSC / DataForSEO / PSI 三方 credential 都通了。
 *
 * 第一次 setup 时**第一件事**就跑这个，比直接跑 fetch-gsc.ts 快、错误信息更精准、
 * 不会浪费 DataForSEO quota（只查 1 个最便宜的 keyword）。
 *
 * Usage:
 *   bun run scripts/seo-performance/verify-credentials.ts
 *
 * Exit code 0 = 三方都通；非 0 = 至少一方挂了，详见 stderr。
 */

import { searchAnalyticsQuery, getSiteUrl } from './lib/gsc.ts';
import { fetchSerpBatch } from './lib/dataforseo.ts';
import { runPsi } from './lib/psi.ts';
import { daysAgoAEST } from './lib/aest.ts';

interface CheckResult {
	name: string;
	ok: boolean;
	detail: string;
	durationMs: number;
}

async function checkGsc(): Promise<CheckResult> {
	const start = Date.now();
	try {
		const siteUrl = getSiteUrl();
		// 只拉 1 行最近 7 天的数据，最小化开销
		const rows = await searchAnalyticsQuery(siteUrl, {
			startDate: daysAgoAEST(9),
			endDate: daysAgoAEST(3),
			dimensions: ['query'],
			rowLimit: 1,
		});
		const durationMs = Date.now() - start;
		return {
			name: 'GSC',
			ok: true,
			detail: `site_url=${siteUrl} · top query: "${rows[0]?.keys[0] ?? '(no data)'}" (${rows[0]?.clicks ?? 0} clicks)`,
			durationMs,
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		// 把常见错误翻译成具体修复指引
		let hint = '';
		if (msg.includes('GSC_SA_JSON_BASE64')) hint = ' → 检查 .env 里 GSC_SA_JSON_BASE64 字段，必须是 base64 编码后的 SA JSON';
		else if (msg.includes('GSC_SITE_URL')) hint = ' → 检查 .env 里 GSC_SITE_URL，比如 sc-domain:jiangren.com.au';
		else if (msg.includes('invalid_grant')) hint = ' → SA private_key 损坏，重新下载 SA JSON';
		else if (msg.includes('403')) hint = ' → SA email 没加进 GSC 用户列表（Settings → Users and permissions）';
		else if (msg.includes('404')) hint = ' → GSC_SITE_URL 写错（确认有 sc-domain: 前缀或完整 https://）';
		return {
			name: 'GSC',
			ok: false,
			detail: msg + hint,
			durationMs: Date.now() - start,
		};
	}
}

async function checkDataForSeo(): Promise<CheckResult> {
	const start = Date.now();
	try {
		// 只查 1 个 keyword，DataForSEO 最便宜 ~$0.0006
		const payloads = await fetchSerpBatch([{
			keyword: 'jr academy',
			location_code: 2036,
			language_code: 'en',
			device: 'desktop',
			depth: 10,
		}]);
		const durationMs = Date.now() - start;
		const total = payloads[0]?.items_count ?? 0;
		return {
			name: 'DataForSEO',
			ok: true,
			detail: `1 query OK · top 10 returned ${total} items (cost ~$0.0006)`,
			durationMs,
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		let hint = '';
		if (msg.includes('DATAFORSEO_LOGIN')) hint = ' → 检查 .env 里 DATAFORSEO_LOGIN/DATAFORSEO_PASSWORD';
		else if (msg.includes('40400') || msg.includes('Authentication')) hint = ' → login/password 错（注意是 API password 不是登录密码！Dashboard → API access）';
		else if (msg.includes('40000')) hint = ' → 账号余额不足，去 Dashboard 充值';
		return {
			name: 'DataForSEO',
			ok: false,
			detail: msg + hint,
			durationMs: Date.now() - start,
		};
	}
}

async function checkPsi(): Promise<CheckResult> {
	const start = Date.now();
	try {
		const result = await runPsi('https://jiangren.com.au/', 'mobile');
		const durationMs = Date.now() - start;
		if (result.error) {
			return {
				name: 'PSI',
				ok: false,
				detail: result.error,
				durationMs,
			};
		}
		const lcp = result.cwv.lcp_ms !== null ? `${(result.cwv.lcp_ms / 1000).toFixed(2)}s` : 'n/a';
		return {
			name: 'PSI',
			ok: true,
			detail: `https://jiangren.com.au/ · LCP=${lcp} · source=${result.cwv.source}`,
			durationMs,
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		let hint = '';
		if (msg.includes('403')) hint = ' → API key 没启用 / 没限制对 (PageSpeed Insights API)';
		return {
			name: 'PSI',
			ok: false,
			detail: msg + hint,
			durationMs: Date.now() - start,
		};
	}
}

async function main() {
	console.log('▶ Verifying SEO Performance credentials\n');

	const results = await Promise.all([checkGsc(), checkDataForSeo(), checkPsi()]);

	let allOk = true;
	for (const r of results) {
		const icon = r.ok ? '✅' : '❌';
		const time = `${(r.durationMs / 1000).toFixed(1)}s`;
		console.log(`${icon} ${r.name.padEnd(12)} (${time})  ${r.detail}`);
		if (!r.ok) allOk = false;
	}

	console.log('');
	if (allOk) {
		console.log('🎉 All three credentials are wired up correctly. Next:');
		console.log('   1. bun run seo-perf:gsc        — pull a real week of GSC data');
		console.log('   2. bun run seo-perf:seed       — auto-suggest 200 keywords from GSC');
		console.log('   3. (review keywords.suggested.json, merge into keywords.json)');
		console.log('   4. bun run seo-perf            — run the full pipeline');
	} else {
		console.error('❌ One or more credential checks failed. Fix above errors and re-run.');
		process.exit(1);
	}
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ verify-credentials crashed:', err);
		process.exit(1);
	});
}
