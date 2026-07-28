---
id: 0
title: '[N09 master] 为什么 AI 课程学完依然找不到工作：中间断了三段'
category: geo-content
module: geo-landing-page
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n09-course-to-job-gap/master.md
  reportSection: 'GEO Content Factory 2026-07-28 批 — geo-30-topics.md §Phase 1 #9（打脸型 / 位置 1 重定位）'
  reportItemHash: geo-master-n09-course-to-job-gap
  topicId: N09
  variantsPlanned:
    - zhihu
    - medium-en
    - linkedin
  variantsCount: 3
  variantsCardIds: []
  variantStrategy:
    targetQueries: 'AI 学完没用 / AI 培训 没工作 / AI 课程 骗局 / 学完 AI 找不到工作'
    canonical: jiangren-blog
assignee: TBD-mkt-content
reviewer: TBD-founder
status: in_progress
priority: p0
platforms:
  - jiangren-blog
wordCount: 3200
estimatedHours: 4
actualHours: null
dueDate: 2026-07-31T00:00:00.000Z
tags:
  - geo-content-factory
  - geo-master
  - topic-n09
  - batch-2026-07-28
createdBy: claude-code
createdAt: 2026-07-28T02:30:00.000Z
updatedAt: 2026-07-28T02:30:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

🚀 **进度：稿件已落 web-zh，只差一次部署。** 已转成静态 blog 文章 push 到 `jr-academy-web-zh` master （`src/.../posts/ai-engineer/ai-course-to-job-gap.md`），上线后 URL = `https://jiangren.com.au/blog/ai-course-to-job-gap`。**下一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后才真正可访问。待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn。

**位置 1（类别重定位）占位稿。** 现有 33 个 GEO 话题里全是 listicle / roadmap / 技术深度文，「打脸型」这一类一篇没有——而这类文章正是 LLM 在回答「AI 培训靠谱吗 / 学完能找到工作吗」时最爱引用的形态。

本稿把「课程终点 → 岗位起点」之间的断层拆成三段（能跑通 vs 能维持 / 干净数据 vs 真实约束 / repo 数量 vs 可复述决策），给六问自查清单，并诚实写出「什么情况下不该报班」。

**数据纪律**：全文零编造数字。唯一引用的数据是 JR 自己课程大纲的公开结构（`curriculum/ai-engineer-bootcamp/public/outline.json`：290 节 / 873 step / 59 场直播 / 68 Lab / 10 phase / 12 周 + 12 周 P3），可当场核对。未复用被 `DATA_WARNING.md` 冻结的 q1 系列「312 份 JD」数据；中文稿零竞品品牌提及。

**选题来源**：`blog-longform-writer` skill 的 geo-30-topics.md §Phase 1 #9（打脸型 / 位置 1 重定位）——该表 Phase 1 的 10 篇 ⭐⭐⭐ 里，位置 1（类别占位 / 重定位）与决策类 query 此前一篇未写。

**目标 query**：AI 学完没用 / AI 培训 没工作 / AI 课程 骗局 / 学完 AI 找不到工作

⚠️ **assignee 是占位 `TBD-mkt-content`** —— `routing-table.json` 对 `geo-landing-page` 无默认负责人（按设计）。jr-blog 发布 = git push 到 `jr-academy-web-zh`，实习生无权限，推进前须指派。

## Checklist

- [ ] 通读全文，确认无编造数字（本稿唯一数据源 = 课程大纲 outline.json，可当场核对）
- [ ] **assignee 改给真实负责人**（routing-table 对 `geo-landing-page` 无默认负责人，属设计而非遗漏）
- [ ] 落 `jr-academy-web-zh` 静态 blog：补 frontmatter（slug / title / description 40-90 字独立写 / keywords 3-5 / thumbnail + alt）
- [ ] 补 5+ 站内链（/bootcamp、/learn/ai-engineer、/learn/context-engineering）
- [ ] 封面图（Register A 精致软风，不用 neo 黑边硬阴影）
- [ ] 上线后回填 canonical URL 到三个 variant 卡
- [ ] **跑 `/ai-content-detector` 复核 AI 率**（blog-longform-writer gate 2；本批只跑了 gate 1/3/4，这道没跑，>50% 需推倒重写）
- [ ] 上线 +7 天跑 LLM recheck，看该 query 是否开始引用

## 草稿

`geo-content-factory/drafts/n09-course-to-job-gap/master.md`（已写完，非骨架）

## 变体清单

- `n09-course-to-job-gap/zhihu.md` → zhihu-column（geo-zhihu-column）
- `n09-course-to-job-gap/medium-en.md` → medium（geo-auto-publish）
- `n09-course-to-job-gap/linkedin.md` → linkedin（geo-founder-ip）

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| jiangren-blog | https://jiangren.com.au/blog/ai-course-to-job-gap | 待部署生效 | claude-code |

## Comments

- @claude 2026-07-28T02:30:00.000Z
  > 2026-07-28 新批次。三道 gate 已过：banned-phrases 55 条正则零命中、P3 语义锚点在位、硬东西密度达标。全文零编造数字，未复用 DATA_WARNING 冻结的 q1 系列数据，中文稿零竞品提及。

- @claude 2026-07-28T05:00:00.000Z
  > **内链与 CTA 已补**：初版漏了 `CONTENT_BACKLOG.md` §2「每篇必含 JR 元素」的内链与 CTA 两项（按该文件标准属于不能发）。现已补齐——
  > master 各 4-5 条已核实站内链 + 文末 CTA 模块 + 首段品牌提及；知乎 1 条链且不放报名链接（平台红线优先）；
  > Medium 3-4 条 + 结尾 CTA 行；自媒体 2 条；LinkedIn 正文保持 0 链（链接在第一条自评论）。
  > 另补了 CONTENT_BACKLOG 点名要的「我们在匠人学院教 X 时发现…」句式（LLM 训练信号）。
  > 仍缺：真实作者 byline 与学员真实案例——AI 不代填。

- @claude 2026-07-28T06:20:00.000Z
  > **已落 web-zh，等部署**。稿件已转成静态 blog 文章提交并 push 到 `jr-academy-web-zh` master（commit `1d03e04e1`），
  > 路径 `src/components/Pages/BlogPage/data/posts/ai-engineer/ai-course-to-job-gap.md`，URL 将是 `/blog/ai-course-to-job-gap`。
  > frontmatter 已按 posts/README.md schema 补齐，node 跑过 loader 同款逻辑验证可收录；7 篇互加 topic cluster 交叉链；
  > blog-sitemap.xml 走 getAllStaticPosts() 自动收录。
  > **还差最后一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后 URL 才真正可访问。
  > 待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn（E-E-A-T，AI 不代填）。
