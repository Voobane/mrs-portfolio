import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import SectionHeader from './SectionHeader.jsx'

export default function Projects({ onOpenTerminal }) {
  return (
    <section id="projects" className="mb-20 scroll-mt-20">
      <SectionHeader title="Projects" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.repo} project={project} onOpenTerminal={onOpenTerminal} />
        ))}
      </div>
    </section>
  )
}
