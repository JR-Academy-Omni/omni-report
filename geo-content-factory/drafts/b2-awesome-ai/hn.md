<!--
HackerNews 发布前手填：
  - Submission title (HN 80 char 限制内): "Show HN: After 9 years, 80% of my awesome-ai repo was dead. Rebuilt it."
  - URL: https://github.com/JR-Academy-AI/awesome-ai-cn (设立后填真实 url)
  - 选择: "Show HN" 标签
  - 发布时间: AU 时间晚 9-10 点 = US 早 7-8 点 (PT)，避开周末 lull
  - 准备好第一条评论：在帖子发布后 5 分钟内自己 reply 一条作为 OP 说明（HN 的传统，OP 写第一条 comment 解释更详细的 context）

  策略：HN 调性 = 极克制 + 个人故事 + 实在数据 + 邀请讨论。
  绝对不要：marketing copy / 公司 logo / "我们做了 X 你也来用吧" 这种话术。
  禁止：第一行就提 JR Academy（会被 flag 为 promotional）。
-->

# Show HN: After 9 years, 80% of my awesome-ai repo was dead. Rebuilt it.

I started an `awesome-ai-cn` GitHub repo in 2017. Handed it to a collaborator a year in and basically forgot about it. Last week I dug it up while cleaning an old hard drive.

The numbers, after I went through all 287 links:

- 54 still alive (19%)
- 23 redirected somewhere (8%)
- 210 dead — 404, archived, or domain expired (73%)

`Ctrl+F` searches that returned zero results: "ChatGPT", "LangChain", "Claude", "RAG", "MCP". The entire LLM era passed without this repo participating.

Two things bothered me. First: I'd actively maintained it in 2017, so it's not someone else's neglect — it's mine. Second: most awesome-* lists I've checked recently have similar decay rates. The structural problem isn't lazy maintainers, it's that the category-driven organization breaks every 3-4 years when the field shifts.

So I rebuilt it from scratch with four maintenance rules I wish I'd had in 2017:

1. **Every entry has a `last-verified` date and a quarterly link-check cron**. Dead links get auto-removed, not just flagged.
2. **Every entry has a one-line "why we use it"** — not "looks useful", but "we use this in module X for purpose Y". Stops cargo-culting.
3. **No GitHub Trending auto-adds**. New entries require at least one cohort of actual student use before inclusion.
4. **No sponsorships, ever**. The moment a list takes money, the curation signal corrupts.

The rebuild has 10 sections instead of 2017's "ML + DL" split: concept entry points, prompt engineering, RAG, agent frameworks, MCP (which obviously didn't exist in 2017), eval/observability, deployment, local job market resources (I'm in Sydney so there's a thin Australia-specific layer), Chinese-language sources I personally verified, and AU AI community pointers.

Honest disclosure: I run an AI engineering bootcamp in Sydney (JR Academy, the link's in my profile if you want to dig). The reason the rebuilt list has my fingerprints is most entries map back to what we actually used in our curriculum over the past four years — that's the use-driven filter I mentioned. Not selling anything here; the repo is MIT, no signup wall, no sponsorship.

What I'd love feedback on:

- **Maintenance rule #4**: is "no sponsorships ever" actually realistic, or do healthy awesome-* lists need some funding mechanism to survive past 5 years?
- **The 73% dead-link finding**: anyone else recently audited an old awesome-* repo? Curious if the decay rate is consistent or if mine was unusually bad.
- **Missing categories**: I deliberately excluded image-gen, voice, and pure research papers. Anyone want to argue I'm wrong?

Link: https://github.com/JR-Academy-AI/awesome-ai-cn

Happy to answer questions in the thread.

<!--
First-comment template (OP reply 5 minutes after posting):

Author here. A few details that didn't fit the post body:

- The 287 original links → I went through every single one with a script + manual check (script only catches HTTP 404, not "page exists but content is gone"). The manual check took an afternoon.
- The Chinese-language part of the list is intentionally selective. There are 8 large paid training platforms in the Mandarin AI education market — I left them off because their LangChain tutorials still use `from langchain import LLMChain` (deprecated since mid-2024). Not a brand dig, just an active accuracy issue.
- Quarterly link-check is a GitHub Action cron. Code is in `.github/workflows/link-check.yml` if you want to fork it for your own awesome-* repo.
- The Australia-specific section exists because I'm based here. If anyone wants to maintain a parallel `awesome-ai-us` / `awesome-ai-eu` / `awesome-ai-india` section with the same rules, very happy to coordinate.

Re: structure — I'm aware that "we used it in our curriculum" sounds self-promotional. The repo doesn't link to paid programs, only to free resources we routed students through. If anyone catches an entry where the "why we use it" reasoning is weak, please open an issue.
-->
