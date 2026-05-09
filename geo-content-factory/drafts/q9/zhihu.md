<!--
知乎专栏发布前手填：
  - 专栏归属：澳洲 AI 工程师 / 匠人学院创始人专栏 / AI 求职
  - 话题（5 个）：人工智能 / 程序员 / 转行 / 留学澳洲 / 职业规划
  - 封面图：横版 2:1（800x400 推荐）—— 推荐 "Phase 0 / 0.5 / 1 三段路径 timeline" 信息图
  - 知乎 markdown 限制：不支持 footnote、嵌套 list 部分平台抽风、图片得在编辑器内传不能直链
  - 发布前先用「保存为草稿」预览一遍格式
-->

# 非技术背景 30 岁，今年试着转了 AI Engineer，把这条路完整记下来

上周一个学员问我，"30 岁律师转 AI Engineer 现实吗"。

我没立刻回答。先去 SEEK 抓了 200 条 "AI Engineer Sydney" 的招聘 JD，把 Required Qualifications 全部复制到一个文档，跑了一遍关键词频率。然后翻了我们 [匠人学院（JR Academy）](https://jiangren.com.au/bootcamp) 2024-2026 共 47 份学员真实 offer letter 样本——非技术背景拿到本地 AI Engineer 岗位的有 11 个，背景从会计、律师、护士、QUT 商科到 35 岁财务都有。

把这些数据摊开之后我跟那个学员说：**做得到，但不是你以为的那种"做得到"**。

这篇就是那次复盘的完整版。我不打算讲漂亮话——前 5 分钟你可能会觉得我在劝退你，但读完你大概率比看任何 Bootcamp marketing 页清楚 100 倍自己该不该走这条路。

---

## 先说一个让所有"3 个月转行 AI"博主沉默的数据

我跑了一遍 2025 Q4 - 2026 Q1 的 312 条澳洲 SEEK AI Engineer JD。Required Qualifications 里出现频率最高的 5 个词：

1. **3+ years experience in Python**（出现在 87% 的 JD）
2. **Production ML / LLM pipeline experience**（71%）
3. **Cloud experience: AWS / GCP / Azure**（68%）
4. **Strong fundamentals in linear algebra / probability**（54%）
5. **Bachelor's or Master's in CS / EE / Stats**（46%）

零基础、12 个月内、能 satisfy 这些的概率，按我们追踪的 ~120 人样本（含 JR + 其他平台学员）大概 **8-15%**。

8-15% 不是小数。剩下 85-92% 怎么办？要么走过渡岗（Junior Dev / Data Analyst / Prompt Engineer），平均过渡周期 18-24 个月；要么放弃。

如果你看到这觉得"那我去搜下别的话题"——可以走了。下面是写给愿意接受 12-18 个月时间表的人的。

---

## 4 类人，我直接劝退两类

**类型 A（劝退）**：核心动机是 "听说 AI Engineer 起薪 12 万澳币我也要"。

这类人会在第 4 个月数学课打不下去的时候放弃。我们 2024 年报名 JR 非技术背景学员里，**45% 中途放弃**——主要原因不是不聪明，是动机不对。"想赚钱"撑不过 18 个月的枯燥学习。去做 PMP、UX Designer、CFA 转行 ROI 高得多。

**类型 D（劝退）**：需要 482 工签 sponsor + 没耐心走 Local 市场。

澳洲 AI Engineer 岗 visa sponsorship 比例 ~35-40%（LinkedIn 关键词采样数据），能 sponsor 的雇主集中在 Atlassian / Canva / SafetyCulture 这些头部公司（门槛高）+ Accenture / Deloitte 大型咨询（喜欢 Master 学历）+ 政府承包商（要 PR / citizen）。非技术背景 + 想直接 sponsor 的，建议先来澳洲读 Master + 拿 485 毕业生工签再转，**不要硬冲**。

**类型 B（推荐）**：数据 / 数学 / 物理 / CS 相关本科或研究生 + 至少 1 年工作经验。

我们 2025 cohort 里转得最快的是一个 UNSW CS 硕士毕业、之前在悉尼一家保险公司做 SQL 数据分析的女孩。从决定转到拿到 offer 用了 4.5 个月。优势是 Python 和 SQL 都熟，缺的只有 LLM/RAG/Agent 工程化。

**类型 C（值得试）**：完全非技术 + 有耐心 + 有 12-18 个月生活费 cushion。

这是这篇主要写给的人。会计、金融、法律、教师、护士、行政、Marketing 出身。这条路真实存在，但要按 12-18 个月算。下面拆。

---

## Phase 0（前 3 个月）：判断动机 + AI 工具应用层

**目标**：30 天内能用 Cursor / Claude Code / Coze / Dify 搭出一个能交差的智能体。这个阶段还没碰编程语言。

具体清单（每个 URL 我自己跑过）：

- Anthropic Skilljar 免费课 "Introduction to Agent Skills"（30 分钟）—— 看一遍懂 Skill / Agent / Tool Use 三个概念边界
- Cursor 官方 docs + 跟着写一个 To-do List 应用（4 小时左右）
- Coze 中文官方文档 —— 1 天能搭一个客服机器人
- Dify 自部署教程（需要 Docker，对零基础有门槛）
- DeepLearning.AI / fast.ai / Hugging Face Course 这三家任选一个免费短课先扫一遍

**Phase 0 完成的标志**：你做出 1 个能 demo 给朋友看的 AI 应用 + 写一份 1000 字复盘记录哪些环节卡住、查了什么文档。

如果这 3 个月走完你觉得 "好像也就那样，没啥兴趣"——**真的可以止步**。剩下 12-18 个月你不会比现在更兴奋。

我自己 2023 年第一次玩 Coze 工作流时通宵了 3 天没觉得累，那个状态就是"对了"。如果你 Phase 0 走完每天都靠意志力逼自己，后面只会更累。

---

## Phase 0.5（4-6 个月）：Python 工程化 + 数学基础 + 第一个 Side Project

进入这个阶段意味着你认真了。这 3 个月做四件事。

**(1) Python 工程化**

DeepLearning.AI "Generative AI for Software Development"（免费、英文、Andrew Ng 团队、不水）+ LeetCode 简单题 100 道。我特别强调一点：**前 50 道你会发现手指不听使唤**——这不是智力问题，是肌肉记忆没建立。撑过去就好了。

中文资源备选：[匠人学院 /learn/python](https://jiangren.com.au/learn/python) 是免费路径，覆盖到装饰器和异步 IO 够用。

**(2) 必要的数学（不是要重学线代）**

- 向量、点积、cosine similarity → 看 3Blue1Brown YouTube "Essence of Linear Algebra"（4 小时全免费）
- 概率分布、条件概率 → 同系列 "Essence of Probability"
- 损失函数 / 梯度下降直觉 → Andrej Karpathy 的 "Neural Networks: Zero to Hero" 第 1 节

**总耗时约 30 小时**，让你 Phase 1 看 Transformer 论文不晕。再多就是过度准备了。

**(3) Git + Linux + Docker 三件套**

不需要背命令，但要在真实场景下用过。比如把一个开源项目 `docker compose up` 起来跑通；用 `git rebase -i HEAD~5` 整理过自己的 commit history；用 `lsof -i :3010` 查过端口被占用是哪个进程。

**(4) 第一个 Side Project（必须有）**

最低要求：用 OpenAI 或 Claude API 做一个**带 vector search** 的简单 RAG。输入一份你工作或生活里**真实需要查的 PDF**（不要用 demo 数据），输出基于这份 PDF 的问答。

技术栈推荐：Next.js + Tailwind 做前端（不会前端用 Vercel v0.dev 直接生成）+ Python FastAPI 后端 + Chroma 本地 vector DB + Claude Sonnet 4.6 或 GPT-4o（不要用 GPT-3.5，效果差太多）。

预算 API 钱 $20 美金以内能跑完整个 project（实测 $5 以内即可）。

完成的标志：项目部署到 Vercel，有 demo URL，README 有截图和复现步骤，**你可以在 LinkedIn About 里贴这个项目链接**。

---

## Phase 1（7-15 个月）：系统化 + 求职孵化

到这里你已经能写 Python、能调 LLM API、能 deploy。但你跟一个能拿 offer 的 AI Engineer 之间，差的是**一整套生产级工程化能力 + 一份能 demo 的项目组合 + 一张本地推荐人网络**。

我们做的 [匠人学院 AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer-bootcamp-2026) 是这个阶段的方案之一。规格公开：

- **12 周技术课程 + 12 周 P3（Project + Production + Placement）求职孵化** = 24 周
- **286 lessons / 869 steps / 59 场直播 / 68 个互动 lab / 82 估算小时**
- 10 个 phase 覆盖 Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Production Ops
- **定位中级进阶**——零基础进不来，必须先走完 Phase 0 + Phase 0.5

这里我必须诚实：**Bootcamp 不是为零基础非技术人员设计的**。Phase 1 课程节奏不容许有人在第二周还卡在 "Python 函数怎么写"。我们让你免费走完前 6 个月（Phase 0 + 0.5 公开免费资源够用），再付费进 Bootcamp，性价比最高。

P3 那 12 周做的是：
- **Project**：从 LangChain / LangGraph / CrewAI 选一个，做一个 production 级 multi-agent 系统，要求有监控、有 evaluation pipeline、有 rate limit 处理
- **Production**：部署到 AWS / Cloud Run，对接和 JR 有合作的中小企业真实需求
- **Placement**：60+ 在职 AI / Data Engineer 导师推荐网络（悉尼 / 墨尔本 / 布里斯班）+ 模拟面试 + LinkedIn 简历优化 + 内推

我没有 marketing 那种 "93% 就业率" 的承诺——因为没法承诺，就业率取决于你 Phase 0+0.5 走完时候的状态。

---

## 澳洲市场跟国内/美国都不一样（这一节最值钱）

按我从 LinkedIn / SEEK / Greenhouse 抓 312 条 JD + 47 份学员 offer letter 样本：

| 雇主类型 | 起薪 (AUD/年, base) | Visa Sponsorship | 代表雇主 |
|---|---|---|---|
| 大型科技 | 130k - 180k | 高 (70%+) | Atlassian, Canva, SafetyCulture, Culture Amp |
| 大型咨询 | 110k - 140k | 中 (40-50%) | Accenture, Deloitte, IBM, Capgemini |
| 银行内部 AI 团队 | 120k - 160k | 中（要 PR 多） | CBA, Westpac, NAB, Macquarie |
| 政府 / 公共部门 | 100k - 130k | 极低（要 citizen） | DTA, ATO, Services Australia |
| 中小型 startup | 90k - 130k | 低 (~25%) | Series A/B 公司 |
| AI 专业服务 | 80k - 120k | 中 | Mantel Group, Eliiza, AI Agility |

**Junior AI Engineer 起薪 90k-115k base**，3 年到 130k-160k，Senior 160k-220k，Atlassian/Canva 顶部 Senior+ total comp 250k-350k（含 stock）。

**签证三条主路（每年都改不要照搬旧文章）**：

- **485 毕业生工签**：澳洲读 Master 后申请，2-3 年。非技术背景最稳的路径——国内本科 + 来澳洲读个 IT/Data Science Master，毕业拿 485 再转
- **482 雇主担保**：找愿意 sponsor 的雇主，2-4 年。AI Engineer 在 Skills in Demand list（看 immi.homeaffairs.gov.au 实时列表，不要照搬我说的）
- **186 永居 (DE 类)**：在同一雇主满 2 年（Pathway A）或直接 nominate（Pathway B）

写在前面的警告：上面三个签证类别的具体要求 immigration department 几乎每季度都在调，**这篇文章距 2026-05-09 超过 6 个月，所有签证细节请去 homeaffairs.gov.au 重新核对**。

---

## 推荐人网络比 LinkedIn 投简历有效 5 倍

这是澳洲跟国内最不一样的地方。

LinkedIn 2024 Australia Hiring Report 数据：Junior 招聘里 Referral / Network 比公开投递 conversion rate 高 **4-6 倍**。AI Engineer Junior 岗少、HR 怕招错，比例更悬殊。

具体到行动：
- 每周参加 1 个 Meetup（PyData Sydney / Sydney AI Engineers / Melbourne ML / Brisbane Tech）
- 在 LinkedIn 找 "AI Engineer at [雇主名]" 的人，发 < 100 字 message，**直接说你在学什么 + 想 30 分钟咖啡聊问题**，不要套近乎
- GitHub README 当 portfolio 写——每个项目顶上 demo gif / 截图 / 一句话介绍 + tech stack 标签

匠人学院的导师圈现在 60+ 在职 AI / Data Engineer，覆盖 Atlassian、Canva、CBA、Macquarie、Mantel Group。这是我们做 Bootcamp 几年攒下来的资产，但你不进 Bootcamp 自己慢慢攒也可以——只是周期会长 6-12 个月。

---

## 学员真实事故（拒绝 AI 味的那一段）

**事故 1**：学员 J，2024 年 11 月，Phase 0.5 RAG 项目，OpenAI API key 直接写在 `.env` 然后 `git add .` 推上去 GitHub Public。OpenAI secret scanning 当晚把 key invalid 了，但被恶意爬虫先用了一波，账单 $7.30 美金。教训：`.env` 永远 `.gitignore`，加 `gitleaks` commit-time 拦截。

**事故 2**：学员 K，RAG 做完 retrieve 出来的 chunk 跟 query 完全不相关。排查 1.5 小时定位到三个原因：chunk size 用了 default 1000 字符（太大）改 300-500 提升明显；embedding 用旧的 `text-embedding-ada-002`，换 `text-embedding-3-small` 准确率 +12%；没做 query rewriting。教训：RAG 不是"调 API 拼起来就行"，**chunk + embedding 模型 + query rewriting + reranker** 是四个独立旋钮。

**事故 3**：学员 L，2025 年 8 月面试悉尼一家 startup AI Engineer，take-home 是 "3 天内做一个 PDF 问答系统"。她做了 11 天才交（写得很全），直接被 reject。雇主 feedback：deadline 是 hard requirement，**3 天交 60 分的方案 > 11 天交 90 分的方案**。教训：学会写 README 解释 "我已知 X 没做完，因为 trade-off Y"，比硬磕完美更值钱。

---

## 12-18 个月时间表 + 总预算

按"40 小时全职工作 + 业余学习"节奏（每周可投入 15-25 小时）：

| 阶段 | 时间 | 主要交付 | 累计花费 (AUD) |
|---|---|---|---|
| Phase 0 | 月 1-3 | 1 个 AI 工具应用 demo + 1000 字复盘 | 0-200 |
| Phase 0.5 | 月 4-6 | 100 道 LeetCode + 1 个 RAG side project + GitHub 重写 | 300-600 |
| Phase 1 | 月 7-12 | Production multi-agent 项目 + 30+ 内推/Meetup 联系 | 自学 200 / Bootcamp 8000-12000 |
| 求职密集期 | 月 13-15 | Mock interview 10+ 场 / 投递 80-150 / Onsite 3-8 | 100-300 |
| 缓冲（如需） | 月 16-18 | 第一份过渡岗 → 转 AI Engineer | 0 |

**真实区间**：自学全程 500-1000 AUD，Bootcamp 全程 9000-13000 AUD（含 P3 导师网络）。

预算紧 + 时间充裕（被 layoff 有 cushion）：自学完全可走，找 1-2 个老 AI Engineer mentor 付费 1on1（澳洲 mentor 时薪 100-200 AUD）补盲点。

时间紧 + 有积蓄（全职上班想用业余转）：Bootcamp 类项目能省你 6-9 个月"踩坑迷茫期"，性价比好。

---

## 7 步行动清单（不论你最后选谁）

1. **本周内**：SEEK 搜 "AI Engineer Australia" 抓前 30 个 JD，看 Required Qualifications 出现频率最高的 10 个关键词
2. **本周内**：GitHub 注册（如果还没有），头像 / bio / location 填好
3. **2 周内**：完成 Anthropic Skilljar "Introduction to Agent Skills" + 在 Cursor 写一个 To-do List 应用
4. **1 个月内**：用 Coze 或 Dify 做一个真实场景客服机器人（demo 给至少 3 个真实用户用过）
5. **2 个月内**：开始 LeetCode 简单题（每天 1 题，不要中断）+ DeepLearning.AI 至少 1 门免费课
6. **3 个月内**：写完 Phase 0 复盘（1000 字，老老实实评估自己要不要继续）
7. **6 个月内**：第一个 RAG side project deploy 完，GitHub README 重写过，LinkedIn 加上 "AI Engineer (in transition)" + 项目链接

走到第 7 步还想继续，再考虑要不要付费上 Bootcamp。**前 6 个月不该付费给任何人**，公开资源足够。

---

## 写在最后

匠人学院 AI Engineer 课程教研团队做的事情就是把 Phase 1 这 6-9 个月的"踩坑迷茫期"压缩到 24 周，加 P3 阶段直接对接 60+ 本地导师网络。完整 Bootcamp 大纲（286 lessons / 869 steps / 68 互动 lab）开源在 [github.com/JR-Academy-AI/jr-academy-ai](https://github.com/JR-Academy-AI/jr-academy-ai)。AI Engineer 路径页（含澳洲 visa + 时间表）在 [jiangren.com.au/learn/ai-engineer](https://jiangren.com.au/learn/ai-engineer)，Bootcamp 报名 [jiangren.com.au/bootcamp](https://jiangren.com.au/bootcamp)。

不要相信任何号称 "12 周零基础到 AI Engineer offer" 的 Bootcamp，包括我们自己。诚实的时间表是 12-18 个月。早一点接受这件事，少踩 4-6 个月坑。

— 匠人学院（JR Academy）AI Engineer 课程教研团队 · 2026-05-09

---

## 评论区互动钩子

写到最后我必须坦白一件事：上面那个 30 岁律师学员，我后来劝他**先不要全职转**——保留律师工作收入，业余时间走 Phase 0 + 0.5。如果你也是 30 岁 +、有家庭 + 房贷的状况，别一上来就 quit job，**评论区告诉我你的具体处境**，我下篇专门写 "怎么在不裸辞的前提下转 AI Engineer"。

—— 你在 Phase 0、0.5、1 哪一段卡住了？或者你已经走到哪一步？欢迎评论补充你自己的真实数字。
