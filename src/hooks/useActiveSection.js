import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the nav indicator can follow.
 * Uses a band across the middle of the viewport rather than the top edge, so
 * the active item changes when a section actually dominates the screen.
 */
export function useActiveSection(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return active
}
