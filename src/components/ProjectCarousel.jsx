import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ProjectCard from './ProjectCard'
import 'swiper/css'

/**
 * Mobile presentation for the project set. Swipe, arrow keys and the two
 * buttons all drive the same instance, so it is usable without a touchscreen.
 */
export default function ProjectCarousel({ projects }) {
  const [swiper, setSwiper] = useState(null)
  const [index, setIndex] = useState(0)

  const progress = ((index + 1) / projects.length) * 100

  return (
    <div className="mt-12">
      <Swiper
        modules={[A11y, Keyboard]}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setIndex(instance.activeIndex)}
        slidesPerView={1.05}
        spaceBetween={16}
        keyboard={{ enabled: true }}
        a11y={{ containerMessage: 'Selected projects carousel' }}
        breakpoints={{ 640: { slidesPerView: 1.45, spaceBetween: 20 } }}
        className="!overflow-visible"
      >
        {projects.map((project, i) => (
          <SwiperSlide key={project.id} className="!h-auto">
            <ProjectCard project={project} priority={i === 0} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-7 flex items-center gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            disabled={index === 0}
            className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--line)] transition-colors duration-300 enabled:hover:border-[color:var(--accent)] disabled:opacity-30"
          >
            <span className="sr-only">Previous project</span>
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            disabled={index === projects.length - 1}
            className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--line)] transition-colors duration-300 enabled:hover:border-[color:var(--accent)] disabled:opacity-30"
          >
            <span className="sr-only">Next project</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="h-px flex-1 bg-[color:var(--line)]" aria-hidden="true">
          <div
            className="h-px bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-display text-xs tabular-nums text-muted">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
