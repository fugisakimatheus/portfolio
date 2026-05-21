import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { CustomCursor } from './components/layout/CustomCursor'
import { LenisProvider } from './components/providers/LenisProvider'
import { DocumentHead } from './components/seo/DocumentHead'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Career } from './sections/Career'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <LenisProvider>
      <DocumentHead />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Career />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  )
}
