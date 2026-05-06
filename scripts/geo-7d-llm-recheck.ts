#!/usr/bin/env bun
/**
 * geo-7d-llm-recheck — V2 GEO Content Factory L6 验证闭环（Phase 1）
 *
 * 给一张 master 卡 → 输出一份 LLM recheck prompt（落盘到 recheck-prompts/）。
 * 操作员把 prompt 贴到 claude.ai/code/routines 跑，跑完手工把结果填回
 * master 卡 ## 验证记录 表的「7d 后」/「30d 后」对应行。
 *
 * 为什么 Phase 1 不直接调 LLM API：跟 ai-visibility 周报保持同一个执行通道
 * （remote routine 而不是本地 SDK），免得 API key 散落本地 script。
 *
 * Phase 2：admin UI 加按钮一键触发 cloud routine + 自动写回。
 *
 * 用法：
 *   bun run scripts/geo-7d-llm-recheck.ts marketing-tasks/active/geo-{date}-{q}-master.md
 *   bun run scripts/geo-7d-llm-recheck.ts marketing-tasks/active/geo-*-master.md   # 批量
 *   bun run scripts/geo-7d-llm-recheck.ts --window 30 path/to/master.md            # 30 天窗口
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const PROMPT_DIR = path.join(ROOT, 'geo-content-factory', 'recheck-prompts');

interface MasterMeta {
	filePath: string;
	queryId: string;
	queryText: string;
	aiVisibilityReport: string;
	citedPlatforms: string[];
	createdAt: string;
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	if (args.inputs.length === 0) {
		console.error('Usage: geo-7d-llm-recheck.ts <master.md>...');
		process.exit(1);
	}

	await fs.mkdir(PROMPT_DIR, { recursive: true });

	let written = 0;
	for (const input of args.inputs) {
		const meta = await loadMaster(input);
		if (!meta) {
			console.warn(`⊘ Skip ${input}: missing required frontmatter`);
			continue;
		}
		const promptPath = await writePrompt(meta, args.window);
		console.log(`✓ ${path.basename(meta.filePath)} → ${path.relative(ROOT, promptPath)}`);
		written++;
	}

	console.log(`\nDone: ${written} prompt(s) written. 下一步：粘贴到 claude.ai/code/routines 跑，结果手工填回 master 卡 ## 验证记录。`);
}

function parseArgs(argv: string[]): { inputs: string[]; window: number } {
	const inputs: string[] = [];
	let window = 7;
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--window') {
			window = parseInt(argv[++i], 10) || 7;
		} else if (!a.startsWith('--')) {
			inputs.push(a);
		}
	}
	return { inputs, window };
}

async function loadMaster(filePath: string): Promise<MasterMeta | null> {
	const abs = path.isAbsolute(filePath) ? filePath : path.resolve(ROOT, filePath);
	const raw = await fs.readFile(abs, 'utf-8').catch(() => null);
	if (!raw) {
		console.error(`Not found: ${abs}`);
		return null;
	}

	const fm = parseFrontmatter(raw);
	const queryId = matchScalar(fm, /aiVisibilityQuery:\s*(\S+)/);
	const aiVisibilityReport = matchScalar(fm, /aiVisibilityReport:\s*(\S+)/);
	const createdAt = matchScalar(fm, /createdAt:\s*(\S+)/);

	if (!queryId) return null;

	// 从描述段抽 query 原文 — master 卡 ## 描述 里有 `query：Q12 "MCP 是什么 怎么学"`
	const queryText = extractQueryText(raw) || queryId;
	const citedPlatforms = extractCitedPlatforms(fm);

	return {
		filePath: abs,
		queryId,
		queryText,
		aiVisibilityReport: aiVisibilityReport || '',
		citedPlatforms,
		createdAt: createdAt || new Date().toISOString()
	};
}

function parseFrontmatter(raw: string): string {
	if (!raw.startsWith('---')) return '';
	const end = raw.indexOf('\n---', 3);
	if (end < 0) return '';
	return raw.slice(0, end);
}

function matchScalar(fm: string, re: RegExp): string {
	const m = fm.match(re);
	return m ? m[1].replace(/^["']|["']$/g, '') : '';
}

function extractQueryText(raw: string): string {
	// 1) ## 描述 段：query：Q12 "MCP 是什么 怎么学"
	const m1 = raw.match(/query[：:]\s*Q\d+\s+["「]?(.+?)["」]?$/m);
	if (m1) return m1[1].trim();
	// 2) frontmatter title: [Q12 master] xxx
	const m2 = raw.match(/^title:\s*["']?\[(?:Q\d+)\s+master\]\s*(.+?)["']?\s*$/m);
	if (m2) return m2[1].trim();
	return '';
}

function extractCitedPlatforms(fm: string): string[] {
	const idx = fm.indexOf('aiCitedPlatforms:');
	if (idx < 0) return [];
	const lines = fm.slice(idx).split('\n').slice(1);
	const out: string[] = [];
	for (const line of lines) {
		const m = line.match(/^\s*-\s+(.+)$/);
		if (!m) break;
		out.push(m[1].replace(/^["']|["']$/g, '').trim());
	}
	return out;
}

async function writePrompt(meta: MasterMeta, window: number): Promise<string> {
	const today = new Date().toISOString().slice(0, 10);
	const promptName = `${today}-${meta.queryId.toLowerCase()}-${window}d.md`;
	const promptPath = path.join(PROMPT_DIR, promptName);
	const masterRel = path.relative(ROOT, meta.filePath);

	const md = renderPrompt(meta, window, today, masterRel);
	await fs.writeFile(promptPath, md, 'utf-8');
	return promptPath;
}

function renderPrompt(meta: MasterMeta, window: number, today: string, masterRel: string): string {
	return `# GEO ${window}d LLM Recheck — ${meta.queryId} "${meta.queryText}"

> 立即执行，禁止跳过任何 step；跑完前禁止写总结；用 Step N 编号 echo 每一步。

**目标**：检查在 GEO 内容发布 ${window} 天后，主流 LLM 自答这个 query 时是否提到 JR Academy。

---

## 输入数据

- **Query**：\`${meta.queryText}\`
- **基线（${meta.aiVisibilityReport || '原始 ai-visibility 周报'}）**：${meta.queryId} 在 LLM 自答中 ❌ 未提及，Web SERP ❌ 未出现
- **基线 AI 引用平台**：${meta.citedPlatforms.join(' / ') || '（未记录）'}
- **Master 卡路径**：\`${masterRel}\`

---

## Step 1 — 跑 LLM 自答（必跑，不跳过）

把下面这句**原文**直接发给 Claude (claude-opus-4-7) 和 Gemini 各一次，**不要加任何前缀引导**：

> ${meta.queryText}

每个 LLM 各跑 1 次，**完整回答**全部记录。

## Step 2 — 关键词检测

在每份回答里**精确匹配**以下任一标记：
- \`JR Academy\`
- \`匠人学院\`
- \`jiangren.com.au\`（任意子路径都算命中）

每个 LLM 输出：
- ✅ 提及（贴出包含关键词的那句话）
- ❌ 未提及

## Step 3 — Web SERP 排名（可选，需要 SerpAPI）

跑该 query 的 Google Web 搜索，看 jiangren.com.au 在前 10 是否出现，记录最高排名。
没有 SerpAPI 凭据时这步跳过，明确写「未跑」。

## Step 4 — 写回 master 卡 ## 验证记录

打开 \`${masterRel}\`，在 \`## 验证记录\` 段的表里填**这一行**（不要新增其他行）：

\`\`\`
| ${window}d 后 (${today}) | <Claude: ✅/❌  Gemini: ✅/❌> | <SERP 排名 或 未跑> | <最值得记录的 1 句话> |
\`\`\`

**写回完成 git diff 验证再 commit**：

\`\`\`bash
git -C /path/to/repo add ${masterRel}
git -C /path/to/repo commit -m "verify(geo): ${window}d recheck for ${meta.queryId}"
\`\`\`

## Step 5 — 报告总结

最后输出 1 段不超过 5 行的总结：
- ${meta.queryId} ${window}d 后是否被 LLM 提及（命中率 N/2）
- Web SERP 排名变化
- 跟基线相比是否改善
- 下一步建议（如「30d 再 recheck」/「需要补内链」/「该 query 已稳定提及，移到长期监控」）

---

> 跑完 Step 1-5 完整 5 步前**禁止写任何总结性语言**（per JR routine 防静默挂规则）。
`;
}

main().catch(err => {
	console.error('Failed:', err);
	process.exit(1);
});
