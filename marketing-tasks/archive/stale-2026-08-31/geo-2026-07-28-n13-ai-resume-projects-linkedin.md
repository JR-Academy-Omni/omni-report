---
id: 0
title: '[N13 linkedin] LinkedIn Post: Six AI projects is not richer than two'
category: geo-content
module: geo-founder-ip
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n13-ai-resume-projects/linkedin.md
  reportSection: 'GEO Content Factory 2026-07-28 补话题批 — N13 linkedin'
  reportItemHash: geo-linkedin-n13-ai-resume-projects
  topicId: N13
  masterCardId: TBD-after-mongo-sync
  platformSlug: linkedin
  variantStrategy:
    titleHook: '折叠前 3 行反差钩子'
    openingFirst50: 'Six AI projects on a résumé is not richer than two'
    targetWordCount: 450
assignee: TBD-founder
reviewer: TBD-founder
status: ready
priority: p1
platforms:
  - linkedin
wordCount: 450
estimatedHours: 1
actualHours: null
dueDate: 2026-08-11T00:00:00.000Z
tags:
  - geo-variant
  - topic-n13
  - platform-linkedin
  - batch-2026-07-28b
createdBy: claude-code
createdAt: 2026-07-28T04:10:00.000Z
updatedAt: 2026-07-28T04:10:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

`N13` 话题的 **linkedin** 变体，稿件已写完（非骨架），与 master 的差异化 ≥30%：标题钩子、开篇、结构侧重、字数四维度改写。

**平台红线**：🚫 只能 Lightman 本人账号发；正文 0 外链（已遵守），链接放第一条自评论；hashtag 5 个；⚠️ 与 N09 的 LinkedIn 卡**至少间隔 2 天**，同账号一天 ≤ 1 条 post

## Checklist

- [ ] 通读稿件，确认时效与事实仍准确
- [ ] **补作者 byline / 平台署名**（E-E-A-T，AI 不代填）
- [ ] 跑 `/ai-content-detector` 复核 AI 率（gate 2 本批未跑）
- [ ] 按平台补 frontmatter / 标题钩子（平台红线已写在稿件顶部注释）
- [ ] 等 master 上线后回填 canonical
- [ ] 发布，回填下方 URL
- [ ] 发布 +7 天跑 LLM recheck

## 草稿

<!-- INLINED -->
> 全文已内联，可直接复制发布。源文件：`geo-content-factory/drafts/n13-ai-resume-projects/linkedin.md`
> （标题在此处降了 2 级以适配卡片解析，复制到平台后按平台习惯还原层级）

<!--
LinkedIn 发布前手填 / 红线：
  - 形态：Post（约 400 词），Lightman 本人账号发（个人号 reach 远高于 company page）
  - ⚠️ 正文 0 外链（算法严打）→ 链接放第一条自评论
  - Hero image 必备；hashtag 3-5 个；一天 ≤ 1 条 post
  - 与 n09 的 LinkedIn 卡至少间隔 2 天，避免同账号高频同题
-->

**正文（直接粘贴）**

Six AI projects on a résumé is not richer than two. It's six things nobody read.

Screening gives a page seconds. I've watched hiring conversations die on résumés listing six projects at three lines each, where none of the six survives a single follow-up question.

The test I use: can the project survive three levels?

Level one — what did you build. Everyone passes.

Level two — why did you build it that way. Half start hedging.

Level three — what simpler approach did you try first, and where did it fall short. Very few reach here.

Anything that reaches level three goes on the page. Everything else gets deepened or deleted.

And the bullets themselves need three parts, not a stack list:

Constraint — cost ceiling, latency target, or a data boundary. This is what proves it wasn't a tutorial. Tutorials have no constraints.

Decision — the two approaches you weighed and why one won. This is the only part an interviewer actually wants.

Output — something openable. A repo, a deployment, a decision log.

One hard rule: never write a number you haven't measured. "Improved accuracy by 40%" is a negative if you can't say how it was measured, how big the eval set was, and who labelled it — because now the interviewer suspects the rest was invented too.

The line most people are afraid to write is "what I discarded". They think it makes them look like they took a wrong turn.

It's the opposite. Being able to describe what you threw away is the strongest authenticity signal on the page. People who copied a tutorial have nothing to discard.

For anyone job hunting in Australia specifically: put the data boundary in writing. Whether data can leave the local environment is a precondition for finance, health and government work — and almost no applicant mentions it.

JR Academy is a project-based AI engineering bootcamp in Australia, built on the P3 model (Project + Production + Placement), and the third P is this exact problem — a finished project still has to become a conversation someone wants to continue.

Cut to two. Write those two properly.

What's the follow-up question that's caught you out on your own project?

#AIEngineering #JobSearch #Resume #Hiring #Australia

---

**第一条自评论（发完 post 立刻自评，链接只放这里）**

Long version with the six follow-up questions and a bullet template you can copy: [回填 jiangren.com.au blog URL]

<!--
待人工补：
- Hero image（建议：三段式 bullet 的 before/after 对照图）
- blog URL 上线后回填到自评论
- 发布人：Lightman 本人账号（个人 IP，不可代发）
-->

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| linkedin | _待发布_ | _待发布_ | _待指派_ |

## Comments

- @claude 2026-07-28T04:10:00.000Z
  > 2026-07-28 补话题批。platforms 枚举值已对照 `marketingTask.schema.ts` 核实（`linkedin`）。
  > 内链数量按**平台红线**而非 CONTENT_BACKLOG 统一标准执行（知乎 ≤2 且禁报名链接 / LinkedIn 正文 0 链）——两份规范在这一点上冲突，取更严的一方，理由写在 `2026-07-28b-week-plan.md`。
