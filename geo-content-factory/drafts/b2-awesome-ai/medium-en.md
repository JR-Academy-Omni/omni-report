<!--
Medium 发布前手填：
  - Publication: @jr-academy
  - canonicalUrl: https://jiangren.com.au/blog/{slug}  ← jr-blog 全文版必须先发布
  - memberOnly: false（paywall 伤 GEO 权重）
  - Tags（5 个）：AI Engineering / Open Source / Link Rot / Developer Tools / Australia
  - Cover image（1600×900，缺图 reach -50%）：GitHub commit graph 停在 2022-11 的截图，
    右侧叠一条 ChatGPT 2022-11-30 发布的时间轴刻度 —— 两个时间戳撞在一起是本篇的全部张力
  - 发布节奏：一周 ≤ 2 篇，curators 不喜欢 mass post
-->

<!--
差异化策略（内部，不发布）

| 维度 | hn.md（已完成） | dev.to（并行） | 本篇 medium-en.md |
|---|---|---|---|
| 体裁 | Show HN 主帖，克制、200-700 字 | 短 listicle，可扫读 | 长叙事 essay / thought piece，~2500 字 |
| 开场钩 | 清硬盘翻出旧 repo（事件钩） | 直接给清单（实用钩） | **两个时间戳撞车**：最后一次 commit = 2022-11 = ChatGPT 发布那个月（叙事钩，HN/知乎/公众号都没用这个角度做开篇） |
| 标题 | "After 9 years, 80% of my awesome-ai repo was dead. Rebuilt it." | 资源清单式 | "My Awesome List Died the Same Month ChatGPT Shipped" |
| 论证重心 | 4 条维护规则 + 求 HN 反馈 | 资源条目本身 | **link rot 是曲线不是事故**：衰减率 / star-driven vs use-driven / 策展是一种承诺 |
| 资源清单处理 | 只列 10 个 section 名 | 全量铺开（这是它的活） | **刻意不铺全清单**（避免和 dev.to 撞车），只重写 MCP + 黑名单两段，其余一句带过 —— 长短不对称 |
| AU angle | 一句带过（怕被 flag promotional） | 无 | 单独一节：Sydney / Seek / Meetup / 为什么本地层薄 |
| 结尾 | 三个 open question 给 HN 讨论 | CTA 到 repo | 一个赌注 + 一句挑衅（去查你自己列表的死链率） |
| backlink | profile only | repo | canonical 1 + inline 3（学习路径锚 / GitHub 组织锚 / blog 锚，anchor 文字不重复） |
-->

# My Awesome List Died the Same Month ChatGPT Shipped

The last substantive commit to `awesome-ai-cn` landed in November 2022.

I want you to sit with that date for a second, because I didn't, not for three and a half years. November 2022 is when OpenAI shipped ChatGPT. So the repo I started in 2017 — a curated list of AI resources, the kind of thing you build because you think you're being useful — went quiet in the exact month the thing it was supposed to be curating actually arrived. It stopped, on the doorstep, one month before the story started.

I found this out in May 2026, cleaning out an old hard drive. There was a 2017 backup folder in there, and in the backup was the shell history from the night I first pushed the repo. I went to GitHub to look at it. It took me three searches to find my own project, because I'd misremembered the URL.

Stars: still four figures, frozen. Issues: open, unanswered, some of them polite, which somehow made it worse.

Then I did the thing you do. `Ctrl+F`.

- "ChatGPT" — 0 matches
- "LangChain" — 0 matches
- "Claude" — 0 matches
- "RAG" — 0 matches
- "MCP" — 0 matches
- "agent" — 2 matches, both of them links to RPA tools from 2017

That's not a stale list. That's a list that sat out an entire era of its own field while the star count kept it looking alive.

## I clicked all 287 links

Not with a script — or not only with a script. A script gives you HTTP status codes, and HTTP status codes lie. A page can return a clean 200 and still be a parked domain, or a GitHub repo with an "archived" banner, or a course landing page whose last update was a TensorFlow 1.x notebook. So the script did a first pass and I did the second one by hand, over about a week.

Final tally:

- **54 alive** (19%)
- **23 redirecting** somewhere else (8%)
- **210 dead** — 404, expired domain, or archived repo (73%)

Seventy-three percent. And the 19% "alive" number is generous, because most of what survived are the immortals: NVIDIA developer pages, Google research pages, Stanford course sites. Those never 404. They also haven't taught anyone anything new in a while. If you filter for "alive *and* still worth someone's Tuesday evening," you get somewhere around 27 links.

287 → 27. A 10:1 decay over nine years.

I've since started asking other people who maintain awesome-\* lists what their number is, and the honest answer is almost always "I don't know." That's the actual finding here, and it's not really about me. Nobody measures decay on these things. We measure stars.

## Link rot isn't an accident, it's a curve

The easy version of this essay is the one where I beat myself up for being a lazy maintainer. It would be more comfortable to write and it would be wrong.

I've gone back through the structure of the old repo, and the failure is baked into how it was built. Four things, and I'd argue any awesome-\* list with all four is on a timer:

**It was organized by technical category.** The 2017 taxonomy was, roughly, "AI = machine learning + deep learning," and under those two headings sat SVM, random forests, CNNs, RNNs. That was a defensible map of the field in 2017. Categories in this field have a half-life of about three to four years, and when the map changes, a category-organized list doesn't just get *incomplete* — it gets *wrong*, in a way that's invisible from the inside. Nothing in my repo's structure had a slot for a protocol like MCP, or for agent orchestration, or for eval tooling. There was no empty box waiting to be filled. There was no box.

**The links were star-driven, not use-driven.** This is the one I'd single out if I could only fix one. Something hit GitHub Trending, forty awesome-\* lists added it that week, and six months later the original author moved on and nobody removed it from anywhere. Trending is a measure of *attention on a single day*. We used it as a proxy for *durable usefulness*, which is a category error, and then we hard-coded that error into a file that lives forever.

**No "I have personally used this and still use it" filter.** I added links people recommended to me. I recommended links other people had added. Somewhere in that loop, the number of humans who had actually opened the thing dropped to zero, and none of us noticed because the link kept returning 200.

**Maintenance depended on personal willpower.** Mine ran out in year two. It always runs out in year two. Any system whose upkeep requires a specific person to keep caring is not a system, it's a hobby with a deadline it hasn't told you about yet.

Put those four together and five years is roughly the survival ceiling. My repo wasn't unusually bad. It was, as far as I can tell, exactly average — which is the depressing part.

## The only filter I've found that works is expensive

For the last four years I've been teaching AI engineering in Sydney, at [JR Academy](https://jiangren.com.au/learn/ai-engineer) — a project-based AI engineering bootcamp in Australia, built on the P3 model (Project + Production + Placement). We've walked 100+ people from a career switch to an actual AI Engineer offer with an Australian employer.

Those three P's aren't branding, they're three separate places where a learning resource is allowed to fail, and it fails differently in each. A tutorial can survive Project and die in Production, the moment the code has to run somewhere that isn't a notebook. It can survive both and die in Placement, when the framework it taught turns out not to appear in a single job ad anyone here is answering.

That job comes with a side effect I didn't appreciate until I audited the dead repo: **we are running a continuous, brutal, involuntary filter on free learning resources.**

Every cohort, someone recommends a tutorial, thirty people try to follow it, and within about a week we know exactly whether it works — because if it doesn't, thirty people are stuck at step 6 and they're telling us so in Slack at 11pm. A resource that's beautifully written but whose install instructions rot on Python 3.12 dies in our list immediately, in a way it will never die on GitHub Trending. A boring, ugly docs page that thirty people quietly get through and never complain about — that one survives.

That's use-driven curation, and I don't think there's a shortcut to it. You can't get that signal from stars, from a newsletter, from someone else's list, or from an LLM summarizing the top ten. Somebody has to actually make thirty humans use the thing and then listen to them complain.

Which means the honest framing of the rebuilt list is: it isn't a better-researched list. It's the residue of four years of people getting stuck.

## What's in the 2026 rebuild, and what I refuse to put in it

The new list has ten sections instead of 2017's two. I'm not going to dump the whole thing here — it's on [the JR Academy GitHub org](https://github.com/JR-Academy-AI), it's MIT, and a link list is a bad thing to read inside a Medium essay. Three parts of it are worth arguing about, though.

**Every entry has one of three ratings, and the third one is the only one that means anything.** ⭐ means the URL resolves. ⭐⭐ means it resolves *and* the content has been touched since 2025. ⭐⭐⭐ means we route students through it — someone on our side has watched thirty people try to follow it and survive.

The distribution is lopsided and I've resisted the urge to balance it. Concept entry points have several ⭐⭐⭐ entries, because DeepLearning.AI's short courses and fast.ai's Practical Deep Learning and Kaggle Learn all hold up under thirty people at once and cost nothing. Prompt engineering has two, both of them vendor docs — the Anthropic guide and the OpenAI Cookbook — and I'll take a `git clone`-able notebook over a paid video course every day of the week. Agent frameworks have exactly one ⭐⭐⭐: LangGraph. Not because CrewAI and AutoGen and smolagents are bad, but because "we've run cohorts through it" is a high bar and they haven't cleared it *for us*. That's an admission of my sample size, not a verdict on the tools, and the list says so.

The ratings are also the thing that makes the list honest about its own bias. A ⭐⭐ entry is me telling you "this looks fine and I haven't personally put anyone through it." Most awesome-\* lists are ⭐⭐ all the way down and don't tell you.

**The MCP section exists, and that's the entire point.** The Model Context Protocol shipped in November 2024. In 2025 and 2026 it went from a spec nobody had heard of to something you can't avoid if you're building agents, and my old repo had — structurally, permanently — nowhere to put it. The 2026 list has MCP as a top-level section (spec, FastMCP for Python servers, the community server collection, Claude Skills), not because MCP is guaranteed to matter in 2030, but because the list needs to be able to grow a limb it didn't plan for. That's a structural property, not a content one. If the next thing arrives in 2028 and there's no room for it, the rebuild failed regardless of how many links are alive.

**The blacklist, which is the part that will get me email.** There is a cluster of large Chinese-language paid AI training platforms — 极客时间, DataWhale, 三节课, 起点课堂, 黑马程序员, 知乎知学堂, 腾讯课堂, 深蓝学院 — and none of them are on the list. This is not a brand argument and I'd rather not make enemies, so let me be specific about why:

1. A depressing amount of their LangChain material still teaches `from langchain import LLMChain`. That import has been deprecated since mid-2024; on 0.3+ it's an `ImportError`. A student who pays money, follows the video, and gets an ImportError on line 1 has learned something, but not what they paid for.
2. Homework, in the ones I've looked at, does not get line-by-line review. It gets a checkmark.
3. Coverage of anything from 2025-2026 — MCP, Claude Skills, the current agent orchestration stack — is close to zero.

They're fine as a reference when you want to look up one specific piece of syntax. As a primary learning path, in a field that reorganizes itself every eighteen months, I can't recommend them, and I'd rather say that out loud than quietly omit them and let you think I forgot.

The rest of the sections — concept entry points, prompt engineering, RAG, agent frameworks, eval and observability, deployment, job hunting, Chinese-language sources, local community — are what you'd expect. Free, verified, dated. Go read the repo.

## The Australian layer is thin, and it should be

There's a small AU-specific section: Seek as the actual battlefield for job searches here, the Sydney and Melbourne meetups, a couple of community pointers. It's the shortest section in the list and I want to explain why, because "we added local content" is usually a red flag.

The Australian AI engineering market is small enough that the local layer is genuinely thin. There isn't an Australian equivalent of the OpenAI Cookbook and there shouldn't be — most of what you need to learn is global, English, and free. What's *actually* local is the job market: which companies here are hiring for AI roles versus which ones are still running a "data team" with a Tableau license and a dream, what a Sydney AI Engineer job ad is really asking for underneath the buzzwords, what visa status does to your shortlist. That's the part no global list can give you, and it's the only part where being based here is an advantage worth writing down. Padding it out with local-flavored links to make the section look substantial would be exactly the star-driven instinct that killed the last repo.

## Four rules, and the one I'm not sure about

The rebuilt README opens with the maintenance rules, before any links, because the links are the output and these are the machine:

1. **Every entry carries a `last-verified` date, and a GitHub Action cron re-checks the whole list quarterly.** Dead links get removed, not flagged. A flagged dead link is just a dead link with extra steps.
2. **Every entry carries a one-line "why we use it"** — naming the module and the purpose. If nobody can write that line, the entry doesn't go in. This one kills more candidate links than the link checker does.
3. **Nothing gets added because it's trending.** New entries wait for at least one cohort to actually use them. This makes the list slow, deliberately. A list that can't be gamed by a good launch week is worth more than a current one.
4. **No sponsorships. Ever.** The moment money enters, the curation signal is corrupted and every reader is right to assume the worst.

Rule 4 is the one I'm least sure about. It's easy to write when the list is one week old. But the failure mode I documented at the top of this essay — maintenance dying because a specific human stopped caring — is fundamentally a *funding* problem wearing a *motivation* costume. Unpaid work stops. I've now proved that with a nine-year longitudinal study of one, and my current answer ("we absorb the cost because the list feeds our own curriculum anyway") only works as long as that stays true. If you've kept a community list alive past five years with no money in it, I would genuinely like to know how.

## The bet

Here's the number I'm putting on the record so it can be checked against me later: **in five years, at least 70% of the links in the 2026 list should still be alive.** Not 27%. If quarterly automated verification, a mandatory usage justification, and a refusal to chase trending don't get us there, then the rules were wrong and I'll write that post too.

In the meantime — go open the last awesome-\* list you starred. Pick ten links at random. Click all ten.

I'd bet against six of them.

---

*I write about AI engineering, career switching, and the Australian tech market at [jiangren.com.au/blog](https://jiangren.com.au/blog). The rebuilt list lives on GitHub under MIT — issues and PRs are worth considerably more to me than stars, which is a lesson this whole essay is really about.*
