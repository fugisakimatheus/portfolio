import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { CustomCursor } from './components/layout/CustomCursor'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { LenisProvider } from './components/providers/LenisProvider'
import { DocumentHead } from './components/seo/DocumentHead'
import { Career } from './sections/Career'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

export default function App() {
  return (
    <LenisProvider>
      <Analytics />
      <SpeedInsights />
      <DocumentHead />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Career />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  )
}
