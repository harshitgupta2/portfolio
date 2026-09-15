let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const getLenis = () => lenis

/**
 * Scrolls to a section by id. Uses Lenis when it is running so the motion
 * matches the rest of the page, and falls back to the native API otherwise —
 * which is also the path taken when a visitor prefers reduced motion.
 */
export const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (!target) return

  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.1 })
  } else {
    target.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
  // Keyboard users should land inside the section they asked for.
  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.1 })
  else window.scrollTo({ top: 0 })
}
