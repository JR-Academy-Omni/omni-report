<!--
Medium 发布前手填：
  - canonical_url: 指回 jiangren.com.au（master 上线后回填）
  - cover image 必备
  - tags (5): AI Engineering, Frontend, Backend, Career Change, Australia
  - publication: @jr-academy
  - 文中 backlink 2-3 处（已放 /learn/ai-engineer、/learn/python、/bootcamp）
-->

# Frontend, Backend, Full-Stack: Three Different Shortcuts Into AI Engineering

The prerequisites for JR Academy's [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) are Python, REST API experience, cloud fundamentals and Git.

Line those four up against what three kinds of engineers already have, and something becomes obvious.

| Prerequisite | Frontend | Backend | Full-stack |
|---|---|---|---|
| Git | yes | yes | yes |
| REST APIs | yes (consuming) | yes (producing) | yes (both) |
| Cloud fundamentals | partial | yes | partial to yes |
| Python | usually not | depends on stack | depends on stack |

The difference isn't how much is missing. It's *which* piece is missing.

Almost every "transition into AI" path on offer is the same path: start with Python syntax, cover API calls, cover RAG, cover agents. Backend engineers get made to relearn REST. Frontend engineers get dropped into infrastructure content with no connection to anything they've built. Both waste months.

Here's the split by starting point: what you already have, what you're actually missing, the first project worth building, and the trap specific to your background.

## Frontend → AI product engineering

**What you already have**: Git, experience consuming APIs, instincts for state management, and the most underrated one — experience presenting uncertainty to users.

Failed requests, loading states, partial data rendered first. You do this daily. Model output is exactly that: uncertain, streamed, prone to failure. That experience transfers directly. Don't discard it as "not AI".

**What you're actually missing**:

- Python, or at least enough to read what your backend colleague writes
- Streaming: SSE, token-by-token rendering, mid-flight cancellation. Not the request-response model you know
- Cost awareness: your interaction design decides how many calls fire. A search-as-you-type pattern can multiply spend tenfold
- Structured output validation: model JSON isn't guaranteed valid. Whether the frontend absorbs that, and how far, is an architecture decision, not defensive code

**First project worth building**: a streaming chat interface with three constraints — cancellable mid-response (stop actually stops, and billing stops), recoverable after a dropped connection, and non-crashing when the model returns malformed structure.

Those three constraints separate a toy from a product.

**The trap**: treating a model endpoint as a smarter REST endpoint. It isn't. For a normal API, failure is the exception. For a model API, failure is routine. Design the interaction for frequent failure, not occasional failure.

## Backend → AI infrastructure

**What you already have**: usually three or four of the four prerequisites. But the real advantage is elsewhere — you already think in concurrency, timeouts, retries, rate limits, idempotency and observability.

That's precisely what AI engineering lacks most. Most AI demos die in production not because the model was inadequate, but because nobody applied backend standards to it.

**What you're actually missing**:

- Testing non-deterministic output: the same input gives different results twice. How do you write a test, and what does "regression" mean now
- Evals. This is the genuinely unfamiliar one. Traditional backend correctness is binary; model correctness is distributional. You need an evaluation set and a threshold, not an assertion
- Context organisation: why the same information, arranged differently, produces very different results
- The cost model: spend scales with context length, which has no equivalent in ordinary backend work

**First project worth building**: add model capability to an endpoint you already own, then build an eval around it — at least thirty input/output pairs, runnable in one command, producing a verdict on whether your change helped.

Skip the eval step and everything before it is decorative.

**The trap**: writing unit-test-style assertions against model output, watching them pass and fail at random, and eventually not testing at all.

## Full-stack → agent engineering

**What you already have**: the end-to-end view. You know the whole path from interface to service to storage — scarce in agent work, because **an agent is fundamentally a cross-layer orchestration problem, not a model problem**.

**What you're actually missing**:

- Orchestration: how to decompose a multi-step task, where state lives, which step to resume from after a failure
- Tool exposure: giving a model access to system capabilities, and drawing the permission boundary. Get this wrong and it's a security incident, not a bug
- Memory: what to store, for how long, and how to retrieve it next time
- Some of both other lists — often Python depth or eval experience

**First project worth building**: a three-or-more-step automated flow where every step can fail, and the whole thing is recoverable — not by rerunning from the top, but by continuing from the failed step.

It sounds modest. It forces you to work out state, idempotency and retries properly.

**The trap**: reaching for the heaviest orchestration framework on day one. Most cases need three steps and a loop. Get the simple version working, then decide whether a framework earns its place — otherwise you spend a fortnight configuring instead of solving.

## The stretch all three share

Whichever door you come in through, two blocks are unavoidable — the first and last in the [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) outline.

**Context Engineering sits before RAG**, deliberately. Build retrieval without knowing how to organise context and you get something that retrieves but doesn't answer.

**Observability and Evals is its own phase, 27 lessons.** Everything before it determines whether you can build the thing. That block determines whether the thing survives.

The full outline is public: 10 phases, 290 lessons, 873 steps, 68 interactive labs, 59 live sessions, ordered Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Memory → Harness Engineering → Model Layer → Observability and Evals. If Python is the gap, the [Python track](https://jiangren.com.au/learn/python) covers that piece separately.

## One note on the Australian market

The three routes meet different demand locally, but what they share matters more: **any company wanting to put a language model into its own operations needs one of these three profiles**, not a research profile.

Work touching finance, health or government adds a local threshold — whether data may leave the local environment. That's an advantage for the backend route, since you already handle constraints of that shape, and a deliberate gap to close for the frontend route.

## Don't zero out what you already know

All three groups make the same mistake: treating several years of engineering experience as irrelevant the moment they move toward AI.

It's the reverse. The scarce thing in this field was never knowing what RAG is. It's knowing how a system stays alive under real constraints — which is the part you already have.

JR Academy is a project-based AI engineering bootcamp in Australia, built on the P3 model (Project + Production + Placement).

Work out which piece you're missing before deciding where to start. Sending all three profiles down one path is the expensive option.

---

**Not sure which piece is missing?** [Bootcamp enrolment and enquiries](https://jiangren.com.au/bootcamp).

<!--
发布前人工必补：作者 byline（真实讲师 + LinkedIn），AI 不代填。
-->
