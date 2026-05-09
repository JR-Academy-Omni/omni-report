# PRD GEO Content Factory v2 — 数据驱动 + 多平台原创

> **状态**：拍板后 4 周交付（v1 dogfood 已暴露的 5 个错全在本 PRD 修正）
> **依赖上游**：`PRD_AI_VISIBILITY.md`（数据来源）/ `PRD_GEO_CONTENT_FACTORY.md`（v1 静态 74 话题表，本 PRD 替代）
> **依赖下游**：`marketing-tasks/README.md`（schema）/ jr-academy backend artifacts API
> **作者**：Lightman + Claude（dogfood 修正版）
> **日期**：2026-05-05

---

## 1. v1 翻车清单（这版要修的 5 件事）

dogfood 第一张 GEO 卡（B1 MCP）暴露的本质问题：

| # | v1 错 | 根因 | v2 修法 |
|---|---|---|---|
| 1 | Topic 来自 PRD §3 静态 74 话题表 | 跟 ai-visibility 数据脱节 | Topic **动态从 ai-visibility 周报抽** — 哪个 query 上周空白 → 选题 |
| 2 | Platforms 写死 3 个（jr-blog / medium / dev-to） | 没用 ai-visibility 报告里 AI 真实引用的平台 | Platforms 来自该 query 在报告里 **AI 真实引用的第三方网站** |
| 3 | 1 张卡塞 6 个平台 | 违反 Single Responsibility（1 skill = 1 article）| **Fan-out**：1 topic → 1 master 卡 + N variant 卡（每张 1 平台 = 1 article）|
| 4 | Draft 没差异化策略 | 同文章发多平台 = SEO 自杀 | 每个 variant ≥30% 改写：标题 / 开头 / 内链 / 长度 4 维度差异化 |
| 5 | 没回测闭环 | 发完没人看 LLM 提到我们没 | 7d / 30d 自动跑该 query 的 ai-visibility 子测，写回 master 卡 |

---

## 2. 6 层架构总览

```
L0 数据层      ai-visibility 周报（已有，每周三 9am AEST）
  ↓
L1 选题层      geo-topic-picker（建，cron 周一 10am AEST）
  ↓
L2 内容层      geo-draft-master → geo-draft-variant（建）
  ↓
L3 质量层      geo-originality + geo-review + geo-score（建）
  ↓
L4 派单层      geo-fanout（master 写完 → fan-out N variant 卡）
  ↓
L5 发布层      自动 API（jr-blog / Medium / dev.to / Hashnode）/ 半自动 Playwright（CSDN / 掘金）/ 派人（知乎 / 小红书 / 公众号 / LinkedIn）
  ↓
L6 验证层      7d / 30d ai-visibility 回测 → 该 query 现在 LLM 提到 JR 没？
```

---

## 3. 卡片 schema（master + variant）

### 3.1 master 卡（topic 总览，不直接发布）

```yaml
id: <epoch-ms>
title: "B1 MCP 完整入门：从协议到实战 5 个 Server"
category: geo-content
module: geo-landing-page    # master 用 geo-landing-page（聚合不发布）
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/B1-mcp/master.md
  reportSection: ai-visibility 2026-05-04 §JR 完全空白 Q12
  reportItemHash: geo-master-b1-mcp
  topicId: B1
  aiVisibilityQuery: Q12
  aiVisibilityReport: ai-visibility/2026-05-04.md
  aiCitedPlatforms: ["Google Cloud", "知乎", "IBM", "CSDN", "博客园"]
  variantsCount: 6           # 等 fan-out 后填
  variantsCardIds: []        # fan-out 后填 N 个 variant 卡 _id
status: draft
priority: p0
platforms: []                # master 不发布；空数组
tags: [geo-content-factory, topic-B1, query-Q12, master, tech-deep]
```

`## 描述`：查询意图 + AI 引用现状 + JR 角度差异化
`## Checklist`：master 完整 + 4 维度变体策略想清楚 + originality 阈值
`## 草稿`：master 完整版 4000 字（员工/AI 写）
`## 变体清单`：等 fan-out 后填 6 个 children 卡 link

### 3.2 variant 卡（每个 1 平台 = 1 article）

```yaml
id: <epoch-ms>
title: "B1-jr-blog: MCP 完整入门 4000 字（澳洲求职版）"
category: geo-content
module: <按平台>             # 见下表
source: prd-geo-content-factory
sourceMeta:
  reportPath: geo-content-factory/drafts/B1-mcp/variants/jr-blog.md
  topicId: B1
  masterCardId: <master 卡 _id>
  platformSlug: jr-blog
  variantStrategy:           # 4 维度差异化
    titleHook: "5 分钟读懂 + 50 行代码"
    openingFirst50: "scenario-driven (5 分钟读懂 / 50 行代码 / Claude Desktop 接通)"
    internalLinkAnchor: "AI Engineer Bootcamp Phase 2 MCP 章节"
    targetWordCount: 4000
status: draft
priority: p1                 # variant 优先级 = master priority - 1
platforms: [jiangren-blog]   # variant 各发自己平台
assignee: <按 module routing-table>
tags: [geo-variant, topic-B1, platform-jr-blog]
```

### 3.3 module 映射表（platform → TaskModule 枚举）

| 平台 | module | assignee | 自动化 |
|---|---|---|---|
| jiangren.com.au/blog | `geo-landing-page` | hello@ | ✅ git push |
| Medium @jr-academy | `geo-auto-publish` | hello@ | ✅ Medium API |
| dev.to @jr-academy | `geo-auto-publish` | hello@ | ✅ dev.to API |
| Hashnode | `geo-auto-publish` | hello@ | ✅ Hashnode GraphQL |
| GitHub repo（code-heavy）| `geo-github-repo` | hello@ | ✅ gh CLI |
| 掘金 | `geo-juejin` | serena@ | ⚠️ Playwright |
| CSDN | `geo-csdn` | serena@ | ⚠️ Playwright（风控严，建议人工）|
| 知乎专栏 | `geo-zhihu-column` | serena@ | 🚫 必人工 |
| 搜狐号 / 网易号 / 百家号 | `geo-sohu-netease-baijia` | serena@ | ⚠️ Playwright |
| 微信公众号 | `geo-weixin-public` | serena@ | 🚫 排版人工 |
| 小红书（GEO 用，非纯 xhs）| `geo-xiaohongshu` | bella@ | 🚫 必人工 |
| LinkedIn 创始人 IP | `geo-founder-ip` | lightman@ | 🚫 本人发 |
| Reddit / Quora | （新建枚举 `geo-reddit-quora`）| serena@ | 🚫 账号培养 |

⚠️ 缺枚举：Hashnode / dev.to / Medium 复用 `geo-auto-publish`；Reddit/Quora/Twitter API 需新建枚举值（后端 schema 改 + push）。本 PRD 阶段先不动 schema，复用现有枚举。

---

## 4. Skills 单一职责清单

每个 skill **只对 1 篇文章 / 1 张卡**做事（除 originality 是 pair）。

| Skill | 输入 | 输出 | 一次跑 |
|---|---|---|---|
| `geo-topic-picker` | ai-visibility 最新 + published 历史 + topic-platform-matrix | `geo-content-factory/{date}.md` 周计划 5 topic | weekly |
| `geo-card-master-create` | 1 topic（来自周计划）| 1 master.md 占位 + master 卡 | per topic |
| `geo-draft-master` | 1 master 卡 | 1 master.md 4000-5000 字完整版 | per master |
| `geo-fanout` | 1 写完的 master 卡 | N variant 卡 + N variant.md 占位 | per master（**master 写完后**）|
| `geo-draft-variant` | master.md + 1 variant 卡 spec（含 variantStrategy 4 维度）| 1 variant.md（≥30% 改写）| **per variant**（每张 variant 卡 1 次）|
| `geo-originality-check` | 2 个 variant.md | 相似度 < 70% pass / ≥ 70% fail（+ 提示哪段太相似）| pair（实际 N×(N-1)/2 次）|
| `geo-review` | 1 variant.md + platform spec | review 报告（违禁词 + 平台规则）| per variant |
| `geo-score` | 1 variant.md | 7 维度评分（标题钩子 / 信息密度 / 代码可运行 / 内链合理 / 平台适配 / 原创度 / SEO 关键词）| per variant |
| `geo-publish` | 1 variant 卡 + 平台 token | 发布 URL + 写回 ## 发布记录 | per variant（自动 / 半自动 / 派人 fork）|
| `geo-7d-llm-recheck` | 1 master 卡 + 该 query | 跑该 query 的 LLM 自答 → 看 JR 出现没 → 写 ## 验证记录 | per master，发布 +7 天触发 |

每个 skill 输入 / 输出契约严格 → **可单独 invoke** 也 **可链式 orchestration**。

---

## 5. 时序 + Fan-out 时机（选项 B：master-first）

```
周三 09:00 AEST  →  ai-visibility 跑（已有）
                      产 ai-visibility/{date}.md

周一 10:00 AEST  →  geo-topic-picker（建）
                      读最新 ai-visibility + 历史 published
                      产 geo-content-factory/{date}.md（5 topic）
                      逐个调 geo-card-master-create
                      → 5 张 master 卡进 marketing-tasks/active/

周一-周三  →  AI / 员工写 master draft
              （4000-5000 字，引用真实 API、实测数据）
              填完后 status: draft → ready
              触发 geo-fanout

geo-fanout 触发 →  根据 master 的 aiCitedPlatforms 字段
                    fan-out N 张 variant 卡 + variant.md 占位
                    每张 variant 卡 status: draft，独立派 assignee

周四-周日  →  AI 跑 geo-draft-variant 给每张 variant 卡
              员工 Review → originality check pair-wise
              ≥ 70% 相似 → 拒收 → AI 重新跑 variant
              全 pass 后 → review → score → publish

发布 +7 天  →  geo-7d-llm-recheck 自动跑
              该 query 的 LLM 自答 → 提到 JR 没？
              写回 master 卡 ## 验证记录

发布 +30 天 →  ai-visibility 周报正常跑（独立闭环）
              该 query 的 SERP 排名 + LLM 提及变化 → §6.5 升级实现
```

---

## 6. 4 维度差异化策略（每 variant ≥30% 改写）

| 维度 | 自有 blog（jr-blog）| 知乎 | CSDN/掘金 | Medium 英文 |
|---|---|---|---|---|
| **标题钩子** | "完整 X 入门" | "我用 X 踩了 5 个坑" | "X 协议三层 + 50 行代码" | "X for AU AI Engineers" |
| **开头 50 字** | 5 分钟读懂 + 写啥学到啥 | 第一人称故事，"上周我..."| 直接放代码 + "运行结果" | Global trend → AU detour |
| **内链 anchor** | AI Engineer Bootcamp + 求职服务 | 创始人/学员故事 + 课程入口 | GitHub repo + 课程 | 同上英文版 + LinkedIn |
| **长度** | 4000 字完整 | 2500 字精简（含图）| 3000 字代码密 | 4000 字翻译 + 加 AU 章节 |
| **配图** | 中文截图 | 中文截图 + 朋友圈风格 | 终端截图 + 代码截图 | 英文 mock-up |
| **结尾 CTA** | 看 Bootcamp Phase 2 | 留言点赞 + 关注作者 | star GitHub + 关注作者 | claps + follow |

**originality check** 强制 ≥ 70% 字符级 + 段落级 不同（用 simhash 64-bit + LLM judge 复检）。

---

## 7. 4 周交付路径

| 周 | 交付物 | 验收 |
|---|---|---|
| **W1** | L1 + L2.master 跑通 — geo-topic-picker / geo-card-master-create / geo-draft-master 三个 skill；1 张 dogfood master 卡（B1 MCP 重做）| admin UI 看到 1 张 master 卡，draft 完整 4000 字，sourceMeta 含 aiCitedPlatforms |
| **W2** | L2.variant + L3.originality — geo-fanout / geo-draft-variant / geo-originality-check；B1 master 自动 fan-out 6 variant 卡 + 每个 variant 跑 originality 通过 | admin UI 看到 1 master + 6 variants（topic 视图聚合），任两 variant 相似度 < 70% |
| **W3** | L3.review + L3.score + L4.派单 routing — geo-review / geo-score；admin UI 加 topic 视图（master + N children 树状）+ routing-table 按 module 派对人 | 7 张卡每张有独立 review / score；CSDN variant 派给 serena，jr-blog 派给 hello@ |
| **W4** | L5.发布自动化 + L6.验证闭环 — geo-publish（jr-blog / Medium / dev.to API）+ geo-7d-llm-recheck routine | B1 全 6 平台一键发；7 天后该 master 卡的 ## 验证记录 自动写「Q12 LLM 现在提 JR 否」 |

---

## 8. KPI（4 周后看）

| 指标 | 基线（2026-05-04）| 4 周目标 | 12 周目标 |
|---|---|---|---|
| LLM 自答提 JR 次数 | 1/20（仅 Q6）| 5/20 | 8-10/20 |
| Web Search 出现 query 数 | 1/20 | 4/20 | 7/20 |
| Q6 排名 | #5（下降中）| 维持 #5 | 回升至 #3 |
| Expected Source 命中（专属落地页未索引）| 0/1（Q19）| 1/1（Q19 修复）| 3/3（含未来上线的）|
| 月新增第三方榜单 | 0 | 4-6 | 8-12 |
| 已发布 GEO 内容数（含 variant）| 0 | 30（5 topic × 6 平台）| 90（每周 5+1）|

---

## 9. 角色分工

| 角色 | 主要职责 |
|---|---|
| Claude（AI）| 起草 master + variants（90% 字数）、跑 originality / review / score、自动发可 API 平台、生成 7d LLM 回测报告 |
| Lightman（创始人）| LinkedIn 个人 IP variant 必本人发；master draft review 把关行业细节；4 周后看 KPI |
| Serena（内容运营）| 半自动平台手发（CSDN / 掘金 / 搜狐号）+ 知乎账号培养 + 微信公众号排版 |
| Hello@（服务账号）| Medium / dev.to / Hashnode API token 持有 + 自动发触发 |
| Bella（设计）| 配图（每 variant 1-2 张）+ 海外平台英文 mock-up |

---

## 10. 风险 + 已知限制

| 风险 | 影响 | 缓解 |
|---|---|---|
| AI 写不出真正 ≥30% 差异化（同 prompt 高度同质）| originality 频繁 fail，循环重写 | LLM judge + 人工抽查 + 5 个 variant 强制不同结构（故事/代码/对比/列表/教程）|
| Medium / dev.to API rate limit（5/天）| 大批发会被限流 | 错峰发，每天 ≤3 篇 + 每个账号轮换 |
| CSDN 风控 / 知乎反作弊 | 账号封禁 | 必人工、低频（≤1/周）、积累账号信誉 |
| ai-visibility 报告精度有限（20 query 抽样）| 选题可能漏掉重要 query | 每月扩 query 池（→ 30-50 query）+ 加 GSC 真实搜索数据 |
| 写完发完 LLM 仍不提（30% 不命中率）| KPI 不达标 | 7d 回测如不命中 → 检查内链 / 标题 / 平台权重，30 天还不行就重写或换平台 |

---

## 11. 已弃 / 不做

- ❌ **不在 v2 做** PRD §3 那 74 静态话题表自动转任务 — 那是 long-term 候选池，不是 weekly 选题源
- ❌ **不在 v2 做** Twitter API / Substack newsletter 集成 — 这两渠道流量小不优先
- ❌ **不在 v2 做** Reddit / Quora 自动化 — 必人工，账号培养超长期
- ❌ **不在 v2 做** 视频内容（B 站 / 抖音 / YouTube）— 跨媒体 v3 再做

---

## 12. 立刻开干 W1 的 3 件事

按本 PRD 拍板后，W1 第一周做：

1. **删掉 v1 dogfood 错卡**（B1 单卡塞 6 平台）
2. **建 W1 三个 skill** + 1 个 routine：
   - `geo-topic-picker`：读 ai-visibility 抽 5 topic（routine 周一）
   - `geo-card-master-create`：1 topic → 1 master.md 占位 + master 卡
   - `geo-draft-master`：1 master 卡 → 4000 字完整版
3. **dogfood 1 张正确 B1 master 卡**：
   - sourceMeta 含 `aiVisibilityQuery: Q12 + aiCitedPlatforms: [...]`
   - draft master.md 完整 4000 字（不是占位）
   - admin UI 右栏 preview 看到完整 markdown
   - W2 启动前 master 已 ready 状态

---

## 附录 A：相关文档

- `omni-report/PRD_AI_VISIBILITY.md` — L0 数据层（已有）
- `omni-report/PRD_GEO_CONTENT_FACTORY.md` — v1 静态 74 话题 PRD（保留作长尾候选池，不再驱动 routine）
- `omni-report/marketing-tasks/README.md` — schema 字段枚举权威源
- `omni-report/xhs-content-factory/README.md` — pipeline 模式参考（GEO 复用 5 件套思路）
- `jr-academy/src/models/marketingTask.schema.ts` — TaskModule / TaskCategory / TaskSource 枚举源码

## 附录 B：术语

- **master 卡**：1 topic 的总览卡（聚合 N variant），不直接发布
- **variant 卡**：1 platform 的发布卡，1 卡 = 1 article
- **fan-out**：master 写完 → 自动建 N variant 卡
- **originality check**：variant pair-wise 相似度 ≥ 70% 拒收
- **回测**：发布 +7 天 / +30 天 自动跑 ai-visibility 子测，验证 LLM 是否引用 JR
