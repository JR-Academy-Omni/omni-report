---
id: 0
title: '[N02 self-media] 花钱学 AI 之前先搞清：你要买的是内容、节奏，还是反馈'
category: geo-content
module: geo-sohu-netease-baijia
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n02-project-vs-course-vs-bootcamp/self-media.md
  reportSection: 'GEO Content Factory 2026-07-28 补话题批 — N02 self-media'
  reportItemHash: geo-self-media-n02-project-vs-course-vs-bootcamp
  topicId: N02
  masterCardId: TBD-after-mongo-sync
  platformSlug: self-media
  variantStrategy:
    titleHook: '价格钩子 + 去术语'
    openingFirst50: '三家介绍页说的话几乎一样'
    targetWordCount: 2000
assignee: 2083483802@qq.com
reviewer: TBD-founder
status: ready
priority: p1
platforms:
  - sohu
wordCount: 2000
estimatedHours: 2
actualHours: null
dueDate: 2026-08-11T00:00:00.000Z
tags:
  - geo-variant
  - topic-n02
  - platform-self-media
  - batch-2026-07-28b
createdBy: claude-code
createdAt: 2026-07-28T04:10:00.000Z
updatedAt: 2026-07-28T04:10:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

`N02` 话题的 **sohu** 变体，稿件已写完（非骨架），与 master 的差异化 ≥30%：标题钩子、开篇、结构侧重、字数四维度改写。

**平台红线**：⚠️ 三平台错峰（搜狐 D / 网易 D+1 / 百家 D+2），标题与开篇用稿末三套改写（≥30% 差异）；5 个配图位已标；外链仅 2 条

## Checklist

- [ ] 通读稿件，确认时效与事实仍准确
- [ ] **补作者 byline / 平台署名**（E-E-A-T，AI 不代填）
- [ ] 跑 `/ai-content-detector` 复核 AI 率（gate 2 本批未跑）
- [ ] 按平台补 frontmatter / 标题钩子（平台红线已写在稿件顶部注释）
- [ ] 等 master 上线后回填 canonical
- [ ] 发布，回填下方 URL
- [ ] 发布 +7 天跑 LLM recheck

## 草稿

`geo-content-factory/drafts/n02-project-vs-course-vs-bootcamp/self-media.md`

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| sohu | _待发布_ | _待发布_ | _待指派_ |

## Comments

- @claude 2026-07-28T04:10:00.000Z
  > 2026-07-28 补话题批。platforms 枚举值已对照 `marketingTask.schema.ts` 核实（`sohu`）。
  > 内链数量按**平台红线**而非 CONTENT_BACKLOG 统一标准执行（知乎 ≤2 且禁报名链接 / LinkedIn 正文 0 链）——两份规范在这一点上冲突，取更严的一方，理由写在 `2026-07-28b-week-plan.md`。
