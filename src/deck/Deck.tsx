import { useCallback, useEffect, useMemo, useState } from "react";
import { slides } from "../slides";

const clamp = (value: number) => Math.min(Math.max(value, 0), slides.length - 1);

export function Deck() {
  const [current, setCurrent] = useState(() => {
    const fromHash = Number.parseInt(window.location.hash.replace("#/", ""), 10);
    return Number.isFinite(fromHash) ? clamp(fromHash) : 0;
  });
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  const activeSlide = slides[current];
  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);

  const goTo = useCallback((index: number) => {
    setCurrent(clamp(index));
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    window.history.replaceState(null, "", `#/${current}`);
  }, [current]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        previous();
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
      if (event.key.toLowerCase() === "a") {
        setAgendaOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setAgendaOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, previous]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
      return;
    }

    await document.exitFullscreen?.();
  };

  return (
    <main className={`deck-shell ${isFullscreen ? "is-fullscreen" : ""}`}>
      <div className="ambient-background" aria-hidden="true">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" />
        <div className="grid-layer" />
        <div className="noise-layer" />
      </div>

      <div className="deck-stage">
        <header className="no-print deck-header">
          <button className="control-button" type="button" onClick={() => setAgendaOpen(true)} aria-label="打开目录">
            Agenda
          </button>
          <div className="deck-brand">Agent Skill Deck</div>
          <button className="control-button" type="button" onClick={toggleFullscreen} aria-pressed={isFullscreen}>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </header>

        <section className="slide-frame" aria-live="polite">
          <div>
            <div className="slide-heading-row">
              <div>
                <p className="slide-kicker">{activeSlide.kicker}</p>
                <h1 className="slide-title">{activeSlide.title}</h1>
              </div>
              <div className="slide-count">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>
            <div className="slide-content animate-slide-in" key={activeSlide.id}>
              {activeSlide.content}
            </div>
          </div>

          <footer className="slide-footer">
            <span>{activeSlide.section}</span>
            <span>← / → 翻页 · A 打开目录 · Ctrl + P 导出 PDF</span>
          </footer>
        </section>

        <nav className="no-print deck-nav" aria-label="幻灯片导航">
          <button className="control-button" type="button" onClick={previous} disabled={current === 0}>
            Previous
          </button>
          <div className="progress-track" aria-label={`进度 ${Math.round(progress)}%`}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <button className="control-button" type="button" onClick={next} disabled={current === slides.length - 1}>
            Next
          </button>
        </nav>
      </div>

      <aside className={`agenda-panel no-print ${agendaOpen ? "is-open" : ""}`} aria-hidden={!agendaOpen}>
        <div className="agenda-header">
          <h2>Agenda</h2>
          <button className="control-button" type="button" onClick={() => setAgendaOpen(false)}>
            Close
          </button>
        </div>
        <div className="agenda-list">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`agenda-item ${index === current ? "is-active" : ""}`}
              onClick={() => {
                goTo(index);
                setAgendaOpen(false);
              }}
            >
              <div className="agenda-section">{slide.section}</div>
              <div className="agenda-title">{slide.title}</div>
            </button>
          ))}
        </div>
      </aside>

      <div className="print-only">
        {slides.map((slide, index) => (
          <section className="print-slide" key={slide.id}>
            <p>{slide.kicker}</p>
            <h1>{slide.title}</h1>
            <div>{slide.content}</div>
            <footer>
              {index + 1} / {slides.length}
            </footer>
          </section>
        ))}
      </div>
    </main>
  );
}

