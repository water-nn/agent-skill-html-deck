import { useCallback, useEffect, useState } from 'react'

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement))
  const [isSupported] = useState(Boolean(document.documentElement.requestFullscreen))

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    if (!isSupported) {
      return
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
  }, [isSupported])

  return { isFullscreen, isSupported, toggleFullscreen }
}
