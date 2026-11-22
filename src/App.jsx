import { useCallback, useEffect, useState } from 'react'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import Projects from './components/Projects.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import TerminalModal from './components/terminal/TerminalModal.jsx'
import { findCategory } from './data/projects.js'
import { terminalDemos } from './data/terminalDemos.js'
import { profile } from './data/profile.js'
import { useTheme } from './hooks/useTheme.js'
import { RouterContext, useLocation } from './lib/router.jsx'
import { clearState } from './lib/storage.js'

// Older code asks for pages by name; everything else is already a path
const PAGE_PATHS = { main: '/', contact: '/contact' }
const SITE_TITLE = `${profile.name} — ${profile.title}`

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [location, goTo] = useLocation()
  const [terminal, setTerminal] = useState({ key: null, open: false, instance: 0 })

  const category = findCategory(location.path.match(/^\/projects\/([^/]+)$/)?.[1])
  const page = location.path === '/contact' ? 'contact' : category ? 'projects' : 'main'

  // Go to a page (by name or path), optionally scrolling to a section on it
  const navigate = useCallback((to, sectionId = '') => goTo(PAGE_PATHS[to] ?? to, sectionId ?? ''), [goTo])

  // Unknown addresses show the home page, so tidy the address bar to match
  useEffect(() => {
    if (page === 'main' && location.path !== '/') window.history.replaceState(null, '', '/')
  }, [page, location.path])

  useEffect(() => {
    if (page === 'contact') document.title = `Contact — ${profile.name}`
    else if (category) document.title = `${category.title} — ${profile.name}`
    else document.title = SITE_TITLE
  }, [page, category])

  // After each navigation: scroll to the requested section, or to the top
  useEffect(() => {
    // Wait a tick so the new page is rendered before scrolling
    const timer = setTimeout(() => {
      const section = location.hash && document.getElementById(location.hash)
      if (section) section.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: location.samePage ? 'smooth' : 'instant' })
    }, 50)

    return () => clearTimeout(timer)
  }, [location])

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
    <RouterContext.Provider value={navigate}>
      <TerminalModal
        demoKey={terminal.key}
        open={terminal.open}
        instance={terminal.instance}
        onClose={closeTerminal}
        onRestart={restartTerminal}
      />
      <Navbar view={page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-[1100px] px-[clamp(16px,5vw,60px)]">
        {page === 'contact' && <Contact />}
        {page === 'projects' && <ProjectsPage key={category.id} category={category} onOpenTerminal={openTerminal} />}
        {page === 'main' && (
          <>
            <Hero onNavigate={navigate} />
            <About />
            <Experience />
            <Education />
            <Projects onOpenTerminal={openTerminal} />
          </>
        )}
      </main>

      <Footer />
    </RouterContext.Provider>
  )
}
