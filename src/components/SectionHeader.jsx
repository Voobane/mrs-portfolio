export default function SectionHeader({ title }) {
  return (
    <div className="mb-9 flex items-center gap-4">
      <h2 className="m-0 font-mono text-[1.4rem] font-bold leading-tight tracking-[-0.02em] text-fg md:whitespace-nowrap">
        <span className="text-accent">//</span> {title}
      </h2>
      <div className="h-px min-w-6 flex-1 bg-line" />
    </div>
  )
}
