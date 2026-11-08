import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useSiteMotion(scope) {
  useGSAP(() => {
    const root = scope.current
    if (!root) return undefined

    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.site-header', { y: -22, opacity: 0, duration: 0.65 })
        .from('.hero .eyebrow', { y: 18, opacity: 0, duration: 0.55 }, '-=0.32')
        .from('.hero h1', { y: 55, opacity: 0, duration: 0.85 }, '-=0.32')
        .from('.hero-description', { y: 26, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero-actions', { y: 22, opacity: 0, duration: 0.6 }, '-=0.42')
        .from('.hero-proof', { y: 15, opacity: 0, duration: 0.45 }, '-=0.3')
        .from('.hero-photo-wrap', { y: 55, opacity: 0, duration: 1 }, 0.3)
        .from('.hero-ribbon', { y: 80, rotation: -11, scale: 0.86, opacity: 0, duration: 1.25 }, 0.12)

      gsap.to('.site-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.25 },
      })

      gsap.to('.ambient-field svg', {
        y: -72,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 2 },
      })

      gsap.to('.ambient-route-progress', {
        strokeDashoffset: -640,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      })

      gsap.to('.hero-ribbon-wrap', {
        y: 95,
        rotation: 7,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })

      gsap.to('.motion-rail-track', {
        xPercent: -28,
        ease: 'none',
        scrollTrigger: { trigger: '.motion-rail', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      })

      root.querySelectorAll('.objective-row, .process-steps article, .faq-list details').forEach((row) => {
        gsap.from(row, {
          y: 36,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        })
      })

      gsap.from('.quiz-panel', {
        y: 48,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.quiz-panel', start: 'top 85%', once: true },
      })

      gsap.from('.about-portrait', {
        x: -45,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-portrait', start: 'top 80%', once: true },
      })

      gsap.from('.about-copy', {
        x: 45,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-copy', start: 'top 80%', once: true },
      })

      gsap.from('.goal-media img', {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: '.goal-media', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.from('.final-cta h2', {
        y: 75,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.final-cta', start: 'top 76%', once: true },
      })

    })

    return () => motion.revert()
  }, { scope })
}

