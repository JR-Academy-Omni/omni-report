---
id: 0
title: Enterprise Agent Governance 实战：用 Agent 365 给你的 AI 系统加锁
category: campaign
module: ad-hoc-task
source: routine-marketing-topics
sourceMeta:
  reportPath: marketing-topics/2026-05-04.md
  reportSection: 推荐线上讲座
  reportItemHash: 9a4d38056ecc
assignee: 2838684082@qq.com
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
  - marketing-topics
  - webinar
createdBy: TBD-system
createdAt: 2026-05-05T02:08:43.463Z
updatedAt: 2026-05-05T02:08:43.463Z
derivedFrom: null
---
## 描述

**Enterprise Agent Governance 实战：用 Agent 365 给你的 AI 系统加锁**

**形式**：Zoom Webinar（90 min）

**嘉宾建议**：JR AI Engineer Bootcamp 主讲讲师（主持，提前在 Agent 365 沙箱跑通访问控制 + 审计日志 Demo）+ 1 位在企业落地过 AI Agent 的学员/校友（10 min 真实案例）

**30 字简介**：从 Agent 365 GA 出发拆三层：注册/发现 Agent → 设置权限策略 → 审计日志读取；现场演示一个没治理的 Agent 会出什么问题；对比 AWS Bedrock AgentCore 定价；结束给「企业 AI Agent 上线 Checklist」PDF，Bootcamp 报名引流

**紧迫度**：🔴 本周

**紧迫度**：🔴 本周

## Checklist

- [ ] 确认讲师 + 嘉宾档期
- [ ] 准备 Demo + slides + 报名落地页
- [ ] 各渠道预热推广（公众号 / 社群 / LinkedIn）
- [ ] 直播执行 + 录播剪辑
- [ ] 复盘报名转化 + 写到下周内容选题包

## 草稿

### 报名落地页文案（用于 jiangren.com.au/events/{slug}）

**主标题**：Enterprise Agent Governance 实战：用 Agent 365 给你的 AI 系统加锁

**副标题**：90 分钟 Live Demo + 现场审计日志拆解 + 「企业 AI Agent 上线 Checklist」PDF 带走

**核心钩子（直接放 Hero）**：

> 你的团队已经有 3 个 LLM Agent 跑在生产了，谁批准它们调用客户数据？哪个 Agent 上周凌晨 2 点 burn 了 $400 的 token？没人能答上来——那这场就是给你的。

**你将带走**：

- ✅ Agent 365 沙箱里跑通的 3 个治理场景（注册 / 权限 / 审计）的回放视频
- ✅ 「企业 AI Agent 上线 Checklist」PDF（共 24 项，覆盖 Pre-prod / Prod / Post-incident）
- ✅ 与 AWS Bedrock AgentCore 的定价对比表（按 1k DAU 估算）
- ✅ 1 位真实落地校友的踩坑记录

**适合谁**：

- 在公司里推动 AI Agent 上线的工程师 / 架构师
- 已经有 1+ Agent 跑生产、被 security/compliance 团队 challenge 过的人
- 想搞 AI Engineer 转型、希望看「企业级」长什么样的在校生

**议程**（90 min）：

| 时长 | 内容 |
|------|------|
| 0-10 | 反面案例：一个失控 Agent 的 24 小时（真实事故复盘） |
| 10-30 | Agent 365 三层治理：注册 / 发现 / 权限策略 |
| 30-50 | Live Demo：从 0 给一个 Agent 加访问控制 + 审计日志 |
| 50-65 | 校友 Case：在 X 公司怎么过的 InfoSec review |
| 65-80 | 对比 AWS Bedrock AgentCore（成本 / 锁定 / 多云） |
| 80-90 | Q&A + Bootcamp 介绍 |

**报名 CTA**：免费报名 →（邮箱即可，开播前 24h 发 Zoom 链接）

---

### 公众号预热文案（800 字版，发活动前 7 天）

**标题**：你的 Agent 上周凌晨 2 点烧了 $400，没人知道

**正文**：

上周朋友的团队遇到一件事：早上 9 点 standup，CFO 拍着桌子问「昨晚 OpenAI 账单为什么涨了 4 倍」。工程团队查了 2 个多小时——是某个跑在 cron 里的 Agent，prompt 模板被人改了一个变量，无限循环调 GPT-4o，烧到限流才停。

没有审计日志。没有权限隔离。没人知道是谁改的、什么时候改的。

这不是技术菜，这是**没有 governance**。

---

过去一年我们看到大量团队从「Agent demo」走到「Agent 上生产」，几乎每家都在踩同一组坑：

1. **谁能调用谁** —— Agent A 突然能读 Agent B 的客户数据库，没人记得这个权限是哪天加的
2. **改了什么** —— Prompt / tool list / model 被改了一个字，半夜出问题
3. **花了多少** —— 月底账单是个谜，按团队拆不开

11 月 Agent 365 GA 了，把这三件事第一次做到 enterprise-grade：注册中心、策略引擎、审计日志，跟 IAM 一个思路。我们这周做一场 Live Demo，把 Agent 365 沙箱里的三个治理场景从 0 跑一遍，过程中用一个**故意没治理的 Agent**做反面教材，看它怎么一步步变成 incident。

90 分钟，结束发「企业 AI Agent 上线 Checklist」PDF（24 项实操），还有跟 AWS Bedrock AgentCore 的定价对比。

适合：已经有 Agent 跑在生产、被 security review 过、或者下周要被 review 的工程师。

报名免费，链接在阅读原文 / 文末扫码。

—— JR AI Engineer Bootcamp 教研团队

---

### 小红书预热（3 切角）

**切角 A — 痛点版**

```
🚨 你的 Agent 在凌晨偷偷烧钱你知道吗

公司 5 个 LLM Agent 跑生产
没有审计日志 / 没有权限隔离 / 没人知道谁改了 prompt
上周凌晨 2 点烧了 $400 没人发现 😅

90 min 直播 现场拆 Agent 365 三层治理
带走「上线 Checklist」PDF（24 项）

📅 下周三晚 8pm Zoom
🎁 报名免费 评论区扣「治理」发链接

#AI工程师 #LLM #AgentGovernance #企业AI #Bootcamp
```

**切角 B — 干货版**

```
📌 Enterprise Agent 上线必查的 24 项

我们整理了一份清单 ↓
✅ Pre-prod: 注册 / 权限 / 测试沙箱（8 项）
✅ Prod: rate limit / cost cap / fallback（10 项）
✅ Post-incident: 审计日志 / RCA 模板（6 项）

直播现场用 Agent 365 跑通前 8 项
对比 AWS Bedrock AgentCore（贵 vs 便宜，看 DAU）

📅 下周三晚 8pm
评论「Checklist」发 PDF + 报名链接

#AI #LLM #Agent #软件工程
```

**切角 C — 故事版**

```
朋友公司上周开了一场惨烈的复盘会 😭

CFO：为什么 OpenAI 账单涨 4 倍
工程师：好像有个 cron Agent 在循环
CFO：谁加的
工程师：……查不到 log

这不是技术问题
是 governance 没做

我们做了一场直播专门拆这个
📅 下周三晚 8pm 90min Live Demo
带走 24 项上线 Checklist

评论区扣「不想出事」拿报名链接 👇

#AI翻车现场 #LLM #AgentGovernance
```

---

### 微信群消息（开播前 24h 推 + 开播前 1h 推）

**T-24h**：

```
明晚 8pm 直播 ⏰
《Enterprise Agent Governance 实战：用 Agent 365 给你的 AI 系统加锁》

90 min Live Demo
✅ Agent 365 注册 / 权限 / 审计三件套
✅ 真实校友踩坑案例
✅ 「上线 Checklist」PDF 现场发

报名链接：[填活动报名页]
还没报名的扣「1」群秘单聊发链接
```

**T-1h**：

```
🔥 一小时后开播

直播间链接：[Zoom URL]
口令：[####]

到点没收到链接的群里 @我
带笔记本来 现场跟着跑 Agent 365 沙箱
```

---

### LinkedIn 长文（活动后 24h 内发，提引流）

**Title**：The 24 things we wish we'd checked before our first AI Agent went to prod

**Hook**：Last Tuesday we ran a 90-min live demo of Agent 365 governance — 280 people showed up, most with the same question: "we have agents in prod, but our security team is asking questions we can't answer."

**Body**（800 词，3 段）：

1. The 3 questions every InfoSec review will ask you（who can call whom / what changed / how much did it cost）
2. What Agent 365 actually solves vs marketing claims（registry, policy, audit — but not cost cap by default）
3. The checklist we gave away（free download, link in comments）

**CTA**：If you missed the live session, full recording + 24-item checklist is in the comments. Cohort #14 of our AI Engineer Bootcamp opens enrollment next week — DM if interested.

**Hashtags**：#AIEngineering #AgentGovernance #EnterpriseAI #Bootcamp #JRAcademy

## 发布记录

（暂无）

## Comments

- @system 2026-05-05T02:08:43.463Z
  > 由 `omni-report/scripts/marketing-topics-to-tasks.ts` 自动从内容选题包「推荐线上讲座 #1」生成。
