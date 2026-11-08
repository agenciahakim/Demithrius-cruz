import { useEffect } from 'react'

export const MAGNETIC_CONFIG = {
  radius: 90,
  maxOffset: 8,
  approachMs: 90,
  returnMs: 145,
}

const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))

export function useMagneticButton(contentRef) {
  useEffect(() => {
    const content = contentRef.current
    const button = content?.parentElement
    if (!content || !button || !window.matchMedia) return undefined

    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let lastTime = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let focused = false

    const tick = (time) => {
      const elapsed = Math.min(time - (lastTime || time - 16), 64)
      lastTime = time
      const returning = targetX === 0 && targetY === 0
      const ease = 1 - Math.exp(-elapsed / (returning ? MAGNETIC_CONFIG.returnMs : MAGNETIC_CONFIG.approachMs))
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease

      if (Math.abs(targetX - currentX) < .08 && Math.abs(targetY - currentY) < .08) {
        currentX = targetX
        currentY = targetY
      }

      content.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = currentX !== targetX || currentY !== targetY ? window.requestAnimationFrame(tick) : 0
    }

    const schedule = () => {
      if (!frame) {
        lastTime = 0
        frame = window.requestAnimationFrame(tick)
      }
    }

    const reset = () => {
      targetX = 0
      targetY = 0
      schedule()
    }

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse' || focused || button.matches(':disabled')) {
        reset()
        return
      }

      const rect = button.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const edgeX = Math.max(0, Math.abs(dx) - rect.width / 2)
      const edgeY = Math.max(0, Math.abs(dy) - rect.height / 2)
      const distance = Math.hypot(edgeX, edgeY)

      if (distance >= MAGNETIC_CONFIG.radius) {
        reset()
        return
      }

      const falloff = 1 - distance / MAGNETIC_CONFIG.radius
      targetX = clamp(dx / (rect.width / 2 + MAGNETIC_CONFIG.radius) * MAGNETIC_CONFIG.maxOffset * falloff, MAGNETIC_CONFIG.maxOffset)
      targetY = clamp(dy / (rect.height / 2 + MAGNETIC_CONFIG.radius) * MAGNETIC_CONFIG.maxOffset * falloff, MAGNETIC_CONFIG.maxOffset)
      schedule()
    }

    const onPointerOut = (event) => {
      if (!event.relatedTarget) reset()
    }
    const onFocus = () => {
      focused = true
      reset()
    }
    const onBlur = () => {
      focused = false
    }

    const disable = () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerout', onPointerOut)
      button.removeEventListener('focus', onFocus)
      button.removeEventListener('blur', onBlur)
      button.removeEventListener('click', reset)
      targetX = 0
      targetY = 0
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      currentX = 0
      currentY = 0
      content.style.removeProperty('transform')
    }

    const syncMedia = () => {
      disable()
      if (!media.matches) return
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerout', onPointerOut, { passive: true })
      button.addEventListener('focus', onFocus)
      button.addEventListener('blur', onBlur)
      button.addEventListener('click', reset)
    }

    media.addEventListener('change', syncMedia)
    syncMedia()
    return () => {
      media.removeEventListener('change', syncMedia)
      disable()
    }
  }, [contentRef])
}
