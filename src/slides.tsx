import type { ReactNode } from "react";

export type Slide = {
  id: string;
  section: string;
  title: string;
  kicker: string;
  content: ReactNode;
};

const Pill = ({ children }: { children: ReactNode }) => (
  <span className="interactive-pill">
    {children}
  </span>
);

const Metric = ({ value, label }: { value: string; label: string }) => (
  <div className="interactive-card rounded-3xl p-5 shadow-glow">
    <div className="text-4xl font-semibold text-white">{value}</div>
    <div className="mt-2 text-sm text-slate-300">{label}</div>
  </div>
);

export const slides: Slide[] = [
  {
    id: "cover",
    section: "开场",
    kicker: "Codex Capability Layer",
    title: "让我们看看Agent Skill 是什么？",
    content: (
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="max-w-3xl text-2xl leading-relaxed text-slate-200">
            它是一份可复用的任务说明书，让 Codex 在特定场景里拥有更稳定的流程、工具习惯和领域判断。
          </p>
          <div className="flex flex-wrap gap-3">
            <Pill>可触发</Pill>
            <Pill>可复用</Pill>
            <Pill>可组合</Pill>
            <Pill>可验证</Pill>
          </div>
        </div>
        <div className="interactive-card relative min-h-72 rounded-[2rem] p-8">
          <div className="absolute inset-8 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative space-y-4">
            {["User Goal", "Skill Workflow", "Codex Tools", "Verified Output"].map((item, index) => (
              <div key={item} className="interactive-card rounded-2xl p-4">
                <span className="mr-3 text-cyan-300">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    section: "为什么需要",
    kicker: "The Problem",
    title: "通用智能很强，但重复任务需要稳定轨道",
    content: (
      <div className="grid gap-5 md:grid-cols-3">
        <Metric value="上下文" label="任务需要长期记住约定、文件结构和验证方式。" />
        <Metric value="流程" label="复杂任务不是一句提示，而是一组可执行步骤。" />
        <Metric value="质量" label="输出需要可检查，而不是只看起来合理。" />
      </div>
    ),
  },
  {
    id: "definition",
    section: "定义",
    kicker: "Mental Model",
    title: "Skill = Codex 的专业工作流插件",
    content: (
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="interactive-card rounded-3xl p-7">
          <h3 className="text-2xl font-semibold text-white">它包含什么</h3>
          <ul className="mt-5 space-y-4 text-lg text-slate-200">
            <li>触发条件：什么时候该使用它</li>
            <li>执行流程：先做什么，后验证什么</li>
            <li>参考资料：需要时再加载的知识</li>
            <li>脚本/资产：可复用的工具和模板</li>
          </ul>
        </div>
        <div className="interactive-card rounded-3xl p-7">
          <h3 className="text-2xl font-semibold text-cyan-100">它不是什么</h3>
          <ul className="mt-5 space-y-4 text-lg text-slate-200">
            <li>不是一次性的提示词</li>
            <li>不是只能写文档的 README</li>
            <li>不是替代 Codex，而是增强 Codex</li>
            <li>不是越长越好，而是越精准越好</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "anatomy",
    section: "结构",
    kicker: "Anatomy",
    title: "一个 Skill 通常由三层组成",
    content: (
      <div className="grid gap-4">
        {[
          ["Metadata", "name + description，决定 Codex 是否自动触发。"],
          ["SKILL.md", "核心工作流，尽量短、准、可执行。"],
          ["Resources", "脚本、参考资料、模板和资产，按需加载。"],
        ].map(([name, desc], index) => (
          <div key={name} className="interactive-card group flex items-center gap-6 rounded-3xl p-6">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/15 text-xl font-semibold text-cyan-200">
              {index + 1}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">{name}</h3>
              <p className="mt-1 text-lg text-slate-300">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "codex-expansion",
    section: "扩展能力",
    kicker: "Expansion",
    title: "Skill 让 Codex 从“会做”变成“按你的方式做”",
    content: (
      <div className="grid gap-6 md:grid-cols-2">
        {[
          ["设计", "把视觉规则、组件规范和验收标准写成稳定流程。"],
          ["工程", "固定 repo 命令、测试策略、提交习惯和目录边界。"],
          ["文档", "复用模板、格式、审阅口径和导出检查。"],
          ["自动化", "把重复步骤沉淀为脚本，减少人工口头解释。"],
        ].map(([title, text]) => (
          <div key={title} className="interactive-card rounded-3xl p-6">
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-slate-300">{text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "workflow",
    section: "运行方式",
    kicker: "Runtime Flow",
    title: "Codex 如何使用 Skill",
    content: (
      <div className="relative grid gap-4">
        {[
          "识别用户目标和关键词",
          "加载匹配 skill 的 SKILL.md",
          "按 workflow 执行、读取必要资源",
          "运行工具或修改文件",
          "按 checklist 验证结果",
        ].map((step, index) => (
          <div key={step} className="interactive-card flex items-center gap-5 rounded-3xl p-5">
            <span className="text-3xl font-black text-cyan-300/80">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-xl text-slate-100">{step}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "example",
    section: "例子",
    kicker: "This Deck",
    title: "本项目就是一个网页式 PPT Skill 的测试样本",
    content: (
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="interactive-card rounded-3xl p-7">
          <h3 className="text-2xl font-semibold text-cyan-100">功能清单</h3>
          <ul className="mt-5 space-y-3 text-lg text-slate-200">
            <li>React + Vite + TypeScript + Tailwind</li>
            <li>键盘翻页、按钮翻页、全屏</li>
            <li>Agenda、进度条、页码</li>
            <li>浏览器打印为 PDF</li>
          </ul>
        </div>
        <pre className="interactive-card overflow-hidden rounded-3xl p-7 text-sm leading-relaxed text-cyan-100">
{`npm install
npm run dev

# 打开浏览器地址
http://127.0.0.1:5173`}
        </pre>
      </div>
    ),
  },
  {
    id: "closing",
    section: "结尾",
    kicker: "Takeaway",
    title: "把好方法沉淀为 Skill，Codex 就会越用越顺手",
    content: (
      <div className="interactive-card rounded-[2rem] p-10">
        <p className="max-w-4xl text-3xl font-medium leading-relaxed text-white">
          Skill 的价值不是“让 Codex 多记一点”，而是让复杂任务拥有明确入口、稳定流程、可复用工具和可靠验收。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Pill>少解释</Pill>
          <Pill>少返工</Pill>
          <Pill>更一致</Pill>
          <Pill>更可验证</Pill>
        </div>
      </div>
    ),
  },
];
