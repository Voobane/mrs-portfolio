import { education } from '../data/education.js'
import { CertificateIcon, GraduationCapIcon } from './icons.jsx'
import SectionHeader from './SectionHeader.jsx'

function EducationCard({ school, program, date, credential, score, scoreType, notes }) {
  const ScoreIcon = scoreType === 'certification' ? CertificateIcon : GraduationCapIcon

  return (
    <article className="card flex h-full flex-col p-7 transition-colors duration-200 hover:border-accent">
      <h3 className="m-0 font-mono text-base font-bold leading-snug text-fg">{school}</h3>
      {program && <p className="m-0 mt-1 text-sm font-medium leading-snug text-fg/80">{program}</p>}
      <p className="m-0 mt-2 font-mono text-[0.8rem] tracking-[0.02em] text-muted">{date}</p>

      {/* Diploma or certificate, then the score on the right */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {credential && <span className="text-sm font-semibold text-fg">{credential}</span>}
        {score && (
          <span className="ml-auto inline-flex items-center gap-2 font-mono text-[0.95rem] font-bold text-accent-hi">
            <ScoreIcon />
            {score}
          </span>
        )}
      </div>

      {notes?.length > 0 && (
        <ul className="m-0 mt-6 flex list-none flex-col gap-2 border-t border-line p-0 pt-5">
          {notes.map((note) => (
            <li
              key={note}
              className="relative pl-4 text-sm leading-[1.55] text-muted before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-accent before:content-['']"
            >
              {note}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function Education() {
  return (
    <section id="education" className="mb-20 scroll-mt-20">
      <SectionHeader title="Education" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {education.map((item) => (
          <EducationCard key={item.school} {...item} />
        ))}
      </div>
    </section>
  )
}
