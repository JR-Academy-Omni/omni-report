---
sot: curriculum/ai-engineer-bootcamp
sot_version: 2026-07-08
channel: xiaohongshu
status: draft
---

# KIKI的分享日记｜小红书初稿

## 标题

软件工程师、AI工程师、FDE差在哪🤯

## 正文

如果你把 SWE → AI Engineer → FDE 理解成一条“升级路线”，那从投岗位的第一步就可能搞错了。

这三种人都写代码，技术栈甚至会重叠。真正的分界线是：公司把哪一种“不确定性”交给你负责。

💻 Software Engineer｜解决软件系统的不确定性

产品方向通常已经相对明确：要做支付、搜索、权限还是消息系统。SWE 的任务，是把需求变成可长期运行的工程系统。

他更关心：架构能不能扩、接口会不会崩、数据是否一致、代码能否维护。写出来的能力通常要服务一类用户，而不是只解决某一个客户的问题。

所以 SWE 的核心交付物不是“功能做出来了”，而是一套可复用、可维护、能持续演进的系统。

🤖 AI Engineer｜解决模型行为的不确定性

到了 AI 产品，最大的问题变成：同一个输入，模型不一定每次都给你稳定答案。

AI Engineer 不只是接个 API。他要处理 RAG 的召回质量、Agent 的工具调用、Prompt 和 Model Routing、Evals、Tracing、Guardrails、延迟与成本。

普通软件常问“代码有没有按逻辑运行”；AI 系统还要问“答案到底好不好、坏在哪里、换模型后有没有退化”。

所以 AI Engineer 的核心交付物，是一套可以被评估、监控和持续改进的 AI 能力。

🚀 FDE｜解决客户业务与落地的不确定性

FDE 接到的问题，往往连需求本身都没定义清楚。

客户说“我们想做一个 AI 助手”，FDE 不能马上开始写 Agent。他得先进入真实工作流：谁在用？数据在哪？哪个环节最耗时间？哪些错误必须人工审批？接进 CRM 后谁负责维护？

然后他才会做 technical scoping、Prototype、系统集成、Evals、权限、监控和 production rollout。上线以后还要看 adoption——员工到底有没有用，业务流程有没有真的改变。

更关键的是，FDE 还要把客户现场反复出现的问题带回 Product 和 Research：哪些是单个客户的定制需求，哪些应该沉淀成所有客户都能用的 building block。

所以 FDE 不是“更高级的 AI Engineer”，也不是只会讲方案的售前。他负责的是从模糊业务问题，到系统真正被使用的整段结果。

举个理赔 AI 的例子👇

SWE 会搭账号、权限、审计日志和稳定的服务接口；  
AI Engineer 会处理保单检索、引用准确率、幻觉测试和人工兜底；  
FDE 会跟理赔团队一起重画流程，找出哪些案件能自动化、哪些必须升级给人工，再把系统接进现有工具并推到实际使用。

我觉得选岗位时，别先问“哪个更火”，先问自己喜欢哪种工作节奏：

喜欢长期打磨底层系统、抽象共性 → SWE  
喜欢研究模型表现、用实验和指标迭代 → AI Engineer  
喜欢面对客户、拆模糊问题、端到端推上线 → FDE

最后看 JD 里的动词：反复出现 platform、scalability、maintainability，多半偏 SWE；出现 eval、model quality、RAG、Agent，多半偏 AI Engineer；出现 discovery、scoping、customer adoption、production rollout，多半偏 FDE。

这比只看岗位 title 准多了。你更适合哪一种？【SWE / AI / FDE】👀

## 话题

#AIEngineer #软件工程师 #FDE #程序员转型 #AI求职 #科技行业

## 自检

- ✅ 第一段直接打破“岗位升级路线”误区
- ✅ 保留 RAG、Agent、Evals 等具体技术信息
- ✅ 有 KIKI 的第一人称判断和选择偏好
- ✅ 未虚构岗位数量、薪资或就业结果
- ✅ 明确岗位边界需结合具体公司 JD

## 内部事实来源（发布时不复制）

- OpenAI｜Forward Deployed Engineering：https://openai.com/business/forward-deployed-engineering/
- OpenAI｜Forward Deployed Engineer (FDE) - Seattle：https://openai.com/careers/forward-deployed-engineer-%28fde%29-seattle-seattle/
- Microsoft Learn｜Training for AI engineers：https://learn.microsoft.com/en-us/training/career-paths/ai-engineer


