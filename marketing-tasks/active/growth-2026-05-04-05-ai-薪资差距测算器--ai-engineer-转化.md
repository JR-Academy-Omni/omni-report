---
id: 0
title: AI 薪资差距测算器 × AI Engineer 转化
category: growth-hack
module: campaign-plan
source: routine-growth-playbook
sourceMeta:
  reportPath: growth-playbook/2026-05-04.md
  reportSection: 玩法
  reportItemHash: cf4c30b54ba7
assignee: 1982723658@qq.com
reviewer: null
status: draft
priority: p2
platforms: []
wordCount: null
estimatedHours: null
actualHours: null
dueDate: null
tags:
  - imported-from-routine
  - growth-playbook
createdBy: TBD-system
createdAt: 2026-05-05T02:07:21.820Z
updatedAt: 2026-05-05T02:07:21.820Z
derivedFrom: null
---
## 描述

**玩法 ⑤ **AI 薪资差距测算器 × AI Engineer 转化**（内容钩子 + 求职裂变）**

| 字段 | 值 |
|---|---|
| **一句话描述** | 3 分钟表单：输入当前岗位 / 年薪 / 已掌握技能；AI 自动生成"你离 SEEK $152k AI Engineer 均薪还差 X 个技能"个性化 PDF 报告；报告末尾匹配对应 Bootcamp 章节 + "预约 1v1 技能评估"CTA；分享报告截图可额外得 $100 Bootcamp credit |
| **灵感来源** | 测 AI 水平推课程（内容钩子）+ Notion 邀请赚 Credit（社交分享驱动） |
| **对应业务** | AI Engineer Bootcamp（付费转化）+ 求职服务 Job Referral（进内推池） |
| **目标用户** | 付费转化（在职程序员 / 想转型 AI Engineer 的职场人）+ 求职 Referral 新用户激活 |
| **执行难度** | 🟡 中（表单 + Claude API 生成个性化报告文本 + PDF 模板 + 邮件序列；约 3 天开发） |
| **预估指标** | 2 周：500 次完成测算，25% 预约 1v1 技能评估 = 125 次预约，20% 转化付费 Bootcamp = 25 人；分享截图 60 次，二级触达 2,000+；Job Referral 新增 40 人进内推池 |
| **本周做？** | ⏳ 下周启动（SEEK $152k 数据本周新鲜，但工具需 3 天开发；下周一上线正好赶上本周热度余温；本周可先出 MVP 用 Typeform 手动生成报告验证需求） |

**落地步骤**：
1. **本周**：用 Typeform 搭 MVP 版（表单收集数据，人工在 24 小时内发 PDF 报告，验证用户是否真的预约 1v1）；如果 D3 完成率 >30%，启动自动化开发
2. **D0（下周一）**：上线自动化版：Typeform 提交 → Claude API 根据填写技能与 AI Engineer JD 关键词做 gap 分析 → 生成 Markdown 报告 → WeasyPrint 转 PDF → 自动邮件发送
3. **D1**：在 LinkedIn 发文："我测了 100 个工程师的 AI 技能差距，发现了 3 个最常见的盲区"（用 MVP 阶段的真实数据，保持匿名），文末接测算器链接；同步在 JR 学员社区推送，让学员帮分享
4. **D3**：统计完成率 + 预约率；给所有完成测算但未预约的人发"你的第一个技能缺口可以免费学，这里是资源"邮件（把 /learn 相关章节作为免费内容发过去，二次激活）
5. **D7**：整理数据做「澳洲工程师 AI 技能缺口图谱」发知乎/B站（样本越多越有说服力），作为长尾引流内容持续运营

---

## Checklist

- [ ] 确认本周是否启动 + 分配 owner / 跨部门资源
- [ ] 完成落地步骤 D0-D7（见上文）
- [ ] 验收预估指标（生成量 / 分享量 / 注册转化）
- [ ] 复盘 ROI + 写到下一周 growth-playbook 学习

## 草稿

（暂无）

## 发布记录

（暂无）

## Comments

- @system 2026-05-05T02:07:21.820Z
  > 由 `omni-report/scripts/growth-playbook-to-tasks.ts` 自动从 growth playbook 玩法 #5 生成。
