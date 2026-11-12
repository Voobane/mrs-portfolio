import ThemeToggle from './ThemeToggle.jsx'

const SECTIONS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
]

const linkClass = (active) =>
  `cursor-pointer text-sm font-medium tracking-[0.02em] transition-colors duration-200 hover:text-accent ${
    active ? 'text-accent' : 'text-muted'
  }`

export default function Navbar({ view, onNavigate, theme, onToggleTheme }) {
  return (
    <nav className="sticky top-0 z-[100] flex h-[60px] items-center justify-between border-b border-line bg-white/92 px-[clamp(16px,5vw,60px)] backdrop-blur-[20px] dark:bg-[#0d0f1a]/92">
      <button
        onClick={() => onNavigate('main')}
        className="cursor-pointer font-mono text-base font-bold tracking-[-0.02em] text-fg"
        aria-label="Home"
      >
        ms<span className="text-accent">.</span>
      </button>

      <ul className="m-0 hidden list-none gap-8 p-0 md:flex">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button className={linkClass(false)} onClick={() => onNavigate('main', s.id)}>
              {s.label}
            </button>
          </li>
        ))}
        <li>
          <button className={linkClass(view === 'contact')} onClick={() => onNavigate('contact')}>
            Contact
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  )
}
