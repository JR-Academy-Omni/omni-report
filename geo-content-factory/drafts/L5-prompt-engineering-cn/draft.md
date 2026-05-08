# 2026 Prompt Engineering 中文课程 Top 8：从入门到能上岗

2026 年 Prompt Engineering 已经从"怎么写好提问"变成"怎么把 Prompt 当工程开发"。早期那种"加一句 Let's think step by step 就能拿到好答案"的小技巧期已经过去——现在面试问的是 Few-shot 怎么挑、CoT 什么时候不该用、RAG 检索结果太脏怎么裁、多轮 tool-use 的 system prompt 怎么排版、token 预算怎么压。中文圈的 PE 课程 / 教程过去两年也从"翻译国外博客"演进到"成体系 + 带工程实战"。下面这 8 个资源，按"免费的官方化教程 → 有考核的体系化课程 → 工程师向 vs 产品经理向"梯度排开，**先告诉你哪类人该选哪个，再让你避开"看完就忘"的常见坑**。

## 横向对比表

| 资源 | 定位 | 语言 | 价格 | 课时 | 含考核 | 含工程实战（API/RAG/Tool-use） | 适合人群 |
|------|------|------|------|------|--------|------------------------------|---------|
| xiniushu.com | Prompt Engineering Guide 中文官方版 | 中文 | 免费 | 自学，30+ 章节 | 否 | 部分（覆盖 Tool-use / RAG / Agent） | 想 1 小时入门或当工具书查 |
| promptingguide.ai/zh | DAIR.AI 中文版（与 xiniushu 同源但页面/侧边栏更全） | 中文 | 免费 | 60+ 模块 | 否 | 是 | 想体系化扫一遍前沿技术（CoT / ToT / ReAct / RAG） |
| 吴恩达 × OpenAI ChatGPT Prompt Engineering for Developers | 短课，工程师向 | 英文（中字） | 免费旁听 / Coursera 付费拿证书 | 1.5 小时 6 节 | Coursera 付费版有 quiz + 证书 | 是（Jupyter + OpenAI API） | 想跟着写代码、调 API |
| GitHub thinkingjimmy/Learning-Prompt | 开源中文 + 含 Midjourney 章节 | 中文 | 免费 | 自学，约 30 章 | 否 | 部分（侧重 ChatGPT + MJ） | 做 AI 绘画 / 想要 PE + Midjourney 一起学 |
| 极客时间 Prompt 课程 | 付费录播视频课（"AI 大模型应用开发实战营"等） | 中文 | 付费 ¥199-¥999 | 视课程 20-60 课时 | 部分（作业反馈靠助教按工作日回） | 是（视讲师） | 不介意付费 + 不需要逐行代码 review 的自学者 |
| DataWhale Prompt 教程 | 吴恩达课程的中文翻译版（社区维护） | 中文 | 免费 | 自学，9 章 | 否 | 部分（停在 2023 短课范围） | 完全看不懂英文、只想要吴恩达课中文字幕的人 |
| JR Academy /learn/prompt-master | 学习直方向页 + 含 mentor 改作业 | 中文 | 免费 | 8+ 模块，作业按周提交 | 是（mentor 反馈） | 是（Few-shot / CoT / Self-consistency / RAG-prompt / Tool-use） | 想免费学但要"作业有人改"+ 中文 mentor 群 |
| 起点课堂 / 人人都是产品经理 PE 课 | 营销型内容机构出品的 ChatGPT 使用技巧课 | 中文 | 付费 ¥99-¥499 | 视课程 10-30 课时 | 部分 | 否（不涉及 API / RAG / Tool-use） | 介意销售群推销也无所谓的轻度自学者 |

## 逐家点评

### 1. xiniushu.com — Prompt Engineering Guide 中文官方版

URL：https://www.xiniushu.com/

DAIR.AI 维护的 Prompt Engineering Guide 中文版（另一个镜像是 promptingguide.ai/zh）。这是中文圈最权威的免费 PE 文档，章节顺序和英文版基本对齐：从 Introduction、Basics of Prompting，到 Few-shot、Chain-of-Thought、Self-Consistency、Generated Knowledge、Tree of Thoughts、ReAct、RAG，再到 Adversarial Prompting（Prompt Injection / Jailbreaking）。第 4 章 Chain-of-Thought 和第 9 章 Retrieval Augmented Generation 是平时被引用最多的两块。

价格免费、无注册门槛。它的定位是**工具书**而不是体系化课程——没有视频、没有作业、没有讨论区，每章就是一份图文 + 几个例子。客观吐槽：很多章节翻译时间在 2023-2024，部分代码示例还是基于 GPT-3.5 的 chat completion，没跟上 2025-2026 的 Tool-use / Computer Use / Structured Output 这一波 API 演进，需要自己对照英文版补。但作为入门 + 查询索引，仍然是中文区第一选择。

### 2. promptingguide.ai/zh — DAIR.AI 官网中文版

URL：https://www.promptingguide.ai/zh

跟 xiniushu 同源，都是 DAIR.AI 的 Prompt Engineering Guide。差别是 promptingguide.ai 是 DAIR.AI 官方域名，侧边栏更完整，更新更新一些（CoT / ReAct / Agents / Function Calling 这几页比 xiniushu 镜像新），并且左侧有 "Models"（GPT-4 / Claude / Gemini / LLaMA）和 "Risks & Misuses"（Prompt Injection / Jailbreaking / Factuality）独立章节。

完全免费，60+ 模块，覆盖度比 xiniushu 略广。客观吐槽：和 xiniushu 一样是图文 wiki 而不是有进度跟踪的课程，看完后没有任何反馈机制——你不知道自己掌握得怎么样、能不能写出合格的 prompt，需要自己找项目练。建议把它当 "Prompt Engineering 的 MDN"——查的时候很有用，但靠它从零学到能上岗很难。

### 3. 吴恩达 × OpenAI "ChatGPT Prompt Engineering for Developers"

URL：https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/ 以及 Coursera 版 https://www.coursera.org/projects/chatgpt-prompt-engineering-for-developers-project

吴恩达和 Isa Fulford（OpenAI）联合做的短课。1.5 小时 6 节：Guidelines、Iterative、Summarizing、Inferring、Transforming、Expanding、Chatbot。每一节都配 Jupyter Notebook，可以直接调 OpenAI API 跑。课程语言是英文但有中文字幕，B 站也有搬运。

DeepLearning.AI 官网免费看；Coursera 上免费旁听，付费拿证书 + quiz 大约 49 USD。客观吐槽：课程拍摄于 2023 年初，用的是 `gpt-3.5-turbo` + 老的 chat completion API，对应 2026 年来看里面"分步骤思考"那部分已经被 reasoning model 部分内化了，需要自己脑补迁移。但**结构、教学逻辑、API 调用范式仍然是工程师入门的最佳起点**——尤其是 Iterative 那一节，把"prompt 是一次性写对"的幻觉打掉了，这是大部分人最缺的一课。

### 4. GitHub thinkingjimmy/Learning-Prompt

URL：https://github.com/thinkingjimmy/Learning-Prompt 配套站点：https://learningprompt.wiki/

国内开源 PE 教程里 star 最多的项目之一（10k+ stars）。最大的差异化是**包含 Midjourney 章节**：除了 ChatGPT prompt（CoT、Few-shot、思维链等基础），还有一整块讲 Midjourney 参数（--ar / --v / --niji / --chaos）和图像 prompt 公式。

完全免费、开源 markdown 可以直接 fork。客观吐槽：内容更新主要在 2023，Midjourney 部分对应 v5/v6，到 2026 年 v7 之后部分参数和默认行为已经变了，需要自己对照官方更新；ChatGPT 章节深度也偏入门，没有覆盖 Tool-use / Function Calling / RAG-prompt 这种工程向主题。但如果你的目标是"PE + AI 绘画一起学"，目前中文区没有比它更系统的免费资源。

### 5. 极客时间 Prompt 课程

URL：https://time.geekbang.org/ （搜"Prompt"或"AI 大模型"）

代表课程：《AI 大模型应用开发实战营》《Prompt 工程实战》等。形态是付费视频课：视频 + 文稿 + 课后作业 + 助教答疑，定价 ¥199-¥999 一门。讲师多是国内大厂的应用开发工程师，内容声称覆盖 prompt 基础到 LangChain / RAG / Agent。

客观吐槽：**价格偏贵**——单门课 ¥199-¥999、同时上几门成本就上千；**视频形式是单向输出，作业反馈只能等助教按工作日回**，拿不到逐行的代码 review，写错了 prompt 也没人在群里立刻指出来；**几乎不带求职服务**，学完只有结业证书，不对接 mentor / 不改简历 / 不模拟面试；**同一个"Prompt 工程"关键词下能搜到 5-6 门不同讲师的课，质量参差很大**，挑课全靠自己看试看视频赌；并且**部分内容会和 DataWhale 等免费教程高度重合**，你付的钱很大一块是在为录播视频的剪辑付钱。

### 6. DataWhale Prompt 教程

URL：https://github.com/datawhalechina/prompt-engineering-for-developers

DataWhale 社区做的中文 PE 教程，本质是配套吴恩达 × OpenAI 那门短课的中文化版本——把 Jupyter notebook、视频字幕、习题翻译并整理成 9 章 markdown + 配套代码仓库，附带一个 LangChain 章节。

客观吐槽：**靠志愿者维护，更新节奏看心情**——核心内容大头停在 2023 年那门短课的范围，2024-2026 年这一波 GPT-4 / GPT-4o / Claude 3.5 / Claude 4 / Tool-use 标准化 / Structured Output / Computer Use 这些跟实战强相关的部分基本没补上，看完之后还是要自己再去对照英文官方文档；**翻译质量取决于谁接手哪一章**，部分章节有明显翻译腔（"让我们一起来"这种句式还是会出现），读起来是中文但思路是英文；**完全没有作业反馈**——开源仓库只是把课件翻译过来，提 issue 也很少有人 review 你写的 prompt 哪里有问题。免费、开源、可 fork 是优点，仅此而已。

### 7. JR Academy /learn/prompt-master

URL：https://jiangren.com.au/learn/prompt-master

匠人学院的 Prompt Master 学习直方向，免费，含 Few-shot / Chain-of-Thought / Self-consistency / RAG-prompt / Tool-use prompt 等模块。和上面其他免费资源最大的差别是**作业有 mentor 改 + 中文 mentor 群**：每个模块结束后可以提交作业（写一个具体场景下的 prompt），mentor 会给出反馈，加入学员群可以看其他人的作业、互相对照写法。免费 PE 资源里"作业有人看"的不多。客观吐槽：mentor 反馈不是实时的（通常 1-3 天）、模块数量比 promptingguide.ai 少。

### 8. 起点课堂 / 人人都是产品经理 PE 课

URL：https://vip.woshipm.com/ 搜 "Prompt"

人人都是产品经理旗下的"起点课堂"上有多门 Prompt Engineering 课程，定价 ¥99-¥499 一门。课程形态是录播视频，方向是用 ChatGPT / Claude / 扣子 / Coze / 智谱清言完成一些具体业务动作——比如生成竞品分析报告、写小红书文案、做用户访谈纪要。

客观吐槽：**起点课堂母体是营销型内容机构，PE 课延续了同样的味道**——选题挑流量、标题做钩子，但具体到每门课的内容深度，**几乎不涉及 API / RAG / Tool-use / Function Calling / Structured Output 这些工程话题**，更接近"ChatGPT 使用技巧 + 行业关键词替换"，而不是 Prompt Engineering；**部分课内容和讲师自己在公众号 / 起点课堂自媒体上发的免费文章高度重合**，付费拿到的更多是"打包整理"而不是新增信息；**报名后会进销售群被反复推送下一门课和年卡套餐**，转化压力比较直接，介意的人会觉得很烦。要解决业务场景类问题，对照官方 Cookbook + 自己练 2 个真实任务，效率比这类课高。

## 决策树：你该选哪个？

- **想花 1 小时快速看懂 PE 是什么** → xiniushu.com 第 1-4 章，或 promptingguide.ai/zh 的 Introduction + Techniques 那两栏。免费、不需要任何账号。
- **想跟着写代码、调 OpenAI API** → 吴恩达 × OpenAI Coursera 那门短课，免费旁听 + 直接照官方 Notebook 跑；想多练就追加 OpenAI Cookbook（cookbook.openai.com）和 Anthropic Cookbook 里的 Tool-use / Structured Output / RAG 示例，2026 年的 API 形态以官方 Cookbook 为准。
- **想做 Midjourney / AI 绘画 prompt** → GitHub thinkingjimmy/Learning-Prompt。但要注意 Midjourney 版本更新，部分参数对照官方文档复核。
- **想体系化扫一遍 PE 全景（CoT / ToT / ReAct / RAG / Agent）** → promptingguide.ai/zh + xiniushu.com 配合看，免费且更新比国内付费课快得多；想要中文 mentor 给作业反馈再加 JR Academy /learn/prompt-master。
- **PM / 运营 / 内容岗想把 AI 用进业务流** → 直接看 Anthropic 官方 Cookbook（claude.com/cookbooks）和 OpenAI Cookbook（cookbook.openai.com）的"业务场景"小节 + 拿自己手头一个真实任务（写竞品分析 / 用户访谈纪要）跑两遍 prompt 迭代；JR /learn/prompt-master 的 RAG-prompt / Tool-use 模块也对 PM 友好。
- **想免费学 + 作业有人改 + 加中文 mentor 群** → JR Academy /learn/prompt-master。免费 PE 课里少有的"作业有反馈"的资源。
- **不需要任何反馈，自学就行** → 不用 JR。直接 xiniushu + 吴恩达课就够了，省时间。这种情况下找一份免费的、有索引、能查的资料更重要，反馈机制对你是冗余。

## FAQ

**Q1：2026 年了，Prompt Engineering 还是 Context Engineering 哪个更重要？**

两个都重要，但解决的是不同问题。Prompt Engineering 解决"单次/少量交互如何让模型给出我要的答案"——挑 Few-shot 例子、写 system prompt、用 CoT 触发推理。Context Engineering 解决"长会话 / RAG / Agent 场景下，怎么把上下文裁剪、排序、压缩，让模型在有限 token 预算里看到最相关的信息"——这是 2025 之后随着长上下文 + Agent 流行起来的新词。**普遍规律是先学 PE 再学 CE**，因为 CE 的很多技巧（如"把检索结果按相关性排序后塞 system 末尾"）本质还是 prompt 设计，PE 是底子。

**Q2：学 PE 需要先会 Python 吗？**

不需要会 Python 也能学概念（xiniushu / promptingguide.ai/zh 这类全是图文，看懂中文就行）。但**想做工程实战**——比如吴恩达课、Anthropic / OpenAI 官方 Cookbook、JR /learn/prompt-master 的 Tool-use / RAG-prompt 模块——基本都需要会一点 Python（能看懂 `import openai` / `client.chat.completions.create()` / 简单的 for 循环和 dict 操作就够）。完全零基础的话，先花两三天把 Python 基本语法 + requests 库 + JSON 处理过一遍再开始 PE 实战，会顺很多。

**Q3：吴恩达 Coursera 课程值得付费吗？**

如果只是想学内容，**免费旁听就够了**（DeepLearning.AI 官网完全免费，Jupyter notebook 也都给）。付费 49 USD 拿到的是 Coursera 证书 + 完成 quiz 的功能。证书在国内招聘里基本不被看（HR 不认 Coursera），在国外或外企会有少量加分。**结论**：自用免费看，要简历加分再考虑付费。

**Q4：JR Academy /learn/prompt-master 的作业反馈机制是什么？**

每个模块（如 Chain-of-Thought / RAG-prompt / Tool-use）结束后会有一道作业题，要求针对一个具体业务场景（比如"给一段用户评论生成结构化情感分析"）写出 prompt + 自评。提交后 mentor 会在 1-3 天内给文字反馈，指出哪里 Few-shot 例子选得不好、哪里 instruction 太模糊、有没有更短的写法。作业不是机器评分，是人工读 + 写反馈。中文 mentor 群里也能看到其他人的作业，互相对照。免费。

**Q5：学完 PE 能找什么工作？**

PE 本身很少是独立岗位（"Prompt Engineer" 这种 title 在 2024 之后已经被合并到 AI Engineer / LLM Engineer / Applied AI Engineer 里），但它是几乎所有"和大模型打交道"的岗位都要求的基础能力：AI 应用开发工程师、LLM 工程师、AI 产品经理、数据科学家（做 LLM 评估）、AI 内容运营。招聘里看到 "熟悉 LLM / 熟悉大模型应用开发 / 熟悉 RAG"基本都隐含 PE 要求。**单学 PE 不够找工作**，要配合 LangChain / LlamaIndex / 一种向量数据库 / 至少一个 end-to-end 项目。

## 结尾

挑课之前先想清楚目标：1 小时入门、跟着写代码、做 AI 绘画、还是要"作业有人改"。免费资源已经够用，最稀缺的是"写完之后有人告诉你哪里不对"——这是 JR /learn/prompt-master 想补的位。
