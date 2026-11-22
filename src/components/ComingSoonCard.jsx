const ICONS = ['🛠️', '🔩', '💡', '🧪']

// Placeholder card shown where a project will go
export default function ComingSoonCard({ index = 0 }) {
  return (
    <article className="card overflow-hidden border-dashed" aria-label="Project coming soon">
      <div className="relative flex aspect-video w-full items-center justify-center border-b border-dashed border-line bg-card text-5xl">
        <span aria-hidden="true" className="opacity-60 grayscale-[40%]">
          {ICONS[index % ICONS.length]}
        </span>
        <span className="absolute bottom-2.5 right-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted">
          In progress
        </span>
      </div>

      <div className="px-6 pb-6 pt-5">
        <h3 className="m-0 mb-2 font-mono text-base font-bold text-muted">Coming soon</h3>
        <p className="m-0 mb-4 text-sm leading-[1.55] text-muted">
          A new project is in the works. Check back soon to see what I&apos;m building.
        </p>
        <span className="inline-flex min-h-11 items-center rounded-md border border-dashed border-line px-4 font-mono text-[0.72rem] font-bold uppercase tracking-[0.06em] text-muted md:min-h-9">
          ⏳ Coming soon
        </span>
      </div>
    </article>
  )
}
