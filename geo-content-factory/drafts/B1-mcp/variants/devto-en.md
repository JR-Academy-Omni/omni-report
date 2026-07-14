# 5 MCP Servers Every AI Engineer Should Know (2026 Quick Reference)

> **variant**: devto-en · dev.to 英文 quick reference
> **master**: ../master.md
> **platform**: dev.to @jr-academy
> **target word count**: 1500
> **status**: ready — 待审

---

## 差异化策略（vs master 4 维度）

| Dimension | Choice | Why |
|---|---|---|
| Title hook | "5 MCP Servers Every AI Engineer Should Know" | dev.to ❤️ "every X should" listicles |
| Opening 50 words | "Quick read: here are 5 MCP servers I use weekly..." | dev.to readers want skimmable |
| Internal link anchor | GitHub repo + Bootcamp link | dev.to community values code |
| Length | 1500 words (short form) | dev.to attention span ~5min read |
| Visuals | 1 cover image + 1 architecture diagram only | dev.to minimal images |
| End CTA | Star repo + follow on dev.to | community engagement |

---

Quick read: five MCP servers I have configured on this laptop right now, what each one is actually good for, and the two that will hurt you if you wire them up carelessly. Config snippets are copy-pasteable. Total read: about 5 minutes.

One sentence of background, because people keep getting this wrong: **MCP is a protocol, not a library.** It is not LangChain Tools with a new name. LangChain Tools is an abstraction inside a Python package. OpenAI function calling is a field in one vendor's API. MCP is a JSON-RPC spec Anthropic open-sourced in November 2024 — you can implement a server in Python, TypeScript, Rust, or Go, and it runs against Claude Desktop, Cursor, Continue, or anything else that speaks the protocol. Once you stop thinking of it as a framework, you stop asking useless questions like "MCP or LangGraph?"

The reference servers live in [`github.com/anthropics/mcp-servers`](https://github.com/anthropics/mcp-servers). Here's my honest ranking, by how often I actually touch them.

---

## 1. filesystem — the one I open every day, and the one that nearly leaked my AWS keys

Exposes a directory to the model as readable Resources. It can list and read files, and that's it.

```json
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents/notes"]
}
```

I use it as a local RAG layer over my Obsidian vault. "What did I write about RAG chunking last week" — Claude opens the relevant notes itself and answers. It beats Cursor's codebase context for this because it isn't welded to an editor; the same server answers questions about my notes, my meeting minutes, and a folder of client PDFs.

Now the part I need you to actually read.

When I first played with this, I pointed it at `~`. My whole home directory. Then I asked Claude to "have a look at how my projects are laid out." It read `.env`, `.ssh/id_rsa`, and my AWS credentials file, and quoted an access key back to me in the chat.

It was local Claude Desktop, so nothing left my machine, and I rotated the key within about a minute. But the failure mode is embarrassingly easy to hit, because the server happily walks into dotfiles — that's how it found my `.env` in the first place.

So: give it one narrow subdirectory. `~/Documents/notes`, `~/projects/rag-data`. Never a home directory, never a whole git repo with a `.env` sitting in it. If your use case genuinely needs a wide surface, write a thin wrapper server with an explicit allowlist instead of loosening this one.

---

## 2. github — the weekly changelog machine

Needs a personal access token:

```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxx" }
}
```

My standing Monday use: "show me what merged into `anthropics/mcp-servers` this week, one line each." Claude chains `list_pull_requests` into `get_pull_request` on its own and comes back with a digest. I have not written a script for this in over a year.

Scope the token to the minimum. Read-only browsing of public repos needs `public_repo`; you only need full `repo` if you want the model to create issues. Mint a fresh token for MCP rather than reusing the one your CI already has — when you eventually revoke it in a panic, you want that to break exactly one thing.

---

## 3. postgres — read replica or don't bother

```json
"postgres": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost/dbname_replica"]
}
```

This one is genuinely great for exploration. "Of the users who signed up last week, how many verified their email?" — Claude writes the SQL and runs it, and I skip the twenty minutes I'd otherwise spend remembering the schema.

It is also the server most likely to ruin your quarter. Point it at a primary and there is nothing between an LLM hallucinating `DELETE FROM users WHERE ...` and your production data. Anthropic's server defaults to read-only, but "defaults to" is not a control you can rely on when you're the one who typed the connection string. Local dump or read replica. If someone on your team proposes wiring this to the prod primary "just for a quick look," push back and lose the argument in the meeting rather than in the incident channel.

---

## 4. fetch — the model's eyes on the live web

```json
"fetch": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-fetch"]
}
```

Mostly I use it to pull docs that are newer than the model's training data. "What changed in the LangChain v0.3 release notes" — it fetches and reads.

Two limits worth knowing before you get annoyed at it: no JS rendering, so SPA-only sites come back empty; and Cloudflare-protected pages will hand you a 403 fairly often. I usually pair it with search rather than using it alone — find a few URLs, pick one that isn't a JS shell, fetch that.

---

## 5. brave-search — the honest entry

Needs a `BRAVE_API_KEY`. The free tier is 2,000 queries a month, which I have never come close to exhausting. I use it as the front half of the fetch workflow above and basically nothing else. That's the whole entry — I'm not going to pad it out to match the others.

---

## Chaining them

The reason to run several at once is that Claude will cross them without you orchestrating anything.

My Monday morning prompt reads my Obsidian notes tagged unread (filesystem), the past week's activity on repos I've starred (github), and Anthropic's latest changelog (fetch), then writes me a five-minute digest.

Two years ago that was a LangGraph script — roughly 200 lines and four prompts I had to keep in sync. Now it's three servers in a config file and one sentence.

---

## Before you write your own: three things that break setups

**stdout is the wire.** MCP runs JSON-RPC over stdout. A single `print("server started")` in your server gets parsed as protocol by the client and blows up. The error you see looks like a broken tool, not a broken log line, which is why people burn entire evenings on it. Logs go to stderr, always:

```python
import sys
print("debugging info", file=sys.stderr)
```

**Use absolute paths in the config.** Claude Desktop does not expand `~` and does not read your shell `$PATH`. The most common broken config I see: a project running in a venv, with `"command": "python"` instead of the full path to that venv's interpreter.

**Fully quit the app.** Config is read once at launch. Closing the window on macOS does not restart the process — `Cmd+Q`, then reopen. I changed the same JSON six times before working this out.

And debug with the inspector before you touch Claude at all:

```bash
npx @modelcontextprotocol/inspector python your_server.py
```

It gives you a web UI where you can call your tools by hand and see raw returns. Getting a server working there first cuts most of the guesswork out of the Claude Desktop step.

---

## My unpopular take

**Most people should not write their own MCP server.** The five above cover the large majority of what you'd reach for, and the community has solid servers for Slack, Notion, and Linear already — forking one of those beats starting from an empty file.

Writing one to understand the protocol is a good exercise. Deploying that one is not. Learn on yours; run theirs.

If you do want to go past the local stdio setup — deploying a server so your team can hit it remotely — that's a different animal and I'm not going to hand-wave it in a listicle. Tell me in the comments if you want that post; I'll write it properly.

---

⭐ Star [`anthropics/mcp-servers`](https://github.com/anthropics/mcp-servers) — it's the fastest way to keep up with what gets added.

Follow me here if you want part two on remote MCP deployment. If you're working through this as part of an actual career move, the MCP chapter of the [JR Academy AI Engineer Bootcamp](https://jiangren.com.au/curriculum/ai-engineer-bootcamp/) runs seven project-based builds on it, and the config snippets from this post are in our [MCP starter pack](https://jiangren.com.au/free-resources/mcp-starter).

---

## 写作笔记（devto variant 特有 — 不发布）

vs master / zhihu 差异化：

| 维度 | master | zhihu | dev.to |
|---|---|---|---|
| 框架 | Slack 学员实录长文 | 我踩的 5 个坑 | 5 server quick-reference card |
| 开头 | 晚上 11 点 Slack 截图 | 两年前我自己写第一个 | "Quick read: five servers on this laptop" |
| 结构 | §0-§6 叙述 | 5 坑独立单元 | 5 张卡 + 陷阱段 + 暴论 + CTA |
| 长度 | 2900 字中文 | 2400 字中文 | ~1500 词英文 |
| CTA | SSE cliffhanger | 评论区问「你栽哪个坑」 | Star repo + follow + 下篇征询 |
| backlinks | 1 处 | 2 处 | 3 处（GitHub repo ×2 + Bootcamp 品牌锚 + starter 资源锚）|

诚实性核对（防幻觉）：
- 5 个 server 均来自 master，无编造。
- brave-search **未给 npx package 名**——master 没写，不编。只保留 `BRAVE_API_KEY` + 2000/月免费。
- filesystem 的 `--exclude .*` / `--read-only` flag：master 自己是模糊表述（"类似的参数"），**本 variant 直接不提 flag 名**，改成"给窄目录 / 自己写白名单 wrapper"。
- master "跨 4 个 server 协作" 实际只点名 3 个（filesystem/github/fetch）→ 本文如实写 three servers。
- 开头 hook 从骨架的 "5 servers I use weekly" 微调为 "5 servers I have configured right now"，因为 brave-search 按 master 描述并非每周高频。

7 个 AI 信号自检：
1. ✅ 无 deliverable list 开头，第一句直接给读者要的东西
2. ✅ 无 USB-C / 乐高比喻
3. ✅ 5 张卡结构各不相同（filesystem 故事 / github 工作流 / postgres 警告 / fetch 限制 / brave 一句话拒绝展开）
4. ✅ 无 "by the end of this post you'll"
5. ✅ 篇幅严重不对称：filesystem ~330 词，brave-search ~45 词
6. ✅ 主观："Most people should not write their own"、"lose the argument in the meeting rather than in the incident channel"、"I'm not going to pad it out"
7. ✅ 结尾是 cliffhanger + CTA，不是总结回扣

发布配置：
- 账号：dev.to/jr-academy
- Series: "MCP for AI Engineers"
- Tags: #ai #python #anthropic #productivity（dev.to 上限 4）
- Cover image alt 必填
- 自动化：✅ dev.to REST API
