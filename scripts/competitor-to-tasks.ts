#!/usr/bin/env bun
/**
 * Competitor Weekly Routine → Marketing Tasks 集成
 *
 * 读 competitor-reports/{date}.md 最新一份周报的 §6. 对 JR Academy 的建议，
 * numbered list 每条 → 1 个 .md 任务到 marketing-tasks/active/
 *
 * 用法：
 *   bun run scripts/competitor-to-tasks.ts
 *   bun run scripts/competitor-to-tasks.ts competitor-reports/2026-05-03.md
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dir, '..');
const REPORTS_DIR = path.join(ROOT, 'competitor-reports');
const TASKS_DIR = path.join(ROOT, 'marketing-tasks', 'active');

interface Suggestion {
	num: number;
	title: string; // bold 部分
	body: string;  // 完整正文
}

async function main() {
	const reportPath = await pickReportFile();
	if (!reportPath) {
		console.error('No competitor-reports report found.');
		process.exit(1);
	}

	const reportName = path.basename(reportPath, '.md');
	const reportRel = path.relative(ROOT, reportPath);
	console.log(`Reading: ${reportRel}`);

	const raw = await fs.readFile(reportPath, 'utf-8');
	const items = parseSuggestions(raw);

	if (items.length === 0) {
		console.warn('No suggestions found in §对 JR Academy 的建议');
		process.exit(0);
	}

	console.log(`Parsed ${items.length} suggestions.`);

	let written = 0;
	let skipped = 0;

	for (const item of items) {
		const filename = deriveFilename(reportName, item);
		const targetPath = path.join(TASKS_DIR, filename);

		try {
			await fs.access(targetPath);
			console.log(`  ⊘ Skip ${filename} (already exists)`);
			skipped++;
			continue;
		} catch {}

		const md = renderTaskMd(item, reportName, reportRel);
		await fs.mkdir(path.dirname(targetPath), { recursive: true });
		await fs.writeFile(targetPath, md, 'utf-8');
		console.log(`  ✓ Wrote ${filename}`);
		written++;
	}

	console.log(`\nDone: written=${written}, skipped=${skipped}, total=${items.length}`);
}

async function pickReportFile(): Promise<string | null> {
	const arg = process.argv[2];
	if (arg) {
		const abs = path.isAbsolute(arg) ? arg : path.resolve(ROOT, arg);
		try {
			await fs.access(abs);
			return abs;
		} catch {
			console.error(`File not found: ${abs}`);
			process.exit(1);
		}
	}
	let entries: string[];
	try {
		entries = await fs.readdir(REPORTS_DIR);
	} catch {
		return null;
	}
	const mdFiles = entries.filter(e => /^\d{4}-\d{2}-\d{2}\.md$/.test(e));
	if (mdFiles.length === 0) return null;
	mdFiles.sort().reverse();
	return path.join(REPORTS_DIR, mdFiles[0]);
}

/**
 * 解析 ## 6. 对 JR Academy 的建议 下的 numbered list
 * 数字行：1. **xxx**：正文...
 * 续行：直到下一个 numbered item 或下一个 H2
 */
function parseSuggestions(markdown: string): Suggestion[] {
	const items: Suggestion[] = [];
	const lines = markdown.split('\n');

	let inSection = false;
	let current: { num: number; lines: string[] } | null = null;

	const flush = () => {
		if (current) {
			const body = current.lines.join('\n').trim();
			const titleMatch = body.match(/^\*\*(.+?)\*\*/);
			const title = titleMatch ? titleMatch[1].trim() : body.split(/[，。：;\n]/)[0].slice(0, 80);
			items.push({ num: current.num, title, body });
			current = null;
		}
	};

	for (const line of lines) {
		if (line.match(/^##\s+.*对\s*JR\s*Academy\s*的建议/i)) {
			inSection = true;
			continue;
		}
		if (inSection && line.match(/^##\s+/)) {
			flush();
			break;
		}
		if (!inSection) continue;

		const m = line.match(/^(\d+)\.\s+(.+)$/);
		if (m) {
			flush();
			current = { num: parseInt(m[1], 10), lines: [m[2]] };
		} else if (current && line.trim().length > 0) {
			current.lines.push(line);
		}
	}
	flush();

	return items;
}

function deriveFilename(reportDate: string, item: Suggestion): string {
	const slug = item.title
		.replace(/[`*\[\]()<>"]/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^\w\-一-鿿]/g, '')
		.toLowerCase()
		.slice(0, 40)
		.replace(/-+$/, '');
	return `competitor-${reportDate}-${String(item.num).padStart(2, '0')}-${slug || 'action'}.md`;
}

function renderTaskMd(item: Suggestion, reportDate: string, reportRel: string): string {
	const reportItemHash = crypto
		.createHash('sha1')
		.update(`competitor::${reportDate}::${item.num}::${item.title.slice(0, 60)}`)
		.digest('hex')
		.slice(0, 12);

	// 优先级：第 1 条 P0，第 2 条 P1，其余 P2
	const priority = item.num === 1 ? 'p0' : item.num === 2 ? 'p1' : 'p2';

	// Module 推断
	const text = item.body.toLowerCase();
	let module = 'ad-hoc-task';
	if (text.includes('bootcamp') && (text.includes('章节') || text.includes('lesson') || text.includes('workshop'))) {
		module = 'bootcamp-content-update';
	} else if (text.includes('linkedin')) {
		module = 'linkedin-post';
	} else if (text.includes('报名页') || text.includes('落地页') || text.includes('landing')) {
		module = 'landing-page-update';
	} else if (text.includes('小红书') || text.includes('xhs')) {
		module = 'xhs-post';
	} else if (text.includes('公众号') || text.includes('长文')) {
		module = 'weixin-longform';
	} else if (text.includes('知乎')) {
		module = 'geo-zhihu-column';
	} else if (text.includes('csdn')) {
		module = 'geo-csdn';
	} else if (text.includes('博客') || text.includes('blog') || text.includes('文章') || text.includes('教程')) {
		module = 'geo-auto-publish';
	} else if (text.includes('合作') || text.includes('联名') || text.includes('partnership')) {
		module = 'partnership-negotiate';
	}

	const title = item.title.slice(0, 100).trim();
	const now = new Date().toISOString();

	const frontmatter = [
		'---',
		`id: ${'0'.repeat(24)}`,
		`title: ${escapeYamlString(title)}`,
		`category: competitor-response`,
		`module: ${module}`,
		`source: routine-competitor`,
		`sourceMeta:`,
		`  reportPath: ${escapeYamlString(reportRel)}`,
		`  reportSection: 对 JR Academy 的建议 #${item.num}`,
		`  reportItemHash: ${reportItemHash}`,
		`assignee: hello@jiangren.com.au`,
		`reviewer: null`,
		`status: draft`,
		`priority: ${priority}`,
		`platforms: []`,
		`wordCount: null`,
		`estimatedHours: null`,
		`actualHours: null`,
		`dueDate: null`,
		`tags:`,
		`  - imported-from-routine`,
		`  - competitor-weekly`,
		`createdBy: hello@jiangren.com.au`,
		`createdAt: ${now}`,
		`updatedAt: ${now}`,
		`derivedFrom: null`,
		'---',
		''
	].join('\n');

	const body = [
		'## 描述',
		'',
		item.body,
		'',
		'## Checklist',
		'',
		'- [ ] 确认任务范围 + 分配 owner',
		'- [ ] 执行核心动作',
		'- [ ] 验证完成（截图 / URL）',
		'- [ ] 4 周后回看竞品周报，确认对应行动产出',
		'',
		'## 草稿',
		'',
		'（暂无）',
		'',
		'## 发布记录',
		'',
		'（暂无）',
		'',
		'## Comments',
		'',
		`- @system ${now}`,
		`  > 由 \`omni-report/scripts/competitor-to-tasks.ts\` 自动从 competitor 周报第 ${item.num} 条建议生成。`,
		''
	].join('\n');

	return frontmatter + body;
}

function escapeYamlString(s: string): string {
	if (/[:#\n'"@`*&|<>%]/.test(s)) {
		return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
	}
	return s;
}

main().catch(err => {
	console.error('Failed:', err);
	process.exit(1);
});
