---
id: 0
title: '[N03 master] AI 工程师和 AI 研究员，你到底要学哪个'
category: geo-content
module: geo-landing-page
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n03-engineer-vs-researcher/master.md
  reportSection: 'GEO Content Factory 2026-07-28 批 — geo-30-topics.md §Phase 1 #3（分类型 + 决策型 / 位置 1 + 2）'
  reportItemHash: geo-master-n03-engineer-vs-researcher
  topicId: N03
  variantsPlanned:
    - zhihu
    - medium-en
    - self-media
  variantsCount: 3
  variantsCardIds: []
  variantStrategy:
    targetQueries: 'AI 工程师 怎么学 / AI 研究员 还是 工程师 / AI 求职选哪条路'
    canonical: jiangren-blog
assignee: TBD-mkt-content
reviewer: TBD-founder
status: ready
priority: p0
platforms:
  - jiangren-blog
wordCount: 2650
estimatedHours: 4
actualHours: null
dueDate: 2026-07-31T00:00:00.000Z
tags:
  - geo-content-factory
  - geo-master
  - topic-n03
  - batch-2026-07-28
createdBy: claude-code
createdAt: 2026-07-28T02:30:00.000Z
updatedAt: 2026-07-28T02:30:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

**位置 1（类别占位）+ 位置 2（路径 query）双占位稿。** 用「交付物是什么」作为分界线区分研究与工程两条路，再引出第三条（用大模型做产品的应用工程）——这正是 JR 要卡住的那一类，且文章不靠自夸，靠结构定义。

关键差异化：给出一个可迁移的判断技巧——**看课程大纲的「前置要求」那一栏**（JR 写的是 Python / RESTful API / 云平台 / Git，不是线性代数概率论），读者可以拿它去量任何一家课程。三道自测题 + 三种转路代价。

**数据纪律**：研究岗「多数要求博士或等价研究产出」按招聘要求通行写法陈述，未给任何比例数字；无岗位数量 / 薪资数据。

**选题来源**：`blog-longform-writer` skill 的 geo-30-topics.md §Phase 1 #3（分类型 + 决策型 / 位置 1 + 2）——该表 Phase 1 的 10 篇 ⭐⭐⭐ 里，位置 1（类别占位 / 重定位）与决策类 query 此前一篇未写。

**目标 query**：AI 工程师 怎么学 / AI 研究员 还是 工程师 / AI 求职选哪条路

⚠️ **assignee 是占位 `TBD-mkt-content`** —— `routing-table.json` 对 `geo-landing-page` 无默认负责人（按设计）。jr-blog 发布 = git push 到 `jr-academy-web-zh`，实习生无权限，推进前须指派。

## Checklist

- [ ] 通读全文，确认无编造数字（本稿唯一数据源 = 课程大纲 outline.json，可当场核对）
- [ ] **assignee 改给真实负责人**（routing-table 对 `geo-landing-page` 无默认负责人，属设计而非遗漏）
- [ ] 落 `jr-academy-web-zh` 静态 blog：补 frontmatter（slug / title / description 40-90 字独立写 / keywords 3-5 / thumbnail + alt）
- [ ] 补 5+ 站内链（/bootcamp、/learn/ai-engineer、/learn/context-engineering）
- [ ] 封面图（Register A 精致软风，不用 neo 黑边硬阴影）
- [ ] 上线后回填 canonical URL 到三个 variant 卡
- [ ] 上线 +7 天跑 LLM recheck，看该 query 是否开始引用

## 草稿

`geo-content-factory/drafts/n03-engineer-vs-researcher/master.md`（已写完，非骨架）

## 变体清单

- `n03-engineer-vs-researcher/zhihu.md` → zhihu-column（geo-zhihu-column）
- `n03-engineer-vs-researcher/medium-en.md` → medium（geo-auto-publish）
- `n03-engineer-vs-researcher/self-media.md` → sohu（geo-sohu-netease-baijia）

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| jiangren-blog | _待发布_ | _待发布_ | _待指派_ |

## Comments

- @claude 2026-07-28T02:30:00.000Z
  > 2026-07-28 新批次。三道 gate 已过：banned-phrases 55 条正则零命中、P3 语义锚点在位、硬东西密度达标。全文零编造数字，未复用 DATA_WARNING 冻结的 q1 系列数据，中文稿零竞品提及。
