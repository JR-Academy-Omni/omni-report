---
id: 000000000000000000000000
title: "提交 `jiangren.com.au/learn/context-engineering` 至 Google Search Console URL Inspection"
category: ai-visibility-fix
module: seo-404-fix
source: routine-ai-visibility
sourceMeta:
  reportPath: ai-visibility/2026-05-06.md
  reportSection: 推荐行动清单 #1
  reportItemHash: 6fc436139b54
assignee: TBD-tech-fix
reviewer: null
status: draft
priority: p0
platforms: []
wordCount: null
estimatedHours: null
actualHours: null
dueDate: null
tags:
  - imported-from-routine
  - ai-visibility
  - Q19
createdBy: TBD-system
createdAt: 2026-05-07T10:59:58.632Z
updatedAt: 2026-05-08T07:01:31.000Z
derivedFrom: null
---
## 描述

提交 `jiangren.com.au/learn/context-engineering` 至 Google Search Console URL Inspection，强制重新抓取；同时确认 `uat.jiangren.com.au` 已设置 `noindex: true`（UAT 版本不应出现在生产 SERP）；并在首页或 AI Engineer 课程页添加内链指向该落地页

**解决哪个 query**：Q19 Context Engineering 怎么学

**预估工作量**：15 分钟（SEO 工程师执行）

**预估 ROI**：极高（页面已存在且内容完整，唯一障碍是索引延迟；每天在烧机会成本，竞品 authority 累积不可逆）

## Checklist

- [ ] 确认任务范围 + 分配 owner
- [ ] 执行核心动作
- [ ] 验证完成（截图 / URL）
- [ ] 4 周后回看 ai-visibility 周报，确认对应 query 提及率/排名变化

## 草稿

### 一、GSC URL Inspection 操作 SOP（执行人 copy-paste 即可）

**目标 URL**：`https://jiangren.com.au/learn/context-engineering`

**步骤**：

1. 登录 [Google Search Console](https://search.google.com/search-console) → 选择 property `jiangren.com.au`
2. 顶部搜索框粘贴：`https://jiangren.com.au/learn/context-engineering`
3. 等待返回结果（通常 5-15s），看「URL is on Google」状态
   - 若显示 ❌ "URL is not on Google" → 点 **"Request Indexing"**
   - 若显示 ✅ "URL is on Google" 但有 warning（mobile usability / structured data） → 先修 warning 再 request
4. 点完 Request Indexing 会弹「Testing if live URL can be indexed」(1-2 min) → 完成后返回「Indexing requested」即成功
5. 截图存 `~/Downloads/gsc-context-engineering-{YYYYMMDD}.png`，上传到本任务 `## 发布记录`

**注意**：每个 URL 一天只能 request 一次；24-72h 内 Google 会重新抓取，但实际 ranking 改善看 4-8 周。

### 二、UAT noindex 校验 SOP

**检查命令**（本地终端跑）：

```bash
curl -sI https://uat.jiangren.com.au/learn/context-engineering | grep -i "x-robots-tag\|robots"
curl -s https://uat.jiangren.com.au/learn/context-engineering | grep -i '<meta name="robots"'
```

**期望输出**：至少一项包含 `noindex`（`X-Robots-Tag: noindex` 或 `<meta name="robots" content="noindex">`）

**若没有**：

- 检查 `jr-academy-web-zh/next.config.js` 是否对 `process.env.DEPLOY_ENV === 'uat'` 注入 `X-Robots-Tag: noindex` header
- 或在 `app/layout.tsx` 根据 env 输出 `<meta name="robots" content="noindex" />`
- 修完触发 Jenkins UAT 重新部署，再跑一次上面的 curl 验证

### 三、内链补充（让首页/课程页指向落地页）

**位置 1：首页 `/`**
- 在「学习路径」/「热门主题」模块，加一张 Context Engineering 入口卡片，链接到 `/learn/context-engineering`
- Anchor text：`Context Engineering 怎么学 →`

**位置 2：AI Engineer 课程页 `/bootcamp/ai-engineer`**
- 在 lesson 列表附近加一段："想先看 Context Engineering 是什么？看 [免费学习路径](/learn/context-engineering)"

**PR 描述模板（提交时用）**：

```
fix(seo): 补 /learn/context-engineering 内链 + UAT noindex

- 解决 GSC Q19 query "Context Engineering 怎么学" 索引延迟
- 首页新增 Context Engineering 入口卡片
- AI Engineer 课程页新增反链
- 校验 UAT 已 noindex（避免和 prod 重复内容）

ref: omni-report/marketing-tasks/active/aivis-2026-05-06-01
```

### 四、4 周后回看模板（贴回本任务）

```
回看日期：2026-06-06
- GSC impressions（前 4 周 vs 后 4 周）：__ → __
- Q19 提及率（ai-visibility 周报）：__ → __
- 结论：✅ 改善 / ⚠️ 持平 / ❌ 恶化（需进一步排查）
```

## 发布记录

（暂无）

## Comments

- @system 2026-05-07T10:59:58.632Z
  > 由 `omni-report/scripts/ai-visibility-to-tasks.ts` 自动从 ai-visibility 周报第 1 条建议生成。
