import { useLayoutEffect } from 'react'

const SELECTOR = '[data-slide-reveal]'
const VISIBILITY_THRESHOLD = 0.2

export function useSlideReveal(scope) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || !window.matchMedia || !window.IntersectionObserver) return undefined

    const targets = [...root.querySelectorAll(SELECTOR)]
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer

    const reveal = (element) => {
      element.dataset.slideState = 'entered'
      observer?.unobserve(element)
    }

    const onFocus = (event) => {
      const target = event.target.closest?.(SELECTOR)
      if (target && root.contains(target)) reveal(target)
    }

    const syncMedia = () => {
      observer?.disconnect()
      observer = undefined
      if (media.matches) {
        targets.forEach((element) => { element.dataset.slideState = 'entered' })
        return
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= VISIBILITY_THRESHOLD) reveal(entry.target)
        })
      }, { threshold: VISIBILITY_THRESHOLD })

      targets.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
        if (visibleHeight / Math.max(rect.height, 1) >= VISIBILITY_THRESHOLD) {
          reveal(element)
        } else {
          element.dataset.slideState = 'pending'
          observer.observe(element)
        }
      })
    }

    root.addEventListener('focusin', onFocus)
    media.addEventListener('change', syncMedia)
    syncMedia()

    return () => {
      observer?.disconnect()
      root.removeEventListener('focusin', onFocus)
      media.removeEventListener('change', syncMedia)
      targets.forEach((element) => { delete element.dataset.slideState })
    }
  }, [scope])
}
