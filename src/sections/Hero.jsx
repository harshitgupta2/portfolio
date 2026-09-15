import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import AnimatedText from '../components/AnimatedText'
import MagneticButton from '../components/MagneticButton'
import TechIcon from '../components/TechIcon'
import { site } from '../data/site'
import { brandTint } from '../utils/brandColors'
import { scrollToSection } from '../utils/smoothScroll'
import { useHasPointer, usePrefersReducedMotion } from '../hooks/useMediaQuery'

const ease = [0.16, 1, 0.3, 1]

/** Positions are percentages inside the visual field, tuned to clear the code card. */
const floaters = [
  { icon: 'react', name: 'React', x: 2, y: 4, delay: 0, depth: 1.6 },
  { icon: 'node', name: 'Node.js', x: 58, y: -2, delay: 0.5, depth: 1.1 },
  { icon: 'mongodb', name: 'MongoDB', x: 74, y: 32, delay: 0.9, depth: 1.9 },
  { icon: 'javascript', name: 'JavaScript', x: -4, y: 47, delay: 0.3, depth: 1.3 },
  { icon: 'git', name: 'Git', x: 16, y: 84, delay: 1.1, depth: 2.1 },
  { icon: 'sql', name: 'SQL', x: 66, y: 78, delay: 0.7, depth: 1.5 },
]

const codeLines = [
  [['// stop firing a request per keystroke', 'c']],
  [
    ['useEffect', 'f'],
    ['(() => {', 'p'],
  ],
  [
    ['  const', 'k'],
    [' controller = ', 'p'],
    ['new', 'k'],
    [' AbortController()', 'p'],
  ],
  [
    ['  const', 'k'],
    [' id = ', 'p'],
    ['setTimeout', 'f'],
    ['(() => {', 'p'],
  ],
  [
    ['    fetch', 'f'],
    ['(`/api/search?q=${query}`, {', 'p'],
  ],
  [
    ['      signal', 'a'],
    [': controller.signal,', 'p'],
  ],
  [['    }).then(setResults)', 'p']],
  [['  }, 250)', 'p']],
  [['', 'p']],
  [
    ['  return', 'k'],
    [' () => {', 'p'],
  ],
  [
    ['    clearTimeout', 'f'],
    ['(id)', 'p'],
  ],
  [
    ['    controller.', 'p'],
    ['abort', 'f'],
    ['()', 'p'],
  ],
  [['  }', 'p']],
  [
    ['}, [', 'p'],
    ['query', 'a'],
    ['])', 'p'],
  ],
]

const tokenClass = {
  c: 'text-[color:var(--fg-faint)] italic',
  k: 'text-accent-soft',
  f: 'text-fg',
  a: 'text-accent',
  p: 'text-muted',
}

export default function Hero() {
  const fieldRef = useRef(null)
  const hasPointer = useHasPointer()
  const reduced = usePrefersReducedMotion()
  const animate = hasPointer && !reduced

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const px = useSpring(pointerX, { stiffness: 60, damping: 18 })
  const py = useSpring(pointerY, { stiffness: 60, damping: 18 })
  const cardX = useTransform(px, [-0.5, 0.5], [8, -8])
  const cardY = useTransform(py, [-0.5, 0.5], [8, -8])

  useEffect(() => {
    if (!animate) return undefined
    const el = fieldRef.current
    if (!el) return undefined

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [animate, pointerX, pointerY])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-24 sm:pt-28"
      aria-labelledby="hero-title"
    >
      {/* Column rules: the same 12-column grid the rest of the page sits on. */}
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-y-0 hidden lg:block"
        style={{ left: 'var(--shell)', right: 'var(--shell)' }}
      />
      {/* A single soft light source behind the visual, so the dark page has depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[46rem] w-[46rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(91,118,255,0.16) 0%, rgba(91,118,255,0.04) 45%, transparent 70%)',
        }}
      />

      <div className="shell relative">
        <div className="grid-12 items-center gap-y-14">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="t-label mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {site.role}
              <span aria-hidden="true" className="opacity-40">•</span>
              {site.secondaryRole}
            </motion.p>

            <h1 id="hero-title" className="t-display">
              <AnimatedText text={site.headline} playOnLoad delay={0.15} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease }}
              className="t-lead mt-6"
            >
              {site.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticButton href={site.resume} download arrow={null} variant="solid">
                <Download size={17} strokeWidth={2} aria-hidden="true" />
                Open resume
              </MagneticButton>
              <MagneticButton onClick={() => scrollToSection('contact')} variant="ghost">
                Contact me
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── Visual field ─────────────────────────────────── */}
          <motion.div
            ref={fieldRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative lg:col-span-5"
          >
            {/* Desktop: icons drift around the code card. */}
            <div className="relative hidden aspect-square w-full lg:block">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--line)]"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--line)]"
              />

              {floaters.map((item) => (
                <Floater
                  key={item.icon}
                  item={item}
                  px={px}
                  py={py}
                  animate={animate}
                  reduced={reduced}
                />
              ))}

              <div className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2">
                <motion.div style={animate ? { x: cardX, y: cardY } : undefined}>
                  <CodeCard reduced={reduced} />
                </motion.div>
              </div>
            </div>

            {/* Mobile: the same stack, laid out as a readable strip. */}
            <div className="lg:hidden">
              <ul className="flex flex-wrap gap-2">
                {floaters.map((item) => (
                  <li
                    key={item.icon}
                    className="flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-surface px-3 py-2 text-[0.8rem]"
                  >
                    <TechIcon name={item.icon} size={15} />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Pinned to the viewport floor, not to the end of the content — the hero
          is exactly one screen tall and the cue sits on its bottom edge. */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('experience')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="group absolute bottom-7 left-[var(--shell)] hidden items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-fg sm:inline-flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line)] transition-colors duration-300 group-hover:border-accent">
          <motion.span
            animate={reduced ? undefined : { y: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={15} aria-hidden="true" />
          </motion.span>
        </span>
        Scroll to see the work
      </motion.button>
    </section>
  )
}

function Floater({ item, px, py, animate, reduced }) {
  const x = useTransform(px, [-0.5, 0.5], [item.depth * 20, item.depth * -20])
  const y = useTransform(py, [-0.5, 0.5], [item.depth * 20, item.depth * -20])

  return (
    <motion.div
      style={{ left: `${item.x}%`, top: `${item.y}%`, ...(animate ? { x, y } : {}) }}
      className="absolute"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.6 + item.delay * 0.25, ease }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={{
          duration: 4.5 + item.delay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: item.delay,
        }}
        className="flex items-center gap-2.5 rounded-2xl border border-[color:var(--line)] bg-surface/90 px-3.5 py-2.5 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm"
        style={{ boxShadow: `inset 0 0 0 1px ${brandTint(item.icon, 0.12)}` }}
      >
        <TechIcon name={item.icon} size={18} />
        <span className="font-display text-[0.82rem] font-medium">{item.name}</span>
      </motion.div>
    </motion.div>
  )
}

function CodeCard({ reduced }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--line)] bg-surface shadow-[0_40px_80px_-50px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2 border-b border-[color:var(--line)] bg-surface-2 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-[color:var(--fg-faint)]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[rgba(242,241,237,0.18)]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[rgba(242,241,237,0.18)]" aria-hidden="true" />
        <span className="ml-2 font-mono text-[0.7rem] text-muted">useDebouncedSearch.js</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.72rem] leading-[1.75] no-scrollbar">
        <code>
          {codeLines.map((line, i) => (
            <motion.span
              key={i}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.06 }}
              className="block"
            >
              {line.map(([text, type], j) => (
                <span key={j} className={tokenClass[type]}>
                  {text}
                </span>
              ))}
              {'\n'}
            </motion.span>
          ))}
        </code>
      </pre>
    </div>
  )
}
