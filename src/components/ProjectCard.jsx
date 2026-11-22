// Card buttons: 44px tall on phones (comfortable thumb target), 36px with a mouse
const linkBase =
  'inline-flex min-h-11 items-center justify-center gap-[5px] rounded-md px-4 font-mono text-[0.72rem] font-bold uppercase tracking-[0.06em] no-underline transition duration-200 md:min-h-9'

const demoClass = `${linkBase} cursor-pointer border border-accent bg-accent text-white hover:-translate-y-px hover:border-accent-hi hover:bg-accent-hi`
const repoClass = `${linkBase} border border-line text-muted hover:-translate-y-px hover:border-accent hover:text-accent`

export default function ProjectCard({ project, onOpenTerminal }) {
  const { name, emoji, label, description, tech, liveUrl, repoUrl, featured, terminalDemo } = project

  return (
    <article
      className={`card overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-accent ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden border-b border-line bg-card text-5xl ${
          featured ? 'aspect-[21/9]' : 'aspect-video'
        }`}
      >
        <span aria-hidden="true">{emoji}</span>
        <span className="absolute bottom-2.5 right-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted">
          {label}
        </span>
      </div>

      <div className="px-6 pb-6 pt-5">
        <h3 className="m-0 mb-2 font-mono text-base font-bold text-fg">{name}</h3>
        <p className="m-0 mb-3.5 text-sm leading-[1.55] text-muted">{description}</p>

        <ul className="m-0 mb-4 flex list-none flex-wrap gap-1.5 p-0" aria-label="Technologies">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded bg-accent-lo px-2 py-[3px] font-mono text-[0.72rem] font-semibold tracking-[0.03em] text-accent-hi"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3">
          {terminalDemo ? (
            <button type="button" onClick={() => onOpenTerminal(terminalDemo)} className={demoClass}>
              ▶ Live Demo
            </button>
          ) : (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} live demo (opens in a new tab)`}
              className={demoClass}
            >
              ▶ Live Demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} source code on GitHub (opens in a new tab)`}
            className={repoClass}
          >
            ⌥ GitHub
          </a>
        </div>
      </div>
    </article>
  )
}
