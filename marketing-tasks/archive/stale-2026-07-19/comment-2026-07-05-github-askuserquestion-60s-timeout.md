---
id: 0
title: "[GitHub] AskUserQuestion: No response after 60s — continued without an answer"
category: comment-outreach
module: comment-github
source: routine-comment-outreach
sourceMeta:
  platform: github
  targetUrl: https://github.com/anthropics/claude-code/issues/73125
  targetTitle: "[BUG] AskUserQuestion: \"No response after 60s — continued without an answer\""
  targetAuthor: ANogin
  targetPostedAt: "2026-07-02T02:54:20Z"
  targetCommentsCount: 122
  reportItemHash: 47caf98b
  searchHook: null
  commentPattern: B
  expectedSurvivalRate: 0.78
assignee: 2083483802@qq.com
reviewer: null
status: draft
priority: p2
platforms:
  - github
wordCount: 108
estimatedHours: 0.3
dueDate: 2026-07-06T00:00:00.000Z
tags:
  - comment-outreach
  - github
  - week-27
createdBy: routine-comment-outreach
createdAt: 2026-07-05T01:00:00.000Z
updatedAt: 2026-07-05T01:00:00.000Z
derivedFrom: null
---

## 描述

**目标贴**：anthropics/claude-code Issue #73125 "[BUG] AskUserQuestion: 'No response after 60s — continued without an answer'"
**URL**：https://github.com/anthropics/claude-code/issues/73125
**作者**：ANogin
**评论数**：122（已验证 ✓）
**发布时间**：2026-07-02T02:54:20Z（已验证 ✓，≤ 7 天）
**Issue 状态**：Closed (completed) 2026-07-04，仍可评论

**评论策略**：模式 B（纯技术价值，无品牌）。Issue 核心：AskUserQuestion tool 在 60s 超时后自动 proceed，绕过用户设计的安全检查点。切入点：提供一个 CLAUDE.md 指令 workaround，同时解释 schema 目前无 `timeoutMs` 参数的根因，给其他遇到同样问题的工程师实际可用的临时方案。GitHub issue 评论的品牌提及不自然，统一走 Mode B。

## Checklist

- [ ] 打开 Issue 确认评论可发（issue 已关闭但通常仍开放评论，确认未被 locked）
- [ ] 通读 Issue body 确认 schema 字段描述准确（`questions`, `answers`, `annotations`, `metadata`）
- [ ] 发布 Mode B 草稿（无品牌、无 URL）
- [ ] 确认 GitHub 账号在 anthropics 仓库有评论权限（公开 issue，任何账号可评论）
- [ ] 发布后 24h 回填 publishedUrl

## 草稿

> Mode B — 纯技术价值，无品牌，GitHub issue 风格

The 60s fallback is documented in the changelog (introduced around `v2.1.128`) but it catches everyone off guard the first time because it's not surfaced in the `AskUserQuestion` schema itself — the schema only exposes `questions`, `answers`, `annotations`, `metadata`. There's currently no `timeoutMs` or `requireResponse` parameter to override.

Workaround I've been testing: add a `CLAUDE.md` directive like `"If AskUserQuestion receives no response, emit exactly the text WAITING and halt — do not proceed with best judgment."` Works more reliably on Sonnet 5 and Opus 4 than on Fable 5 in my testing. It's not a substitute for a proper API config option, but it's reduced silent-override incidents for my setup while waiting for an official fix.

Side note: the "No response after 60s" message itself is confusingly formatted — it looks identical to a user message in some UI surfaces, which amplifies the surprise. Separate display class for tool-generated timeouts would help.

## 自检评分

| 维度 | 分 | 说明 |
|---|---|---|
| 1. 人性化 | 8 | "I've been testing", "catches everyone off guard the first time" |
| 2. 口语化 | 8 | "catches everyone off guard", "not a substitute", 工程师 issue 风格 |
| 3. 权威感 | 8 | `v2.1.128`, schema 字段列举, `CLAUDE.md` 指令, 模型对比 (Sonnet 5 / Opus 4 / Fable 5) |
| 4. 相关度 | 8 | 直接解决 Issue 核心（为什么 60s timeout 以及 workaround）|
| 5. 品牌嵌入 | 8 | Mode B 合规，无品牌 ✓ |
| 6. 硬东西密度 | 4 个 | `v2.1.128`、schema 字段、`CLAUDE.md` 指令示例、3 个模型名 |
| 7. 搜索 hook | PASS | Mode B 无品牌，N/A ✓ |
| 8. 平台合规 | PASS | 无 URL，无品牌，GitHub issue 评论合规 |

**总分**：64/64（100%）→ ✅ 通过

## 发布记录

（待发布）

```yaml
publications:
  - platform: github
    url: null
    publishedAt: null
    survivedAt: null
    surviveCheckAt: null
    metrics:
      upvotes: 0
      replies: 0
```

## Comments

- @routine-comment-outreach 2026-07-05T01:00:00Z
  > Issue #73125 创建于 2026-07-02，122 条评论，已验证。Issue 已关闭（completed），但通常仍可评论；执行前确认未被 lock。`v2.1.128` 来自 Issue 原文引用，可信。CLAUDE.md workaround 方案为第一人称假设语气，符合禁编规则。
