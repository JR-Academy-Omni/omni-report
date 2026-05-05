# Marketing Tasks（任务文件 — Markdown 单一权威源）

> **架构**：`.md` 文件是原始数据 + git audit trail。MongoDB（jr-academy `marketingtasks` collection）是衍生查询索引层。
> 
> **完整规范**：[`../PRD_MARKETING_TASKS_ADMIN.md`](../PRD_MARKETING_TASKS_ADMIN.md)
> **配套**：[`../PRD_GEO_CONTENT_FACTORY.md`](../PRD_GEO_CONTENT_FACTORY.md)（74 话题源）+ [`../BELLA_GEO_TASKS.md`](../BELLA_GEO_TASKS.md) + [`../SERENA_GEO_TASKS.md`](../SERENA_GEO_TASKS.md)

---

## 目录结构

```
marketing-tasks/
├── README.md                           # 本文档
├── _config/
│   └── routing-table.json              # Module → 默认 assignee 路由表
├── active/                             # 进行中（status != archived）
│   └── {category-prefix}-{topicId-or-slug}-{short-desc}.md
└── archive/                            # 归档（done + archived）
    └── {YYYY-MM}/
        └── ...
```

## 文件命名规则

```
{category-prefix}-{topicId-or-slug}-{short-desc}.md
```

| Prefix | Category |
|---|---|
| `geo-` | GEO_CONTENT |
| `redbook-` | SOCIAL_REDBOOK |
| `video-` | SOCIAL_VIDEO |
| `weixin-` | WEIXIN_PUBLIC |
| `seo-` | SEO_OPTIMIZATION |
| `aivis-` | AI_VISIBILITY_FIX |
| `topic-` | CONTENT_TOPIC |
| `competitor-` | COMPETITOR_ACTION |
| `growth-` | GROWTH_HACK |
| `event-` | EVENT_OFFLINE |
| `campaign-` | CAMPAIGN |
| `partnership-` | PARTNERSHIP |
| `kol-` | KOL_COLLABORATION |
| `taobao-` | TAOBAO_OPS |
| `cross-` | CROSS_TEAM |
| `adhoc-` | AD_HOC |

## 文件格式（YAML frontmatter + 5 个固定 H2 section）

```markdown
---
id: 65f1a2b3c4d5e6f7a8b9c0d1            # MongoDB ObjectId（首次写入时生成）
title: "..."
category: geo-content
module: geo-csdn
source: prd-geo-content-factory
sourceMeta:
  topicId: B5
  reportItemHash: a1b2c3d4              # 防 routine 重复 import
assignee: serena@jiangren.com.au         # email，后端 lookup 转 ObjectId
reviewer: null
status: draft
priority: p2
platforms: [csdn]
wordCount: 4000
estimatedHours: 12
dueDate: null
tags: []
createdBy: lightman@jiangren.com.au
createdAt: 2026-05-04T12:00:00+08:00
updatedAt: 2026-05-04T12:00:00+08:00
---

## 描述

任务核心内容（取自 PRD §3 "核心内容"列）

## Checklist

- [ ] 改写 30%
- [ ] 跑 originality.ai 自检
- [ ] 登录账号发布
- [ ] 填发布 URL

## 草稿

（textarea content / 或链接到 omni-report/geo-content-factory/drafts/...md）

## 发布记录

（暂无）

## Comments

（暂无）
```

## 写入路径（3 条）

1. **PRD import** — Admin "导入 PRD" 按钮 → 解析 `PRD_GEO_CONTENT_FACTORY.md` 9 个 pipe table → 写 N 个 .md
2. **Routine 写入** — 4 条 omni-report routine 跑完后解析自己的 actionable items → 写 N 个 .md（带 reportItemHash 防重）
3. **Admin UI 操作** — 拖拽改 status / 加 checklist / 加发布记录 → API 事务性 改 .md + 同步 MongoDB + git commit

### Routine 集成脚本

| Routine | 脚本 | 输出前缀 | 解析规则 |
|---|---|---|---|
| `ai-visibility/{date}.md` | [`scripts/ai-visibility-to-tasks.ts`](../scripts/ai-visibility-to-tasks.ts) | `aivis-` | §推荐行动清单 pipe table（5 条） |
| `competitor-reports/{date}.md` | [`scripts/competitor-to-tasks.ts`](../scripts/competitor-to-tasks.ts) | `competitor-` | §对 JR Academy 的建议 numbered list（3 条） |
| `growth-playbook/{date}.md` | [`scripts/growth-playbook-to-tasks.ts`](../scripts/growth-playbook-to-tasks.ts) | `growth-` | ## 玩法 ①-⑤（5 条；本周做？✅ → p0） |
| `marketing-topics/{date}.md` | [`scripts/marketing-topics-to-tasks.ts`](../scripts/marketing-topics-to-tasks.ts) | `topic-` | 4 子节：讲座/活动/联名/常青（共 14 条；🔴 本周 → p0；不解析「外部热点」） |

每个脚本都接受 `[file-path]` 可选参数；不传则自动选最新日期。带 `reportItemHash` 唯一去重，重跑同一份周报不会产生重复任务。

```bash
# 一键全跑（每周 routine 出报告后）
cd omni-report
bun run scripts/ai-visibility-to-tasks.ts
bun run scripts/competitor-to-tasks.ts
bun run scripts/growth-playbook-to-tasks.ts
bun run scripts/marketing-topics-to-tasks.ts
```

## Git commit 策略

| 操作 | 是否 commit | 消息格式 |
|---|---|---|
| 创建任务 | ✅ 立即 | `chore(marketing-tasks): create {id} {title}` |
| Status 流转 | ✅ 立即 | `chore(marketing-tasks): {id} {old} → {new}` |
| 加发布记录 / 加 comment | ✅ 立即 | `chore(marketing-tasks): publication on {id}` |
| Checklist 勾选 | ❌ 不立即 | 每天定时 squash commit |

## 重建 MongoDB

```bash
cd jr-academy
bun run scripts/marketing-task-reindex.ts
```

效果：删除 MongoDB `marketingtasks` collection 全部记录 → 扫描 `marketing-tasks/{active,archive}/**/*.md` → 全部 upsert 重建。**完全无损**。

## 冲突解决

`.md` 与 MongoDB 不一致 → **永远以 .md 为准**。watcher 重新解析 .md → 覆盖 MongoDB。
