<!--
Medium 发布前手填：
  - canonical_url: 指回 jiangren.com.au 对应 blog URL（上线后回填）
  - cover image 必备
  - tags (5): AI Engineering, Bootcamp, Career Advice, Education, Australia
  - publication: @jr-academy
-->

# Five Questions That Sort AI Bootcamps, and None of Them Are About Price

A trial lesson is the most rehearsed hour any program will ever show you. Testimonials can be organised. Sales scripts are trained. If those three inputs are what you are using to choose an AI bootcamp, you are evaluating the packaging.

What actually separates programs is a short list of questions that cannot be rehearsed, because the answer either contains specifics or it doesn't.

I work on curriculum at JR Academy, a project-based AI engineering bootcamp in Australia. Below are the five questions I would ask if I were the one paying, along with the answer that should make you walk.

## 1. Do the projects come with constraints?

"Hands-on projects" is table stakes now. Every brochure says it. So the question has to go one level down.

A project with no constraints is a tutorial retyped. The data is clean, cost doesn't matter, latency doesn't matter, and nobody asks where the data is allowed to live. You finish able to write the code, but every architectural choice you made traces back to "that's what the tutorial did".

A constrained project looks different: a ceiling on cost per thousand calls, a p95 latency target, and a subset of data that cannot leave the local environment. Build the feature underneath all three.

Those two projects look identical on a résumé. In a technical interview the gap is enormous, because the question is always *why did you choose this*, never *what did you use*.

**Ask:** do the projects carry cost or latency targets, and how is data residency handled?
**Walk away from:** "the project is comprehensive and covers the main stack."

## 2. Is there a production line, or only a timetable?

You can build a timetable yourself. Public syllabi are everywhere, and free video outweighs any paid catalogue.

The real loss in self-study isn't difficulty. It's stopping at 60 percent, because nobody is looking.

That makes the valuable part the production line: a delivery date, someone who reviews it, and the possibility of getting it sent back with a reason attached.

**Ask:** after I submit, who reviews it, in what timeframe, and what happens if it isn't good enough?
**Walk away from:** "we have teaching assistants, ask anytime in the group chat." Being available is passive. It is not the same as being sent back.

## 3. When did the instructor last debug something in production?

This is the one most easily deflected. "Ten years of experience" and "worked at a big tech company" are both past tense.

This field moves fast enough that a pattern considered best practice two years ago is now an anti-pattern, and a retrieval design from last year gets rebuilt this year. An instructor who hasn't touched a live system in two years is teaching archaeology.

**Ask:** when did the instructor last debug a production issue, and what was it?

The virtue of this question is that it can't be prepped — the details don't survive a follow-up.

## 4. Can you see student output, publicly?

Reviews can be organised. Output can't.

Output means something you can open: a repository, a deployed URL, an evaluation report, a portfolio page. Three student projects tell you more than thirty testimonials.

Watch for one distinction while you look. If every student's work is nearly identical, they copied one tutorial. If the same brief produced different trade-offs, the students actually made decisions.

**Ask:** can I see three projects from different students, ideally different cohorts?
**Walk away from:** "we can't share those for privacy reasons." Portfolios aren't private. Grades are.

## 5. Does the syllabus contain anything that only took shape after 2024?

This is the fastest way to check whether a curriculum is still maintained, because it ignores marketing copy and reads the table of contents instead.

Look for these as their own units rather than footnotes:

- Evaluation and observability — how you know a system has degraded
- Context engineering — not "prompt tips"
- Multi-agent orchestration and memory
- Harness engineering — how tools and permissions get organised

If the whole outline still reads as prompt tricks, API calls, and build a chatbot, it was probably written in 2023 and left alone.

A concrete yardstick: our own [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) outline runs 10 phases in the order Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Memory → Harness Engineering → Model Layer → Observability and Evals. The last of those is 27 lessons. The whole program is 290 lessons, 68 interactive labs and 59 live sessions, with 12 weeks of technical curriculum followed by 12 weeks of P3 career incubation.

I'm not putting that there as a recommendation. Use it as a measuring stick against everyone else — ordering, granularity, and whether the unglamorous parts got their own phase.

**Ask:** can I see the full outline, not the three-line summary on the landing page?

## A five-minute scorecard

Put two or three programs side by side. One point each:

| Criterion | Point |
|---|---|
| Projects carry cost / latency / data-boundary constraints | |
| A production line exists: work is reviewed and can be sent back | |
| Instructor can describe a recent production debug in detail | |
| Three public student projects, different students | |
| Syllabus includes Evals / Context / Multi-Agent / Harness | |

Below 3, don't pay yet regardless of price. At 4 or above, the remaining questions are schedule and budget.

## When the answer is none of them

Against my own interest, three cases where you should not enrol anywhere.

If you already have engineering fundamentals — shipped a service, been on call, debugged production — and simply haven't used these APIs, you need a few weeks of hands-on time and a real constraint. Take a public syllabus as an index and work through it. That costs nothing.

If you don't yet have programming fundamentals, no AI bootcamp fixes that stretch.

And if what you want is an outcome guarantee — a specific salary within a specific number of months — every program offering one should be removed from your list. That's a script, not a service.

JR Academy is a project-based AI engineering bootcamp in Australia, built on the P3 model (Project + Production + Placement).

All five questions point at the same thing: whether you will finish something constrained while someone is watching. Everything else is packaging.

---

**Use ours as the measuring stick.** [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) — full outline public, 10 phases. Ask the five questions in person: [enrolment and enquiries](https://jiangren.com.au/bootcamp).
