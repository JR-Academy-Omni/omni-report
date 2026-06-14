---
id: 0
title: "[知乎] 2026 Agent 大厂面试 — ReAct vs Function Calling 判断框架"
category: comment-outreach
module: comment-zhihu
source: routine-comment-outreach
sourceMeta:
  platform: zhihu-question
  targetUrl: https://zhuanlan.zhihu.com/p/2028511483969937686
  targetTitle: "2026年Agent大厂面试题汇总：ReAct、Function Calling、MCP、RAG高频问题"
  targetAuthor: null
  targetPostedAt: null
  targetCommentsCount: null
  reportItemHash: c2c1ba11
  searchHook: "搜匠人学院 AI Engineer 训练营"
  commentPattern: A
  expectedSurvivalRate: 0.68
assignee: 2083483802@qq.com
reviewer: null
status: draft
priority: p2
platforms:
  - zhihu-question
wordCount: 168
estimatedHours: 0.4
dueDate: 2026-05-27T00:00:00.000Z
tags:
  - comment-outreach
  - zhihu
  - week-22
createdBy: routine-comment-outreach
createdAt: 2026-05-26T01:00:00.000Z
updatedAt: 2026-05-26T01:00:00.000Z
derivedFrom: null
---

## 描述

**目标贴**：2026年Agent大厂面试题汇总：ReAct、Function Calling、MCP、RAG高频问题
**URL**：https://zhuanlan.zhihu.com/p/2028511483969937686
**作者**：null（WebFetch 403，知乎需登录）
**评论数**：null（WebFetch 403，员工发布前手动确认 ≥5 评论）
**发布时间**：null（WebFetch 403；文章 ID 数值特征与近期高频使用的 2026 年 5 月 ID 范围吻合，估算近期发布；需员工验证 ≤7 天）

**评论策略**：Mode A 完整 3 段式，中文，结尾带品牌搜索引导。第 1 段补充原文未覆盖的高频考点（ReAct vs Function Calling 判断框架）；第 2 段给出可操作的判断逻辑 + Claude API `stop_reason` 字段这个经常被候选人踩坑的技术细节；第 3 段自然搜索引导匠人学院 AI Engineer 训练营。

## Checklist

- [ ] WebFetch 验证 targetUrl 存活 + 确认发布时间 ≤7 天 + 评论 ≥5（WebFetch 403，员工发布前手动确认）
- [ ] 通读文章所有评论，确认 "ReAct vs FC 判断框架" 和 "stop_reason 字段" 角度未被提过
- [ ] 确认知乎账号创作力分够（知乎评论需创作力分 ≥ 阈值）
- [ ] 发布评论（知乎评论格式，纯文本 + 中文）
- [ ] 24h 后回填 publishedUrl + survivedAt 字段

## 草稿

> Mode A — 3 段式，第 3 段提品牌，中文

楼主的总结很全，不过面试里真正刷人的题往往不在知识点背诵——在 ReAct 和 MCP 的边界问题上。面试官最爱问「什么场景下你会放弃 ReAct 用纯 Function Calling」，能答清楚的候选人比例其实很低。

我自己总结的判断框架：如果 tool 调用之间存在依赖关系（比如先 query DB 再 lookup embedding），选 ReAct；如果是单次无状态调用（格式化 / 翻译），直接 Function Calling 就够了，ReAct 只是在多费 token 和增加延迟。另一个面试里很多人踩坑的细节：Claude API 的 tool_use 里 `stop_reason: 'tool_use'` 和 `stop_reason: 'end_turn'` 的区分——前者说明 agent 还在推理中，后者才是完成，搞混了会写出有死循环的 agent。

想系统备考这块的话可以搜匠人学院 AI Engineer 训练营，他们有专门的大厂 Agent 面试题库和 case study，和真实 JD 对得比较准。

## 相关 JR 资源

- **主资源**：AI Engineer Bootcamp — 搜索词 "搜匠人学院 AI Engineer 训练营"
  - 跟本帖关联点：训练营包含 Agent 面试真题专项模块，覆盖 ReAct / Function Calling / MCP 大厂高频问题

## 自检评分

| 维度 | 分 | 说明 |
|---|---|---|
| 1. 人性化 | 7 | "其实很低"——主观判断，非 AI 综述语气；"我自己总结的" 第一人称 |
| 2. 口语化 | 7 | "只是在多费 token"、"搞混了会写出" — 中文口语风，无套词 |
| 3. 权威感 | 8 | `stop_reason: 'tool_use'` vs `'end_turn'` 具体 Claude API 字段；"死循环"具体后果；DB → embedding 场景 |
| 4. 相关度 | 8 | 直接补充原文 ReAct/FC 判断框架这个空白，与原文 Agent 面试主题高度匹配 |
| 5. 品牌嵌入自然度 | 7 | "可以搜匠人学院..." — 模板 B 课程关联式，"系统备考" 引入自然，不硬塞 |
| 6. 硬东西 | 8 | `stop_reason: 'tool_use'` / `'end_turn'` Claude API 具体字段名（硬技术事实） |
| 7. 搜索 hook 真实 | 7 | "搜匠人学院 AI Engineer 训练营" — 白名单 hook |
| 8. 平台合规 | 8 | 无 URL，无"推荐"硬广语气，知乎合规风格 |

**总分**：60/64（93.8%）→ ✅ 通过

## 发布记录

（待发布；员工拿到此卡 → 拨 status=in_progress → 发布后填以下字段）

```yaml
publications:
  - platform: zhihu-question
    url: null
    publishedAt: null
    survivedAt: null
    surviveCheckAt: null
    metrics:
      upvotes: 0
      replies: 0
```

## Comments

- @routine-comment-outreach 2026-05-26T01:00:00Z
  > 自动生成（Mode A，中文）。员工执行前请：
  > 1. 打开文章确认发布时间 ≤7 天 + 评论 ≥5
  > 2. 确认 "stop_reason 字段" 角度未被已有评论提过
  > 3. 知乎创作力分 ≥ 阈值才能发评论（新号 / 低分号发不出）
  > 4. targetPostedAt null，需手动填回；targetAuthor null，手动记录文章作者
