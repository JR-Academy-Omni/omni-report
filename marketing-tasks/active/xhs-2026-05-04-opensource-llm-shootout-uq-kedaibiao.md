---
id: 0
title: 【小红书 · UQ课代表】学校还在教 GPT-3.5？同学私下都在用这五款开源模型
category: social-redbook
module: redbook-hot-topic
source: routine-marketing-topics
sourceMeta:
  reportPath: marketing-topics/2026-05-04.md
  reportSection: 外部热点
  reportItemHash: xhs-opensource-llm-uq-kedaibiao
assignee: 2838684082@qq.com
reviewer: TBD-founder
status: draft
priority: p1
platforms:
  - xiaohongshu
wordCount: 500
estimatedHours: 3
actualHours: null
dueDate: 2026-05-18T00:00:00.000Z
tags:
  - xiaohongshu
  - account-UQ课代表
  - topic-opensource-llm-shootout
  - student-angle
createdBy: TBD-system
createdAt: 2026-05-04T16:00:00.000Z
updatedAt: 2026-05-04T16:00:00.000Z
derivedFrom: null
---

## 描述

**派给账号**：UQ课代表（学生群体定位 / Owner: KIKI-课代表）

**改写角度**：以 UQ 学生口吻写。重点不在模型本身，而在**学校课程跟产业脱节**——课堂还在 GPT-3.5，业界已经五选一了。激发学生焦虑感 + 给出补救方案（看 JR Bootcamp 的内容）。

**4 图建议**（小红书学生号偏短）：
- 图 1：封面「UQ 同学注意！学校课件 vs 工业界的差距，今天补」
- 图 2：UQ COMP 课程列表 + 五款最新开源模型对比（讽刺图）
- 图 3：五款模型「同学党最该学哪个」决策表（按免费额度 / 中文友好度 / 部署难度）
- 图 4：CTA「评论扣 1 发学习清单，看完比 assignment 走得远」

**正文钩子**：第 1 句「上周 lab 老师还在 demo GPT-3.5，我朋友在公司一周已经切到 Kimi K2.6 跑多 Agent 了」。

**禁忌**：不要承诺薪资 / 不要说"副业"。重点放在「同学之间技术差距」。

## Checklist

- [ ] 用 xhs-draft skill 起草初稿（学生口吻 + UQ 校园视角）
- [ ] 跑 xhs-score 自评 ≥ 75 分
- [ ] Bella 用 Canva 出 4 张图（UQ课代表模板，紫色系）
- [ ] 评论区埋 2 条（"哪门课老师教 LangGraph" / "求 GitHub repo"）
- [ ] 发布于「UQ课代表」账号
- [ ] 24h 后看 UQ 学生关注涨粉
- [ ] 填发布 URL + 数据到 publications

## 草稿

> ⚠️ **校园对照真实性**：UQ 课程列表 + 五款模型对比是核心钩子，发文前要确认 UQ 2026 学期 COMP3411 / DECO7250 等 AI 相关课程的最新 syllabus 用的还是 GPT-3.5 / OpenAI API。如果学校已升级，整篇要换角度（不要假装学校还在教旧的）。

---

### 标题（3 选 1）

1. **学生焦虑钩子**：UQ 同学 学校还在教 GPT-3.5？同学私下都在用这五款开源模型
2. **同辈对比**：上周 lab 老师还在 demo GPT-3.5 我朋友在公司一周已经切到 Kimi K2.6
3. **课内 vs 课外**：UQ 课件 vs 工业界 2026 现状对照表 这五款模型补回来

> **建议主推 1**——直接命中 UQ 学生痛点搜索（"学校教的 vs 业界用的"）。

---

### 正文（500 字，UQ 学生第一人称口吻）

上周 lab 老师还在 demo GPT-3.5，我朋友（毕业 2 年在 [TBD: 公司行业]）一周已经切到 Kimi K2.6 跑多 Agent 了。

不是吐槽老师——课件改起来真的慢。但**学校教的 vs 业界用的**这道差距得自己补。

UQ COMP / DECO 同学补这五款👇

---

📊 **学校 vs 工业界对照（2026 Q2）**

| 项 | UQ 课件还在用 | 工业界 / Bootcamp 学员在用 |
|---|---|---|
| 主流模型 | GPT-3.5 / Llama 2 | Gemma 4 / Kimi K2.6 / DeepSeek V4 / Mistral 128B / Muse Spark |
| 调用方式 | OpenAI API + prompt | LangChain / LangGraph + tool calling |
| 项目结构 | 单 LLM Call demo | Multi-Agent + RAG + memory |
| 部署方式 | Jupyter notebook | Docker + Cloud Run / Vercel |

---

🎯 **同学党最该学哪款？**（按免费额度 + 中文友好度 + 部署难度排）

**1️⃣ Kimi K2.6** — 学生党首选
- ✅ 学生免费额度大（[VERIFY: 每月 X 万 tokens]）
- ✅ 中文 RAG 主场
- ✅ 部署最简单（直接调 API）

**2️⃣ Gemma 4** — capstone 写代码必备
- ✅ Google 学生 GCP credits 可用
- ✅ 函数调用稳定（写 AI Agent 用得上）
- ⚠️ 中文一般

**3️⃣ DeepSeek V4** — honours / 论文长文档解析
- ✅ 推理链长，处理 paper 翻译 / 总结很猛
- ✅ 价格亲民

**4️⃣ Mistral 128B** — 看不出特别强项的话先跳过
**5️⃣ Muse Spark** — 多模态，调试成本高，第 2 个项目再上

---

📚 **学校没教的 ≠ 不重要**

UQ 2026 SE / DS / IT 招聘看 portfolio 的时候，工业界 reviewer 看的不是「你 lab assignment 拿了 HD」，是「你 GitHub 上有没有用这五款模型做过真实项目」。

✨ 评论扣「1」，发我整理的[TBD: 学习清单 / GitHub repo / Bootcamp 大纲] —— 看完你比 assignment 走得远。

---

#UQ #COMP3411 #DECO7250 #AI #开源大模型 #KimiK26 #Gemma4 #布里斯班

---

### 4 图建议（已在描述里）

- 图 1（封面）：「UQ 同学注意！学校课件 vs 工业界的差距，今天补」
- 图 2：UQ COMP 课程列表 + 五款最新开源模型对比（讽刺图）
- 图 3：五款模型「同学党最该学哪个」决策表
- 图 4：CTA「评论扣 1 发学习清单，看完比 assignment 走得远」

### 评论区预埋（2 条）

1. 📚「哪门课老师教 LangGraph？还是只能自学」
2. 🔗「求 GitHub repo，capstone 想直接抄结构」

### 自检

- [ ] UQ 课程现状真实（如果 2026 学校已升级，整篇改角度）
- [ ] 不承诺薪资 / 不说"副业"
- [ ] 重点放在「同学之间技术差距」，不踩 UQ 老师
- [ ] [VERIFY] / [TBD] 占位由教研 / Aurora 替换
- [ ] 跑 /xhs-score ≥ 75 分

## 发布记录

（待发布）

## Comments

- @system 2026-05-05T00:00:00+08:00
  > 由 GEO topic fan-out 派单生成。同一 topic 跨账号差异化版本：澳洲匠人学院走「Bootcamp 学习路径」角度；UQ课代表走「学校 vs 工业」学生焦虑角度。
