# MCP 协议三层 + 50 行 Python 代码：从 0 到自己的第一个 Server

> **variant**: csdn · CSDN 代码密集版
> **master**: ../master.md
> **platform**: CSDN
> **target word count**: 3000
> **status**: ready — 待审

---

## 差异化策略（vs master 4 维度）

| 维度 | 选择 | 理由 |
|---|---|---|
| 标题钩子 | 「MCP 协议三层 + 50 行 Python 代码」 | CSDN 读者吃技术名词 + 代码量数字 |
| 开头 50 字 | 直接 "运行结果：..." 截图 + 1 句话总览 | CSDN 习惯先看代码 |
| 内链 anchor | GitHub repo（fork 一份代码）+ 课程入口 | CSDN 重视开源代码引用 |
| 长度 | 3000（代码占 40% 篇幅）| CSDN 读者扫代码 > 读文字 |
| 配图 | 终端截图 + 代码截图 + 报错截图 | CSDN 文章习惯有"复现现场" |
| 结尾 CTA | star GitHub + 关注作者 | CSDN 用 star 衡量价值 |

---

## 正文

先看跑通之后是什么样。

Claude Desktop 打字框左下角出现 🔌 图标，点开里面有一个 `github-tools`。我打一句 "list anthropics 在 GitHub 的最新 5 个 repo"，它自己去调我写的 `list_repos`，把 `name / stars / language / updated_at / url` 五个字段拿回来排好版。

> 📷 配图 1：Claude Desktop 里 🔌 图标展开 + tool 调用面板截图
> 📷 配图 2：终端 `npx @modelcontextprotocol/inspector` 的 web UI 手动调 tool 截图

整个 server 是 30 行 Python。代码在下面，能直接复制跑。

写代码那部分不难，难的是接通——我自己两年前卡了两个晚上，上周三晚上 11 点还有个学员在 Slack 上问我同一个问题，日志一看，跟我当年一模一样的错。

我在 JR Academy（匠人学院）带 AI Engineer 方向，这是个项目制 AI 工程实战平台（澳洲），课程按 P3 模式排（Project + Production + Placement）——学员写完 server 要真接进客户端、真部署出去才算过，所以我一年里反复看的就是接通阶段这几类报错，看得比自己写代码还多。

坑在后半篇，别跳过。

---

## 一、MCP 是协议，不是框架

这一句话是全文最值钱的：**MCP 不是 LangChain Tools 的竞品，也不是 OpenAI Function Calling 的竞品。**

LangChain Tools 是 Python 库里的一个抽象，绑死 LangChain 生态。OpenAI Function Calling 是 OpenAI API 的一个请求字段，绑死 OpenAI。这两个都是公司私有接口，天然跨不了厂商。

MCP 是 Anthropic 2024 年 11 月开源的**规范**，底下跑 JSON-RPC。你用 Python / TypeScript / Rust / Go 任何一门能讲 JSON-RPC 的语言写 server，跑在 Claude Desktop / Cursor / Continue 或任何实现了这套消息格式的客户端上。

我个人觉得这一层理解最关键。脑子里 MCP = framework 的人，会一直纠结 "MCP 和 LangGraph 哪个好"——这问题本身不成立，一个是协议一个是编排框架，不在一层。

---

## 二、协议定义的三种东西

读 spec 时会反复看到三个词：Resources、Tools、Prompts。

**Resources** 是 server 暴露给 LLM **读**的东西：文件、数据库表、API 返回值，全用 URI 引用。LLM 只能 list 和 get，不能改。

**Tools** 是暴露给 LLM **执行**的函数。`create_pull_request(...)`、`run_sql_query(...)` 这种。每个 Tool 带一份 JSON Schema 描述参数，LLM 看 schema 决定传什么。下面那 30 行代码写的就是一个 Tool。

**Prompts** 一句话带过。预制 prompt 模板，理论上有用，我自己写的 server 一个都没暴露过，社区 server 也大都不用。写代码阶段可以完全不管。

读写分开是 MCP 设计里我觉得最对的一件事——它逼你在写之前先想清楚：这次调用是只读的，还是有副作用的。Tools 永远要谨慎，Resources 可以放心给。

---

## 三、30 行 Python，一个能跑的 Tool

```bash
pip install fastmcp httpx
```

FastMCP 是 MCP Python SDK 的高层封装，比直接用底层 `mcp` 包少大约 60% 样板代码。

`github_server.py`：

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

三个 decorator 级别的魔法，看懂了就不用再看 spec：

- `@mcp.tool()` 把函数注册成一个 Tool
- docstring 直接变成 LLM 看到的 tool 描述（写烂了 LLM 就不会调它，这行别糊弄）
- type annotation（`username: str`、`sort: str = "updated"`）自动生成 JSON Schema

跑：

```bash
python github_server.py
```

**终端会卡住，什么都不输出。这是对的。** FastMCP 默认走 stdio，server 在等客户端发第一条消息。第一次跑的人十有八九以为挂了，`Ctrl+C` 掉重来——别，它就该这样。

---

## 四、接进 Claude Desktop（90% 的人卡这一步）

配置文件路径：

| OS | 路径 |
|---|---|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

文件不存在就自己建。内容：

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

两条硬规则，写在这别往下翻：

**1）路径必须是绝对路径。** Claude Desktop 不展开 `~`，也读不到你 shell 的 `$PATH`。我见过的失败配置里 80% 是同一个原因：项目用了 venv，`command` 却写了裸的 `python`——Claude 拿系统 python 去跑，`ModuleNotFoundError: No module named 'fastmcp'`，然后你在终端里试一遍，好好的。venv 的话把 `command` 写成 venv 里 python 的全路径。

**2）改完配置要完全退出 Claude Desktop。** 菜单栏 → Quit（macOS 就是 `cmd+Q`），不是 `cmd+W` 关窗口。Claude 只在启动时读一次配置，关窗口下次开还是老配置。我第一次配的时候反复改了六七遍 JSON 没反应，最后才反应过来进程压根没死。

重开之后，🔌 图标出现 = 通了。

---

## 五、三个会让你怀疑人生的坑

### 坑 1：`print()` 污染 stdout

**现象**：Claude Desktop 报 `Server disconnected` 或 `Failed to call tool`，看起来像你 tool 写错了。你把 tool 函数翻来覆去重写，没用。

**原因**：MCP 占着 stdout 跑 JSON-RPC。你 server 里任何一个 `print("server started")`，Claude 那边都会拿去当 JSON 解析，然后崩。

上周三那个学员就是栽这上面——文件顶部 print 了五行 "Server started..." 之类的调试信息。

**解决**：所有日志走 stderr。

```python
import sys, logging

logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.info("server starting")   # 安全

print("debug", file=sys.stderr)  # 也安全
print("debug")                   # ❌ 直接炸
```

写 MCP server 的第一行代码就把 logging 配到 stderr，这条能救你一个晚上。

### 坑 2：日志根本不在你看的地方

Server 的报错**不会**显示在 Claude 界面上。界面只会给你一句没信息量的 disconnected。真日志在：

| OS | 路径 |
|---|---|
| macOS | `~/Library/Logs/Claude/mcp*.log` |
| Windows | `%LOCALAPPDATA%\Claude\Logs\mcp*.log` |
| Linux | `~/.local/share/Claude/logs/mcp*.log` |

每个 server 一个 log 文件。macOS 上我一般直接：

```bash
tail -f ~/Library/Logs/Claude/mcp*.log
```

然后再去 Claude 里点一下。配置写错、依赖没装、Python 路径不对，全在这。

> 📷 配图 3：`tail -f` 抓到 `ModuleNotFoundError` 的报错现场截图

### 坑 3：别拿 Claude Desktop 当调试器

先用 inspector 把 server 本身跑通，再去接 Claude：

```bash
npx @modelcontextprotocol/inspector python github_server.py
```

它会开一个 web UI，你能手动点 tool、填参数、看返回。server 自身的 bug 在这一眼看得见。我的经验是，先过 inspector 这一关能省掉 80% 的调试时间——不然你永远分不清是 server 挂了还是配置错了。

---

## 六、5 个官方 server：配置直接抄

`github.com/anthropics/mcp-servers` 是官方维护的 reference servers。**我反对 90% 的人自己写 MCP server**——先把这几个用熟，再决定要不要写新的。下面的 JSON 全部塞进 `mcpServers` 那个对象里就行。

### filesystem（最常用，也最容易出事）

```json
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents/notes"]
}
```

我拿它当本地知识库用：Obsidian 的笔记目录直接喂 Claude，问 "上周关于 RAG 的笔记我都记了什么"，它自己把相关文件读一遍再回答。比 Cursor 的 codebase context 灵活，因为不绑死编辑器。

**别把整个 home 目录或整个 git repo 喂进去。** 我刚开始玩的时候图省事，root 直接给了 `~`，然后让 Claude "看看我最近的项目结构"，它顺手读了 `.env`、`.ssh/id_rsa`、AWS credentials。所幸是本地 Claude，我当场杀进程换 key。

filesystem 默认能看隐藏文件——我那个 `.env` 就是这么被读到的。要排除的话加 `--exclude .*` 这类参数；要求再高一点，自己写个带白名单的 wrapper server。

### github

```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxx" }
}
```

我每周固定用它干一件事：让 Claude 看 `anthropics/mcp-servers` 这周合并了哪些 PR，每个提炼一句话 changelog。它自己调 `list_pull_requests` 再 `get_pull_request` 拉详情。

Token 权限给最小集：只读 `public_repo` 就够，要 create issue 才需要 `repo` 全权限。单独开一个 token，别复用你日常那个。

### fetch

```json
"fetch": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-fetch"]
}
```

给 Claude 一双看网页的眼睛，主要拿来拉实时文档。注意它不带 JS 渲染，SPA 站抓回来是空的，Cloudflare 挡的页面常年 403。我一般配 brave-search 一起用：先搜出几个 URL，挑一个稳的再 fetch。

### postgres

```json
"postgres": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost/dbname_replica"]
}
```

**connection string 里那个 `_replica` 不是装饰。** 直接接生产主库的话，LLM 幻觉出一句 `DELETE FROM users WHERE ...` 没有任何东西拦得住它。Anthropic 默认 server 是只读的，但配置对不对得你自己确认——多一道 read replica 的物理防线，比"理论上它不会写"靠谱。

数据探索阶段是真好用："上周新增用户里多少人 verified email"，它自己写 SQL 跑。生产主库，不要。

### brave-search

要 API key，每月 2000 次免费，配 `BRAVE_API_KEY`。不展开。

---

## 七、四个 server 串起来之后

配置文件里同时挂 filesystem + github + fetch 之后才有意思。我自己那份 `claude_desktop_config.json` 长这样，连我自己写的 `github-tools` 一起：

```json
{
  "mcpServers": {
    "github-tools": {
      "command": "/Users/you/venv/bin/python",
      "args": ["/Users/you/path/to/github_server.py"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents/notes"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxx" }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

注意 `github-tools` 那行 `command` 写的是 venv 里 python 的绝对路径——就是第四节说的那个坑，四个 server 挂一起的时候最容易忘。

我有个跑了大半年的工作流：每周一早上让 Claude 把三件事拼成一份 5 分钟能读完的 digest——本地笔记里标了"未读"的（filesystem）+ 我 starred repo 上周的更新（github）+ Anthropic 这周的 changelog（fetch）。

同样的东西两年前用 LangGraph 写，200 行代码加 4 个 prompt。现在是 4 段 JSON 配置加一句话。

想真做项目的话，[JR Academy AI Engineer Bootcamp](https://jiangren.com.au/curriculum/ai-engineer-bootcamp/) Phase 2 Week 4 就是这块——7 个 PBL 项目，从 hello-world 一路到把 server 部署上 Fly.io 挂 Prometheus 监控。悉尼这边的 AI Engineer JD 过去 3 个月开始明确写 "experience with MCP"。我不敢保证你学完一定有 offer，但 portfolio 里放一个跑得通的 MCP server，比简历上写"了解 LangChain"有用得多。

避坑代码和配置模板打包在这：[JR 免费资源 · MCP starter](https://jiangren.com.au/free-resources/mcp-starter)。

---

## 最后

代码全在文里，复制就能跑。`github.com/anthropics/mcp-servers` 值得 star 一个，官方那几个 server 的实现本身就是最好的 MCP 教程——我写自己的 server 之前，把 filesystem 那份源码从头读了一遍。

SSE transport 这篇没写。stdio 只能本地跑，要把 server 部到云上让整个团队远程接就得换 SSE，复杂度是另一个量级。有人要的话我单开一篇。

评论区说说：你 `claude_desktop_config.json` 里现在挂了几个 server？

---

## 写作笔记（csdn variant 特有）

vs master 4 维度差异化（已应用）：

| 维度 | master | csdn |
|---|---|---|
| 标题 | Slack 实录故事 | 「协议三层 + 50 行代码」技术名词 + 数字 |
| 开头 | 学员晚上 11 点 Slack 消息 | 先给运行结果（🔌 图标 + 返回字段），Slack 故事压缩成一句话铺垫 |
| 结构 | 叙述驱动，代码是插图 | 代码驱动，文字是注释；三个坑改成「现象 / 原因 / 解决」格式 |
| 长度 | 2900 字叙述 | ~3000 字，代码块占约 40% 篇幅 |
| backlinks（§9.1 CSDN 规则 ≤ 5） | 1 处 Bootcamp | 3 处：Bootcamp（品牌锚）+ 免费资源包（资源锚）+ anthropics repo（外部权威，不计 jiangren 外链） |
| 结尾 | SSE cliffhanger + "不写总结" | star repo + SSE 单开一篇 + 互动问句（挂了几个 server） |

应用 anti-ai-writing.md §七 7 信号：
1. ✅ 无 deliverable list 开头 → 直接给运行结果
2. ✅ 无 USB-C / 乐高比喻
3. ✅ Resources / Tools / Prompts 三段结构不齐（一段叙述 / 一段指向代码 / 一段"不展开"）
4. ✅ 无"读完你能"
5. ✅ 5 个 server 篇幅不对称：filesystem 最长（带 .env 事故）> postgres（带警告）> github > fetch > brave-search 一句话
6. ✅ 主观判断：「我反对 90% 的人自己写」「读写分开是 MCP 设计里我觉得最对的一件事」「生产主库，不要」
7. ✅ 结尾不总结：star + cliffhanger + 互动问句

CSDN 平台规则自检：
- ✅ H1 只有文章 title 一个（正文全部 H2/H3）
- ✅ 外链 3 个（≤ 5）
- ✅ 代码块语言标 `python` / `json` / `bash`，不用 `py`

发布配置：
- CSDN 专栏：JR_Academy / 个人账号
- 标签：#MCP #Anthropic Claude #Python #AI Agent #Function Calling
- 配图 3 张（正文已标 📷 位置）：Claude Desktop 🔌 面板 / inspector web UI / `tail -f` 抓到的报错现场
- 自动化：⚠️ 半自动 Playwright（CSDN 风控严，建议人工发避免账号风险）

originality vs 掘金（最易撞）：
- CSDN 走命令行截图 + 「现象/原因/解决」三段式坑；掘金走架构图 + 项目背景叙事
- CSDN 标题是教程口吻，掘金是实战口吻
- CSDN 内链落 GitHub repo + 资源包，掘金落 Author 主页
