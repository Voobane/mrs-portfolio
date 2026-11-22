import { useEffect } from 'react'
import { terminalDemos } from '../../data/terminalDemos.js'
import { RestartIcon } from '../icons.jsx'
import TerminalDemo from './TerminalDemo.jsx'

const headerButton =
  'cursor-pointer border border-line bg-card text-muted transition-colors duration-200 hover:border-accent hover:text-accent'

// Popup that runs a simulated terminal session for a command-line project
export default function TerminalModal({ demoKey, open, instance, onClose, onRestart }) {
  const demo = demoKey ? terminalDemos[demoKey] : null

  // Lock page scroll and listen for Escape while the modal is open
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/72 p-5 backdrop-blur-[8px] transition-opacity duration-[250ms] ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-hidden={!open}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={demo ? `${demo.name} live demo` : 'Live demo'}
        className={`flex max-h-[95vh] w-full max-w-[960px] flex-col overflow-hidden rounded-[20px] border border-line bg-page shadow-[0_32px_80px_rgba(0,0,0,0.4)] transition-transform duration-[250ms] md:max-h-[90vh] ${
          open ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.98]'
        }`}
      >
        <div className="flex shrink-0 items-center gap-3.5 border-b border-line px-6 py-[18px]">
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">▶ Live Demo</div>
            <div className="truncate font-mono text-base font-bold text-fg">{demo?.name ?? 'Project'}</div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              onClick={onRestart}
              className={`${headerButton} inline-flex min-h-11 items-center gap-1.5 rounded-[7px] px-3.5 font-mono md:min-h-8 text-[0.7rem] font-bold uppercase tracking-[0.06em]`}
            >
              <RestartIcon /> Restart
            </button>
            <button
              onClick={onClose}
              aria-label="Close demo"
              className={`${headerButton} flex size-11 items-center justify-center rounded-lg text-base md:size-8`}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {demo && <TerminalDemo key={instance} demo={demo} />}
        </div>
      </div>
    </div>
  )
}
