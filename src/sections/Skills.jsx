import SectionHeading from '../components/SectionHeading'
import SkillCategory from '../components/SkillCategory'
import { skillGroups } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="section-pad" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Skills"
          title="Skills & technologies"
          subtitle="The stack I reach for. Everything here has shipped in something I built, not just something I read about."
          id="skills-title"
        />

        <div className="mt-12 grid items-stretch gap-[var(--gutter)] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillCategory key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
