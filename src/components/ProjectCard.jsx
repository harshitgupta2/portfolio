import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isPlaceholder } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { cn } from '../utils/cn'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1]

/**
 * Every card is structurally identical: 16:9 cover, title row, description,
 * three features, stack, footer. Each block is a fixed grid row, so the titles,
 * feature lists and footers align across the whole grid no matter how long the
 * copy in any one card runs.
 */
export default function ProjectCard({ project, priority = false }) {
  const imageRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  const live = !isPlaceholder(project.liveUrl) ? project.liveUrl : null
  const isLink = Boolean(live)

  useLayoutEffect(() => {
    const el = imageRef.current
    if (!el || reduced) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [reduced])

  const Wrapper = isLink ? motion.a : motion.article

  return (
    <Wrapper
      {...(isLink
        ? {
            href: live,
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': `${project.title} — open the live project in a new tab`,
            'data-cursor': 'Open ↗',
          }
        : { 'data-cursor': 'View' })}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease }}
      whileHover="hover"
      className={cn(
        'group relative grid h-full grid-rows-[auto_auto_auto_1fr_auto] overflow-hidden rounded-card border border-[color:var(--line)] bg-surface no-underline transition-[transform,border-color,box-shadow] duration-500 ease-out',
        isLink
          ? 'hover:-translate-y-1.5 hover:border-[color:var(--accent)] hover:shadow-[0_50px_90px_-60px_var(--accent-glow)]'
          : 'hover:-translate-y-1 hover:border-[color:var(--line-strong)]',
      )}
    >
      {/* Row 1 — cover. One ratio for every card. */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div ref={imageRef} className="absolute inset-x-0" style={{ top: '-4%', height: '108%' }}>
          <motion.img
            src={project.image}
            alt={project.alt}
            width={1600}
            height={900}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.8, ease }}
            className="h-full w-full object-cover"
          />
        </div>

        {isLink ? (
          <motion.span
            aria-hidden="true"
            variants={{ hover: { opacity: 1 } }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-0 bg-gradient-to-t from-accent/35 via-transparent to-transparent"
          />
        ) : null}

        <span className="absolute left-4 top-4 rounded-full border border-[color:var(--line)] bg-bg/70 px-2.5 py-1 font-display text-[0.68rem] tracking-[0.18em] text-muted backdrop-blur-sm">
          {project.index}
        </span>
      </div>

      {/* Row 2 — title + year, on one baseline across the grid. */}
      <div className="flex items-start justify-between gap-5 px-6 pt-6">
        <h3 className="t-card">
          <motion.span
            variants={{ hover: { x: 5 } }}
            transition={{ duration: 0.5, ease }}
            className="inline-block"
          >
            {project.title}
          </motion.span>
        </h3>
        <span className="mt-1 shrink-0 font-display text-xs tabular-nums text-muted">
          {project.year}
        </span>
      </div>

      {/* Row 3 — description, clamped so two cards never differ by a stray line. */}
      <p className="line-clamp-3 px-6 pt-3 text-[0.96rem] leading-relaxed text-muted">
        {project.description}
      </p>

      {/* Row 4 — features. `1fr` absorbs any leftover height. */}
      <ul className="space-y-2 px-6 pt-5 text-[0.88rem] text-muted">
        {project.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
            <span className="line-clamp-1">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Row 5 — footer, flush to the bottom edge of every card. */}
      <div className="px-6 pb-6 pt-6">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[color:var(--line)] px-2.5 py-1 text-[0.74rem] text-muted transition-colors duration-500 group-hover:border-[color:var(--line-strong)]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <span
          className={cn(
            'mt-5 flex items-center gap-2 border-t border-[color:var(--line)] pt-4 font-display text-[0.9rem] font-medium',
            isLink ? 'text-fg' : 'text-muted',
          )}
        >
          {isLink ? 'View live project' : 'Live link coming soon'}
          {isLink ? (
            <motion.span
              variants={{ hover: { x: 4, y: -4 } }}
              transition={{ duration: 0.45, ease }}
              className="inline-block"
            >
              <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </motion.span>
          ) : null}
        </span>
      </div>
    </Wrapper>
  )
}
