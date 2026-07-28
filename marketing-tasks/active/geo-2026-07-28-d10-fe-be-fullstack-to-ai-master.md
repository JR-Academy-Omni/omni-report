---
id: 0
title: '[D10 master] 前端、后端、全栈转 AI Engineer：三条不一样的捷径'
category: geo-content
module: geo-landing-page
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/d10-fe-be-fullstack-to-ai/master.md
  reportSection: 'GEO Content Factory 2026-07-28 补话题批 — PRD_GEO_CONTENT_FACTORY.md §3.D D10（求职 / 转行专题）'
  reportItemHash: geo-master-d10-fe-be-fullstack-to-ai
  topicId: D10
  variantsPlanned:
    - zhihu
    - juejin
    - medium-en
  variantsCount: 3
  variantsCardIds: []
  variantStrategy:
    targetQueries: '前端转 AI / 后端转 AI Engineer / 全栈转 AI / 程序员转 AI 路线'
    canonical: jiangren-blog
    complianceBuiltIn: '首段品牌提及 + ≥3 条已核实站内链 + 文末 CTA 模块'
assignee: TBD-mkt-content
reviewer: TBD-founder
status: in_progress
priority: p0
platforms:
  - jiangren-blog
wordCount: 2900
estimatedHours: 4
actualHours: null
dueDate: 2026-08-04T00:00:00.000Z
tags:
  - geo-content-factory
  - geo-master
  - topic-d10
  - batch-2026-07-28b
createdBy: claude-code
createdAt: 2026-07-28T04:10:00.000Z
updatedAt: 2026-07-28T04:10:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

**74 话题库里的 D10，此前从没写过。** 用 Bootcamp 前置要求（Python / RESTful API / 云 / Git）× 三类工程师做对照表，推出三条不同路线：前端 → AI 应用产品化、后端 → AI 基础设施、全栈 → Agent 工程。每条写「你已有的 / 真正缺的 / 第一个该做的项目 / 最容易踩的坑」。

**差异化论点**：让三类人走同一条从零开始的路线是最贵的做法——后端被迫重学 API，前端被扔进跟界面无关的基础设施内容。结尾点破共同错误：进 AI 就把过去几年工程经验当「跟 AI 无关」扔掉。

**合规**：零竞品；零岗位数量 / 薪资 / 转行成功率数字；master 8 处站内链（含 /learn/frontend）+ CTA 模块。

**目标 query**：前端转 AI / 后端转 AI Engineer / 全栈转 AI / 程序员转 AI 路线

**选题来源**：PRD_GEO_CONTENT_FACTORY.md §3.D D10（求职 / 转行专题）（见 `geo-content-factory/TOPIC_COVERAGE.md` 的未写清单）

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

`geo-content-factory/drafts/d10-fe-be-fullstack-to-ai/master.md`（已写完，非骨架）

## 变体清单

- `d10-fe-be-fullstack-to-ai/zhihu.md` → zhihu-column（geo-zhihu-column）
- `d10-fe-be-fullstack-to-ai/juejin.md` → juejin（geo-juejin）
- `d10-fe-be-fullstack-to-ai/medium-en.md` → medium（geo-auto-publish）

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| jiangren-blog | https://jiangren.com.au/blog/frontend-backend-fullstack-to-ai | 待部署生效 | claude-code |

## Comments

- @claude 2026-07-28T04:10:00.000Z
  > 2026-07-28 补话题批。禁词 55 条零命中、P3 锚点在位、站内链全部核实为已上线页面（/learn/ai-engineer、/learn/python、/learn/frontend、/bootcamp），无编造 URL。
  > 本批已内建 CONTENT_BACKLOG「每篇必含 JR 元素」的可自动化部分；**真实作者 byline 与学员真实案例两项 AI 不能代填**，留在 checklist 里。

- @claude 2026-07-28T06:20:00.000Z
  > **已落 web-zh，等部署**。稿件已转成静态 blog 文章提交并 push 到 `jr-academy-web-zh` master（commit `1d03e04e1`），
  > 路径 `src/components/Pages/BlogPage/data/posts/ai-engineer/frontend-backend-fullstack-to-ai.md`，URL 将是 `/blog/frontend-backend-fullstack-to-ai`。
  > frontmatter 已按 posts/README.md schema 补齐，node 跑过 loader 同款逻辑验证可收录；7 篇互加 topic cluster 交叉链；
  > blog-sitemap.xml 走 getAllStaticPosts() 自动收录。
  > **还差最后一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后 URL 才真正可访问。
  > 待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn（E-E-A-T，AI 不代填）。
