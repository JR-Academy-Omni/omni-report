#!/usr/bin/env bun
/**
 * Phase 3: 抓 Core Web Vitals（PageSpeed Insights）。
 *
 * 输入：seo-performance/{date}.json 里的 gsc.by_page（top 流量页面）+ env (PSI_API_KEY)
 * 输出：seo-performance/{date}.json 里的 cwv 节
 *
 * 默认抓 GSC top 50 流量页面（mobile）。可通过 --top=N 调整。
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runPsiBatch, isGood, type PsiResult } from './lib/psi.ts';
import { todayAEST } from './lib/aest.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_DIR = join(REPO_ROOT, 'seo-performance');

interface CwvSection {
	strategy: 'mobile' | 'desktop';
	page_count: number;
	good_count: number;
	good_rate: number;
	pages: PsiResult[];
	fetched_at: string;
}

async function main() {
	const args = process.argv.slice(2);
	const date = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) || todayAEST();
	const top = parseInt(args.find((a) => a.startsWith('--top='))?.split('=')[1] || '50', 10);
	const strategy = (args.find((a) => a.startsWith('--strategy='))?.split('=')[1] as 'mobile' | 'desktop') || 'mobile';

	if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true });
	const reportPath = join(REPORT_DIR, `${date}.json`);
	if (!existsSync(reportPath)) {
		throw new Error(`No report file at ${reportPath}. Run fetch-gsc.ts first.`);
	}
	const existing = JSON.parse(readFileSync(reportPath, 'utf8'));
	const byPage: Array<{ page: string; clicks: number; impressions: number }> = existing.gsc?.by_page ?? [];
	if (byPage.length === 0) {
		throw new Error('No gsc.by_page data — run fetch-gsc.ts first.');
	}

	const sorted = [...byPage].sort((a, b) => b.clicks - a.clicks).slice(0, top);
	const urls = sorted.map((p) => p.page);

	console.log(`▶ Running PSI on top ${urls.length} pages (${strategy})`);
	const start = Date.now();
	const results = await runPsiBatch(urls, { strategy, concurrency: 3 });
	console.log(`  · finished in ${((Date.now() - start) / 1000).toFixed(1)}s`);

	const goodCount = results.filter((r) => isGood(r.cwv)).length;
	const section: CwvSection = {
		strategy,
		page_count: results.length,
		good_count: goodCount,
		good_rate: results.length > 0 ? goodCount / results.length : 0,
		pages: results,
		fetched_at: new Date().toISOString(),
	};

	const merged = { ...existing, cwv: section };
	writeFileSync(reportPath, JSON.stringify(merged, null, 2));
	console.log(`✅ CWV → ${reportPath}`);
	console.log(`   pages: ${results.length} · good: ${goodCount} (${(section.good_rate * 100).toFixed(1)}%)`);
	const errors = results.filter((r) => r.error).length;
	if (errors > 0) console.log(`   ⚠️ errors: ${errors}`);
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ fetch-cwv failed:', err);
		process.exit(1);
	});
}
