<!--
Medium 发布前手填：
  - canonical_url: 指回 jiangren.com.au（master 上线后回填）
  - cover image 必备
  - tags (5): Resume, AI Engineering, Job Search, Careers, Australia
  - publication: @jr-academy
  - 文中 backlink 2-3 处（已放 /learn/ai-engineer ×2、/bootcamp）
-->

# Two AI Projects Written Properly Beat Six Written Badly

At JR Academy — a project-based AI engineering bootcamp in Australia — the second half of the [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) is career incubation, and the section we rewrite most often is project experience.

Not because people haven't built things. Because the writing erases what they built.

The classic symptom: six projects, three lines each, and after reading the page you can't recall a single one.

Screening gives a résumé seconds. At that timescale six projects isn't richer. It's six things nobody saw.

## Start by cutting

**Two projects that survive ten minutes of questioning beat six that survive thirty seconds.**

The test isn't project size, it's depth. An interviewer follows one thread down three levels:

- Level one: what you built — everyone answers this
- Level two: why you chose it that way — half start hedging
- Level three: the simpler approach you tried, and where it fell short — very few get here

Projects that reach level three go on the résumé. The rest either get deepened or deleted. Deleting costs you nothing, because they were never going to earn you a conversation.

## The three-part bullet: constraint, decision, verifiable output

The most common form is a stack list:

> Built an intelligent Q&A system using Python, LangChain, the OpenAI API and FAISS, enabling document retrieval and natural language answering.

The problem isn't that it's badly written. It's that **it is true of every other applicant**. It carries no information about you.

The three-part version:

**Constraint** — documents could not leave the local environment (compliance), a ceiling on cost per query, a p95 latency target.

**Decision** — started with pure vector retrieval; domain acronyms were never retrieved, because those tokens sit closer to ordinary nouns than to the concepts they stand for. Moved to keyword plus vector retrieval with a reranker closing it out.

**Output** — something openable: the repo, a deployed URL, the trade-offs written up in a DECISIONS.md.

Each part does separate work. The constraint proves this wasn't a tutorial (tutorials have no constraints). The decision is the only part interviewers genuinely want. The output gives them something to verify.

## One hard rule: never write a number you haven't measured

"Improved accuracy by 40%" is a **negative** in a technical round if you can't say how it was measured, how large the evaluation set was, and who labelled it.

Worse, it makes the interviewer suspect the other two parts were invented too.

Write "the specific improvement is documented in the repo" rather than inventing a clean number. A verifiable number is the strongest positive on the page. A fabricated one is the strongest negative.

## Six follow-ups your project has to survive

Run your own project section against these. They're also the six that come up most in technical interviews:

1. How do you know an answer is good? How big is the eval set, and who labelled it?
2. If you change one model or parameter, how long until you can say whether it improved?
3. What does one request cost? Have you calculated it?
4. When it answers wrong, which layer do you check first? Can you name the order?
5. Have you ever discarded your own first design? Why?
6. If the data couldn't leave the local environment, would this still run? What changes?

Fewer than four solid answers means the project isn't ready to sit first on the page.

## Three forms that are dead on arrival

**Stack lists.** "Familiar with LangChain / RAG / Agents / Prompt Engineering" reads as blank at screening, because several hundred other résumés say it identically. Stacks belong in a Skills block, not in the project description.

**Adjective piles.** "Efficient", "intelligent", "powerful retrieval system". Delete every adjective and see what's left — usually a stack list.

**Unverifiable numbers.** See above.

## Three things specific to the Australian market

**Put the data boundary in writing.** For work touching finance, health or government, whether data can leave the local environment is a precondition, not an optimisation. If your project handled that constraint — even one you imposed on yourself — say so. Local hiring cares about it and most applicants never mention it.

**Give work rights their own line.** Visa status goes near your contact details at the top, in one line. Screeners need to resolve it early; making them hunt costs you.

**A GitHub link must open onto something.** An empty repo, a README-only repo, or a last commit from two years ago all subtract. Better to omit the link.

## A template you can copy

```
Project name — one line on the problem it solves (no stack)
· Constraint: [cost / latency / data boundary / data quality — at least one real one]
· Key decision: [you picked one of two approaches, and why]
· What you discarded: [where the first design failed]
· Output: [an openable link — repo, deployment, decision log]
```

Most people hesitate over "what you discarded", worried it makes them look like they took a wrong turn. The opposite is true: **being able to describe what you threw away is the strongest authenticity signal available.** People who copied a tutorial have nothing to discard.

## If you don't have a project yet

Don't rewrite the résumé. Rewriting won't fix this.

Build one with constraints instead. Set a ceiling on cost per thousand calls, set a p95 latency target, and assume a subset of data cannot leave the local environment. Build a small system underneath all three.

Self-imposed constraints are fine. The interviewer asks how you made decisions under constraint, not who handed you the constraint.

The [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) outline works as a reference for ordering: Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Memory → Harness Engineering → Model Layer → Observability and Evals. 10 phases, 290 lessons, 68 interactive labs, 59 live sessions. That final phase carries 27 lessons of evaluation work, which maps precisely onto the first two follow-up questions above.

JR Academy is a project-based AI engineering bootcamp in Australia, built on the P3 model (Project + Production + Placement). The third P is exactly this — once the project is built, it still has to become a conversation someone wants to continue.

Cut to two. Then write those two properly.

---

**Want someone to look at yours?** [Bootcamp enrolment and enquiries](https://jiangren.com.au/bootcamp).

<!--
发布前人工必补：作者 byline（真实讲师 + LinkedIn），AI 不代填。
-->
