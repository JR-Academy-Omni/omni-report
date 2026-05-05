#!/usr/bin/env bun
/**
 * SEO Performance — 主入口（5 phase 串联）。
 *
 * 本地手跑：
 *   bun run scripts/seo-performance/run.ts                  # 用今天 AEST 日期
 *   bun run scripts/seo-performance/run.ts 2026-04-30       # 指定日期
 *   bun run scripts/seo-performance/run.ts --skip=cwv,serp  # 跳过部分 phase
 *
 * Routine 跑（参考 PRD 5.3 防 stream idle timeout）：建议各 phase 单独 spawn 子进程
 *   并在每 phase 完成后 git push（routine prompt 里写）。本脚本是 all-in-one fallback。
 */

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { todayAEST } from './lib/aest.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface PhaseSpec {
	id: string;
	name: string;
	script: string;
	args: string[];
}

function buildPhases(date: string): PhaseSpec[] {
	return [
		{ id: 'gsc', name: 'Phase 1: Fetch GSC', script: 'fetch-gsc.ts', args: [date] },
		{ id: 'serp-A', name: 'Phase 2A: Brand keywords SERP', script: 'fetch-serp.ts', args: [date, '--batch=A'] },
		{ id: 'serp-B', name: 'Phase 2B: Core courses SERP', script: 'fetch-serp.ts', args: [date, '--batch=B'] },
		{ id: 'serp-C', name: 'Phase 2C: Long tail content SERP', script: 'fetch-serp.ts', args: [date, '--batch=C'] },
		{ id: 'serp-D', name: 'Phase 2D: Career transition SERP', script: 'fetch-serp.ts', args: [date, '--batch=D'] },
		{ id: 'cwv', name: 'Phase 3: Core Web Vitals', script: 'fetch-cwv.ts', args: [date] },
		{ id: 'analyze', name: 'Phase 4: Analyze + diff', script: 'analyze.ts', args: [date] },
		{ id: 'render', name: 'Phase 5: Render markdown', script: 'render-report.ts', args: [date] },
		{ id: 'alert', name: 'Phase 6: Alert (if regressions)', script: 'alert.ts', args: [date] },
	];
}

async function runPhase(phase: PhaseSpec): Promise<{ ok: boolean; durationMs: number; stdout?: string; stderr?: string }> {
	const start = Date.now();
	console.log(`\n━━━ ${phase.name} ━━━`);
	const scriptPath = join(__dirname, phase.script);
	const result = spawnSync('bun', ['run', scriptPath, ...phase.args], {
		stdio: 'inherit',
		env: process.env,
	});
	const durationMs = Date.now() - start;
	if (result.status !== 0) {
		console.error(`❌ ${phase.name} failed (exit ${result.status}, ${(durationMs / 1000).toFixed(1)}s)`);
		return { ok: false, durationMs };
	}
	console.log(`✅ ${phase.name} done (${(durationMs / 1000).toFixed(1)}s)`);
	return { ok: true, durationMs };
}

async function main() {
	const args = process.argv.slice(2);
	const date = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) || todayAEST();
	const skipArg = args.find((a) => a.startsWith('--skip='))?.split('=')[1] || '';
	const skip = new Set(skipArg.split(',').map((s) => s.trim()).filter(Boolean));

	console.log(`▶ SEO Performance run for ${date}`);
	if (skip.size > 0) console.log(`  skip: ${[...skip].join(', ')}`);

	const phases = buildPhases(date).filter((p) => !skip.has(p.id) && !skip.has(p.script.replace('.ts', '')));
	const results: Array<{ phase: PhaseSpec; ok: boolean; durationMs: number }> = [];

	for (const phase of phases) {
		const r = await runPhase(phase);
		results.push({ phase, ...r });
		if (!r.ok) {
			// Phase 1 (gsc) 失败致命；其它 phase 失败继续跑（参考 PRD 5.4 错误处理）
			if (phase.id === 'gsc') {
				console.error('❌ GSC phase failed — abort (GSC is core data source)');
				process.exit(1);
			}
		}
	}

	console.log('\n━━━ 总结 ━━━');
	const total = results.reduce((s, r) => s + r.durationMs, 0);
	for (const r of results) {
		console.log(`  ${r.ok ? '✅' : '❌'} ${r.phase.name} — ${(r.durationMs / 1000).toFixed(1)}s`);
	}
	console.log(`  Total: ${(total / 1000).toFixed(1)}s`);
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ run failed:', err);
		process.exit(1);
	});
}
