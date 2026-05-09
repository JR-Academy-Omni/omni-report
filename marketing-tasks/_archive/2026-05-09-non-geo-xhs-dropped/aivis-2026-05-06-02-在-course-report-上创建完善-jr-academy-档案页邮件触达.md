---
id: 000000000000000000000000
title: 在 Course Report 上创建/完善 JR Academy 档案页
category: ai-visibility-fix
module: partnership-negotiate
source: routine-ai-visibility
sourceMeta:
  reportPath: ai-visibility/2026-05-06.md
  reportSection: 推荐行动清单 #2
  reportItemHash: 66da48313345
assignee: 1134583264@qq.com
reviewer: null
status: draft
priority: p1
platforms: []
wordCount: null
estimatedHours: null
actualHours: null
dueDate: null
tags:
  - imported-from-routine
  - ai-visibility
  - Q3
  - Q7
  - Q8
  - Q10
createdBy: TBD-system
createdAt: 2026-05-07T10:59:58.633Z
updatedAt: 2026-05-08T07:01:31.000Z
derivedFrom: null
---
## 描述

在 Course Report 上创建/完善 JR Academy 档案页，邮件触达最近 3 期毕业生请求留下英文评价（目标：30 条，4 周内）

**解决哪个 query**：Q3 best AI bootcamp beginners、Q7 best Sydney、Q8 Australian bootcamp、Q10 job placement

**预估工作量**：中（2 天设置 + 4 周持续收集）

**预估 ROI**：高（这 4 个 query 的根本原因都是 Course Report 收录不足；修一次解决 4 个高意向购买 query）

## Checklist

- [ ] 确认任务范围 + 分配 owner
- [ ] 执行核心动作
- [ ] 验证完成（截图 / URL）
- [ ] 4 周后回看 ai-visibility 周报，确认对应 query 提及率/排名变化

## 草稿

### 一、Course Report 档案页操作 SOP

**Step 1 — 申请档案**

1. 打开 [Course Report Add Your School](https://www.coursereport.com/about/add-your-school)
2. 用 `marketing@jiangren.com.au` 提交申请（已有档案则跳到 Step 2）
3. 表单字段（直接 copy）：

| 字段 | 内容 |
|------|------|
| School Name | JR Academy |
| Website | https://jiangren.com.au/en |
| Headquarters | Sydney, Australia |
| Locations | Sydney, Melbourne, Brisbane, Online |
| Founded | 2017 |
| Programs | AI Engineer Bootcamp, Full-Stack Development, Cloud Engineering, Vibe Coding |
| Tuition Range | AUD $4,800 – $12,800 |
| Financing Options | Upfront / Installment / Income-based payment plan |
| Job Guarantee | No (mentor-supported job hunting included) |
| Description | JR Academy is an Australia-based career bootcamp focused on AI Engineering, full-stack development and cloud skills for working professionals and international students transitioning into tech. Programs combine live cohort teaching, real-world capstone projects with industry partners, and 1-on-1 career coaching. Alumni placed at Atlassian, Canva, Telstra, Westpac, Microsoft Australia. |

**Step 2 — 完善档案细节**（如已存在）

- Logo（PNG 透明背景，512x512）：从 `jr-academy-web-zh/public/logo-jr-academy.png` 取
- Cover photo（1920x600）：用最近一期毕业典礼的现场照（找运营要）
- Curriculum overview：每个 program 一段 80 词以内的英文描述（参考 `jiangren.com.au/en/bootcamp/{slug}`）
- Outcomes：插入近 12 个月 placement rate（找学服要数据，例 "78% within 6 months, average AUD $89k"）

**Step 3 — Verified Reviewer Program**

- 申请「Verified School」标签（Course Report 邮件回复会发表单）
- 同意 Course Report 直接联系毕业生收集评价

### 二、毕业生触达邮件模板（直接 copy 粘到 Mailchimp/SendGrid）

**Subject**：Could you help us get found by the next student like you? (5 min, your story matters)

**Body**：

```
Hi {{first_name}},

You finished {{program_name}} in {{cohort_month}} and (from what we hear from your mentor) things have been going well — congrats again on the {{job_title}} role at {{company}}.

I'm writing because we're trying to fix a small but painful problem: when prospective students Google "best AI bootcamp Australia" or "Sydney coding bootcamp", JR Academy doesn't show up because we have almost no reviews on Course Report — the platform Google trusts for bootcamp rankings.

Your honest review (good, bad, or in-between) would help the next student like you find us. It takes about 5 minutes.

Here's the direct link:
👉 https://www.coursereport.com/schools/jr-academy/reviews/new

A few prompts in case you're stuck:
• What was the hardest part of the program?
• What did you learn that you actually use at work now?
• Would you do it again? Why / why not?

Honest reviews — including critical ones — help us more than glowing ones, because they're the ones future students trust.

Thank you,
{{sender_name}}
JR Academy
```

**触达节奏**（4 周计划）：

| 周次 | 动作 | 目标 |
|------|------|------|
| W1 | 第一封邮件给最近 3 期 cohort（约 90 人） | 收 12 条 |
| W2 | 第二封提醒（仅没回复的人，subject 改成 "{{first_name}}, gentle reminder ⏰"） | 再收 8 条 |
| W3 | 给 mentor 列表，让 mentor 在 1-on-1 时口头提一句 | 再收 6 条 |
| W4 | 校友群（Slack/微信）broadcast + 抽 3 人送 AUD $50 礼品卡 | 再收 4 条 |
| 合计 |  | **30 条** |

### 三、追踪表（贴回本任务 / 同步到 ops Notion）

| 周次 | 发送数 | 回复数 | Course Report 新增 review | 累计 review |
|------|--------|--------|---------------------------|-------------|
| W1 |  |  |  |  |
| W2 |  |  |  |  |
| W3 |  |  |  |  |
| W4 |  |  |  |  |

### 四、合规提示

- ❌ 不要写 "leave us a 5-star review" / 不要承诺金钱换好评（违反 Course Report TOS + ACCC）
- ✅ 可以送礼品卡感谢「写了评价的人」，但不能挂钩评价内容/分数
- 所有邮件必须有 unsubscribe footer（用 Mailchimp/SendGrid 默认即可）

## 发布记录

（暂无）

## Comments

- @system 2026-05-07T10:59:58.633Z
  > 由 `omni-report/scripts/ai-visibility-to-tasks.ts` 自动从 ai-visibility 周报第 2 条建议生成。
