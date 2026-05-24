---
id: 0
title: 【小红书 · UNSW课代表】CSE 同学们，这 5 种 Multi-Agent Pattern 老师不一定教，但 capstone 用得到
category: social-redbook
module: redbook-daily
source: routine-marketing-topics
sourceMeta:
  reportPath: marketing-topics/2026-05-04.md
  reportSection: 长尾常青
  reportItemHash: xhs-multi-agent-patterns-unsw-kedaibiao
assignee: 2838684082@qq.com
reviewer: TBD-founder
status: draft
priority: p1
platforms:
  - xiaohongshu
wordCount: 450
estimatedHours: 3
actualHours: null
dueDate: 2026-05-20T00:00:00.000Z
tags:
  - xiaohongshu
  - account-UNSW课代表
  - topic-multi-agent-patterns
  - student-capstone-angle
createdBy: TBD-system
createdAt: 2026-05-04T16:00:00.000Z
updatedAt: 2026-05-04T16:00:00.000Z
derivedFrom: null
---

## 描述

**派给账号**：UNSW课代表（学生定位 / Owner: KIKI-课代表）

**改写角度**：UNSW CSE / COMP 学生口吻。把 5 种 pattern 包装成**capstone 项目可以直接用的工程思路**。课堂只教单个 LLM Call，但 capstone 要多 Agent 协作的时候没人教，这条贴正好补位。

**5 图建议**（学生体感更亲切，多 1 张）：
- 图 1：封面「UNSW CSE 同学：capstone 想做 AI 项目？这 5 个 pattern 必看」
- 图 2-3：Pipeline / Supervisor 用学生项目场景类比（"像组里的 PM 分配任务"）
- 图 4：Mesh 模式用 group assignment 类比
- 图 5：CTA「capstone team 想抄作业？评论区扣 GitHub repo」

**和 JR 品牌号版本的差异化**：
- JR 品牌号 = 速查表 / 技术密集
- UNSW 课代表 = 类比 + 场景化 / 解释性强 / 学生角度

**正文钩子**：「上学期我们 group capstone 做 AI 助手，3 个 LLM Call 串起来直接乱套，问了 tutor 也答不上。后来才知道这叫 Multi-Agent，工业界 5 种成熟 Pattern 早就有现成解。」

**禁忌**：
- ❌ 不要承诺"做完 capstone 就能找到工作"
- ✅ 重点放在「学校没教 ≠ 不重要」

## Checklist

- [ ] 跟 JR 教研确认 5 种 pattern 命名 + 学生口吻类比（不能说错技术）
- [ ] 用 xhs-draft skill 起草（学生第一人称，COMP 课程视角）
- [ ] 跑 xhs-score 自评 ≥ 75 分
- [ ] Bella 用 Canva 出 5 张图（UNSW课代表模板，蓝白色系，handwritten 字体）
- [ ] 评论区埋 3 条（"COMP9417 学过吗" / "求 LangGraph quickstart" / "找 capstone partner"）
- [ ] 发布于「UNSW课代表」账号
- [ ] 24h 后看 UNSW IP 来源涨粉
- [ ] 填发布 URL + 数据到 publications

## 草稿

> ⚠️ **教研背书前置**：5 种 pattern 命名 + 学生类比是否准确，JR Bootcamp 教研（Beta/Han）发文前必须确认。学生类比可以"接地气"但不能技术错。

---

### 标题（3 选 1）

1. **学生口吻版**：CSE 同学们 这 5 种 Multi-Agent Pattern 老师不一定教 但 capstone 用得到
2. **痛点版**：上学期 capstone 做 AI 助手翻车 才知道工业界这 5 种成熟解早就有
3. **作业焦虑版**：UNSW capstone 想做 LLM 项目？看这 5 种 Pattern 再开工 少走半学期弯路

> **建议主推 1**——直接命中 UNSW CSE / COMP 学生搜索词。

---

### 正文（450 字，UNSW 学生第一人称口吻）

上学期我们 group capstone 做 AI 助手，3 个 LLM Call 串起来直接乱套，问 tutor 也答不上来。

后来才知道这叫 Multi-Agent，工业界 5 种成熟 Pattern 早就有现成解。学校 COMP 课老师真的没教过——但 capstone / honours / part-time intern 都用得到。

整理出来给同学避坑👇

---

**1️⃣ Pipeline（顺序流水线）**🚇

> 像组里写报告：A 同学找资料 → B 同学整理 → C 同学写结论。前一步输出是下一步输入。

适合：你的项目是「输入 → 处理 → 输出」三段式的（最常见 80% 场景）

---

**2️⃣ Supervisor（中央调度）**👮

> 像组里有个 PM。tutor 提问 → PM 看是技术问题就 @ 写代码的，是文档问题就 @ 写报告的。

适合：你的项目里有多个 LLM 各自专攻一块（比如 chatbot 既要查数据又要算账）

---

**3️⃣ Mesh（点对点）**🕸️

> 像 group assignment 里大家互相 @ 互相催。

⚠️ **慎用**——容易像我们上学期那样「3 个 LLM Call 互相 call 直接死循环」。我导师后来骂的就是这个。

---

**4️⃣ Mediator（中介者）**📮

> 像班长——所有人发消息都要过班长转发，但班长不做决定，只传话。

适合：多个 Agent 数据格式不一样要统一（比如视觉 + 文本各自处理后合并）

---

**5️⃣ Hierarchical（分层嵌套）**🏢

> 像学校结构：UNSW → CSE Faculty → 课程 → group。Supervisor 里嵌 Supervisor。

适合：复杂的 capstone（多个子模块，每个子模块自己也是 Multi-Agent）

---

🎯 **学校没教 ≠ 不重要**

COMP9417 / COMP9444 教的是单个 LLM Call。但工业界 / capstone 评分老师 / honours supervisor 看的是**你能不能把多个 LLM 协作起来不翻车**。这 5 种 Pattern 不会的话直接卡在 demo day。

---

📚 **下一步**（学校选修课不教，只能自学）：

- LangGraph 官方 quickstart（2h 跑通）
- 工业界 case study：capstone 想抄作业的，评论区扣「GitHub」我发开源 repo 链接

---

#UNSW #COMP9417 #COMP9444 #Capstone #Honours #AI #LangGraph #小红书学习

---

### 5 图建议（学生体感更亲切，已在描述里）

- 图 1（封面）：「UNSW CSE 同学：capstone 想做 AI 项目？这 5 个 pattern 必看」
- 图 2-3：Pipeline / Supervisor 用学生项目场景类比
- 图 4：Mesh 模式用 group assignment 类比
- 图 5：CTA「capstone team 想抄作业？评论区扣 GitHub repo」

### 评论区预埋（3 条）

1. 📚「COMP9417 学过吗？老师讲过这块？」
2. 🔧「求 LangGraph quickstart，最快多久跑通」
3. 🤝「找 capstone partner，AI 方向，BE 末年」

### 自检

- [ ] **教研签核 5 种 pattern 命名 + 类比技术正确**（P0）
- [ ] 学生口吻自然不端着（"我导师后来骂的"等真实情绪可保留）
- [ ] 不承诺"做完 capstone 就能找到工作"
- [ ] 跑 /xhs-score ≥ 75 分

## 发布记录

（待发布）

## Comments

- @system 2026-05-05T00:00:00+08:00
  > 由 GEO topic fan-out 派单生成。同 topic 双账号验证：JR 品牌号偏技术权威，UNSW 课代表偏学生场景。两条同周发，看哪种心智占领转化更高。
