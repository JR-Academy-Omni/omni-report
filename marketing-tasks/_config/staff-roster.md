# JR Academy 员工 Roster（Marketing/Sales/Product 派单 ground truth）

> **来源**：用户 2026-05-06 直接提供（含 Serena + KIKI Huang，16 人完整版）
> **用途**：`routing-table.json` 编辑 + 后续派单核对
> **维护**：员工入职/离职/换 email 时**先改这里**，再改 routing-table.json
> **绝对红线**：用户提供的 email 就是 prod User 表登录 email，**不要加 `@jiangren.com.au` 域名前缀编造**

---

## 赋能中心（Enablement）

| 中文名 | Role | 联络 email | 派单备注 |
|---|---|---|---|
| Melody | HRM | career@jiangren.com.au | HR only，不接 marketing 派单（blockedAssignees）|

## 产品中心（Product）

| 中文名 | Role | 联络 email | 派单备注 |
|---|---|---|---|
| Ada | 产品运营 | 1982723658@qq.com | campaign / partnership / kol / growth-hack 默认 |
| Beta | 教务管理 | 2840238410@qq.com | — |
| Yulia | 产品实习生 | yuyi2003yu@163.com | 实习节奏减半 |

## 市场中心（Marketing）

| 中文名 | Role | 联络 email | 派单备注 |
|---|---|---|---|
| Aurora | MKT | aurora.gg.zhou@gmail.com | **暂停 routine 派活**（blockedAssignees）|
| Seren | MKT | jiahewan362@gmail.com | casual（仅周四+周五），eventCityRouting Sydney/Melbourne 默认 |
| Summer | 新媒体运营 | 1134583264@qq.com | 小红书账号矩阵（澳洲匠人学院 / Rain姐说求职 / 澳洲实习猿 / Kiki的分享日记） |
| KIKI（成都） | 新媒体运营 | 2838684082@qq.com | 小红书账号矩阵：UQ课代表 / UNSW课代表 / 墨大课代表 / 素人号（**课代表 4 账号全归成都团队，与 UQ/UNSW/墨大物理位置无关**） |
| Lily | 新媒体运营 | 2363843954@qq.com | 小红书账号矩阵（Amelia在悉尼 / momo在澳洲 / JR匠人学院） |
| Bella | 新媒体运营实习生 | 18634772744@163.com | **视觉/视频 6 module**：geo-xiaohongshu / geo-weixin-video / geo-cross-platform-transfer / geo-canva-design / video-daily / video-live |
| Serena | 新媒体运营实习生 | 2083483802@qq.com | **GEO 文字搬运 11 module**：geo-csdn / geo-zhihu-column / geo-juejin / geo-sohu-netease-baijia / geo-csdn-rescue / geo-reddit-quora / geo-auto-publish (Medium/dev.to) / geo-weixin-public / weixin-daily / weixin-longform / geo-student-answer-coordination |
| KIKI Huang | Brisbane MKT Intern | huangdg755@gmail.com | eventCityRouting Brisbane 默认（**不接小红书课代表账号**——课代表归成都团队） |

## 销售中心（Sales）

| 中文名 | Role | 联络 email | 派单备注 |
|---|---|---|---|
| Neomi | 销售助理 | 261073251@qq.com | taobao-* 全部 |
| Amelia | 课程顾问 | 414452979@qq.com | 不接 marketing routine 派单（前线销售）|
| Angela | 课程顾问 | angela727hl@gmail.com | 不接 marketing routine 派单 |
| Rain | 课程顾问 | qy1219@hotmail.com | 不接 marketing routine 派单 |

---

## 派单分工原则（用户 2026-05-06 明确）

1. **原创内容**（master draft / 落地页 / GitHub repo / 学员故事 / 时事新闻 / 创始人 IP）→ MKT 全职（Aurora 暂停 / Seren casual / Summer / KIKI / Lily）—— 当前 routing-table 用 `TBD-mkt-content` 占位等 admin 显式指派
2. **copy 改写发布到第三方平台的搬运行为** → **2 位实习生分工**：
   - **Serena**（2083483802@qq.com）→ 文字搬运 11 module（CSDN / 知乎 / 掘金 / 搜狐网易百家 / Medium-devto / Reddit-Quora / 公众号 / 公众号日常 / 公众号长文 / CSDN 账号修复 / 学员答主协调）
   - **Bella**（18634772744@163.com）→ 视觉/视频 6 module（小红书 / 视频号 / 跨平台搬运 / Canva 设计 / video-daily / video-live）
3. **线下活动**按 city 路由：Sydney/Melbourne → Seren，Brisbane → KIKI Huang，Chengdu/online → Ada
4. **Sales / 课程顾问**不接 marketing routine 派单（5 人在 blockedAssignees）

---

## 不接派单的 5 人（fallbackRules.blockedAssignees）

| Email | 原因 |
|---|---|
| `career@jiangren.com.au` | Melody, HR only |
| `aurora.gg.zhou@gmail.com` | Aurora, 已暂停 |
| `414452979@qq.com` | Amelia, 前线销售 |
| `angela727hl@gmail.com` | Angela, 前线销售 |
| `qy1219@hotmail.com` | Rain, 前线销售 |
