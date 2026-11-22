import { HOME_PREVIEW_COUNT, projectCategories } from '../data/projects.js'
import { Link } from '../lib/router.jsx'
import ProjectGrid from './ProjectGrid.jsx'
import SectionHeader from './SectionHeader.jsx'

// Home page: one section per project category (Professional, then Personal),
// each with a preview of its first cards and a link to the full list
export default function Projects({ onOpenTerminal }) {
  return projectCategories.map((category) => (
    <section key={category.id} id={category.sectionId} className="mb-20 scroll-mt-20">
      <SectionHeader title={category.title} />
      <ProjectGrid projects={category.projects} limit={HOME_PREVIEW_COUNT} onOpenTerminal={onOpenTerminal} />

      <div className="mt-6 flex md:justify-end">
        <Link to={`/projects/${category.id}`} className="btn-outline w-full gap-2 md:w-auto">
          Browse more {category.title.replace(' Projects', '')} projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  ))
}
