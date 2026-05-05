#!/usr/bin/env bun
/**
 * Phase 4: diff 上周 + 找 opportunity + ROI 排序。
 *
 * 输入：seo-performance/{date}.json (本周原始数据) + seo-performance/{date-7}.json (上周)
 * 输出：seo-performance/{date}.json 里的 analysis 节
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { todayAEST, weeksAgoAEST } from './lib/aest.ts';
import { isGood, type PsiResult } from './lib/psi.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_DIR = join(REPO_ROOT, 'seo-performance');

interface PageRow {
	page: string;
	clicks: number;
	impressions: number;
	ctr: number;
	position: number;
}

interface QueryRow {
	query: string;
	clicks: number;
	impressions: number;
	ctr: number;
	position: number;
}

interface SerpEntry {
	keyword: string;
	category: string;
	location_label: string;
	rank_absolute: number | null;
	url: string | null;
	checked_at: string;
}

interface RankChange {
	keyword: string;
	location: string;
	previous: number | null;
	current: number | null;
	delta: number; // negative = better (rank went up); use 'movement' label in report
	url: string | null;
}

interface PageTrafficChange {
	page: string;
	current_clicks: number;
	previous_clicks: number;
	delta_clicks: number;
	delta_pct: number;
}

interface ContentOpportunity {
	query: string;
	page?: string;
	impressions: number;
	clicks: number;
	ctr: number;
	position: number;
	reason: string;
}

type ActionType = 'ctr_opportunity' | 'page_drop_investigation' | 'rank_drop_investigation' | 'cwv_optimization';

interface ActionItem {
	priority: number;
	action_type: ActionType;
	action: string;
	target: string;
	roi_estimate: string;
	effort: string;
}

interface ActionVerification {
	original_action: ActionItem;
	status: 'improved' | 'unchanged' | 'worsened' | 'not_measurable';
	metric_then: number | null;
	metric_now: number | null;
	delta_str: string;
	note: string;
}

interface AnalysisSection {
	previous_date: string | null;
	totals_diff: {
		clicks: { current: number; previous: number; delta: number; delta_pct: number };
		impressions: { current: number; previous: number; delta: number; delta_pct: number };
		ctr: { current: number; previous: number; delta_pp: number };
		position: { current: number; previous: number; delta: number };
		top_10_count: { current: number; previous: number; delta: number };
	};
	rank_drops: RankChange[];
	rank_gains: RankChange[];
	page_traffic_drops: PageTrafficChange[];
	page_traffic_gains: PageTrafficChange[];
	content_opportunities: ContentOpportunity[];
	cwv_worst: PsiResult[];
	actions: ActionItem[];
	last_week_verifications: ActionVerification[];
}

function findPreviousReport(currentDate: string): { path: string; data: any; date: string } | null {
	// 先找 7 天前精确日期，找不到再回退到 14 天内最近一份
	const target = weeksAgoAEST(1);
	const candidatePath = join(REPORT_DIR, `${target}.json`);
	if (existsSync(candidatePath)) {
		return { path: candidatePath, data: JSON.parse(readFileSync(candidatePath, 'utf8')), date: target };
	}
	// 回退：扫描 reports 目录，找早于本周且最接近 7 天前的
	const all = readdirSync(REPORT_DIR)
		.filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
		.map((f) => f.replace('.json', ''))
		.filter((d) => d < currentDate)
		.sort()
		.reverse();
	if (all.length === 0) return null;
	const fallback = all[0];
	return { path: join(REPORT_DIR, `${fallback}.json`), data: JSON.parse(readFileSync(join(REPORT_DIR, `${fallback}.json`), 'utf8')), date: fallback };
}

function pct(curr: number, prev: number): number {
	if (prev === 0) return curr > 0 ? 100 : 0;
	return ((curr - prev) / prev) * 100;
}

export function diffSerp(current: SerpEntry[], previous: SerpEntry[]): { drops: RankChange[]; gains: RankChange[] } {
	const prevMap = new Map<string, SerpEntry>();
	for (const p of previous) {
		prevMap.set(`${p.keyword}|${p.location_label}`, p);
	}
	const changes: RankChange[] = [];
	for (const c of current) {
		const prev = prevMap.get(`${c.keyword}|${c.location_label}`);
		if (!prev) continue;
		const currentRank = c.rank_absolute;
		const previousRank = prev.rank_absolute;
		// 都没排名跳过
		if (currentRank === null && previousRank === null) continue;
		// 用 101 表示"前 100 名外"，方便算 delta
		const cv = currentRank === null ? 101 : currentRank;
		const pv = previousRank === null ? 101 : previousRank;
		const delta = cv - pv; // 正数=排名变差
		if (delta === 0) continue;
		changes.push({
			keyword: c.keyword,
			location: c.location_label,
			previous: previousRank,
			current: currentRank,
			delta,
			url: c.url,
		});
	}
	const drops = changes.filter((c) => c.delta > 0).sort((a, b) => b.delta - a.delta).slice(0, 10);
	const gains = changes.filter((c) => c.delta < 0).sort((a, b) => a.delta - b.delta).slice(0, 10);
	return { drops, gains };
}

export function diffPageTraffic(current: PageRow[], previous: PageRow[]): { drops: PageTrafficChange[]; gains: PageTrafficChange[] } {
	const prevMap = new Map<string, PageRow>();
	for (const p of previous) prevMap.set(p.page, p);
	const changes: PageTrafficChange[] = [];
	for (const c of current) {
		const prev = prevMap.get(c.page);
		if (!prev) continue;
		const delta = c.clicks - prev.clicks;
		if (delta === 0) continue;
		// 至少有一周点击数 ≥ 5 才算（避免噪声）
		if (Math.max(c.clicks, prev.clicks) < 5) continue;
		changes.push({
			page: c.page,
			current_clicks: c.clicks,
			previous_clicks: prev.clicks,
			delta_clicks: delta,
			delta_pct: pct(c.clicks, prev.clicks),
		});
	}
	const drops = changes.filter((c) => c.delta_clicks < 0).sort((a, b) => a.delta_clicks - b.delta_clicks).slice(0, 5);
	const gains = changes.filter((c) => c.delta_clicks > 0).sort((a, b) => b.delta_clicks - a.delta_clicks).slice(0, 5);
	return { drops, gains };
}

export function findOpportunities(byQuery: QueryRow[]): ContentOpportunity[] {
	// 高曝光 + 低 CTR + position 在 top 20（说明 Google 觉得相关，但用户没点）
	return byQuery
		.filter((q) => q.impressions > 500 && q.ctr < 0.01 && q.position <= 20)
		.sort((a, b) => b.impressions - a.impressions)
		.slice(0, 10)
		.map((q) => ({
			query: q.query,
			impressions: q.impressions,
			clicks: q.clicks,
			ctr: q.ctr,
			position: q.position,
			reason: `位置 ${q.position.toFixed(1)} CTR ${(q.ctr * 100).toFixed(2)}% — title/description 没勾住搜索意图`,
		}));
}

export function buildActions(
	rankDrops: RankChange[],
	pageDrops: PageTrafficChange[],
	opportunities: ContentOpportunity[],
	cwvWorst: PsiResult[],
): ActionItem[] {
	const actions: ActionItem[] = [];

	// 1. CTR opportunity 是 ROI 最高的（改个 title 几分钟）
	for (const opp of opportunities.slice(0, 3)) {
		actions.push({
			priority: 1,
			action_type: 'ctr_opportunity',
			action: `改 "${opp.query}" 着陆页 title/meta description，勾住搜索意图`,
			target: opp.query,
			roi_estimate: `月增 ${Math.round(opp.impressions * 0.03 * 4)} 点击（按 CTR 提到 3% 估）`,
			effort: '5-10min',
		});
	}

	// 2. 流量大跌的页面要排查
	for (const drop of pageDrops.slice(0, 2)) {
		actions.push({
			priority: 2,
			action_type: 'page_drop_investigation',
			action: `排查 ${drop.page} 流量跌 ${drop.delta_pct.toFixed(0)}% 原因（页面是否改过/404/被竞品超越）`,
			target: drop.page,
			roi_estimate: `救回 ${Math.abs(drop.delta_clicks)} 周点击`,
			effort: '30min',
		});
	}

	// 3. 排名大跌的关键词
	for (const drop of rankDrops.slice(0, 2)) {
		actions.push({
			priority: 3,
			action_type: 'rank_drop_investigation',
			action: `分析 "${drop.keyword}" 排名 ${drop.previous ?? '—'} → ${drop.current ?? '100+'} 的原因`,
			target: drop.url ?? drop.keyword,
			roi_estimate: '数据待恢复后估算',
			effort: '20min',
		});
	}

	// 4. CWV 最差的页面
	for (const cwv of cwvWorst.slice(0, 2)) {
		const issues: string[] = [];
		if (cwv.cwv.lcp_ms !== null && cwv.cwv.lcp_ms > 2500) issues.push(`LCP ${(cwv.cwv.lcp_ms / 1000).toFixed(1)}s`);
		if (cwv.cwv.inp_ms !== null && cwv.cwv.inp_ms > 200) issues.push(`INP ${cwv.cwv.inp_ms}ms`);
		if (cwv.cwv.cls !== null && cwv.cwv.cls > 0.1) issues.push(`CLS ${cwv.cwv.cls.toFixed(2)}`);
		if (issues.length === 0) continue;
		actions.push({
			priority: 4,
			action_type: 'cwv_optimization',
			action: `优化 ${cwv.url} 的 ${issues.join(' / ')}`,
			target: cwv.url,
			roi_estimate: 'CWV 良好率 +1pp + 排名加分',
			effort: '1-2h',
		});
	}

	return actions.sort((a, b) => a.priority - b.priority).slice(0, 10);
}

function countTop10(byQuery: QueryRow[]): number {
	return byQuery.filter((q) => q.position <= 10 && q.impressions > 0).length;
}

/**
 * 校验上周的 actions 在本周数据里是否真的生效。
 * 这是 PRD 闭环的关键：让用户看到自己修了 X、本周 X 真的好了，建立 trust。
 */
export function verifyActions(
	previousActions: ActionItem[],
	currentGsc: { by_query: QueryRow[]; by_page: PageRow[] },
	previousGsc: { by_query: QueryRow[]; by_page: PageRow[] } | null,
	currentCwv: PsiResult[],
	previousCwv: PsiResult[],
): ActionVerification[] {
	const verifications: ActionVerification[] = [];

	for (const action of previousActions) {
		const v: ActionVerification = {
			original_action: action,
			status: 'not_measurable',
			metric_then: null,
			metric_now: null,
			delta_str: '—',
			note: '',
		};

		if (!previousGsc) {
			v.note = '上周数据缺失，无法 verify';
			verifications.push(v);
			continue;
		}

		switch (action.action_type) {
			case 'ctr_opportunity': {
				const queryNow = currentGsc.by_query.find((q) => q.query === action.target);
				const queryThen = previousGsc.by_query.find((q) => q.query === action.target);
				if (queryNow && queryThen && queryThen.impressions > 0) {
					v.metric_then = queryThen.ctr;
					v.metric_now = queryNow.ctr;
					const deltaPp = (queryNow.ctr - queryThen.ctr) * 100;
					v.delta_str = `CTR ${(queryThen.ctr * 100).toFixed(2)}% → ${(queryNow.ctr * 100).toFixed(2)}% (${deltaPp > 0 ? '+' : ''}${deltaPp.toFixed(2)}pp)`;
					if (deltaPp > 0.5) v.status = 'improved';
					else if (deltaPp < -0.5) v.status = 'worsened';
					else v.status = 'unchanged';
				} else {
					v.note = 'query 不在本周数据中（可能曝光过少被裁掉）';
				}
				break;
			}
			case 'page_drop_investigation': {
				const pageNow = currentGsc.by_page.find((p) => p.page === action.target);
				const pageThen = previousGsc.by_page.find((p) => p.page === action.target);
				if (pageNow && pageThen) {
					v.metric_then = pageThen.clicks;
					v.metric_now = pageNow.clicks;
					const deltaPct = pageThen.clicks > 0 ? ((pageNow.clicks - pageThen.clicks) / pageThen.clicks) * 100 : 0;
					v.delta_str = `clicks ${pageThen.clicks} → ${pageNow.clicks} (${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(0)}%)`;
					if (deltaPct > 5) v.status = 'improved';
					else if (deltaPct < -5) v.status = 'worsened';
					else v.status = 'unchanged';
				} else {
					v.note = 'page 不在 by_page 数据中';
				}
				break;
			}
			case 'rank_drop_investigation': {
				const target = action.target;
				if (target.startsWith('http')) {
					const pageNow = currentGsc.by_page.find((p) => p.page === target);
					const pageThen = previousGsc.by_page.find((p) => p.page === target);
					if (pageNow && pageThen) {
						v.metric_then = pageThen.position;
						v.metric_now = pageNow.position;
						const delta = pageNow.position - pageThen.position;
						v.delta_str = `position ${pageThen.position.toFixed(1)} → ${pageNow.position.toFixed(1)} (${delta > 0 ? '+' : ''}${delta.toFixed(1)})`;
						if (delta < -1) v.status = 'improved';
						else if (delta > 1) v.status = 'worsened';
						else v.status = 'unchanged';
					}
				} else {
					const queryNow = currentGsc.by_query.find((q) => q.query === target);
					const queryThen = previousGsc.by_query.find((q) => q.query === target);
					if (queryNow && queryThen) {
						v.metric_then = queryThen.position;
						v.metric_now = queryNow.position;
						const delta = queryNow.position - queryThen.position;
						v.delta_str = `position ${queryThen.position.toFixed(1)} → ${queryNow.position.toFixed(1)} (${delta > 0 ? '+' : ''}${delta.toFixed(1)})`;
						if (delta < -1) v.status = 'improved';
						else if (delta > 1) v.status = 'worsened';
						else v.status = 'unchanged';
					}
				}
				if (v.status === 'not_measurable' && !v.note) v.note = 'query/page 不在本周数据中';
				break;
			}
			case 'cwv_optimization': {
				const cwvNow = currentCwv.find((p) => p.url === action.target);
				const cwvThen = previousCwv.find((p) => p.url === action.target);
				if (cwvNow && cwvThen && cwvNow.cwv.lcp_ms !== null && cwvThen.cwv.lcp_ms !== null) {
					v.metric_then = cwvThen.cwv.lcp_ms;
					v.metric_now = cwvNow.cwv.lcp_ms;
					const deltaMs = cwvNow.cwv.lcp_ms - cwvThen.cwv.lcp_ms;
					v.delta_str = `LCP ${(cwvThen.cwv.lcp_ms / 1000).toFixed(2)}s → ${(cwvNow.cwv.lcp_ms / 1000).toFixed(2)}s (${deltaMs > 0 ? '+' : ''}${(deltaMs / 1000).toFixed(2)}s)`;
					if (deltaMs < -200) v.status = 'improved';
					else if (deltaMs > 200) v.status = 'worsened';
					else v.status = 'unchanged';
				} else {
					v.note = 'page 未在 CWV 数据中或 LCP 无 field data';
				}
				break;
			}
		}

		verifications.push(v);
	}

	return verifications;
}

async function main() {
	const date = process.argv[2] || todayAEST();
	const reportPath = join(REPORT_DIR, `${date}.json`);
	if (!existsSync(reportPath)) {
		throw new Error(`No report file at ${reportPath}`);
	}
	const current = JSON.parse(readFileSync(reportPath, 'utf8'));
	const previous = findPreviousReport(date);

	const currentGsc = current.gsc;
	const currentSerp: SerpEntry[] = current.serp ?? [];
	const currentCwv: PsiResult[] = current.cwv?.pages ?? [];

	if (!currentGsc) {
		throw new Error('Missing gsc section — run fetch-gsc.ts first');
	}

	const totalsDiff = previous?.data.gsc
		? {
				clicks: {
					current: currentGsc.totals.clicks,
					previous: previous.data.gsc.totals.clicks,
					delta: currentGsc.totals.clicks - previous.data.gsc.totals.clicks,
					delta_pct: pct(currentGsc.totals.clicks, previous.data.gsc.totals.clicks),
				},
				impressions: {
					current: currentGsc.totals.impressions,
					previous: previous.data.gsc.totals.impressions,
					delta: currentGsc.totals.impressions - previous.data.gsc.totals.impressions,
					delta_pct: pct(currentGsc.totals.impressions, previous.data.gsc.totals.impressions),
				},
				ctr: {
					current: currentGsc.totals.ctr,
					previous: previous.data.gsc.totals.ctr,
					delta_pp: (currentGsc.totals.ctr - previous.data.gsc.totals.ctr) * 100,
				},
				position: {
					current: currentGsc.totals.position,
					previous: previous.data.gsc.totals.position,
					delta: currentGsc.totals.position - previous.data.gsc.totals.position,
				},
				top_10_count: {
					current: countTop10(currentGsc.by_query),
					previous: countTop10(previous.data.gsc.by_query),
					delta: countTop10(currentGsc.by_query) - countTop10(previous.data.gsc.by_query),
				},
		  }
		: {
				clicks: { current: currentGsc.totals.clicks, previous: 0, delta: 0, delta_pct: 0 },
				impressions: { current: currentGsc.totals.impressions, previous: 0, delta: 0, delta_pct: 0 },
				ctr: { current: currentGsc.totals.ctr, previous: 0, delta_pp: 0 },
				position: { current: currentGsc.totals.position, previous: 0, delta: 0 },
				top_10_count: { current: countTop10(currentGsc.by_query), previous: 0, delta: 0 },
		  };

	const { drops: rankDrops, gains: rankGains } = previous
		? diffSerp(currentSerp, previous.data.serp ?? [])
		: { drops: [], gains: [] };

	const { drops: pageDrops, gains: pageGains } = previous?.data.gsc
		? diffPageTraffic(currentGsc.by_page, previous.data.gsc.by_page)
		: { drops: [], gains: [] };

	const opportunities = findOpportunities(currentGsc.by_query);

	const cwvWorst = [...currentCwv]
		.filter((r) => !isGood(r.cwv) && (r.cwv.lcp_ms !== null || r.cwv.cls !== null))
		.sort((a, b) => (b.cwv.lcp_ms ?? 0) - (a.cwv.lcp_ms ?? 0))
		.slice(0, 10);

	const actions = buildActions(rankDrops, pageDrops, opportunities, cwvWorst);

	const previousActions: ActionItem[] = previous?.data.analysis?.actions ?? [];
	const previousCwvPages: PsiResult[] = previous?.data.cwv?.pages ?? [];
	const verifications = previousActions.length > 0
		? verifyActions(
				previousActions,
				currentGsc,
				previous?.data.gsc ?? null,
				currentCwv,
				previousCwvPages,
		  )
		: [];

	const analysis: AnalysisSection = {
		previous_date: previous?.date ?? null,
		totals_diff: totalsDiff,
		rank_drops: rankDrops,
		rank_gains: rankGains,
		page_traffic_drops: pageDrops,
		page_traffic_gains: pageGains,
		content_opportunities: opportunities,
		cwv_worst: cwvWorst,
		actions,
		last_week_verifications: verifications,
	};

	const merged = { ...current, analysis };
	writeFileSync(reportPath, JSON.stringify(merged, null, 2));
	console.log(`✅ Analysis → ${reportPath}`);
	console.log(`   rank drops: ${rankDrops.length} · gains: ${rankGains.length}`);
	console.log(`   page drops: ${pageDrops.length} · gains: ${pageGains.length}`);
	console.log(`   opportunities: ${opportunities.length} · actions: ${actions.length}`);
	if (verifications.length > 0) {
		const improved = verifications.filter((v) => v.status === 'improved').length;
		const worsened = verifications.filter((v) => v.status === 'worsened').length;
		const unchanged = verifications.filter((v) => v.status === 'unchanged').length;
		const notMeasurable = verifications.filter((v) => v.status === 'not_measurable').length;
		console.log(`   last-week verify: ${improved} improved, ${worsened} worsened, ${unchanged} unchanged, ${notMeasurable} not measurable`);
	}
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ analyze failed:', err);
		process.exit(1);
	});
}
