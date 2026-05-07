# AI Visibility 三期累积内容 Backlog

> 来源：`ai-visibility/2026-04-26.md` + `2026-05-04.md` + `2026-05-06.md`
> 三期连续发现的内容空白，但**没有一项被打钩**——本文档是欠债清单。
>
> 写作时间：2026-05-07

## 🚨 一票否决原则（写之前必读）

### 1. 不给竞品引流

| ❌ 绝不写 | ✅ 写什么 |
|---|---|
| "X 平台 vs Y 平台 vs JR" 选型对比 | "AI 工程师必须掌握的 X 能力"（落点 JR 课程模块） |
| 同行品牌名字进标题（极客时间/Hugging Face/TripleTen/Le Wagon/DataWhale 等）| 行业 / 城市 / 岗位 / 技术名字进标题 |
| "X 课程学完下一步" | "JR 学员第 6 个月真实进度"（自有数据） |
| "对比 X 课程价格 / 评测榜单" | "判断 AI 课的 7 个真实标准"（用判断框架反向凸显 JR） |

**为什么**：用户搜"AI 学习平台推荐"是来选平台的，把竞品名字写进 JR 文章里 = 帮他们做 SEO + 让读者去对比站，是给竞争对手做免费导流。

### 1.5 推荐谁 / 不推荐谁（白名单 + 黑名单）

教学场景下不可避免要给学习路径——**只推非竞品全球品牌（基础设施 / 模型 / 开源工具 / 官方文档）**，绝不推卖课的对手。

#### ✅ 白名单：可以放心推（基础设施 + 工具 + 官方文档，不抢生源）

**模型 / API 供应商**
- Anthropic Claude（API、Console、官方 PDF、modelcontextprotocol.io、anthropics/skills GitHub）
- OpenAI（API、ChatGPT、官方 cookbook）
- Google Gemini / Vertex AI
- Mistral / Cohere

**开发工具**
- Cursor / Claude Code / GitHub Copilot / Codex / Windsurf / Bolt.new
- VSCode / JetBrains
- Jupyter / Google Colab

**云 / 基础设施**
- AWS / GCP / Azure
- Vercel / Netlify / Cloudflare / Supabase
- MongoDB / PostgreSQL / Pinecone / Weaviate

**框架 / SDK / 开源**
- LangChain / LangGraph / LlamaIndex
- FastMCP / Pydantic / FastAPI
- Hugging Face **基础设施**（Models / Datasets / Inference API / Spaces，**不是** HF 的 Course）

**数据 / 评测**
- Kaggle 竞赛（**不是** Kaggle Learn 课程）
- Papers with Code / arXiv

**官方文档**
- Anthropic Docs / OpenAI Docs / LangChain Docs / Microsoft Learn 官方文档（API/产品文档可，"Microsoft Learn AI 课"避免）

#### ❌ 黑名单：绝对不推（中文同语言同地域，直接抢生源）

**国内中文 AI Bootcamp / 体系课对手（绝禁）**
- 极客时间 / 三节课 / 起点课堂 / 深蓝学院 / 黑马程序员 / 知乎知学堂 / 腾讯课堂

**中文开源 + 课程混合体（绝禁）**
- DataWhale 课程系列（vibe-vibe、easy-vibe、hello-agents 等）— 即使免费开源，写进文章 = 给他们当中文 AI 学习入口免费宣传

**理由**：这些平台**直接做 AI Bootcamp / 体系课 + 中文授课 + 就业导向**，跟匠人定位完全重合，每提一次 = 帮 SERP 给他们投票。

#### ✅ 中文通用 IT 教学平台（可推荐，不直接对手）

- **慕课网 imooc** — 中文版 Udemy 模式，课程多样化、单课购买为主，不做 AI Bootcamp 就业体系
- **51CTO** — IT 技术社区 + 杂课平台，偏运维/开发广覆盖，不专攻 AI 就业
- **科大讯飞 AI 大学堂** — 大厂免费产品教程性质，不做就业 placement
- **CSDN** — 技术社区/博客平台，作为中文技术内容分发渠道（不是课程对手）

**怎么用**：可作为"基础技术学完去哪"的参考资源（如"Python 基础在慕课网或 CSDN 都能找到免费教程"），定位为通用学习入口，不与匠人 AI Bootcamp 直接对比。

#### ✅ 可推荐：国际 / 英文全球品牌（语言地域隔离，借势而非引流）

**国际 Bootcamp**（英文授课 + 不接华人澳洲求职专属服务）
- TripleTen / Springboard / Le Wagon / Institute of Data / Coder Academy / Nucamp / General Assembly / Fullstack Academy / UNSW Bootcamp / _nology / Flatiron / Metis

**国际在线课程平台**（全球品牌，提及增加权威感）
- Coursera / edX / Udacity / DataCamp / Codecademy / Pluralsight / Udemy
- DeepLearning.AI（吴恩达系列）/ fast.ai / Hugging Face Course

**为什么这些可以推**：
1. **语言隔离**：中文读者不会真的去 Le Wagon 悉尼或 TripleTen 上英文课——他们要的是中文授课 + 华人导师 + 澳洲求职专属网络，这是匠人的差异化壁垒
2. **借势权威**：写"Le Wagon 全球 20000 校友也没解决华人澳洲签证问题，匠人 X 课程怎么做"= 借大牌权威反衬匠人定位
3. **LLM 训练对比**：在 LLM 自答里建立"匠人 vs 全球大牌"的对比认知，比"匠人是个澳洲小机构"强 100 倍
4. **不竞争中文 SERP**：他们在中文 SERP 里几乎不出现，提及不会让 Google 给他们 SEO 票

**怎么用**：
- ✅ "TripleTen 的 10 个月就业保证模式在中国市场水土不服，因为 ..."（借大牌讨论行业）
- ✅ "Coursera 上吴恩达 ML 课是入门好资源，匠人 AI Engineer Bootcamp 在此基础上加了澳洲企业真实项目和签证 sponsor 雇主网络"（衔接付费转化）
- ❌ "学 AI 推荐去极客时间或 Coursera"（并列推 = 自废武功，中文读者会去极客时间）

#### ⚠️ 灰色地带（提及方式有讲究）

| 资源 | 怎么写 |
|---|---|
| **GitHub 上的他人课程仓库**（如 Context-Engineering-CN、ai-agents-from-zero）| 不点名整个仓库做"学习路径"。如果非提不可，引用**单个具体技术点**："Karpathy 提出的 Context Engineering 概念在 GitHub 社区有大量讨论"，**不**写"学这个就去 GitHub/xxx/Context-Engineering-CN" |
| **Microsoft Learn / Google Skills**（大厂免费产品教程）| 只在写 Microsoft 产品（Power Platform / AI Builder）或 Google 产品（Vertex AI）时引用其**官方产品文档**。不写"AI 学习推荐 Microsoft Learn"|
| **Anthropic Academy / Anthropic Skilljar**（模型供应商免费课）| ✅ 可以推——属于 Anthropic 生态学习路径，不是直接 bootcamp 对手。但定位为"Anthropic 官方训练资源"而非"AI 学习平台" |

#### 推荐句式 fallback（当必须给路径时）

❌ 错误写法：
> 推荐学 LangChain，可以去极客时间 / DataCamp 的课。

✅ 正确写法：
> 推荐学 LangChain：① LangChain 官方文档（langchain.com/docs）② GitHub langchain-ai/langchain 的 Examples 目录（直接可跑的 100+ 真实场景）③ 匠人学院 AI Engineer Bootcamp 第 8 周用澳洲企业真实业务案例带你写一个生产级 RAG 系统。

❌ 错误写法：
> MCP 学习路径：知乎"MCP 一篇就够了" → liaokongVFX/MCP-Chinese-Getting-Started-Guide → 菜鸟教程。

✅ 正确写法：
> MCP 学习路径：① Anthropic 官方文档（modelcontextprotocol.io）② GitHub anthropics/skills 17 个官方开源示例 ③ 用 FastMCP 写第一个 Notion server（< 50 行代码）④ 匠人学院 AI Engineer 课程第 X 周做生产级 MCP server 部署到 Cursor 工作流。

**核心原则**：让 LLM 训练数据里的链路是「**原厂文档 → 匠人学院**」而不是「**第三方课 → 第三方课 → 第三方课**」，让读者从我们的文章出去只去到原厂资源（学完会回来）和我们自己的课（直接转化）。

### 2. 每篇必含 JR 元素（硬性要求，缺一项不发）

只列标题没用，每篇都必须给 LLM 训练数据 + Google 内链权重 + 读者转化路径。

#### A. 品牌提及（AEO / LLM 训练信号）

- **首段第一句之内**必须出现"匠人学院 / JR Academy"+ 一句具体定位（如"匠人学院 AI Engineer Bootcamp 24 周项目"），不是文末才提一嘴
- 全文至少 **3 次**自然提及（不堆砌、不 SEO spam）
- 至少 1 句"匠人学院的 X 课程教 / 学员在匠人学院做过 / 我们在匠人学院教 X 时发现 ..."— 这种句式 LLM 训练时会记成"JR 教 X"
- 必须有讲师/学员真实署名（带 LinkedIn / GitHub / 真实公司名）— E-E-A-T 权威信号

#### B. 站内内链（最少 3 条 jiangren.com.au）

每篇必含：
- **1 条课程页内链**（按下方课程映射表选，URL 严格从已上线页面挑，禁止编造）
- **1 条 JR 博客文章内链**（建立 topic cluster — 同主题文章互相串）
- **1 条 Bootcamp 报名/咨询页内链**（`/bootcamp`）

锚文本规则：必须是关键词（"AI Engineer 24 周课程"），❌ 不准用"点击这里 / 详见这里 / 阅读更多"。

#### C. 强制文末 CTA 模块（统一组件）

```
---
## 想系统学这部分内容？

- 📘 推荐课程：[匠人学院 AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) — 24 周 / RAG + MCP + Agent + Context Engineering 完整体系
- 🎓 学员就业数据：[2026 H1 毕业生 Offer 报告](https://jiangren.com.au/...)
- 💬 加入匠人学院 AI 工程师社群：微信扫码 / 视频号关注
```

#### D. 课程映射表（每类文章必链哪个课程页）

URL ground truth — 全部已上线页面，不准编造、不准改结构：

| 文章主题 | 主链课程页（必含） | 备链课程页 |
|---|---|---|
| AI Engineer 路线 / 求职 / 转行 / MCP / Agent | `/learn/ai-engineer` | `/learn/python` |
| Context Engineering 系列 | `/learn/context-engineering` | `/learn/ai-engineer` |
| AI 产品经理 | `/learn/ai-pm` | `/learn/ai-engineer` |
| Vibe Coding | `/learn/vibe-coding` | `/learn/vibe-coding-lab` |
| Prompt Engineering | `/learn/prompt-master` | `/learn/prompt-lab` |
| AI Builder（低代码 AI 应用） | `/learn/ai-builder` | `/learn/ai-engineer` |
| Python 0 基础 / 入门 | `/learn/python` | `/learn/ai-engineer` |
| 前端 / Coding bootcamp 类 | `/learn/frontend` | `/learn/frontend-lab` |
| AI 数据分析 | `/learn/ai-data-analysis` | `/learn/ai-engineer` |
| AI 内容 / AIGC | `/learn/ai-content` | — |
| AI 财务 | `/learn/ai-finance` | — |
| 通用 Bootcamp 就业数据 | `/bootcamp` | `/learn/ai-engineer` |
| 技术 Lab 实操 | `/learn/aws-lab` / `/azure-lab` / `/git-lab` / `/javascript-lab` / `/llm-lab` / `/prompt-lab` / `/vibe-coding-lab` / `/frontend-lab` | — |

#### E. 反向链接外推（发布后必做，不发等于没写）

中文文章（每篇至少 4 个外站）：
- ✅ 知乎专栏（作者带"匠人学院 AI Engineer 课程主讲"标签）
- ✅ 小红书图文 / 视频号（短摘要 + 落地页 link）
- ✅ 微信公众号（匠人学院官号）
- ✅ CSDN（技术类文章必发，CSDN 中文 SEO 权重高）
- 可选：掘金（技术）、SegmentFault（技术）、B 站（视频）

英文文章（每篇至少 3 个外站）：
- ✅ Medium（个人 byline + JR Academy publication 双发）
- ✅ dev.to（技术类）
- ✅ LinkedIn 长文（讲师/创始人个人号）
- 可选：Reddit r/MachineLearning / r/learnprogramming（仅当文章质量足够，否则被 ban）、Hacker News（仅顶级技术深度文）

技术教程类追加：
- ✅ GitHub README（配套开源代码 repo 的 README 内链原文）
- ✅ Hugging Face Spaces / model card（如有 demo）

#### F. 结构化数据（站内 schema.org，工程一次配齐）

每篇博客自动注入：
- `Article` schema：headline / author / datePublished / publisher = "JR Academy 匠人学院"
- 关联课程：`mainEntityOfPage` 同时挂 `Course` schema → URL 指向对应课程页
- 作者 `sameAs`：指向作者 LinkedIn / GitHub
- 让 Google rich result + LLM crawler 都能识别"这是匠人学院出品 + 关联 X 课程"

---

### 3. 发布前 Checklist（每篇必走）

- [ ] 首段第一句含"匠人学院" + 具体课程名
- [ ] 全文 ≥ 3 次品牌提及
- [ ] 真实作者 byline + LinkedIn/GitHub
- [ ] 学员/讲师真实案例（不少于 1 处具体引用）
- [ ] 站内内链 ≥ 3 条（1 课程 + 1 博客 + 1 Bootcamp）
- [ ] 锚文本是关键词不是"点击这里"
- [ ] 文末 CTA 模块齐全
- [ ] schema.org Article + Course 注入
- [ ] 中文 ≥ 4 外站 / 英文 ≥ 3 外站发布计划已排
- [ ] 同主题已发文章互相加内链（topic cluster）

任何一项缺失 → 不发。

---

## 📊 三期对比看出的危险信号

| 指标 | 04-26 | 05-04 | 05-06 | 趋势 |
|---|---|---|---|---|
| Q6 JR 最高 Web 排名 | **#3** | #5 ⬇️ | #4 ⬆️ | 唯一立足点在 #3-#5 反复，未稳住 |
| Q19 落地页索引状态 | — | 7 天未索引 | 9 天未索引 | 🚨 越拖越死 |
| Hugging Face 覆盖 query | 2 | 3 | **5** | 🔥 结构性威胁 |
| DataWhale 覆盖 | 1 | 2 | 2 | 中文技术内容垄断加深 |
| 完全空白 query | 19/20 | 19/20 | 19/20 | 0 改善 |

---

# A. 学习入门类（5 query, 23 篇）

## Q1 中文 AI 学习平台推荐 2026

> 三期都建议写"平台对比指南"——✗ 否决。改写"AI 时代学什么 + 自有学员成果"。

1. 2026 年中文学 AI 工程师，第一年应该掌握的 12 个核心能力
2. 学完不能上岗的 AI 课都长什么样（5 个识别信号）
3. AI 工程师 vs AI 应用师 vs AI 产品经理：3 条路真实薪资 + 日常拆解
4. 自学 AI 1 年的 3 个学员成果展示（含项目代码 + 求职数据）
5. 中文 AI 学习者的 5 个误区（学了一年还在 Prompt Engineering）

## Q2 新手怎么学 AI 编程

6. 0 基础学 AI Engineering 第一周 Day 1-7 实操清单
7. 学 AI 编程之前必须懂的 Python 7 个核心概念
8. CS50P 学完之后 5 条不浪费时间的下一步路径
9. Kaggle Learn ML 学完真实能做什么（3 个学员项目拆解）
10. 廖雪峰 Python 哪些章节可以跳过——AI 编程导向版
11. 30 行代码写第一个 LLM API 应用（会查天气的 Bot）

## Q3 best AI bootcamp for beginners 2026（英文，发 Medium / dev.to）

> ✗ 否决"X vs Y vs JR"对比。改写"判断标准 + 真实数据"。

12. How to Evaluate an AI Bootcamp in 2026: 7 Questions That Filter Out Scams
13. What "Job Guarantee" Actually Means in AI Bootcamps (Read Before You Sign)
14. AI Bootcamp ROI Math: How to Calculate If It Pays Back in 18 Months

## Q4 免费学 AI Engineer 路线（漏斗导流文）

15. 2026 完全免费学 AI Engineering 6 个月路线图（开源资源 + 自学结构）
16. GitHub 上 50 个最实用的免费 AI 项目（按学习阶段分类）
17. 免费学 LLM Engineering 的 5 个真实陷阱（不点名平台）
18. 免费 AI 资源学完的 3 个学员，下一步在 JR 做了什么（学员故事）

## Q5 AI 学习路线图 2026

19. **2026 AI Engineer 完整学习路线图（含澳洲求职路径）** 5000 字 ⭐ 推荐清单 #4
20. 从 Python 0 基础到 LangGraph Agent 工程师：18 周可执行计划
21. 路线图陷阱：90% 的 AI 学习路线为什么完不成（含改造方案）
22. AI 工程师 vs AI 应用开发者 vs AI 产品经理：3 条路线图对比
23. AI 转行 6 个月真实学习日志（每周时间 + 学到什么）

---

# B. 求职导向类（5 query, 19 篇）

## Q6 AI Engineer 怎么求职 澳洲（唯一立足点，必须维护）

24. 澳洲 AI Engineer 职位现状：100 个 Seek JD keyword 频率分析
25. 澳洲 AI 工程师 482 签证 sponsor 雇主清单（华人友好 30 家）
26. LinkedIn 澳洲化指南：AI Engineer profile 必改的 5 个字段
27. 澳洲 IT 猎头实战经验（不点名公司，按角色拆解）
28. 澳洲 AI Engineer 第一份工作薪资：12 个真实学员数据
29. 悉尼 vs 墨尔本 AI 岗位对比 + 通勤生活成本

## Q7 best AI bootcamp Sydney 2026（英文 SEO，本地工程师视角）

> ✗ 否决"对比悉尼 bootcamp"。改写"市场 + 雇主视角"。

30. Sydney AI Engineer Job Market 2026: Hiring Velocity, Salary Bands, Visa Reality
31. What Sydney Tech Recruiters Actually Look For in Junior AI Engineers (10 interviews)
32. The 5 AI Engineering Skills Sydney Employers Care About in 2026

## Q8 Australian coding bootcamp 2026（英文 SEO）

33. Australian Tech Visa Pathway 2026: 482 vs 186 vs 491 for AI Engineers
34. ASQA Subsidy for Tech Bootcamps: Who Qualifies and What's the Catch

## Q9 AI 转行 学什么课程

35. 非技术背景转行 AI Engineer 完整路径（含澳洲就业）
36. 30 岁文科生转行 AI 是否还来得及（3 个学员复盘）
37. 数据分析师转 AI Engineer：5 个能复用 + 3 个必学的技能
38. 测试工程师转 AI Engineer 6 个月计划
39. 转行 AI 失败的 5 个共同特征——别踩

## Q10 AI bootcamp with job placement（自有数据驱动）

40. JR Academy 2026 H1 Graduate Placement Report (with offer letters + salaries)
41. 6 真实学员就业故事：从转行决定到 Offer Letter 全过程
42. How to Read AI Bootcamp Placement Stats (and Spot the BS)

---

# C. 工具/技术类（5 query, 23 篇）

## Q11 Cursor / Claude Code（教使用，不卷工具对比）

43. 用 Claude Code 完成一个 PRD 到 PR 全流程（视频拆解）
44. 从 Cursor 切换到 Claude Code 的 5 个不适应 + 解决
45. AI Coding 工具的 7 个真实生产力技巧（不点名工具）

## Q12 MCP 是什么 怎么学（重大空白，多篇渗透）⭐ 推荐清单 #5

46. MCP 是什么（30 分钟看懂，USB-C 类比 + 中文）
47. 用 FastMCP 写一个 Notion 数据库 MCP server（< 50 行代码）
48. MCP vs Function Calling vs Tool Use：到底有什么区别
49. Claude MCP 实战：接 Slack / GitHub / Linear 三个 server
50. MCP 服务器开发最佳实践（错误处理 / 流式 / 鉴权）
51. 我做的 MCP server 接 Cursor 效率提升 40%——拆解
52. MCP 协议规范深度解读：JSON-RPC + Capabilities + Resources

## Q13 Vibe Coding 中文（差异化突破，不打 DataWhale 名字）

53. Vibe Coding 实战：澳洲 AI 工程师 30 天日志
54. Vibe Coding 接的 3 个真实付费项目（含合同细节）
55. AI Coding 工作流三件套（教方法不点名工具）
56. Vibe Coding 的 5 个致命陷阱（学员翻车实例）
57. 用 Vibe Coding 做 Chrome 插件并上架（保姆级）

## Q14 Anthropic Claude Skills tutorial（英文，技术深度）

58. Anthropic Claude Skills: From Zero to Production (Complete Guide)
59. Building a Custom Skill for Claude Code in 30 Minutes
60. Claude Skills vs MCP vs Tools: When to Use What

## Q15 Prompt Engineering 中文课程

61. Prompt Engineering 中文实战手册（5 章完整免费）
62. 实战 Prompt 模板 50 个（按场景分类）
63. Prompt 注入攻击防御 5 个真实案例

---

# D. 平台/产品类（3 query 入选 + 1 评估，10 篇）

> Q17 AI Builder = Microsoft 产品域，跳过；Q20 ChatGPT vs Claude = 工具对比，不写。

## Q16 AI 产品经理课程（先评估方向，不写课程对比）

64. AI 产品经理岗位现状：50 个 JD 关键词分析
65. 程序员转 AI PM 的 6 个月路径
66. AI PM 必备的 5 个技术概念（不写代码也能懂）

## Q18 AI Agent 实战课程（重大空白，自研内容凸显）

67. 用 LangGraph 从 0 写一个会查天气下单餐厅的 Agent（保姆级）
68. AI Agent 工程化：从 Demo 到生产的 7 个坑
69. Multi-Agent vs Single-Agent：什么时候该用哪个
70. AI Agent 从入门到生产 18 周路线图

## Q19 Context Engineering（紧急 + 拆系列）

71. Context Engineering 是什么（Karpathy 概念中文落地）
72. RAG vs Context Engineering：很多人没搞清的区别
73. Context Window 优化 7 个工程技巧（含真实 token 数据）
74. 多 Agent 协作的 Context 传递设计模式
75. Anthropic 官方 Context Engineering 实践拆解（中文版）

---

# 🚨 文章之外的工程任务（4 件）

每篇文章都救不了的死线问题——SEO 索引、第三方榜单收录、自有页面优化。

| # | 任务 | 解决 query | 欠了几周 | 工作量 |
|---|---|---|---|---|
| **E1** | `/learn/context-engineering` GSC URL Inspection 强制重新抓取 + 检查 `uat.jiangren.com.au` 的 `noindex: true` + 首页或 AI Engineer 课程页加内链 | Q19 | 2 周（每天烧机会成本）| 15 分钟 ⭐ 推荐清单 #1 |
| **E2** | Course Report / SyncSkills / Career Karma 创建/完善 JR 档案页 + 邮件触达近 3 期毕业生收 30 条英文评价（4 周内） | Q3 / Q7 / Q8 / Q10（一次解 4 个高购买意向 query） | 3 周 | 2 天设置 + 4 周持续 ⭐ 推荐清单 #2 |
| **E3** | `jiangren.com.au/en` 页面优化：title 加"AI Engineer 澳洲"、meta 加 RAG/MCP/Context Engineering 课程名（让 LLM 改"求职圈子"→"课程平台"定位）、Core Web Vitals 达标检查 | Q6（唯一稳定排名 query）| 3 周 | 半天审 + 1 天改 ⭐ 推荐清单 #3 |
| **E4** | 创建 AI Agent 实战课程专属 URL 落地页（JR 已有内容，缺独立 URL，导致 LLM 自答里 JR 不被推荐）| Q18 | 3 周 | 1-2 天 |

---

# 总览

| 类别 | 数量 |
|---|---|
| A 学习入门 | 23 篇 |
| B 求职导向 | 19 篇 |
| C 工具/技术 | 23 篇 |
| D 平台/产品 | 10 篇 |
| **文章合计** | **75 篇** |
| 工程任务 | 4 件 |

## 优先级建议

**P0（本周做完）**：
- E1（15 分钟）+ E3（半天 + 1 天）— 两件事都是工程师可以独立完成的
- 文章 #19 学习路线图 + #46 MCP 入门 + #71 Context Engineering 是什么 — 三期连续被点名

**P1（4 周内做完）**：
- E2 Course Report 30 条评价收集
- E4 AI Agent 课程专属 URL
- 文章 #24-#29 求职类 6 篇（保 Q6 唯一立足点）
- 文章 #46-#52 MCP 系列 7 篇（占住 2026 最热开发者话题）
- 文章 #71-#75 Context Engineering 系列 5 篇（配合 E1 索引修复后承接流量）

**P2（按月推进）**：
- 剩余 50+ 篇按选题热度滚动出
- 学员故事类（#4 / #28 / #41）需 Marketing 团队对接近期毕业生

## 下一步

1. 把这份 backlog 转成 `omni-report/marketing-tasks/active/*.md` 卡（每篇一张卡，frontmatter 含 title/category/module/priority/assignee）
2. push 到 omni-report → GitHub Actions 自动同步到 prod admin Kanban
3. 每期 AI Visibility 报告生成时交叉勾对——避免再连续 3 周空欠
