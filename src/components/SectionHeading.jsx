import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'

/**
 * Section header on the shared 12-column grid: the number and label sit in the
 * left rail, the title and subtitle start at column 4. Every section uses this,
 * so the headings all line up on the same two vertical rules down the page.
 */
export default function SectionHeading({ index, label, title, subtitle, id }) {
  return (
    <header className="grid-12 items-baseline">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6 }}
        className="rail mb-6 flex items-center gap-3 lg:mb-0"
      >
        <span className="t-label text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-[color:var(--line-strong)]" />
        <span className="t-label text-muted">{label}</span>
      </motion.div>

      <div className="content">
        <AnimatedText as="h2" id={id} text={title} className="t-section" />

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="t-lead mt-5"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </header>
  )
}
