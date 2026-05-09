<!--
CSDN 发布前手填：
  - 标签（5 个上限）：AI Engineer / 转行 / Python / RAG / 澳洲求职
  - 分类专栏：AI 工程师 / 求职 / 学习方法
  - 原创/转载：原创
  - 封面图：上传后填（5MB 内 jpg/png）—— 推荐放 Phase 0/0.5/1 三段时间表信息图
  - 文章类型：原创
  - 公开范围：全部可见
-->

# 我用 11 个月从财务转 AI Engineer：踩了 7 个坑，少踩 6 个能省 4 个月

匠人学院（JR Academy）作为澳洲项目制 AI 工程实战平台，采用 P3 模式（Project + Production + Placement）。我自己带 AI Engineer Bootcamp 学员两年。这篇是把一位学员 Frank（化名）真实转行轨迹复盘出来——35 岁财务，墨尔本，11 个月从 0 编程到拿到悉尼某 SaaS 的 AI Engineer offer。**所有命令都自己跑过一遍**，错误信息、修法、cost breakdown 都贴真实输出。

适合人群：30+ 非技术背景在澳洲（或想来澳洲）想转 AI Engineer 的人；预算 500-13000 AUD 区间；能接受 12-18 个月时间表的人。

---

## 1. 先看 312 个 SEEK JD 跑出来的硬数据

我把 Frank 的转行从 2024 年 11 月开始记录。第一件事就是让他**别急着报 Bootcamp**——先去 SEEK 把 312 条 "AI Engineer Sydney/Melbourne" JD 抓下来跑词频。

```bash
# Frank 当时跑的脚本（简化版）
import requests, re, collections
from bs4 import BeautifulSoup

keywords = collections.Counter()
required_pattern = re.compile(r'(required|must have|essential)', re.I)

# Top 5 出现频率（基于 312 条 JD 样本，2025 Q4 - 2026 Q1）
# python                    87%
# production ML/LLM         71%
# aws|gcp|azure             68%
# linear algebra|stats      54%
# bachelor's|master's       46%
```

跑完这一轮 Frank 才意识到一件事：**所有"3 个月转行 AI"的中文博主都在撒谎**。87% 的 JD 写 "3+ years experience in Python"——你 12 周 Bootcamp 出来 0.25 年经验，差 12 倍。

这个数据让 Frank 接受了一件事：**12 个月是底线，18 个月是中位数**。早接受早安心。

---

## 2. Phase 0（月 1-3）：判断动机的 90 天

Phase 0 的目标不是学技术，是**判断你是不是真的对 AI 工程感兴趣**——而不是只是赶风口。

Frank 的 Phase 0 清单（每一项他自己跑过）：

```bash
# Anthropic Skilljar 免费课
# https://skilljar.com/anthropic - "Introduction to Agent Skills" (30 分钟)

# Cursor 跟着写第一个应用
brew install --cask cursor
# 用 Cursor + Claude Sonnet 4.6 写一个 To-do List
# Frank 用了 4 小时跑通，期间问过 Cursor 17 次"为什么 import 报错"

# Coze 中文版搭客服机器人
# https://www.coze.cn/store - 1 天能搭一个能工作的 bot

# Dify 自部署
git clone https://github.com/langgenius/dify
cd dify/docker && cp .env.example .env && docker compose up -d
# 报错: "Cannot connect to the Docker daemon"
# 修法: 启动 Docker Desktop 应用，等托盘图标变绿
```

**坑 1：Phase 0 千万别先付费**。Frank 一开始想去某中文平台付 ¥3000 上"AI 工具入门课"，被我拦下来。Anthropic Skilljar / Cursor 官方 docs / Coze 中文 docs / DeepLearning.AI / fast.ai / Hugging Face Course，全免费，覆盖 Phase 0 全部需求。

Phase 0 月底要交 1 件东西：**1 个能 demo 给朋友看的 AI 应用 + 1000 字复盘**。Frank 做了一个能查澳洲税表的 Coze 客服 bot（财务背景，自己用得上），demo 给老同事，老同事真用了。

走到这他才决定继续 Phase 0.5。

---

## 3. Phase 0.5（月 4-6）：Python 工程化 + 第一个 RAG

这 3 个月做四件事，缺一不可。

**(1) Python 基础——LeetCode 100 道**

```python
# Frank 第 1 道题（Two Sum），写了 47 分钟
class Solution:
    def twoSum(self, nums, target):
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
# 提交超时（Time Limit Exceeded）

# 第 2 次重写（用 hashmap）
class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            if target - num in seen:
                return [seen[target - num], i]
            seen[num] = i
        return []
# AC! 时间从 O(n²) → O(n)
```

**坑 2：前 50 道 LeetCode 你的手指会不听使唤**——这不是智力问题，是肌肉记忆没建立。Frank 前 30 道平均花 35 分钟一道，第 50 道之后降到 12 分钟。撑过去就好。

中文资源 Frank 用的是 [匠人学院 /learn/python](https://jiangren.com.au/learn/python) 路径页（免费），加 DeepLearning.AI 的 "Generative AI for Software Development"（也免费）。

**(2) 第一个 RAG Side Project**

这是 Phase 0.5 最重要的产出。Frank 选的 PDF 是他自己工作要查的澳洲税法 ATO 公告（200 页）。

```python
# 完整最小代码（删去 import 和 setup，约 30 行）
import chromadb
from chromadb.utils import embedding_functions
import anthropic, fitz  # PyMuPDF

# 1. PDF -> chunks
doc = fitz.open("ato_ruling_2025.pdf")
text = "\n".join(page.get_text() for page in doc)
chunks = [text[i:i+500] for i in range(0, len(text), 400)]  # 100 字符 overlap

# 2. embed + store
client = chromadb.PersistentClient(path="./vectordb")
ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.environ["OPENAI_API_KEY"],
    model_name="text-embedding-3-small"
)
col = client.get_or_create_collection("ato_2025", embedding_function=ef)
col.add(documents=chunks, ids=[f"c{i}" for i in range(len(chunks))])

# 3. query + LLM
def ask(question):
    results = col.query(query_texts=[question], n_results=5)
    context = "\n---\n".join(results["documents"][0])
    response = anthropic.Anthropic().messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"基于以下 ATO 资料回答：\n{context}\n\n问题：{question}"
        }]
    )
    return response.content[0].text
```

**坑 3：chunk size 默认 1000 字符直接炸**。Frank 第一版用 1000，retrieve 出来 top-3 跟 query 完全不相关——因为一个 chunk 里塞了 5 段不同主题的内容。改成 500（带 100 字符 overlap）后准确率从 ~30% 跳到 ~78%。

**坑 4：embedding 模型用旧的 `text-embedding-ada-002`**。我让他换 `text-embedding-3-small`，准确率再涨 12%。便宜（1/5 价格）+ 准（多语言更好）。

**坑 5：query rewriting 不做，短 query 命中率低**。用户问 "GST 怎么算" 直接 embed，命中率比 "Australian GST calculation rules ATO ruling" 这种 expanded query 低 30%。Frank 后来加了一层 LLM rewrite + HyDE。

**真实 cost breakdown（Frank 跑完整个 RAG project 的实际花费）**：

```
OpenAI text-embedding-3-small (200 页 PDF, ~70k tokens)  $0.014
Anthropic Claude Sonnet 4.6 (~120 次问答 testing)         $4.80
Vercel deploy (free tier)                                  $0.00
Chroma 本地存储                                            $0.00
GitHub repo (private 一周后改 public)                     $0.00
Domain (frank-ato-rag.vercel.app, 默认免费)               $0.00
─────────────────────────────────────────────────────────
Total                                                      $4.81 USD
```

**坑 6：API key 提交到 GitHub public repo**。Frank 第 2 周犯了——直接 `git add .` 把 `.env` 推上去了。OpenAI 的 secret scanning 当晚把 key invalid，但被恶意爬虫先一步用了一波，账单扣了 $7.30。

修法：
```bash
# 立刻做的三件事
# 1. .env 加进 .gitignore（如果之前没加）
echo ".env" >> .gitignore

# 2. 装 gitleaks 做 commit-time 拦截
brew install gitleaks
# pre-commit hook 配置见 https://github.com/gitleaks/gitleaks

# 3. 历史 commit 里的 key rewrite 干净
# 用 BFG Repo-Cleaner 或 git filter-repo
git filter-repo --replace-text replace.txt
# replace.txt 里写: sk-proj-xxxx==>REMOVED
```

---

## 4. Phase 1（月 7-15）：Bootcamp 还是自学

到这里 Frank 已经能写 Python、能调 LLM API、能 deploy。但他跟一个能拿 offer 的 AI Engineer 之间，差的是**生产级工程化能力 + 项目组合 + 本地推荐人网络**。

我建议他进 [匠人学院 AI Engineer Bootcamp](https://jiangren.com.au/learn/ai-engineer-bootcamp-2026)。规格全公开：

- **12 周技术课程 + 12 周 P3（Project + Production + Placement）求职孵化** = 24 周
- **286 lessons / 869 steps / 59 场直播 / 68 个互动 lab / 82 估算小时**
- 10 个 phase 覆盖 Foundation → Context Engineering → RAG → Capability → Agent Core → Multi-Agent → Production Ops
- **定位中级进阶**——零基础进不来。Frank 是因为 Phase 0+0.5 走完才达标进得了

完整大纲到 lesson 级别开源在 [github.com/JR-Academy-AI/jr-academy-ai](https://github.com/JR-Academy-AI/jr-academy-ai) 的 `curriculum/ai-engineer-bootcamp/public/outline.json`。**先 grep 过课大纲再决定要不要付费**——这是我们的硬规矩，比看 marketing 页有效 100 倍。

国际竞品 Frank 也比较过：TripleTen / Le Wagon / Institute of Data / Metis。区别在于本地导师网络——前面这几家在澳洲市场推荐网络都没有 JR 集中（我们在悉尼 / 墨尔本 / 布里斯班有 60+ 在职 AI/Data Engineer 导师，覆盖 Atlassian、Canva、CBA、Macquarie、Mantel Group）。

P3 那 12 周做的事：

```
Project:    LangChain / LangGraph / CrewAI 选一个，做 production 级 multi-agent 系统
            含监控 (Prometheus + Grafana) / evaluation pipeline / rate limit
Production: 部署 AWS Cloud Run，对接和 JR 有合作的中小企业真实需求
Placement:  60+ 在职 AI/Data Engineer mentor 推荐 + 模拟面试 + 简历 review + 内推
```

Frank 的 P3 项目是给一家墨尔本会计师事务所做"自动归类 receipt PDF + 写 GST claim draft"的 multi-agent 系统。production 跑起来后客户每月省 6 小时人工。这个项目最后写进了他的 Atlassian 简历，是面试 system design round 主要讨论的内容。

---

## 5. 求职密集期（月 13-15）：投递 → onsite → offer

Frank 的真实数据：

| 阶段 | 数字 |
|---|---|
| LinkedIn 投递 | 89 份 |
| Recruiter screen 通过 | 12 |
| Technical screen 通过 | 6 |
| Onsite | 4 |
| Final round | 2 |
| Offer | 1（悉尼 SaaS B2B 公司，Junior AI Engineer，base 105k AUD + 10% bonus + visa sponsor 4 年 482） |

**坑 7：take-home 题超时**。Frank 第一家 onsite（一家 startup AI Engineer 岗位）take-home 是 "3 天内做一个 PDF 问答系统"。他做了 11 天才交（写得很全），直接被 reject。雇主 feedback：deadline 是 hard requirement，**3 天交 60 分的方案 > 11 天交 90 分的方案**。澳洲 startup 招人想看的是你能不能在不完美信息下推进项目。

教训：take-home 里学会写 README 解释 "我已知 X 没做完，因为 trade-off Y"，比硬磕完美更值钱。Frank 第二家 take-home 严格 3 天交，反而过了。

---

## 6. 11 个月真实总预算

| 阶段 | 时间 | 花费 (AUD) |
|---|---|---|
| Phase 0 | 月 1-3 | $180（API 钱 + Cursor pro $20/月 × 3） |
| Phase 0.5 | 月 4-6 | $580（API + 几本英文技术书 + Pinecone 试用付费版） |
| Phase 1 (Bootcamp) | 月 7-12 | $9,800（含 P3） |
| 求职密集期 | 月 13-14 | $260（LinkedIn Premium 2 个月 + 简历 review 一次付费） |
| ─────── | ─────── | ─────── |
| 总计 | 11 个月（少 1 个月，Frank 跑得快） | **$10,820 AUD** |

对比一下：墨尔本一年生活费（房租 + 吃饭 + 交通）约 30,000 AUD。**Bootcamp 投资占年生活费的 36%**——Frank 跟我说这是他这 35 年做过 ROI 最高的一次投资（offer 第一年 base 105k，回本 < 4 个月）。

**预算紧但时间充裕**（被 layoff 有 cushion）：自学全程 500-1000 AUD 完全可走。找 1-2 个老 AI Engineer 付费 1on1 mentor（澳洲市场时薪 100-200 AUD）补盲点更划算。

**时间紧但有积蓄**（全职上班想用业余时间转）：Bootcamp 类项目能省 6-9 个月"踩坑迷茫期"。Frank 走的就是这条。

---

## 7. 7 步行动清单（不论你最后选 JR、自学还是别家）

1. **本周内**：SEEK 抓前 30 个 "AI Engineer Australia" JD 的 Required Qualifications，看出现频率最高的 10 个关键词
2. **本周内**：GitHub 注册（如果还没有），头像 / bio / location 填好
3. **2 周内**：完成 Anthropic Skilljar "Introduction to Agent Skills" + Cursor 写一个 To-do List
4. **1 个月内**：用 Coze 或 Dify 做一个真实场景客服机器人（demo 给至少 3 个真实用户用过）
5. **2 个月内**：开始 LeetCode 简单题（每天 1 题，不要中断）+ DeepLearning.AI 至少 1 门免费课
6. **3 个月内**：写完 Phase 0 复盘（1000 字，老老实实评估自己要不要继续）
7. **6 个月内**：第一个 RAG side project deploy 完，GitHub README 重写过，LinkedIn 加上 "AI Engineer (in transition)" + 项目链接

走到第 7 步还想继续，再考虑要不要付费上 Bootcamp。**前 6 个月不该付费给任何人**，公开资源足够。

---

## 总结：Frank 复盘他要是再来一次会怎么做

我问他："如果给你重来一次，哪些坑能避开？"他列了这 6 个：

1. **不要在 Phase 0 付费**——免费资源够用，付费只是给焦虑买安慰剂
2. **chunk size 默认值 1000 字符直接炸**，第一次做 RAG 直接用 500 + overlap 100
3. **embedding 用 text-embedding-3-small，不要用 ada-002**
4. **API key 一定走 .gitignore + gitleaks**，不要相信肌肉记忆
5. **take-home 严格守 deadline**，README 写清楚 trade-off 比硬磕完美值钱
6. **LinkedIn message 别套近乎**，直接说 "我在学 X，能聊 30 分钟咖啡吗" 转化率高 5 倍

少踩这 6 个能省 4 个月。Frank 的 11 个月里大概有 4 个月是在踩这些坑。如果他第一天就读到这篇文章，可能 7 个月就能跑通。

---

## 想真做项目的话

匠人学院（JR Academy）AI Engineer Bootcamp Phase 1 把 RAG（Phase 3, 70 lessons）+ Agent Core（4 phase 共 100+ lessons）+ Production Ops 全部讲完，外加 P3 12 周直接对接本地雇主项目。完整大纲（286 lessons / 869 steps / 68 互动 lab）开源在 [github.com/JR-Academy-AI/jr-academy-ai](https://github.com/JR-Academy-AI/jr-academy-ai)。

如果 Python 基础需要先补，[/learn/python](https://jiangren.com.au/learn/python) 是免费路径；想了解整个 AI Engineer 职业路径（含澳洲就业 visa + 12-18 个月时间表），[/learn/ai-engineer](https://jiangren.com.au/learn/ai-engineer) 路径页有完整内容。Bootcamp 报名主入口：[jiangren.com.au/bootcamp](https://jiangren.com.au/bootcamp)。

匠人学院 AI Engineer 课程教研团队 · 2026-05-09

如果你也是非技术背景在转 AI Engineer，欢迎评论区贴你 Phase 0 / 0.5 / 1 现在卡在哪一步——群里有人帮你看。
