#!/usr/bin/env bun
/**
 * geo-topic-picker — V2 GEO Content Factory L1 选题层
 *
 * 读最新 ai-visibility/{date}.md（或指定路径）→ 抽 N 个 GEO 内容 topic →
 * 写周计划 markdown 到 omni-report/geo-content-factory/{date}-week-plan.md。
 *
 * 选题来源：§"🔴 JR 完全空白的 Query" 表里 content-able 的行
 *   ✅ 写 / 发布 / 创建 类（"写 1 篇 MCP 入门中文教程"）
 *   ❌ 提交 / 入驻 / 检查 / 评估 类（"提交 GSC URL Inspection"——SEO 不是 GEO 内容）
 *
 * 用法：
 *   bun run scripts/geo-topic-picker.ts                              # 用最新 ai-visibility
 *   bun run scripts/geo-topic-picker.ts ai-visibility/2026-05-04.md  # 指定一份
 *   bun run scripts/geo-topic-picker.ts --limit 3                    # 控制数量（默认 5）
 *   bun run scripts/geo-topic-picker.ts --dry                        # 只 stdout 不落盘
 *
 * 下游：geo-card-master-create.ts 读这份周计划 → 写 N 张 master 卡到
 *       marketing-tasks/active/geo-{date}-{slug}-master.md
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const AI_VIS_DIR = path.join(ROOT, 'ai-visibility');
const PLAN_DIR = path.join(ROOT, 'geo-content-factory');
const ACTIVE_TASKS_DIR = path.join(ROOT, 'marketing-tasks', 'active');

const DEFAULT_LIMIT = 5;

interface BlankTopic {
	queryId: string; // "Q12"
	queryText: string; // "MCP 是什么 怎么学"
	citedPlatforms: string[]; // Web Search Top 3 被推荐的平台
	otherLlmPlatforms: string[]; // LLM 自答推荐的"其他平台"列
	directReason: string; // "无 MCP 专题内容页"
	suggestedAction: string; // "写"MCP 入门中文教程"并内链至 AI Engineer 课程"
	contentAble: boolean; // true = 该 topic 是写文章能解决的，false = SEO/平台运营
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	const reportPath = await pickReport(args.input);
	if (!reportPath) {
		console.error('No ai-visibility report found.');
		process.exit(1);
	}

	const reportName = path.basename(reportPath, '.md');
	const reportRel = path.relative(ROOT, reportPath);
	console.log(`Reading: ${reportRel}`);

	const raw = await fs.readFile(reportPath, 'utf-8');
	const blanks = parseBlankTopicsTable(raw);
	const detail = parseQueryDetailTables(raw);

	for (const b of blanks) {
		const d = detail[b.queryId];
		if (d) b.otherLlmPlatforms = d.otherLlmPlatforms;
	}

	const claimed = await listExistingMasterQueries();
	const candidates = blanks.filter(b => b.contentAble && !claimed.has(b.queryId));

	console.log(
		`Blank queries: ${blanks.length} → content-able: ${blanks.filter(b => b.contentAble).length} → not-yet-claimed: ${candidates.length}`
	);

	const picked = candidates.slice(0, args.limit);
	if (picked.length === 0) {
		console.warn('No new GEO topic available — every content-able blank query already has a master card.');
		process.exit(0);
	}

	const planMd = renderWeekPlan(picked, reportRel, reportName);

	if (args.dry) {
		console.log('\n--- DRY RUN ---\n');
		console.log(planMd);
		return;
	}

	const planPath = path.join(PLAN_DIR, `${reportName}-week-plan.md`);
	await fs.mkdir(PLAN_DIR, { recursive: true });
	await fs.writeFile(planPath, planMd, 'utf-8');
	console.log(`✓ Wrote ${path.relative(ROOT, planPath)} (${picked.length} topics)`);
	console.log(
		`\nNext: bun run scripts/geo-card-master-create.ts ${path.relative(ROOT, planPath)}`
	);
}

function parseArgs(argv: string[]): { input?: string; limit: number; dry: boolean } {
	let input: string | undefined;
	let limit = DEFAULT_LIMIT;
	let dry = false;
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--limit') {
			limit = parseInt(argv[++i], 10) || DEFAULT_LIMIT;
		} else if (a === '--dry') {
			dry = true;
		} else if (!a.startsWith('--')) {
			input = a;
		}
	}
	return { input, limit, dry };
}

async function pickReport(input?: string): Promise<string | null> {
	if (input) {
		const abs = path.isAbsolute(input) ? input : path.resolve(ROOT, input);
		await fs.access(abs).catch(() => {
			console.error(`File not found: ${abs}`);
			process.exit(1);
		});
		return abs;
	}
	let entries: string[];
	try {
		entries = await fs.readdir(AI_VIS_DIR);
	} catch {
		return null;
	}
	const mds = entries.filter(e => /^\d{4}-\d{2}-\d{2}\.md$/.test(e));
	if (mds.length === 0) return null;
	mds.sort().reverse();
	return path.join(AI_VIS_DIR, mds[0]);
}

/**
 * 解析 §"🔴 JR 完全空白的 Query" 表。
 * 表头：| Query | Top 3 被推荐的平台 | JR 未被提的直接原因 | 建议行动 |
 * 数据行：| Q12 中文 query | platforms... | reason | action |
 */
function parseBlankTopicsTable(md: string): BlankTopic[] {
	const lines = md.split('\n');
	const out: BlankTopic[] = [];
	let inSection = false;
	for (const line of lines) {
		if (/^##\s+.*JR\s*完全空白的\s*Query/.test(line)) {
			inSection = true;
			continue;
		}
		if (inSection && /^##\s+/.test(line)) break;
		if (!inSection) continue;

		const cells = line.split('|').slice(1, -1).map(c => c.trim());
		if (cells.length < 4) continue;
		const queryCell = cells[0];
		const m = queryCell.match(/^Q(\d+)\s+(.+)$/);
		if (!m) continue;

		const queryId = `Q${m[1]}`;
		const queryText = m[2].trim();
		const citedPlatforms = splitPlatformList(cells[1]);
		const directReason = cells[2];
		const suggestedAction = cells[3];

		out.push({
			queryId,
			queryText,
			citedPlatforms,
			otherLlmPlatforms: [],
			directReason,
			suggestedAction,
			contentAble: classifyContentAble(suggestedAction)
		});
	}
	return out;
}

/**
 * 解析 §A/B/C/D 4 个 query 详情 table → 抓「LLM 其他推荐平台」列（cells[6]）。
 * 表头 7 列：# | Query | Web Search JR 排名 | Web Search Top 3 | LLM 是否提及 JR | LLM 提及上下文 | LLM 其他推荐平台
 */
function parseQueryDetailTables(md: string): Record<string, { otherLlmPlatforms: string[] }> {
	const lines = md.split('\n');
	const out: Record<string, { otherLlmPlatforms: string[] }> = {};
	let inDetail = false;
	for (const line of lines) {
		if (/^##\s+[A-D]\.\s/.test(line)) {
			inDetail = true;
			continue;
		}
		if (inDetail && /^##\s+/.test(line) && !/^##\s+[A-D]\.\s/.test(line)) {
			inDetail = false;
		}
		if (!inDetail) continue;

		const cells = line.split('|').slice(1, -1).map(c => c.trim());
		if (cells.length < 7) continue;
		if (!/^\d+$/.test(cells[0])) continue;
		const qid = `Q${cells[0]}`;
		out[qid] = { otherLlmPlatforms: splitPlatformList(cells[6]) };
	}
	return out;
}

/**
 * 拆分平台列表。中文报告用 `、`、英文报告用 ` / ` 或 `,`。
 * 注意 `/` 不带空格时是平台名一部分（如 GitHub/repo-name），不能拆。
 */
function splitPlatformList(s: string): string[] {
	return s
		.replace(/\*\*/g, '')
		.split(/、|，|,|\s+\/\s+|\s+\+\s+/)
		.map(t => t.trim())
		.filter(t => t.length > 0 && t !== '—' && t !== '-');
}

/**
 * 判断"建议行动"是不是写文章/发文能解决的。
 * 写/发布/创建 → ✅；提交/入驻/检查/评估/审视/邮件 → ❌（SEO 或平台运营，非 GEO 内容）
 */
function classifyContentAble(action: string): boolean {
	const off = ['提交', '入驻', '检查', '评估', '审视', '联系', '邮件'];
	if (off.some(p => action.startsWith(p) || action.startsWith(`立即${p}`))) return false;
	if (/^(写|发布|创建)/.test(action)) return true;
	return /(长文|教程|路线图|手册|合集|指南|文章|实战)/.test(action);
}

async function listExistingMasterQueries(): Promise<Set<string>> {
	const set = new Set<string>();
	let entries: string[];
	try {
		entries = await fs.readdir(ACTIVE_TASKS_DIR);
	} catch {
		return set;
	}
	for (const f of entries) {
		if (!/^geo-.*-master\.md$/.test(f)) continue;
		try {
			const raw = await fs.readFile(path.join(ACTIVE_TASKS_DIR, f), 'utf-8');
			const m = raw.match(/aiVisibilityQuery:\s*(Q\d+)/);
			if (m) set.add(m[1]);
		} catch {}
	}
	return set;
}

function renderWeekPlan(topics: BlankTopic[], reportRel: string, reportName: string): string {
	const out: string[] = [];
	out.push(`# GEO Content Factory Week Plan — ${reportName}`);
	out.push('');
	out.push(`> Source: \`${reportRel}\``);
	out.push(`> Generated: ${new Date().toISOString()}`);
	out.push(`> Topics: ${topics.length}`);
	out.push('');
	out.push(
		`下一步：\`bun run scripts/geo-card-master-create.ts geo-content-factory/${reportName}-week-plan.md\` 把每个 topic 转成 master 卡。`
	);
	out.push('');
	out.push('---');
	out.push('');

	topics.forEach((t, i) => {
		out.push(`## M${i + 1}: [${t.queryId}] ${t.queryText}`);
		out.push('');
		out.push(`- **JR 现状**: 完全空白（Web 0 / LLM 0）`);
		out.push(`- **AI 当前引用平台 (Web Top 3)**: ${t.citedPlatforms.join(' / ') || '—'}`);
		if (t.otherLlmPlatforms.length > 0) {
			out.push(`- **LLM 自答推荐其他平台**: ${t.otherLlmPlatforms.join(' / ')}`);
		}
		out.push(`- **未提及直接原因**: ${t.directReason}`);
		out.push(`- **报告建议行动**: ${t.suggestedAction}`);
		out.push('');
		out.push('**variantsPlanned**（master DONE 触发 fan-out 时建 N 张 variant 卡）：');
		out.push('');
		out.push('- jr-blog');
		out.push('- zhihu-column');
		out.push('- csdn');
		out.push('- juejin');
		out.push('- medium-en');
		out.push('- devto-en');
		out.push('');
	});

	return out.join('\n');
}

main().catch(err => {
	console.error('Failed:', err);
	process.exit(1);
});
