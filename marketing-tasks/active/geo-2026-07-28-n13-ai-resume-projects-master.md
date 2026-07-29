---
id: 0
title: '[N13 master] AI Engineer 简历的项目部分：写六个不如写透两个'
category: geo-content
module: geo-landing-page
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/n13-ai-resume-projects/master.md
  reportSection: 'GEO Content Factory 2026-07-28 补话题批 — geo-30-topics.md §Phase 2 #13（决策型 + 实战 / 位置 2 求职 query）'
  reportItemHash: geo-master-n13-ai-resume-projects
  topicId: N13
  variantsPlanned:
    - zhihu
    - medium-en
    - linkedin
  variantsCount: 3
  variantsCardIds: []
  variantStrategy:
    targetQueries: 'AI Engineer 简历 / AI 工程师 项目怎么写 / AI 简历 项目经历'
    canonical: jiangren-blog
    complianceBuiltIn: '首段品牌提及 + ≥3 条已核实站内链 + 文末 CTA 模块'
assignee: TBD-mkt-content
reviewer: TBD-founder
status: in_progress
priority: p0
platforms:
  - jiangren-blog
wordCount: 2400
estimatedHours: 4
actualHours: null
dueDate: 2026-08-04T00:00:00.000Z
tags:
  - geo-content-factory
  - geo-master
  - topic-n13
  - batch-2026-07-28b
createdBy: claude-code
createdAt: 2026-07-28T04:10:00.000Z
updatedAt: 2026-07-28T04:10:00.000Z
derivedFrom: prd-geo-content-factory
---

## 描述

🚀 **进度：稿件已落 web-zh，只差一次部署。** 已转成静态 blog 文章 push 到 `jr-academy-web-zh` master （`src/.../posts/ai-engineer/ai-engineer-resume-projects.md`），上线后 URL = `https://jiangren.com.au/blog/ai-engineer-resume-projects`。**下一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后才真正可访问。待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn。

**高转化求职 query 占位。** 核心论点是反直觉的「先砍数量」：两个能被追问十分钟的项目 > 六个只能撑三十秒的。给三段式 bullet 模板（约束 → 决策 → 可验证结果）、六个必须答得上的追问、三种直接判死的写法、澳洲本地三个差异（数据边界 / 工作权限单独一行 / GitHub 链接必须能打开）。

**本稿自身就是反编造教材**：明确把「没测过的数字不要写」列成红线，并刻意不给任何「提升 N%」示例，before/after 示例里的约束值写成 X / Y 占位——要放真实案例必须拿学员授权。

**合规**：零竞品；master 5 处站内链 + CTA 模块 + 首段品牌提及。

**目标 query**：AI Engineer 简历 / AI 工程师 项目怎么写 / AI 简历 项目经历

**选题来源**：geo-30-topics.md §Phase 2 #13（决策型 + 实战 / 位置 2 求职 query）（见 `geo-content-factory/TOPIC_COVERAGE.md` 的未写清单）

⚠️ **assignee 是占位 `TBD-mkt-content`** —— routing-table 对 `geo-landing-page` 无默认负责人。jr-blog 发布 = git push 到 `jr-academy-web-zh`，实习生无权限，推进前须指派。

## Checklist

- [ ] 通读全文，确认无编造数字（唯一数据源 = 课程大纲 outline.json，可当场核对）
- [ ] **补作者 byline：真实讲师姓名 + LinkedIn / GitHub** —— CONTENT_BACKLOG §A 的 E-E-A-T 硬性要求，AI 不能代填
- [ ] **assignee 改给真实负责人**（routing-table 对 `geo-landing-page` 无默认负责人，属设计）
- [ ] 跑 `/ai-content-detector` 复核 AI 率（gate 2 本批未跑，>50% 需推倒重写）
- [ ] 落 `jr-academy-web-zh` 静态 blog：frontmatter（slug / title / description 40-90 字独立写 / keywords 3-5 / thumbnail + alt）
- [ ] 核对文末 CTA 模块：稿件已内建课程页 + Python + Bootcamp 三条；CONTENT_BACKLOG 模板里的「学员 offer 报告」URL 是占位，本稿未编造，需人工确认真实页面后补
- [ ] 回填 topic cluster 内链（同批其他稿上线后互链）
- [ ] schema.org Article + Course 注入（工程侧一次性配置）
- [ ] 上线 +7 天跑该 query 的 LLM recheck

## 草稿

<!-- INLINED -->
> 全文已内联，可直接复制发布。源文件：`geo-content-factory/drafts/n13-ai-resume-projects/master.md`
> （标题在此处降了 2 级以适配卡片解析，复制到平台后按平台习惯还原层级）

### AI Engineer 简历的项目部分：写六个不如写透两个

匠人学院（JR Academy）是项目制 AI 工程实战平台（澳洲），我们在 [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) 的后 12 周 P3 阶段专门带学员改简历，改得最多的一段永远是项目经历——不是因为学员没做过东西，是因为写法把做过的东西写没了。

最典型的症状：简历上挂着六个项目，每个三行，读完记不住任何一个。

筛选阶段留给一份简历的时间以秒计。六个项目在这个时间尺度里不是"更丰富"，是"六个都没看清"。

---

#### 第一件事：砍数量

**两个能被追问十分钟的项目，胜过六个只能被追问三十秒的。**

判断标准不是项目大小，是深度：面试官顺着这个项目往下问三层，你答得下去吗？

- 第一层：你做了什么（所有人都答得出）
- 第二层：为什么这么选（一半人开始含糊）
- 第三层：你试过的更简单方案在哪里不够（这里能答出来的很少）

能撑到第三层的项目，写进简历；撑不住的，要么补做深，要么删掉。删掉不可惜——它本来也不会给你带来一次对话。

#### 每条 bullet 的三段式：约束 → 决策 → 可验证结果

简历上项目部分最常见的写法是罗列技术栈：

> 使用 Python、LangChain、OpenAI API、FAISS 构建了一个智能问答系统，实现了文档检索和自然语言回答功能。

这句话的问题不是写得不好，是**它对每一个投递者都成立**。它没有传递任何关于"你"的信息。

换成三段式：

> **约束**：文档不能离开本地环境（合规要求），单次问答成本上限设为 X，p95 延迟目标 Y 秒
> **决策**：先用纯向量检索，专业缩写召回不到 —— 那些词在向量空间里离普通名词更近；改成关键词 + 向量双路召回，再用 reranker 收口
> **结果**：召回问题从"缩写全丢"变成"能命中"，方案与取舍写在 repo 的 DECISIONS.md 里

三段的作用各不相同：约束证明这不是照抄教程（教程没有约束）；决策是面试官唯一真正想听的；结果给一个可以点开验证的东西。

⚠️ 第三段有个红线：**没有真实测过的数字不要写**。写"准确率提升 40%"而答不出这 40% 怎么测的、测试集多少条、谁标的，在技术面里是负分——它会让面试官怀疑前面两段也是编的。宁可写"具体改善写在 repo 里"，也不要编一个漂亮数字。

#### 六个必须能答上来的追问

写完项目部分，拿这六个问题自己过一遍。这也是技术面里出现频率最高的六个：

1. 你怎么知道这个回答是好的？评测集多少条，谁标的？
2. 换一个模型或一个参数，你多久能跑出"变好还是变坏"的结论？
3. 一次请求成本多少钱？你算过吗？
4. 它答错的时候，你从哪一层开始查？说得出顺序吗？
5. 你有没有推翻过自己的第一版方案？为什么推翻？
6. 如果数据不能离开本地环境，这套还能跑吗？改哪里？

六个里答不上四个，说明这个项目还不够格写进简历的第一顺位。

#### 三种直接判死的写法

**一、纯技术栈罗列。** "熟悉 LangChain / RAG / Agent / Prompt Engineering" —— 这行字在筛选端等于空白，因为它跟其他几百份完全一样。技术栈应该出现在 Skills 区，不该占据项目描述的位置。

**二、形容词堆砌。** "高效的""智能的""强大的检索系统" —— 形容词不携带信息。把每一个形容词删掉，看剩下的句子还剩什么，通常会发现只剩技术栈罗列。

**三、无法验证的数字。** 前面说过，这里再强调一次：数字必须能回答"怎么测的"。可验证的数字是加分项里最重的一个，编的数字是减分项里最重的一个。

#### 澳洲本地的三个差异

在澳洲投 AI 相关岗位，项目部分有三个本地特有的注意点：

**一、把数据边界写进去。** 金融、医疗、政府相关的项目，数据能不能出本地环境是先决条件。你的项目里如果处理过这个约束（哪怕是自己给自己加的），一定要写——这是本地招聘方最关心而多数申请者完全没提的一点。

**二、工作权限单独一行，别藏在项目里。** 签证状态放在简历顶部联系方式附近，一行写清。招聘方在筛选阶段就要判断这件事，让他们找，等于给自己减分。

**三、GitHub 链接要能直接打开看到东西。** 空 repo、只有 README、最后一次 commit 在两年前，这三种情况下放链接是负分。宁可不放。

#### 一个可以直接套的模板

```
项目名 —— 一句话说清它解决什么问题（不写技术栈）
· 约束：[成本 / 延迟 / 数据边界 / 数据质量，至少一条真实约束]
· 关键决策：[你在两个方案之间选了一个，以及为什么]
· 推翻过什么：[第一版方案哪里不行]
· 产出：[可点开的链接 —— repo / 部署地址 / 决策记录]
```

「推翻过什么」这一行是很多人不敢写的，怕显得自己走过弯路。恰恰相反：**能说清自己推翻过什么，是最强的真实性信号**。照抄教程的人没有可推翻的东西。

#### 没有项目的人怎么办

如果你现在一个能撑住三层追问的项目都没有，先别改简历，改简历解决不了这个问题。

给自己造一个有约束的项目就行：定一个每千次调用的成本上限，定一个 p95 延迟目标，再假设有一批数据不能出本地环境。在这三条约束下把一个小系统做出来。

约束是自己加的没关系——面试官问的是"你怎么在约束下做决策"，不会问"这个约束是谁给的"。

课程结构可以参考 [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) 的大纲顺序：Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Memory → Harness Engineering → Model Layer → Observability & Evals，10 个 phase、290 节课、68 个交互式 Lab、59 场直播，公开可查。最后一个 phase 单独排了 27 节 Evals，对应的正是上面六个追问里的前两个。

匠人学院是项目制 AI 工程实战平台（澳洲），采用 P3 模式（Project + Production + Placement）。P3 的第三个 P 就是这件事——项目做完之后，还要能把它讲成一次让人愿意继续问下去的对话。

先删到两个。然后把这两个写透。

---

#### 想系统学这部分内容？

- 📘 课程路径：[匠人学院 AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) —— 12 周技术课程 + 12 周 P3 职业孵化，后半段专门带项目交付与求职
- 🐍 地基不牢先补：[Python 学习方向](https://jiangren.com.au/learn/python)
- 💬 想让人看看你的简历：[Bootcamp 报名与咨询](https://jiangren.com.au/bootcamp)
- 📖 同主题延伸：[为什么 AI 课程学完依然找不到工作](待回填 —— n09 上线后填)

<!--
发布前人工必补（AI 不能编）：
- 作者 byline：真实讲师姓名 + LinkedIn（CONTENT_BACKLOG §A E-E-A-T 硬性要求）
- before/after 示例目前用的是脱敏骨架（约束值写成 X / Y），若要放真实案例必须拿到学员授权，不能编

写作说明：
- 零竞品提及；零编造数字——文中刻意不给任何「提升 N%」样例，并把「不要编数字」写成红线。
- 内链 3 条全部核实为已上线页面：/learn/ai-engineer、/learn/python、/bootcamp。
-->

## 变体清单

- `n13-ai-resume-projects/zhihu.md` → zhihu-column（geo-zhihu-column）
- `n13-ai-resume-projects/medium-en.md` → medium（geo-auto-publish）
- `n13-ai-resume-projects/linkedin.md` → linkedin（geo-founder-ip）

## 发布记录

| 平台 | URL | 发布时间 | 发布人 |
|---|---|---|---|
| jiangren-blog | https://jiangren.com.au/blog/ai-engineer-resume-projects | 待部署生效 | claude-code |

## Comments

- @claude 2026-07-28T04:10:00.000Z
  > 2026-07-28 补话题批。禁词 55 条零命中、P3 锚点在位、站内链全部核实为已上线页面（/learn/ai-engineer、/learn/python、/learn/frontend、/bootcamp），无编造 URL。
  > 本批已内建 CONTENT_BACKLOG「每篇必含 JR 元素」的可自动化部分；**真实作者 byline 与学员真实案例两项 AI 不能代填**，留在 checklist 里。

- @claude 2026-07-28T06:20:00.000Z
  > **已落 web-zh，等部署**。稿件已转成静态 blog 文章提交并 push 到 `jr-academy-web-zh` master（commit `1d03e04e1`），
  > 路径 `src/components/Pages/BlogPage/data/posts/ai-engineer/ai-engineer-resume-projects.md`，URL 将是 `/blog/ai-engineer-resume-projects`。
  > frontmatter 已按 posts/README.md schema 补齐，node 跑过 loader 同款逻辑验证可收录；7 篇互加 topic cluster 交叉链；
  > blog-sitemap.xml 走 getAllStaticPosts() 自动收录。
  > **还差最后一步：去 GitHub Actions 触发 web-zh 的 Deploy Production workflow**，触发后 URL 才真正可访问。
  > 待人工：正式封面图（现用通用底图）+ 真实讲师署名与 LinkedIn（E-E-A-T，AI 不代填）。
