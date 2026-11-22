// A tiny client-side router: real page addresses (/contact, /projects/personal)
// that work with the browser's Back and Forward buttons, without a library.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const readLocation = () => ({
  path: window.location.pathname.replace(/\/+$/, '') || '/',
  hash: decodeURIComponent(window.location.hash.slice(1)),
})

/** Current address plus a `navigate(path, hash)` function. */
export function useLocation() {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const onPopState = () => setLocation({ ...readLocation(), samePage: false })
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path, hash = '') => {
    const url = hash ? `${path}#${hash}` : path
    if (url !== window.location.pathname + window.location.hash) window.history.pushState(null, '', url)
    // A new object every time, so navigating to the same place still scrolls
    setLocation((previous) => ({ path, hash, samePage: previous.path === path }))
  }, [])

  return [location, navigate]
}

export const RouterContext = createContext(() => {})

/** An <a> that changes page without a full reload (Ctrl/⌘-click still opens a new tab). */
export function Link({ to, hash = '', children, ...props }) {
  const navigate = useContext(RouterContext)

  const onClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to, hash)
  }

  return (
    <a href={hash ? `${to}#${hash}` : to} onClick={onClick} {...props}>
      {children}
    </a>
  )
}
