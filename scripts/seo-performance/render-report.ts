#!/usr/bin/env bun
/**
 * Phase 5: 把 {date}.json 渲染成 markdown 周报。
 *
 * 输出：seo-performance/{date}.md
 *
 * 历史折线（最近 12 周）用 mermaid xychart-beta，GitHub 原生渲染。
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { todayAEST } from './lib/aest.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_DIR = join(REPO_ROOT, 'seo-performance');

function fmt(n: number, digits = 0): string {
	if (!isFinite(n)) return '—';
	return n.toLocaleString('en-AU', { maximumFractionDigits: digits });
}

function pctStr(n: number, digits = 1): string {
	if (!isFinite(n)) return '—';
	const sign = n > 0 ? '+' : '';
	return `${sign}${n.toFixed(digits)}%`;
}

function deltaIcon(delta: number, betterIsHigher = true): string {
	if (delta === 0) return '→';
	const isBetter = betterIsHigher ? delta > 0 : delta < 0;
	return isBetter ? '✅' : '🔴';
}

function rankStr(rank: number | null): string {
	return rank === null ? '100+' : String(rank);
}

function loadHistory(currentDate: string, weeks = 12): Array<{ date: string; data: any }> {
	const files = readdirSync(REPORT_DIR)
		.filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
		.map((f) => f.replace('.json', ''))
		.filter((d) => d <= currentDate)
		.sort();
	const tail = files.slice(-weeks);
	return tail.map((d) => ({ date: d, data: JSON.parse(readFileSync(join(REPORT_DIR, `${d}.json`), 'utf8')) }));
}

function renderMermaidLine(title: string, yLabel: string, history: Array<{ date: string; value: number }>): string {
	if (history.length < 2) return '';
	const dates = history.map((h) => `"${h.date.slice(5)}"`); // MM-DD
	const values = history.map((h) => h.value.toFixed(1));
	const max = Math.max(...history.map((h) => h.value));
	const min = Math.min(...history.map((h) => h.value));
	const padding = (max - min) * 0.1;
	return [
		'```mermaid',
		'xychart-beta',
		`  title "${title}"`,
		`  x-axis [${dates.join(', ')}]`,
		`  y-axis "${yLabel}" ${(min - padding).toFixed(0)} --> ${(max + padding).toFixed(0)}`,
		`  line [${values.join(', ')}]`,
		'```',
	].join('\n');
}

function renderTrendCharts(history: Array<{ date: string; data: any }>): string {
	const valid = history.filter((h) => h.data.gsc?.totals);
	if (valid.length < 2) return '_历史数据不足，本周开始累积。_\n';

	const clicks = valid.map((h) => ({ date: h.date, value: h.data.gsc.totals.clicks }));
	const impressions = valid.map((h) => ({ date: h.date, value: h.data.gsc.totals.impressions }));
	const positions = valid.map((h) => ({ date: h.date, value: h.data.gsc.totals.position }));
	const top10 = valid.map((h) => ({
		date: h.date,
		value: h.data.gsc.by_query.filter((q: any) => q.position <= 10 && q.impressions > 0).length,
	}));

	return [
		`### 📈 GSC Clicks (last ${valid.length} weeks)`,
		'',
		renderMermaidLine('Weekly GSC Clicks', 'Clicks', clicks),
		'',
		`### 📈 GSC Impressions`,
		'',
		renderMermaidLine('Weekly GSC Impressions', 'Impressions', impressions),
		'',
		`### 📈 Average Position (lower is better)`,
		'',
		renderMermaidLine('Avg Position', 'Position', positions),
		'',
		`### 📈 Top 10 Keywords Count`,
		'',
		renderMermaidLine('Top 10 Keywords', 'Count', top10),
		'',
	].join('\n');
}

function render(report: any): string {
	const { date, gsc, serp = [], cwv, analysis } = report;
	if (!gsc || !analysis) {
		throw new Error('Report missing gsc or analysis section. Run fetch-gsc + analyze first.');
	}

	const history = loadHistory(date);
	const previousDate = analysis.previous_date;

	const lines: string[] = [];
	lines.push(`# SEO 表现周报 ${date}`);
	lines.push('');
	lines.push(`> GSC 数据范围：${gsc.date_range.start} ~ ${gsc.date_range.end}`);
	lines.push(`> SERP 抓取时间：${date} (AEST)`);
	if (previousDate) lines.push(`> 上周对比基准：${previousDate}`);
	lines.push(`> 总扫描关键词：${serp.length}（${new Set(serp.map((s: any) => s.keyword)).size} keywords × ${new Set(serp.map((s: any) => s.location_label)).size} locations）`);
	lines.push('');

	// 1. 总览仪表盘
	lines.push('## 📊 总览仪表盘');
	lines.push('');
	const td = analysis.totals_diff;
	lines.push('| 指标 | 本周 | 上周 | 周环比 |');
	lines.push('|------|------|------|--------|');
	lines.push(`| GSC 总曝光 | ${fmt(td.impressions.current)} | ${fmt(td.impressions.previous)} | ${pctStr(td.impressions.delta_pct)} ${deltaIcon(td.impressions.delta)} |`);
	lines.push(`| GSC 总点击 | ${fmt(td.clicks.current)} | ${fmt(td.clicks.previous)} | ${pctStr(td.clicks.delta_pct)} ${deltaIcon(td.clicks.delta)} |`);
	lines.push(`| 平均 CTR | ${(td.ctr.current * 100).toFixed(2)}% | ${(td.ctr.previous * 100).toFixed(2)}% | ${td.ctr.delta_pp > 0 ? '+' : ''}${td.ctr.delta_pp.toFixed(2)}pp ${deltaIcon(td.ctr.delta_pp)} |`);
	lines.push(`| 平均位置 | ${td.position.current.toFixed(1)} | ${td.position.previous.toFixed(1)} | ${td.position.delta > 0 ? '+' : ''}${td.position.delta.toFixed(1)} ${deltaIcon(td.position.delta, false)} |`);
	lines.push(`| Top 10 关键词数 | ${td.top_10_count.current} | ${td.top_10_count.previous} | ${td.top_10_count.delta > 0 ? '+' : ''}${td.top_10_count.delta} ${deltaIcon(td.top_10_count.delta)} |`);
	if (cwv) {
		lines.push(`| CWV 良好率 (top ${cwv.page_count} 页) | ${(cwv.good_rate * 100).toFixed(1)}% | — | — |`);
	}
	lines.push('');

	// 2. 排名跌幅
	lines.push('## 🔴 排名跌幅 TOP 10（本周重点）');
	lines.push('');
	if (analysis.rank_drops.length === 0) {
		lines.push('_本周无明显跌幅 ✅_');
	} else {
		lines.push('| 关键词 | location | 上周 | 本周 | 变化 | 着陆页 |');
		lines.push('|--------|---------|------|------|------|--------|');
		for (const r of analysis.rank_drops) {
			lines.push(`| ${r.keyword} | ${r.location} | ${rankStr(r.previous)} | ${rankStr(r.current)} | ${r.delta > 0 ? '+' : ''}${r.delta} | ${r.url ?? '—'} |`);
		}
	}
	lines.push('');

	// 3. 排名涨幅
	lines.push('## 🟢 排名涨幅 TOP 10');
	lines.push('');
	if (analysis.rank_gains.length === 0) {
		lines.push('_本周无明显涨幅_');
	} else {
		lines.push('| 关键词 | location | 上周 | 本周 | 变化 | 着陆页 |');
		lines.push('|--------|---------|------|------|------|--------|');
		for (const r of analysis.rank_gains) {
			lines.push(`| ${r.keyword} | ${r.location} | ${rankStr(r.previous)} | ${rankStr(r.current)} | ${r.delta} | ${r.url ?? '—'} |`);
		}
	}
	lines.push('');

	// 4. 内容机会
	lines.push('## 💎 内容机会（高曝光低 CTR — 改 title/meta 立刻见效）');
	lines.push('');
	if (analysis.content_opportunities.length === 0) {
		lines.push('_无明显机会_');
	} else {
		lines.push('| 关键词 | 曝光 | 点击 | CTR | 平均位置 | 建议 |');
		lines.push('|--------|------|------|-----|---------|------|');
		for (const o of analysis.content_opportunities) {
			lines.push(`| ${o.query} | ${fmt(o.impressions)} | ${fmt(o.clicks)} | ${(o.ctr * 100).toFixed(2)}% | ${o.position.toFixed(1)} | ${o.reason} |`);
		}
	}
	lines.push('');

	// 5. 流量增长
	lines.push('## 📈 流量增长 TOP 5 页面');
	lines.push('');
	if (analysis.page_traffic_gains.length === 0) {
		lines.push('_无明显增长_');
	} else {
		lines.push('| 页面 | 本周点击 | 上周点击 | 变化 |');
		lines.push('|------|---------|---------|------|');
		for (const p of analysis.page_traffic_gains) {
			lines.push(`| ${p.page} | ${fmt(p.current_clicks)} | ${fmt(p.previous_clicks)} | +${fmt(p.delta_clicks)} (${pctStr(p.delta_pct)}) 🚀 |`);
		}
	}
	lines.push('');

	// 6. 流量下跌
	lines.push('## 📉 流量下跌 TOP 5 页面（重点排查）');
	lines.push('');
	if (analysis.page_traffic_drops.length === 0) {
		lines.push('_无明显下跌_');
	} else {
		lines.push('| 页面 | 本周点击 | 上周点击 | 变化 | 排查方向 |');
		lines.push('|------|---------|---------|------|----------|');
		for (const p of analysis.page_traffic_drops) {
			lines.push(`| ${p.page} | ${fmt(p.current_clicks)} | ${fmt(p.previous_clicks)} | ${fmt(p.delta_clicks)} (${pctStr(p.delta_pct)}) | 是否最近改过 / 是否 404 / 是否被竞品超越 |`);
		}
	}
	lines.push('');

	// 7. CWV
	if (cwv) {
		lines.push('## ⚡ Core Web Vitals 差页面 TOP 10');
		lines.push('');
		if (analysis.cwv_worst.length === 0) {
			lines.push('_全部 top 流量页面 CWV 良好 ✅_');
		} else {
			lines.push('| 页面 | LCP | INP | CLS | 数据源 |');
			lines.push('|------|-----|-----|-----|--------|');
			for (const c of analysis.cwv_worst) {
				const lcp = c.cwv.lcp_ms !== null ? `${(c.cwv.lcp_ms / 1000).toFixed(2)}s${c.cwv.lcp_ms > 2500 ? ' 🔴' : ''}` : '—';
				const inp = c.cwv.inp_ms !== null ? `${c.cwv.inp_ms.toFixed(0)}ms${c.cwv.inp_ms > 200 ? ' 🔴' : ''}` : '—';
				const cls = c.cwv.cls !== null ? `${c.cwv.cls.toFixed(2)}${c.cwv.cls > 0.1 ? ' 🔴' : ''}` : '—';
				lines.push(`| ${c.url} | ${lcp} | ${inp} | ${cls} | ${c.cwv.source} |`);
			}
		}
		lines.push('');
	}

	// 8. 行动清单
	lines.push('## 🎯 推荐行动清单（按 ROI 排序）');
	lines.push('');
	if (analysis.actions.length === 0) {
		lines.push('_本周无紧急行动项_');
	} else {
		lines.push('| # | 行动 | 目标 | 预估工作量 | 预估 ROI |');
		lines.push('|---|------|------|-----------|---------|');
		analysis.actions.forEach((a: any, i: number) => {
			lines.push(`| ${i + 1} | ${a.action} | ${a.target} | ${a.effort} | ${a.roi_estimate} |`);
		});
	}
	lines.push('');

	// 9. 历史趋势
	lines.push('## 📈 历史趋势');
	lines.push('');
	lines.push(renderTrendCharts(history));
	lines.push('');

	// 10. 上周行动 verify
	lines.push('## 📋 上周行动项 verify');
	lines.push('');
	const verifications = analysis.last_week_verifications ?? [];
	if (verifications.length === 0) {
		lines.push('_无上周行动项可验证（首周或上周 actions 为空）。_');
	} else {
		const STATUS_ICON: Record<string, string> = {
			improved: '✅ 已改善',
			worsened: '🔴 反而变差',
			unchanged: '🟡 没动',
			not_measurable: '⏳ 数据不足',
		};
		lines.push('| 上周行动 | 目标 | 状态 | 数据变化 | 备注 |');
		lines.push('|---------|------|------|---------|------|');
		for (const v of verifications) {
			const a = v.original_action;
			lines.push(`| ${a.action} | ${a.target} | ${STATUS_ICON[v.status] ?? v.status} | ${v.delta_str} | ${v.note} |`);
		}
		const improved = verifications.filter((v: any) => v.status === 'improved').length;
		const worsened = verifications.filter((v: any) => v.status === 'worsened').length;
		lines.push('');
		lines.push(`**修复 ROI**: ${improved} 改善 / ${worsened} 变差 / ${verifications.length - improved - worsened} 待观察`);
	}
	lines.push('');

	// 附录
	lines.push('---');
	lines.push('');
	lines.push('## 附录：数据完整性');
	lines.push('');
	lines.push(`- GSC 拉取：${gsc.row_counts.query} queries · ${gsc.row_counts.page} pages`);
	lines.push(`- SERP 抓取：${serp.length} 条记录（${serp.filter((s: any) => s.rank_absolute !== null).length} 命中 top 100，${serp.filter((s: any) => s.error).length} 错误）`);
	if (cwv) {
		lines.push(`- CWV 抓取：${cwv.page_count} 页 · ${cwv.good_count} 良好 · ${cwv.pages.filter((p: any) => p.error).length} 错误`);
	}
	lines.push('');
	lines.push(`完整结构化数据见同名 \`${date}.json\`。`);
	lines.push('');

	return lines.join('\n');
}

async function main() {
	const date = process.argv[2] || todayAEST();
	const reportPath = join(REPORT_DIR, `${date}.json`);
	const mdPath = join(REPORT_DIR, `${date}.md`);
	if (!existsSync(reportPath)) {
		throw new Error(`No data file at ${reportPath}`);
	}
	const data = JSON.parse(readFileSync(reportPath, 'utf8'));
	const md = render(data);
	writeFileSync(mdPath, md);
	console.log(`✅ Report → ${mdPath} (${md.length} chars)`);
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ render-report failed:', err);
		process.exit(1);
	});
}
