<!--
dev.to 发布前手填：
  - canonical_url：等 jr-blog 版本上线后填真实 slug（下面 frontmatter 里是占位）
  - cover image：1000×420，建议「287 → 27 三色堆叠衰减条」，alt text 必填（dev.to feed 算法缺 cover -30%）
  - tags 固定 4 个（dev.to 上限）
  - repo URL：等 github.com/JR-Academy-AI/awesome-ai-cn 建好再确认
  - 发布时间：US ET 早 8-9 点（dev.to feed 高峰），避开周末
-->

<!--
差异化策略（vs 其他 variant，防重复内容降权）：

| 维度 | dev.to（本篇） | hn.md（英文兄弟） | Medium（英文兄弟） | zhihu / wechat |
|---|---|---|---|---|
| 定位 | **可复用的 audit 方法 + 4 条维护 spec**——读者拿走去审自己的 repo | Show HN 个人故事 + 求社区反馈 | ~2500 字叙事散文 | 中文故事 / 自黑 / 暴论 |
| 标题钩子 | 73% dead + "the 4-rule spec"（spec 先行，不是故事先行） | "Show HN: After 9 years, 80% ... Rebuilt it."（故事先行） | 长叙事标题 | "翻出来吓到了" |
| 开头 | TL;DR bullets（dev.to 平台惯例，读者要速读） | 第一人称清硬盘故事 | 场景叙事 | 第一人称尴尬故事 |
| 独占内容 | **"HTTP 200 is not a liveness check"** 三桶表 + 两层校验方法论；4 条规则写成可复制的 spec code block | 三个 discussion prompt（sponsorship / decay rate / missing categories） | 长篇心路 | 黑名单暴论 + 中文社区 section |
| 资源列表 | 只列 ⭐⭐⭐ 一档（8 条），不铺 10 个 section | 不列具体资源，只列 section 名 | 叙事中带 | 中文向 |
| 收尾 | 号召读者跑一遍 audit 并晒衰减率 | HN 讨论三问 | 叙事收束 | 评论区互动钩子 |
| 长度 | ~1500 字（dev.to 完读率随长度急降） | ~450 字主帖 | ~2500 字 | ~1500 中文字 |
| backlinks | canonical + learn/ai-engineer（品牌锚）+ GitHub org（资源锚）= 平台配额内 | profile 里挂，正文 1 个 repo link | canonical + 2-3 inline | 1-2 处 + bio |
-->

---
title: "73% of the links in my awesome-* repo were dead. Here's the 4-rule spec I rebuilt it with."
published: true
tags: [ai, github, opensource, learning]
canonical_url: https://jiangren.com.au/blog/{slug}
cover_image: ...   # 287 → 27 decay chart, alt required
description: "I audited all 287 links in an awesome-ai repo I started in 2017. 210 were dead. The rot is structural, not lazy maintainers — here's the maintenance spec I'd apply to any awesome-* list."
---

## TL;DR

- I started an `awesome-ai-cn` repo in 2017, handed it off, forgot about it. Audited all 287 links in 2026.
- 54 alive (19%), 23 redirected (8%), 210 dead — 404 / archived / expired domain (73%).
- Of the 54 "alive", most are NVIDIA / Google / Stanford pages that never 404 and never update either. Genuinely alive **and** useful: ~27. That's a 10:1 decay over 9 years.
- `Ctrl+F` in the README returned **zero** hits for: ChatGPT, LangChain, Claude, RAG, MCP. The repo sat out the entire LLM era.
- The fix isn't "try harder". It's four maintenance rules that need to exist on day one. They're at the bottom — steal them for your own list.

## Different curation categories rot at different speeds

A dead link is the visible failure. The invisible one is worse: the repo's top-level structure was `ML` and `DL`. That was a reasonable taxonomy in 2017. By 2020 it was awkward. By 2026 the SVM and Random Forest sections are archaeology, and there is nowhere to put an MCP server.

You can fix links with a cron job. You cannot fix a taxonomy with a cron job, because fixing it means admitting the thing you built is organized around the wrong axis. That's the part maintainers don't do, and it's why the repo's last substantive commit lands in **November 2022** — the same month ChatGPT shipped. It stopped one month before the story it was supposed to be curating even started.

## HTTP 200 is not a liveness check

The mechanical part of the audit — hit every URL, bucket the status codes — took a script and about a minute. The useful part took an afternoon of clicking, because status codes lie in three directions:

| Bucket | What the script sees | What's actually true |
|---|---|---|
| 404 / NXDOMAIN | dead | dead ✅ agreed |
| 301 → some marketing homepage | alive | the specific tutorial you linked is gone |
| 200, page renders fine | alive | last updated 2019, teaches a deprecated API |

Bucket 3 is the dangerous one, and no HTTP-level tool catches it. A page that confidently teaches `from langchain import LLMChain` returns 200 forever. It also breaks with an `ImportError` on LangChain 0.3+, because that import path has been deprecated since mid-2024. From the checker's point of view it is a perfectly healthy link. From a learner's point of view it's a two-hour debugging session that ends in "why is this tutorial lying to me".

So if you're going to audit your own list, the minimum viable check is two-layer: **automated for the status code, human for the content date**. If you only do the first one you'll conclude your list is 92% healthy and you'll be wrong.

## Why lists rot — the four structural causes

Not laziness. I was the maintainer, so I'm allowed to say that.

1. **Organized by technology category.** Categories turn over every 3-4 years. Your headings are a bet on which taxonomy wins, and you always lose that bet eventually.
2. **Entries are star-driven, not use-driven.** Something hits GitHub Trending, everyone adds it, and six months later it's unmaintained. There is no mechanism that removes it, because "it has 12k stars" still reads as a good reason.
3. **No "I used this" filter.** Maintainers add links other people recommended. Nobody actually ran the tutorial.
4. **Updates depend on individual willpower**, which reliably evaporates in year two. This is the one everyone underestimates, including me, right up until my own repo proved it.

Any one of these on its own is survivable. All four together give you a list with a ~5 year half-life, which is roughly what happened.

## The four rules

This is the actual deliverable, so here it is as a spec rather than prose. It's what went into the rebuilt repo's README:

```
1. last-verified date on every entry.
   Quarterly link check. Dead links get REMOVED, not tagged "may be outdated".

2. One line of "why we use it" on every entry.
   Not "looks useful." Format: "we use this in <module> for <purpose>."
   If you can't fill that in, the entry doesn't go in.

3. No Trending auto-adds.
   A new entry needs at least one cohort of real student usage first.

4. No sponsorships. Ever.
   The moment a curated list takes money, the signal is worth zero.
```

Rule 2 is the one that does the heavy lifting, and it's the one that costs something. It caps the list's size at roughly what one team has genuinely used, which means the repo will never win a "1000+ resources!" comparison. Good. The 287-link version *was* the impressive one, and 73% of it is gone.

Rule 1 sounds like the important one and is mostly hygiene. Rule 4 is the one I'm least sure about — a friend argued that no-sponsorship is exactly why these lists die, since nobody funds the boring quarterly maintenance. I don't have a counter-argument, just a preference.

## What actually survived the filter

The rebuilt list has 10 sections (concept entry points, prompt engineering, RAG, agent frameworks, MCP, eval/observability, deployment, local job-market resources, verified Chinese-language sources, and AU community pointers). Ratings are ⭐ alive / ⭐⭐ alive and updated since 2025 / ⭐⭐⭐ we actively use it in our curriculum.

Rather than dumping all ten sections, here's the ⭐⭐⭐ tier — the entries that cleared rule 2, i.e. things we can point at a specific module and say where they're used:

- **[DeepLearning.AI Short Courses](https://learn.deeplearning.ai)** — 60+ free courses, 1-2 hours each, still shipping new ones in 2025.
- **[fast.ai Practical Deep Learning](https://course.fast.ai)** — Jeremy Howard's run-it-first-understand-it-later ordering. The 2024 revision added a lot of LLM material.
- **[Kaggle Learn](https://www.kaggle.com/learn)** — 15 micro-courses, runs in the browser, zero environment setup. Underrated purely because it removes the "my Python install is broken" failure mode from week one.
- **[OpenAI Cookbook](https://cookbook.openai.com)** and the **[Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook)** — `git clone` and run. The notebooks are better than most paid video courses, which I realize is an annoying thing to hear if you paid for a video course.
- **[LangGraph](https://langchain-ai.github.io/langgraph)** — multi-agent orchestration; what most 2025-2026 agent work actually converges on.
- **[FastMCP](https://github.com/jlowin/fastmcp)** — best developer experience for writing a Python MCP server, and it isn't close.
- **[LangSmith](https://smith.langchain.com)** — tracing + eval; the free tier is genuinely enough for a personal project.
- **[vLLM](https://github.com/vllm-project/vllm)** — high-performance LLM inference serving.

The MCP section is the one that didn't exist in any version of this repo before, for the obvious reason: the protocol was published in November 2024. If your awesome-AI list has no MCP section right now, that's the same failure mode as my 2017 taxonomy, just five years earlier in its life cycle.

## The part where I make enemies

Eight large Chinese-language paid AI training platforms are deliberately absent from the new list. Not a brand grudge — three concrete, checkable problems: their LangChain material still teaches the deprecated `LLMChain` import path; homework rarely gets line-by-line review; MCP and Claude Skills coverage is close to zero. Fine as a lookup table for one specific syntax question, bad as a primary learning path.

I'm aware "we use it in our curriculum" is a phrase with a commercial fingerprint on it, so, disclosure: [JR Academy](https://jiangren.com.au/learn/ai-engineer) is a project-based AI engineering bootcamp in Australia built on the P3 model (Project + Production + Placement), and I'm on the founding team. That's where the use-driven filter comes from — four years of watching which free resources 100+ career-changers actually finished and which ones they bounced off. Rule 2 is really just that model pointed at a URL: if you can't name the Project an entry was used on, the Production system it survived, or the Placement it helped someone land, there is no "why we use it" line to write, and it doesn't go in. The list links only to free resources. If you find an entry where that line is weak, that's a legitimate issue to open.

## Go audit your own list

If you maintain an awesome-* repo, run the two-layer check on it this week and post your decay rate. My guess is most people have never measured it and would be unpleasantly surprised — 73% over 9 years didn't feel like an outlier once I started checking other lists.

Repo, plus the quarterly link-health report, lives under [JR Academy's GitHub](https://github.com/JR-Academy-AI). Issues and PRs are worth more than stars, which is a sentence every maintainer writes and then quietly checks the star count anyway.
