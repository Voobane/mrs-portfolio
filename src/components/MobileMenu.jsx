import { useEffect, useRef } from 'react'
import { profile } from '../data/profile.js'
import { GitHubIcon, LinkedInIcon } from './icons.jsx'

const socialClass =
  'inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-[0.06em] text-muted no-underline transition-colors duration-200 hover:text-accent'

// Slide-out menu for phones. It closes when a link is chosen, the backdrop is
// tapped, ✕ or Escape is pressed, or the window grows to tablet width.
export default function MobileMenu({ open, onClose, items, returnFocusRef }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const returnTo = returnFocusRef.current
    const onKey = (e) => e.key === 'Escape' && onClose()
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = (e) => e.matches && onClose()

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
      returnTo?.focus()
    }
  }, [open, onClose, returnFocusRef])

  return (
    <div className="md:hidden">
      {/* Dimmed page behind the menu */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        id="mobile-menu"
        aria-label="Site menu"
        className={`fixed inset-y-0 right-0 z-[201] flex w-[min(80vw,320px)] flex-col border-l border-line bg-page px-6 pb-8 shadow-[-24px_0_60px_rgba(0,0,0,0.35)] duration-300 ease-out ${
          // Becomes visible at once when opening (so focus can move into it), and
          // hides only after sliding out (so hidden links can't be tabbed to)
          open ? 'visible translate-x-0 transition-transform' : 'invisible translate-x-full transition-[transform,visibility]'
        }`}
      >
        <div className="flex h-[60px] shrink-0 items-center justify-between">
          <span className="label-mono text-muted">Menu</span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center rounded-lg text-xl text-muted transition-colors duration-200 hover:text-accent"
          >
            ✕
          </button>
        </div>

        <ul className="m-0 mt-4 list-none p-0">
          {items.map((item, i) => (
            <li key={item.label} className="border-b border-line">
              <button
                onClick={item.onSelect}
                aria-current={item.active ? 'page' : undefined}
                className={`flex min-h-14 w-full cursor-pointer items-center gap-4 text-left text-xl font-semibold transition-colors duration-200 hover:text-accent ${
                  item.active ? 'text-accent' : 'text-fg'
                }`}
              >
                <span className="w-6 font-mono text-xs font-normal text-accent">0{i + 1}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col">
          <a href={profile.github.url} target="_blank" rel="noopener noreferrer" className={socialClass}>
            <GitHubIcon /> GitHub
          </a>
          <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer" className={socialClass}>
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
      </aside>
    </div>
  )
}
