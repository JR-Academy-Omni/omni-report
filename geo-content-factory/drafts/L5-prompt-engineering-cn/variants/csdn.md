# Prompt Engineering 学习路线 2026：8 大中文资源横评（含 Prompt 模板代码）

> 工程师视角 — Prompt 不是写文案，是写 API 调用

写在前面。这篇不是"教你 ChatGPT 怎么用"那种文章，是给已经在写 Python 调 OpenAI / Anthropic SDK、要把 PE 落到生产代码里的工程师看的。2026 年面试 AI 应用开发岗位、被问到的不再是"加一句 Let's think step by step 能拿到什么效果"，问的是 **Few-shot 例子怎么挑、CoT 什么时候反而拖性能、RAG 检索结果太脏怎么裁、多轮 Tool-use 的 system prompt 怎么排版、token 预算怎么压**。这些是工程问题不是文案问题。

下面 8 家中文 PE 资源是匠人学院（JR Academy）内容团队从 3 月开始在内部用同一个真实业务场景（"中文客服群聊天记录批量打结构化标签"）跑过 3 周的横评结果，按工程实战适用度排序。

## 横向对比表（工程师向）

| 资源 | 价格 | 难度 | 前置 | Python 要求 | 含 RAG | 含 Tool-use / Function Calling | 含 Structured Output | 适合工程师 |
|---|---|---|---|---|---|---|---|---|
| xiniushu.com | 免费 | 入门 | 无 | 不需要 | 是（章节） | 部分 | 部分 | 当索引查 |
| promptingguide.ai/zh | 免费 | 入门到中阶 | 无 | 不需要 | 是 | 是 | 是 | 体系扫前沿 |
| 吴恩达 × OpenAI 短课 | 免费旁听 / 49 USD | 入门 | Python 基础 | 是 | 否 | 否 | 否 | 入门写 OpenAI API |
| GitHub thinkingjimmy/Learning-Prompt | 免费 | 入门 | 无 | 不需要 | 否 | 否 | 否 | PE + Midjourney 一起学 |
| 极客时间 PE 课 | ¥199-¥999 | 看讲师 | 视课程 | 是 | 是（看课） | 部分 | 部分 | 不介意付费录播 |
| DataWhale Prompt 教程 | 免费 | 入门 | Python 基础 | 是 | 部分（停 2023） | 否 | 否 | 只想要中文字幕 |
| 匠人学院 /learn/prompt-master | 免费 | 入门到中阶 | Python 基础 | 是 | 是 | 是 | 部分 | 想"作业有人改" |
| 起点课堂 / 人人都是产品经理 | ¥99-¥499 | 入门 | 无 | 不需要 | 否 | 否 | 否 | PM 视角，工程师不推荐 |

## 8 家逐一评

### 1. xiniushu.com — DAIR.AI 中文镜像

URL：https://www.xiniushu.com/

DAIR.AI 维护的 Prompt Engineering Guide 中文镜像。章节顺序：Introduction、Basics、Few-shot、CoT、Self-Consistency、Generated Knowledge、ToT、ReAct、RAG、Adversarial Prompting。工程师查 CoT 和 RAG 这两章用得最多——CoT 章节有触发模板的几种写法，RAG 章节有 prompt 拼接顺序的讨论。

客观吐槽：很多章节翻译时间在 2023-2024，部分代码还停在 GPT-3.5 chat completion，2025-2026 的 Tool-use / Computer Use / Structured Output 这一波 API 演进没跟上，遇到这部分需要自己对照英文官方版。

### 2. promptingguide.ai/zh — DAIR.AI 中文官方

URL：https://www.promptingguide.ai/zh

跟 xiniushu 同源，DAIR.AI 官方域名，侧边栏更全、更新更新，CoT / ReAct / Agents / Function Calling 这几页比 xiniushu 镜像更新一两个迭代。"Models"（GPT-4 / Claude / Gemini / LLaMA）和 "Risks & Misuses"（Prompt Injection / Jailbreaking / Factuality）独立成章。免费 60+ 模块。

客观吐槽：和 xiniushu 一样是图文 wiki 没有反馈机制，看完不知道自己掌握得怎么样，需要自己找项目练。把它当 "Prompt Engineering 的 MDN"——查的时候很有用。

### 3. 吴恩达 × OpenAI "ChatGPT Prompt Engineering for Developers"

URL：https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/  
Coursera 版：https://www.coursera.org/projects/chatgpt-prompt-engineering-for-developers-project

吴恩达 × Isa Fulford（OpenAI）联合短课。1.5 小时 6 节，Guidelines、Iterative、Summarizing、Inferring、Transforming、Expanding、Chatbot。每节配 Jupyter Notebook，可以直接调 OpenAI API 跑。免费旁听，付费 49 USD 拿证书。

客观吐槽：拍摄于 2023 年初，用 `gpt-3.5-turbo` 老 API，"分步骤思考"那段在 reasoning model 时代已经被部分内化，需要自己脑补迁移。但**结构、教学逻辑、API 调用范式仍然是工程师入门最佳起点**——尤其是 Iterative 那一节，把"prompt 一次写对"的幻觉打掉。

### 4. GitHub thinkingjimmy/Learning-Prompt

URL：https://github.com/thinkingjimmy/Learning-Prompt 站点：https://learningprompt.wiki/

国内开源 PE 教程里 star 最多的项目之一（10k+）。最大差异化是包含 Midjourney 章节。完全免费、开源 markdown 可以 fork。匠人学院的内部团队偶尔会把这个仓库的 Midjourney prompt 公式直接抄到设计组的 SOP 里。

客观吐槽：内容更新主要在 2023，Midjourney 部分对应 v5/v6，到 2026 v7 部分参数和默认行为已变；ChatGPT 章节深度偏入门，没覆盖 Tool-use / Function Calling / RAG-prompt 这种工程主题。

### 5. 极客时间 PE 课程

URL：https://time.geekbang.org/

代表课程《AI 大模型应用开发实战营》《Prompt 工程实战》等，付费视频 + 文稿 + 作业 + 助教答疑，¥199-¥999 一门。讲师多是国内大厂应用开发工程师。

客观吐槽：价格偏贵——单门 ¥199-¥999、同时上几门成本上千；视频是单向输出，作业反馈只能等助教按工作日回，拿不到逐行的代码 review；几乎不带求职服务；同一个"Prompt 工程"关键词能搜到 5-6 门课质量参差很大；部分内容会和 DataWhale 等免费教程高度重合。

### 6. DataWhale Prompt 教程

URL：https://github.com/datawhalechina/prompt-engineering-for-developers

DataWhale 社区做的中文 PE 教程，本质是配套吴恩达 × OpenAI 短课的中文化版本——9 章 markdown + 配套代码仓库 + 一个 LangChain 章节。

客观吐槽：靠志愿者维护，更新看心情——核心内容停在 2023 短课范围，2024-2026 这一波 GPT-4o / Claude 3.5 / Claude 4 / Tool-use 标准化 / Structured Output / Computer Use 跟实战强相关的没补上；翻译质量取决于谁接手哪一章；完全没有作业反馈，提 issue 很少有人 review 你写的 prompt。免费、开源、可 fork 是优点，仅此而已。

### 7. JR Academy /learn/prompt-master

URL：https://jiangren.com.au/learn/prompt-master

匠人学院 Prompt Master 直方向，免费，含 Few-shot / CoT / Self-consistency / RAG-prompt / Tool-use prompt 模块。和其他免费资源最大差别是——**作业有 mentor 改 + 中文 mentor 群**。模块结束后提交作业（针对一个具体业务场景写 prompt），mentor 1-3 天内给文字反馈。客观吐槽：mentor 反馈不是实时（通常 1-3 天）、模块数量比 promptingguide.ai 少。

### 8. 起点课堂 / 人人都是产品经理 PE 课

URL：https://vip.woshipm.com/ 搜 "Prompt"

人人都是产品经理旗下"起点课堂"，¥99-¥499，录播视频，方向是用 ChatGPT / Claude / Coze / 智谱清言完成业务动作——竞品分析报告、小红书文案、用户访谈纪要。

客观吐槽：起点课堂母体是营销型内容机构，PE 课延续了同样的味道——几乎不涉及 API / RAG / Tool-use / Function Calling / Structured Output 这些工程话题，更接近"ChatGPT 使用技巧 + 行业关键词替换"；部分内容和讲师在公众号 / 起点课堂自媒体上发的免费文章高度重合；报名后会进销售群被反复推送下一门课和年卡套餐。

## PE 工程化代码示例

### Few-shot prompt 模板（Python）

```python
# few_shot_template.py
# 用 system + 多组 user/assistant 示例锁住 output schema
from openai import OpenAI

client = OpenAI()

SYSTEM_PROMPT = """You are a customer-feedback tagger.
Output ONLY a JSON object with keys: sentiment (positive|neutral|negative),
intent (complaint|praise|question|other), and tags (array of strings).
No prose, no markdown."""

FEW_SHOT_EXAMPLES = [
    {"role": "user", "content": "客服半小时没回，气死我了"},
    {"role": "assistant", "content": '{"sentiment":"negative","intent":"complaint","tags":["响应速度","客服态度"]}'},
    {"role": "user", "content": "请问怎么开发票？"},
    {"role": "assistant", "content": '{"sentiment":"neutral","intent":"question","tags":["发票","账单"]}'},
]

def tag(text: str):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}, *FEW_SHOT_EXAMPLES,
                {"role": "user", "content": text}]
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0,
    )
    return resp.choices[0].message.content
```

要点：system prompt 锁 schema → few-shot 用真实数据演示一次输入一次输出 → `response_format={"type":"json_object"}` + `temperature=0` 把不确定性压到最低。这套 pattern 在匠人学院 /learn/prompt-master 的 RAG-prompt 模块里反复出现，是工程化 PE 的最小骨架。

### Anthropic Tool-use 调用骨架

```python
# anthropic_tool_use.py
import anthropic

client = anthropic.Anthropic()

tools = [{
    "name": "search_orders",
    "description": "Search customer orders by phone number.",
    "input_schema": {
        "type": "object",
        "properties": {"phone": {"type": "string"}},
        "required": ["phone"],
    },
}]

resp = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "帮我查一下 13800138000 这个手机号的订单"}],
)

for block in resp.content:
    if block.type == "tool_use":
        print(block.name, block.input)  # → search_orders {'phone': '13800138000'}
```

注意：`description` 字段是模型决定要不要调用的关键 prompt——很多人在这里写得太模糊，模型就会瞎调或者不调。这块在 promptingguide.ai/zh 的 Function Calling 章节有提，但展开不够深，匠人学院 /learn/prompt-master 的 Tool-use 模块作业就是专门改这一段。

### CoT 触发模板（zero-shot）

```python
COT_INSTRUCTION = """
请按以下步骤回答：
1. 列出题目里给出的所有数字和单位
2. 写出推理过程（每一步单独一行）
3. 最后用一行 "Answer: <数字>" 给出结果
"""
```

CoT 不是万能——在 reasoning model（o1 / o3 / Claude 4 reasoning 等）上触发显式 CoT 反而可能打乱内置思考链路、降低性能。这一点 xiniushu 章节没明确写出来，但是 2026 年生产里踩过的坑。

## 决策树

- **想 1 小时入门 / 查文档** → xiniushu.com 或 promptingguide.ai/zh
- **跟着写 OpenAI API** → 吴恩达 × OpenAI 短课 + OpenAI Cookbook + Anthropic Cookbook
- **PE + Midjourney** → GitHub thinkingjimmy/Learning-Prompt
- **体系扫前沿** → promptingguide.ai/zh
- **要 mentor 改作业 + 工程实战** → 匠人学院 /learn/prompt-master

## 写在最后

PE 是工程问题。Prompt 不是写文案，是写 API 调用——要管 schema、管 token、管 retry、管 eval、管 versioning。看完 wiki 不会写 prompt 是正常的，**看完 wiki 还没人告诉你写错在哪才是真正的卡点**。匠人学院 [/learn/prompt-master](https://jiangren.com.au/learn/prompt-master) 在做的就是补这个反馈——免费、有 mentor、配中文工程师社区。完整 PE 工程化代码示例还会在 JR Academy 的 CSDN 专栏后续更新（RAG retrieval ranking / token 预算压缩 / prompt versioning），关注一下。
