import { motion } from 'framer-motion'
import type { SlideDefinition } from '../slides'

type SlideFrameProps = {
  slide: SlideDefinition
  index: number
  total: number
}

const slideVariants = {
  initial: { opacity: 0, y: 28, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.99 },
}

export function SlideFrame({ slide, index, total }: SlideFrameProps) {
  return (
    <motion.section
      key={slide.id}
      aria-label={`${index + 1}/${total}: ${slide.title}`}
      className={`slide-frame slide-${slide.tone}`}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="slide-atmosphere">
        <div className="slide-glow slide-glow-a" />
        <div className="slide-glow slide-glow-b" />
        <div className="grid-surface" />
      </div>

      <div className="relative z-10 flex min-h-full flex-col">
        <div className="slide-kicker-row">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-cyanGlow">
              {slide.eyebrow}
            </p>
            <p className="mt-2 text-sm text-slate-500">{slide.section}</p>
          </div>
          <div className="slide-counter">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>

        <div className="slide-heading">
          <h1 className="slide-title">
            {slide.title}
          </h1>
          {slide.subtitle ? (
            <p className="slide-subtitle">
              {slide.subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative mt-auto">{slide.content}</div>
      </div>
    </motion.section>
  )
}
