# 2026 AI Agent 课程横向评测：8 家横向对比（含 LangGraph / MCP 技术深度）

去年这时候我跟着某门 Agent 课跑 demo，一行 `from langchain.agents import initialize_agent` 直接 ImportError——那门课基于 LangChain 0.0.x 录制，到 2026 年 import 路径已经迁到 `langchain.agents` 子模块拆分，老 API 全废。再加上 OpenAI Function Calling 在 2024 中迁到 `tools` 参数（旧的 `functions` 字段虽然兼容但官方明确不推荐），这两个变化让大量 2024 年的视频课直接报废。

这种事一年要遇到三五次。所以这篇评测我把目前还在更新、API 跟 2026 年实际开发对得上的 8 家 AI Agent 课程/资源拉出来逐个跑过——重点看技术栈深度（LangGraph state、smolagents ReAct loop、MCP）、API 是否过期、能不能让你交出能 demo 的项目。

## 横向对比一张表

| 课程 | 形态 | 价格 | 技术栈深度（LangGraph/MCP/smolagents） | 项目交付 | 1:1 mentor | 适合谁 |
|------|------|------|------------------|----------|------------|--------|
| Hugging Face Agents Course | 官方扫盲 | 免费 | smolagents 源码级 / LangGraph 中等 / 无 MCP | 3 单元 + 最终项目 | 无 | 0 基础想看官方路线 |
| Microsoft AI Agents for Beginners | GitHub | 免费 | Semantic Kernel / AutoGen 重 / LangGraph 弱 | 10 节 sample | 无 | 微软系 / Azure |
| didilili/ai-agents-from-zero | 中文 GitHub | 免费 | LangChain Function Call 重 / LangGraph 浅 | 10+ notebook | 无 | 中文阅读偏好 |
| DeepLearning.AI 短课 | Andrew Ng | 免费 / Plus $39/月 | 多框架各一门，每门 1-2h | 1 个 notebook/课 | 无 | 有 Python 基础 |
| LangChain Academy | 官方 | 免费 | LangGraph state/HITL/multi-agent 全套 | 6 模块作业 | 无 | LangChain 重度用户 |
| Coze / Dify | 低代码 | 免费起步 | 无代码 / 自定义 LLM 受限 | 取决用户 | 无 | 不写代码做内部工具 |
| 匠人学院 AI Engineer Bootcamp | 中文 Bootcamp | 付费 AUD $2K-$7K | RAG / LangGraph / MCP 全栈 | 4-6 项目 + GitHub | 有 1:1 代码 review | 中文学员 + 澳洲求职 |
| 极客时间 AI 编程系列 | 国内付费视频 | ¥99-299/课 | prompt + 应用拼装 / LangGraph 弱 / 无 MCP | 跟课作业 | 无 | 国内付费视频用户 |

## 8 家技术深度逐家拆

### Hugging Face Agents Course

完全免费，官方维护，2025/02 上线，2026 年继续滚动更新。Unit 0-4 + Bonus 全开。技术栈最大亮点是 **smolagents**——HF 自家的轻量 Agent 框架，ReAct loop 是直接源码级讲清楚的：每一步 LLM 输出怎么解析成 action、tool 怎么注入、observation 怎么塞回 prompt 都能在源码里 trace。这点 LangChain 官方课程都做不到（LangChain 内部封装太多，看不到 raw prompt）。LangGraph 在 Unit 3-4 也覆盖了，但深度不如 LangChain Academy。

**吐槽**：Unit 跨度大，Unit 1 还在解释 ReAct，Unit 2 立刻 multi-step + code agent，零基础学员的 churn rate 在 Unit 2 最高。社群答疑全在 Discord 时区不友好。证书要 2026/07/01 前提交最终作业。

### Microsoft AI Agents for Beginners

GitHub 仓库 `microsoft/ai-agents-for-beginners`，10 节，Python + .NET 双语 sample。技术栈核心是 Semantic Kernel + AutoGen——和 LangChain 生态相对独立的另一条路线。每节有可跑的 Jupyter notebook 部署在 Azure AI Foundry。

**API 提示**：notebook 里大量调用 `azure.ai.inference.ChatCompletionsClient`，本地跑要么用 GitHub Models 免费 token（速率慢），要么改成 OpenAI/Anthropic 的标准 Chat Completions。Semantic Kernel 的 plugin 机制和 LangChain 的 tool 概念能映射，但 prompt template 系统差异大，学完 SK 再切 LangChain 要重新熟悉。

**吐槽**：deeply tied to Azure。后面如果不打算用 Azure，这门课工程实践参考价值打折。

### didilili/ai-agents-from-zero

中文 GitHub 教程，作者 didilili。从 OpenAI Function Calling 到 LangChain Agent 到 RAG 到多 Agent，10+ notebook 全中文注释。技术栈偏 LangChain 早期 + Function Calling，对 LangGraph 覆盖较浅。

**API 迁移坑**：notebook 里部分代码基于 LangChain 0.1.x。LangChain 0.1 → 0.3 的 breaking change 包括 `from langchain.chat_models import ChatOpenAI` 迁到 `from langchain_openai import ChatOpenAI`、`AgentExecutor` 大量参数语义变化、`initialize_agent` 直接 deprecated。跑某些 notebook 必须自己改 import 才能跑通。

**吐槽**：单人维护更新慢；缺成体系的项目大作业。

### DeepLearning.AI 短课系列

Andrew Ng 的平台，Agent 相关短课大概十几门。重点几门：
- *AI Agents in LangGraph*：Harrison Chase 亲讲，LangGraph state machine + checkpointing 入门
- *Multi AI Agent Systems with crewAI*：João Moura 亲讲，crewAI role-based 多 Agent
- *AI Agentic Design Patterns with AutoGen*：AutoGen 多 Agent 协作
- *Functions, Tools and Agents with LangChain*：OpenAI Function Calling → LangChain tool wrapping

每门 1-2 小时一个 notebook，免费观看，Coursera Plus $39/月拿专项证书。讲师都是框架作者本人，含金量足。

**吐槽**：每门只够覆盖一个框架的核心概念 + toy example。学完一堆短课的人最常见状态是"框架 API 都见过，没一个能独立做完整项目"。

### LangChain Academy

LangChain 官方免费课。核心是 *Introduction to LangGraph*，6 模块覆盖：
- Module 1：LangGraph 基础 + StateGraph
- Module 2：Memory、checkpointing、persistence
- Module 3：Human-in-the-loop（interrupt + 用户输入回填）
- Module 4：Multi-agent 协作（supervisor 模式 / hierarchical 模式）
- Module 5：Streaming + token 级输出
- Module 6：Deployment（LangGraph Platform / 自托管）

最大优势是 LangGraph Studio + LangSmith trace 集成，调试体验是其他课程没法比的——你能看到每一步 state 的 diff、每个 LLM call 的 raw prompt 和 token 数，直接定位 prompt injection / hallucination。

**吐槽**：纯 LangGraph 不教其他框架，技术栈绑定深。如果以后行业风向变（比如 OpenAI Responses API + 原生 tool use 替代 LangGraph），具体 API 会过期。课程难度中级，没 LangChain 基础硬啃会很痛苦。

### Coze（扣子）/ Dify

严格说不是课程是低代码 Agent 平台。Coze 国内字节出品免费可商用；Dify 开源 GitHub 6w+ star 可自托管，企业版按 workspace 收费。官方文档 + B 站教程已经够搭企业内部 Agent。

**自定义 LLM 逻辑边界**：两家都支持自定义 prompt template、tool 接入、knowledge base，但**自定义 state machine 受限**——一旦你需要 LangGraph 那种带 conditional edge + checkpointing + interrupt 的复杂 flow，Coze/Dify 的可视化 workflow 会力不从心。Dify 可以通过自定义 plugin 部分突破，但要写 Python；Coze 的 workflow 节点目前还无法表达 LangGraph 级别的 state graph。

**吐槽**：低代码天花板就是低代码。停在 Coze/Dify 拿不到 AI 工程师 offer。

### 匠人学院 AI Engineer Bootcamp

匠人学院（JR Academy）的 AI Engineer Bootcamp，付费，4-12 周（按 tier，AUD $2K-$7K），中文教学，悉尼/墨尔本本地华人导师。技术栈覆盖 RAG（chunking 策略、embedding 选型、re-rank、hybrid search）、LangGraph（state、HITL、multi-agent）、MCP（Model Context Protocol，2024 年底 Anthropic 提的标准化 tool 协议）、Agent 多模块。结业要交一个能跑、能 demo 的 GitHub 项目。

**1:1 代码 review** 是和其他课最大不同。每个学员的项目代码都要导师过一遍，重点看：
- prompt 写法是否冗长（很多学员第一版 prompt 4000 token，review 之后压到 800 token，效果反而提升）
- tool 拆分粒度（一个 tool 干太多事 vs 拆得太碎要多轮 LLM call）
- 错误处理（LLM 输出 schema 不对怎么 retry / fallback / 报警）
- token 成本估算（一个完整 Agent session 跑下来多少 input/output token，一天 1000 个用户成本多少）

最后这点很多学员之前没考虑过——「自己写一个 Agent 要花多少 token」是工程化必须算的题。我们让学员上线前必须做 token cost projection：单次会话平均 token、月活 × 平均会话数 × 单价 = 月成本，再决定要不要做缓存、要不要降级 model（GPT-4o → GPT-4o-mini）、要不要 prompt compression。这是录播课不会教但 production 必须懂的事。

**吐槽**：澳洲市场导向，悉尼/墨尔本求职辅导是核心卖点，不在澳洲找工作的学员买求职部分基本浪费。Bootcamp 时间表偏紧，在职党要保证每周 10-15 小时投入才跟得上。

### 极客时间 AI 编程系列

国内极客时间平台，《循序渐进精通 AI 编程》《AI 大模型应用开发实战》等单课 ¥99-299，案例多用国产模型（通义/豆包/文心）。

**吐槽**：（1）单课 ¥99-299 看着便宜凑齐 Agent 路径要好几门，年卡再加一笔，对比几乎全免费的英文官方课（HF / LangChain Academy / DeepLearning.AI）性价比不高；（2）偏 prompt + 应用拼装，对 LangGraph state、smolagents ReAct loop、MCP 这种底层覆盖明显弱于英文课程；（3）视频更新跟不上 LangGraph、MCP 几个月一波 breaking change，2024 年录的内容到 2026 年 API 已变；（4）纯录播 + 微信群答疑无 1:1 代码 review；（5）求职服务弱，海外求职这一档不解决。

## 自己写一个 Agent 要花多少 token——工程化考虑

很多教程不讲这个。一个能查日历、读邮件、跑 SQL、写报告的 Agent，单次会话粗略估算：

- System prompt + tool schema：约 1500-3000 token（取决于 tool 数量和描述详细度）
- 用户 query + 历史对话（5 轮）：约 800-2000 token
- LLM thought + tool call（3-5 轮 ReAct loop）：每轮 input 累积、output 200-500 token
- 一次完整会话 input 累计：约 8000-20000 token；output 约 1500-3000 token

按 GPT-4o 定价（input $2.5/M、output $10/M），单次会话约 $0.03-$0.08。如果一天 1000 用户每人 5 次会话，月成本 $4500-$12000——这是产品上线前必须算清楚的题。优化路径：

1. **Prompt caching**（Anthropic / OpenAI 都支持）：system prompt + tool schema 命中缓存，命中部分单价降到 1/10
2. **Model tier 分流**：简单 query 走 GPT-4o-mini（$0.15/M input），复杂 reasoning 走 GPT-4o
3. **Tool schema 压缩**：tool description 从 500 token 压到 100 token，效果不一定下降
4. **Memory truncation**：超过 N 轮自动 summarize 旧对话

匠人学院 Bootcamp 把这块单独列一节，因为我们带的学员里 80% 第一版 Agent 都是 token 黑洞，做完成本测算才发现"原来自己设计的产品根本无法 launch"。

## 决策树

- 0 基础先扫盲 → HF Agents Course 或 Microsoft AI Agents for Beginners
- 有 Python 想跑通 LangChain 项目 → DeepLearning.AI 短课 → LangChain Academy 系统补 LangGraph
- 不写代码搭企业内部 Agent → Coze（国内）或 Dify（自托管），别买课
- 中文阅读偏好自学 → didilili 打底 + DeepLearning.AI 补框架
- 想做项目 + 1:1 代码 review + 澳洲求职 → 匠人学院 AI Engineer Bootcamp
- 国内在职转 AI 应用 → didilili + DeepLearning.AI 字幕版 + LangChain Academy；已买极客时间年卡当背景看，别当主线
- 不在澳洲、不需要 mentor、想自摸 → 匠人学院不适合你，订 DeepLearning.AI Plus + LangChain Academy 更划算

## FAQ

**Q：LangChain 升到 0.3 之后我之前学的还能用吗？**
A：核心思想（chain、agent、tool）能用；具体 API 大量重写。`from langchain.chat_models` 全迁到 `from langchain_openai`/`langchain_anthropic`；`AgentExecutor` 推荐被 `langgraph` 取代；`initialize_agent` deprecated。学新课优先选 2025 年之后的内容。

**Q：MCP 该学吗？**
A：现在还早期。Anthropic 2024 年底提出，目标是替代各家 framework 自己定义的 tool 协议成为标准。Claude Desktop 已经支持，2026 年看起来主流 Agent 框架会陆续接入。建议看一下概念，等你做产品要接入第三方 tool 时再深入。匠人学院 Bootcamp 已加入 MCP 一节。

**Q：smolagents 和 LangChain 有啥区别？**
A：smolagents 是 HF 推的轻量 Agent 框架，主打 code-as-action（让 LLM 直接生成 Python 代码作为 action 而不是结构化 tool call），代码量是 LangChain 的 1/10，源码读完不用一晚。LangChain 是大而全的生态，覆盖更多场景但封装更深、调试更难。新手两个都接触一下。

**Q：学完 Agent 课程能找到工作吗？**
A：单一 Agent 技能不能。AI 工程师岗要 Python + LLM API + RAG + Agent 框架 + 向量数据库 + 云平台部署 + 一个能 demo 的项目。任何课只覆盖一两块。

---

延伸阅读：
- 创始人专栏：JR Academy 怎么看 2026 AI Agent 求职市场
- 匠人学院 AI Engineer Bootcamp：jiangren.com.au/bootcamp/ai-engineer
