# 2026 学 AI Agent 实战课程 8 选：哪个真的能上手做项目

照着 LangChain 文档抄完一遍，跑通 hello world，import langchain 看着 chain.invoke() 输出"你好"——然后呢？这是 2025 年下半年开始大量出现的吐槽：教程跑通了，自己想做一个能查日历、读邮件、跑 SQL、再写报告的 Agent，立刻卡住。问题不在文档，在课程。市面上 AI Agent 课程要么是"概念扫盲 + 一个 todo demo"，要么是几小时短课只够跑通 LangChain 官方样例。本文盘点 8 个目前实际还在更新的 AI Agent 课程/资源，按"能不能让你交出一个能跑、能 demo、面试时能讲的项目"排序。

## 横向对比表

| 课程 | 定位 | 价格 | 主打技术栈 | 实战项目数 | 1:1 mentor | 时长 | 适合人群 |
|------|------|------|-----------|-----------|-----------|------|---------|
| Hugging Face Agents Course | 官方扫盲 | 免费 | smolagents / LlamaIndex / LangGraph | 3 个单元作业 + 1 个最终项目 | 无（Discord 社群） | 自定（约 30-50h） | 想看官方权威路线的 0 基础 |
| Microsoft AI Agents for Beginners | GitHub 课程 | 免费 | Azure AI / Semantic Kernel / AutoGen | 10 节每节附 code sample | 无 | 10 节，自学 | 微软系开发者 / .NET 背景 |
| didilili/ai-agents-from-zero | 中文 GitHub 教程 | 免费 | LangChain / OpenAI Function Call | 10+ 案例 | 无 | 自学 | 中文阅读偏好 |
| DeepLearning.AI 系列 | Andrew Ng 平台短课 | 免费（多数）/ Plus $39 月 | LangChain / AutoGen / LangGraph / CrewAI | 每课 1 个 notebook 作业 | 无 | 单课 1-2h | 有 Python 基础 |
| LangChain Academy | 官方课程 | 免费 | LangGraph / LangSmith | 6 模块作业 | 无 | 约 15-20h | LangChain 重度用户 |
| Coze / Dify | 低代码平台（非课程） | Coze 国内免费 / Dify 自托管免费 | 可视化 workflow + 内置 LLM | 取决于用户 | 无 | 上手 1-2 天 | 不写代码做企业内部工具 |
| JR Academy AI Engineer Bootcamp | 中文 Bootcamp | 付费 | RAG / LangGraph / MCP / Agent 多模块 | 4-6 个项目 + GitHub demo | 有 1:1 代码 review | 4-12 周 | 想拿澳洲 IT offer 的中文学员 |
| 极客时间 AI 编程系列 | 国内付费视频课 | 单课 ¥99-299 | 偏 prompt + Agent 应用 | 跟课作业 | 无（社群答疑） | 单课 5-10h | 国内付费视频课用户 |

## 逐家点评

### Hugging Face Agents Course

完全免费，官方维护，2025 年 2 月正式上线，目前 Unit 0-4 + Bonus 全部开放。课程从"什么是 Agent"讲到 LangGraph 多 Agent 协作，最终项目是把 Agent 提交到 HF Leaderboard 评分。最大优势是 **smolagents**（HF 自家的轻量 Agent 框架）从源码层面讲清 ReAct loop，对想搞懂底层的人非常友好。证书需要在 7 月 1 日前完成最终作业才能拿到。**吐槽**：Unit 之间难度跳跃大，Unit 1 还在讲"Agent 是什么"，Unit 2 直接上 code agent 和 multi-step reasoning，零基础学员中途卡住的不少。社群答疑全在 Discord，时差党基本得自己 debug。

### Microsoft AI Agents for Beginners

GitHub 仓库 `microsoft/ai-agents-for-beginners`，10 节课，每节配 Python 和 .NET 两套 code sample，免费。覆盖 Agent 设计模式、工具使用、planning、multi-agent，主推 Microsoft 的 Semantic Kernel + AutoGen。**优势**：每节都有可运行的 Jupyter notebook，部署在 Azure AI Foundry 上，企业用 Azure 的话直接能套。**吐槽**：deeply tied to Azure，本地跑要么用 GitHub Models 免费 token（速率慢），要么自己接 OpenAI API。如果你以后不打算用 Azure，这门课的工程实践参考价值会打折。

### didilili/ai-agents-from-zero

GitHub 仓库，中文，作者 didilili，星标在持续涨。从 OpenAI Function Calling 讲到 LangChain Agent 再到 RAG 和多 Agent，10+ 个 demo，全部 Jupyter notebook 形式。**优势**：纯中文，很多概念配了"用大白话讲一遍"的注释，对英文吃力的学员很友好。**吐槽**：单人维护，更新节奏跟不上 LangChain 的版本变化（LangChain 0.1 → 0.3 改了不少 API），跑某些 notebook 要自己改 import；缺系统的项目大作业，学完容易停在"会跑 demo 但不会做产品"。

### DeepLearning.AI 短课系列

Andrew Ng 的平台，相关 Agent 短课大概有十几门，包括《AI Agents in LangGraph》《Multi AI Agent Systems with crewAI》《AI Agentic Design Patterns with AutoGen》《Functions, Tools and Agents with LangChain》，多数 1-2 小时一门，免费。Coursera Plus 订阅 $39/月可以拿专项证书。**优势**：每门课都和框架方合作（LangChain Harrison Chase、CrewAI João Moura 亲自讲），讲师本人就是框架作者，含金量足。**吐槽**：每门课只够讲一个框架的核心概念 + 一个 toy example，不会带你做完整项目。学完一堆短课的人很常见的状态是"框架 API 都见过，但没一个能独立做产品"。

### LangChain Academy

LangChain 官方推出，免费注册。核心是 `Introduction to LangGraph`，6 模块，覆盖 state、memory、human-in-the-loop、multi-agent、deployment 全套。**优势**：官方自带的 LangGraph Studio + LangSmith trace 集成，调试体验是其他课程没法比的——你能看到 Agent 每一步的 state 变化和 LLM call。**吐槽**：纯 LangGraph，不教其他框架，技术栈绑定深；如果以后框架风向变了（比如转向 OpenAI Responses API + 原生 tool use），这门课的具体 API 会过期。课程难度也偏中级，没有 Python + LangChain 基础硬啃会很痛苦。

### Coze（扣子）/ Dify

严格说不是课程，是低代码 Agent 平台。Coze 国内版字节出品，免费可商用，可视化 workflow 拖拽就能搭 Agent；Dify 是开源项目（GitHub 6w+ star），可自托管，企业版按 workspace 收费。用户搜"AI Agent 课程"会大量出现这两家，因为它们本身的官方文档 + B 站教程已经够上手做出能用的 Agent。**优势**：完全不用写代码，2 天能搭出能在企业内部用的客服/数据查询 Agent。**吐槽**：低代码的天花板就是低代码——一旦需要自定义 LLM 逻辑、复杂状态机、或者把 Agent 嵌进自己的 backend，立刻碰壁，最后还是得回去学代码。如果目标是当 AI 工程师，停在 Coze/Dify 不会让你拿到工程师 offer。

### JR Academy AI Engineer Bootcamp

匠人学院的 AI Engineer Bootcamp 模块，付费，4-12 周（按所选 tier），中文教学，悉尼/墨尔本本地华人导师。覆盖 RAG、LangGraph、MCP、Agent 多模块，结业要求交一个能跑、能 demo 的 GitHub 项目。**差异化**在 1:1 代码 review——每个学员的项目代码都有导师过一遍，挑出能改进的地方再让你改。其他平台普遍没有这个环节。**吐槽**：澳洲市场导向，悉尼/墨尔本求职辅导是核心卖点，不在澳洲找工作的学员买这门课的求职部分基本浪费；Bootcamp 时间表偏紧，已经在 996 的在职党要保证每周 10-15 小时投入才跟得上。中文教学对国内学员也是双刃剑——好处是能听懂，坏处是英文文档/面试英语锻炼少。

### 极客时间 AI 编程系列

国内极客时间平台，《循序渐进精通 AI 编程》《AI 大模型应用开发实战》等单课 ¥99-299，整个 AI 学习路径打包年卡价更高，案例多用国产模型（通义/豆包/文心）。**吐槽**：（1）单课 ¥99-299 看着便宜，凑齐 Agent 路径要好几门，年卡又再加一笔，相对几乎全免费的英文官方课程（HF Agents / LangChain Academy / DeepLearning.AI）性价比并不高；（2）偏 prompt + 应用拼装，对 LangGraph、MCP、smolagents 这类底层框架的覆盖明显不如英文课程深；（3）视频更新节奏跟不上 LangGraph、MCP 这种几个月一波 breaking change 的技术栈节奏，2024 年录的内容到 2026 年看 API 已经变了，平台没有滚动重录机制；（4）纯录播 + 微信群答疑，没有 1:1 代码 review，作业批改基本靠自己；（5）求职服务弱，不解决海外/澳洲求职这一档。

## 决策树：你应该选哪个

- **完全 0 基础，想先搞清 Agent 是什么** → Hugging Face Agents Course 或 Microsoft AI Agents for Beginners。两个都免费，挑你顺眼的那个，看完再决定要不要花钱
- **有 Python 基础，想跑通 LangChain 项目** → 先刷 DeepLearning.AI 的 LangChain/LangGraph 短课，再上 LangChain Academy 的 LangGraph 课程
- **想用低代码做企业内部 Agent，不想写代码** → Coze（国内）或 Dify（自托管），不用买课，官方文档 + B 站教程就够
- **中文阅读偏好，想自学** → didilili/ai-agents-from-zero 打底，配 DeepLearning.AI 短课补框架
- **想做项目 + 1:1 代码 review + 在澳洲找 IT 工作** → JR Academy AI Engineer Bootcamp
- **国内在职，中文阅读偏好，想转 AI 应用方向** → 主线推荐 didilili/ai-agents-from-zero（中文免费）+ DeepLearning.AI 短课（英文但有字幕）+ LangChain Academy 系统补 LangGraph；如果你已经买了极客时间年卡，可以当作背景视频补充看，但别把它当主线
- **不在澳洲市场 / 不需要 mentor / 想自己摸索** → JR Academy 不适合你，把钱省下来订 DeepLearning.AI Plus 加 LangChain Academy 学得更划算

## FAQ

**LangChain / LangGraph / Coze 学哪个？**
看你目的。想当 AI 工程师写代码 → LangGraph（LangChain 的进阶版，做有状态的 Agent 是事实标准）。想搭企业内部工具不写代码 → Coze 或 Dify。想搞清概念顺便了解一下 → LangChain 入门两小时够了，但别停在那。三个不互斥，时间够全学最好。

**不会 Python 能学 AI Agent 吗？**
低代码路线（Coze/Dify）能。但想做工程师，Python 是必经的。Agent 90% 的实现都是 Python（LangChain、AutoGen、CrewAI、smolagents 都是 Python 主导），JS/TS 生态有 LangChain.js 但社区资源少一档。建议先花 2-4 周补 Python 基础（变量、函数、类、async、HTTP 请求），再开 Agent 课程。

**Hugging Face Agents Course 多久能学完？**
官方说"几周"。实际看你基础：有 LLM 应用经验大概 30 小时；纯 0 基础（包括需要补 Python 和 LLM API 知识）算上做最终项目的时间，大概 60-80 小时。证书要 2026 年 7 月 1 日前提交最终作业，没赶上证书就拿不到，但课程内容继续免费。

**JR Academy 的 AI Agent 模块和极客时间比？**
两套形态，自己判断。极客时间是国内付费视频课 + 微信社群，单课 ¥99-299，多课叠加或年卡才能凑齐 Agent 路径，没有 1:1 代码 review，更新跟不上 LangGraph 这种快速迭代的框架；JR Academy 是 Bootcamp 形态，同期同学 + 导师 1:1 代码 review + 项目截止日期 + 澳洲本地求职辅导，价格更高。差异在"录播自学 vs 有人推着做项目并改代码"，按自己的自驱力、预算和是否需要海外求职服务自己挑。

**学完 Agent 课程能找到工作吗？**
Agent 单一技能不能，AI 工程师岗位要求是栈：Python + LLM API + RAG + 至少一个 Agent 框架 + 向量数据库 + 至少一个云平台部署经验 + 一个能 demo 的项目。任何一门课只覆盖其中一两块。能找到工作的学员通常是"课程 + 自己做了一个真项目 + 在 GitHub/简历上能讲清楚"的组合，单纯刷完课程不行。

## 结尾

8 个选项里没有谁是"最好"，只有"最适合你的目标"。先想清楚是要扫盲、要跑通、要做产品、还是要拿 offer，再回头看这张表。学之前先想清楚，比学完再后悔便宜。
