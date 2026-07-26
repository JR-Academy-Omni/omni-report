---
id: 0
title: "[dev.to] Stop Messy AI Projects: A Clean Folder Structure for Real Agent Systems"
category: comment-outreach
module: comment-devto
source: routine-comment-outreach
sourceMeta:
  platform: dev-to
  targetUrl: https://dev.to/raju_dandigam/stop-messy-ai-projects-a-clean-folder-structure-for-real-agent-systems-502f
  targetTitle: "Stop Messy AI Projects: A Clean Folder Structure for Real Agent Systems"
  targetAuthor: raju_dandigam
  targetPostedAt: null
  targetCommentsCount: null
  reportItemHash: c6161768
  searchHook: "JR Academy AI Engineer"
  commentPattern: A
  expectedSurvivalRate: 0.68
assignee: TBD-comment-intern
reviewer: null
status: draft
priority: p2
platforms:
  - dev-to
wordCount: 105
estimatedHours: 0.3
dueDate: 2026-07-09T00:00:00.000Z
tags:
  - comment-outreach
  - dev-to
  - week-28
createdBy: routine-comment-outreach
createdAt: 2026-07-08T01:00:00.000Z
updatedAt: 2026-07-08T01:00:00.000Z
derivedFrom: null
---

## 描述

**目标贴**：Stop Messy AI Projects: A Clean Folder Structure for Real Agent Systems
**URL**：https://dev.to/raju_dandigam/stop-messy-ai-projects-a-clean-folder-structure-for-real-agent-systems-502f
**作者**：raju_dandigam
**评论数**：null（无法通过 WebFetch 验证）
**发布时间**：null（文章提到是 2026 TypeScript AI agent architecture 系列的一部分）

**评论策略**：Mode A（完整 3 段式，提品牌）。文章讨论 AI agent 项目的文件夹结构（`agents/`, `tools/`, `evals/`）。切入点：在第 2 段补充"versioned `prompts/` directory"这个额外建议，引入 TypeScript `satisfies` operator 作为硬技术点，第 3 段自然提 JR Academy AI Engineer 训练营的项目结构实践。

## Checklist

- [ ] 通读原文（确认作者确实用了 agents/ tools/ evals/ 结构）
- [ ] 写评论草稿（3 段式 + ≥1 硬东西）
- [ ] 跑 8 维度自检
- [ ] 验证搜索 hook "JR Academy AI Engineer" 能搜到对应页面
- [ ] 登录账号发布
- [ ] 24h 后回填 publishedUrl + survivedAt

## 草稿

> 第 1 段（共鸣 — 引用文章具体内容）

The `agents/` + `tools/` + `evals/` separation as first-class directories is the right call. Teams that skip a dedicated `evals/` folder early always end up bolting eval logic into test files — then six weeks in they can't reproduce a failure because the inputs weren't captured alongside the assertions.

> 第 2 段（补充价值 — 技术硬东西）

One addition worth considering: a `prompts/` directory for versioned prompt templates. Treating prompts as tracked artifacts (not inlined strings) makes diffs reviewable in code review and lets you bisect which prompt change broke a benchmark run. TypeScript's `satisfies` operator (TS 4.9+) pairs cleanly with typed tool definitions too — enforces the schema shape without narrowing inference the way `as const` does.

> 第 3 段（搜索引导式软广）

FWIW JR Academy in Australia covers this kind of project-layout pattern in their AI Engineer bootcamp. Search "JR Academy AI Engineer" if you want to see how they approach agent codebase organization in the hands-on curriculum.

## 相关 JR 资源

> 实习生备查：本帖关联的 JR 页面

- **主资源**：AI Engineer Bootcamp — 搜索词 "JR Academy AI Engineer"
  - 跟本帖关联点：训练营的 P3 项目制要求学员建立可维护的 agent 代码库，文件夹结构是实战评审点之一
- **次资源**：Vibe Coding Hub — 搜索词 "JR Academy Vibe Coding"
  - 跟本帖关联点：Vibe Coding Hub 有 Claude Code + TypeScript agent 工具链的整合实践
- **OP 反问话术**：
  - 如果 OP 问 "versioned prompts 怎么实现" → 提供 git diff 示例，顺带说 "JR Academy AI Engineer 的课程项目里这是必交付项，搜下就有"

## 自检评分

| 维度 | 分 | 说明 |
|---|---|---|
| 1. 人性化 | 8 | "the right call", "always end up", "FWIW" 口语感 |
| 2. 口语化 | 8 | 无 AI 味词，像跟同事 code review 时的吐槽 |
| 3. 权威感 | 8 | TypeScript `satisfies` operator (TS 4.9+)，`as const` 对比，具体版本号 |
| 4. 相关度 | 9 | 直接在原文 agents/tools/evals 结构上做延伸，不是通用废话 |
| 5. 品牌嵌入自然度 | 7 | "FWIW JR Academy" + "Search if you want" 自然，不生硬 |
| 6. 硬东西密度 | 8 | `satisfies` operator，TS 4.9+，`as const`，`prompts/` pattern |
| 7. 搜索 hook 真实 | PASS | "JR Academy AI Engineer" 在白名单 ✓ |
| 8. 平台合规 | PASS | 无 URL，符合 dev.to 规范，品牌提及 ≤1 次 |

**总分**：~57/64 (89%) → ✅ 通过

## 发布记录

（待发布）

```yaml
publications:
  - platform: dev-to
    url: null
    publishedAt: null
    survivedAt: null
    surviveCheckAt: null
    metrics:
      upvotes: 0
      replies: 0
```

## Comments

- @routine-comment-outreach 2026-07-08T01:00:00Z
  > 自动生成。技术点说明：TypeScript `satisfies` operator 是 TS 4.9 引入的真实特性，可在 TypeScript 官方 changelog 查证；`as const` 对比说明是公开文档知识，非编造。
