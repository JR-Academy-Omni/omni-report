---
sot: curriculum/ai-engineer-bootcamp
sot_version: 2026-07-08
channel: xiaohongshu
status: draft
---

# KIKI的分享日记｜小红书初稿

## 标题

OpenAI正在全球抢FDE🔥

## 正文

AI Engineer 还没研究明白，大厂已经开始抢下一种人了：FDE。

我刚查了 OpenAI 的招聘页。截至 11 月 12 日，搜索 `forward deployed`，官网显示 41 个相关岗位。

不只旧金山和纽约，悉尼、新加坡、东京、首尔、伦敦都在招；岗位也已经拆进金融、医疗、法律、网络安全、生命科学和 AI 基础设施。

Atlassian 在招 Principal FDE，Figma 的招聘页也出现了 Forward Deployed Engineer。

这个信号其实很明显：模型越来越强以后，企业真正缺的已经不只是“会做一个 AI Demo 的人”，而是能把 AI 接进真实业务、推到生产环境、最后让员工真的用起来的人。

这就是 FDE 值钱的地方。

先用一个 AI 客服项目讲清楚，Software Engineer、AI Engineer 和 FDE 到底差在哪👇

💻 Software Engineer：把系统建稳

他负责账号、权限、数据库、订单接口和后台服务。用户同时涌进来，系统不能挂；以后增加新功能，代码不能全部推倒重写。

简单说，SWE 负责的是“这个软件能不能长期稳定运行”。

🤖 AI Engineer：让 AI 回答靠谱

他负责让模型读懂公司资料、正确调用订单工具，准备测试题检查回答质量，再监控它上线后经常在哪些问题上出错。

RAG、Agent、Tool Calling、Evals，都是在解决同一件事：AI 不能只在 Demo 里看起来聪明，还得能测试、能追踪、出错后知道怎么改。

简单说，AI Engineer 负责的是“这个 AI 到底能不能用”。

🚀 FDE：让整套方案解决客户的问题

客户说“我要做 AI 客服”，FDE 不会立刻开始写代码。

他会先问：客服最浪费时间的是退款、查物流还是改地址？哪些回答可以自动发？哪些必须人工确认？资料在哪个系统？谁有权批准上线？做完以后，用什么数字判断项目成功？

接着他要决定先做哪一段、预算花在哪里、哪些功能暂时不做，再带着工程团队把 AI 接进客户已有的 CRM、工单和审批流程。

上线后还没完。他要继续看员工有没有使用、流程有没有变快、失败时谁接手、客户团队能不能自己维护。

所以 FDE 不是普通售前，也不是只负责写 Agent 的 AI Engineer。

他从客户还没把问题说清楚时就进场，一直负责到系统进入生产、产生可衡量的业务结果，再把现场反复出现的问题带回 Product 和 Research，变成下一版产品能力。

为什么这类岗位薪资高？

因为企业同时要求他具备四种能力：

1️⃣ 能写 production-grade 前后端代码；  
2️⃣ 懂 LLM、Agent 和模型评估；  
3️⃣ 能跟客户一起拆业务、范围和预算；  
4️⃣ 能在需求不断变化时，把项目真正交付。

这四种能力分开并不少见，集中在同一个人身上就很稀缺。

OpenAI Seattle 的 FDE 岗位公开基本工资是 US$185K–300K，股权另计。要求也很直接：5 年以上工程或技术交付经验，能写生产级代码，并负责 discovery、technical scoping、system design、build 和 production rollout。

注意，这是美国单个岗位的公开区间，不是所有地区的平均工资，更不代表学完就能拿到这个数字。

但 FDE 的职业前景已经不只是一种猜测：同一家公司正在把岗位扩到不同国家和行业，还继续往 Deployment Lead、FDE Manager 和行业专精方向拆。

真正的门槛也在这里——会开发 AI 应用，只是起点。

你还要会判断这个问题值不值得做、现有系统能不能接、预算够不够、权限和风险怎么处理、客户最后能不能接手。

这也是 JR Academy 新开的 FDE Tech 职业进阶班重点训练的部分。

它不是零基础 AI 课，而是给已经能独立开发、调试 AI 应用，希望从 AI Engineering 走向企业客户交付的工程师。

整个训练周期 10 周。每轮从一份企业 Client Brief 开始：你要调查现状、找出缺失信息、提出 Solution Proposal，再做 Present & Pitch，接受导师和同学的 Technical Review，最后根据质询修改方案并推进交付。

课程里有 30 项工程交付任务，覆盖客户调查、架构取舍、系统接入、Agent 控制、质量评估、试点与交接。不是只交一份能跑的代码，而是要留下预算、风险、验收、回滚、Runbook 和客户接手需要的完整证据。

首期预购 A$4,400。课程面向澳洲 A$200,000+、北美 US$250,000+ 的求职目标，但这是岗位定位，不是入职或薪资保证。

如果你已经会做 RAG、Agent 和 AI 应用，却发现自己还不会面对企业客户、讲清方案、控制预算并把项目推到上线，这门课补的就是中间这段差距。

想看完整 10 周安排，课程名是【FDE Tech 职业进阶班】。感兴趣评论区留【FDE】👀

## 话题

#FDE #AIEngineer #软件工程师 #AI求职 #程序员转型 #澳洲求职 #人工智能

## 自检

- ✅ 开头用当前官方招聘数量建立岗位需求信号
- ✅ 先用同一项目讲清 SWE、AI Engineer、FDE 的差别
- ✅ 薪资注明地区、口径和非保证边界
- ✅ 课程定位、周期、任务与价格均来自当前课程页
- ✅ 没有包就业、保证薪资或夸大岗位结果
- ✅ CTA 直接承接 FDE Tech 课程

## 内部事实来源（发布时不复制）

- OpenAI Careers｜Forward Deployed 搜索结果：https://openai.com/careers/search/?q=forward+deployed
- OpenAI｜Forward Deployed Engineering：https://openai.com/business/forward-deployed-engineering/
- OpenAI｜Forward Deployed Engineer (FDE) - Seattle：https://openai.com/careers/forward-deployed-engineer-%28fde%29-seattle-seattle/
- Atlassian｜Meet the Forward Deployed Engineer：https://www.atlassian.com/blog/how-we-build/meet-the-forward-deployed-engineer
- Atlassian｜Principal Forward Deployed Engineer：https://www.atlassian.com/company/careers/details/27179
- Figma Careers：https://www.figma.com/careers/
- JR Academy｜FDE Tech 职业进阶班：https://jracademy.ai/program-course/fde-tech

