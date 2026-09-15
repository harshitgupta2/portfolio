import { Suspense, lazy } from 'react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import { useIsDesktop } from '../hooks/useMediaQuery'

// Swiper only ships to the browsers that actually render the carousel.
const ProjectCarousel = lazy(() => import('../components/ProjectCarousel'))

export default function Projects() {
  const isDesktop = useIsDesktop()

  return (
    <section id="projects" className="section-pad" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Projects"
          title="Selected projects"
          subtitle="Things I've built while learning, experimenting and solving real problems."
          id="projects-title"
        />

        {isDesktop ? (
          /* A plain two-column grid. `items-stretch` plus the card's own row
             template is what makes every element line up across both columns. */
          <div className="mt-14 grid grid-cols-2 items-stretch gap-[var(--gutter)] lg:mt-20">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} priority={i === 0} />
            ))}
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="mt-12 grid gap-[var(--gutter)]">
                {projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} priority={i === 0} />
                ))}
              </div>
            }
          >
            <ProjectCarousel projects={projects} />
          </Suspense>
        )}
      </div>
    </section>
  )
}
