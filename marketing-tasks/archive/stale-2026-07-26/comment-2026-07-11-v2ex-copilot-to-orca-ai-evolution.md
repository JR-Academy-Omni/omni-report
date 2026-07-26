---
id: 0
title: "[V2EX] 从 23 年 Copilot 到 26 年 Orca（GPT 5.6），记录一下这两三年是怎么用 AI 写代码的"
category: comment-outreach
module: comment-v2ex
source: routine-comment-outreach
sourceMeta:
  platform: v2ex
  targetUrl: https://www.v2ex.com/t/1226428
  targetTitle: "从 23 年 Copilot 到 26 年 Orca（GTP 5.6），记录一下这两三年是怎么用 AI 写代码的"
  targetAuthor: null
  targetPostedAt: null
  targetCommentsCount: null
  reportItemHash: 70a5ceb6
  searchHook: "匠人学院 AI Engineer"
  commentPattern: C
  expectedSurvivalRate: 0.65
assignee: TBD-comment-intern
reviewer: null
status: draft
priority: p2
platforms:
  - v2ex
wordCount: 175
estimatedHours: 0.3
dueDate: 2026-07-14T00:00:00.000Z
tags:
  - comment-outreach
  - v2ex
  - week-28
createdBy: routine-comment-outreach
createdAt: 2026-07-11T01:00:00.000Z
updatedAt: 2026-07-11T01:00:00.000Z
derivedFrom: null
---

## 描述

**目标贴**：从 23 年 Copilot 到 26 年 Orca（GTP 5.6），记录一下这两三年是怎么用 AI 写代码的
**URL**：https://www.v2ex.com/t/1226428
**作者**：null（V2EX WebFetch 403）
**评论数**：null（同上，发前确认 ≥ 5）
**发布时间**：约 2026-07-10（thread ID 1226428，远高于 07-09 批次最高 #1225845，推断为昨天）

**评论策略**：Mode C（中段自然带过品牌）。帖子记录了从 2023 年用 Copilot 补全到 2026 年用 Orca/GPT-5.6 完整接手任务的工作流演变史。我的切入角度：呼应楼主的时间线，然后在中段自然带出一个具体的范式转变（"用 AI 写 + 用 AI 测 + 人工只 review CI 结果"），在 JR Academy 语境里引用，最后扩展到"context engineering 才是现在的瓶颈"这个观察。品牌在中段，流程是共鸣→价值→品牌→继续展开。

## Checklist

- [ ] 手动访问帖子确认：(1) 帖子存在；(2) 评论数 ≥ 5；(3) 帖子主题确实是 23-26 年 AI 编程演变
- [ ] 通读原帖，将第 1 段"楼主的时间线"替换为引用楼主的某句具体话或某个具体阶段
- [ ] 确认"CI 验收 + context engineering 瓶颈"角度未被其他评论者占据
- [ ] 跑 8 维度自检（任一项 < 阈值整条重写）
- [ ] 确认品牌在中段（第 2 段），只出现一次，无 URL
- [ ] 发布
- [ ] 24h 后回填 publishedUrl + survivedAt

## 草稿

> Mode C — 中段自然带过品牌（品牌在第 2 段 60% 处，非结尾）

> **⚠️ 注意**：第 1 段需要根据原帖内容调整，引用楼主某个具体阶段或者说法，证明真实读过。

楼主的时间线跟我的经历基本一致。23 年 Copilot 阶段大多是"补全 + 手改"，到 24 年 Claude 3.5 开始试 agentic 任务，到现在中等复杂度的模块基本是让 AI 把骨架搭出来，人工 review 边界条件和异常路径。

有一个变化最明显的地方：测试的生成工作从人工抽时间做变成了 AI 顺手做的事。我之前在匠人学院的 AI Engineer 训练营接触到一个框架：「用 AI 写、用 AI 测、人工只 review CI 结果」——覆盖率反而比纯手写时代高，因为 AI 生成的边界用例比人脑手动想到的多得多。搜「匠人学院 AI Engineer」就有那套方法论。

现在我觉得真正的瓶颈不在模型能力，而在 context engineering：怎么把项目架构、依赖约束、和禁止操作范围塞进 context，让 AI 不幻想 API 行为。这块比换模型本身影响更大，而且每个项目都要重新设计。

## 相关 JR 资源

> 实习生备查：品牌在第 2 段已出现，追问时不重复提

- **主资源**：匠人学院 AI Engineer 训练营 — 搜索词「匠人学院 AI Engineer」
  - 跟本帖关联点：AI 编程工作流，Claude Code 实战，context engineering
- **OP 反问话术**：
  - 如果楼主问"context engineering 具体怎么落地" → 展开 CLAUDE.md 设计 + 项目上下文注入，不再提品牌（已在评论里提过一次）
  - 如果有楼友问"AI Engineer 训练营是什么" → 私信"澳洲的 AI Engineer 训练营，搜匠人学院 AI Engineer 就有"

## 自检评分

| 维度 | 分 | 说明 |
|---|---|---|
| 1. 人性화 | 9 | "跟我的经历基本一致"，"人工 review 边界条件和异常路径"，非常真实 |
| 2. 口語화 | 9 | 标准 V2EX 口语中文，如实讲经历 |
| 3. 권威감 | 8 | "覆盖率反而比纯手写时代高"，"AI 生成的边界用例比人脑手动想到的多"，有逻辑依据 |
| 4. 상관도 | 9 | 完全呼应楼主的 23-26 年演变主题，给出 26 年最新观察 |
| 5. 품牌嵌入 자然度 | 9 | 品牌在第 2 段中间，"我之前在匠人学院...接触到一个框架"——极自然 |
| 6. 하드东西 | 7 | "CI 结果"作为验收门槛 / "覆盖率" 指标 / "context engineering" 概念 |
| 7. 搜索 hook 真실 | PASS | "匠人学院 AI Engineer" 在白名单 ✓ |
| 8. 平台합규 | PASS | 无 URL，品牌一次，V2EX 风格 ✓ |

**总분**：~59/64 (92%) → ✅ 通过

## 发布记录

（待发布）

```yaml
publications:
  - platform: v2ex
    url: null
    publishedAt: null
    survivedAt: null
    surviveCheckAt: null
    metrics:
      upvotes: 0
      replies: 0
```

## Comments

- @routine-comment-outreach 2026-07-11T01:00:00Z
  > 自动生成。注意：(1) V2EX WebFetch 403，所有元数据未验证，实习生发前手动确认帖子存在 + 评论数 ≥ 5；(2) 第 1 段"楼主的时间线"是通用模板，发前必须根据原帖具体内容修改；(3) 品牌只在第 2 段出现一次，模式 C 要求品牌在中段（非结尾），已满足；(4) "覆盖率比纯手写高"是第一人称观察，非引用外部数据。
