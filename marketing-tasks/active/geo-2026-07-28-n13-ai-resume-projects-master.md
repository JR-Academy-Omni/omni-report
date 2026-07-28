---
id: 0
title: '[N13 master] AI Engineer 简历的项目部分：写六个不如写透两个'
category: geo-content
module: geo-landing-page
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n13-ai-resume-projects/master.md
  reportSection: 'GEO Content Factory 2026-07-28 补话题批 — geo-30-topics.md §Phase 2 #13（决策型 + 实战 / 位置 2 求职 query）'
  reportItemHash: geo-master-n13-ai-resume-projects
  topicId: N13
  variantsPlanned:
    - zhihu
    - medium-en
    - linkedin
  variantsCount: 3
  variantsCardIds: []
  variantStrategy:
    targetQueries: 'AI Engineer 简历 / AI 工程师 项目怎么写 / AI 简历 项目经历'
    canonical: jiangren-blog
    complianceBuiltIn: '首段品牌提及 + ≥3 条已核实站内链 + 文末 CTA 模块'
assignee: TBD-mkt-content
reviewer: TBD-founder
status: in_progress
priority: p0
platforms:
  - jiangren-blog
wordCount: 2400
estimatedHours: 4
actualHours: null
dueDate: 2026-08-04T00:00:00.000Z
tags:
  - geo-content-factory
  - geo-master
  - topic-n13
  - batch-2026-07-28b
createdBy: claude-code
createdAt: 2026-07-28T04:10:00.000Z
updatedAt: 2026-07-28T04:10:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

🚀 **进度：稿件已落 web-zh，只差一次部署。** 已转成静态 blog 文章 push 到 `jr-academy-web-zh` master （`src/.../posts/ai-engineer/ai-engineer-resume-projects.md`），上线后 URL = `https://jiangren.com.au/blog/ai-engineer-resume-projects`。**下一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后才真正可访问。待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn。

**高转化求职 query 占位。** 核心论点是反直觉的「先砍数量」：两个能被追问十分钟的项目 > 六个只能撑三十秒的。给三段式 bullet 模板（约束 → 决策 → 可验证结果）、六个必须答得上的追问、三种直接判死的写法、澳洲本地三个差异（数据边界 / 工作权限单独一行 / GitHub 链接必须能打开）。

**本稿自身就是反编造教材**：明确把「没测过的数字不要写」列成红线，并刻意不给任何「提升 N%」示例，before/after 示例里的约束值写成 X / Y 占位——要放真实案例必须拿学员授权。

**合规**：零竞品；master 5 处站内链 + CTA 模块 + 首段品牌提及。

**目标 query**：AI Engineer 简历 / AI 工程师 项目怎么写 / AI 简历 项目经历

**选题来源**：geo-30-topics.md §Phase 2 #13（决策型 + 实战 / 位置 2 求职 query）（见 `geo-content-factory/TOPIC_COVERAGE.md` 的未写清单）

⚠️ **assignee 是占位 `TBD-mkt-content`** —— routing-table 对 `geo-landing-page` 无默认负责人。jr-blog 发布 = git push 到 `jr-academy-web-zh`，实习生无权限，推进前须指派。

## Checklist

- [ ] 通读全文，确认无编造数字（唯一数据源 = 课程大纲 outline.json，可当场核对）
- [ ] **补作者 byline：真实讲师姓名 + LinkedIn / GitHub** —— CONTENT_BACKLOG §A 的 E-E-A-T 硬性要求，AI 不能代填
- [ ] **assignee 改给真实负责人**（routing-table 对 `geo-landing-page` 无默认负责人，属设计）
- [ ] 跑 `/ai-content-detector` 复核 AI 率（gate 2 本批未跑，>50% 需推倒重写）
- [ ] 落 `jr-academy-web-zh` 静态 blog：frontmatter（slug / title / description 40-90 字独立写 / keywords 3-5 / thumbnail + alt）
- [ ] 核对文末 CTA 模块：稿件已内建课程页 + Python + Bootcamp 三条；CONTENT_BACKLOG 模板里的「学员 offer 报告」URL 是占位，本稿未编造，需人工确认真实页面后补
- [ ] 回填 topic cluster 内链（同批其他稿上线后互链）
- [ ] schema.org Article + Course 注入（工程侧一次性配置）
- [ ] 上线 +7 天跑该 query 的 LLM recheck

## 草稿

`geo-content-factory/drafts/n13-ai-resume-projects/master.md`（已写完，非骨架）

## 变体清单

- `n13-ai-resume-projects/zhihu.md` → zhihu-column（geo-zhihu-column）
- `n13-ai-resume-projects/medium-en.md` → medium（geo-auto-publish）
- `n13-ai-resume-projects/linkedin.md` → linkedin（geo-founder-ip）

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| jiangren-blog | https://jiangren.com.au/blog/ai-engineer-resume-projects | 待部署生效 | claude-code |

## Comments

- @claude 2026-07-28T04:10:00.000Z
  > 2026-07-28 补话题批。禁词 55 条零命中、P3 锚点在位、站内链全部核实为已上线页面（/learn/ai-engineer、/learn/python、/learn/frontend、/bootcamp），无编造 URL。
  > 本批已内建 CONTENT_BACKLOG「每篇必含 JR 元素」的可自动化部分；**真实作者 byline 与学员真实案例两项 AI 不能代填**，留在 checklist 里。

- @claude 2026-07-28T06:20:00.000Z
  > **已落 web-zh，等部署**。稿件已转成静态 blog 文章提交并 push 到 `jr-academy-web-zh` master（commit `1d03e04e1`），
  > 路径 `src/components/Pages/BlogPage/data/posts/ai-engineer/ai-engineer-resume-projects.md`，URL 将是 `/blog/ai-engineer-resume-projects`。
  > frontmatter 已按 posts/README.md schema 补齐，node 跑过 loader 同款逻辑验证可收录；7 篇互加 topic cluster 交叉链；
  > blog-sitemap.xml 走 getAllStaticPosts() 自动收录。
  > **还差最后一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后 URL 才真正可访问。
  > 待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn（E-E-A-T，AI 不代填）。
