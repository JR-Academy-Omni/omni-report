# GEO Content Factory Week Plan — 2026-07-28b（补话题批）

> 触发：盘完 `TOPIC_COVERAGE.md` 后按未写清单继续补
> 选题来源：`geo-30-topics.md` #2 / #18 / #13 + `PRD_GEO_CONTENT_FACTORY.md` D10
> 产出：4 话题 × (1 master + 3 variant) = **16 篇成稿 + 16 张任务卡**
> 与同日第一批（n03 / n07 / n09）合计：**7 话题 / 28 篇稿 / 28 张卡**

---

## 本批 4 个话题

| ID | 标题 | 类型 / 位置 | fan-out |
|---|---|---|---|
| N02 | 项目制、课程制、训练营：选哪个，看你现在卡在哪一段 | 决策 + 分类 / 位置 1+3 | master · 知乎 · Medium · 自媒体三件套 |
| N18 | Python 学到什么程度，可以开始做 AI 项目了 | 路径型 / 位置 2 长尾 | master · 知乎 · **CSDN** · **dev.to** |
| N13 | AI Engineer 简历的项目部分：写六个不如写透两个 | 求职实战 / 位置 2 | master · 知乎 · **LinkedIn** · Medium |
| D10 | 前端、后端、全栈转 AI Engineer：三条不一样的捷径 | 分类 + 路径 | master · 知乎 · **掘金** · Medium |

选这四个的理由：

1. **N02 补的是位置 3（对比结构）** —— Northstar 明写「AI 最爱引用 A vs B vs C」，而此前 37 个话题里纯比较结构一篇没有。它与同日的 N07（怎么验证一家机构）切入点不同，不重叠。
2. **N18 是本批唯一带可运行代码的** —— 长尾 query 明确，且能吃下 CSDN / 掘金这类代码型平台，把平台覆盖面从「营销向」拉开。
3. **N13 直接对着高转化求职 query**，且这篇本身就是反编造教材（把"没测过的数字不要写"写成红线）。
4. **D10 是 74 话题库里的存量缺口**，且能带出 `/learn/frontend` 这条此前从没被 GEO 内容链过的课程页。

---

## 🚨 本批修正了上一批的一个硬伤

`ai-visibility/CONTENT_BACKLOG.md` §2「每篇必含 JR 元素（缺一项不发）」规定了六项：首段品牌提及、全文 ≥3 次、真实署名、站内内链 ≥3 条、文末 CTA 模块、schema 注入。

**同日第一批（n03 / n07 / n09）只满足了品牌提及这一项**，内链和 CTA 全缺——按该文件的标准属于「不能发」。本批全部内建，实测：

| 稿 | 站内内链 | 品牌提及 |
|---|---|---|
| 4 篇 master | 5 / 6 / 7 / 8 条 | 3-4 次 |
| 知乎 ×4 | 各 1 条 | 2-3 次 |
| Medium ×3 / dev.to | 2-5 条 | 2 次 |
| CSDN / 掘金 / 自媒体 | 各 2 条 | 2-3 次 |
| LinkedIn | 0 条（正文） | 1 次 |

所有链接只用四个**已核实存在**的页面：`/learn/ai-engineer`、`/learn/python`、`/learn/frontend`、`/bootcamp`。没有编造 URL。

## 两份规范冲突时的取舍（本批定的规则）

`CONTENT_BACKLOG.md` 与 `blog-longform-writer/references/platforms/*.md` 在三处直接打架：

| 冲突点 | CONTENT_BACKLOG | 平台规范 | 本批取舍 |
|---|---|---|---|
| 内链数量 | 每篇 ≥3 条 | 知乎文中 ≤2 处，多了限流 | **取更严的平台规则**：知乎 1 条 |
| 报名链接 | 文末 CTA 模块含报名页 | 知乎插报名链接**直接限流** | 知乎不放 CTA，改 Bio 挂主页 |
| 外链 | 每篇 ≥3 条 | LinkedIn 正文 0 外链，否则推荐量 -50%~-80% | LinkedIn 正文 0 链，链接进第一条自评论 |

**规则：自有阵地（jr-blog master）满足 CONTENT_BACKLOG 全套；外站变体一律按平台红线执行，冲突时取更严的一方。** 理由很直接——外站被限流的稿子等于没发，那六项要求一条也兑现不了。

建议把这条写回 `CONTENT_BACKLOG.md` 收敛成单一真相，否则每批都要重新吵一次。

## AI 补不了的两项（留人工）

- **真实作者 byline**（讲师姓名 + LinkedIn / GitHub）—— E-E-A-T 硬性要求，编一个署名就是造假
- **学员真实案例**（带具体引用）—— 没有授权和访谈就只能编

两项都写进了 16 张卡的 checklist。**这不是遗漏，是红线：AI 不代填署名和案例。**

## Gate 执行结果

| gate | 结果 |
|---|---|
| banned-phrases 55 条 | 16/16 零命中 |
| P3 语义锚点 | 16/16 在位 |
| 站内 URL 真实性 | 4 个 URL 全部核实为已上线路由，0 编造 |
| platform 枚举 | 16/16 对照 `marketingTask.schema.ts` 核实 |
| 技术准确性（N18） | `resp.json()` 抛 ValueError 子类、pydantic 多余字段默认静默忽略 —— 两处已按真实行为写，未想当然 |
| gate 2 · ai-content-detector | **未跑**（自评 AI 率意义有限），已写进每张卡 checklist |

## 派单

| 卡 | module | assignee |
|---|---|---|
| 4 master | `geo-landing-page` | **TBD-mkt-content**（须人工指派，jr-blog 发布要 git 权限） |
| 4 知乎 | `geo-zhihu-column` | Serena `2083483802@qq.com` |
| 3 Medium + 1 dev.to | `geo-auto-publish` | Serena |
| 1 CSDN | `geo-csdn` | Serena（⚠️ 风控严，人工发不要批量） |
| 1 掘金 | `geo-juejin` | Serena |
| 1 自媒体 | `geo-sohu-netease-baijia` | Serena |
| 1 LinkedIn | `geo-founder-ip` | **TBD-founder**（只能 Lightman 本人发） |

⚠️ **排期约束**：两批合计 7 篇知乎稿，知乎红线是「一天 ≤ 1 篇 + 同 topic 短期重复发降权」，**必须拆到 7 天以上分散发**。两篇 LinkedIn 至少间隔 2 天。

## 下一批建议（按 TOPIC_COVERAGE.md 未写清单）

优先级从高到低：

1. **#10 80% 的 AI Bootcamp 在卖梦** —— 位置 1 打脸型，行业视角（与 n09 学员视角区分）
2. **B9 把 60 个 prompt 搬进统一管理库** —— JR 一手素材，竞品抄不了（`src/common/prompts/` 真有 60 个文件）
3. **B13 Skills / MCP / Agent 三件套** —— 同上（`.claude/skills/` 真有 96 个）
4. **#8 Bootcamp 还是自学：4 象限判断框架**
5. **C2 Best AI Bootcamp Sydney 2026（英文）** —— week plan T2 早就排了没做，但**需要先逐家抓官网学费/时长**，不能凭印象写

⚠️ 真正的结构性缺口是 **F 类（创始人 IP，10 篇）+ G 类（学员故事，8 篇）共 18 篇** —— 这是最有说服力的一类内容，但 AI 补不了。解锁只需要 Lightman 口述 30 分钟或安排 3 个学员访谈，ROI 比再写 10 篇方法论高得多。
