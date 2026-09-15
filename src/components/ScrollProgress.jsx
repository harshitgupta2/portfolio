import { motion, useScroll, useSpring } from 'framer-motion'

/** A one-pixel line across the top of the page showing how far down you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[65] h-[2px] w-full origin-left bg-accent"
    />
  )
}
