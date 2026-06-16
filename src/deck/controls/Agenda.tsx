import { slides } from '../../slides'

type AgendaProps = {
  activeIndex: number
  onSelect: (index: number) => void
}

export function Agenda({ activeIndex, onSelect }: AgendaProps) {
  return (
    <nav aria-label="演示目录" className="agenda-panel">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanGlow">Agenda</p>
        <p className="font-mono text-xs text-slate-500">{slides.length} slides</p>
      </div>
      <div className="space-y-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`agenda-item ${index === activeIndex ? 'agenda-item-active' : ''}`}
            onClick={() => onSelect(index)}
            type="button"
          >
            <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-100">{slide.title}</span>
              <span className="block truncate text-xs text-slate-500">{slide.section}</span>
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
