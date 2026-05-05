# SEO Performance — Setup Guide

PRD: [`omni-report/PRD_SEO_PERFORMANCE.md`](../../PRD_SEO_PERFORMANCE.md)

本文档讲清三件事：拿 credential、塞 routine secrets、本地手跑验证。

---

## 1. Google Search Console — Service Account

### 1.1 在 GCP 建一个 service account

1. 打开 https://console.cloud.google.com/iam-admin/serviceaccounts
2. 选一个项目（推荐用 `jr-academy-prod` 或新建 `omni-report`）
3. CREATE SERVICE ACCOUNT
   - Name: `seo-performance-reader`
   - Description: `Read-only GSC access for omni-report SEO Performance routine`
   - Role: 不需要任何 GCP role，跳过
4. 创建后进 SA 详情页 → KEYS → ADD KEY → Create new key → JSON → 下载保存

### 1.2 把 SA email 加入 jiangren.com.au 的 GSC

1. SA JSON 里的 `client_email` 字段长这样：`seo-performance-reader@xxx.iam.gserviceaccount.com`
2. 打开 https://search.google.com/search-console/users
3. 选 `https://jiangren.com.au/` 或 `sc-domain:jiangren.com.au`
4. ADD USER → 粘贴 SA email → Permission: **Restricted** 即可（不需要 Full）
5. 同样把 **www / web-zh / 任何子域 / sc-domain** 都加一遍（哪个有数据加哪个）

### 1.3 启用 GSC API

1. 打开 https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
2. ENABLE（默认免费、无配额烦恼）

### 1.4 启用 PageSpeed Insights API

1. 打开 https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com
2. ENABLE
3. APIs & Services → Credentials → CREATE CREDENTIALS → API key
4. 复制 key（这个就是 `PSI_API_KEY`）
5. （可选）限制 key 只能调 PSI API：编辑 key → API restrictions → PageSpeed Insights API only

---

## 2. DataForSEO

1. 注册 https://app.dataforseo.com/register（用工作邮箱即可）
2. 充值 → 至少 $20（够跑 ~2 年的本报告）
3. Dashboard → API access → 复制 `Login` 和 `Password`
   - ⚠️ 这里的 password 不是登录密码，是 API 专用密码
4. （可选）Settings → IP whitelist 留空，让 routine 服务器随便调

---

## 3. 本地试跑

### 3.1 准备 `.env`

omni-report 根目录创建 `.env`（已 gitignored）：

```bash
# GSC (base64 编码 SA JSON 全文)
GSC_SA_JSON_BASE64=<paste>
GSC_SITE_URL=sc-domain:jiangren.com.au

# DataForSEO
DATAFORSEO_LOGIN=<email>
DATAFORSEO_PASSWORD=<api password>

# PageSpeed Insights
PSI_API_KEY=<api key>

# Alerting (可选 — 没配则告警节跳过)
# SEO_ALERT_WEBHOOK=https://oapi.dingtalk.com/robot/send?access_token=xxx
# SEO_ALERT_FORMAT=dingtalk    # 或 wechat / slack / plain
```

base64 编码 SA JSON：

```bash
base64 -i ~/Downloads/seo-performance-reader-xxxxx.json | tr -d '\n' | pbcopy
# 现在 base64 已在剪贴板，粘贴到 .env
```

### 3.2 安装依赖

```bash
cd omni-report
bun install
```

(本期 0 个新增依赖，纯 Node 内置 + bun runtime。)

### 3.3 一键验证三方 credential（推荐第一件事跑这个）

```bash
bun run seo-perf:verify
```

5 秒内告诉你 GSC/DataForSEO/PSI 哪个通哪个挂，错误信息附具体修复指引。三个全 ✅ 再跑下面的步骤。

### 3.3a 单独验证 GSC 通了

```bash
bun run seo-perf:gsc
```

预期输出：
```
▶ Fetching GSC data for sc-domain:jiangren.com.au
  date range: 2026-04-21 → 2026-04-27
  · by_query …
  · by_page …
  · by_country …
  · by_device …
✅ GSC data → /…/seo-performance/2026-04-30.json
   queries: 1247 · pages: 893
   totals: clicks=4832 impressions=125432 pos=18.20
```

如果失败：
- `GSC_SA_JSON_BASE64 env var is required` → 没塞 env 或 base64 没贴完整
- `GSC token exchange failed: 400 invalid_grant` → SA private_key 损坏（重新下载 JSON）
- `403 The user does not have sufficient permission` → SA email 没加进 GSC 用户列表
- `404 Site not found` → `GSC_SITE_URL` 写错（sc-domain: 前缀必加，或换成 https:// 开头）

### 3.4 验证 DataForSEO 通了（小批量）

先注释掉 `keywords.json` 里大部分 keywords，只留 5 个，然后：

```bash
bun run seo-perf:serp 2026-04-30 --batch=A
```

跑通后取消注释、跑完整 batch。

### 3.5 验证 PSI 通了

GSC 必须先跑过（拿到 top pages 列表）：

```bash
bun run seo-perf:cwv 2026-04-30 --top=5
```

每 URL ~10s，5 个 URL 大概 30-60s。

### 3.6 跑完整流程

```bash
bun run seo-perf
# 等价于：
# bun run scripts/seo-performance/run.ts
```

---

## 4. Routine 配置（生产）

### 4.1 创建 routine

打开 https://claude.ai/code/routines → New routine：

| 字段 | 值 |
|------|-----|
| Name | `JR SEO Performance Weekly` |
| Cron | `0 23 * * 0` UTC（= 周一 9am Brisbane） |
| Repo | `https://github.com/JR-Academy-AI/omni-report` |
| Model | `claude-sonnet-4-6` |

### 4.2 塞 secrets

在 routine 编辑页 → Secrets：

- `GSC_SA_JSON_BASE64`
- `GSC_SITE_URL`
- `DATAFORSEO_LOGIN`
- `DATAFORSEO_PASSWORD`
- `PSI_API_KEY`

> ⚠️ **未验证：Claude Code routine secrets 是否支持 ~3KB 长字符串（GSC SA JSON base64 大约 2.5KB）。**
> 如果失败，fallback 1：把 SA JSON 拆成 2 个 secret 分别 base64，routine 里拼接。
> Fallback 2：把 SA JSON gzip + base64（更短，但要在 routine 里 gunzip）。

### 4.3 Prompt 模板

参考 `PRD_AI_VISIBILITY.md` 第 5.2 节防 stream idle timeout 设计。**第一句必须是命令式**，参考 memory `feedback_routine_prompt_must_be_imperative`。

```
立即执行 SEO Performance 周报 routine。禁止反问，禁止跳过 phase。第一个 tool call 必须是 Bash 拉 omni-report 仓库。

工作目录：omni-report
日期：今日 AEST (Australia/Sydney)

Phase 0: 拉仓库 + 安装依赖
  - git pull
  - bun install

Phase 1: 跑 GSC 拉数据
  - echo "▶ Phase 1: GSC fetch"
  - bun run seo-perf:gsc
  - git add seo-performance/*.json
  - git commit -m "data: GSC fetch ${DATE}"
  - git push

Phase 2A-D: SERP 4 batch
  for batch in A B C D; do
    echo "▶ Phase 2$batch: SERP batch $batch"
    bun run seo-perf:serp -- --batch=$batch
    git add seo-performance/*.json
    git commit -m "data: SERP batch $batch ${DATE}"
    git push
  done

Phase 3: CWV
  - echo "▶ Phase 3: CWV"
  - bun run seo-perf:cwv
  - git add seo-performance/*.json
  - git commit -m "data: CWV ${DATE}"
  - git push

Phase 4: Analyze
  - echo "▶ Phase 4: Analyze"
  - bun run seo-perf:analyze
  - git add seo-performance/*.json
  - git commit -m "data: analysis ${DATE}"
  - git push

Phase 5: Render markdown
  - echo "▶ Phase 5: Render"
  - bun run seo-perf:render
  - git add seo-performance/*.md
  - git commit -m "report: SEO performance ${DATE}"
  - git push
```

⚠️ 改完 routine 必须 `RemoteTrigger run` 验证，参考 memory `feedback_routine_anti_silent_fail`。

---

## 5. Troubleshooting

### GSC 数据全是 0

GSC 数据有 2-3 天延迟。`fetch-gsc.ts` 用的是 `daysAgoAEST(3) → daysAgoAEST(9)` 这个 7 天窗口。如果你的站非常新（< 1 周），先等几天再跑。

### DataForSEO 返回 task_error

最常见两种：
- `40400 Authentication failed` → login/password 错（不是登录密码！是 API password）
- `40500 Invalid Field: location_code` → location code 不对，参考 [DataForSEO locations](https://docs.dataforseo.com/v3/serp/google/locations/)

### PSI 间歇 timeout

PSI 单次 5-30s，并发 ≥4 容易触发限流。本脚本默认 concurrency=3。如果本地跑很慢，把 `--top=50` 改成 `--top=20`。

### CWV `source: 'unknown'`

说明 PSI 既没拿到 field data（CrUX 数据要求该 URL 在 Chrome 里有足够流量样本），也没拿到 lab data（页面渲染失败）。看 `error` 字段定位。

---

## 6. 成本预估

| 项 | 单价 | 周用量 | 月成本 |
|----|------|--------|--------|
| GSC API | 免费 | ~10 calls | $0 |
| DataForSEO SERP | $0.0006/查询 | 100 keywords × 3 location = 300 | ~$0.72 |
| PageSpeed Insights | 免费 | 50 pages × 4 周 = 200 | $0 |
| **合计** | | | **$0.72** |

vs Semrush Pro $139.95/月。
