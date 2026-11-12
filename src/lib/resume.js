const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`

/**
 * Opens public/resume.pdf in a new tab if it has been added to the project,
 * otherwise tells the visitor it is coming soon.
 */
export async function openResume() {
  try {
    const response = await fetch(RESUME_URL, { method: 'HEAD' })
    const contentType = response.headers.get('content-type') || ''

    if (response.ok && contentType.includes('pdf')) {
      window.open(RESUME_URL, '_blank', 'noopener')
    } else {
      alert('Resume coming soon — please reach out via the Contact page.')
    }
  } catch {
    window.open(RESUME_URL, '_blank', 'noopener')
  }
}
