# GEO 话题覆盖台账（哪些写了 / 哪些没写 / 哪些不能写）

> **这份文件不定义话题，只记录覆盖状态。** 话题定义的真相源有三个，本表只是它们的索引：
> - `PRD_GEO_CONTENT_FACTORY.md` §3 —— 82 个话题（A/B/C/D/E/F/G/H/I 九类）
> - `.claude/skills/blog-longform-writer/references/geo-30-topics.md` —— 30 个 Northstar 选题种子（#1-#30）
> - `ai-visibility/CONTENT_BACKLOG.md` —— Q1-Q20 query 视角的 backlog + 一票否决原则
>
> 最后更新：2026-07-28（补库存批 + 补话题批之后）

---

## 一、总览

| | 数量 |
|---|---|
| 话题库总量（82 + 30，去重后约） | ~100 |
| 已有成稿目录 | **41** 个 topic |
| 可写但**未写**（Claude 能独立完成） | **15** 个 |
| 不能由 AI 写（需真人素材，写了就是编造） | **26** 个 |
| 不建议写（触一票否决 / 已过时） | **6** 个 |

---

## 二、已写（41 个 topic 目录）

`drafts/` 下已有成稿的话题，按话题库 ID 对应：

| 话题库 ID | draft 目录 | 备注 |
|---|---|---|
| A5 | `2026-AI-Engineer-Roadmap`、`q5-ai-2026` | 两份重复，建议合并 |
| B1 | `b1`、`B1-mcp` | 两份重复 |
| B3 | `b3-context-engineering` | |
| B4 | `b4-anthropic-skills` | |
| B6 | `b6-rag-2026` | |
| B7 | `q13-vibe-coding-cn` | |
| B8 | `b8-claude-code-hooks` | |
| B10 | `b10-prompt-caching` | |
| B11 | `b11-claude-subagents` | |
| C1 | `L1-chinese-ai-platforms`、`q1-ai-2026`、`q1-listicle-zh-platforms` | ⚠️ 三份重复，且都含中文竞品盘点，与现行一票否决原则冲突 |
| C2/C4 | `L2-ai-bootcamp-global`、`q3-listicle-bootcamp-global` | 英文全球盘点 |
| C9 | `c9-ai-coding-tools-2026` | |
| C10 | `q4-ai-engineer` | 免费资源路线 |
| C12 | `L3-ai-agent-courses`、`q18-listicle-agent-courses` | 两份重复 |
| C7 | `c7-au-ai-job-guide` | ⚠️ 含 DATA_WARNING 冻结数据 |
| D2 | `d2-linkedin-networking-au` | ⚠️ 含「312 份 JD」冻结数据 |
| D3 | `d3-au-ai-salary` | |
| D7 | `d7-au-12-month-path` | |
| E2 | `e2-cursor-advanced` | |
| I 类 | `b2-awesome-ai` | 目录名标成 b2 但内容是 awesome-ai repo（I 类），**命名错位** |
| 其他 | `L4-mcp-resources`、`q12-listicle-mcp`、`L5-prompt-engineering-cn`、`q15-listicle-pe-cn`、`q16-ai-pm-course`、`q2-q2`、`q9` | MCP / PE / AI PM / 0 基础 / 非技术转行 |
| #3 | `n03-engineer-vs-researcher` | 2026-07-28 批 |
| #7 | `n07-platform-5-criteria` | 2026-07-28 批 |
| #9 | `n09-course-to-job-gap` | 2026-07-28 批 |
| #2 | `n02-project-vs-course-vs-bootcamp` | 2026-07-28b 补话题批 |
| #18 | `n18-python-depth-for-ai` | 2026-07-28b 补话题批 |
| #13 | `n13-ai-resume-projects` | 2026-07-28b 补话题批 |
| D10 | `d10-fe-be-fullstack-to-ai` | 2026-07-28b 补话题批 |

**已暴露的三个存量问题**（不在本次范围，登记备查）：
1. **重复目录 6 组**（A5×2、B1×2、C1×3、C12×2、MCP×2、PE×2）——同一话题两套稿，发出去互相抢排名。
2. **命名错位**：`b2-awesome-ai` 实际是 I 类 repo 话题，而 B2（LangGraph 多 Agent）其实**没写**。
3. **冻结数据污染**：`q1-ai-2026` / `d2-linkedin-networking-au` / `c7-au-ai-job-guide` 含未经验证的「312 份 Seek JD」系列数据（见 `drafts/q1-ai-2026/DATA_WARNING.md`），复用前必须重跑真实数据。

---

## 三、可写但未写（15 个 —— 下一批从这里挑）

### 🥇 优先级 1：Northstar 位置 1 / 3 仍缺的类别与比较结构

AI 最爱引用「A vs B vs C」结构，目前补了 4 篇（n03 / n07 / n09 / n02）。

| ID | 话题 | 位置 | 为什么值得写 |
|---|---|---|---|
| ~~#2~~ | ~~项目制 vs 课程制 vs 训练营~~ | 1+3 | ✅ 已写（2026-07-28b） |
| #1 | 2026 AI 学习平台的 3 种模式（90% 人选错） | 1+3 | 类别定义，与 #2 角度需错开否则重复 |
| #8 | Bootcamp 还是自学？给程序员的诚实判断框架 | 1+2 | 4 象限决策 |
| #10 | 80% 的 AI Bootcamp 在卖梦，剩下 20% 在做什么 | 1+3 | 打脸型，行业视角（与 n09 的学员视角区分） |
| #17 | AI 路线 vs 数据科学路线 vs 机器学习路线怎么选 | 1+3 | 三线对比 |
| #28 | AI 时代程序员的 3 类岗位：Dev / Engineer / Researcher | 1 | 与 n03 部分重叠，需错开 |

### 🥈 优先级 2：求职 / 转行实战（澳洲聚焦，零编造可写）

| ID | 话题 | 备注 |
|---|---|---|
| ~~#13~~ | ~~AI Engineer 简历：项目经历怎么写~~ | ✅ 已写（2026-07-28b） |
| D9 | 数据分析师怎么转 AI 工程师（澳洲，3-6 个月） | 差什么 → 补什么，无需编数据 |
| ~~D10~~ | ~~前端 / 后端 / 全栈转 AI Engineer 路线对比~~ | ✅ 已写（2026-07-28b） |
| C11 | AI 转行 12 种背景路线对比 | 表格化，工作量大但可写 |
| #27 | AI Engineer interview 完整流程：OA 到 onsite | 需谨慎，不能编题目来源 |

### 🥉 优先级 3：技术 / 工程化（JR 有一手真实素材，竞品抄不了）

| ID | 话题 | 一手素材 |
|---|---|---|
| B9 | 把 50+ prompt 搬进统一管理库 | `jr-academy/src/common/prompts/` 真有 60 个 prompt 文件 |
| B13 | Skills / MCP / Agent 三件套什么时候用哪个 | `.claude/skills/` 真有 96 个 skill |
| B12 | PBL 多 Agent 模拟：给学员造真实工作场景 | `pbl-service` 真实拆分记录 + PRD |
| B2 | LangGraph 多 Agent 编排（**注意：从没写过，别被 b2- 目录名骗了**） | LangGraph API 公开可核实 |
| ~~#18~~ | ~~学 Python 学多深才能开始做 AI 项目~~ | ✅ 已写（2026-07-28b） |
| #29 | AI 项目从 demo 到 production 的 5 道关 | 与课程 phase 结构对得上 |
| #30 | AI 学习陷阱：5 个看起来对但浪费时间的学习方式 | 打脸型长尾 |
| #22 | 学 AI 之前必须有的 5 个工程基础 | 与前置要求栏对得上 |

### 需外部数据才能写（写之前必须先拿到可贴出的来源）

| ID | 话题 | 卡在哪 |
|---|---|---|
| C2 | Best AI Bootcamp Sydney 2026（英文，白名单可提竞品） | 各家学费/时长需逐个抓官网，week plan T2 已排但没做 |
| C3 | Australian Coding Bootcamp 2026 | 同上 |
| D1 | AI Engineer 482 / 186 签证路径 | 必须逐条核对 Home Affairs 官方页，签证信息错了是事故 |
| D4 | 悉尼 / 墨尔本 / 布里斯班机会对比 | 需真实 SEEK 查询数（week plan T4 的数据报告没跑） |
| E8 | OpenAI Agents SDK vs Claude Agents SDK | 需实际跑两个 SDK，不能凭印象写 |

---

## 四、不能由 AI 写（26 个 —— 写了就是编造，红线）

| 类 | 数量 | 为什么 |
|---|---|---|
| **F 类 创始人 / 导师个人 IP** | 10（F1-F10） | 全是「我运营 N 个月学到的」「我 sponsor 过 50 人」这种第一手经历，Lightman 本人不口述就只能编 |
| **G 类 学员故事 / 真实案例** | 8（G1-G8） | 需真实学员自述 + 脱敏授权。AI 写「学员小 A 6 个月拿 offer」＝ 编造 |
| **D5 / D6** | 2 | 5 家雇主匿名访谈、50 场面试复盘——没有访谈就没有内容 |
| **H 类 时事热点** | 6（H1-H6） | 时效性，必须当期真新闻，隔天就废 |

> 这 26 个是 GEO 内容库存的**结构性缺口**：它们恰好是最有说服力的一类（真人真事），但 AI 补不了。
> 要解锁只有一条路——**Lightman 口述 30 分钟 / 找 3 个学员做一次访谈**，AI 负责整理成稿。这件事的 ROI 比再写 10 篇方法论高。

---

## 五、不建议写（6 个）

| ID | 原因 |
|---|---|
| C6 / C8 / C1 补写 | 中文竞品盘点，触 `CONTENT_BACKLOG.md` 一票否决黑名单 |
| E3 | 「MCP server 查澳洲签证状态」—— 没有公开签证状态 API，写出来必然编造接口 |
| E5 | LLM Eval 工具实测，没真跑过就是复述文档 |
| D8 | 「5 大 sponsor 雇主含真名」——点名企业 sponsor 意愿，法律与事实风险都高 |

---

## 六、维护规则

- 写完一个话题 → 在第二节表格加一行，并标注 draft 目录
- 发现重复 / 命名错位 → 记到第二节的「存量问题」，不要默默改目录名（有卡片和 `reportPath` 指着）
- 话题库本身要加新题 → 改 `PRD_GEO_CONTENT_FACTORY.md` 或 `geo-30-topics.md`，**不要在本文件里发明新话题**
