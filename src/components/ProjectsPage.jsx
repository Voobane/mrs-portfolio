import { projectCategories } from '../data/projects.js'
import { Link } from '../lib/router.jsx'
import ProjectGrid from './ProjectGrid.jsx'

// Full list of one project category, at /projects/<category id>
export default function ProjectsPage({ category, onOpenTerminal }) {
  const otherCategories = projectCategories.filter((c) => c.id !== category.id)
  const count = category.projects.length
  const [firstWord, ...rest] = category.title.split(' ')

  return (
    <div className="pb-[60px] pt-8 md:pb-20 md:pt-12">
      <Link
        to="/"
        hash={category.sectionId}
        className="-ml-1 inline-flex min-h-11 items-center gap-2 px-1 font-mono text-xs uppercase tracking-[0.08em] text-muted no-underline transition-colors duration-200 hover:text-accent"
      >
        <span aria-hidden="true">←</span> Back to home
      </Link>

      <header className="mb-12 mt-6">
        <p className="m-0 mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-accent before:size-2 before:rounded-full before:bg-accent before:content-['']">
          {count ? `${count} ${count === 1 ? 'project' : 'projects'}` : 'Coming soon'}
        </p>
        <h1 className="m-0 mb-4 font-mono text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
          {firstWord}
          <br />
          <span className="text-accent">{rest.join(' ')}.</span>
        </h1>
        <p className="m-0 max-w-[560px] text-[1.05rem] leading-[1.65] text-muted">{category.description}</p>
      </header>

      <ProjectGrid projects={category.projects} onOpenTerminal={onOpenTerminal} />

      {otherCategories.map((other) => (
        <div key={other.id} className="mt-12 flex border-t border-line pt-8 md:justify-end">
          <Link to={`/projects/${other.id}`} className="btn-outline w-full gap-2 md:w-auto">
            Browse {other.title} <span aria-hidden="true">→</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
