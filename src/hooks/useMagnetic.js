import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useHasPointer, usePrefersReducedMotion } from './useMediaQuery'

/**
 * Pulls an element a few pixels toward the cursor while it is hovered.
 * Returns a ref. Inert on touch devices and under reduced motion, so the
 * element behaves like a plain button there.
 */
export function useMagnetic({ strength = 0.28, max = 14 } = {}) {
  const ref = useRef(null)
  const hasPointer = useHasPointer()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !hasPointer || reduced) return undefined

    const quickX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const quickY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      quickX(gsap.utils.clamp(-max, max, dx * strength))
      quickY(gsap.utils.clamp(-max, max, dy * strength))
    }

    const onLeave = () => {
      quickX(0)
      quickY(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [hasPointer, reduced, strength, max])

  return ref
}
