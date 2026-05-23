# Marketing Tasks Capacity Audit — 2026-05-23

> **Owner**: lightman
> **作者**: Claude（2026-05-23 dogfood `comment-outreach-picker` 时连带做的产能审计）
> **背景**: 跟进 Bella 5-22 离职 cleanup 时发现 active/ 已积压 190 张，引发更深产线诊断

---

## 1. 关键数据（不需要解读的事实）

| 指标 | 值 | 说明 |
|---|---|---|
| active/ 总卡数 | **190** | 全 omni-report routine 累积 |
| status: draft | **189** (99.5%) | 几乎全是初始状态 |
| status: ready / review / in_progress | 1 / 0 / 0 | 实际推进的卡基本为 0 |
| status: done（全仓） | **0** | 任何子目录（active + archive + _archive）合计 0 |
| `publications[0].url` 非空（全仓） | **0** | 没有任何卡留下"已发布到外部平台的 URL"痕迹 |
| `survivedAt: true` | **0** | 没有任何卡做过 24h 存活检查 |
| 今天 5-23 新增（Serena） | 48 张 | 源头 `source: prd-geo-content-factory` `createdBy: claude-code-manual`（人手动调 Claude 产） |
| daily-writer cron 状态 | 每天 22:00 UTC active | 产 GEO master/variant draft 到 `geo-content-factory/drafts/` |
| geo-content-factory/drafts/ slug 数 | 27 | **写作环节有产出** |
| weekly-health 5-17 警告 | "上周改动 0 / 归档 0 / 建议暂停 routine 1 周" | **没被采纳，1 周后 active 从 113 涨到 190** |

---

## 2. 我先入为主的错误诊断（先记下来避免重复犯）

跑 audit 时第一反应是：**"产卡 cron 空转，没人执行"**。推荐"立即暂停 daily-writer cron"。

**这个诊断错了一半**：
- ✅ 对：**回填字段闭环没建立** — `status: done` / `publications[].url` 字段全仓 0，说明执行后没有人/工具把发布痕迹写回 `.md`
- ❌ 错：**写作环节没空转** — `geo-content-factory/drafts/` 27 个 slug 是真实产出，过去 14 天 git log 大量 `feat(geo): X variant draft` commit 证明有人在产稿

**真实区分**：
| 流水线环节 | 现状 |
|---|---|
| 1. routine 产 task card | ✅ 正常（48 张/天 当人手动调时；schedule cron 没跑因为 5-09 全部 disabled） |
| 2. daily-writer 把 card 变 draft 文章 | ✅ 正常（27 个 drafts/） |
| 3. 实习生发布到外部平台（CSDN/Medium/HN/Reddit 等） | ❓ **黑盒** — 可能发了没回填，也可能没发 |
| 4. 回填 publications + status: done | ❌ **0 痕迹** — 闭环完全没建立 |

---

## 3. 真问题（按修复优先级排序）

### 3.1 P0 — 发布回填闭环未建立（数据真相黑盒）

不知道实习生是真在发还是没发。两种可能性后果完全不同：

| 假设 | 后果 | 修复方向 |
|---|---|---|
| (a) 实习生在发，没回填 `.md` | 数据失真，weekly-health 误报"全 stuck"，错误暂停 routine | 改 admin Kanban / .md 双向 sync，让实习生在 Kanban 拨 done 自动写回 `.md` |
| (b) 实习生没在发 | 整条流水线纯产稿不发声，0 LLM 训练语料效果 | 招接 Bella 班的人 + 给 Serena 减压（她现在 100 张待发） |

**第一步**：直接问 Serena 「你过去 4 周实际发到 CSDN/掘金/Medium 的 URL 列表」就能区分 (a)(b)。不需要工具改造。

### 3.2 P1 — Bella 9 module 真无人接（routing 已修但人没招）

cleanup 已完成（today），但 `TBD-visual-intern` / `TBD-video-intern` / `TBD-comment-intern` 后面是真空。视频号 + 视觉重写 6 module 站会决定（TEAM.md 已标）；comment 3 module 也得决策。

### 3.3 P2 — daily-writer 缺反馈信号

cron 每天 22:00 UTC 跑挑下一张 draft 卡写文章，但**不知道前一张文章实际有没有被发**。如果回填闭环不建，dailywriter 可能产 27 篇都没发的稿子。

### 3.4 P3 — weekly-health 报告价值未利用

5-08 / 5-10 / 5-17 三份报告都在喊"stuck / 暂停"但都没被采纳。报告本身是好的，问题是**报告没人 owner 看 + 没和决策挂钩**。

---

## 4. 推荐动作（按可逆性 + 价值排序）

### 4.1 这周（lightman 直接做，不涉及组织）

1. **直接问 Serena 真实数据**：「过去 4 周你实际发布到 CSDN / 知乎专栏 / 掘金 / Medium / dev.to 的链接，给我一份列表」—— 这一步决定 §3.1 走 (a) 还是 (b)
2. **3 张 comment dogfood 测试卡审一审**（`active/comment-2026-05-23-*.md`）— 看质量能否实际发；OK 就你自己手动发 1 张试存活率
3. **本报告 commit 入仓 + push** — 让 audit 数据可追溯

### 4.2 这月（决策 + 落地）

4. **决定 Bella 9 module 接管**：站会拍板（TBD-visual / TBD-video / TBD-comment 三组）
5. **建发布回填闭环**：admin Kanban 拨 status=done 时强制要求填 `publications[0].url`；或者写个 webhook 让 GitHub/CSDN 发布自动回填

### 4.3 不动的事（已经在合理状态）

- **daily-writer cron 保留**（写稿是真在产，不要切）
- **routine-to-tasks cron 保持 disabled**（你 5-09 拍板 + 现在数据支持继续 disable）
- **189 张 active draft 不动**（搞清 §3.1 真相再决定 archive 还是 audit）

---

## 5. memory / 后续追溯

- `[[project-bella-offboarded]]` — Bella 离职 + routing-table stale 教训
- `[[feedback-autonomous-fetch]]` — routine 跑起来自主 fetch 不再问
- 本报告路径：`omni-report/marketing-tasks/_health/2026-05-23-capacity-audit.md`

下一份 weekly-health 5-24（周一）会自动跑，对比 active 数量变化看本周做了什么。

---

## 附录 A — comment-outreach skill 结构性缺陷（2026-05-23 dogfood 发现）

跑 3 张 dogfood 卡审完后发现**整条 skill 的"第一人称硬东西"设计违反 CLAUDE.md 反幻觉铁律**。

### 数据点

| 卡 | 编造内容举例 |
|---|---|
| HN | "40k-LOC NestJS service" / "Last week deleted `@SkipThrottle()` decorator" |
| dev.to | "dropped LangChain in Q1 2026 ... 70% anxiety reduction in 3 months / went through AI Engineer track at JR Academy last year" |
| V2EX | "50k 行 NestJS / 200k → 130k token / 35% 节省 / 烧 20 万 token" |

**3/3 卡所有硬东西全部编造**——量表 62-63/64 通过的"权威感"维度，全部是编出来的"权威"。

### 根因

SKILL.md 第 100 行允许「第一人称（我 / I）+ 硬东西」+ 第 30 行禁止"编造他人数据"——但**未禁止 Claude 编造"自己"作为虚构 persona 的数据**。Claude 作为 ghostwriter 写实习生草稿时，第一人称是虚构身份，"自己的数据"也是编出来的。

CLAUDE.md 第一条铁律覆盖 skill 设计，胜出。

### 修复方向

| 方案 | 可行性 |
|---|---|
| (a) SKILL.md 加规则"第一人称硬东西必须来自团队真实案例池 references/real-cases.md" + 实习生预先提供原料 | 工程量小，但要每周维护案例池 |
| (b) 改 skill 改成"假设语气 / 公共事实"（"Teams typically..." 而非"I"），不再用 ghostwriter persona | 硬东西密度打 4 分以下，过不了自检——可能整个 comment-outreach v1 设计就不成立 |
| (c) 暂停 comment-outreach skill 整条产线，等案例池就绪再启 | 最稳，配合 Bella 离职 + Serena 满载情境逻辑一致 |

### 当前 3 张测试卡处理

**不要发**。3 张保留在 `active/` `status: draft` `assignee: TBD-comment-intern` 作为 dogfood 反例样本（未来 skill 重启时这 3 张是修复成功的对照）。**绝不能拨 ready 发出**。

