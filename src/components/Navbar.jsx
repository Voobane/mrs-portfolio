import { useCallback, useRef, useState } from 'react'
import MobileMenu from './MobileMenu.jsx'
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

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export default function Navbar({ view, onNavigate, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const items = [
    ...SECTIONS.map((s) => ({ label: s.label, active: false, onSelect: () => onNavigate('main', s.id) })),
    { label: 'Contact', active: view === 'contact', onSelect: () => onNavigate('contact') },
  ]

  // Choosing a link in the phone menu closes the menu as well
  const menuItems = items.map((item) => ({
    ...item,
    onSelect: () => {
      closeMenu()
      item.onSelect()
    },
  }))

  return (
    <>
      <nav className="sticky top-0 z-[100] flex h-[60px] items-center justify-between border-b border-line bg-white/92 px-[clamp(16px,5vw,60px)] backdrop-blur-[20px] dark:bg-[#0d0f1a]/92">
        <button
          onClick={() => onNavigate('main')}
          className="relative cursor-pointer font-mono text-base font-bold tracking-[-0.02em] text-fg after:absolute after:-inset-2.5 after:content-['']"
          aria-label="Home"
        >
          MS<span className="text-accent">.</span>
        </button>

        <ul className="m-0 hidden list-none gap-8 p-0 md:flex">
          {items.map((item) => (
            <li key={item.label}>
              <button className={linkClass(item.active)} onClick={item.onSelect}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center rounded-lg text-fg transition-colors duration-200 hover:text-accent md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} items={menuItems} returnFocusRef={menuButtonRef} />
    </>
  )
}
