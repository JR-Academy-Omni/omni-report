#!/usr/bin/env bun
/**
 * 按 routing-table.json 给 marketing-tasks/active|archive/*.md 的 assignee 字段重新赋值。
 *
 * 用法：bun run scripts/reassign-tasks.ts [--dry-run]
 *
 * 规则：读 frontmatter.module → 查 routing-table.moduleToAssignee → 改 assignee email。
 * 如果 module 映射到 TBD-* 占位（admin 还没显式指派），保持 TBD-* 不动 — 让卡在看板上
 * 可见为「无主」状态等 admin 显式指派；不再用编造的 fallback 池 round-robin（违反
 * 一文一人语义 + 编造 email 是历史 bug 根因）。
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dir, '..');
const TASKS_DIR = path.join(ROOT, 'marketing-tasks');
const ROUTING_PATH = path.join(TASKS_DIR, '_config', 'routing-table.json');

interface RoutingTable {
	moduleToAssignee: Record<string, string>;
}

async function* walkMd(dir: string): AsyncGenerator<string> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		const full = path.join(dir, e.name);
		if (e.isDirectory()) yield* walkMd(full);
		else if (e.isFile() && e.name.endsWith('.md')) yield full;
	}
}

async function main() {
	const dryRun = process.argv.includes('--dry-run');

	const routing: RoutingTable = JSON.parse(await fs.readFile(ROUTING_PATH, 'utf-8'));
	let updated = 0;
	let skipped = 0;

	for (const dir of [path.join(TASKS_DIR, 'active'), path.join(TASKS_DIR, 'archive')]) {
		try {
			await fs.access(dir);
		} catch {
			continue;
		}
		for await (const filePath of walkMd(dir)) {
			const raw = await fs.readFile(filePath, 'utf-8');
			const parsed = matter(raw);
			const module = parsed.data.module as string | undefined;
			if (!module) {
				skipped++;
				continue;
			}

			const targetEmail = routing.moduleToAssignee[module];
			if (!targetEmail) {
				skipped++;
				continue;
			}
			// TBD-* 占位保持不动，让卡在看板「无主」状态等 admin 显式指派
			const assignee = targetEmail;

			if (parsed.data.assignee === assignee) {
				skipped++;
				continue;
			}

			console.log(
				`  ${path.basename(filePath)}: module=${module} → ${assignee} (was ${parsed.data.assignee || 'null'})`
			);

			if (!dryRun) {
				parsed.data.assignee = assignee;
				const out = matter.stringify(parsed.content, parsed.data);
				await fs.writeFile(filePath, out, 'utf-8');
			}
			updated++;
		}
	}

	console.log(`\nDone: updated=${updated} skipped=${skipped} ${dryRun ? '(DRY RUN)' : ''}`);
}

main().catch(err => {
	console.error('reassign failed:', err);
	process.exit(1);
});
