import type { ReactNode } from 'react'

export type SlideDefinition = {
  id: string
  section: string
  eyebrow: string
  title: string
  subtitle?: string
  tone: 'hero' | 'signal' | 'map' | 'split' | 'stack' | 'flow' | 'proof' | 'close'
  content: ReactNode
}

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="interactive-chip">
    {children}
  </span>
)

const Metric = ({
  label,
  value,
  accent = 'cyan',
}: {
  label: string
  value: string
  accent?: 'cyan' | 'violet' | 'green'
}) => {
  const color =
    accent === 'violet'
      ? 'text-violet-300'
      : accent === 'green'
        ? 'text-aurora'
        : 'text-cyanGlow'

  return (
    <div className="interactive-card rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-panel backdrop-blur">
      <div className={`font-mono text-4xl font-black ${color}`}>{value}</div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{label}</p>
    </div>
  )
}

const Card = ({
  title,
  text,
  index,
}: {
  title: string
  text: string
  index: string
}) => (
  <div className="interactive-card group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 p-6 shadow-panel">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyanGlow/80 to-transparent opacity-70" />
    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyanGlow/10 font-mono text-sm font-bold text-cyanGlow ring-1 ring-cyanGlow/30">
      {index}
    </div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="mt-3 text-base leading-7 text-slate-300">{text}</p>
  </div>
)

export const slides: SlideDefinition[] = [
  {
    id: 'opening',
    section: '开场',
    eyebrow: 'Agent Skill Primer',
    title: 'Agent Skill 是什么？',
    subtitle: '以及它如何让 Codex 从“通用助手”变成“带工具箱的专家”',
    tone: 'hero',
    content: (
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="把重复经验封装成可复用流程" value="Workflow" />
        <Metric label="把文件、脚本和参考资料交给 Agent" value="Context" accent="violet" />
        <Metric label="让 Codex 在正确场景自动调用能力" value="Trigger" accent="green" />
      </div>
    ),
  },
  {
    id: 'agenda',
    section: '路线图',
    eyebrow: 'Agenda',
    title: '今天看 4 件事',
    subtitle: '从概念到落地，再到你能怎样使用它。',
    tone: 'map',
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['01', 'Skill 的定义', '它不是插件，也不只是提示词，而是一套可触发的工作规程。'],
          ['02', 'Skill 的结构', 'SKILL.md、references、scripts、assets 分层提供能力。'],
          ['03', 'Codex 如何使用', '先读规则，再按工作流行动，最后验证结果。'],
          ['04', '适合什么任务', '文档、演示、前端、数据、自动化等重复高价值工作。'],
        ].map(([index, title, text]) => (
          <Card key={index} index={index} title={title} text={text} />
        ))}
      </div>
    ),
  },
  {
    id: 'definition',
    section: '定义',
    eyebrow: 'Mental Model',
    title: 'Skill 是给 Agent 的“专业说明书”',
    subtitle: '它把知识、步骤、约束和工具入口放在一个可发现的位置。',
    tone: 'split',
    content: (
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="interactive-card rounded-[2rem] border border-cyanGlow/20 bg-cyanGlow/10 p-7">
          <p className="text-2xl font-semibold leading-10 text-white">
            好的 Skill 会告诉 Codex：
            <span className="text-cyanGlow">什么时候用、怎么做、做到什么程度算完成。</span>
          </p>
        </div>
        <div className="space-y-4">
          {[
            '触发条件：用户提出哪类任务时加载它',
            '工作流：先读什么、再改什么、最后怎么验证',
            '资源：脚本、模板、参考文档、示例资产',
            '边界：哪些事情不要做，哪些结果必须检查',
          ].map((item) => (
            <div key={item} className="interactive-card flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
              <span className="h-2.5 w-2.5 rounded-full bg-aurora shadow-[0_0_18px_rgba(39,245,167,0.9)]" />
              <span className="text-lg text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'anatomy',
    section: '结构',
    eyebrow: 'Anatomy',
    title: '一个 Skill 通常由四层组成',
    subtitle: '少量核心说明 + 按需读取的深层资源，避免一次塞满上下文。',
    tone: 'stack',
    content: (
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['SKILL.md', '触发描述、核心流程、必须遵守的规则'],
          ['references', '按任务读取的长文档、规范、API 说明'],
          ['scripts', '可执行脚本，让重复步骤稳定可复现'],
          ['assets', '模板、样例、字体、图片等输出材料'],
        ].map(([name, desc]) => (
          <div key={name} className="interactive-card rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-5">
            <div className="font-mono text-sm text-cyanGlow">{name}</div>
            <p className="mt-5 text-base leading-7 text-slate-300">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'codex-flow',
    section: '执行',
    eyebrow: 'Execution Path',
    title: 'Codex 使用 Skill 的方式',
    subtitle: '不是魔法，是一条更可靠的执行链。',
    tone: 'flow',
    content: (
      <div className="grid gap-4 lg:grid-cols-5">
        {[
          ['识别任务', '判断用户需求是否匹配 skill 描述'],
          ['读取规则', '完整打开 SKILL.md 与必要参考'],
          ['执行工作流', '按现有项目模式创建或修改'],
          ['调用工具', '运行脚本、浏览器、构建、测试'],
          ['验证交付', '检查输出、说明结果和限制'],
        ].map(([title, text], index) => (
          <div key={title} className="interactive-card relative rounded-3xl border border-white/10 bg-slate-950/55 p-5">
            <div className="mb-6 font-mono text-3xl font-black text-violet-300">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'expansion',
    section: '扩展',
    eyebrow: 'Capability Expansion',
    title: 'Skill 如何扩展 Codex 能力',
    subtitle: '把“会一点”升级为“按专业流程稳定完成”。',
    tone: 'proof',
    content: (
      <div className="grid gap-6 lg:grid-cols-3">
        <Card index="A" title="更少反复解释" text="常用偏好、步骤和检查项固化在 skill 里，新任务直接沿用。" />
        <Card index="B" title="更高输出一致性" text="文档、PPT、前端、数据分析都能有固定交付标准。" />
        <Card index="C" title="更强工具协作" text="Skill 可以指向脚本、模板、浏览器验证和外部工作流。" />
      </div>
    ),
  },
  {
    id: 'example',
    section: '示例',
    eyebrow: 'This Deck',
    title: '这个网页式 PPT 本身就是一个测试样例',
    subtitle: '它使用我们刚创建的 html-presentation-deck 工作流生成。',
    tone: 'signal',
    content: (
      <div className="grid gap-5 md:grid-cols-2">
        <div className="interactive-card rounded-[2rem] border border-aurora/20 bg-aurora/10 p-6">
          <Chip>Included</Chip>
          <ul className="mt-6 space-y-3 text-lg text-slate-100">
            <li>键盘左右翻页</li>
            <li>Agenda 目录跳转</li>
            <li>全屏按钮与进度条</li>
            <li>浏览器打印为 PDF</li>
          </ul>
        </div>
        <div className="interactive-card rounded-[2rem] border border-violetGlow/25 bg-violetGlow/10 p-6">
          <Chip>Stack</Chip>
          <ul className="mt-6 space-y-3 text-lg text-slate-100">
            <li>React + TypeScript</li>
            <li>Vite 构建</li>
            <li>Tailwind 深色科技风</li>
            <li>Framer Motion 动效</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'closing',
    section: '收束',
    eyebrow: 'Takeaway',
    title: 'Skill 让能力可以沉淀、复用、验证',
    subtitle: '下一次不是从零开始，而是从一套可靠工作流开始。',
    tone: 'close',
    content: (
      <div className="interactive-card rounded-[2.5rem] border border-cyanGlow/30 bg-gradient-to-br from-cyanGlow/15 via-violetGlow/10 to-aurora/10 p-8 text-center shadow-glow">
        <p className="text-3xl font-black leading-tight text-white md:text-5xl">
          Codex + Skill = 可复制的专家流程
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          把你常做、重视质量、希望稳定交付的工作，变成一个 skill。
        </p>
      </div>
    ),
  },
]
