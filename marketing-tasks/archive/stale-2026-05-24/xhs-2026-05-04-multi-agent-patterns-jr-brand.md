---
id: 0
title: 【小红书 · JR匠人学院】Multi-Agent 5 种设计模式速查：什么时候用 pipeline / supervisor / mesh
category: social-redbook
module: redbook-daily
source: routine-marketing-topics
sourceMeta:
  reportPath: marketing-topics/2026-05-04.md
  reportSection: 长尾常青
  reportItemHash: xhs-multi-agent-patterns-jr-brand
assignee: 2363843954@qq.com
reviewer: TBD-founder
status: draft
priority: p1
platforms:
  - xiaohongshu
wordCount: 500
estimatedHours: 3
actualHours: null
dueDate: 2026-05-20T00:00:00.000Z
tags:
  - xiaohongshu
  - account-JR匠人学院
  - topic-multi-agent-patterns
  - evergreen-tech
  - brand-account
createdBy: TBD-system
createdAt: 2026-05-04T16:00:00.000Z
updatedAt: 2026-05-04T16:00:00.000Z
derivedFrom: null
---

## 描述

**派给账号**：JR匠人学院（品牌账号 / Owner: Lily）

**改写角度**：品牌号偏专业/技术权威定位。Multi-Agent 5 种设计模式做成**速查信息图**，对标技术博客的"Cheat Sheet"风格。重点是**这是 JR Bootcamp 教研团队整理的**——建立技术权威。

**4 图建议**（信息图风）：
- 图 1：封面「Multi-Agent 5 种设计模式速查 · JR Bootcamp 教研版」
- 图 2：Pipeline 模式 + 适用场景 + 一段 LangGraph 最简代码
- 图 3：Supervisor 模式 + 适用场景 + 代码
- 图 4：Mesh / Mediator / Hierarchical 三种合一图（架构对比）

**正文钩子**：「不讲概念，5 种 Pattern × 一句话适用场景 × 一段 LangGraph 代码。收藏，下次设计架构直接抄。」

**和 UNSW 版本的差异化**：
- JR 品牌号 = 技术权威 / 信息密度高 / 像速查表
- UNSW 课代表 = 学生口吻 / 解释性更多 / 像作业辅助

**评论引导**（关键）：底部留一个钩子问题——「你做过哪种 pattern？踩过哪些坑？」激活技术评论区。

## Checklist

- [ ] 让 JR Bootcamp 教研（Beta / Han）确认 5 种 pattern 命名规范 + 代码示例正确
- [ ] 用 xhs-draft skill 起草初稿
- [ ] 跑 xhs-score 自评 ≥ 75 分（技术内容偏向收藏率 KPI）
- [ ] Bella 用 Canva 出 4 张信息图（JR 品牌色 #d97757 + 等宽字体）
- [ ] 检查代码示例可运行（< 20 行 LangGraph）
- [ ] 评论区埋 2 条技术互动（"Mediator 和 Supervisor 区别" / "MCP 算 mesh 吗"）
- [ ] 发布于「JR匠人学院」账号
- [ ] 24h 后看收藏率（技术速查类指标）
- [ ] 填发布 URL + 数据到 publications

## 草稿

> ⚠️ **代码确认前置**：5 段 LangGraph 代码示例必须 JR 教研（Beta / Han）跑过一次确认能 import & run。下面给的是结构正确的最简形式，发文前**必须教研签核**。

---

### 标题（3 选 1）

1. **速查表派**：Multi-Agent 5 种设计模式速查 · 一图看完什么时候用 pipeline / supervisor / mesh
2. **收藏导向**：做 LLM Agent 项目前必看：5 种 pattern + 适用场景 + 一段代码（直接抄）
3. **决策树派**：Multi-Agent 怎么选模式？JR Bootcamp 教研整理 5 种 pattern 决策表

> **建议主推 1**——技术速查类内容收藏率最高，标题强调"速查"+"一图"提升点击。

---

### 正文（500 字，JR 品牌号 / 技术权威口吻）

不讲概念，5 种 Pattern × 一句话适用场景 × 一段 LangGraph 代码。收藏，下次设计架构直接抄。

JR Bootcamp 教研版（Cohort #14 学员的 Phase 3 用过这套决策树定项目架构）👇

---

**1️⃣ Pipeline（顺序流水线）**

📌 **什么时候用**：任务有明确先后依赖（解析 → 检索 → 总结），上一步输出是下一步输入。
🧱 **代码（最简）**：

```python
from langgraph.graph import StateGraph, END

g = StateGraph(State)
g.add_node("parse", parse_query)
g.add_node("retrieve", retrieve_docs)
g.add_node("answer", generate_answer)
g.add_edge("parse", "retrieve")
g.add_edge("retrieve", "answer")
g.add_edge("answer", END)
```

✅ 典型场景：RAG 问答 / 文档摘要 / 数据 ETL

---

**2️⃣ Supervisor（中央调度）**

📌 **什么时候用**：多个专业 Agent 各干各的，需要一个 router 决定下一步派给谁（像组里 PM）。
🧱 **代码核心**：`supervisor` 节点根据上下文返回下一个 agent name，循环直到 `FINISH`。
✅ 典型场景：客服多技能（账单 / 技术 / 投诉）/ 代码生成（写代码 → 写测试 → 跑测试）

---

**3️⃣ Mesh / Network（点对点协作）**

📌 **什么时候用**：Agent 互相能直接调用，无中央节点。复杂但灵活。
⚠️ 慎用——容易死循环、token 爆炸。生产环境前先用 Supervisor 试。
✅ 典型场景：研究型多 Agent（不同视角辩论）/ 代码 review 多角色

---

**4️⃣ Mediator（中介者）**

📌 **什么时候用**：Supervisor 的轻量版——所有跨 Agent 通信都过一个中介，但中介不做调度决策，只转发。
✅ 典型场景：多模态融合（视觉 + 文本 Agent 各自处理后由 Mediator 合并）

---

**5️⃣ Hierarchical（分层嵌套）**

📌 **什么时候用**：Supervisor 里嵌套 Supervisor。复杂工作流（每个子团队再细分专业 Agent）。
✅ 典型场景：企业级 AI 助手（财务团队 / 法务团队 / 技术团队各自有 Supervisor）

---

📊 **5 种 Pattern 决策树（一句话）**：

```
任务有明确顺序？        → Pipeline
多 Agent 但有 router？  → Supervisor
平等 Agent 互相协作？   → Mesh（慎用）
只需中央转发不调度？    → Mediator
有子团队嵌套？          → Hierarchical
```

---

💬 **底部钩子（激活技术评论区）**：

你做过哪种 pattern？踩过哪些坑？评论区聊聊——尤其是 Mesh 死循环和 Supervisor token 爆炸的实战故事，我看过太多人吃过亏。

---

#LangGraph #MultiAgent #LLM #AI工程师 #设计模式 #JRBootcamp #收藏

---

### 4 图建议（信息图风，已在描述里）

- 图 1（封面）：5 种 Pattern 速查表 + JR 品牌色
- 图 2：Pipeline + 代码截图（语法高亮）
- 图 3：Supervisor + 代码截图
- 图 4：Mesh / Mediator / Hierarchical 三种架构对比图

### 评论区预埋（2 条）

1. 🤔「Mediator 和 Supervisor 区别没分清，能展开说说」
2. 🔌「MCP 算 mesh 吗？最近在做 MCP server」

### 自检

- [ ] **教研（Beta/Han）跑过 5 段代码确认能 import & run**（P0 红线）
- [ ] 5 种 Pattern 命名规范跟 LangGraph 官方文档一致
- [ ] 不出现"在当今 / 让我们 / 准备好了吗"
- [ ] 跑 /xhs-score ≥ 75 分（技术内容看收藏率）

## 发布记录

（待发布）

## Comments

- @system 2026-05-05T00:00:00+08:00
  > 由 GEO topic fan-out 派单生成。品牌号 vs 学生号差异化：技术权威 vs 学生视角。后续可拆系列「设计模式 / 调试方法 / 成本优化」三篇连发。
