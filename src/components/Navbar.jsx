import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { getLenis, scrollToSection } from '../utils/smoothScroll'
import { cn } from '../utils/cn'

const ease = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ids = useMemo(() => navLinks.map((link) => link.id), [])
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Freeze the page behind the mobile menu, and let Escape close it.
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    const wasOpen = open
    setOpen(false)
    // Let the menu finish closing before the scroll starts.
    window.setTimeout(() => scrollToSection(id), wasOpen ? 240 : 0)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-bg"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="shell">
          <nav
            aria-label="Primary"
            className={cn(
              'grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full pl-4 pr-3 transition-all duration-500 ease-out sm:pl-5 sm:pr-4',
              scrolled
                ? 'border border-[color:var(--line)] bg-[rgba(11,13,18,0.72)] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl'
                : 'border border-transparent',
            )}
          >
            {/* Left: identity */}
            <button
              type="button"
              onClick={() => go('home')}
              className="group flex items-center gap-2.5 rounded-full"
            >
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-full bg-fg text-bg transition-colors duration-300 group-hover:bg-accent group-hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 7 4 12l5 5" />
                  <path d="m15 7 5 5-5 5" />
                </svg>
              </span>
              <span className="font-display text-[0.95rem] font-medium tracking-tight">
                {site.name}
              </span>
            </button>

            {/* Centre: navigation, optically centred by the grid itself */}
            <ul className="hidden items-center justify-center gap-1 md:flex">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300',
                      active === link.id ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {active === link.id ? (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-[rgba(242,241,237,0.07)]"
                      />
                    ) : null}
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right: status + menu toggle */}
            <div className="flex items-center justify-end gap-2">
              {site.available ? (
                <span className="hidden h-10 items-center gap-2 rounded-full border border-[color:var(--line)] px-3.5 text-[0.78rem] text-muted lg:inline-flex">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {site.availabilityLabel}
                </span>
              ) : null}

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line)] transition-colors duration-300 hover:border-[color:var(--line-strong)] md:hidden"
              >
                <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
                {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 bg-bg md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
              className="flex h-full flex-col justify-center px-[var(--shell)]"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                  }}
                  className="border-b border-[color:var(--line)] first:border-t"
                >
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-[2.4rem] leading-none tracking-tightest">
                      {link.label}
                    </span>
                    <span className="t-label text-muted">{`0${i + 1}`}</span>
                  </button>
                </motion.li>
              ))}
              {site.available ? (
                <motion.li
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 0.5 } },
                  }}
                  className="mt-10 flex items-center gap-2 text-sm text-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {site.availabilityLabel}
                </motion.li>
              ) : null}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
