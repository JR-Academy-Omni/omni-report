/**
 * AEST/Brisbane 日期工具。所有 routine 跑在 UTC 服务器，但报告日期必须用 AEST。
 * 与 scripts/seo-healthcheck.ts 的实现保持一致（参考 omni-report/CLAUDE.md memory）。
 */

export function todayAEST(): string {
	const fmt = new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Australia/Sydney',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
	return fmt.format(new Date());
}

export function daysAgoAEST(days: number): string {
	const d = new Date();
	d.setUTCDate(d.getUTCDate() - days);
	const fmt = new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Australia/Sydney',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
	return fmt.format(d);
}

export function weeksAgoAEST(weeks: number): string {
	return daysAgoAEST(weeks * 7);
}

export function isoWeekNumber(dateStr: string): number {
	const d = new Date(dateStr + 'T00:00:00Z');
	const target = new Date(d.valueOf());
	const dayNr = (d.getUTCDay() + 6) % 7;
	target.setUTCDate(target.getUTCDate() - dayNr + 3);
	const firstThursday = target.valueOf();
	target.setUTCMonth(0, 1);
	if (target.getUTCDay() !== 4) {
		target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
	}
	return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}
