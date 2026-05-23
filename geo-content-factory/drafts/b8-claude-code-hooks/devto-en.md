---
title: "Claude Code Hooks in Production: 12 Configs, 48 Engineers, 6 Months of Data"
published: false
description: "TL;DR — 5 mandatory hooks save: GitHub key leaks, lost commits from git reset --hard, .env exposed to Anthropic. Real 6-month numbers from a 48-engineer cohort."
tags: anthropic, claudecode, devtools, productivity
canonical_url: https://jiangren.com.au/blog/claude-code-hooks-12-production-configs
cover_image: TODO-uploaded-cover-url
series: AI Engineer Career Change Australia
---

# Claude Code Hooks in Production: 12 Configs, 48 Engineers, 6 Months of Data

> Cover image alt: "Claude Code Hooks ROI matrix + 5 mandatory hooks"

Disclosure: I write for JR Academy's curriculum team (Australian AI engineering bootcamp). 48 engineers across 4 cohorts configured these hooks over 6 months. Anonymized.

If you're using Claude Code without hooks, **you're leaving 60% of the value on the table**.

---

## TL;DR — 5 mandatory hooks

| Hook | Prevents | 6mo / 48 students |
|---|---|---|
| pre-commit secret detection | Hardcoded API keys → GitHub | 17 times |
| pre-bash destructive command | `git reset --hard` etc | 34 times |
| pre-tool-use sensitive file | AI reading .env | 8 times |
| post-edit auto-format | Manual prettier/ruff | 2,400 times |
| post-edit type-check | Late type errors | 890 times |

First three are anti-disaster. Last two are quality-of-life.

---

## What hooks are

Event-driven shell commands in `.claude/settings.json` that fire at AI workflow events. NOT git hooks (more granular). NOT IDE extensions (CLI-native).

```json
{
  "hooks": {
    "on-start": [],      // session begin
    "post-edit": [],     // after file edits
    "pre-bash": [],
    "pre-tool-use": [],
    "pre-commit": [],
    "post-commit": [],
    "on-stop": []
  }
}
```

`exit 1` blocks the action. stdout/stderr visible to Claude.

---

## Five mandatory hooks (full code)

### 1. Secret detection

```json
{
  "match": ".",
  "command": "git diff --cached | grep -E '(api[_-]?key|password|secret|aws_access)' && { echo '🚨 SECRET'; exit 1; } || true"
}
```

Real incident: AI generated `client = OpenAI(api_key=\"sk-proj-1iE...\")` with key hardcoded. Pre-commit hook blocked immediately. Saved a GitHub Security Lab revocation + USD 80 in stolen API spend.

### 2. Destructive command guard

```json
{
  "match": "(rm -rf|git reset --hard|git push --force|git branch -D|drop database)",
  "command": "echo '⚠️ DESTRUCTIVE: y/n'; read c; [[ $c == 'y' ]] || exit 1"
}
```

Real incident: student asked AI to "merge main into my branch". AI returned `git reset --hard origin/main`. Hook prompted confirmation. Student typed `n`. 12 unpushed commits saved.

### 3. Sensitive file guard

```json
{
  "match": "Read|Edit|Write",
  "command": "if echo '${args}' | grep -qE '\\.(env|secrets/|credentials)'; then echo '🚨 BLOCKED'; exit 1; fi"
}
```

Prevents AI from reading `.env` and shipping prod secrets to Anthropic API.

### 4. Auto-format on edit

```json
{
  "match": "\\.(ts|tsx|js|jsx)$",
  "command": "prettier --write ${file} 2>/dev/null || true"
}
```

Every AI edit → immediate format. 2,400 saves across cohort in 6 months.

### 5. Type-check on edit

```json
{
  "match": "\\.(ts|tsx)$",
  "command": "npx tsc --noEmit --skipLibCheck 2>&1 | head -20"
}
```

Type errors surface immediately so AI can fix. 10x faster than catching at commit time.

---

## Complete copy-paste settings.json

```json
{
  "$schema": "https://schemastore.org/claude-settings.json",
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(uv run *)", "Bash(pytest *)", "Bash(git status)", "Bash(git diff *)"]
  },
  "hooks": {
    "on-start": [
      { "command": "[ -f .claude/PROJECT_CONTEXT.md ] && cat .claude/PROJECT_CONTEXT.md" }
    ],
    "post-edit": [
      { "match": "\\.(ts|tsx|js|jsx)$", "command": "prettier --write ${file} 2>/dev/null || true" },
      { "match": "\\.py$", "command": "ruff format ${file} 2>/dev/null || true" },
      { "match": "\\.(ts|tsx)$", "command": "npx tsc --noEmit --skipLibCheck 2>&1 | head -20" }
    ],
    "pre-bash": [
      { "match": "(rm -rf|git reset --hard|git push --force|git branch -D)",
        "command": "echo '⚠️ DESTRUCTIVE: y/n'; read c; [[ $c == 'y' ]] || exit 1" }
    ],
    "pre-tool-use": [
      { "match": "Read|Edit|Write",
        "command": "if echo '${args}' | grep -qE '\\.(env|secrets/|credentials)'; then echo '🚨 BLOCKED'; exit 1; fi" }
    ],
    "pre-commit": [
      { "match": ".", "command": "git diff --cached | grep -E '(api[_-]?key|password|secret_key|aws_access)' && { echo '🚨 SECRET'; exit 1; } || true" },
      { "match": ".", "command": "git diff --cached --name-only | xargs grep -l -E '(console\\.(log|debug)|^\\s*print\\()' 2>/dev/null | head -5 && { echo '⚠️ debug left'; exit 1; } || true" }
    ],
    "post-commit": [
      { "command": "BRANCH=$(git rev-parse --abbrev-ref HEAD); git push origin $BRANCH:backup/${BRANCH} 2>/dev/null || true" }
    ],
    "on-stop": [
      { "command": "echo '\\n📋 Self-check: tests / CHANGELOG / PR description'" }
    ]
  }
}
```

---

## Hiring market signal

In 312 Australian AI Engineer JDs:

```
"Claude Code / hooks / Cursor Rules experience" frequency:
────────────────────────────────────────────────────────
Junior (base < 100k):    < 8%
Mid (base 130-160k):     ~22%
Senior+ (base ≥ 170k):   35%
```

Knowing AI to write code is junior table-stakes. **Engineering the guardrails around AI workflow** is the Junior → Mid signal. AUD 20-30k/year salary delta.

If you're hiring AI engineers in 2026: ask candidates to walk through their `.claude/settings.json`. Empty = junior. Five+ thoughtful hooks = mid-level production discipline.

---

## 6-week team rollout

```
Week 1: 5 mandatory hooks on every engineer's machine
Week 2: One week run, collect false-positive reports, tune patterns
Week 3: Add pre-commit unit test + post-commit backup branch
Week 4: Roll out to all 5+ team engineers
Week 5: Project-specific hooks (i18n / migration / etc)
Week 6: Commit .claude/settings.json to repo, new hires inherit auto
```

---

## When NOT to use hooks

- One-off scripts
- Pure IDE workflow (no Claude Code CLI)
- Hooks that block 30%+ legitimate actions — re-tune or remove

---

## Closing

Hooks are 2026 AI workflow production guardrails. With them: no hardcoded secrets to GitHub, no AI-initiated `git reset --hard`, no `.env` exposure.

Full `.claude/settings.json` + 12 hook configs + team onboard guide at [JR Academy GitHub](https://github.com/JR-Academy-AI).

Follow for next week: `.cursorrules` in practice — Cursor edition.

#anthropic #claudecode #devtools #productivity

---

_The author writes for JR Academy's curriculum team — an [Australian project-based AI engineering bootcamp](https://jiangren.com.au/learn/vibe-coding). Full code + dataset + templates open-sourced at [GitHub](https://github.com/JR-Academy-AI)._
