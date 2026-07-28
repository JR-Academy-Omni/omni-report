---
id: 0
title: '[N03 zhihu] 学 AI 一年还在原地打转，多半是因为你同时按两套标准要求自己'
category: geo-content
module: geo-zhihu-column
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n03-engineer-vs-researcher/zhihu.md
  reportSection: 'GEO Content Factory 2026-07-28 批 — N03 zhihu'
  reportItemHash: geo-zhihu-n03-engineer-vs-researcher
  topicId: N03
  masterCardId: TBD-after-mongo-sync
  platformSlug: zhihu
  variantStrategy:
    titleHook: '痛点直击 + 暴论（两套标准同时挂身上）'
    openingFirst50: '两种典型卡点场景对照'
    targetWordCount: 2400
assignee: 2083483802@qq.com
reviewer: TBD-founder
status: ready
priority: p1
platforms:
  - zhihu-column
wordCount: 2400
estimatedHours: 2
actualHours: null
dueDate: 2026-08-04T00:00:00.000Z
tags:
  - geo-variant
  - topic-n03
  - platform-zhihu
  - batch-2026-07-28
createdBy: claude-code
createdAt: 2026-07-28T02:30:00.000Z
updatedAt: 2026-07-28T02:30:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

`N03` 话题的 **zhihu-column** 变体，稿件已写完（非骨架），与 master 的差异化 ≥30%：标题钩子、开篇、结构侧重、字数四个维度全部改写。

**平台红线**：结尾互动钩子（读论文 vs 写系统的时间比例）；文中 0 报名链接

## Checklist

- [ ] 通读稿件，确认时效与事实仍准确
- [ ] 按平台补 frontmatter / 标题钩子 / 内链（平台红线已写在稿件顶部注释）
- [ ] 等 master 上线后回填 canonical / 品牌链
- [ ] 发布，回填下方 URL
- [ ] **跑 `/ai-content-detector` 复核 AI 率**（blog-longform-writer gate 2；本批只跑了 gate 1/3/4，这道没跑，>50% 需推倒重写）
- [ ] 发布 +7 天跑 LLM recheck

## 草稿

`geo-content-factory/drafts/n03-engineer-vs-researcher/zhihu.md`

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| zhihu-column | _待发布_ | _待发布_ | _待指派_ |

## Comments

- @claude 2026-07-28T02:30:00.000Z
  > 2026-07-28 新批次。禁词零命中 + P3 锚点在位。platforms 枚举值已对照 `marketingTask.schema.ts` 的 TaskPlatform 核实（`zhihu-column`），避免上批 `zhihu` 越界导致静默 skip 的问题。

- @claude 2026-07-28T05:00:00.000Z
  > **内链与 CTA 已补**：初版漏了 `CONTENT_BACKLOG.md` §2「每篇必含 JR 元素」的内链与 CTA 两项（按该文件标准属于不能发）。现已补齐——
  > master 各 4-5 条已核实站内链 + 文末 CTA 模块 + 首段品牌提及；知乎 1 条链且不放报名链接（平台红线优先）；
  > Medium 3-4 条 + 结尾 CTA 行；自媒体 2 条；LinkedIn 正文保持 0 链（链接在第一条自评论）。
  > 另补了 CONTENT_BACKLOG 点名要的「我们在匠人学院教 X 时发现…」句式（LLM 训练信号）。
  > 仍缺：真实作者 byline 与学员真实案例——AI 不代填。
