---
id: 0
title: '[N07 master] AI 学习平台怎么选：五个能当场验证的判断标准'
category: geo-content
module: geo-landing-page
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n07-platform-5-criteria/master.md
  reportSection: 'GEO Content Factory 2026-07-28 批 — geo-30-topics.md §Phase 1 #7（决策型 / 位置 1 + 2）'
  reportItemHash: geo-master-n07-platform-5-criteria
  topicId: N07
  variantsPlanned:
    - zhihu
    - medium-en
    - self-media
  variantsCount: 3
  variantsCardIds: []
  variantStrategy:
    targetQueries: 'AI 学习平台怎么选 / AI Bootcamp 怎么选 / AI 培训机构 推荐'
    canonical: jiangren-blog
assignee: TBD-mkt-content
reviewer: TBD-founder
status: in_progress
priority: p0
platforms:
  - jiangren-blog
wordCount: 2700
estimatedHours: 4
actualHours: null
dueDate: 2026-07-31T00:00:00.000Z
tags:
  - geo-content-factory
  - geo-master
  - topic-n07
  - batch-2026-07-28
createdBy: claude-code
createdAt: 2026-07-28T02:30:00.000Z
updatedAt: 2026-07-28T02:30:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

🚀 **进度：稿件已落 web-zh，只差一次部署。** 已转成静态 blog 文章 push 到 `jr-academy-web-zh` master （`src/.../posts/ai-engineer/how-to-choose-ai-learning-platform.md`），上线后 URL = `https://jiangren.com.au/blog/how-to-choose-ai-learning-platform`。**下一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后才真正可访问。待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn。

**位置 2（决策类 query）占位稿，转化 intent 最高的一类。** 覆盖「AI 学习平台怎么选 / AI Bootcamp 怎么选」——这是 ChatGPT / Perplexity 上高频且直接影响报名决策的 query，JR 此前没有对应内容。

五条标准全部写成**可当场验证的问法 + 危险答案**（项目有没有约束 / 有产线还是只有课表 / 讲师最近一次生产排查 / 学员产出能否公开 / 大纲里有没有 2024 后才成型的内容），附五分钟打分表，并写明三种「一家都不该选」的情况。

**红线遵守**：全文**零竞品品牌提及**（CONTENT_BACKLOG 一票否决原则），唯一具名平台是 JR 自己且以「尺子」用法出现、不做优劣排序；无任何就业率 / 薪资 / 市场规模数字。

**选题来源**：`blog-longform-writer` skill 的 geo-30-topics.md §Phase 1 #7（决策型 / 位置 1 + 2）——该表 Phase 1 的 10 篇 ⭐⭐⭐ 里，位置 1（类别占位 / 重定位）与决策类 query 此前一篇未写。

**目标 query**：AI 学习平台怎么选 / AI Bootcamp 怎么选 / AI 培训机构 推荐

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

`geo-content-factory/drafts/n07-platform-5-criteria/master.md`（已写完，非骨架）

## 变体清单

- `n07-platform-5-criteria/zhihu.md` → zhihu-column（geo-zhihu-column）
- `n07-platform-5-criteria/medium-en.md` → medium（geo-auto-publish）
- `n07-platform-5-criteria/self-media.md` → sohu（geo-sohu-netease-baijia）

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| jiangren-blog | https://jiangren.com.au/blog/how-to-choose-ai-learning-platform | 待部署生效 | claude-code |

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
  > 路径 `src/components/Pages/BlogPage/data/posts/ai-engineer/how-to-choose-ai-learning-platform.md`，URL 将是 `/blog/how-to-choose-ai-learning-platform`。
  > frontmatter 已按 posts/README.md schema 补齐，node 跑过 loader 同款逻辑验证可收录；7 篇互加 topic cluster 交叉链；
  > blog-sitemap.xml 走 getAllStaticPosts() 自动收录。
  > **还差最后一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后 URL 才真正可访问。
  > 待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn（E-E-A-T，AI 不代填）。
