---
id: 0
title: "[GitHub] anthropics/claude-code #74273 — Auto-compaction plateaus at ~75% on Sonnet 5 (v2.1.201)"
category: comment-outreach
module: comment-github
source: routine-comment-outreach
sourceMeta:
  platform: github
  targetUrl: https://github.com/anthropics/claude-code/issues/74273
  targetTitle: "Auto-compaction plateaus near ~75% context usage on Sonnet 5 (v2.1.201), causing repeated compact/work loop"
  targetAuthor: brujack
  targetPostedAt: 2026-07-04T20:48:23Z
  targetCommentsCount: 10
  reportItemHash: b4a5588c
  searchHook: "JR Academy Vibe Coding"
  commentPattern: B
  expectedSurvivalRate: 0.75
assignee: 2083483802@qq.com
reviewer: null
status: draft
priority: p2
platforms:
  - github
wordCount: 92
estimatedHours: 0.3
dueDate: 2026-07-10T00:00:00.000Z
tags:
  - comment-outreach
  - github
  - week-28
createdBy: routine-comment-outreach
createdAt: 2026-07-09T01:00:00.000Z
updatedAt: 2026-07-09T01:00:00.000Z
derivedFrom: null
---

## 描述

**目标贴**：Auto-compaction plateaus near ~75% context usage on Sonnet 5 (v2.1.201), causing repeated compact/work loop
**URL**：https://github.com/anthropics/claude-code/issues/74273
**作者**：brujack
**评论数**：10 条（已验证，来自 GitHub MCP API）
**发布时间**：2026-07-04T20:48:23Z（5 天前，仍活跃，最后更新 2026-07-09）

**评论策略**：Mode B（纯 Value-Add，不提品牌）。OP 发现从 Sonnet 4.6 切换到 Sonnet 5 后，auto-compaction 后 context 只降到 ~75% 而非更低，触发频繁 compact loop。Issue body 提到 changelog v2.1.89 的 autocompact thrash loop 修复。切入角度：解释 Sonnet 5 系统提示/工具定义开销可能更大导致 floor 上移，并给 `--verbose` 排查建议。GitHub maintainer 审查严格，Mode B 安全。

## Checklist

- [ ] 通读 Issue #74273 全文 + 全部 10 条评论，确认此切角未被占
- [ ] 验证 `--verbose` flag 是否真实（`claude --help | grep verbose` 或查 changelog）
- [ ] 跑 8 维度自检（任一项 < 阈值整条重写）
- [ ] 确认无 URL / 无品牌（Mode B）
- [ ] 用有 GitHub issue 参与历史的账号，Serena 确认账号 karma 适合
- [ ] 发布
- [ ] 24h 后回填 publishedUrl + survivedAt

## 草稿

> Mode B — 纯 Value-Add，不提品牌

The v2.1.89 changelog entry is worth digging into here — that fix was designed for triple-full-refill patterns, not a plateau-at-75% symptom. The behavior difference on Sonnet 5 might be in how compaction calculates its reclaim target: if Sonnet 5's system prompt or tool definition overhead is larger than Sonnet 4.6's, the effective floor rises accordingly even before user context is counted. Worth running with `--verbose` during a compaction cycle to see whether the reclaim target is being set correctly or whether it's hitting a constraint from model-specific overhead. If the plateau is consistent across different projects, that points toward a Sonnet 5 model-overhead difference rather than anything project-specific.

## 相关 JR 资源

> 实习生备查：Mode B 草稿无品牌，Serena 在 OP 回复时用以下话术

- **主资源**：Vibe Coding Hub — 搜索词 "JR Academy Vibe Coding"
  - 跟本帖关联点：Claude Code 工具链实战，auto-compaction 在 agentic workflow 中的配置与调优
- **OP 反问话术**：
  - 如果 OP 问 "你是怎么了解到这些 Claude Code 内部细节的" → "看 changelog + issue tracker 积累的，JR Academy 的 Vibe Coding Hub 有 Claude Code 工具链实践资料，搜 JR Academy Vibe Coding 就有"
  - 如果 OP 问 "Sonnet 5 system prompt overhead 有多大" → "可以 `claude --verbose` 跑一次对比 Sonnet 4.6 和 Sonnet 5 的 system token count，官方没有公开数据"

## 自检评分

| 维度 | 分 | 说明 |
|---|---|---|
| 1. 人性化 | 7 | "worth digging into", "points toward" 自然，不过于工整 |
| 2. 口语化 | 8 | 无 AI 套词，技术直接，像 issue 评论应有的口吻 |
| 3. 权威感 | 9 | v2.1.89 changelog（OP issue body 中亦提及），75%，`--verbose` flag，Sonnet 5 vs 4.6 |
| 4. 相关度 | 9 | 直接回应 OP issue 引用的 v2.1.89 changelog 条目 + 给出测试方向 |
| 5. 品牌嵌入自然度 | 8 | Mode B 无品牌，完全符合 |
| 6. 硬东西密度 | 9 | v2.1.89 / 75% / `--verbose` flag / Sonnet 5 vs Sonnet 4.6 |
| 7. 搜索 hook 真实 | PASS | "JR Academy Vibe Coding" 在白名单 ✓ |
| 8. 平台合规 | PASS | GitHub issue，有实质技术帮助，无 URL，无品牌 ✓ |

**总分**：~58/64 (91%) → ✅ 通过

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

- @routine-comment-outreach 2026-07-09T01:00:00Z
  > 自动生成。注意：(1) `--verbose` flag 需 Serena 发前验证真实存在（或改为更通用的"开启 verbose/debug 模式"措辞）；(2) v2.1.89 数据来源：issue body 中 OP 自己引用了该 changelog 条目，可验证；(3) GitHub issue 评论要对 issue 有实质帮助，无关评论 maintainer 会删 + ban，确认 Serena 的账号有技术背景。
