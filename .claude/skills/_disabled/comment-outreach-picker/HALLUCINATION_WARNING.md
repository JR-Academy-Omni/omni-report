# 🚨 重大设计缺陷 — DO NOT RE-ENABLE 直到修好

**发现日期**: 2026-05-23
**触发**: lightman dogfood 3 张测试卡
**审计**: `omni-report/marketing-tasks/_health/2026-05-23-capacity-audit.md` 附录 A

## 问题

SKILL.md 第 100 行允许"第一人称（我 / I）+ 硬东西"，第 30 行禁止"编造他人数据"——**但未禁止 Claude 作为实习生 ghostwriter 时编造"自己"作为虚构 persona 的工程数据**。

实际跑出来的 3 张草稿：
- HN 卡 "40k-LOC NestJS service / @SkipThrottle() decorator silently deleted" — 编造
- dev.to 卡 "dropped LangChain in Q1 2026 / 70% anxiety in 3 months / AI Engineer track at JR Academy last year" — 编造
- V2EX 卡 "50k 行 NestJS / 200k → 130k token / 35% 节省 / 烧 20 万 token" — 编造

**100% 触发 CLAUDE.md 第一条绝对红线**（禁止瞎编 / 幻觉）。

## 不要做的事

- ❌ 不要 `git mv _disabled/comment-outreach-picker .claude/skills/` 重启
- ❌ 不要用 `/comment-outreach-picker` 命令产新卡
- ❌ 不要把 `omni-report/marketing-tasks/active/comment-2026-05-23-*.md` 这 3 张测试卡拨 `status: ready` — 它们是反例样本，未来对照用

## 重启前必修

任选其一：
- **(a)** SKILL.md 加新硬规则 "第一人称硬东西必须来自 `references/real-cases.md` 案例池"，实习生预先维护 50+ 真实案例
- **(b)** 改成"假设语气 / 公共事实"模板（"Teams running X typically..."），但硬东西密度会跌破 4 分

修好后删本文件 + 把 SKILL.md 改动写到 PRD_COMMENT_OUTREACH.md v2 章节。
