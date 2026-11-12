---
sot: curriculum/ai-engineer-bootcamp
sot_version: 2026-07-08
channel: xiaohongshu
status: draft
---

# KIKI的分享日记｜小红书初稿

## 标题

SWE、AI工程师、FDE到底谁干啥？

## 正文

假设一家公司说：

“我们想做一个 AI 客服。”

Software Engineer、AI Engineer 和 FDE 听到的是同一句话，但三个人接下来做的事完全不一样。

这可能是理解三个岗位最简单的方式👇

💻 Software Engineer：先把“客服系统”搭起来

他会关心：用户怎么登录？聊天记录存在哪里？怎么连接订单系统？谁能查看客户资料？同时来一万人，系统会不会挂？

他负责的是软件本身能不能稳定运行。

最后交付的，是账号、权限、数据库、接口和后台服务。即使把 AI 拿掉，这些东西也必须存在。

所以 SWE 更像在修路、搭桥、盖房子的主体结构。重点是稳、快、以后方便继续改。

🤖 AI Engineer：让“AI 客服”真的会回答

系统搭好不等于 AI 能用。

AI 可能看不懂公司的产品资料，可能编答案，也可能明明能查订单，却不知道什么时候应该调用订单工具。

AI Engineer 要解决这些问题：

把公司资料接给模型，让它先查资料再回答；给 Agent 配好可以调用的工具；准备一批真实问题，测试它答对了多少；上线后监控哪些问题经常答错。

这些工作常被叫作 RAG、Tool Calling、Evals 和 Monitoring。名字听起来复杂，其实核心就一句话：让 AI 的回答有依据、能测试、出了错能找到原因。

所以 AI Engineer 负责的不是“系统能不能打开”，而是“AI 到底靠不靠谱”。

🚀 FDE：先判断这个 AI 客服值不值得做、怎么才能真正用起来

FDE 全称 Forward Deployed Engineer。他通常会直接进入客户的业务现场。

他不会听完“做 AI 客服”就马上开工，而是继续问：

客服每天最浪费时间的是哪类问题？退款、查物流还是改地址？哪些回答可以自动发，哪些必须让人工确认？资料散落在哪些系统？做完以后，用什么数字判断它真的有用？

问清楚后，FDE 才会决定先做哪一小段，再把 AI 接进客户已经在用的 CRM、工单系统和审批流程。

上线也不代表结束。他还要看客服愿不愿意用、哪里总是卡住、哪些做法可以整理成通用功能，交回产品团队继续完善。

所以 FDE 很像“会写代码的产品经理＋技术顾问＋交付工程师”，但他的核心仍然是亲手把方案推到生产环境，而不是只做 PPT 或讲概念。

同一个 AI 客服项目，三个人可以这样分工：

SWE：把客服平台建稳；  
AI Engineer：让 AI 回答得准；  
FDE：确保这套东西解决了客户的问题，而且真的有人用。

这也是为什么 FDE 不是 AI Engineer 的“高级版”。

AI Engineer 可以长期负责一个公司的 AI 产品；FDE 更常围绕具体客户和具体业务，从需求没说清楚的时候介入，一直跟到落地。

我自己的判断是：

喜欢安静打磨系统、研究架构 → SWE  
喜欢测试模型、研究 AI 为什么答错 → AI Engineer  
喜欢跟人聊需求、处理混乱现场、把项目推上线 → FDE

不同公司的岗位边界会重叠，最终还是要看 JD。但看到这里，应该不会再把这三个岗位当成同一份工作了 hhh。

你最想做哪一个？【SWE / AI / FDE】👀

## 话题

#AIEngineer #软件工程师 #FDE #程序员转型 #AI求职 #职业规划 #科技行业

## 自检

- ✅ 开头直接进入同一个 AI 客服场景
- ✅ 三个岗位使用同一项目进行横向比较
- ✅ 专业词均用中文解释实际作用
- ✅ 有 KIKI 的第一人称判断和轻互动 CTA
- ✅ 未虚构岗位数量、薪资或就业结果
- ✅ 明确岗位边界需结合具体公司 JD

## 内部事实来源（发布时不复制）

- OpenAI｜Forward Deployed Engineering：https://openai.com/business/forward-deployed-engineering/
- OpenAI｜Forward Deployed Engineer (FDE) - Seattle：https://openai.com/careers/forward-deployed-engineer-%28fde%29-seattle-seattle/
- Microsoft Learn｜Training for AI engineers：https://learn.microsoft.com/en-us/training/career-paths/ai-engineer

