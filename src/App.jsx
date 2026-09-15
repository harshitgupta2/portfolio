import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
