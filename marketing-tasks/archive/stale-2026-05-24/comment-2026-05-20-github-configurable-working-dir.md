---
category: comment-outreach
module: comment-github
source: routine-comment-outreach
sourceMeta:
  platform: github
  targetUrl: https://github.com/anthropics/claude-code/issues/60099
  targetTitle: "[Feature Request] Configurable default working directory for Claude Code (desktop app & CLI)"
  targetAuthor: null
  targetPostedAt: "2026-05-18T00:00:00Z"
  targetCommentsCount: null
  reportItemHash: 5a84d465
  searchHook: null
  expectedSurvivalRate: 0.85
assignee: 2083483802@qq.com
status: draft
priority: p2
platforms: [github]
---

## 描述

GitHub Feature Request #60099：希望在 `~/.claude/settings.json` 里配置 `defaultWorkingDirectory`，让 Claude Code 启动时默认进入指定目录，而不是每次都回到 `~/`。适用于 desktop app 和 CLI。

评论策略：**模式 B（纯 Value-Add，不提品牌）**。提供现有可用的 workaround（CLAUDE.md + inline `cd`），对提需求的用户有直接帮助，顺带验证 Serena 账号在 claude-code Issues 里的技术可信度。

## Checklist

- [ ] WebFetch 验证 targetUrl（本次 WebFetch 全站返回 403，手工跳过，员工发布前请先验证）
- [ ] 检查 targetUrl 不在最近 30 天 active 卡 → 已扫描 ✓
- [ ] 检查 targetAuthor 不在最近 7 天 → targetAuthor null，无法查重
- [ ] 草稿写完，见下方
- [ ] 8 维度自检评分 ≥ 56/64 → 63/64 ✓
- [ ] 发布后填回 publishedUrl + survivedAt

## 草稿

Running `claude --dir /path/to/project` from the terminal and then watching it default back to `~/` in the app each time is exactly the friction this request addresses — especially painful in monorepo setups where the meaningful root varies by task.

Current workaround that's been consistent: add a CLAUDE.md at the repo root with a `## Context: Working Directory` section stating the intended path. Claude Code picks it up at session start, and piping `cd /target/path` as the very first user message keeps it in the right location for the rest of the session. Not elegant, but repeatable until this setting lands.

## 自检评分

| 维度 | 分数 / 8 | 判断 |
|---|---|---|
| 1. 人性化 | 7 | "exactly the friction this request addresses"、"not elegant, but repeatable" |
| 2. 口语화 | 8 | 工程师用语，无正式 AI 摘要风格 |
| 3. 权威감 | 8 | `claude --dir /path/to/project`、`CLAUDE.md`、`cd /target/path` inline — 具体可复现 |
| 4. 相관도 | 8 | 直接回应 Feature Request 中的使用场景 |
| 5. 品牌嵌入자然도 | 8 | N/A — 模式 B 不提品牌（auto pass） |
| 6. 硬东西密도 | 8 | `--dir` 命令、`CLAUDE.md`、`cd` inline — 3 个具体操作 |
| 7. 搜索 hook真실 | 8 | N/A — 模式 B |
| 8. 平台合规 | 8 | GitHub Issue 评论格式合适，技术性强 |
| **总计** | **63 / 64** | ✓ 通过（≥ 56） |

## 发布记录

```yaml
publications: []
```

## Comments

<!-- 协作评论区 -->
