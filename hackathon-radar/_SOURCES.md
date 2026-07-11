# 比赛雷达 · 数据源盯梢清单（SoT）

> 雷达 routine 每期必扫的信息面。**🇦🇺 澳洲本地生态优先级最高**（老板 2026-07-11 拍板），孵化器/加速器的**开营动态**（新 cohort 开放申请 / 截止 / 开营日期）单列成段，不能只在有 hackathon 时才提。
> 使用方式：routine 每期按下表逐面检索当前状态（WebSearch 验证），**清单只告诉你去哪看，当期状态必须现场核实，禁止凭记忆写开营时间**。

## 🇦🇺 一、澳洲本地生态（每期必查，最高优先）

### 孵化器 / 加速器（重点盯「新 cohort 开没开」）

| 机构 | 盯什么 | 官网 |
|------|--------|------|
| Antler Australia | 下一期 cohort 开营/申请截止（悉尼/墨尔本/布里斯班） | antler.co |
| Startmate | Accelerator 各期 + Launch Club 预加速开放窗口 | startmate.com |
| Google for Startups Accelerator: AI First (AU) | 年度批次申请窗口 | startup.google.com |
| Techstars（澳洲相关 program） | 是否有 ANZ 批次开放 | techstars.com |
| Skalata Ventures | seed program 申请窗口 | skalata.vc |
| Cicada Innovations（深科技，悉尼） | 孵化项目 / program 开放 | cicadainnovations.com |
| UNSW Founders | 10x / New Wave 等 program 批次 | unswfounders.com |
| INCUBATE（悉尼大学） | 批次开放（对学生学员友好） | incubate.org.au |
| MAP（墨尔本大学加速器） | 年度批次 | map.unimelb.edu.au |
| UQ Ventures（布里斯班） | ilab 加速批次 | ventures.uq.edu.au |
| Stone & Chalk | resident program / scale-up 项目 | stoneandchalk.com.au |
| LaunchVic 资助的各类 program（维州） | 新开的 accelerator/grant round | launchvic.org |

### 政府 grant / 补贴（rolling 的确认还开着，有窗口的盯截止）

| 项目 | 盯什么 |
|------|--------|
| R&D Tax Incentive（RDTI） | 政策变动 / 申报节点（财年 7 月节奏） |
| CSIRO Kick-Start | 配套资助是否开放 |
| AI Adopt Program（AI Adopt Centres） | 各中心免费评估/咨询服务动态 |
| EMDG（出口市场开发补贴） | round 开放窗口 |
| 各州科技 voucher/MVP grant（NSW MVP Ventures、QLD Ignite 等） | round 开放 |

### 本地企业办的 hackathon / 比赛

- 盯澳洲公司冠名的 hackathon（如 Pinch Payments AU$50K 这类），检索：`site:devpost.com hackathon Australia`、`hackathon Sydney/Melbourne/Brisbane 2026`
- 大学系 hackathon（UNSW/USYD/UQ/Monash CS 社团）——学员可参加也可当渠道

### 平台激励（澳洲专属档）

- OpenAI for Startups 澳洲计划（openai.com/global-affairs/openai-for-australia）
- Google Cloud for Startups / AWS Activate / Microsoft Founders Hub 的 AU 入口与新档位

## 🌏 二、全球信息面（每期扫一轮）

| 信息面 | 覆盖 |
|--------|------|
| Devpost | 全球 hackathon 主阵地 |
| lablab.ai | AI 主题 hackathon 高频 |
| DoraHacks | Web3/AI 混合 |
| Kaggle competitions | 奖金赛/学术赛 |
| YC / a16z speedrun 等 | 顶级加速器申请窗口 |
| Anthropic / OpenAI / Google / AWS / Microsoft startup 计划页 | credits 档位变动 |
| Indie Hackers / HN | solo founder 案例（内容素材） |

## 三、产出要求增量（对现有报告结构的补充）

1. 报告增加固定段落 **「🇦🇺 本地生态雷达」**：孵化器开营动态单独列（谁开了新 cohort、申请截止、要不要股权），哪怕当期没有 hackathon 也要有这段。
2. 澳洲条目一律 🇦🇺 标记并排在各段最前。
3. 开营/截止日期必须当期核实出处（官网/官方公告链接），查不到确切日期写「⚠️ 日期待确认」，禁止编造。
4. 入库（后续接通 routine 写库后）：有确切 URL 的条目按 `type=accelerator/grant` upsert 进机会库。
