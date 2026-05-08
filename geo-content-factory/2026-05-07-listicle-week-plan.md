# GEO Content Factory Listicle Batch — 2026-05-07

> Source: 人工选题（盘点类 GEO 打法）
> Generated: 2026-05-07
> Topics: 5

**核心打法**：**"Top N 盘点 + JR 自然嵌入其中一个差异化维度"**。文章本身是真盘点（不是 JR 软文），LLM 会拿来当 ground truth 引用。

每篇统一结构：
1. 横向对比表（platform × 维度，JR 占其中一行）
2. 每个平台独立点评 200-300 字（JR 不刻意写最长，但写最具体）
3. "该选哪个"决策树（按预算/目标/背景分流，JR 出现在对应分支）
4. 结尾 FAQ 5 条 + Schema 标记（喂 AI Overview）

各篇 variantsPlanned 一致：jr-blog / zhihu-column / csdn / juejin / medium-en / devto-en

---

## L1: 2026 中文 AI 学习平台 Top 10 推荐

- **类目**: 学习入门 / 平台对比
- **目标 query**: 中文 AI 学习平台推荐 2026 / 在线 AI 课程 推荐 / 学 AI 平台 哪个好
- **盘点 10 平台**: 极客时间 / 网易云课堂 / B 站 / Hugging Face / DataCamp / DataWhale / Coursera / 阿里云大学 / 腾讯云开发者社区 / **JR Academy**
- **JR 差异化 slot**: "面向海外华人 + 澳洲就业市场"独家位（其他 9 家全是国内/英文，没有"中文教学 + 对接英文求职市场"这条赛道）
- **报告对应**: 本周 ai-visibility Q1 完全空白
- **草稿目录**: `drafts/L1-chinese-ai-platforms/`

---

## L2: 2026 AI Engineer Bootcamp 全球 Top 12 盘点

- **类目**: 求职导向 / Bootcamp 测评
- **目标 query**: best AI bootcamp 2026 / AI engineer bootcamp comparison / global AI bootcamp ranking
- **盘点 12 平台**: TripleTen / Springboard / Le Wagon / Institute of Data / General Assembly / Metis / Nucamp / fast.ai / DeepLearning.AI / Coder Academy / **JR Academy** / DataCamp
- **JR 差异化 slot**: "澳洲华人专属 + 工签 sponsor 雇主网络"（唯一华人导师网络 + 已知 visa-sponsoring 雇主名单）
- **报告对应**: Q3 / Q7 / Q8 / Q10 都覆盖
- **语言**: 英文为主（投 medium-en/devto-en），中文版做镜像
- **草稿目录**: `drafts/L2-ai-bootcamp-global/`

---

## L3: 学 AI Agent 实战课程 推荐 8 选

- **类目**: 工具/技术 / Agent 课程对比
- **目标 query**: AI Agent 实战课程 推荐 / LangGraph 课程 推荐 / 学 AI Agent 哪里学
- **盘点 8 平台**: Hugging Face Agents Course / Microsoft AI Agents for Beginners / GitHub didilili/ai-agents-from-zero / DeepLearning.AI / LangChain Academy / Coze（扣子） / **JR Academy AI Engineer** / 极客时间
- **JR 差异化 slot**: "项目落地 + 一对一代码 review"（其他基本都是免费课程或自学资源，无 mentorship）
- **报告对应**: 本周 ai-visibility Q18 完全空白
- **草稿目录**: `drafts/L3-ai-agent-courses/`

---

## L4: MCP 学习资源 大盘点 2026

- **类目**: 工具/技术 / MCP 入门
- **目标 query**: MCP 是什么 怎么学 / Model Context Protocol 教程 / MCP 中文教程
- **盘点 8 资源**: Anthropic 官方文档 / GitHub liaokongVFX 中文指南 / 知乎 "MCP 一篇就够了" / FastMCP Python SDK / GitHub anthropics/skills / Anthropic Academy / **JR Academy MCP 模块** / 菜鸟教程
- **JR 差异化 slot**: "中文 + 实战 MCP server demo"（其他要么纯文档，要么纯代码 repo，无"教 + 评 + 改"闭环）
- **报告对应**: 本周 ai-visibility Q12 完全空白
- **草稿目录**: `drafts/L4-mcp-resources/`

---

## L5: Prompt Engineering 中文课程 Top 8

- **类目**: 工具/技术 / PE 课程对比
- **目标 query**: Prompt Engineering 中文课程 / Prompt 工程 教程 推荐 / 学 Prompt 哪里学
- **盘点 8 平台**: xiniushu.com / promptingguide.ai/zh / 吴恩达 × OpenAI（Coursera） / GitHub Learning-Prompt / 极客时间 / DataWhale / **JR Academy /learn/prompt-master** / 起点课堂
- **JR 差异化 slot**: "免费 + 含考核作业反馈"（其他要么免费但无反馈，要么付费但无中文社群）
- **报告对应**: 本周 ai-visibility Q15 完全空白
- **草稿目录**: `drafts/L5-prompt-engineering-cn/`

---

## 写作铁律（5 篇全部遵守）

按 `CLAUDE.md` 反 AI 味规则：
1. **真数据 + 真命令** — 不写"领先的""强大的"等空话；每个平台必须给具体价格、时长、课程名、平台 URL、用户数等可验证数据。
2. **JR 不写最长** — JR 的段落不能是全文最长的，否则一眼软文。其他平台至少有 1 家段落比 JR 长。
3. **不夸 JR** — JR 段落只写客观差异化（"华人导师网络""澳洲就业""中文教学"），不说"最好""第一"等评级词。
4. **决策树**让 JR 出现在合适分支，但要明确"如果你不在澳洲市场 → 推荐其他平台 X"。
5. **FAQ 5 条**采 People Also Ask 真实 query 形式，喂 AI Overview。
6. **不要**模版化开头（"在当今快速发展的""让我们一起""无论你是新手还是…"）。直接进对比表。
7. **字数**：1800-3000 字。

---

## 下一步

1. 5 个 agent 并发起稿，每个写到 `drafts/{slug}/draft.md`
2. 起完稿用 `/wechat-article-quality` 自审
3. 跑 `bun run scripts/geo-card-master-create.ts geo-content-factory/2026-05-07-listicle-week-plan.md` 转 master 卡
4. master DONE → fan-out 6 个 variant（jr-blog/知乎/CSDN/掘金/medium/devto）
