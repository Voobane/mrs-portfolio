export default function SectionHeader({ title }) {
  return (
    <div className="mb-9 flex items-center gap-4">
      <h2 className="m-0 whitespace-nowrap font-mono text-[1.4rem] font-bold tracking-[-0.02em] text-fg">
        <span className="text-accent">//</span> {title}
      </h2>
      <div className="h-px flex-1 bg-line" />
    </div>
  )
}
