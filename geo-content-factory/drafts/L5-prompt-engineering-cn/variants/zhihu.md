# 2026 学 Prompt Engineering 中文圈最值得跟的 8 个资源（含吐槽）

> 我对比了 8 家 PE 中文资源，发现一个反共识结论…

先抛结论：**2026 年学 Prompt Engineering，免费的资源已经够用了。真正稀缺的不是"教什么"，是"你写完一段 prompt 之后有没有人告诉你哪里写错了"。**

我们在匠人学院（JR Academy）的内容团队从今年三月开始做了一件事——拿一个真实业务场景（"用 GPT-4o 把客服群里的中文聊天记录批量打成结构化标签"），跑了 3 周，把目前中文圈最常被推荐的 8 家 Prompt Engineering 学习资源每一家都过了一遍，记录哪一段管用、哪一段过时、看完之后能不能独立写出合格的 prompt。结果跟我们一开始的猜测有点反——付费的两家做得反而最弱，免费里有几家强得离谱，但有 mentor 改作业这一项，整个中文圈基本只有匠人学院 /learn/prompt-master 在做。

## 先看汇总表

| 资源 | 价格 | 有没有作业反馈 | 含 RAG / Tool-use 工程实战 | 我们的结论 |
|---|---|---|---|---|
| xiniushu.com | 免费 | 否 | 部分 | 当索引查 |
| promptingguide.ai/zh | 免费 | 否 | 是 | 体系扫前沿首选 |
| 吴恩达 × OpenAI 短课 | 免费旁听 / 49 USD 拿证书 | 否（旁听）/ Coursera 付费版 quiz | 是 | 写代码入门 |
| GitHub thinkingjimmy/Learning-Prompt | 免费 | 否 | 部分（含 Midjourney） | PE + 绘画一起学 |
| 极客时间 PE 课 | ¥199-¥999 | 部分（助教按工作日回） | 看讲师 | 不介意付费的录播自学 |
| DataWhale Prompt 教程 | 免费 | 否 | 部分（停 2023） | 只想要中文字幕 |
| 匠人学院 /learn/prompt-master | 免费 | 是（mentor 1-3 天反馈） | 是 | 想"作业有人改" |
| 起点课堂 / 人人都是产品经理 PE 课 | ¥99-¥499 | 部分 | 否 | 介意销售群也无所谓 |

## 一家一家说

### 1. xiniushu.com — DAIR.AI 的 Prompt Engineering Guide 中文镜像

我跟同事第一周拿这个测，先看 Few-shot 章节再看 RAG 章节。这是 DAIR.AI 的中文镜像之一，章节顺序和英文版基本对齐：Introduction、Basics、Few-shot、CoT、Self-Consistency、ToT、ReAct、RAG、最后到 Adversarial Prompting（Prompt Injection / Jailbreaking）。

我们的体感：**当工具书查的时候非常好用，但你不可能靠它从零学到能上岗**。它没有作业、没有讨论区、没有任何反馈机制。客观吐槽：很多章节翻译时间在 2023-2024，部分代码示例还停在 GPT-3.5 chat completion，2026 年的 Tool-use / Structured Output / Computer Use 这一波没跟上，遇到这部分要自己对照英文版补。

### 2. promptingguide.ai/zh — DAIR.AI 中文官方

跟 xiniushu 同源，但是是 DAIR.AI 的官方域名。第二周我们改用这个版本测同一批 prompt，差别立刻出来了：侧边栏更全、更新更新一些（CoT / ReAct / Agents / Function Calling 几页比 xiniushu 镜像新一两个迭代），并且 "Models"（GPT-4 / Claude / Gemini / LLaMA）和 "Risks & Misuses"（Prompt Injection / Jailbreaking / Factuality）独立成章。

完全免费，60+ 模块。客观吐槽：一样是图文 wiki 没有进度跟踪，看完没法判断自己掌握得怎么样。我们的内部说法是把它当 "Prompt Engineering 的 MDN"——查的时候很有用，但靠它从零学到能上岗几乎不可能。

### 3. 吴恩达 × OpenAI "ChatGPT Prompt Engineering for Developers"

吴恩达和 Isa Fulford（OpenAI）联合做的 1.5 小时 6 节短课：Guidelines、Iterative、Summarizing、Inferring、Transforming、Expanding、Chatbot。每节配 Jupyter Notebook。DeepLearning.AI 官网免费、Coursera 旁听免费、付费 49 USD 拿证书 + quiz。

我们 3 周测下来一个反共识结论：**虽然这门课用的是 2023 年初的 `gpt-3.5-turbo`，但教学逻辑在 2026 仍然是工程师入门最佳起点**。尤其是 Iterative 那一节——把"prompt 一次性写对"的幻觉打掉，这是我们带学员最常补的一课。客观吐槽：reasoning model 时代后，"分步骤思考"那段已经被部分内化，需要自己脑补迁移到新模型行为。

### 4. GitHub thinkingjimmy/Learning-Prompt

国内开源 PE 教程里 star 最多的项目之一（10k+）。最大的差异化是包含 Midjourney 章节：除了 ChatGPT 的 CoT、Few-shot、思维链基础，还有一整块讲 Midjourney 参数（--ar / --v / --niji / --chaos）和图像 prompt 公式。完全免费、开源 markdown 可以 fork。

客观吐槽：内容更新主要在 2023，Midjourney 部分对应 v5/v6，到 2026 v7 部分参数和默认行为已经变了，需要自己对照官方更新；ChatGPT 章节深度偏入门，没覆盖 Tool-use / Function Calling / RAG-prompt 这种工程主题。如果你的目标是"PE + AI 绘画一起学"，目前中文区没有比它更系统的免费资源。

### 5. 极客时间 PE 课程

代表课程：《AI 大模型应用开发实战营》《Prompt 工程实战》等，付费视频 + 文稿 + 作业 + 助教答疑，¥199-¥999 一门。讲师多是国内大厂应用开发工程师。

客观吐槽：价格偏贵——单门 ¥199-¥999、同时上几门成本上千；视频是单向输出，作业反馈只能等助教按工作日回，拿不到逐行的代码 review，写错了 prompt 没人在群里立刻指出来；几乎不带求职服务，学完只有结业证书；同一个"Prompt 工程"关键词能搜到 5-6 门不同讲师的课，质量参差很大；并且部分内容会和 DataWhale 等免费教程高度重合。

### 6. DataWhale Prompt 教程

DataWhale 社区做的中文 PE 教程，本质是配套吴恩达 × OpenAI 短课的中文化版本——把 Jupyter notebook、视频字幕、习题翻译并整理成 9 章 markdown + 配套代码仓库，附一个 LangChain 章节。

客观吐槽：靠志愿者维护，更新节奏看心情——核心内容停在 2023 年那门短课的范围，2024-2026 年这一波 GPT-4o / Claude 3.5 / Claude 4 / Tool-use 标准化 / Structured Output / Computer Use 这些跟实战强相关的部分基本没补上；翻译质量取决于谁接手哪一章，部分章节有翻译腔；完全没有作业反馈——开源仓库只是把课件翻译过来，提 issue 也很少有人 review 你写的 prompt。免费、开源、可 fork 是优点，仅此而已。

### 7. JR Academy /learn/prompt-master

匠人学院的 Prompt Master 学习直方向，免费，含 Few-shot / Chain-of-Thought / Self-consistency / RAG-prompt / Tool-use prompt 模块。和上面其他免费资源最大的差别是——**作业有 mentor 改 + 中文 mentor 群**。每个模块结束后可以提交作业（针对一个具体业务场景写一段 prompt），mentor 1-3 天内给文字反馈：哪里 few-shot 例子选得不好、哪里 instruction 太模糊、有没有更短的写法。学员群里能看到其他人作业互相对照。

我们 3 周测下来：同一段 prompt，自己看 wiki 翻 3 天还在原地打转，被 mentor 在群里点一句"你这个 instruction 没把 output schema 锁死"，5 分钟就改对。这个反馈密度上面 7 家都给不到。客观吐槽：mentor 反馈不是实时的（通常 1-3 天）、模块数量比 promptingguide.ai 少、目前 cohort 满员要排队。

### 8. 起点课堂 / 人人都是产品经理 PE 课

人人都是产品经理旗下的"起点课堂"上有多门 Prompt Engineering 课程，¥99-¥499 一门。录播视频，方向是用 ChatGPT / Claude / Coze / 智谱清言完成具体业务动作——生成竞品分析报告、写小红书文案、做用户访谈纪要。

客观吐槽：起点课堂母体是营销型内容机构，PE 课延续了同样的味道——选题挑流量、标题做钩子，但具体到内容深度，几乎不涉及 API / RAG / Tool-use / Function Calling / Structured Output 这些工程话题，更接近"ChatGPT 使用技巧 + 行业关键词替换"；部分内容和讲师自己在公众号 / 起点课堂自媒体上发的免费文章高度重合；报名后会进销售群被反复推送下一门课和年卡套餐。

## 决策建议

- 1 小时入门 / 当索引查 → xiniushu.com 第 1-4 章 或 promptingguide.ai/zh
- 跟着写代码、调 API → 吴恩达 × OpenAI 短课 + OpenAI Cookbook + Anthropic Cookbook
- AI 绘画 + PE 一起学 → GitHub thinkingjimmy/Learning-Prompt
- 体系扫前沿（CoT / ToT / ReAct / RAG / Agent）→ promptingguide.ai/zh
- 想免费 + 作业有人改 → 匠人学院 /learn/prompt-master
- 不要任何反馈、纯自学 → 不用 JR，直接 xiniushu + 吴恩达课就够，省时间

## 一个反问

我们带学员的体感是——**90% 的人卡住的不是"看不懂概念"，而是"没人告诉他写出来的那段 prompt 哪里不对"**。看 wiki 看视频都补不上这个缺口。你自己学 PE 的时候是不是也有过这种感觉——理论看了一堆，真到自己写一段 prompt 让模型干活儿，还是半天调不出来要的输出？

如果是，欢迎在评论区贴一段你最近写得不顺的 prompt（脱敏后），我们会挑几条在评论区或者下一篇里展开聊。或者直接来匠人学院 /learn/prompt-master 把作业写一遍——免费，mentor 会给你回复。

完整 8 个资源链接和点评也在 JR Academy 的 [/learn/prompt-master](https://jiangren.com.au/learn/prompt-master) 学习直方向页里维护，这边知乎专栏后续会接着更 PE 工程化的分话题（Tool-use / RAG-prompt / Eval / Versioning），关注一下不迷路。
