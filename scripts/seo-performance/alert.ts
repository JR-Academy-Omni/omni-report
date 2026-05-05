#!/usr/bin/env bun
/**
 * Phase 6: 重大回归告警推送（钉钉 / 企业微信 / Slack / 通用 webhook）。
 *
 * 触发条件（默认值，可通过 env 调整）：
 *   - 总点击周环比跌 > 15%                 (SEO_ALERT_CLICKS_DROP_PCT)
 *   - 平均位置变差 > 2 位                  (SEO_ALERT_POSITION_WORSE)
 *   - Top 10 关键词数减少 ≥ 3              (SEO_ALERT_TOP10_DROP)
 *   - 任何单页流量跌 > 50%                 (SEO_ALERT_PAGE_DROP_PCT)
 *   - 任何关键词排名跌 ≥ 10 位             (SEO_ALERT_RANK_DROP)
 *   - last-week verify 里 worsened > 0     (永远告警，意味着上周修了反而变差)
 *
 * Env:
 *   SEO_ALERT_WEBHOOK     — 必需。钉钉/企业微信/Slack/任何接受 POST JSON 的 URL
 *   SEO_ALERT_FORMAT      — 可选。dingtalk / wechat / slack / plain (default plain)
 *   SEO_ALERT_REPORT_BASE_URL — 可选。报告 GitHub URL 前缀，用于在告警里附 deep link
 *                             默认 https://github.com/JR-Academy-AI/omni-report/blob/main/seo-performance
 *
 * 没配 SEO_ALERT_WEBHOOK 就跳过（不算失败），让 routine 在 alerting 没 setup 时也能跑。
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { todayAEST } from './lib/aest.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORT_DIR = join(REPO_ROOT, 'seo-performance');

const DEFAULT_THRESHOLDS = {
	clicksDropPct: parseFloat(process.env.SEO_ALERT_CLICKS_DROP_PCT || '15'),
	positionWorse: parseFloat(process.env.SEO_ALERT_POSITION_WORSE || '2'),
	top10Drop: parseInt(process.env.SEO_ALERT_TOP10_DROP || '3', 10),
	pageDropPct: parseFloat(process.env.SEO_ALERT_PAGE_DROP_PCT || '50'),
	rankDrop: parseInt(process.env.SEO_ALERT_RANK_DROP || '10', 10),
};

const REPORT_BASE = process.env.SEO_ALERT_REPORT_BASE_URL
	|| 'https://github.com/JR-Academy-AI/omni-report/blob/main/seo-performance';

interface Regression {
	severity: 'critical' | 'warning';
	category: string;
	message: string;
}

function detectRegressions(analysis: any, thresholds = DEFAULT_THRESHOLDS): Regression[] {
	const regressions: Regression[] = [];
	const td = analysis.totals_diff;

	// 1. 总点击大跌
	if (td.clicks.previous > 0 && td.clicks.delta_pct < -thresholds.clicksDropPct) {
		regressions.push({
			severity: 'critical',
			category: '流量',
			message: `总点击 ${td.clicks.previous} → ${td.clicks.current} (${td.clicks.delta_pct.toFixed(1)}%)`,
		});
	}

	// 2. 平均位置变差
	if (td.position.previous > 0 && td.position.delta > thresholds.positionWorse) {
		regressions.push({
			severity: 'warning',
			category: '排名',
			message: `平均位置 ${td.position.previous.toFixed(1)} → ${td.position.current.toFixed(1)} (+${td.position.delta.toFixed(1)})`,
		});
	}

	// 3. Top 10 关键词数减少
	if (td.top_10_count.delta <= -thresholds.top10Drop) {
		regressions.push({
			severity: 'warning',
			category: '关键词',
			message: `Top 10 关键词数 ${td.top_10_count.previous} → ${td.top_10_count.current} (${td.top_10_count.delta})`,
		});
	}

	// 4. 单页面大跌
	for (const drop of analysis.page_traffic_drops || []) {
		if (drop.delta_pct < -thresholds.pageDropPct) {
			regressions.push({
				severity: 'critical',
				category: '页面流量',
				message: `${drop.page} 跌 ${drop.delta_pct.toFixed(0)}% (${drop.previous_clicks} → ${drop.current_clicks})`,
			});
		}
	}

	// 5. 关键词排名大跌
	for (const drop of analysis.rank_drops || []) {
		if (drop.delta >= thresholds.rankDrop) {
			regressions.push({
				severity: 'warning',
				category: '关键词排名',
				message: `"${drop.keyword}" (${drop.location}) ${drop.previous ?? '—'} → ${drop.current ?? '100+'} (+${drop.delta})`,
			});
		}
	}

	// 6. 上周修了反而变差（最严重，永远 critical）
	for (const v of analysis.last_week_verifications || []) {
		if (v.status === 'worsened') {
			regressions.push({
				severity: 'critical',
				category: '修复反向',
				message: `${v.original_action.action} → ${v.delta_str}（上周修了反而更差，立即 rollback）`,
			});
		}
	}

	return regressions;
}

function buildMarkdown(date: string, regressions: Regression[]): string {
	const lines: string[] = [];
	lines.push(`# ⚠️ SEO 周报告警 ${date}`);
	lines.push('');
	const critical = regressions.filter((r) => r.severity === 'critical');
	const warning = regressions.filter((r) => r.severity === 'warning');
	lines.push(`**${critical.length} critical** · **${warning.length} warning**`);
	lines.push('');

	if (critical.length > 0) {
		lines.push('## 🚨 Critical（必须立即处理）');
		for (const r of critical) {
			lines.push(`- **[${r.category}]** ${r.message}`);
		}
		lines.push('');
	}

	if (warning.length > 0) {
		lines.push('## 🟡 Warning（本周关注）');
		for (const r of warning) {
			lines.push(`- **[${r.category}]** ${r.message}`);
		}
		lines.push('');
	}

	lines.push(`📊 完整报告：${REPORT_BASE}/${date}.md`);
	return lines.join('\n');
}

function wrapForFormat(format: string, title: string, markdown: string): unknown {
	switch (format) {
		case 'dingtalk':
			return { msgtype: 'markdown', markdown: { title, text: markdown } };
		case 'wechat':
			// 企业微信 webhook
			return { msgtype: 'markdown', markdown: { content: markdown } };
		case 'slack':
			return { text: title, blocks: [{ type: 'section', text: { type: 'mrkdwn', text: markdown } }] };
		case 'plain':
		default:
			return { title, markdown };
	}
}

async function postToWebhook(url: string, payload: unknown): Promise<void> {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Webhook POST failed: ${res.status} ${text.slice(0, 300)}`);
	}
}

async function main() {
	const date = process.argv[2] || todayAEST();
	const reportPath = join(REPORT_DIR, `${date}.json`);
	if (!existsSync(reportPath)) {
		console.error(`⚠️ No report file at ${reportPath} — run analyze.ts first`);
		process.exit(1);
	}

	const data = JSON.parse(readFileSync(reportPath, 'utf8'));
	if (!data.analysis) {
		console.error('⚠️ No analysis section — run analyze.ts first');
		process.exit(1);
	}

	const regressions = detectRegressions(data.analysis);

	if (regressions.length === 0) {
		console.log(`✅ No regressions worth alerting for ${date}`);
		return;
	}

	const webhook = process.env.SEO_ALERT_WEBHOOK;
	const format = process.env.SEO_ALERT_FORMAT || 'plain';

	const markdown = buildMarkdown(date, regressions);
	const title = `SEO 周报告警 ${date} — ${regressions.filter((r) => r.severity === 'critical').length} critical`;

	if (!webhook) {
		// 没配 webhook 不算失败 — 打印 markdown 让人能 copy
		console.log(`⚠️ ${regressions.length} regressions detected but SEO_ALERT_WEBHOOK not set.`);
		console.log('\n' + markdown);
		return;
	}

	const payload = wrapForFormat(format, title, markdown);
	await postToWebhook(webhook, payload);
	console.log(`✅ Alert posted to ${format} webhook · ${regressions.length} regressions`);
	console.log(markdown);
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ alert failed:', err);
		process.exit(1);
	});
}

// 给 test 用
export { detectRegressions, buildMarkdown, wrapForFormat };
