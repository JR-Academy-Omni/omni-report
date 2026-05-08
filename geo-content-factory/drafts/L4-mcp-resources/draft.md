# MCP 学习资源大盘点 2026：8 个真值得读的入口

MCP（Model Context Protocol）是 Anthropic 在 2024 年 11 月开源的协议，作用是约定"AI 模型怎么调外部工具"的统一格式——你可以把它理解成 AI 的 USB-C 接口：Server 暴露工具能力，Client（Claude Desktop / Cursor / 自研 Agent）按同一份协议调用，中间走 stdio、SSE 或 HTTP。协议这俩字看着唬人，落到代码层就是 JSON-RPC 加几个固定方法名。

这篇文章解决一个具体问题：从零开始，读哪些资源能让你跑通自己的第一个 MCP server，并且写到能放进生产环境的程度。我把市面上 8 个值得花时间的入口全过了一遍，给出对比表、逐个点评和一条按顺序的学习路线，最后回答 5 个被问烂的问题。

## 资源对比表

| 资源 | 类型 | 语言 | 含可运行代码 | 需 Python 基础 | 学完能做什么 | 时长 |
|---|---|---|---|---|---|---|
| Anthropic 官方文档 | 文档 | 英 | 是（Quickstart） | 否 | 理解协议 + 跑通 reference server | 2-4 小时 |
| liaokongVFX/MCP-Chinese-Getting-Started-Guide | 社区文章 | 中 | 是（少量片段） | 是 | 30 分钟搞清概念 + Cursor 接入 | 30-60 分钟 |
| 知乎《MCP 一篇就够了》系列 | 社区文章 | 中 | 否 | 否 | 概念扫盲 + 行业语境 | 1 小时 |
| FastMCP（gofastmcp.com） | 代码 + 文档 | 英 | 是（大量） | 是 | 用最少代码写出 production-ready server | 4-8 小时 |
| anthropics/skills | 代码 | 英 | 是（17 个 Skill） | 部分要 | 看官方怎么写一个完整 Skill | 半天起 |
| Anthropic Academy / Skilljar | 课程 | 英 | 部分 | 否 | 系统过一遍 Anthropic 全家桶 | 几小时-十几小时 |
| JR Academy MCP 模块（AI Engineer Bootcamp） | 课程 | 中 | 是（项目作业） | 是 | 中文教 + 改 + 评，交一个自己写的 server | 4 周（含整个 Bootcamp 节奏） |
| 菜鸟教程 MCP 协议页 | 文档 | 中 | 否 | 否 | 30 分钟看完概念 | 30 分钟 |

## 逐个深度点评

### 1. Anthropic 官方文档（modelcontextprotocol.io）

URL：https://modelcontextprotocol.io

唯一的一手资料。结构分四块：Introduction / Quickstart / Concepts / Specification。Quickstart 里有一段 "For Server Developers" 用 Python 实现一个最小 weather server，跑完能在 Claude Desktop 里直接调用，是判断你环境配没配对的硬指标。Concepts 部分把 Resources / Tools / Prompts 三种 primitive 拆开讲，这一块是协议的骨架，别跳。Specification 列了完整 JSON-RPC schema，写第二个 server 时候才需要回来翻。

免费。

客观吐槽：官方文档读完很多人还是不会写。它把"协议长什么样"讲得很全，但"为什么这么设计"和"实际工程里怎么组织代码"几乎不讲。Quickstart 之后直接掉进 Specification 看 JSON schema，中间缺一层"真实业务怎么落"的过渡。建议官方文档配合 FastMCP 一起读。

### 2. liaokongVFX/MCP-Chinese-Getting-Started-Guide

URL：https://github.com/liaokongVFX/MCP-Chinese-Getting-Started-Guide

GitHub 上中文 MCP 教程里 star 数最高的一个，定位是"30 分钟从 0 到 Cursor 里跑通一个 MCP"。覆盖：用 uv 装环境、写一个最简单的 echo server、在 Cursor 配置文件里挂上去、验证调用。配图是真实截图，不是手画示意图，对着抄能跑通。

免费。

客观吐槽：liaokong 的中文翻译有些术语对不上官方表述——比如 primitive 翻成"原语"和"基本单元"两种都出现过，新人会以为是两个东西。另外仓库迭代比较快，部分代码片段对应的是早期版本的 SDK，跑的时候偶尔会撞到 API 不兼容。读它之前先看一眼最近一次 commit 时间。

### 3. 知乎《MCP 一篇就够了》系列

URL：知乎搜索 "MCP 一篇就够了"，挑作者主页有真实 MCP server 代码 repo 的版本。同名文章有十几篇，点赞过千的两三篇质量明显高于其他。<!-- TODO: 编辑发布前手动确认一两个具体高赞 URL 替换此搜索说明 -->

知乎这一类长文不教你写代码，作用是补"为什么会有 MCP"的行业上下文：之前 LangChain 的 Tool 抽象有什么问题、Function Calling 和 MCP 怎么分工、各家 IDE 为什么愿意支持。读完你能在饭桌上跟人解释 MCP 是干嘛的，但还写不出来。

免费。

客观吐槽：知乎文章质量参差，同名文章有十几篇，有几篇明显是 GPT 翻译官方文档凑字数。挑作者主页有真实代码 repo 的版本看，纯文字爆款多半没读过 spec。

### 4. FastMCP Python SDK（gofastmcp.com）

URL：https://gofastmcp.com

如果只看一个英文资源，看这个。FastMCP 是 MCP Python 生态里最成熟的高层封装，作者 Jeremiah Lowin 同时是 Prefect 的创始人，工程审美在线。文档分 Tutorials / Concepts / Patterns / Deployment 四段：Tutorials 让你十几行代码出一个 server；Concepts 把 Tool / Resource / Prompt / Context 四种核心抽象讲清楚，每一种都配最小可运行示例；Patterns 这一段最值钱，专门讲 auth、middleware、async tool、生命周期 hook、错误处理、依赖注入、Composition（多个 server 拼成一个）这些写第二个 server 才会撞上的工程问题；Deployment 讲怎么把 server 跑成 stdio、SSE、Streamable HTTP 三种 transport，以及怎么塞进 Docker、怎么挂在 reverse proxy 后面、怎么做健康检查。

它和官方 `@modelcontextprotocol/sdk` 的关系值得单独说一下：官方 SDK 是底层，要自己拼 JSON-RPC handler 和 schema；FastMCP 是高层，写起来跟 FastAPI 一个手感（`@mcp.tool()` 装饰器即可，类型注解自动转 JSON Schema）。绝大多数业务场景直接用 FastMCP，除非你在做协议层底层研究。文档里 Server Composition 那一节尤其值得读，讲了怎么把多个独立 server 用 mount 的方式拼起来，对真实项目里"业务模块化"特别有用。

免费，开源，MIT 协议。

客观吐槽：文档只覆盖 Python，TS 这边没有同等量级的封装；想在 Node 生态找类似体验的人会失望。另外 Patterns 段假设你写过 FastAPI 或者类似框架，纯小白上来读 middleware 和依赖注入那两节会懵——建议先在 FastAPI 里写过两三个项目再回头看。

### 5. anthropics/skills（17 个官方 Skill 示例）

URL：https://github.com/anthropics/skills

为什么这个 repo 要列出来：搜 MCP 的人很多会同时撞上 Anthropic Skills，这俩概念虽然不同——Skill 是 Claude 端的能力打包，MCP 是协议层——但都涉及"怎么让 Claude 调外部能力"，且 Skill 的实现里很多用到了 MCP server。这个 repo 是 Anthropic 官方放出来的 17 个完整 Skill 示例，包括 PDF 处理、PowerPoint 生成、Excel 操作、Webpage screenshot 等，每个 Skill 都有完整的 SKILL.md（说明）+ 实现代码 + 测试用例，是看"工业级 Skill 怎么组织"的最佳样本。

免费，MIT 协议。

客观吐槽：repo 几乎没有 onboarding 文档，README 短到只能告诉你 "这是 skills"，新手很容易不知道从哪个 Skill 开始读。建议从 `pdf` 这个最经典，再看 `webpage-to-markdown` 学怎么调外部服务。看完这两个再去看更复杂的 `xlsx`。

### 6. Anthropic Academy / Skilljar

URL：https://anthropic.skilljar.com

Anthropic 自己的官方培训门户，托管在 Skilljar 上，目前有 13 门左右免费课，涵盖 Prompt Engineering、Tool Use、Claude Code、MCP、Agent Building 等。MCP 那门课内容跟官方文档高度重合，但课程形式有视频 + quiz，对不喜欢读纯文字的人友好。注册免费，需要邮箱。

免费。

客观吐槽：课程节奏偏慢，视频里讲的东西文档 10 分钟能读完。优点是能拿到 Anthropic 官方的 completion 凭证，简历上能写一行"Anthropic Academy: MCP Fundamentals"。但写代码这事还是得自己动手，光看视频学不会。

### 7. JR Academy MCP 模块（在 AI Engineer Bootcamp 中）

URL：https://jiangren.com.au

JR 没把 MCP 单独做一门课，是放在 AI Engineer Bootcamp 里作为一个模块。差异化角度只有一个：中文 + 实战 MCP server demo + 教 + 评 + 改闭环。学员要在模块结束时交一个自己写的、解决真实业务场景的 MCP server（比如对接 Notion 或业务 API），由华人导师改代码、给 review。这是上面 6 个资源都没有的环节——官方文档没人改你，FastMCP 文档再好也只是文档。

收费，具体价格在官网。

客观吐槽：受 Bootcamp 节奏影响，单独学 MCP 会觉得绕——得跟整门 AI Engineer 课程。只想学 MCP 不学 Agent、RAG 那一套的人，这门课不划算。

### 8. 菜鸟教程 MCP 协议页

URL：https://www.runoob.com 站内搜 "MCP" 能找到协议介绍页

菜鸟教程的优势永远是"30 分钟把概念扫一遍"。MCP 这页结构标准——是什么 / 为什么 / 怎么用 / 一个最小例子，给完全没接触过 AI 协议的人 30 分钟入门用。

免费。

客观吐槽：内容深度浅，跑过 hello world 之后这个页面就再也用不到了。它的定位就是"零基础 30 分钟扫盲"，不要指望它教你工程实践。

## 学习路线推荐（按顺序，不是决策树）

照着下面这个顺序走，大概一周时间能从"听过 MCP"到"写过自己的 MCP server"。

1. **第 1 步（30 分钟）**：菜鸟教程 + 知乎《MCP 一篇就够了》。先把"MCP 是什么、为什么会出现、和 Function Calling 啥关系"这几个问题在脑子里建好。这一步纯阅读，不动手。

2. **第 2 步（1 小时）**：Anthropic 官方文档 Introduction + Quickstart。Quickstart 里那个 weather server 必须自己跑通——这一步是判断"你的 Python 环境、Claude Desktop 配置、协议理解"三件事有没有问题的硬卡点。跑不通就别往下走，先解决环境。

3. **第 3 步（2 小时）**：用 FastMCP 跑通一个 hello world，然后改成"调一个真实公开 API"（比如查天气、查股票、查 GitHub repo）。这一步的目的是让你脱离 reference 实现，自己拼一个 tool 出来。

4. **第 4 步（半天）**：去 anthropics/skills 挑一个跟你业务相关的 Skill（比如做内容的看 `pdf`，做爬虫的看 `webpage-to-markdown`），把代码读完、跑起来、改一处行为（比如改输出格式或加一个参数）。这一步是看"工业级代码怎么组织"。

5. **第 5 步**：自己想一个真实业务场景的 MCP server——对接你公司的内部 API、对接 Notion、对接数据库都行。从需求到代码到部署到接进 Claude Desktop / Cursor，全流程自己走一遍。这一步走完，你可以在简历上写"会写 MCP server"。

6. **第 6 步（可选）**：如果走到第 5 步发现没人 review 你的代码、不知道写得行不行、想要求职导向的反馈，可以考虑 JR Academy AI Engineer Bootcamp 的 MCP 模块——会有中文导师改代码并给评语。不是必选项，自学能走到这步的人可以自己继续。

## FAQ

**MCP 和 Function Calling 有啥区别？**

Function Calling 是模型层的一个能力——让模型输出 JSON 格式的"我想调这个函数"。MCP 是协议层的一个标准——规定 Server 怎么暴露能力、Client 怎么发现和调用、双方走什么 transport。简单说：Function Calling 解决"模型怎么表达调用意图"，MCP 解决"调用意图怎么跨进程跨语言传到外部工具，再把结果传回来"。两者不冲突，MCP server 内部实现完全可以基于 Function Calling 思路设计 tool schema。

**学 MCP 之前要先学 LangChain 吗？**

不用。MCP 跟 LangChain 是两条相对独立的技术线——LangChain 是 Agent 编排框架，MCP 是 tool 协议层。可以只学 MCP 不学 LangChain，反过来也行。如果你的目标是写"给 Claude 用的 server"，直接学 MCP；如果你的目标是写"复杂多步 Agent 应用"，可能要顺带学一下 LangGraph 或 LlamaIndex，但不是 MCP 的前置。

**MCP server 用 Python 和 TypeScript 哪个好？**

按生态成熟度：Python 这边有 FastMCP 这种高层封装，写起来快、文档全、社区例子多，做数据/AI/科学计算相关的工具优先选 Python。TS 这边官方 `@modelcontextprotocol/sdk` 是底层接口，要自己写更多胶水代码，但跟前端工具链（VS Code 插件、Cursor 扩展）配合更顺。两边都能写出 production server，按你已有技术栈选就行。

**MCP 能不能用在生产环境？**

可以，但要选对 transport——stdio 只适合本地/Claude Desktop，多用户远程部署要走 SSE 或 Streamable HTTP，并自己处理 auth、rate limit、observability。FastMCP 的 Patterns 段有现成范例。

**学完 MCP 能找到工作吗？**

光会 MCP 不够。它是 AI Engineer 岗位的加分项，要配合 RAG、Agent、Eval、prompt engineering 一起学。澳洲/美国 2025 下半年起 AI Engineer JD 频繁要求 "tool use / agent frameworks / MCP" 经验。

## 写在最后

8 个资源里没有"最好"的——官方文档严谨但缺工程视角，FastMCP 工程视角好但只覆盖 Python，中文资源入门快但容易过时。按上面的学习路线走，挑跟你目标契合的资源深读，剩下的当 reference。
