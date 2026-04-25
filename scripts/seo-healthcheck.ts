#!/usr/bin/env bun
/**
 * SEO Healthcheck — 爬 jiangren.com.au sitemap，HEAD 检查所有 URL，
 * 与昨天的报告 diff，输出今天的 markdown 报告到 seo-reports/{DATE}.md。
 *
 * Usage:
 *   bun run scripts/seo-healthcheck.ts             # 今天 AEST
 *   bun run scripts/seo-healthcheck.ts 2026-04-25  # 指定日期
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const REPORT_DIR = join(REPO_ROOT, 'seo-reports');

// ─── 配置 ─────────────────────────────────────────────────────────────
const SITEMAP_INDEX = 'https://jiangren.com.au/sitemap.xml';
const CONCURRENCY = parseInt(process.env.SEO_CONCURRENCY || '60', 10);
const TIMEOUT_MS = parseInt(process.env.SEO_TIMEOUT_MS || '8000', 10);
const USER_AGENT = 'omni-report-seo-healthcheck/0.1 (+https://github.com/JR-Academy-AI/omni-report)';

// ─── 类型 ─────────────────────────────────────────────────────────────
type Category = '2xx' | '3xx' | '404' | '410' | '4xx-other' | '5xx' | 'timeout' | 'network-error';

interface UrlResult {
	url: string;
	status: number | null;
	category: Category;
	finalUrl?: string; // 跟随重定向后的 URL
	errorMessage?: string;
	sitemap: string;
	durationMs: number;
}

interface Report {
	date: string;
	generatedAtUtc: string;
	totals: Record<Category, number>;
	totalCount: number;
	results: UrlResult[];
	perSitemap: Array<{ sitemap: string; total: number; healthy: number; broken: number }>;
}

// ─── 日期工具 ─────────────────────────────────────────────────────────
function todayAEST(): string {
	const fmt = new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Australia/Sydney',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
	return fmt.format(new Date()); // YYYY-MM-DD
}

// ─── Sitemap 抓取 ─────────────────────────────────────────────────────
async function fetchText(url: string): Promise<string> {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
	try {
		const res = await fetch(url, {
			signal: ctrl.signal,
			headers: { 'User-Agent': USER_AGENT },
			redirect: 'follow',
		});
		if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
		return await res.text();
	} finally {
		clearTimeout(t);
	}
}

function extractLocs(xml: string): string[] {
	const out: string[] = [];
	const re = /<loc>\s*([^<\s][^<]*?)\s*<\/loc>/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(xml)) !== null) {
		out.push(m[1].trim());
	}
	return out;
}

async function collectAllUrls(): Promise<{ urls: { url: string; sitemap: string }[]; childSitemaps: string[] }> {
	console.log(`▶ Fetching sitemap index: ${SITEMAP_INDEX}`);
	const indexXml = await fetchText(SITEMAP_INDEX);
	const childSitemaps = extractLocs(indexXml);
	console.log(`  Found ${childSitemaps.length} child sitemaps`);

	const urls: { url: string; sitemap: string }[] = [];
	for (const sm of childSitemaps) {
		const smName = sm.split('/').pop() || sm;
		try {
			const xml = await fetchText(sm);
			const locs = extractLocs(xml);
			for (const u of locs) urls.push({ url: u, sitemap: smName });
			console.log(`  ✓ ${smName} — ${locs.length} URLs`);
		} catch (e) {
			console.error(`  ✗ ${smName} — ${(e as Error).message}`);
		}
	}
	console.log(`▶ Collected ${urls.length} URLs total`);
	return { urls, childSitemaps };
}

// ─── HEAD 检查 ───────────────────────────────────────────────────────
function categorize(status: number | null, errorKind?: 'timeout' | 'network'): Category {
	if (errorKind === 'timeout') return 'timeout';
	if (errorKind === 'network') return 'network-error';
	if (status === null) return 'network-error';
	if (status >= 200 && status < 300) return '2xx';
	if (status >= 300 && status < 400) return '3xx';
	if (status === 404) return '404';
	if (status === 410) return '410';
	if (status >= 400 && status < 500) return '4xx-other';
	if (status >= 500) return '5xx';
	return 'network-error';
}

async function checkUrl(item: { url: string; sitemap: string }): Promise<UrlResult> {
	const started = Date.now();
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
	try {
		// 先 HEAD
		let res = await fetch(item.url, {
			method: 'HEAD',
			signal: ctrl.signal,
			headers: { 'User-Agent': USER_AGENT },
			redirect: 'manual', // 我们自己看 3xx
		});

		// 如果 HEAD 被 405 / 403 拒绝，回退到 GET（只读 header）
		if (res.status === 405 || res.status === 403) {
			res = await fetch(item.url, {
				method: 'GET',
				signal: ctrl.signal,
				headers: { 'User-Agent': USER_AGENT, Range: 'bytes=0-0' },
				redirect: 'manual',
			});
		}

		const finalUrl = res.headers.get('location') || undefined;
		return {
			url: item.url,
			status: res.status,
			category: categorize(res.status),
			finalUrl: finalUrl && finalUrl !== item.url ? finalUrl : undefined,
			sitemap: item.sitemap,
			durationMs: Date.now() - started,
		};
	} catch (e) {
		const err = e as Error;
		const isAbort = err.name === 'AbortError';
		return {
			url: item.url,
			status: null,
			category: categorize(null, isAbort ? 'timeout' : 'network'),
			errorMessage: err.message,
			sitemap: item.sitemap,
			durationMs: Date.now() - started,
		};
	} finally {
		clearTimeout(t);
	}
}

async function checkAll(items: { url: string; sitemap: string }[]): Promise<UrlResult[]> {
	const results: UrlResult[] = [];
	let idx = 0;
	let lastLogAt = 0;

	async function worker() {
		while (idx < items.length) {
			const i = idx++;
			const r = await checkUrl(items[i]);
			results.push(r);

			// 节流日志：每 200 个或每 10 秒打印一次进度
			const now = Date.now();
			if (results.length % 200 === 0 || now - lastLogAt > 10_000) {
				lastLogAt = now;
				console.log(`  ${results.length} / ${items.length} checked`);
			}
		}
	}

	const workers = Array.from({ length: CONCURRENCY }, () => worker());
	await Promise.all(workers);
	return results;
}

// ─── 报告生成 ─────────────────────────────────────────────────────────
function buildReport(date: string, results: UrlResult[]): Report {
	const totals: Record<Category, number> = {
		'2xx': 0,
		'3xx': 0,
		'404': 0,
		'410': 0,
		'4xx-other': 0,
		'5xx': 0,
		'timeout': 0,
		'network-error': 0,
	};
	for (const r of results) totals[r.category]++;

	const sitemapMap = new Map<string, { total: number; healthy: number; broken: number }>();
	for (const r of results) {
		const m = sitemapMap.get(r.sitemap) || { total: 0, healthy: 0, broken: 0 };
		m.total++;
		if (r.category === '2xx' || r.category === '3xx') m.healthy++;
		else m.broken++;
		sitemapMap.set(r.sitemap, m);
	}

	return {
		date,
		generatedAtUtc: new Date().toISOString(),
		totals,
		totalCount: results.length,
		results,
		perSitemap: [...sitemapMap.entries()]
			.map(([sitemap, v]) => ({ sitemap, ...v }))
			.sort((a, b) => b.broken - a.broken),
	};
}

function loadPriorReport(beforeDate: string): { date: string; brokenUrls: Set<string> } | null {
	if (!existsSync(REPORT_DIR)) return null;
	const files = readdirSync(REPORT_DIR)
		.filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
		.map(f => f.replace('.md', ''))
		.filter(d => d < beforeDate)
		.sort();
	if (files.length === 0) return null;
	const prior = files[files.length - 1];
	const path = join(REPORT_DIR, `${prior}.md`);
	const content = readFileSync(path, 'utf8');
	const broken = new Set<string>();

	// 解析 broken URLs JSON 块
	const jsonMatch = content.match(/```json\s*broken-urls\s*([\s\S]*?)```/);
	if (jsonMatch) {
		try {
			const parsed = JSON.parse(jsonMatch[1]);
			if (Array.isArray(parsed)) {
				for (const item of parsed) {
					if (typeof item === 'string') broken.add(item);
					else if (item && typeof item.url === 'string') broken.add(item.url);
				}
			}
		} catch (_) {
			// 解析失败就当作没有先验
		}
	}
	return { date: prior, brokenUrls: broken };
}

function isBrokenCategory(c: Category): boolean {
	return c === '404' || c === '410' || c === '4xx-other' || c === '5xx' || c === 'timeout' || c === 'network-error';
}

function categoryEmoji(c: Category): string {
	switch (c) {
		case '2xx': return '✅';
		case '3xx': return '🔁';
		case '404': return '❌';
		case '410': return '🪦';
		case '4xx-other': return '⚠️';
		case '5xx': return '💥';
		case 'timeout': return '⏱';
		case 'network-error': return '🚫';
	}
}

function categoryLabel(c: Category): string {
	switch (c) {
		case '2xx': return '200 OK (含 2xx)';
		case '3xx': return '3xx redirect';
		case '404': return '404 not found';
		case '410': return '410 gone';
		case '4xx-other': return '其他 4xx (401/403/...)';
		case '5xx': return '5xx server error';
		case 'timeout': return 'timeout (超 10s)';
		case 'network-error': return '网络/DNS error';
	}
}

function pct(n: number, total: number): string {
	if (total === 0) return '0.00%';
	return ((n / total) * 100).toFixed(2) + '%';
}

function renderMarkdown(report: Report, prior: { date: string; brokenUrls: Set<string> } | null): string {
	const { date, generatedAtUtc, totals, totalCount, perSitemap, results } = report;
	const brokenResults = results.filter(r => isBrokenCategory(r.category));
	const brokenUrlsSet = new Set(brokenResults.map(r => r.url));

	const newBroken = prior
		? brokenResults.filter(r => !prior.brokenUrls.has(r.url))
		: [];
	const stillBroken = prior
		? brokenResults.filter(r => prior.brokenUrls.has(r.url))
		: [];
	const fixed = prior
		? [...prior.brokenUrls].filter(u => !brokenUrlsSet.has(u))
		: [];

	const lines: string[] = [];
	lines.push(`# SEO Healthcheck — ${date}`);
	lines.push('');
	lines.push(`> 来源：\`${SITEMAP_INDEX}\` (递归展开)`);
	lines.push(`> 总 URL 数：**${totalCount}**`);
	lines.push(`> 并发：${CONCURRENCY} · 超时：${TIMEOUT_MS / 1000}s · 跟随 3xx：手动统计`);
	lines.push(`> 生成时间 (UTC)：${generatedAtUtc}`);
	if (prior) lines.push(`> 上次报告：${prior.date}（**${prior.brokenUrls.size}** 条坏 URL）`);
	lines.push('');

	lines.push('## 📊 状态码总览');
	lines.push('');
	lines.push('| 类别 | 数量 | 占比 |');
	lines.push('|---|---:|---:|');
	const orderedCats: Category[] = ['2xx', '3xx', '404', '410', '4xx-other', '5xx', 'timeout', 'network-error'];
	for (const c of orderedCats) {
		const n = totals[c];
		if (n === 0 && c !== '2xx') continue;
		lines.push(`| ${categoryEmoji(c)} ${categoryLabel(c)} | ${n} | ${pct(n, totalCount)} |`);
	}
	lines.push('');

	if (prior) {
		lines.push('## 🆕 NEW 新坏的 URL');
		lines.push('');
		if (newBroken.length === 0) {
			lines.push('_（昨天没坏 / 今天坏的 URL：0 条）_');
		} else {
			lines.push(`昨天还好今天坏了 **${newBroken.length}** 条：`);
			lines.push('');
			lines.push('| 状态 | URL | sitemap |');
			lines.push('|---|---|---|');
			for (const r of newBroken.slice(0, 50)) {
				lines.push(`| ${categoryEmoji(r.category)} ${r.status ?? '—'} | ${r.url} | ${r.sitemap} |`);
			}
			if (newBroken.length > 50) lines.push(`| ... | _余 ${newBroken.length - 50} 条见底部 JSON 列表_ | |`);
		}
		lines.push('');

		lines.push('## ✨ 已修复 URL');
		lines.push('');
		if (fixed.length === 0) {
			lines.push('_（昨天坏 / 今天恢复：0 条）_');
		} else {
			lines.push(`昨天坏 / 今天恢复 200 的 **${fixed.length}** 条：`);
			lines.push('');
			for (const u of fixed.slice(0, 50)) lines.push(`- ✅ ${u}`);
			if (fixed.length > 50) lines.push(`- ... 余 ${fixed.length - 50} 条`);
		}
		lines.push('');

		lines.push('## 🔁 持续坏的 URL');
		lines.push('');
		if (stillBroken.length === 0) {
			lines.push('_（昨天和今天都坏：0 条）_');
		} else {
			lines.push(`昨天和今天都坏的 **${stillBroken.length}** 条（按 sitemap 分组）：`);
			lines.push('');
			const grouped = new Map<string, UrlResult[]>();
			for (const r of stillBroken) {
				if (!grouped.has(r.sitemap)) grouped.set(r.sitemap, []);
				grouped.get(r.sitemap)!.push(r);
			}
			for (const [sm, rs] of [...grouped.entries()].sort((a, b) => b[1].length - a[1].length)) {
				lines.push(`### ${sm} — ${rs.length} 条`);
				lines.push('');
				for (const r of rs.slice(0, 20)) {
					lines.push(`- ${categoryEmoji(r.category)} ${r.status ?? '—'} ${r.url}`);
				}
				if (rs.length > 20) lines.push(`- ... 余 ${rs.length - 20} 条见底部 JSON 列表`);
				lines.push('');
			}
		}
		lines.push('');
	} else {
		lines.push('## 📋 所有坏 URL（首次跑，无 diff）');
		lines.push('');
		if (brokenResults.length === 0) {
			lines.push('_（首次扫，全部 URL 健康。后续跑会出 diff）_');
		} else {
			lines.push(`本次发现 **${brokenResults.length}** 条坏 URL（首次跑，无 diff）。详见底部 JSON 列表。`);
		}
		lines.push('');
	}

	lines.push('## 🗂 各 sitemap 健康度');
	lines.push('');
	lines.push('| sitemap | 总数 | 健康 | 坏 | 健康率 |');
	lines.push('|---|---:|---:|---:|---:|');
	for (const s of perSitemap) {
		lines.push(`| ${s.sitemap} | ${s.total} | ${s.healthy} | ${s.broken} | ${pct(s.healthy, s.total)} |`);
	}
	lines.push('');

	// JSON 块用于明天 diff
	lines.push('## 🔧 broken URLs (machine-readable)');
	lines.push('');
	lines.push('下面这块给明天 diff 用，不要手动改。');
	lines.push('');
	lines.push('```json broken-urls');
	const machineList = brokenResults.map(r => ({
		url: r.url,
		status: r.status,
		category: r.category,
		sitemap: r.sitemap,
	}));
	lines.push(JSON.stringify(machineList, null, 2));
	lines.push('```');
	lines.push('');

	return lines.join('\n');
}

// ─── 主流程 ───────────────────────────────────────────────────────────
async function main() {
	const date = process.argv[2] || todayAEST();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		console.error(`❌ Bad date arg: ${date}. Use YYYY-MM-DD.`);
		process.exit(1);
	}

	console.log(`▶ SEO Healthcheck for ${date} (AEST)`);
	console.log('');

	const { urls } = await collectAllUrls();
	console.log('');
	console.log(`▶ Checking ${urls.length} URLs (concurrency=${CONCURRENCY})...`);
	const t0 = Date.now();
	const results = await checkAll(urls);
	const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
	console.log(`▶ Done in ${elapsed}s`);
	console.log('');

	const report = buildReport(date, results);
	const prior = loadPriorReport(date);

	console.log('▶ Totals:');
	for (const [c, n] of Object.entries(report.totals)) {
		if (n === 0) continue;
		console.log(`  ${categoryEmoji(c as Category)} ${categoryLabel(c as Category)}: ${n}`);
	}
	console.log('');

	const md = renderMarkdown(report, prior);
	if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true });
	const outPath = join(REPORT_DIR, `${date}.md`);
	writeFileSync(outPath, md, 'utf8');
	console.log(`✅ Wrote ${outPath} (${(md.length / 1024).toFixed(1)} KB)`);
	if (prior) {
		const newCount = results.filter(r => isBrokenCategory(r.category) && !prior.brokenUrls.has(r.url)).length;
		const fixedCount = [...prior.brokenUrls].filter(u => !results.find(r => r.url === u && isBrokenCategory(r.category))).length;
		console.log(`   diff vs ${prior.date}: 🆕 ${newCount} new broken · ✨ ${fixedCount} fixed`);
	}
}

main().catch(err => {
	console.error('❌ FATAL:', err);
	process.exit(1);
});
