import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useHasPointer, usePrefersReducedMotion } from '../hooks/useMediaQuery'

/**
 * A dot that follows the pointer and swells into a labelled disc over anything
 * carrying `data-cursor`. Mounted only where a fine pointer exists, so touch
 * devices never pay for it — and it is hidden from assistive tech entirely.
 */
export default function CustomCursor() {
  const hasPointer = useHasPointer()
  const reduced = usePrefersReducedMotion()
  const dotRef = useRef(null)
  const [label, setLabel] = useState(null)
  const [visible, setVisible] = useState(false)

  const enabled = hasPointer && !reduced

  useEffect(() => {
    if (!enabled) return undefined

    document.documentElement.classList.add('has-custom-cursor')
    const dot = dotRef.current
    const moveX = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' })
    const moveY = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)
      setVisible(true)

      const target = event.target.closest?.('[data-cursor]')
      setLabel(target ? target.dataset.cursor : null)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  const expanded = Boolean(label)

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity .25s ease' }}
    >
      <div
        className="flex items-center justify-center rounded-full text-[11px] font-medium tracking-wide"
        style={{
          width: expanded ? 78 : 12,
          height: expanded ? 78 : 12,
          marginLeft: expanded ? -39 : -6,
          marginTop: expanded ? -39 : -6,
          backgroundColor: expanded ? 'var(--accent)' : 'var(--fg)',
          color: expanded ? '#fff' : 'var(--bg)',
          transition: 'width .4s cubic-bezier(.16,1,.3,1), height .4s cubic-bezier(.16,1,.3,1), margin .4s cubic-bezier(.16,1,.3,1), background-color .3s ease',
        }}
      >
        <span
          className="font-display"
          style={{ opacity: expanded ? 1 : 0, transition: 'opacity .25s ease' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
