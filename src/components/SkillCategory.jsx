import { motion } from 'framer-motion'
import SkillItem from './SkillItem'

const ease = [0.16, 1, 0.3, 1]

export default function SkillCategory({ group, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      className="card flex h-full flex-col p-5 transition-colors duration-500 hover:border-[color:var(--line-strong)] sm:p-6"
    >
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="t-card">{group.title}</h3>
        <span className="font-display text-xs tabular-nums text-muted">
          {String(group.items.length).padStart(2, '0')}
        </span>
      </header>

      <p className="mt-2.5 text-sm text-muted">{group.note}</p>

      {/* `mt-auto` pins the lists to the bottom of every card, so the three
          columns line up even though they hold different numbers of rows. */}
      <ul className="-mx-3 mt-7 border-t border-[color:var(--line)] pt-3">
        {group.items.map((item, i) => (
          <SkillItem key={item.name} name={item.name} icon={item.icon} index={i} />
        ))}
      </ul>
    </motion.article>
  )
}
