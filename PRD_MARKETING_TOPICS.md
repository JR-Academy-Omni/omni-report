# JR Academy 每周内容选题包 — PRD

## 1. 背景与目标

### 1.1 为什么要做

JR Academy 市场 + 教研 + 讲师团队每周一站会的核心痛点：**"这周该做什么内容/活动？"** 现状：

- 蹭热点靠运营个人感知，热点窗口期 1-2 天内不响应就过去了
- 线上讲座 / 线下 Meetup 选题靠拍脑袋，节奏散乱
- 联名机会靠偶遇，不主动找
- 竞品已经在做的事，我们 2 周后才意识到要跟

omni-report 已经有「竞品周报」（每周日 8pm Brisbane 跑）和「SEO healthcheck」（每日跑），缺的是 **把外部市场动态 → 我们具体可执行的内容/活动**。

### 1.2 目标

每周一早 8:00 Brisbane 自动产出一份选题包，作为：

- 市场团队周一站会的执行清单（"本周要拍这两条，办这一场"）
- 教研团队当周直播课/讲座选题依据
- BD/合作团队识别本周联名窗口

### 1.3 非目标

- ❌ 不替代竞品周报（竞品周报关心"竞品做了什么"，本周报关心"我们这周做什么蹭热点"）
- ❌ 不自动发文 / 自动报名活动 — 给清单，决策仍人做
- ❌ 不深度做单条内容（不写完整文案，只给 30 字简介 + 标题）

---

## 2. 输入数据源

| 来源 | 抓什么 | 备注 |
|---|---|---|
| **竞品周报（前一天产出）** | 直接读 `competitor-reports/` 最新一份的 TL;DR + §4 行业动态 | **关键复用**——周日 8pm 跑完，周一 8am 数据就 ready |
| 微博热搜 / 知乎热榜 | 当日 top 10 | web search 快照 |
| B 站热门 / 小红书热搜 | 当周 trending | web search |
| 抖音热点 / X trending | 当周 trending | web search |
| 节假日 / 行业纪念日 | 复用 `jr-wiki` 的 weekly-holidays routine 数据 | Asia/Oceania 5 国 |
| AI 行业大事 | 已被竞品周报覆盖 | 不重复搜 |

---

## 3. 输出规范

### 3.1 文件路径

```
marketing-topics/{YYYY-MM-DD}.md
```

文件名是周报生成的当天日期（周一）。

### 3.2 Markdown 结构

```markdown
# JR 本周内容选题包 YYYY-MM-DD

## 🔥 本周外部热点（5 条）
1. [热点名] — [热度 / 平台] — [一句话现状] — [来源链接]
...

## 🎤 推荐线上讲座（5 场）

| # | 标题 | 形式 | 嘉宾建议 | 30 字简介 | 紧迫度 |
|---|---|---|---|---|---|
| 1 | … | B 站直播 / Zoom Webinar / Bilibili 录播 | 内部 / 外部嘉宾建议 | … | 🔴 本周 / 🟡 2 周 / 🟢 月内 |

## 🤝 推荐线下活动（3 场）

| # | 标题 | 形式 | 城市 | 简介 | 备注（配合哪个线上讲座） |

## 💡 联名机会（2-3 条）
- [品牌/平台/KOL] — 触发原因 — 我们能给什么 — 怎么发起

## 🌱 长尾常青话题（2-3 条 — 不蹭热点的备选）
- 标题 — 适合形式 — 适合时机
```

### 3.3 反 AI 味格式（强制）

- 禁止 "在当今...""综合性""值得关注""把握机遇" 等空话
- 每个选题必须可执行（"邀请 3 位 builder 各 10 分钟 demo"），不是"举办一场分享会"
- 嘉宾建议要具体到角色或人（"JR 教研负责人" / "外部 AI builder Pieter Levels 风格"）
- 紧迫度必须标（决定运营优先级）

---

## 4. 技术方案

### 4.1 配置

| 项 | 值 |
|---|---|
| Routine name | `JR Marketing Topics Weekly` |
| Cron | `0 22 * * 0` UTC = **周一 8am Brisbane** |
| Repo | `https://github.com/JR-Academy-AI/omni-report` |
| Model | `claude-sonnet-4-6` |
| Tools | Bash / Read / Write / Edit / Glob / Grep / WebSearch |
| MCP | Notion（hub page TBD — 待用户提供） |

### 4.2 防 stream idle timeout 设计（沿用竞品周报教训）

每个 Phase 输出 ≤1k tokens，每个 tool call input/output ≤3k tokens。

**4 个 Phase**：

1. **Phase 0**：读 `competitor-reports/` 最新一份（拿 AI 行业动态）+ 读 `jr-wiki/.../weekly-holidays/latest.json`（拿节假日，如果可访问）
2. **Phase 1**：写骨架 `marketing-topics/$DATE.md` + commit
3. **Phase 2**：3 批 search + Edit + commit
   - Batch A：微博 / 知乎 / B 站 / 小红书当周热点 → Edit「§本周热点」
   - Batch B：基于热点 + 竞品数据生成 5 场线上讲座 + 3 场线下活动 → Edit
   - Batch C：联名机会 + 长尾话题 → Edit
4. **Phase 3**：Notion 极简摘要页（≤1k tokens，TL;DR + 5 个讲座 + 3 个活动 + GitHub 全文链接）

每 Phase 完成立即 commit + push。

---

## 5. 验收标准

第一份选题包必须满足：

- [ ] 文件路径正确：`marketing-topics/YYYY-MM-DD.md`
- [ ] 5 条外部热点（每条带平台 + 来源链接）
- [ ] 5 场线上讲座（标题 + 形式 + 嘉宾建议 + 紧迫度齐全）
- [ ] 3 场线下活动（含城市）
- [ ] 2-3 条联名机会
- [ ] 2-3 条长尾常青话题
- [ ] **零** AI 味开场
- [ ] 每个选题"30 字简介"必须具体可执行
- [ ] git push + Notion 摘要页双轨

---

## 6. Roadmap

| 版本 | 范围 | 时间 |
|---|---|---|
| v1 | 5 讲座 + 3 活动 + 联名 + 长尾，单纯 routine 跑 | 现在做 |
| v2 | 加链接到 jr-academy-admin 一个执行 dashboard，运营可标"已执行/已弃用"反馈 | 跑 4 周后 |
| v3 | 月度汇总：哪些选题真做了 / 哪些火了 / ROI 排行 | 2026-Q3 |

---

## 7. 与其他 routine 的关系

```
                       (周日 8pm Brisbane)
        竞品周报 ─────────────────────────┐
                                            │
                                            ↓
                                  (周一 8am Brisbane)
        weekly-holidays  ─────────→  Marketing 选题包  ─────→  市场/教研/讲师
                                            ↑
        web search 微博/B 站热点 ───────────┘
```

**核心复用**：周一选题包 Agent 第一件事就是读周日竞品周报，省一半 web search。

---

## 附录 A：相关文档

- `PRD_COMPETITOR_WEEKLY.md` — 竞品周报 PRD（数据上游）
- `CLAUDE.md` §"禁止生成模版化/AI 味内容" — 输出质量硬规则
- `https://claude.ai/code/routines` — Routine 管理控制台
