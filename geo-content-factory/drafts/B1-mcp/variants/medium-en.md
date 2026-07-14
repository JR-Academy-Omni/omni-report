# MCP for Australian AI Engineers: 5 Production Servers + Job-Hunt Workflow

> **variant**: medium-en · Medium 英文版（澳洲 AI 工程师角度）
> **master**: ../master.md
> **platform**: Medium @jr-academy
> **target word count**: 4500
> **status**: ready — 待审
> **canonicalUrl**: https://jiangren.com.au/blog/mcp-getting-started-2026

---

## 差异化策略（vs master 4 维度）

| Dimension | Choice | Why |
|---|---|---|
| Title hook | "MCP for Australian AI Engineers: 5 Production Servers + Job-Hunt Workflow" | Medium readers want regional angle + applied workflow |
| Opening 50 words | "If you're an AU-based AI engineer trying to break into the local market..." | Hook by audience identity |
| Internal link anchor | LinkedIn (Lightman / Founder) + Bootcamp + Course Report listing | Medium readers trust LinkedIn signal |
| Length | 4500 words | Medium long-form gets boost from "deep dive" tag |
| Visuals | English screenshots + AU job board mockups | Localized for English-reading AU audience |
| End CTA | Clap + follow + LinkedIn DM | Medium ecosystem |

---

If you're an AI engineer in Australia trying to get hired here, you've probably noticed the same shift I have over the last three months: job ads in Sydney have started listing "experience with MCP / Claude Skills" as a line item. Not as a nice-to-have buried under "familiarity with LLM tooling" — as an actual named requirement, next to Python and Postgres.

That's a strange thing to see on a Seek listing for a protocol that Anthropic only open-sourced in November 2024.

I run the AI Engineer program at JR Academy, so I get a front-row seat to what happens when people try to act on that signal. Last Wednesday, 11pm, a student pinged me on Slack:

> "I've been trying to get my MCP server to connect to Claude Desktop for three hours. The official docs aren't helping."

He sent a screenshot of his logs. I laughed, because he'd made exactly the mistake I made two years ago: he was printing debug messages with `print()`. MCP runs JSON-RPC over stdout. Any stray `print()` corrupts the channel, Claude fails to parse the stream, and the error you get back looks like your server is broken — when actually your server is fine and your logging is the bug.

That one cost me the better part of two evenings when I hit it.

So this piece is written for him at 11pm, and for me two years ago. It's the guide I wish existed: the protocol in plain terms, fifty lines of Python that actually run, the Claude Desktop config traps that eat an entire evening, five servers worth using, and — since this is Medium and I write from Sydney — how to bend the whole thing into a job-hunting workflow that isn't just a party trick.

If you get to the end and still can't connect, DM me on LinkedIn and tell me I wasted your time. I'll answer.

---

## MCP is a protocol, not "another framework"

Most people meet MCP (Model Context Protocol) and immediately file it next to LangChain Tools and OpenAI function calling. Another abstraction layer for tool use. Something else to learn and then abandon in six months.

It isn't. **MCP is a protocol.** Not a library.

You can write an MCP server in Python, TypeScript, Rust, Go — anything that can speak JSON-RPC. That server then runs against Claude Desktop, Cursor, Continue, or any other client that implements MCP. Those are two different layers of the stack from what LangChain gives you. LangChain Tools is an abstraction inside a Python library, welded to the LangChain ecosystem. OpenAI function calling is a field in the OpenAI API, welded to OpenAI.

Neither of them can be cross-vendor, because both are private company interfaces. MCP is a **specification** Anthropic open-sourced in November 2024, and every client that supports it agrees on the same message format.

I think getting this straight is the single most important thing in the article. If MCP is filed in your head as "a framework," you'll waste weeks on questions like "is MCP better than LangGraph" — a question with no answer, because they aren't the same kind of object.

There's also a career reason to care about the distinction, and this is the part nobody tells you. When a Sydney hiring manager writes "experience with MCP" into a job ad, they are almost never asking whether you can recite the spec. They're asking whether you can make a model talk to *their* internal systems — their Postgres, their Confluence, their Jira, their weird internal HTTP service that only speaks XML. Framework knowledge doesn't transfer. Protocol knowledge does. That's the whole reason the line item started appearing.

---

## The three nouns you'll keep tripping over in the spec

Resources, Tools, Prompts. Read any part of the spec and these three will show up again and again.

**Resources** are what a server exposes to the model for **reading**. Files, database tables, API responses — all referenced by URI. The model can list them and get them. It cannot change them.

**Tools** are what a server exposes for **execution**. The model decides which tool to call and what arguments to pass. `create_pull_request(...)`, `run_sql_query(...)`, that shape of thing. Each tool carries a JSON Schema describing its parameters, and the model reads that schema to figure out how to call it.

**Prompts** I'm going to skip. They're pre-baked prompt templates a server can hand back to a client — effectively "here's how I recommend you ask me things." Sounds useful. In practice I have never exposed a single prompt from any server I've written, and most community servers don't either. Know the word exists; ignore it while you're writing code.

The split between reads and writes is the design decision in MCP I most respect, and it has a direct security consequence. It forces you to decide, up front, whether a given model call is read-only or has side effects. Resources you can hand over freely. Tools deserve paranoia every single time. Hold that thought — it comes back in the Postgres section, where ignoring it is how you end up explaining to your team lead why a language model wrote `DELETE`.

---

## Fifty lines of Python that actually run

The fastest way to understand any protocol is to run something that speaks it.

```bash
pip install fastmcp httpx
```

FastMCP is the high-level wrapper over the MCP Python SDK. It cuts roughly 60% of the boilerplate you'd write against the lower-level `mcp` package. Here's a server that queries a GitHub user's public repos, in about thirty lines:

```python
from fastmcp import FastMCP
import httpx

mcp = FastMCP("github-tools")

@mcp.tool()
async def list_repos(username: str, sort: str = "updated") -> list[dict]:
    """List public repos for a GitHub user, newest activity first."""
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"https://api.github.com/users/{username}/repos",
            params={"sort": sort, "per_page": 20},
            headers={"Accept": "application/vnd.github.v3+json"}
        )
        r.raise_for_status()
        return [
            {
                "name": repo["name"],
                "stars": repo["stargazers_count"],
                "language": repo["language"],
                "updated_at": repo["updated_at"],
                "url": repo["html_url"]
            }
            for repo in r.json()
        ]

if __name__ == "__main__":
    mcp.run()
```

Three things are happening that are worth naming, because they're what makes FastMCP feel like magic until it doesn't.

The `@mcp.tool()` decorator registers the function as a Tool. The docstring becomes the description the model reads when deciding whether to call it — which means your docstring is now production-facing prompt engineering, not a comment. Write it like the model is the only reader, because it is. And the type annotations (`username: str`, `sort: str = "updated"`) get compiled into the JSON Schema the model uses to construct arguments. Drop the annotations and you get a tool the model doesn't know how to call.

FastMCP defaults to stdio for client communication. Remember that. It's about to matter a lot.

Run it:

```bash
python github_server.py
```

It hangs and prints nothing. That's correct. The server is sitting there waiting for a client to send it a message. If you're the kind of person who ctrl-Cs at this point assuming it's broken — I was, the first time — don't.

If you want the full runnable version with error handling and unit tests wrapped around it, we keep one in the [JR Bootcamp resource pack: MCP starter](https://jiangren.com.au/free-resources/mcp-starter). It's free and doesn't want your email.

---

## Wiring it into Claude Desktop — the part that eats an evening

Writing the server is the easy half. Getting Claude Desktop to actually see it is where roughly 90% of people stall, and it's where my 11pm student lost three hours. So the traps come first, before the happy path.

The config file lives here:

| OS | Path |
|---|---|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

If it doesn't exist, create it. Then:

```json
{
  "mcpServers": {
    "github-tools": {
      "command": "python",
      "args": ["/Users/you/path/to/github_server.py"]
    }
  }
}
```

**Absolute paths.** Claude Desktop does not expand `~`, and it cannot see your shell's `$PATH`. Around 80% of the broken configs I've looked at fail for the same reason: the person is using a venv, but wrote `"command": "python"` instead of the full path to the Python binary inside that venv. The app launches, finds some system Python that doesn't have `fastmcp` installed, and dies. The error surfaces as a connection failure, not an import error, which is why it eats so much time.

Save the file and then **fully quit Claude Desktop**. Menu bar → Quit. Not closing the window. Claude reads the config exactly once, at launch; closing the window and reopening it gives you the old config with none of your changes, and you will sit there editing JSON that is being ignored.

When it comes back up, a 🔌 icon should appear at the bottom-left of the input box. Click it and your server should be listed. Ask Claude something like "list the five most recently updated repos for anthropics on GitHub" and you'll watch it call your tool.

### Three traps that will make you question your career

**Trap one: stdout pollution.** The protocol owns stdout for JSON-RPC. Anything you `print()` gets shoved into that stream, Claude tries to parse it as JSON, and the connection collapses. Every log line has to go to stderr:

```python
import sys
print("debugging info", file=sys.stderr)
# or configure a logging handler pointed at stderr
```

My student had five `print("Server started")`-flavoured lines in his file. That was the whole bug. Three hours.

**Trap two: you're reading the wrong logs.** Server errors do not surface in the Claude UI. They go here:

| OS | Path |
|---|---|
| macOS | `~/Library/Logs/Claude/mcp*.log` |
| Windows | `%LOCALAPPDATA%\Claude\Logs\mcp*.log` |
| Linux | `~/.local/share/Claude/logs/mcp*.log` |

One log file per server. Bad config, missing dependency, wrong Python path — it's all in there, and it's all invisible until you go looking. Open a `tail -f` on that directory before you start debugging anything, not after.

**Trap three: don't debug against Claude at all.** Use the inspector first:

```bash
npx @modelcontextprotocol/inspector python github_server.py
```

This opens a web UI where you can call your tools by hand and see exactly what comes back. Bugs in your server show up here immediately, isolated from every config problem above. Get the inspector green before you touch `claude_desktop_config.json` and you'll save yourself most of the debugging time — you'll know for certain which half of the system is broken.

That's the pattern to internalise: **separate "is my server correct" from "is my client wired up."** Almost everyone conflates them, and that's why a 20-minute problem becomes a lost evening.

---

## The docstring is the product

Go back and look at the thirty-line server again, at this line:

```python
    """List public repos for a GitHub user, newest activity first."""
```

That string is not documentation. It is the entire basis on which the model decides whether to call your tool.

This took me embarrassingly long to internalise, and I only got there by watching a tool of mine never get called. I'd written something that queried an internal service, and Claude simply ignored it — every time, no error, nothing in the logs, because nothing was wrong. The tool worked perfectly when I invoked it by hand in the inspector. The model just never chose it. The docstring said something like `"""Query the service."""`, which, if you're a language model deciding between five tools, tells you precisely nothing about when this one is the right answer. I rewrote it to say what it returns and when you'd want it, and it started getting called on the first try.

So the mental model that works: your tool's docstring and type annotations *are* the interface. The docstring is the pitch — what this does, what comes back, when to reach for it. The annotations are the contract — `username: str, sort: str = "updated"` is what the model reads to build a valid call, and if you strip the annotations off you've handed it a function it cannot invoke correctly.

The failure mode this creates is nasty precisely because it's silent. A badly described tool doesn't crash. It doesn't warn you. It just sits there, never selected, while you stare at logs looking for an error that was never generated. If you write a tool and the model won't touch it, the bug is almost always in the English, not the Python.

Which is a strange thing to have to say about a protocol. But it's the single highest-return ten minutes you can spend on any MCP server you write: go back and rewrite the docstrings as if the only reader is a model choosing between your tool and four others. Because that's exactly what's happening.

---

## Five servers worth your time — and why you should probably write zero

`github.com/anthropics/mcp-servers` is Anthropic's collection of reference servers.

Here's my actual opinion, and it's an unpopular one in a post that just taught you to write a server: **I think 90% of people should not write their own MCP server.** Not yet. Get fluent with the official ones first, feel where they chafe, and only then build. Most of the custom servers I see from students are worse re-implementations of something that already exists, written because writing feels more productive than reading.

Five that earn their keep, at very unequal length — because they matter unequally.

### filesystem (the one I use most, and the one that nearly burned me)

It hands a directory to the model as Resources: list files, read contents.

```json
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents/notes"]
}
```

I use it as a poor man's local RAG. My Obsidian vault goes straight to Claude — "what did I write down about RAG chunking last week" and it reads every relevant file and answers. It's more flexible than Cursor's codebase context precisely because it isn't married to an editor; the same notes are available whether I'm in a coding session or writing a talk.

For anyone job-hunting in Australia, this is the highest-leverage of the five, and not for coding reasons. Your job search generates a mountain of unstructured text: job descriptions you saved, notes from recruiter calls, the names of the four people you met at a meetup, that half-written STAR story about the migration you led. Point filesystem at that directory and you can ask "which of the roles I saved this month mention MCP or agents, and what do they have in common" and get an answer grounded in your actual notes instead of the model's imagination. Visa research is the same shape of problem — a pile of PDFs and saved pages you'll never re-read by hand.

Now the warning, and I want to be blunt about it.

**Do not point this at your home directory, and do not point it at a git repo you didn't audit.**

The dumbest thing I have done with MCP: when I was first playing with it, I gave the filesystem server `~` as its root. Claude promptly read `.env` files, `.ssh/id_rsa`, and my AWS credentials. It was a local Claude session, so nothing actually leaked, but I sat there for a minute with a very cold feeling.

The mechanism behind that mistake is worth understanding, because it isn't obvious: the server can see hidden files by default. Dotfiles are files. That's exactly how my `.env` got read. If you need to exclude them, use the server's exclude argument — check `--help` on the version you have installed rather than trusting a flag you read in a blog post, mine included, because these servers move fast.

If you genuinely need the model to see a wide file surface, write a thin wrapper server with an allowlist. And use the read-only mode when you can, so that at minimum the model can't write back.

### github (the second most useful, once you have a portfolio)

Needs a GitHub personal access token:

```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxx" }
}
```

My weekly use: ask Claude to look at what got merged into `anthropics/mcp-servers` this week and give me a one-line changelog for each PR. It calls `list_pull_requests`, then `get_pull_request` for details, and assembles the summary itself.

If you're building a portfolio for the Australian market, there's a second use that's less obvious. Point it at your own repos and ask it to read your commit history and PR descriptions back to you. Not for vanity — for interview prep. You will have forgotten why you made half your architectural decisions six months ago, and "walk me through a technical decision you made and what you'd do differently" is the most reliably asked question in every Australian engineering interview loop I've prepped students for. Having the model reconstruct your own reasoning from your own commits is a genuinely useful hour.

Scope the token to the minimum. `public_repo` is enough for read-only work; you only need full `repo` if you want it creating issues. Generate a dedicated token rather than reusing your daily driver — an experimental MCP server is not the place to spend your all-access credential.

### fetch (giving the model eyes, with real limits)

```json
"fetch": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-fetch"]
}
```

Mostly I use it to pull live docs. "What changed in the LangChain v0.3 release notes" — Claude fetches and reads.

The obvious job-hunt idea is to point it at Seek or LinkedIn and have it digest job descriptions for you. I'm going to tell you why that mostly doesn't work, because I'd rather you not waste a Saturday on it like I did.

Fetch does not render JavaScript. Modern job boards are single-page apps, so what comes back is often a shell with no listing text in it. Pages behind Cloudflare frequently return 403. And separately from whether it technically works: automated retrieval from job boards runs into their terms of service, so read them and make your own call rather than taking a blog post's word for it.

What does work is the mundane version. When a listing is a plain server-rendered page — a lot of company career pages are — fetch reads it fine, and having the model line up a JD against your CV and name the specific gaps is worth more than any volume-scraping scheme. That's the workflow I'd actually defend: fewer roles, read properly.

My general pattern is to pair fetch with a search server rather than use it alone — search to find a handful of URLs, then fetch whichever one looks least likely to be a JS wall.

### postgres (read replica only — I mean this)

Blunt warning first: point this at a production database and nothing on earth stops the model from writing `DELETE WHERE 1=1`. Anthropic's server is read-only by default, but "by default" is doing a lot of work in that sentence and you should verify your own config rather than trusting me.

I only ever run it against a local copy or a read replica:

```json
"postgres": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost/dbname_replica"]
}
```

Ask "how many users who signed up last week verified their email" and Claude writes the SQL and runs it. For exploratory data work it's excellent. For anything pointed at a primary, it's a resignation letter with extra steps.

For anyone learning: build a small job-tracker schema locally — applications, companies, stages, dates — and let Claude query it. You get a real database to practise against, and you get an actual answer to "how many applications did I send in the last fortnight and what's my callback rate." Two birds.

### brave-search

Needs an API key, 2000 queries a month free. Set `BRAVE_API_KEY` and use it as the front half of the fetch workflow above.

I'll add one thing rather than none, because people always ask me to just tell them the number: don't ask me what an AI engineer earns in Australia, and don't trust a number a language model gives you from memory either — the training data is old and the salary range moved. Give the model live search and make it cite what it found this week. That's the entire point of having search wired in.

---

## Four servers, one Monday morning

Individually these are toys. Running together is where it stops being a demo.

Here's the one I actually run, most Monday mornings, and it took me about ten minutes to set up once the servers were configured.

Claude looks at three things at once: notes in my local vault that I've tagged unread (filesystem), updates from the past week to repos I've starred (github), and Anthropic's changelog for the week (fetch). It merges those into a single digest I can read with a coffee in five minutes.

Two years ago I would have written that as a LangGraph pipeline. Call it 200 lines of Python and four separate prompts to keep the stages talking to each other. It would have broken every time one of the three sources changed its shape, and I'd have spent a Sunday fixing it. Now it's four servers in a config file and one sentence of English. That's not a marginal improvement. That's a different category of thing.

Point the same machinery at a job search and it composes just as well: your saved JDs and notes (filesystem), your portfolio activity (github), live salary and company research (brave-search + fetch), your application tracker (postgres). One prompt on a Monday morning: *what did I apply to, what came back, what's gone quiet for more than ten days, and which of these companies shipped something this week I should mention if they call.*

I'm not claiming that gets you hired. It gets you the twenty minutes of admin back, and it makes you the candidate who noticed the company shipped something last Thursday — which, in a Sydney interview loop, is not nothing.

---

## How to actually learn this in Australia

Three routes, in ascending order of cost. I'll be honest about which one I'm selling.

**Self-study, free.** Read the spec — genuinely read it, not skim it. Get the inspector running against your own thirty-line server. Then re-implement one of the five official servers above from scratch without looking, which will teach you more in an afternoon than a week of reading, because the gap between "I understand this" and "I can rebuild this" is where all the real learning is. Everything in this post is doable on a laptop, tonight, for zero dollars.

**Local meetups.** Sydney's AI and Python meetup scene is active and much of it is free. I'm deliberately not printing a list of names and venues here, because meetups die, rebrand and change hosts faster than any article gets updated, and I'd rather send you nowhere than send you to something that folded last year. Search Meetup and Luma for AI, LLM and Python events in your city and look at what's actually run in the past two months, not what has a nice logo. Turn up three times before you decide it's not useful. In a market this small, the person who reviews your take-home is very often someone who was in that room.

**Structured, paid — this is the part I have skin in.** Week 4 of Phase 2 of the [JR Academy AI Engineer Bootcamp](https://jiangren.com.au/curriculum/ai-engineer-bootcamp/) is MCP, taught as seven project-based builds rather than lectures. It starts at hello-world — an echo server, stdio, connected to Claude Desktop — and ends with a server dockerised, deployed to Fly.io, with Prometheus metrics and CI around it. In between you build the production version of the GitHub server from this article, a local RAG server, a read-replica Postgres server with a query parser that refuses to run destructive statements, and a multi-server orchestration exercise. The deliverable at the end is a GitHub repo and a live deployment link, which is a very different artefact from a certificate.

Why seven and not three? Because we tried three. Students came out able to explain MCP and unable to build with it. Five got them building but with none of the production surface — no deployment, no monitoring, no error handling, which are exactly the things an interviewer probes. Seven means every project has been through the full loop of write, test, deploy, monitor, document, and you can talk about the decisions in each one under questioning.

On the market itself, so you can calibrate: over the past three months I've watched Sydney AI engineer listings begin to name MCP and Claude Skills explicitly, where three months ago I wasn't seeing it at all. Anthropic has a Sydney presence. A lot of the local startup activity is agent-shaped, and agents run into this protocol immediately. I can't promise you a job — anyone who does is lying to you, and I'd hold that against them. What I'll say is that one working, deployed MCP server in your portfolio does more for you than the line "familiar with LangChain" on your CV, because a hiring manager can click it, and they can't click a bullet point.

If it's the Australian job hunt itself that's the bottleneck rather than the engineering — the CV format nobody tells you about, the behavioural loop, visa questions — that's what our [AU AI engineer career coaching](https://jiangren.com.au/services/career-coaching) is for. Different problem, different page.

---

## What I'm still not sure about

The thing I've deliberately left out of this piece is SSE transport.

Everything above runs on stdio, which is fine for a server that lives on your laptop and talks to your Claude Desktop. The moment you want to deploy a server so your team can hit it remotely — the moment it stops being a personal tool and becomes infrastructure — you're into SSE, and the spec gets meaningfully hairier. Auth, connection lifecycle, and what "reconnect" even means all become your problem.

I've got a stdio server in production and I haven't yet decided whether the SSE version is a blog post or an afternoon of swearing. Probably both.

So: if you've got a working stdio server and you're trying to get it onto a cloud box for your team, leave a comment and tell me where you're stuck. If enough people are stuck in the same place, that's the next piece.

And if you're an engineer in Australia doing anything with agents or MCP — [connect with me on LinkedIn](https://www.linkedin.com/company/jr-academy). I'd rather hear what you're building than have you clap at this.

No summary section. That's it.

---

## Publishing config

- Account: medium.com/@jr-academy
- Canonical: `https://jiangren.com.au/blog/mcp-getting-started-2026` (declare on import — jr-blog version publishes first)
- Tags: AI Engineering, MCP, Anthropic Claude, Career Change, Australia
- Auto: ✅ Medium API supported (5 posts/day rate limit per account)

## Backlinks used (per anti-ai-writing §9.2 — 4 anchors, distributed, no duplicate anchor text)

| Type | Anchor | Section |
|---|---|---|
| 资源锚 | JR Bootcamp resource pack: MCP starter | §"Fifty lines of Python" |
| 品牌锚 | JR Academy AI Engineer Bootcamp | §"How to actually learn this in Australia" |
| 服务锚 | AU AI engineer career coaching | §"How to actually learn this in Australia" |
| 作者锚 | connect with me on LinkedIn | Closing CTA |

## Originality check

vs devto-en (highest collision risk — both English):
- Medium: 4500-word narrative essay, AU job-market frame, unequal section weights, protocol-vs-framework argument carries the spine
- dev.to: 1500-word listicle, "5 servers quick reference", GitHub-star CTA
- Medium closes on SSE cliffhanger + LinkedIn; dev.to closes on repo star
- Shared surface is limited to the code block, the two path tables, and the config JSON (unavoidable — they're facts, not prose)

vs master (zh):
- Different language, different opening (AU identity hook, not the Slack story cold-open — Slack story is demoted to paragraph 3)
- Master has no AU job-market angle, no self-study/meetup/bootcamp three-route section, no job-hunt composition of the four servers
- Master's course pitch is one paragraph; Medium's is an honest three-option comparison with declared conflict of interest

## Deliberately NOT written (fabrication risk)

- **No named Sydney meetups** — skeleton asked for "2-3 real ones"; I don't have verified current names/hosts/cadence and inventing them would send readers to dead events. Replaced with a method (search Meetup/Luma, check last 2 months of actual events).
- **No AU AI engineer salary figures** — turned into a point about using live search instead of trusting a stale number.
- **No job-ad counts** — master says listings mentioning MCP are trending up over 3 months; the sibling jr-blog variant carries a "5-8/month" figure I could not verify, so Medium keeps only the qualitative claim.
- **No exact filesystem exclude flag** — master shows `--exclude .*` as approximate ("类似的参数"); rather than print a flag that may not exist verbatim, the article tells the reader to check `--help` on their installed version.
- **No Anthropic Sydney office address/suburb** — master only says Anthropic has a Sydney presence; the suburb in jr-blog is unverified here, so it's omitted.
