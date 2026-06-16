import { useCallback, useEffect, useMemo, useState } from 'react'
import { slides } from '../../slides'

const getIndexFromHash = () => {
  const id = window.location.hash.replace('#', '')
  const foundIndex = slides.findIndex((slide) => slide.id === id)
  return foundIndex >= 0 ? foundIndex : 0
}

export function useDeckNavigation() {
  const [activeIndex, setActiveIndex] = useState(getIndexFromHash)

  const goTo = useCallback((index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), slides.length - 1)
    setActiveIndex(nextIndex)
    const nextId = slides[nextIndex]?.id
    if (nextId && window.location.hash !== `#${nextId}`) {
      window.history.pushState(null, '', `#${nextId}`)
    }
  }, [])

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    const onHashChange = () => setActiveIndex(getIndexFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', `#${slides[0].id}`)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, button, a, [contenteditable="true"]')) {
        return
      }

      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        next()
      }

      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        previous()
      }

      if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        goTo(slides.length - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goTo, next, previous])

  return useMemo(
    () => ({
      activeIndex,
      activeSlide: slides[activeIndex],
      goTo,
      next,
      previous,
      canGoNext: activeIndex < slides.length - 1,
      canGoPrevious: activeIndex > 0,
      progress: ((activeIndex + 1) / slides.length) * 100,
      total: slides.length,
    }),
    [activeIndex, goTo, next, previous],
  )
}
