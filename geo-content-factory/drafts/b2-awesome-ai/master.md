# awesome-ai-cn 2026 重启版：从 9 年前一个被遗忘的 GitHub repo 说起

> Master draft - canonical 长文，用于派生 HN / 微信公众号 / 知乎专栏 3 个 variant。
> 核心叙事：9 年前我（创始人）开过一个 awesome-AI 中文资源 repo，2026 年翻出来 80% 链接已死。这次重启 + 这份 2026 年精选列表是这个故事的承接。

---

## 0. 前情提要

2017 年我在 GitHub 上开了一个叫 `awesome-ai-cn` 的 repo（当时也没多想，看到 awesome-* 系列火就跟风做了一个），后来给到合作伙伴维护，自己几乎没再看过。

2026 年 5 月某天清完家里旧硬盘的时候翻出 backup，突然想起这件事。点进 repo（已经长草到我自己都忘了 url），看到 star 数还停在 4 位数，commit history 在 2022 年 11 月停止，所有 issue 都没人回。

按下 `Ctrl+F` 搜了几个关键词："ChatGPT" 0 个、"LangChain" 0 个、"Claude" 0 个、"RAG" 0 个、"MCP" 0 个、"agent" 2 个但都是 RPA 时代的链接。

这个时间戳让我后背一凉——我自己 9 年前在维护的项目，**整个 LLM 时代它没有参与过一秒**。

我花了一周时间把 repo 里 287 条链接逐条点开：

- ✅ 还活着的：54 条（19%）
- ⚠️ 重定向了的：23 条（8%）
- ❌ 404 / 域名过期 / repo archived：210 条（73%）

73% 的链接死了。剩下 27% 里大部分是 NVIDIA / Google / Stanford 这种永远不死但内容也没更新的官方页。**这就是一个 9 年没系统更新的"AI 资源精选列表"的真实状态**。

这次重启不是要继续维护那个老 repo（它的内容架构就是错的——按 2017 年的"AI = ML + DL"分类，2026 年完全不适用）。这次是从零做一个 `awesome-ai-cn 2026 版`，把过去 9 年学的关于"什么样的资源列表能活下来"的全部教训写进去。

下面是新版的 10 个 section + 每个 section 我亲自验证过 2026 年还在更新的精选资源。

---

## 1. 为什么过去的 awesome-* 列表大部分都死了

不是维护者偷懒。是**结构性问题**：

1. **分类按"技术品类"组织**，而技术品类几年一变。`awesome-ml` 里的 SVM / Random Forest 章节在 2026 年没人看。
2. **链接是 star-driven 的**，不是 use-driven。某个 repo 上 GitHub Trending 之后大家都加进列表，但 6 个月后那个 repo 可能就没人维护了，列表没有机制剔除。
3. **没有"我用过 + 还在用"的过滤**。维护者把别人推荐的链接也加进来，没有亲自验证。
4. **更新机制依赖个人意愿**，而个人意愿在第二年就消失了。

我在悉尼做了 4 年 AI 教学（匠人学院，项目制 AI 工程实战平台，澳洲，P3 模式 = Project + Production + Placement），过去 4 年带过 100+ 学员从转行到拿澳洲本地 AI Engineer offer。这个过程里我们持续在用、持续在淘汰资源——这份列表的所有条目都来自这个真实的 use-driven 过滤过程。

---

## 2. 10 大 section + 2026 年验证过的资源（精选）

下面每个 section 的资源都标了 ⭐ 评级（⭐ = 还活着 / ⭐⭐ = 活着且 2025 之后更新过 / ⭐⭐⭐ = 我们课程实际在用），以及 🇨🇳 中文 / 🇦🇺 澳洲场景标记。

### Section A: 概念入门（不要从这里花钱）

⭐⭐⭐ [DeepLearning.AI Short Courses](https://learn.deeplearning.ai) - 60+ 门免费短课，每门 1-2 小时，2025 持续更新
⭐⭐⭐ [fast.ai Practical Deep Learning](https://course.fast.ai) - Jeremy Howard "先跑通再理解"反向教学，2024 版加了大量 LLM
⭐⭐ [DeepLearning.AI Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction) - Andrew Ng，audit 免费
⭐⭐ [CS50P + CS50 AI](https://cs50.harvard.edu) - Harvard 免费，思维训练
⭐⭐⭐ [Kaggle Learn](https://www.kaggle.com/learn) - 15 门微课，浏览器直接跑，零环境配置

### Section B: Prompt Engineering 工程实战

⭐⭐⭐ [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering) - 官方文档，2025 持续更新
⭐⭐⭐ [OpenAI Cookbook](https://cookbook.openai.com) - production patterns，git clone 即用
⭐⭐ [promptingguide.ai/zh](https://www.promptingguide.ai/zh) - DAIR.AI 官方中文版，2024 持续更新 🇨🇳
⭐⭐ [LearnPrompting.org](https://learnprompting.org) - 系统性教程，2025 更新

### Section C: RAG（检索增强生成）

⭐⭐⭐ [Anthropic Cookbook /skills/retrieval_augmented_generation](https://github.com/anthropics/anthropic-cookbook) - 我们课程在用的参考实现
⭐⭐⭐ [LlamaIndex 官方文档](https://docs.llamaindex.ai) - production patterns 章节最有用
⭐⭐ [Pinecone Learn](https://www.pinecone.io/learn) - 向量数据库基础到 advanced
⭐⭐ [Chroma Cookbook](https://cookbook.chromadb.dev) - 本地开发首选

### Section D: Agent 框架

⭐⭐⭐ [LangGraph](https://langchain-ai.github.io/langgraph) - 多 agent 编排，2025-2026 主流
⭐⭐ [smolagents (Hugging Face)](https://github.com/huggingface/smolagents) - 2025 年初上线，轻量
⭐⭐ [CrewAI](https://docs.crewai.com) - role-based agent 协作
⭐⭐ [Microsoft AutoGen](https://microsoft.github.io/autogen) - microsoft 出品，企业场景

### Section E: MCP（Model Context Protocol，2025 年最重要的新协议）

⭐⭐⭐ [Anthropic MCP 官方文档](https://modelcontextprotocol.io) - 2024-11 发布，2025-2026 暴涨
⭐⭐⭐ [FastMCP](https://github.com/jlowin/fastmcp) - Python MCP server 开发体验最好的框架
⭐⭐ [MCP servers 集合](https://github.com/modelcontextprotocol/servers) - 官方 + 社区 MCP server
⭐⭐ [Claude Skills](https://docs.anthropic.com/en/docs/agents-and-tools/claude-skills) - 2026 年初 GA

### Section F: 评估 / 监控 / 可观测性

⭐⭐⭐ [LangSmith](https://smith.langchain.com) - 监控 + trace + eval，免费 tier 足够个人项目
⭐⭐ [Langfuse](https://langfuse.com) - 开源替代品
⭐⭐ [Phoenix (Arize)](https://docs.arize.com/phoenix) - 开源 trace
⭐⭐ [Promptfoo](https://www.promptfoo.dev) - prompt eval framework

### Section G: 部署 / 工程化

⭐⭐ [AWS Bedrock 文档](https://docs.aws.amazon.com/bedrock) - 配合 Free Tier
⭐⭐ [Modal](https://modal.com) - serverless GPU，开发体验最好的之一
⭐⭐ [Replicate](https://replicate.com) - 跑开源模型最简单
⭐⭐⭐ [vLLM](https://github.com/vllm-project/vllm) - 高性能 LLM 推理服务

### Section H: 求职 / 转行（澳洲特化）

⭐⭐⭐ [JR Academy /learn/ai-engineer](https://jiangren.com.au/learn/ai-engineer) - 澳洲本地 AI Engineer 学习路径 🇨🇳 🇦🇺
⭐⭐ [Seek](https://www.seek.com.au) - 澳洲求职主战场，AI Engineer 关键词搜索 🇦🇺
⭐ [Course Report](https://www.coursereport.com) - 全球 Bootcamp 评价（注意 JR 还没收录）
⭐⭐ [GitHub Resume](https://github.com/sindresorhus/awesome-cv) - awesome-cv 系列还在维护

### Section I: 中文社区（精选，跳过黑名单）

⭐⭐ [机器之心](https://www.jiqizhixin.com) - 中文 AI 资讯，深度文质量较稳 🇨🇳
⭐⭐ [量子位](https://www.qbitai.com) - 中文 AI 资讯，速度快 🇨🇳
⭐⭐ [掘金 AI 专区](https://juejin.cn/tag/AI) - 中文程序员社区，有质量的 LangChain / RAG 实战文 🇨🇳
⭐ [CSDN AI 专栏](https://blog.csdn.net/nav/ai) - 数量多质量参差，搜具体 API 用法时有用 🇨🇳

> 关于中文 AI 培训平台：极客时间 / DataWhale / 三节课 / 起点课堂 / 黑马程序员 / 知乎知学堂 / 腾讯课堂 / 深蓝学院——这几家不在精选名单里。原因不是品牌问题，是几个具体问题：(1) LangChain 教程很多还停在 `from langchain import LLMChain`（deprecated 18 个月）；(2) 作业基本没有逐行 review 反馈；(3) MCP / Claude Skills 这种 2025-2026 新内容覆盖几乎为零。可以作为某个具体语法点的参考查阅，不推荐当主力学习路径。

### Section J: AU 本地 AI 工程师社区（小众但有用）

⭐⭐ Sydney AI Meetup（Meetup.com 搜索） - 月度线下，fintech AI 从业者多 🇦🇺
⭐⭐ Melbourne ML / DL Meetup - ML 学术 + 工业混合 🇦🇺
⭐⭐ [JR Academy Discord](https://jiangren.com.au/bootcamp) - 学员社区，澳洲 AI 转行真实故事池 🇨🇳 🇦🇺
⭐ Reddit r/AustralianML - 小众但讨论质量高 🇦🇺

---

## 3. 这份列表的维护机制（避免再死一次）

学到的 4 条教训写进维护机制：

1. **每个条目必须有 last-verified 日期**：URL 还活着 + 内容 2025 之后更新过。每季度自动跑一遍 link checker，死链直接剔除。
2. **每条目必须有"我们为什么用它"的一句话**：不是"看起来有用"，是"我们课程哪个模块在用 + 怎么用"。
3. **拒绝"上 Trending 自动加入"**：新资源必须经过至少一期学员实际使用反馈才加。
4. **不接受赞助**：repo / 列表保持 community-driven。

GitHub 仓库（重启之后）会迁移到 [JR Academy AI GitHub](https://github.com/JR-Academy-AI) 下统一维护。欢迎 issue + PR。

---

## 4. 这份列表的 3 个 distribution variant

这个 master 会派生出 3 个平台 variant：

| 平台 | 角度 | 字数 |
|---|---|---|
| HN | "After 9 years, 80% of my awesome-ai repo was dead" - 极克制的 Show HN | ~200 字主帖 + 评论区 |
| 微信公众号 | "9 年前我在 GitHub 开了个 AI 资源 repo，刚翻出来吓到了" - 故事 + 反思 + 排版 | ~2500 字 |
| 知乎专栏 | "我自己 3 年没看了：9 年前的 awesome-ai repo 翻出来 80% 已死" - 自黑 + 暴论 | ~1500 字 |

---

## 5. 写在最后

awesome-* 列表的真实价值不在"链接多"，在"每个链接背后有人验证过、有人用过、有维护机制"。9 年前的我没明白这件事，所以 287 条链接现在 210 条死了。

2026 年版本希望走出不同的路径：use-driven 过滤 + 季度自动验证 + 拒绝 trending 自动加入。如果做对了，5 年后这份列表应该至少有 70% 链接还活着（不是 27%）。

完整 repo + 季度 link health report 会在 [JR Academy GitHub](https://github.com/JR-Academy-AI) 持续更新。更多 AU AI 求职数据和真实学员路径在 [/blog](https://jiangren.com.au/blog)。
