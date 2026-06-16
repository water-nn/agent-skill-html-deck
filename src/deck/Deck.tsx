import { AnimatePresence } from 'framer-motion'
import { Agenda } from './controls/Agenda'
import { slides } from '../slides'
import { useDeckNavigation } from './hooks/useDeckNavigation'
import { useFullscreen } from './hooks/useFullscreen'
import { SlideFrame } from './SlideFrame'

export function Deck() {
  const {
    activeIndex,
    activeSlide,
    canGoNext,
    canGoPrevious,
    goTo,
    next,
    previous,
    progress,
    total,
  } = useDeckNavigation()
  const { isFullscreen, isSupported, toggleFullscreen } = useFullscreen()

  return (
    <main className={`deck-shell ${isFullscreen ? 'deck-shell-fullscreen' : ''}`}>
      <div className="animated-background" aria-hidden="true">
        <div className="mesh mesh-a" />
        <div className="mesh mesh-b" />
        <div className="mesh mesh-c" />
        <div className="noise-layer" />
      </div>

      <header className="deck-topbar print:hidden">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyanGlow">
            Codex Skill Lab
          </p>
          <p className="mt-1 text-sm text-slate-400">网页式 PPT 测试项目</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="control-button"
            disabled={!canGoPrevious}
            onClick={previous}
            type="button"
          >
            上一页
          </button>
          <button className="control-button" disabled={!canGoNext} onClick={next} type="button">
            下一页
          </button>
          <button
            className="control-button control-button-primary"
            disabled={!isSupported}
            onClick={toggleFullscreen}
            type="button"
          >
            {isFullscreen ? '退出全屏' : '全屏'}
          </button>
        </div>
      </header>

      <div className="deck-layout">
        <Agenda activeIndex={activeIndex} onSelect={goTo} />
        <div className="deck-stage screen-stage">
          <AnimatePresence mode="wait">
            <SlideFrame slide={activeSlide} index={activeIndex} total={total} />
          </AnimatePresence>
        </div>
      </div>

      <div className="print-deck" aria-label="打印版完整演示文稿">
        {slides.map((slide, index) => (
          <SlideFrame key={slide.id} slide={slide} index={index} total={total} />
        ))}
      </div>

      <footer className="deck-footer print:hidden">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-xs text-slate-400">
          {activeIndex + 1} / {slides.length}
        </p>
      </footer>
    </main>
  )
}
