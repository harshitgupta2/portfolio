import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

/**
 * Splits a string into words and lifts each one out of a mask.
 * The text is real text in the DOM — screen readers and crawlers read the
 * whole string, the spans are purely visual.
 */
export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  start = 'top 85%',
  playOnLoad = false,
}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return undefined

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('[data-word]')
      gsap.from(words, {
        yPercent: 118,
        duration: 1.1,
        ease: 'expo.out',
        stagger,
        delay,
        ...(playOnLoad
          ? {}
          : { scrollTrigger: { trigger: el, start, once: true } }),
      })
    }, el)

    return () => ctx.revert()
  }, [reduced, delay, stagger, start, playOnLoad])

  const words = String(text).split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mask-line">
          {/* The space lives inside the animated node — as a separate sibling it
              is fragile, and an invisible character costs nothing to animate. */}
          <span data-word>{i < words.length - 1 ? `${word}\u00A0` : word}</span>
        </span>
      ))}
    </Tag>
  )
}
