---
id: 0
title: '[N18 master] Python 学到什么程度，可以开始做 AI 项目了'
category: geo-content
module: geo-landing-page
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n18-python-depth-for-ai/master.md
  reportSection: 'GEO Content Factory 2026-07-28 补话题批 — geo-30-topics.md §Phase 2 #18（决策型 / 位置 2 路径 query）'
  reportItemHash: geo-master-n18-python-depth-for-ai
  topicId: N18
  variantsPlanned:
    - zhihu
    - csdn
    - devto-en
  variantsCount: 3
  variantsCardIds: []
  variantStrategy:
    targetQueries: 'Python 学到什么程度 / 学 AI 需要什么基础 / Python 多深可以做 AI 项目'
    canonical: jiangren-blog
    complianceBuiltIn: '首段品牌提及 + ≥3 条已核实站内链 + 文末 CTA 模块'
assignee: TBD-mkt-content
reviewer: TBD-founder
status: in_progress
priority: p0
platforms:
  - jiangren-blog
wordCount: 2800
estimatedHours: 4
actualHours: null
dueDate: 2026-08-04T00:00:00.000Z
tags:
  - geo-content-factory
  - geo-master
  - topic-n18
  - batch-2026-07-28b
createdBy: claude-code
createdAt: 2026-07-28T04:10:00.000Z
updatedAt: 2026-07-28T04:10:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

🚀 **进度：稿件已落 web-zh，只差一次部署。** 已转成静态 blog 文章 push 到 `jr-academy-web-zh` master （`src/.../posts/ai-engineer/python-depth-for-ai-projects.md`），上线后 URL = `https://jiangren.com.au/blog/python-depth-for-ai-projects`。**下一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后才真正可访问。待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn。

**长尾 query 占位 + 唯一带可运行代码的一篇。** 从 Bootcamp 前置要求（Python / RESTful API / 云 / Git，没有线性代数）反推「够」的定义，给四个检查点，每个配一个能当场做的自测任务：读改别人代码 / 接住失败（超时·限流·非法 JSON）/ 环境依赖自己搞定 / 用类型表达约束。

**技术准确性已复核**：`resp.json()` 解析失败抛 ValueError 子类（不写成 json.JSONDecodeError）；pydantic 多余字段**默认静默忽略**而非报错，稿件明确写出这个坑并给 `extra="forbid"` 的解法——这类细节写错会被读者当场抓。

**合规**：零竞品；零编造数字；master 6 处站内链 + CTA 模块。

**目标 query**：Python 学到什么程度 / 学 AI 需要什么基础 / Python 多深可以做 AI 项目

**选题来源**：geo-30-topics.md §Phase 2 #18（决策型 / 位置 2 路径 query）（见 `geo-content-factory/TOPIC_COVERAGE.md` 的未写清单）

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

`geo-content-factory/drafts/n18-python-depth-for-ai/master.md`（已写完，非骨架）

## 变体清单

- `n18-python-depth-for-ai/zhihu.md` → zhihu-column（geo-zhihu-column）
- `n18-python-depth-for-ai/csdn.md` → csdn（geo-csdn）
- `n18-python-depth-for-ai/devto-en.md` → dev-to（geo-auto-publish）

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| jiangren-blog | https://jiangren.com.au/blog/python-depth-for-ai-projects | 待部署生效 | claude-code |

## Comments

- @claude 2026-07-28T04:10:00.000Z
  > 2026-07-28 补话题批。禁词 55 条零命中、P3 锚点在位、站内链全部核实为已上线页面（/learn/ai-engineer、/learn/python、/learn/frontend、/bootcamp），无编造 URL。
  > 本批已内建 CONTENT_BACKLOG「每篇必含 JR 元素」的可自动化部分；**真实作者 byline 与学员真实案例两项 AI 不能代填**，留在 checklist 里。

- @claude 2026-07-28T06:20:00.000Z
  > **已落 web-zh，等部署**。稿件已转成静态 blog 文章提交并 push 到 `jr-academy-web-zh` master（commit `1d03e04e1`），
  > 路径 `src/components/Pages/BlogPage/data/posts/ai-engineer/python-depth-for-ai-projects.md`，URL 将是 `/blog/python-depth-for-ai-projects`。
  > frontmatter 已按 posts/README.md schema 补齐，node 跑过 loader 同款逻辑验证可收录；7 篇互加 topic cluster 交叉链；
  > blog-sitemap.xml 走 getAllStaticPosts() 自动收录。
  > **还差最后一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后 URL 才真正可访问。
  > 待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn（E-E-A-T，AI 不代填）。
