# SEO Performance Weekly — Routine Prompt

> 这是给 Claude Code remote routine 的 prompt 模板。复制下面整段进 `claude.ai/code/routines/{id}/edit` 的 Prompt 字段。
>
> ⚠️ 改完 routine 必须 `RemoteTrigger run` 验证一次。docs 里改了不会自动同步到 cloud。
>
> 命令式开头 + 防静默挂规则参考 memory `feedback_routine_prompt_must_be_imperative` 和 `feedback_routine_anti_silent_fail`。

---

## 复制以下整段作为 routine prompt

```
立即执行 SEO Performance 周报 routine。禁止反问，禁止跳过 phase，禁止把 prompt 当成征求意见的 brief。第一个 tool call 必须是 Bash 拉 omni-report 仓库。

工作仓库: omni-report (https://github.com/JR-Academy-AI/omni-report)
日期变量: DATE 取今天 AEST (Australia/Sydney)，命令: TZ='Australia/Sydney' date +%Y-%m-%d
依赖: bun >=1.0
secrets: GSC_SA_JSON_BASE64 / GSC_SITE_URL / DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD / PSI_API_KEY 已注入 env
optional secrets (告警用): SEO_ALERT_WEBHOOK / SEO_ALERT_FORMAT (dingtalk|wechat|slack|plain)

每个 phase 完成后立即 git push（防 stream idle timeout，参考竞品周报）。每 phase 第一行 echo "▶ Phase X: 描述"，最后一行 echo "✅ Phase X done"。

---

PHASE 0 — 准备

  cd omni-report
  git pull
  bun install
  DATE=$(TZ='Australia/Sydney' date +%Y-%m-%d)
  echo "▶ Phase 0: prepare for $DATE"

PHASE 1 — GSC fetch（致命，失败必须停）

  echo "▶ Phase 1: GSC fetch"
  bun run seo-perf:gsc "$DATE"
  git add seo-performance/$DATE.json
  git commit -m "data(seo-perf): GSC fetch $DATE"
  git push
  echo "✅ Phase 1 done"

PHASE 2A-D — SERP（4 batch 渐进 commit）

  for batch in A B C D; do
    echo "▶ Phase 2$batch: SERP batch $batch"
    bun run seo-perf:serp "$DATE" --batch=$batch
    git add seo-performance/$DATE.json
    git commit -m "data(seo-perf): SERP batch $batch $DATE"
    git push
    echo "✅ Phase 2$batch done"
  done

PHASE 3 — Core Web Vitals（非致命，失败继续）

  echo "▶ Phase 3: CWV"
  bun run seo-perf:cwv "$DATE" || echo "⚠️ CWV phase failed, continuing"
  git add seo-performance/$DATE.json
  git commit -m "data(seo-perf): CWV $DATE" || true
  git push
  echo "✅ Phase 3 done"

PHASE 4 — Analyze（diff + opportunity + ROI + last-week verify）

  echo "▶ Phase 4: Analyze"
  bun run seo-perf:analyze "$DATE"
  git add seo-performance/$DATE.json
  git commit -m "data(seo-perf): analysis $DATE"
  git push
  echo "✅ Phase 4 done"

PHASE 5 — Render markdown

  echo "▶ Phase 5: Render"
  bun run seo-perf:render "$DATE"
  git add seo-performance/$DATE.md
  git commit -m "report(seo-perf): SEO performance weekly $DATE"
  git push
  echo "✅ Phase 5 done"

PHASE 6 — Alert（重大回归推 webhook，无 webhook 配置时跳过）

  echo "▶ Phase 6: Alert"
  bun run seo-perf:alert "$DATE" || echo "⚠️ Alert phase failed, continuing"
  echo "✅ Phase 6 done"

PHASE 7 — Notion 摘要同步（可选，参考竞品周报模式）

  echo "▶ Phase 7: Notion sync"
  使用 mcp__claude_ai_Notion 写一个 child_page 到 SEO Performance hub page
  内容：报告日期 + 5 个核心数字 + top 3 行动项 + GitHub 全文链接
  目的：CEO/SEO 团队不用打开 GitHub 就能看到本周 TL;DR
  长度 ≤ 1000 tokens
  hub_page_id 暂未确定，跑第一次时输出 "TODO: 把这次报告 paste 进哪个 Notion page，告诉我 ID"

---

完成后输出最终 summary：

  - 报告路径：seo-performance/$DATE.md (GitHub URL)
  - 5 个核心数字：曝光 / 点击 / CTR / 平均位置 / Top 10 关键词数
  - top 3 行动项
  - 上周 verify 结果（X improved / Y worsened / Z 待观察）
  - 任何 phase 失败的 warning
```

## 注意事项

### 1. cron 表达式

```
0 23 * * 0     UTC = 周一 09:00 AEST (Brisbane, GMT+10 无夏令时)
```

> ⚠️ 如果改用悉尼 (有夏令时)，11 月-4 月是 GMT+11，需要 `0 22 * * 0`。
> Brisbane 永远 GMT+10，本系统用 Brisbane 时区是为了避免夏令时切换日漏跑。

### 2. 跟其它 routine 错开

| 周日 20:00 AEST | competitor-reports |
| 周一 08:00 AEST | marketing-topics |
| 周一 09:00 AEST | **seo-performance** ← 本 routine |
| 周二 ?         | growth-playbook |
| 周三 09:00 AEST | ai-visibility |
| 每日 06:00 AEST | seo-healthcheck |
| 每工作日 10:30  | daily-assignments |

### 3. Failure handling

- Phase 1 (GSC) 失败 = 整个 routine 停（GSC 是核心数据源）
- Phase 2 (SERP) 部分 batch 失败 = warning + 继续
- Phase 3 (CWV) 失败 = 跳过 + warning
- Phase 4-5 失败 = stop（已经有数据了，渲染失败可以本地补）

### 4. 第一次跑

第一次跑 routine 之前，本地手跑一遍验证：

```bash
cd omni-report
bun install
bun run seo-perf:gsc                # 验证 GSC service account
bun run seo-perf:serp -- --batch=A  # 验证 DataForSEO
bun run seo-perf:cwv -- --top=5     # 验证 PSI
bun run seo-perf                    # 全流程
```

跑通后再 push 到 GitHub，再创建 routine。

### 5. 改 routine 后必须 verify

参考 memory `feedback_routine_anti_silent_fail`：
1. `RemoteTrigger run` 立即触发一次
2. 看 stream 输出是否有 "▶ Phase N" / "✅ Phase N done" 标记
3. 看 GitHub omni-report repo 是否真的有 `seo-performance/$DATE.{json,md}` 新提交
4. 三个都 OK 才算成功
