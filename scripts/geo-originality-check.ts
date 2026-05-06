#!/usr/bin/env bun
/**
 * geo-originality-check — V2 GEO Content Factory L3.originality 层
 *
 * 给一个 master draft 目录（含 variants/*.md），pair-wise 跑 character-shingle
 * Jaccard 相似度。任两 variant ≥ 70% 时报错（多平台同文 = SEO 自杀红线）。
 *
 * 阈值（V2 PRD §6）：
 *   - < 0.50 ：✓ 真正差异化
 *   - 0.50-0.69 ：⚠ borderline，建议改写关键段
 *   - ≥ 0.70 ：✗ 拒收，必须重写
 *
 * 用法：
 *   bun run scripts/geo-originality-check.ts geo-content-factory/drafts/q12-mcp
 *   bun run scripts/geo-originality-check.ts geo-content-factory/drafts/q12-mcp --threshold 0.65
 *   bun run scripts/geo-originality-check.ts variants/jr-blog.md variants/csdn.md
 *
 * Exit code：≥1 张 pair 失败则 exit 1（CI 可拒入）
 *
 * Phase 1：char-shingle Jaccard。Phase 2 加 simhash 64-bit + LLM judge 复检。
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const SHINGLE_K = 5;
const DEFAULT_THRESHOLD_FAIL = 0.7;
const DEFAULT_THRESHOLD_WARN = 0.5;

interface VariantFile {
	platform: string; // 平台 slug，从文件名 derive
	relPath: string; // 相对显示路径
	text: string; // 去 YAML frontmatter 后的正文
}

interface PairResult {
	a: string;
	b: string;
	similarity: number;
	verdict: 'pass' | 'warn' | 'fail';
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	const variants = await collectVariants(args.inputs);

	if (variants.length < 2) {
		console.warn(`Need ≥ 2 variants to compare; got ${variants.length}.`);
		process.exit(0);
	}

	console.log(`🔍 Originality check (${variants.length} files, threshold fail=${args.thresholdFail}, warn=${args.thresholdWarn})\n`);

	const shingleCache = new Map<string, Set<string>>();
	for (const v of variants) {
		shingleCache.set(v.platform, shingles(v.text, SHINGLE_K));
	}

	const results: PairResult[] = [];
	for (let i = 0; i < variants.length; i++) {
		for (let j = i + 1; j < variants.length; j++) {
			const a = variants[i];
			const b = variants[j];
			const sim = jaccard(shingleCache.get(a.platform)!, shingleCache.get(b.platform)!);
			const verdict =
				sim >= args.thresholdFail ? 'fail' : sim >= args.thresholdWarn ? 'warn' : 'pass';
			results.push({ a: a.platform, b: b.platform, similarity: sim, verdict });
		}
	}

	const padLen =
		Math.max(...variants.map(v => v.platform.length)) * 2 + 5; // for "a vs b" alignment

	for (const r of results) {
		const icon = r.verdict === 'fail' ? '✗' : r.verdict === 'warn' ? '⚠' : '✓';
		const label = `${r.a} vs ${r.b}`.padEnd(padLen);
		const note =
			r.verdict === 'fail'
				? ` ⚠️ ≥ ${args.thresholdFail} 拒收`
				: r.verdict === 'warn'
					? ` (borderline)`
					: '';
		console.log(`  ${icon} ${label} similarity ${r.similarity.toFixed(3)}${note}`);
	}

	const passes = results.filter(r => r.verdict === 'pass').length;
	const warns = results.filter(r => r.verdict === 'warn').length;
	const fails = results.filter(r => r.verdict === 'fail').length;
	console.log(`\nResult: ${passes} pass / ${warns} warn / ${fails} fail (${results.length} pairs total)`);

	if (fails > 0) {
		console.error(`\n❌ ${fails} pair(s) ≥ ${args.thresholdFail} similarity — variants 必须改写到差异 ≥ 30%。`);
		console.error(`   建议：重写标题钩子 + 开头 50 字 + 内链 anchor + 长度（V2 PRD §6 4 维度差异化策略）。`);
		process.exit(1);
	}
	if (warns > 0) {
		console.warn(`\n⚠ ${warns} pair(s) borderline (${args.thresholdWarn}-${args.thresholdFail})；建议改写关键段。`);
	}
}

function parseArgs(argv: string[]): {
	inputs: string[];
	thresholdFail: number;
	thresholdWarn: number;
} {
	const inputs: string[] = [];
	let thresholdFail = DEFAULT_THRESHOLD_FAIL;
	let thresholdWarn = DEFAULT_THRESHOLD_WARN;
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--threshold' || a === '--threshold-fail') {
			thresholdFail = parseFloat(argv[++i]) || DEFAULT_THRESHOLD_FAIL;
		} else if (a === '--threshold-warn') {
			thresholdWarn = parseFloat(argv[++i]) || DEFAULT_THRESHOLD_WARN;
		} else if (!a.startsWith('--')) {
			inputs.push(a);
		}
	}
	if (inputs.length === 0) {
		console.error('Usage: geo-originality-check.ts <dir | files...>');
		process.exit(1);
	}
	return { inputs, thresholdFail, thresholdWarn };
}

async function collectVariants(inputs: string[]): Promise<VariantFile[]> {
	const out: VariantFile[] = [];
	for (const input of inputs) {
		const stat = await fs.stat(input).catch(() => null);
		if (!stat) {
			console.error(`Not found: ${input}`);
			process.exit(1);
		}
		if (stat.isDirectory()) {
			// 目录模式：找 variants/*.md
			const variantsDir = path.join(input, 'variants');
			const variantsExists = await fs
				.stat(variantsDir)
				.then(() => true)
				.catch(() => false);
			const dir = variantsExists ? variantsDir : input;
			const entries = await fs.readdir(dir);
			for (const f of entries) {
				if (!f.endsWith('.md')) continue;
				if (f === 'master.md') continue;
				const fp = path.join(dir, f);
				out.push(await loadVariant(fp));
			}
		} else {
			out.push(await loadVariant(input));
		}
	}
	return out;
}

async function loadVariant(filePath: string): Promise<VariantFile> {
	const raw = await fs.readFile(filePath, 'utf-8');
	const text = stripFrontmatter(raw);
	const platform = path.basename(filePath, '.md');
	return { platform, relPath: filePath, text };
}

function stripFrontmatter(raw: string): string {
	if (!raw.startsWith('---')) return raw;
	const end = raw.indexOf('\n---', 3);
	if (end < 0) return raw;
	return raw.slice(end + 4);
}

/**
 * Character-level k-shingle 集合。
 * - 中英文混排都直接按 char 切，因为中文每个汉字都是有效信息单元。
 * - 把空白归一化（防一篇排版多空格扰动相似度）。
 */
function shingles(text: string, k: number): Set<string> {
	const cleaned = text.toLowerCase().replace(/\s+/g, ' ').trim();
	const out = new Set<string>();
	if (cleaned.length < k) return out;
	for (let i = 0; i + k <= cleaned.length; i++) {
		out.add(cleaned.slice(i, i + k));
	}
	return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
	if (a.size === 0 || b.size === 0) return 0;
	let intersection = 0;
	for (const s of a) if (b.has(s)) intersection++;
	const union = a.size + b.size - intersection;
	return union === 0 ? 0 : intersection / union;
}

main().catch(err => {
	console.error('Failed:', err);
	process.exit(1);
});
