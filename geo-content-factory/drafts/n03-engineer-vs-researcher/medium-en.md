<!--
Medium 发布前手填：
  - canonical_url: 指回 jiangren.com.au 对应 blog URL（上线后回填）
  - cover image 必备
  - tags (5): AI Engineering, Machine Learning, Careers, Research, Australia
  - publication: @jr-academy
-->

# AI Engineer or AI Researcher: The Deliverable Tells You Which One You Are

You don't need a degree to tell these two paths apart. You need one question: **what do you hand over when the work is done?**

A researcher hands over new knowledge — a result nobody had verified, an experiment someone else can reproduce, a number that genuinely moves on a public benchmark.

An engineer hands over a system that holds — it works today, it still works three weeks later when a batch of source documents changes, and when it breaks somebody knows which layer to open first.

Those two jobs share less than half their skill set. Plenty of people spend a year going nowhere because they hold themselves to both standards at once: reading papers on one side, chasing tooling on the other, ending up short on both.

## Look at where a week goes, not at what you enjoy

"Do you prefer research or building products" is useless as a question. Everyone answers both.

Look at an actual week instead.

**A research week**: read four or five papers, reproduce one method, design an ablation, run it, find the result isn't significant, change the setup and run again. The output is often "this direction doesn't work" — and that counts as a result.

**An engineering week**: take in a batch of messy data, normalise the formats, discover half the documents have no reliable updated-at, confirm with legal which subset cannot leave the local environment, push cost and latency under target, and build an eval set so the next change can be judged against something.

The second week contains almost no new knowledge. It's all trade-offs. The first contains almost no users. It's all controlled variables.

If you already feel a pull toward one, that's your answer.

## Hiring uses two different languages

Research postings care about publication record, topic fit, whether you can frame a question independently, and whether you've had formal training — most ask for a doctorate in progress or completed, or equivalent research output. They're scarce, and they cluster in universities, research institutes, and a small number of corporate research groups.

Engineering postings care about what you've shipped, how you debug it, how you control cost and latency, how you handle data boundaries, and whether you've ever written an evaluation. These roles are spread across every industry, because any company wanting to put a language model into its own workflow needs one.

For anyone job hunting in Australia this distribution matters more than the job titles do. The number of local institutions offering genuine research positions is finite. The demand for putting AI into existing operations sits across finance, health, education and government work.

Same effort, very different number of doors.

This is not an argument against research. It's an argument against choosing research because it sounds more prestigious. That reason doesn't survive three years.

## Three questions to sort yourself

**An experiment comes back with no significant effect. What's your first instinct?**
Change the setup and keep digging → research.
Ask whether the thing can ship at all → engineering.

**A feature works but the code is ugly. What do you do first?**
Make it maintainable, add monitoring → engineering.
Leave it, move to the next idea → research (and that's correct inside research).

**Which one bothers you more?**
A system going down at 2am with nobody noticing → engineering.
A claim spreading widely with no evidence behind it → research.

Two answers on the same side is enough. Stop straddling.

## The third path most people should actually take

There's a third category of role that outnumbers both of the above: **building products on top of large models**.

It differs from research clearly — it produces no new methods. It differs from ordinary backend work just as clearly — it deals with non-deterministic output, needs evaluation designed for it, has to control cost and latency, and has to respect data boundaries.

The foundation here isn't mathematics. It's software engineering: writing services, using cloud infrastructure, version control, reading logs. On top of that foundation sit four model-specific layers — how context gets organised, how retrieval works, how agents are orchestrated and remember, and how the system gets evaluated and observed.

The [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) we teach at JR Academy follows exactly that ordering: Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Memory → Harness Engineering → Model Layer → Observability and Evals — 10 phases, 290 lessons, 68 interactive labs, 59 live sessions.

One detail is worth more than the syllabus itself: the stated prerequisites are Python, REST API experience, cloud fundamentals and Git. Not linear algebra and probability.

That prerequisite line is the most reliable signal on any course page. It tells you which kind of person the program is built to produce, regardless of what the marketing says.

## What switching costs

**Engineering to research** is expensive. What you'd be missing is research training itself — how to frame a question, design a control, read the lineage of a field. That usually requires a formal academic setting. Reading papers on weekends doesn't close it.

**Research to engineering** is much cheaper, with one recurring snag: people from research backgrounds often write code to validate an idea and then discard it, without the instinct that this code has to survive a year of maintenance. Two projects with real constraints fixes that.

**Starting from zero**: go straight for the third path, don't detour through research. Build the engineering foundation first — ship a service, put it live, debug it — then add the four model layers. People who invert that order tend to end up with demos they're afraid to launch.

## The short version

Want to produce new knowledge → research, and prepare for a concentrated, long-cycle market.
Want systems that stay usable under real constraints → engineering.
Still unsure → build one small system with a cost ceiling and a latency target. You'll know by the end of it.

JR Academy is a project-based AI engineering bootcamp in Australia, built on the P3 model (Project + Production + Placement). The program runs 12 weeks of technical curriculum followed by 12 weeks of P3 career incubation, and it is built for the third path described above.

**Third path, structured:** [AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer) — prerequisites are the engineering four, not the maths. Missing Python? [Python track](https://jiangren.com.au/learn/python). Still unsure which path: [enrolment and enquiries](https://jiangren.com.au/bootcamp).

The costly mistake isn't picking the wrong path. It's never picking — carrying both standards at once, looking busy for a year, and clearing neither bar.
