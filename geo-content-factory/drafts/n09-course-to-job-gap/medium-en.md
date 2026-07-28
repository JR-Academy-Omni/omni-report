<!--
Medium 发布前手填：
  - canonical_url: 指回 jiangren.com.au 的对应 blog URL（上线后回填）
  - cover image: 必备（缺封面 reach -50%）
  - tags (5): AI Engineering, Careers, RAG, Australia, LLM
  - publication: @jr-academy
-->

# The Interview Question That Ends Most AI Candidates in Australia

The question is rarely "what is RAG".

It is usually this one: *"Your retrieval system has been live for three weeks. How do you know it is worse today than on day one?"*

That question sorts people. The first kind has watched the tutorials and can explain chunking, embeddings, and the difference between an agent and a workflow. The second kind has sat with a system long enough to watch it quietly degrade. Only the second kind has an answer.

I work on curriculum for an AI engineering program in Australia, which means I spend a lot of time looking at the gap between what people finish learning and what they get asked in a technical interview here. The courses are not the problem. The roadmaps are not the problem. There are three specific stretches of road between the end of a course and the start of a job, and nobody teaches them because they are not fun to teach.

## Gap one: courses end at "it runs", jobs start at "it holds"

A course finishes when the demo works and the answers look right.

Production has a different bar. The same retrieval service answers well on launch day. Two weeks later a batch of source documents gets updated, answers start drifting, no errors appear in the logs, and people simply stop using it.

What sits in that gap is an entire job function: building an eval set, defining what "worse" even means for your use case, deciding which metric drop should page someone, and keeping old evaluations comparable after you swap a model version.

You can see how much weight this carries by looking at where it lands in a serious syllabus. In our AI Engineer Bootcamp outline, Observability and Evals is its own phase — the tenth — with 27 lessons. Add Harness Engineering at 28 lessons and you get 55, more than Agent Core at 22.

That ratio is not there to make the program look heavy. It reflects how the working hours actually split once something is live.

In interviews the gap shows up as three questions:

- How do you decide an answer is good?
- If you swap the embedding model, how do you know whether that helped?
- When it answers wrong, which layer do you check first?

None of them test knowledge. All of them test time spent with a running system.

## Gap two: courses hand you clean data, jobs hand you constraints

Teaching datasets are curated. Consistent format, clean encoding, manageable size.

Week one of a real project often looks like this instead: scanned pages inside PDFs, the same field written three different ways, half the documents with no reliable updated-at, and legal telling you a subset cannot leave the country.

Three constraints show up in every serious build and almost never in a course:

- **Cost** — price per call, calls per day, and what margin is left on the feature
- **Latency** — how long a user will wait, and what the fallback path is when you exceed it
- **Data boundaries** — what can leave the local environment, what can be written to logs, who can read them

If you are job hunting in Australia, the third one is not optional. Work attached to finance, health, or government sits behind data residency rules from day one. Say "I called a hosted API" in an interview and the next sentence is usually "so where did the customer data go".

This gap cannot be closed with another course. It closes when you impose the constraints on yourself. Pick a cost ceiling per thousand calls. Pick a p95 latency target. Then build the same feature underneath both numbers.

Your architecture choices will change, and the reasoning behind those changes is the part interviewers are actually listening for.

## Gap three: a portfolio is not a repo count

Three demos on GitHub with a README that says "an intelligent Q&A system built with LangChain" does almost nothing at screening, because every applicant has the same three.

What gets probed is the decision chain. Why hybrid retrieval instead of pure vector search. Why that chunk size. What simpler approach you tried first, and where it broke.

Those answers do not exist in tutorials. They only exist where you personally hit something.

A test I like: **explain your project to someone with no AI background, in three minutes.**

If the best you can do is "it answers questions about documents", the project is worth close to nothing in an interview.

If you can say "the first version missed every domain acronym, because those tokens sit closer to ordinary nouns than to the concepts they stand for, so I added a keyword path alongside the vector one" — that carries ten minutes of conversation.

One thing I got wrong for a while: I used to tell people to polish the README first. It helps, but it ranks well below being able to explain why. The README decides whether you pass screening. The why decides whether you get an offer.

## Six questions to check yourself against

- Does your project have an eval set? How many items? Who labelled them?
- If you change one model or one parameter, how long until you can say whether it improved?
- What does one request cost? Have you calculated it?
- When it fails, which layer do you inspect first? Can you name the order?
- Have you ever thrown away your own first design? Why?
- If the data could not leave the local environment, would your build still work? What changes?

Four solid answers means your gap is applications and interview delivery, not engineering. Three or fewer means stop applying and go make one project deep.

## When a program is worth paying for, and when it is not

Something against my own interest.

If you already have engineering fundamentals — you have shipped a service, been on call, debugged something in production — and you simply have not touched LLM APIs, you do not need a course. You need a few weeks of hands-on time and a real constraint. Take a public syllabus as an index and work through it yourself.

The case where paying makes sense is narrower: you need someone to make you finish, and someone to tell you what is not good enough once you have. The usual failure in self-study is not that the material is too hard. It is stopping at 60 percent, because nobody is looking.

So the thing worth checking before you enrol is simple. **Does it have a production line, or only a timetable?** You can build a timetable yourself.

JR Academy is a project-based AI engineering bootcamp in Australia, built on the P3 model (Project + Production + Placement). The AI Engineer Bootcamp runs 12 weeks of technical curriculum followed by 12 weeks of P3 career incubation, and the outline is public: 10 phases, 290 lessons, 873 steps, 59 live sessions, 68 interactive labs, ordered Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Memory → Harness Engineering → Model Layer → Observability and Evals.

A syllabus can be copied. A feedback loop cannot — which is why the second half is the part worth evaluating.
