import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../data/experience'
import { isPlaceholder } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const ease = [0.16, 1, 0.3, 1]

export default function Experience() {
  return (
    <section id="experience" className="section-pad" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          index="01"
          label="Experience"
          title="Where I learned to build for real users."
          id="experience-title"
        />

        <div className="mt-14 lg:mt-20">
          {experience.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Job({ job }) {
  return (
    <article className="grid-12 section-line gap-y-10 pt-10 lg:pt-12">
      {/* Rail: role and metrics, sticky while the detail scrolls past. */}
      <div className="rail">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease }}
          className="lg:sticky lg:top-28"
        >
          <p className="t-label text-accent">{job.duration}</p>
          <h3 className="t-card mt-3">{job.role}</h3>
          <p className="mt-2 text-sm text-muted">{job.focus}</p>
          {!isPlaceholder(job.company) ? (
            <p className="mt-3 text-sm text-muted">{job.company}</p>
          ) : null}

          {job.project ? (
            <a
              href={job.project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 text-sm text-muted no-underline transition-colors duration-300 hover:text-accent-soft"
            >
              <span className="link-underline">{job.project.name}</span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}

        </motion.div>
      </div>

      <div className="content">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="max-w-prose text-[1.15rem] leading-relaxed sm:text-[1.28rem]"
        >
          {job.summary}
        </motion.p>

        <ul className="mt-10 border-t border-[color:var(--line)]">
          {job.work.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3), ease }}
              className="group grid grid-cols-[2.5rem_1fr] items-baseline border-b border-[color:var(--line)] py-4 transition-colors duration-300 hover:border-[color:var(--line-strong)]"
            >
              <span
                aria-hidden="true"
                className="font-display text-xs tabular-nums text-muted transition-colors duration-300 group-hover:text-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[1.02rem] leading-snug text-fg/90 transition-colors duration-300 group-hover:text-fg">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </article>
  )
}

// function Metric({ metric, index }) {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-20% 0px' })
//   const reduced = usePrefersReducedMotion()
//   const [count, setCount] = useState(metric.countTo ? 0 : null)

//   useEffect(() => {
//     if (!metric.countTo || !inView || reduced) return undefined

//     const duration = 900
//     const start = performance.now()
//     let frame

//     const tick = (now) => {
//       const progress = Math.min((now - start) / duration, 1)
//       // ease-out so the number settles rather than stopping dead
//       setCount(Math.round((1 - (1 - progress) ** 3) * metric.countTo))
//       if (progress < 1) frame = requestAnimationFrame(tick)
//     }

//     frame = requestAnimationFrame(tick)
//     return () => cancelAnimationFrame(frame)
//   }, [inView, metric.countTo, reduced])

//   return (
//     <div
//       ref={ref}
//       className={[
//         'p-4 transition-colors duration-300 hover:bg-surface',
//         // Interior hairlines only, so the group reads as one block.
//         index % 2 === 0 ? 'border-r border-[color:var(--line)]' : '',
//         index < 2 ? 'border-b border-[color:var(--line)]' : '',
//       ].join(' ')}
//     >
//       <dt className="t-label text-[0.65rem] text-muted">{metric.label}</dt>
//       <dd className="mt-2 font-display text-[1.2rem] leading-none tracking-tight">
//         {metric.countTo ? (
//           <>
//             <span className="tabular-nums">{reduced ? metric.countTo : (count ?? 0)}</span>
//             <span className="ml-1.5 text-sm text-muted">{metric.unit}</span>
//           </>
//         ) : (
//           metric.value
//         )}
//       </dd>
//     </div>
//   )
// }
