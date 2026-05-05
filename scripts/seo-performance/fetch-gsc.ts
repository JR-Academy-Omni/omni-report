#!/usr/bin/env bun
/**
 * Phase 1: 拉 GSC search analytics + index coverage 数据。
 *
 * 输入：env (GSC_SA_JSON_BASE64, GSC_SITE_URL)
 * 输出：seo-performance/{date}.json 里的 gsc 节
 *
 * Usage:
 *   bun run scripts/seo-performance/fetch-gsc.ts            # 用今天 AEST 日期
 *   bun run scripts/seo-performance/fetch-gsc.ts 2026-04-30 # 指定日期
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { searchAnalyticsAll, getSiteUrl, type SearchAnalyticsRow } from './lib/gsc.ts';
import { todayAEST, daysAgoAEST } from './lib/aest.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_DIR = join(REPO_ROOT, 'seo-performance');

interface GscSection {
	site_url: string;
	date_range: { start: string; end: string };
	totals: { clicks: number; impressions: number; ctr: number; position: number };
	by_query: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>;
	by_page: Array<{ page: string; clicks: number; impressions: number; ctr: number; position: number }>;
	by_country: Array<{ country: string; clicks: number; impressions: number; ctr: number; position: number }>;
	by_device: Array<{ device: string; clicks: number; impressions: number; ctr: number; position: number }>;
	row_counts: { query: number; page: number };
	fetched_at: string;
}

function summarizeRows(rows: SearchAnalyticsRow[]) {
	if (rows.length === 0) {
		return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
	}
	let clicks = 0, impressions = 0, weighted_position = 0;
	for (const r of rows) {
		clicks += r.clicks;
		impressions += r.impressions;
		weighted_position += r.position * r.impressions;
	}
	return {
		clicks,
		impressions,
		ctr: impressions > 0 ? clicks / impressions : 0,
		position: impressions > 0 ? weighted_position / impressions : 0,
	};
}

async function main() {
	const date = process.argv[2] || todayAEST();
	// GSC 数据有 2-3 天延迟，取本周指的是"截止 3 天前的过去 7 天"
	const endDate = daysAgoAEST(3);
	const startDate = daysAgoAEST(9);

	if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true });
	const reportPath = join(REPORT_DIR, `${date}.json`);
	const existing = existsSync(reportPath)
		? JSON.parse(readFileSync(reportPath, 'utf8'))
		: { date, generated_at: new Date().toISOString() };

	const siteUrl = getSiteUrl();
	console.log(`▶ Fetching GSC data for ${siteUrl}`);
	console.log(`  date range: ${startDate} → ${endDate}`);

	console.log('  · by_query …');
	const byQuery = await searchAnalyticsAll(siteUrl, {
		startDate,
		endDate,
		dimensions: ['query'],
		rowLimit: 25000,
	});

	console.log('  · by_page …');
	const byPage = await searchAnalyticsAll(siteUrl, {
		startDate,
		endDate,
		dimensions: ['page'],
		rowLimit: 25000,
	});

	console.log('  · by_country …');
	const byCountry = await searchAnalyticsAll(siteUrl, {
		startDate,
		endDate,
		dimensions: ['country'],
		rowLimit: 1000,
	});

	console.log('  · by_device …');
	const byDevice = await searchAnalyticsAll(siteUrl, {
		startDate,
		endDate,
		dimensions: ['device'],
		rowLimit: 100,
	});

	const totals = summarizeRows(byQuery);

	const section: GscSection = {
		site_url: siteUrl,
		date_range: { start: startDate, end: endDate },
		totals,
		by_query: byQuery.map((r) => ({
			query: r.keys[0],
			clicks: r.clicks,
			impressions: r.impressions,
			ctr: r.ctr,
			position: r.position,
		})),
		by_page: byPage.map((r) => ({
			page: r.keys[0],
			clicks: r.clicks,
			impressions: r.impressions,
			ctr: r.ctr,
			position: r.position,
		})),
		by_country: byCountry.map((r) => ({
			country: r.keys[0],
			clicks: r.clicks,
			impressions: r.impressions,
			ctr: r.ctr,
			position: r.position,
		})),
		by_device: byDevice.map((r) => ({
			device: r.keys[0],
			clicks: r.clicks,
			impressions: r.impressions,
			ctr: r.ctr,
			position: r.position,
		})),
		row_counts: { query: byQuery.length, page: byPage.length },
		fetched_at: new Date().toISOString(),
	};

	const merged = { ...existing, gsc: section };
	writeFileSync(reportPath, JSON.stringify(merged, null, 2));
	console.log(`✅ GSC data → ${reportPath}`);
	console.log(`   queries: ${byQuery.length} · pages: ${byPage.length}`);
	console.log(`   totals: clicks=${totals.clicks} impressions=${totals.impressions} pos=${totals.position.toFixed(2)}`);
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ fetch-gsc failed:', err);
		process.exit(1);
	});
}
