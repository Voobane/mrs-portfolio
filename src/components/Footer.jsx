import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-[clamp(16px,5vw,60px)] py-7 text-[0.82rem] text-muted">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>Built with React, Vite &amp; Tailwind CSS</span>
    </footer>
  )
}
