#!/usr/bin/env bun
/**
 * 从 GSC top queries 自动生成关键词候选清单。
 *
 * 触发场景：第一次跑 SEO Performance 时，keywords.json 是模板（业务推测），
 * 这个脚本拉过去 90 天 GSC top 1000 query，按 impressions 排序 + 业务相关性筛选，
 * 输出 `keywords.suggested.json` 给人工 review，决定是否替换 keywords.json。
 *
 * Usage:
 *   bun run scripts/seo-performance/seed-keywords.ts
 *   bun run scripts/seo-performance/seed-keywords.ts --days=180 --limit=200
 *
 * 不会自动覆盖 keywords.json — 输出 `.suggested.json` 让你 diff 后手动 merge。
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { searchAnalyticsAll, getSiteUrl } from './lib/gsc.ts';
import { todayAEST, daysAgoAEST } from './lib/aest.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEYWORDS_PATH = join(__dirname, 'keywords.json');
const SUGGESTED_PATH = join(__dirname, 'keywords.suggested.json');

// 简单的业务相关性词库 — 命中其一就保留。可在 keywords.json 里 _business_terms 自定义。
const DEFAULT_BUSINESS_TERMS = [
	'ai', 'gpt', 'claude', 'cursor', 'copilot', 'mcp', 'rag', 'llm',
	'prompt', 'engineer', 'engineer', '开发', '编程', 'coding', 'bootcamp',
	'课程', '学习', '教程', 'tutorial', 'course', 'training',
	'jr', '匠人', 'jiangren',
	'求职', '面试', 'interview', 'resume', '简历',
	'转行', '入门', 'beginner',
	'前端', 'frontend', 'backend', '后端', 'fullstack',
	'python', 'javascript', 'typescript', 'react', 'next', 'node',
	'aws', 'azure', 'gcp', 'cloud',
	'澳洲', 'australia', 'sydney', '悉尼', 'melbourne', '墨尔本',
	'lab', '实验室', 'workshop', 'project',
	'roadmap', '路线图',
];

interface KeywordsConfig {
	domain: string;
	locations: Array<{ code: number; name: string; language_code: string; label: string }>;
	categories: Record<string, { label: string; keywords: string[] }>;
	_business_terms?: string[];
}

interface SuggestedKeyword {
	query: string;
	impressions: number;
	clicks: number;
	ctr: number;
	position: number;
	category_guess: string;
	already_in_list: boolean;
}

function categorize(query: string, currentKeywords: Set<string>): string {
	const q = query.toLowerCase();
	if (currentKeywords.has(query)) return '_already_';
	if (/jr|jiangren|匠人/.test(q)) return 'brand';
	if (/(转行|求职|interview|面试|career|留学生|薪资|工作)/.test(q)) return 'career_transition';
	if (/(bootcamp|课程|学习|教程|入门|tutorial|course|training|路线图|roadmap|hub|lab|实验室|workshop)/.test(q)) return 'core_courses';
	return 'long_tail_content';
}

function passesBusinessFilter(query: string, terms: string[]): boolean {
	const q = query.toLowerCase();
	return terms.some((t) => q.includes(t.toLowerCase()));
}

async function main() {
	const args = process.argv.slice(2);
	const days = parseInt(args.find((a) => a.startsWith('--days='))?.split('=')[1] || '90', 10);
	const limit = parseInt(args.find((a) => a.startsWith('--limit='))?.split('=')[1] || '200', 10);

	if (!existsSync(KEYWORDS_PATH)) {
		throw new Error(`keywords.json not found at ${KEYWORDS_PATH}`);
	}
	const config = JSON.parse(readFileSync(KEYWORDS_PATH, 'utf8')) as KeywordsConfig;
	const businessTerms = config._business_terms ?? DEFAULT_BUSINESS_TERMS;

	const currentKeywords = new Set<string>();
	for (const cat of Object.values(config.categories)) {
		for (const kw of cat.keywords) currentKeywords.add(kw);
	}

	const startDate = daysAgoAEST(days + 3);
	const endDate = daysAgoAEST(3);

	console.log(`▶ Fetching GSC top queries`);
	console.log(`  date range: ${startDate} → ${endDate} (${days} days)`);

	const rows = await searchAnalyticsAll(getSiteUrl(), {
		startDate,
		endDate,
		dimensions: ['query'],
		rowLimit: 25000,
	});

	console.log(`  · pulled ${rows.length} rows`);

	const filtered = rows
		.map((r) => ({
			query: r.keys[0],
			impressions: r.impressions,
			clicks: r.clicks,
			ctr: r.ctr,
			position: r.position,
		}))
		.filter((r) => r.impressions >= 10) // 噪声过滤
		.filter((r) => passesBusinessFilter(r.query, businessTerms))
		.sort((a, b) => b.impressions - a.impressions)
		.slice(0, limit);

	const suggested: SuggestedKeyword[] = filtered.map((r) => ({
		...r,
		category_guess: categorize(r.query, currentKeywords),
		already_in_list: currentKeywords.has(r.query),
	}));

	const grouped: Record<string, SuggestedKeyword[]> = {
		brand: [],
		core_courses: [],
		long_tail_content: [],
		career_transition: [],
		_already_: [],
	};
	for (const s of suggested) {
		(grouped[s.category_guess] || grouped.long_tail_content).push(s);
	}

	const output = {
		_doc: '从 GSC top queries 自动抽取的候选关键词。Review 后手动合并到 keywords.json。',
		_generated_at: new Date().toISOString(),
		_date_range: { start: startDate, end: endDate, days },
		_business_terms_used: businessTerms,
		summary: {
			total_pulled: rows.length,
			passed_filter: filtered.length,
			already_in_list: grouped._already_.length,
			new_candidates: suggested.length - grouped._already_.length,
		},
		categories: {
			brand: { count: grouped.brand.length, keywords: grouped.brand },
			core_courses: { count: grouped.core_courses.length, keywords: grouped.core_courses },
			long_tail_content: { count: grouped.long_tail_content.length, keywords: grouped.long_tail_content },
			career_transition: { count: grouped.career_transition.length, keywords: grouped.career_transition },
			already_in_list: { count: grouped._already_.length, keywords: grouped._already_ },
		},
	};

	writeFileSync(SUGGESTED_PATH, JSON.stringify(output, null, 2));
	console.log(`\n✅ Suggested keywords → ${SUGGESTED_PATH}`);
	console.log(`   total pulled: ${rows.length}`);
	console.log(`   passed business filter: ${filtered.length}`);
	console.log(`   already in keywords.json: ${grouped._already_.length}`);
	console.log(`   ─ brand:             ${grouped.brand.length}`);
	console.log(`   ─ core_courses:      ${grouped.core_courses.length}`);
	console.log(`   ─ long_tail_content: ${grouped.long_tail_content.length}`);
	console.log(`   ─ career_transition: ${grouped.career_transition.length}`);
	console.log(`\n   下一步：手动 review keywords.suggested.json，merge 想要的进 keywords.json。`);
}

if (import.meta.main) {
	main().catch((err) => {
		console.error('❌ seed-keywords failed:', err);
		process.exit(1);
	});
}
