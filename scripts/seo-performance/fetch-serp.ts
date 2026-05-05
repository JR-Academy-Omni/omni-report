#!/usr/bin/env bun
/**
 * Phase 2: 拉 DataForSEO SERP 排名（每个关键词 × 每个 location）。
 *
 * 输入：keywords.json + env (DATAFORSEO_LOGIN/PASSWORD)
 * 输出：seo-performance/{date}.json 里的 serp 节
 *
 * 支持 batch 参数：bun run fetch-serp.ts {date} --batch=A    (A/B/C/D)
 *   - A = brand
 *   - B = core_courses
 *   - C = long_tail_content
 *   - D = career_transition
 *   不传 --batch 则跑全部 4 类。
 *
 * 每个 batch 完成后会写入 JSON，PRD 5.3 节"防 stream idle timeout"靠分 batch 实现。
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchSerpBatch, findDomainPosition, type SerpQueryItem } from './lib/dataforseo.ts';
import { todayAEST } from './lib/aest.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_DIR = join(REPO_ROOT, 'seo-performance');
const KEYWORDS_PATH = join(__dirname, 'keywords.json');

interface KeywordsConfig {
	domain: string;
	locations: Array<{ code: number; name: string; language_code: string; label: string }>;
	categories: Record<string, { label: string; keywords: string[] }>;
}

interface SerpEntry {
	keyword: string;
	category: string;
	location_label: string;
	location_code: number;
	language_code: string;
	rank_absolute: number | null;
	url: string | null;
	title?: string;
	error?: string;
	checked_at: string;
}

const CATEGORY_BATCHES: Record<string, string> = {
	A: 'brand',
	B: 'core_courses',
	C: 'long_tail_content',
	D: 'career_transition',
};

async function main() {
	const args = process.argv.slice(2);
	const date = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) || todayAEST();
	const batchArg = args.find((a) => a.startsWith('--batch='))?.split('=')[1];

	const config = JSON.parse(readFileSync(KEYWORDS_PATH, 'utf8')) as KeywordsConfig;

	const categoriesToRun = batchArg
		? [CATEGORY_BATCHES[batchArg.toUpperCase()]].filter(Boolean)
		: Object.keys(config.categories);

	if (batchArg && categoriesToRun.length === 0) {
		throw new Error(`Invalid --batch=${batchArg}. Use A/B/C/D.`);
	}

	if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true });
	const reportPath = join(REPORT_DIR, `${date}.json`);
	const existing = existsSync(reportPath)
		? JSON.parse(readFileSync(reportPath, 'utf8'))
		: { date, generated_at: new Date().toISOString() };

	const previousSerp: SerpEntry[] = existing.serp || [];
	const previousByCategory: Record<string, SerpEntry[]> = {};
	for (const e of previousSerp) {
		if (!previousByCategory[e.category]) previousByCategory[e.category] = [];
		previousByCategory[e.category].push(e);
	}

	const allEntries: SerpEntry[] = [];
	// 保留没在本次 batch 范围内的旧分类数据（只覆盖跑过的部分）
	for (const [cat, entries] of Object.entries(previousByCategory)) {
		if (!categoriesToRun.includes(cat)) allEntries.push(...entries);
	}

	for (const catKey of categoriesToRun) {
		const cat = config.categories[catKey];
		if (!cat) continue;
		console.log(`\n▶ Batch ${catKey} (${cat.label}) — ${cat.keywords.length} keywords × ${config.locations.length} locations`);
		const items: SerpQueryItem[] = [];
		const meta: Array<{ keyword: string; location_label: string }> = [];
		for (const kw of cat.keywords) {
			for (const loc of config.locations) {
				items.push({
					keyword: kw,
					location_code: loc.code,
					language_code: loc.language_code,
					device: 'desktop',
					depth: 100,
					tag: `${catKey}|${loc.label}|${kw}`,
				});
				meta.push({ keyword: kw, location_label: loc.label });
			}
		}

		const start = Date.now();
		const payloads = await fetchSerpBatch(items);
		console.log(`  · API returned ${payloads.length} payloads in ${((Date.now() - start) / 1000).toFixed(1)}s`);

		// match payloads back to (keyword, location) by keyword + location_code (DataForSEO doesn't always echo `tag`)
		const payloadIndex = new Map<string, typeof payloads[number]>();
		for (const p of payloads) {
			payloadIndex.set(`${p.keyword}|${p.location_code}|${p.language_code}`, p);
		}

		for (const item of items) {
			const key = `${item.keyword}|${item.location_code}|${item.language_code}`;
			const payload = payloadIndex.get(key);
			const loc = config.locations.find((l) => l.code === item.location_code && l.language_code === item.language_code);
			const entry: SerpEntry = {
				keyword: item.keyword,
				category: catKey,
				location_label: loc?.label ?? `${item.location_code}-${item.language_code}`,
				location_code: item.location_code,
				language_code: item.language_code,
				rank_absolute: null,
				url: null,
				checked_at: new Date().toISOString(),
			};
			if (!payload) {
				entry.error = 'no payload';
			} else {
				const found = findDomainPosition(payload, config.domain);
				if (found) {
					entry.rank_absolute = found.rank_absolute;
					entry.url = found.url;
					entry.title = found.title;
				}
			}
			allEntries.push(entry);
		}

		// Save incrementally after each batch
		const merged = { ...existing, serp: allEntries };
		writeFileSync(reportPath, JSON.stringify(merged, null, 2));
		const hits = allEntries.filter((e) => e.category === catKey && e.rank_absolute !== null).length;
		const total = allEntries.filter((e) => e.category === catKey).length;
		console.log(`  ✅ batch ${catKey} done — hits ${hits}/${total} (in top 100)`);
	}

	console.log(`\n✅ SERP fetch complete → ${reportPath}`);
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ fetch-serp failed:', err);
		process.exit(1);
	});
}
