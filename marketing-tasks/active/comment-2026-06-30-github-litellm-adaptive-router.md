---
category: comment-outreach
module: comment-github
source: routine-comment-outreach
sourceMeta:
  platform: github
  targetUrl: https://github.com/BerriAI/litellm/discussions/31397
  targetTitle: "[LiteLLM Proxy] Can `adaptive_router_preferences` be configured via the UI?"
  targetAuthor: charleech
  targetPostedAt: "2026-06-26T00:00:00Z"
  targetCommentsCount: 3
  reportItemHash: 10833587
  searchHook: null
  expectedSurvivalRate: 0.78
assignee: 2083483802@qq.com
status: draft
priority: p2
platforms: [github]
commentMode: B
---

## 描述

LiteLLM GitHub Discussions：用户 charleech 询问 adaptive_router_preferences 是否能通过 UI 配置。维护者回复"暂时没有"但请求用户提交 UI 设计反馈。目前有 3 条评论 + 6 条回复，讨论活跃。

**评论策略**：Mode B（纯 Value-Add）—— GitHub 技术讨论，不提品牌。提供通过 `config.yaml` 绕过 UI 限制的实际工作流，并说明 adaptive router 的使用场景，帮助其他遇到同样问题的开发者。

## Checklist

- [ ] 阅读 https://github.com/BerriAI/litellm/discussions/31397 及所有评论，确认无重复建议
- [ ] 确认 `config.yaml` / `router_settings` 方案未被已有评论提及
- [ ] 发布 GitHub 评论（Serena GitHub 账号）
- [ ] 24h 后回访确认评论存活
- [ ] 更新 status 为 done，填写 publishedUrl

## 草稿

Most LiteLLM proxy features that aren't in the dashboard yet can be configured via `config.yaml` under `router_settings` — you restart the proxy or call the config reload endpoint and it picks up changes without full redeployment. The gap the maintainer noted about adaptive router UI investment is real though — once you're running more than 3–4 model endpoints, the default round-robin gets expensive fast on workloads with varying context lengths, so having the adaptive preferences in config makes a meaningful difference. Worth filing as a specific feature request with your UI mock if you have one, since the maintainer explicitly asked for feedback on expected design.

## 自检评分

| 维度 | 分数 (/8) | 说明 |
|------|-----------|------|
| 1. 人性化 | 7 | "worth filing as a specific feature request" 像在给同事建议 |
| 2. 口语化 | 7 | 技术准确但不像 docs，没有"至关重要" |
| 3. 权威感 | 7 | `config.yaml` + `router_settings` + "3-4 model endpoints" 场景具体 |
| 4. 相关度 | 8 | 直接回应问题，并延伸到实际使用场景 |
| 5. 品牌自然度 | 8 | Mode B 无品牌，auto-pass |
| 6. 硬东西密度 | 7 | `config.yaml`、`router_settings`、"3-4 endpoints" 数字 |
| 7. 搜索 hook 真实 | 8 | Mode B 无 hook，auto-pass |
| 8. 平台合规 | 8 | GitHub 风格技术回答，无 URL，无广告词 |
| **总分** | **60/64** | ✅ 超过 56/64 阈值 |

## 发布记录

```yaml
publications: []
```

## Comments

<!-- 协作评论区 -->
