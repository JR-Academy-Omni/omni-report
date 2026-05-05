/**
 * 纯逻辑函数的单元测试，不需要 credential。
 * 跑：`bun test scripts/seo-performance/analyze.test.ts`
 */

import { describe, expect, test } from 'bun:test';
import { diffSerp, diffPageTraffic, findOpportunities, buildActions, verifyActions } from './analyze.ts';
import { detectRegressions, wrapForFormat } from './alert.ts';

describe('diffSerp', () => {
	test('detects rank drop (排名变差)', () => {
		const previous = [
			{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: 5, url: 'https://a/p1', checked_at: '' },
		];
		const current = [
			{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: 12, url: 'https://a/p1', checked_at: '' },
		];
		const { drops, gains } = diffSerp(current, previous);
		expect(drops).toHaveLength(1);
		expect(drops[0].delta).toBe(7); // 5 → 12 = +7 (worse)
		expect(gains).toHaveLength(0);
	});

	test('detects rank gain (排名变好)', () => {
		const previous = [{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: 18, url: null, checked_at: '' }];
		const current = [{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: 7, url: null, checked_at: '' }];
		const { drops, gains } = diffSerp(current, previous);
		expect(gains).toHaveLength(1);
		expect(gains[0].delta).toBe(-11);
		expect(drops).toHaveLength(0);
	});

	test('falling out of top 100 = 101', () => {
		const previous = [{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: 50, url: null, checked_at: '' }];
		const current = [{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: null, url: null, checked_at: '' }];
		const { drops } = diffSerp(current, previous);
		expect(drops[0].delta).toBe(51); // 50 → 101
		expect(drops[0].current).toBeNull();
	});

	test('skips when both null', () => {
		const previous = [{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: null, url: null, checked_at: '' }];
		const current = [{ keyword: 'k1', category: 'brand', location_label: 'AU-EN', rank_absolute: null, url: null, checked_at: '' }];
		const { drops, gains } = diffSerp(current, previous);
		expect(drops).toHaveLength(0);
		expect(gains).toHaveLength(0);
	});
});

describe('diffPageTraffic', () => {
	test('flags significant drop', () => {
		const previous = [{ page: '/a', clicks: 200, impressions: 1000, ctr: 0.2, position: 5 }];
		const current = [{ page: '/a', clicks: 50, impressions: 800, ctr: 0.06, position: 5 }];
		const { drops } = diffPageTraffic(current, previous);
		expect(drops).toHaveLength(1);
		expect(drops[0].delta_clicks).toBe(-150);
		expect(drops[0].delta_pct).toBeCloseTo(-75, 0);
	});

	test('ignores noise (both < 5 clicks)', () => {
		const previous = [{ page: '/a', clicks: 2, impressions: 50, ctr: 0.04, position: 30 }];
		const current = [{ page: '/a', clicks: 4, impressions: 80, ctr: 0.05, position: 25 }];
		const { drops, gains } = diffPageTraffic(current, previous);
		expect(drops).toHaveLength(0);
		expect(gains).toHaveLength(0);
	});
});

describe('findOpportunities', () => {
	test('flags high-impression low-CTR queries in top 20', () => {
		const queries = [
			{ query: 'good', clicks: 100, impressions: 1000, ctr: 0.1, position: 5 },          // CTR 10% — 不算机会
			{ query: 'opp', clicks: 5, impressions: 1500, ctr: 0.0033, position: 8 },           // 高曝光低 CTR top 20
			{ query: 'tail', clicks: 0, impressions: 200, ctr: 0, position: 50 },                // 曝光 < 500，过滤
			{ query: 'bad-position', clicks: 0, impressions: 5000, ctr: 0, position: 80 },      // position > 20，过滤
		];
		const opps = findOpportunities(queries);
		expect(opps).toHaveLength(1);
		expect(opps[0].query).toBe('opp');
	});
});

describe('buildActions', () => {
	test('produces ROI-sorted actions with action_type set', () => {
		const opps = [
			{ query: 'q1', impressions: 1000, clicks: 4, ctr: 0.004, position: 8, reason: '' },
		];
		const drops = [{ keyword: 'k1', location: 'AU-EN', previous: 5, current: 20, delta: 15, url: '/page' }];
		const pageDrops = [{ page: '/p', current_clicks: 10, previous_clicks: 100, delta_clicks: -90, delta_pct: -90 }];
		const cwv = [{
			url: '/slow',
			strategy: 'mobile' as const,
			fetched_at: '',
			mobile_friendly: true,
			cwv: { lcp_ms: 5000, inp_ms: 100, cls: 0.05, fcp_ms: 2000, ttfb_ms: 500, performance_score: 30, source: 'field' as const },
		}];
		const actions = buildActions(drops, pageDrops, opps, cwv);
		// Each kind should produce a typed action
		expect(actions.find((a) => a.action_type === 'ctr_opportunity')).toBeDefined();
		expect(actions.find((a) => a.action_type === 'page_drop_investigation')).toBeDefined();
		expect(actions.find((a) => a.action_type === 'rank_drop_investigation')).toBeDefined();
		expect(actions.find((a) => a.action_type === 'cwv_optimization')).toBeDefined();
		// First should be priority 1 (CTR opp)
		expect(actions[0].priority).toBe(1);
	});
});

describe('verifyActions', () => {
	test('CTR action improves when CTR went up significantly', () => {
		const previousActions = [
			{ priority: 1, action_type: 'ctr_opportunity' as const, action: 'fix q1 title', target: 'q1', roi_estimate: '', effort: '' },
		];
		const currentGsc = {
			by_query: [{ query: 'q1', clicks: 50, impressions: 1000, ctr: 0.05, position: 8 }],
			by_page: [],
		};
		const previousGsc = {
			by_query: [{ query: 'q1', clicks: 4, impressions: 1000, ctr: 0.004, position: 8 }],
			by_page: [],
		};
		const verifications = verifyActions(previousActions, currentGsc, previousGsc, [], []);
		expect(verifications).toHaveLength(1);
		expect(verifications[0].status).toBe('improved');
		expect(verifications[0].metric_then).toBeCloseTo(0.004);
		expect(verifications[0].metric_now).toBeCloseTo(0.05);
	});

	test('CWV action improves when LCP dropped > 200ms', () => {
		const previousActions = [
			{ priority: 4, action_type: 'cwv_optimization' as const, action: 'fix LCP', target: 'https://a/slow', roi_estimate: '', effort: '' },
		];
		const previousCwv = [{
			url: 'https://a/slow',
			strategy: 'mobile' as const,
			fetched_at: '',
			mobile_friendly: true,
			cwv: { lcp_ms: 5000, inp_ms: 200, cls: 0.05, fcp_ms: 2000, ttfb_ms: 500, performance_score: 30, source: 'field' as const },
		}];
		const currentCwv = [{
			...previousCwv[0],
			cwv: { ...previousCwv[0].cwv, lcp_ms: 3000 },
		}];
		const verifications = verifyActions(
			previousActions,
			{ by_query: [], by_page: [] },
			{ by_query: [], by_page: [] },
			currentCwv,
			previousCwv,
		);
		expect(verifications[0].status).toBe('improved');
	});

	test('not_measurable when target missing from current data', () => {
		const previousActions = [
			{ priority: 1, action_type: 'ctr_opportunity' as const, action: 'fix qZ title', target: 'qZ', roi_estimate: '', effort: '' },
		];
		const verifications = verifyActions(
			previousActions,
			{ by_query: [], by_page: [] },
			{ by_query: [{ query: 'qZ', clicks: 0, impressions: 100, ctr: 0, position: 10 }], by_page: [] },
			[],
			[],
		);
		expect(verifications[0].status).toBe('not_measurable');
		expect(verifications[0].note).toContain('query 不在本周数据中');
	});

	test('not_measurable when no previousGsc', () => {
		const previousActions = [
			{ priority: 1, action_type: 'ctr_opportunity' as const, action: '', target: 'q1', roi_estimate: '', effort: '' },
		];
		const verifications = verifyActions(
			previousActions,
			{ by_query: [], by_page: [] },
			null,
			[],
			[],
		);
		expect(verifications[0].status).toBe('not_measurable');
		expect(verifications[0].note).toContain('上周数据缺失');
	});
});

describe('detectRegressions', () => {
	const baseAnalysis = {
		totals_diff: {
			clicks: { current: 0, previous: 0, delta: 0, delta_pct: 0 },
			impressions: { current: 0, previous: 0, delta: 0, delta_pct: 0 },
			ctr: { current: 0, previous: 0, delta_pp: 0 },
			position: { current: 0, previous: 0, delta: 0 },
			top_10_count: { current: 0, previous: 0, delta: 0 },
		},
		page_traffic_drops: [],
		rank_drops: [],
		last_week_verifications: [],
	};

	test('flags 20% click drop as critical', () => {
		const a = { ...baseAnalysis, totals_diff: { ...baseAnalysis.totals_diff, clicks: { current: 800, previous: 1000, delta: -200, delta_pct: -20 } } };
		const r = detectRegressions(a);
		expect(r.length).toBe(1);
		expect(r[0].severity).toBe('critical');
		expect(r[0].category).toBe('流量');
	});

	test('ignores 10% click drop (below threshold)', () => {
		const a = { ...baseAnalysis, totals_diff: { ...baseAnalysis.totals_diff, clicks: { current: 900, previous: 1000, delta: -100, delta_pct: -10 } } };
		expect(detectRegressions(a)).toHaveLength(0);
	});

	test('flags worsened verification as critical (highest priority)', () => {
		const a = {
			...baseAnalysis,
			last_week_verifications: [{
				original_action: { action: 'fix X title', target: 'X', priority: 1, action_type: 'ctr_opportunity', roi_estimate: '', effort: '' },
				status: 'worsened',
				delta_str: 'CTR 2% → 0.5% (-1.5pp)',
				metric_then: 0.02, metric_now: 0.005, note: '',
			}],
		};
		const r = detectRegressions(a);
		expect(r.find((x) => x.category === '修复反向')?.severity).toBe('critical');
	});

	test('ignores improved verification', () => {
		const a = {
			...baseAnalysis,
			last_week_verifications: [{
				original_action: { action: '', target: '', priority: 1, action_type: 'ctr_opportunity', roi_estimate: '', effort: '' },
				status: 'improved',
				delta_str: '+5pp',
				metric_then: 0.01, metric_now: 0.06, note: '',
			}],
		};
		expect(detectRegressions(a)).toHaveLength(0);
	});

	test('flags single page traffic drop > 50%', () => {
		const a = {
			...baseAnalysis,
			page_traffic_drops: [{ page: '/dead', current_clicks: 10, previous_clicks: 100, delta_clicks: -90, delta_pct: -90 }],
		};
		const r = detectRegressions(a);
		expect(r[0].severity).toBe('critical');
		expect(r[0].message).toContain('/dead');
	});
});

describe('wrapForFormat', () => {
	test('dingtalk envelope', () => {
		const w = wrapForFormat('dingtalk', 'T', '# md') as any;
		expect(w.msgtype).toBe('markdown');
		expect(w.markdown.title).toBe('T');
		expect(w.markdown.text).toBe('# md');
	});

	test('wechat envelope', () => {
		const w = wrapForFormat('wechat', 'T', '# md') as any;
		expect(w.msgtype).toBe('markdown');
		expect(w.markdown.content).toBe('# md');
	});

	test('slack envelope', () => {
		const w = wrapForFormat('slack', 'T', '# md') as any;
		expect(w.text).toBe('T');
		expect(w.blocks[0].text.text).toBe('# md');
	});

	test('plain default', () => {
		const w = wrapForFormat('plain', 'T', '# md') as any;
		expect(w.title).toBe('T');
		expect(w.markdown).toBe('# md');
	});
});
