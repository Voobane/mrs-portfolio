import { useCallback, useEffect, useState } from 'react'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import Projects from './components/Projects.jsx'
import TerminalModal from './components/terminal/TerminalModal.jsx'
import { terminalDemos } from './data/terminalDemos.js'
import { useTheme } from './hooks/useTheme.js'
import { clearState } from './lib/storage.js'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [view, setView] = useState('main') // 'main' | 'contact'
  const [scrollTarget, setScrollTarget] = useState(null)
  const [terminal, setTerminal] = useState({ key: null, open: false, instance: 0 })

  // Switch views, then scroll to a section (or to the top of the page)
  const navigate = useCallback((nextView, sectionId = null) => {
    setView(nextView)
    setScrollTarget({ id: sectionId, requestedAt: Date.now() })
  }, [])

  useEffect(() => {
    if (!scrollTarget) return undefined

    // Wait a tick so the new view is rendered before scrolling
    const timer = setTimeout(() => {
      const section = scrollTarget.id && document.getElementById(scrollTarget.id)
      if (section) section.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)

    return () => clearTimeout(timer)
  }, [scrollTarget])

  // `instance` changes on every open or restart, which gives the terminal a fresh start
  const openTerminal = useCallback(
    (key) => setTerminal((t) => ({ key, open: true, instance: t.instance + 1 })),
    [],
  )
  const closeTerminal = useCallback(() => setTerminal((t) => ({ ...t, open: false })), [])
  const restartTerminal = useCallback(() => {
    setTerminal((t) => {
      if (t.key) clearState(terminalDemos[t.key].cacheKey)
      return { ...t, instance: t.instance + 1 }
    })
  }, [])

  // Unmount the terminal once the close animation has finished
  useEffect(() => {
    if (terminal.open) return undefined
    const timer = setTimeout(() => setTerminal((t) => (t.open ? t : { ...t, key: null })), 300)
    return () => clearTimeout(timer)
  }, [terminal.open])

  return (
    <>
      <TerminalModal
        demoKey={terminal.key}
        open={terminal.open}
        instance={terminal.instance}
        onClose={closeTerminal}
        onRestart={restartTerminal}
      />
      <Navbar view={view} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-[1100px] px-[clamp(16px,5vw,60px)]">
        {view === 'main' ? (
          <>
            <Hero onNavigate={navigate} />
            <About />
            <Projects onOpenTerminal={openTerminal} />
            <Experience />
          </>
        ) : (
          <Contact />
        )}
      </main>

      <Footer />
    </>
  )
}
