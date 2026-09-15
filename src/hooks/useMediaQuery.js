import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    // Syncing with an external system (the media query list) after `query`
    // changes is exactly what this effect is for.
    // oxlint-disable-next-line react/set-state-in-effect
    setMatches((current) => (current === mql.matches ? current : mql.matches))
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the visitor has asked the OS to reduce motion. */
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

/** True on devices with a real pointer — where hover and a custom cursor make sense. */
export const useHasPointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
