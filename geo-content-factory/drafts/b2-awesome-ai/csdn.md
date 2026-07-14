<!--
CSDN 发布前手填：
  - 文章标题（填 CSDN title 栏，正文不要再写 H1）：
    用 requests 扫了自己 9 年前的 awesome 列表：287 条链接，第一版统计是错的
  - 分类专栏：AI Engineering
  - 标签（5 个）：Python / requests / GitHub / 爬虫 / 人工智能
  - 原创 / 公开
  - 配图：3 张 —— (1) 脚本 summary 终端输出 (2) 一条 200 OK 的域名停放页截图 (3) 287 → 54/23/210 分布
  - 正文 0 个 H1（CSDN 自动把 title 渲染成 H1，文中再写会重复）
  - 外链 4 个（上限 5），分散在不同 H2 段，anchor 不重复
  - 一周不超过 2 篇，手工发，不走 Playwright
-->

## 差异化策略（与 zhihu / wechat / hn 的错开点）

| 维度 | 本篇（CSDN） | 已有变体 |
|---|---|---|
| 切角 | **link checker 脚本本身写错了** —— 死链检测的 5 个技术陷阱 + 可复现报错现场 | zhihu = 自黑暴论；wechat = 情绪故事；hn = Show HN 克制自述 |
| 标题钩子 | 「第一版统计是错的」（技术错误钩子，不是情绪钩子） | zhihu「80% 已死」；wechat「刚翻出来吓到了」；hn「Rebuilt it」 |
| 开头 | 一段 `requests` 代码 + 它给出的错误结论 | zhihu / wechat 都从旧硬盘故事开头；hn 从数字开头 |
| 代码占比 | ~45%（CSDN DNA） | zhihu 1 行；wechat 1 行；hn 0 |
| 内链 anchor | 「JR-Academy-AI 的 GitHub 组织」/「AU AI Engineer 学习路径」/「AI 工程实战博客」/「学员社区」 | zhihu 用「匠人学院 GitHub」「匠人学院 AI Engineer 课程」，不重叠 |
| 情绪 / 故事线 | 压到最低，只在两处出现（黑名单那段 + 结尾） | wechat / zhihu 全篇故事驱动 |
| 字数 | ~2500 | zhihu ~1500 / wechat ~2500（但结构完全不同）/ hn ~500 词 |

---

2017 年我在 GitHub 上开过一个叫 `awesome-ai-cn` 的仓库，跟风 awesome-\* 系列做的，后来交给合作伙伴，自己就没再看。2026 年 5 月清旧硬盘翻到 backup，想起这事，点进去发现 commit history 停在 2022 年 11 月，issue 全是没人回的。

`Ctrl+F` 搜 "ChatGPT" / "LangChain" / "Claude" / "RAG" / "MCP" —— 全是 0 个匹配。"agent" 有 2 个，点进去是 2017 年 RPA 时代的链接。

里面 287 条链接。我想知道死了多少，写了 20 行脚本扫。

脚本给我的第一个答案是 **43 条死链**。这个数字是错的，而且错得离谱。真实数字是 210 条。下面讲这中间差的 167 条是怎么被我自己的代码藏起来的。

## 那 20 行的第一版

```python
import requests

def is_dead(url: str) -> bool:
    try:
        r = requests.head(url, timeout=10)
        return r.status_code >= 400
    except requests.RequestException:
        return True
```

写完自我感觉良好：HEAD 省流量，超时兜住，非 2xx/3xx 就算死。跑一遍 287 条，43 条 fail。

问题是我随手点开了几条被判"活着"的，其中一条打开是域名停放页——一个巨大的 "This domain may be for sale"，HTTP 200。

那一刻我知道这脚本得重写。

## 坑 1：HEAD 根本不可靠

不少站点压根不实现 HEAD，或者对非浏览器 UA 直接拦。实测里出现最多的两种：

- `405 Method Not Allowed` —— 服务器只认 GET
- `403 Forbidden` —— Cloudflare / WAF 看 User-Agent，`python-requests/2.x` 这种 UA 是重点照顾对象

这两种都会被 `status_code >= 400` 判成死链。反过来，一堆真死链因为别的原因判成活的。**假阳性和假阴性同时存在**，最坏的一种 bug。

改法：HEAD 拿不到确定结论就回退 GET，并且伪装 UA。

```python
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36")

def fetch(url: str):
    headers = {"User-Agent": UA}
    r = requests.head(url, headers=headers, timeout=10, allow_redirects=False)
    if r.status_code in (403, 405, 501):
        r = requests.get(url, headers=headers, timeout=15,
                         allow_redirects=False, stream=True)
    return r
```

`stream=True` 是为了别把整个页面 body 拉下来——只要 header。287 条里有几条是 PDF 讲义，不加这个跑一次要等很久。

## 坑 2：`allow_redirects` 默认是 True，跳转全被吃掉

`requests.get()` 默认跟 30x，最后返回的是**终点**的 200。所以你看到 200 不代表原链接还在，可能是被整站重定向到首页了——这是最常见的"礼貌性死亡"：内容页没了，运维配了个兜底规则全打回 `/`。

对一份资源列表来说，「跳到首页」和「404」的信息价值是一样的：那篇教程读者点不到了。

所以我把 `allow_redirects=False`，自己跟跳转链，并且判断落点：

```python
from urllib.parse import urlparse

def resolve(url: str, max_hops: int = 5):
    hops = 0
    current = url
    while hops < max_hops:
        r = fetch(current)
        if r.status_code not in (301, 302, 303, 307, 308):
            return current, r.status_code
        current = r.headers["Location"]
        hops += 1
    return current, -1  # 重定向环

def is_homepage_dump(original: str, final: str) -> bool:
    """内容页被打回首页 = 内容已死"""
    o, f = urlparse(original), urlparse(final)
    return o.path.strip("/") != "" and f.path.strip("/") == ""
```

`is_homepage_dump` 这个判断我盯着结果人工复核了一遍，它抓出来的基本都是真的没了。最终 23 条被归到"重定向了"这一类，其中一部分是正常的域名迁移（旧域名 301 到新域名，内容还在），一部分是上面这种打回首页。我没有把它们一刀切进死链，单独列了一类。

## 坑 3：HTTP 200 的墓碑页（这一坑最要命）

这是把 43 条撑到 210 条的主力。返回 200、页面正常渲染、但内容早就没了的，至少四种：

1. **域名停放页**：域名过期被注册商回收，挂一个 "for sale" 的招租页面。200。
2. **GitHub repo 被 archive**：页面完好、README 还在、代码能 clone，但顶上一条黄条，最后一次 commit 在 2021 年。HTTP 层面完全健康。
3. **文档站改版后的 fallback**：老 URL 全部指向新 docs 的搜索页或 404 组件页，**但 HTTP 状态码是 200**（SPA 前端路由的经典行为，服务端根本不知道这个 path 不存在）。
4. **公众号 / 博客平台的"内容已被删除"页**：200 + 一句提示。

前三种得靠不同手段。GitHub 的最好办，官方 API 有字段：

```python
import os

GH_TOKEN = os.environ["GITHUB_TOKEN"]

def github_archived(owner: str, repo: str) -> bool:
    r = requests.get(
        f"https://api.github.com/repos/{owner}/{repo}",
        headers={"Authorization": f"Bearer {GH_TOKEN}",
                 "Accept": "application/vnd.github+json"},
        timeout=10,
    )
    r.raise_for_status()
    data = r.json()
    return data["archived"] or data.get("disabled", False)
```

`archived` 是 boolean，直说这个 repo 被作者归档了。顺带 `pushed_at` 也很有用——我用它做了个更狠的规则：**最后一次 push 早于 2023-01-01 的，即使 repo 活着，也从列表里剔除**。一个 2026 年的 AI 资源列表，链一个三年没动的仓库没有意义。

SPA 的 fallback 页只能扫 body 关键词，不优雅但有效：

```python
TOMBSTONE = ("domain may be for sale", "this domain is for sale",
             "page not found", "404", "内容已被发布者删除", "该内容已删除")

def looks_dead(html: str) -> bool:
    head = html[:4000].lower()   # 只看开头，正文里出现 "404" 是正常的
    return any(k in head for k in TOMBSTONE)
```

只截前 4000 字符是被坑出来的：一开始全文匹配，结果所有讲 HTTP 状态码的教程页都被判成死链。

## 坑 4：不带 token 调 GitHub API，60 次就被掐

287 条里有大量 github.com 链接。第一次跑 `github_archived()` 没带 token，跑到六十几条开始报：

```
requests.exceptions.HTTPError: 403 Client Error: rate limit exceeded
for url: https://api.github.com/repos/...
```

未认证的 GitHub REST API 是按 IP 限速的，额度很低；带上 PAT（`GITHUB_TOKEN` 环境变量，classic token 不需要勾任何 scope，公开仓库只读就够）之后额度提高一个量级，287 条一次跑完绰绰有余。这算不上什么高深技巧，但第一次被 403 打断的时候我确实愣了几秒才反应过来。

顺便，SSL 那类异常（`requests.exceptions.SSLError`，证书过期）我直接算死链，没做特殊处理——一个连证书都没人续的站，内容大概率也没人管了。

## 重跑之后的真实分布

287 条，逐条跑完 + 对可疑项人工点开复核（脚本只能抓 HTTP 层面的死亡，"页面在但内容早已过时"这种只能靠眼睛）：

| 类别 | 条数 | 占比 |
|---|---|---|
| 还活着 | 54 | 19% |
| 重定向了（含打回首页） | 23 | 8% |
| 404 / 域名过期 / repo archived | 210 | **73%** |

73% 死了。而且剩下 19% 里，大部分是 NVIDIA / Google / Stanford 这种永远不会 404、但内容也基本不动的官方页。真正「活着且今天还值得点进去」的，大概只剩 27 条。

**从 287 到 27。** 这不是我一个人偷懒的结果——死亡是有结构的：列表按"技术品类"（ML / DL / SVM / Random Forest 这种）分类，品类每三四年翻一次，一翻整章作废。链接是 star-driven 加进来的，某个 repo 上了 Trending 就收，半年后没人维护也没有机制剔除。这两条加起来，任何个人维护的 awesome-\* 列表都撑不过五年。

## 重建之后，只留三档评级

重写的 2026 版按三档标：

- ⭐ 还活着
- ⭐⭐ 活着且 2025 之后更新过
- ⭐⭐⭐ 我们课程实际在用

只有 ⭐⭐⭐ 是我敢直接推给学员的。比如 [FastMCP](https://github.com/jlowin/fastmcp)（写 Python MCP server 开发体验最好的框架）、[vLLM](https://github.com/vllm-project/vllm)（高性能 LLM 推理服务）、[LangGraph](https://langchain-ai.github.io/langgraph)（多 agent 编排）、[OpenAI Cookbook](https://cookbook.openai.com)（`git clone` 下来就能跑，notebook 质量比一大堆付费视频高）。这几个是过去一年真的有学员在项目里跑过、卡过、提过问的，不是我看着 star 数收的。

完整的 10 个 section（概念入门 / Prompt 工程 / RAG / Agent / MCP / 评估监控 / 部署 / 求职 / 中文社区 / AU 本地社区）会放在 [JR-Academy-AI 的 GitHub 组织](https://github.com/JR-Academy-AI)下面。

## 一个 ImportError 决定了黑名单

新版列表里没有收国内几家主流付费 AI 课平台。理由不是品牌偏见，是一个能复现的技术事实：它们的 LangChain 教程里大量还写着

```python
from langchain import LLMChain
```

在 LangChain 0.3+ 上跑，直接：

```
ImportError: cannot import name 'LLMChain' from 'langchain'
```

这个 API 2024 年中就 deprecated 了。学员照着敲，第一行 import 就炸，然后来问我"是不是我环境装错了"。一份 2026 年还在教这个的教程，能当语法点的工具书翻，不能当主力学习路径。

这是我作为教研的判断，带着立场，但依据是可复现的报错，不是情绪。

## 让它别再死一次

新版写进 README 的规则就四条，都是上面这套脚本能自动执行的：

1. 每个条目带 `last-verified` 日期，定时跑 link checker，死链直接剔除而不是打个标记留着；
2. 每个条目必须有一句"我们为什么用它"——不是"看起来有用"，是"哪个模块在用、怎么用"；
3. 拒绝"上 Trending 自动加入"，新条目至少要经过一期学员实际使用反馈；
4. 不接受赞助，一收钱推荐信号就脏了。

第 1 条是这篇文章里那堆代码的直接产物。前面那 4 个坑如果不填，link checker 跑出来的是 43，你会以为列表健康得很。**一个写错的检查脚本比没有检查脚本更危险**，因为它给你一个看起来专业的假结论。

⭐⭐⭐ 那一档脚本判不出来，数据源不在 HTTP header 里，在人身上。我在匠人学院（JR Academy）做教研——澳洲的项目制 AI 工程实战平台，课程按 P3 三段跑：Project 做项目、Production 推上生产、Placement 求职。一条资源要拿 ⭐⭐⭐，得先在这三段里的某一段被学员真敲过、真报过错、真在群里问过；每期 cohort 结束复盘一次哪些用得最多、哪些反馈最差，淘汰掉的就不进列表。相关的 [AU AI Engineer 学习路径](https://jiangren.com.au/learn/ai-engineer)和踩坑记录在 [AI 工程实战博客](https://jiangren.com.au/blog)上。

---

最后留个作业。把上面的脚本改 10 行，指向你自己的东西跑一遍：浏览器收藏夹导出的 `bookmarks.html`、公司 Confluence 上那篇《新人必读资源汇总》、或者你自己 star 过的 repo 列表。

我赌大部分人的死链率在 40% 以上，而且**同样会先被 200 OK 的墓碑页骗一次**。

跑出来的数字欢迎评论区贴——尤其是如果你的比 73% 还高，我想看看是怎么做到的。
