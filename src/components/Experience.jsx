import { experience } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'

export default function Experience() {
  return (
    <section id="experience" className="mb-20 scroll-mt-20">
      <SectionHeader title="Experience" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {experience.map((item) => (
          <div key={item.role} className="card p-7 transition-colors duration-200 hover:border-accent-lo">
            <div className="mb-3 text-[1.8rem]" aria-hidden="true">
              {item.icon}
            </div>
            <h3 className="m-0 mb-2.5 font-mono text-base font-bold text-fg">{item.role}</h3>
            <p className="m-0 text-sm leading-[1.6] text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
