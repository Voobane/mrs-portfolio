// Small localStorage helpers. Storage can be blocked (private browsing, strict
// privacy settings), so every call fails quietly instead of breaking the page.

export function loadState(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return {}
  }
}

export function saveState(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

export function clearState(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}
