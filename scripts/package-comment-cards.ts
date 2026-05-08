#!/usr/bin/env -S npx tsx
/**
 * package-comment-cards.ts
 *
 * 把 marketing-tasks/active/comment-*.md 里**所有** comment outreach 卡
 * 打包成一份 copy-paste batch：
 *   marketing-tasks/_packages/{YYYY-MM-DD}-comment-batch.md
 *
 * 每张卡输出：标题 / target URL / 账号 / 评论文本 / 发布前 checklist /
 * 发布后回填 yaml 模板。
 *
 * 运营拿这一份 markdown 一条条发即可，不用挨个开 admin。
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ACTIVE_DIR = path.join(ROOT, 'marketing-tasks', 'active');
const OUT_DIR = path.join(ROOT, 'marketing-tasks', '_packages');

interface Card {
	file: string;
	title: string;
	platform: string;
	targetUrl: string;
	targetTitle: string;
	targetAuthor: string;
	assignee: string;
	searchHook: string;
	expectedSurvivalRate: number;
	priority: string;
	description: string;
	draft: string;
	scoreBlock: string;
}

function parseCard(filePath: string): Card | null {
	const raw = fs.readFileSync(filePath, 'utf-8');
	const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!fmMatch) return null;
	const fm = fmMatch[1];
	const body = fmMatch[2];

	const get = (key: string) => {
		const m = fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?$`, 'm'));
		return m ? m[1].trim() : '';
	};
	const getNested = (key: string) => {
		const m = fm.match(new RegExp(`^\\s+${key}:\\s*"?(.*?)"?$`, 'm'));
		return m ? m[1].trim() : '';
	};

	const sourceFromFm = get('source');
	if (sourceFromFm !== 'routine-comment-outreach') return null;

	// 切 body 拿到 描述 / 草稿 / 自检评分 三段
	const descMatch = body.match(/^## 描述\n+([\s\S]*?)(?=\n## )/m);
	const draftMatch = body.match(/^## 草稿\n+([\s\S]*?)(?=\n## )/m);
	const scoreMatch = body.match(/^## 自检评分\n+([\s\S]*?)(?=\n## )/m);

	return {
		file: path.basename(filePath),
		title: get('title'),
		platform: getNested('platform'),
		targetUrl: getNested('targetUrl'),
		targetTitle: getNested('targetTitle'),
		targetAuthor: getNested('targetAuthor'),
		assignee: get('assignee'),
		searchHook: getNested('searchHook'),
		expectedSurvivalRate: parseFloat(getNested('expectedSurvivalRate') || '0'),
		priority: get('priority'),
		description: (descMatch?.[1] || '').trim(),
		draft: (draftMatch?.[1] || '').trim(),
		scoreBlock: (scoreMatch?.[1] || '').trim(),
	};
}

function main() {
	const files = fs.readdirSync(ACTIVE_DIR)
		.filter(f => f.startsWith('comment-') && f.endsWith('.md'))
		.sort();

	const cards: Card[] = [];
	for (const f of files) {
		const c = parseCard(path.join(ACTIVE_DIR, f));
		if (c) cards.push(c);
	}

	if (cards.length === 0) {
		console.error('No comment cards found. Aborting.');
		process.exit(1);
	}

	// 按平台分桶
	const byPlatform: Record<string, Card[]> = {};
	for (const c of cards) {
		const p = c.platform || 'unknown';
		(byPlatform[p] ||= []).push(c);
	}

	const today = new Date().toISOString().slice(0, 10);
	const outPath = path.join(OUT_DIR, `${today}-comment-batch.md`);

	const lines: string[] = [];
	lines.push(`# Comment Outreach 批量发布清单 — ${today}`);
	lines.push('');
	lines.push(`**总 ${cards.length} 张评论卡**，按平台分桶：`);
	for (const [p, list] of Object.entries(byPlatform)) {
		lines.push(`- **${p}**: ${list.length} 张`);
	}
	lines.push('');
	lines.push('## 使用方法');
	lines.push('');
	lines.push('1. 按平台一桶一桶发，不要跨平台跳来跳去（同一 tag 下 1 周 JR 提及 ≤ 5 次）');
	lines.push('2. 每条发布前：通读原贴 + Top 3 评论，确认评论文本不和已有评论撞');
	lines.push('3. 发布后**当天**回到原 task 卡（`omni-report/marketing-tasks/active/<file>`）填 `publishedUrl` + `publishedAt`');
	lines.push('4. 24h 后回 admin 看 `survivedAt`（评论还在 = survived），7 天后填 metrics');
	lines.push('5. 红线：HN（lightman 自己发，不要代）/ Reddit（先看子版规则）/ V2EX（高被删风险）');
	lines.push('');
	lines.push('---');
	lines.push('');

	let idx = 0;
	for (const [platform, list] of Object.entries(byPlatform)) {
		lines.push(`# 📍 ${platform.toUpperCase()} — ${list.length} 张`);
		lines.push('');
		for (const c of list) {
			idx += 1;
			lines.push(`## ${idx}. ${c.title}`);
			lines.push('');
			lines.push(`- **目标**: [${c.targetTitle || c.targetUrl}](${c.targetUrl})`);
			if (c.targetAuthor) lines.push(`- **作者**: ${c.targetAuthor}`);
			lines.push(`- **账号 / 负责人**: ${c.assignee || 'TBD'}`);
			lines.push(`- **优先级**: ${c.priority}`);
			lines.push(`- **存活率预估**: ${(c.expectedSurvivalRate * 100).toFixed(0)}%`);
			if (c.searchHook) lines.push(`- **搜索 hook**: \`${c.searchHook}\``);
			lines.push(`- **Card 文件**: \`marketing-tasks/active/${c.file}\``);
			lines.push('');
			lines.push('### 评论文本（直接复制）');
			lines.push('');
			// draft 用 > 引出，剥离掉省掉。直接给评论正文（不含 "第1段共鸣" 那些注释）
			const cleanedDraft = c.draft
				.split('\n')
				.filter(l => !l.startsWith('> 第') && l.trim() !== '')
				.join('\n')
				.replace(/^> /gm, '')
				.trim();
			lines.push('```');
			lines.push(cleanedDraft);
			lines.push('```');
			lines.push('');
			lines.push('### 发布前自检（30 秒）');
			lines.push('');
			lines.push('- [ ] 通读原贴全文 + Top 3 评论（评论不和已有评论撞）');
			lines.push(`- [ ] 本周 \`${platform}\` 上 JR Academy 提及次数 ≤ 5 次`);
			lines.push(`- [ ] 搜索 \`${c.searchHook || 'JR Academy'}\` 验证 landing page 仍在`);
			lines.push('');
			lines.push('### 发布后 24h 回填模板');
			lines.push('');
			lines.push('在卡片 `## 发布记录` section 加：');
			lines.push('');
			lines.push('```yaml');
			lines.push('publications:');
			lines.push(`  - platform: ${platform}`);
			lines.push('    url: <粘贴评论永久链接>');
			lines.push(`    publishedAt: <ISO8601, 如 ${new Date().toISOString()}>`);
			lines.push('    survivedAt: null');
			lines.push('    surviveCheckAt: null');
			lines.push('    metrics:');
			lines.push('      upvotes: 0');
			lines.push('      replies: 0');
			lines.push('```');
			lines.push('');
			lines.push('---');
			lines.push('');
		}
	}

	if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
	fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
	console.log(`✓ Wrote ${cards.length} cards across ${Object.keys(byPlatform).length} platforms to:`);
	console.log(`  ${path.relative(ROOT, outPath)}`);
}

main();
