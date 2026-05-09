# Marketing Tasks 分配指导

> **用途**：每次给 34 张/批 routine 卡分配 assignee 时的 ground truth。
> **维护**：用户每次更正分配规则后，先改这里，再改 `routing-table.json`，再改 .md frontmatter。
> **优先级**：本文件 > `routing-table.json`（json 是机器读的，本文件是人定的规则）

---

## 🚨 红线（不接 marketing 派单的人）

**任何 marketing 任务都不能派给这 9 人**：

| 中文名 | Email | 原因 |
|---|---|---|
| **Ada** | `1982723658@qq.com` | **产品运营经理**，不接 marketing；partnership / campaign / kol / growth-hack 也不派她 |
| **Seren** | `jiahewan362@gmail.com` | 不派（用户明确禁止） |
| **Aurora** | `aurora.gg.zhou@gmail.com` | MKT，已暂停 routine 派活 |
| Melody | `career@jiangren.com.au` | HRM（HR only）|
| Amelia | `414452979@qq.com` | 课程顾问（前线销售）|
| Rain | `qy1219@hotmail.com` | 课程顾问（前线销售）|
| Angela | `angela727hl@gmail.com` | 课程顾问（前线销售）|
| Beta | `2840238410@qq.com` | 教务管理 |
| Yulia | `yuyi2003yu@163.com` | 产品实习生（产品中心）|
| Neomi | `261073251@qq.com` | 销售助理（taobao-* 专项）|

---

## ✅ 接 marketing 派单的 6 人

### 实习生（20/34 张 = 59% 工作量）

| 中文名 | Email | 主要负责 |
|---|---|---|
| **Bella** 新媒体运营实习生 | `18634772744@163.com` | **GEO master / 落地页**（JR 自家网站长文）+ 视觉/视频/Canva/小红书重写/视频脚本 |
| **Serena** 新媒体运营实习生 | `2083483802@qq.com` | **第三方平台搬运**（CSDN / 知乎 / 掘金 / Dev.to / Medium / 公众号 / Reddit-Quora / 搜狐网易百家 / 学员答主协调）|
| **KIKI Huang** Brisbane MKT 实习生 | `huangdg755@gmail.com` | Brisbane 线下活动 + 跨城市 webinar |

### 全职（14/34 张 = 41% 工作量）

| 中文名 | Email | 主要负责 |
|---|---|---|
| **Summer** 新媒体运营 | `1134583264@qq.com` | 小红书账号矩阵：澳洲匠人学院 / Rain姐说求职 / 澳洲实习猿 / Kiki的分享日记 |
| **Lily** 新媒体运营 | `2363843954@qq.com` | 小红书账号矩阵：Amelia在悉尼 / momo在澳洲 / JR匠人学院 |
| **KIKI 成都** 新媒体运营 | `2838684082@qq.com` | 小红书账号矩阵：UQ课代表 / UNSW课代表 / 墨大课代表 / 素人号（**4 个课代表账号全归成都团队，与 UQ/UNSW/墨大物理位置无关**）|

> 全职三人 = 小红书账号矩阵 owner，**partnership / webinar / event 策划** 也派给她们三人轮（按主题/账号匹配度拆）。

---

## 分配规则（按内容类型）

### 1. GEO 内容 → **全部派实习生**（Bella + Serena），不派全职

| 内容类型 | module | 派谁 | 理由 |
|---|---|---|---|
| **JR 自家网站 master / 落地页**（jr-blog / 长文） | `geo-landing-page` | **Bella** | JR 自家长文，Bella 接原创 + 视觉重写 |
| **第三方平台搬运** | `geo-csdn` / `geo-zhihu-column` / `geo-juejin` / `geo-auto-publish` (Medium/dev.to) / `geo-sohu-netease-baijia` / `geo-reddit-quora` / `geo-weixin-public` / `geo-csdn-rescue` / `geo-student-answer-coordination` | **Serena** | Serena 主管文字搬运到第三方 |
| **视觉/视频重写** | `geo-xiaohongshu` / `geo-weixin-video` / `geo-cross-platform-transfer` / `geo-canva-design` / `video-daily` / `video-live` | **Bella** | Bella 视觉/视频专项 |

### 2. 小红书账号日常 → 按账号 owner 派（不看 module）

| 账号 | 派给 | Email |
|---|---|---|
| 澳洲匠人学院 / Rain姐说求职 / 澳洲实习猿 / Kiki的分享日记 | Summer | `1134583264@qq.com` |
| Amelia在悉尼 / momo在澳洲 / JR匠人学院 | Lily | `2363843954@qq.com` |
| UQ课代表 / UNSW课代表 / 墨大课代表 / 素人号 | KIKI 成都 | `2838684082@qq.com` |

> module 是 `redbook-daily` / `redbook-hot-topic` / `redbook-account-maintenance`，账号信息看 .md 标题里的「【小红书 · XXX】」。

### 3. 线下活动 EVENT → 按城市派

| 城市 | 派给 | Email |
|---|---|---|
| Brisbane | KIKI Huang | `huangdg755@gmail.com` |
| Sydney / Melbourne | （**Seren 已被禁，待用户指派**）| — |
| Chengdu / online | KIKI 成都 | `2838684082@qq.com` |

> .md 没 `targetCity` 字段时，online/默认全归 KIKI 成都；Brisbane 主题（hackathon 在 Brisbane 举办等）归 KIKI Huang。

### 4. Partnership 商务谈判 → 全职新媒体运营三人轮

| 合作方类型 | 派谁 |
|---|---|
| 中文媒体（量子位 / 36氪 / 虎嗅）| KIKI 成都 |
| 澳洲教育机构（Microsoft AU / TAFE / 大学）| Lily（她管 momo在澳洲 / JR匠人学院 澳洲品牌账号）|
| 国际技术合作（LangChain / OpenAI / Anthropic）| Summer |

### 5. Webinar / Campaign 策划 → 按主题分

| 主题 | 派谁 |
|---|---|
| 技术深度（Agent Governance / DeepSeek / LangGraph）| **Bella**（写策划 + 视觉素材）|
| 模型对比 / 评测 | Summer |
| 求职 / 转型故事 | Lily |
| 大模型动手 / hackathon | KIKI 成都 |
| Brisbane 本地 webinar | KIKI Huang |

### 6. ad-hoc / evergreen 长文 → 派 Bella（视觉/视频重写）

> evergreen 是给 Bella 做"小红书图文 / 视频脚本 / 公众号长图"重写源材料用的。

---

## 实例：2026-05-04 ~ 2026-05-06 这批 34 张分配结果

| 派给 | 张 | 卡 |
|---|---:|---|
| **Bella** 实习 | 11 | b1-jr-blog / b1-master / q1 / q2 / q4 / q5 / q9 + evergreen-01/02/03 + webinar-01 |
| **Serena** 实习 | 6 | example / b1-csdn / b1-zhihu / b1-juejin / b1-devto-en / b1-medium-en |
| **Summer** | 5 | partnership-01-langchain / webinar-02 / xhs-rain-12month / xhs-aozhoujiangren / xhs-rain-5cuo |
| **KIKI 成都** | 5 | partnership-03-量子位 / event-03-yetan / webinar-04-deepseek / xhs-unsw / xhs-uq |
| **Lily** | 4 | partnership-02-microsoft-tafe / webinar-03-langgraph / xhs-amelia / xhs-jr-brand |
| **KIKI Huang** Brisbane 实习 | 3 | event-01-agent-gov / event-02-hackathon / webinar-05-tafe-after |
| 合计 | **34** | |

不接：Ada / Seren / Aurora / Yulia / Beta / Neomi / Melody / Amelia / Rain / Angela

---

## Workflow（routine 出新批 .md 时）

1. routine 生成 .md（assignee 字段是占位 `TBD-*` 或老规则的 email）
2. 按本文件【分配规则】把每张 .md 的 `assignee` 字段改对
3. SDM `/marketing-tasks` 页面 Push prod
4. admin Kanban (`/marketing-tasks`) 看到卡按人分组
5. 员工进 admin 改 status / 加 publication / 完成

---

## 修改本文件的触发条件

- 员工入职/离职/换 email → 先改 `staff-roster.md`，再改本文件
- 用户更正分配规则（"X 不接 marketing"/"Y 也接 GEO"）→ 立即更新本文件 + `routing-table.json`
- routine 加新 module → 在【分配规则】里加一行
