import { SectionPage } from '../components/ui/SectionPage'
import { siteContent } from '../content/site'
import { ProjectsBento } from './projects/ProjectsBento'
import { ProjectsMobile } from './projects/ProjectsMobile'

export function Projects() {
  const { projects } = siteContent
  const featured = projects.filter((p) => p.featured)

  return (
    <SectionPage id="projects" titleKey="sections.projects">
      <div className="lg:hidden">
        <ProjectsMobile projects={projects} />
      </div>

      <div className="hidden lg:block">
        <ProjectsBento projects={featured} />
      </div>
    </SectionPage>
  )
}
