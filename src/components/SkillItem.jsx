import { motion } from 'framer-motion'
import TechIcon from './TechIcon'
import { brandColor, brandTint } from '../utils/brandColors'

const ease = [0.16, 1, 0.3, 1]

/**
 * One technology row. Hovering tints the tile with that technology's own brand
 * colour, which is where the colour comes from — the row is otherwise neutral,
 * so a column of logos reads as a list rather than a paint chart.
 */
export default function SkillItem({ name, icon, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease }}
      whileHover="hover"
      className="group relative flex items-center gap-3.5 rounded-xl px-3 py-3 transition-colors duration-300"
      style={{ '--tint': brandTint(icon, 0.1), '--brand': brandColor(icon) }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'var(--tint)' }}
      />

      <motion.span
        variants={{ hover: { scale: 1.12, rotate: -4 } }}
        transition={{ type: 'spring', stiffness: 320, damping: 16 }}
        className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[color:var(--line)] bg-surface-2 transition-colors duration-300"
      >
        <TechIcon name={icon} size={18} />
      </motion.span>

      <span className="relative font-display text-[1rem] font-medium tracking-tight transition-colors duration-300 group-hover:text-[color:var(--brand)]">
        {name}
      </span>

      <motion.span
        aria-hidden="true"
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.45, ease }}
        className="relative ml-auto h-px w-8 origin-right"
        style={{ background: 'var(--brand)' }}
      />
    </motion.li>
  )
}
