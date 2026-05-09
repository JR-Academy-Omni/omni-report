# 2026-05-09 — 非 GEO / 非小红书 任务批量 dropped

**当前阶段战略聚焦**：把 GEO 内容生产和 小红书内容生产 **两条流水线**先跑起来，其他渠道一律不做。

51 张卡 dropped：
- 32 × `comment-*` — 海外平台评论外联（Reddit / HN / dev.to / Hashnode / GitHub / Zhihu / V2EX）
- 11 × `topic-*` — 5 webinar + 3 evergreen + 3 partnership 类选题
- 5 × `aivis-*` — AI 可见度修复（GSC / Course Report / 内链 / MCP 教程 / Q6 检查）
- 3 × `competitor-*` — 竞品行动（Bootcamp 章节 / 数字更新 / Microsoft/TAFE 反推）

**保留在 active/**：50 geo + 7 xhs = 57 张

**草稿内容全部保留**（包括上一轮刚补完的 5 webinar 落地页 / 2 aivis SOP / partnership 邮件等），未来如果某条渠道重新启动直接 git mv 回 active/，不重写。

**上游 routine 修复 TODO**：
- `omni-report/scripts/marketing-topics-to-tasks.ts`：webinar / evergreen / partnership section 默认落 `_drafts/topics/` 不进 `active/`
- `omni-report/scripts/ai-visibility-to-tasks.ts`：默认落 `_drafts/aivis/` 不进 `active/`
- `omni-report/scripts/competitor-to-tasks.ts`：默认落 `_drafts/competitor/` 不进 `active/`
- `omni-report/scripts/comment-outreach-to-tasks.ts`（如存在）：默认落 `_drafts/comments/` 不进 `active/`

只有 GEO（master + 6 platform variants）和 xhs（小红书）这两类 routine 直接进 `active/` 进派活池，其他类必须人工 triage 拨到 active 才进。

**何时复活某个渠道**：用户明确说"开始做 X" 才把对应卡 mv 回 active/，否则 default 不做。
