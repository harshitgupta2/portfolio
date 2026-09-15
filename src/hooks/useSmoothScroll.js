import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '../utils/smoothScroll'
import { usePrefersReducedMotion } from './useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth scrolling, driven by GSAP's ticker so Lenis and ScrollTrigger share a
 * single rAF loop instead of fighting over two. Skipped entirely when the
 * visitor prefers reduced motion — native scrolling takes over untouched.
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) {
      setLenis(null)
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      // Native momentum on touch feels better than an emulated one.
      syncTouch: false,
    })

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])
}
