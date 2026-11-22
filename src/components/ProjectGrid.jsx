import ComingSoonCard from './ComingSoonCard.jsx'
import ProjectCard from './ProjectCard.jsx'

/**
 * Grid of project cards.
 * - `limit` (home page): shows that many cards, topped up with "Coming soon"
 *   cards, and keeps every card the same size.
 * - no `limit` (category page): shows every project, or `placeholders`
 *   "Coming soon" cards when the category is still empty.
 */
export default function ProjectGrid({ projects, limit, placeholders = 4, onOpenTerminal }) {
  const shown = limit ? projects.slice(0, limit).map((p) => ({ ...p, featured: false })) : projects
  const comingSoon = limit ? limit - shown.length : projects.length ? 0 : placeholders

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {shown.map((project) => (
        <ProjectCard key={project.repo} project={project} onOpenTerminal={onOpenTerminal} />
      ))}
      {Array.from({ length: comingSoon }, (_, i) => (
        <ComingSoonCard key={`coming-soon-${i}`} index={i} />
      ))}
    </div>
  )
}
