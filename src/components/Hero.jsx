import { profile } from '../data/profile.js'
import { openResume } from '../lib/resume.js'
import { GitHubIcon, LinkedInIcon } from './icons.jsx'

const socialClass =
  'inline-flex min-h-11 items-center gap-1.5 font-mono text-xs tracking-[0.06em] text-muted no-underline transition-colors duration-200 hover:text-accent'

export default function Hero({ onNavigate }) {
  return (
    <section id="about" className="scroll-mt-20 pb-10 pt-12 md:pb-[60px] md:pt-20">
      <p className="mb-5 mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-accent before:size-2 before:animate-blip before:rounded-full before:bg-accent before:content-['']">
        Available for work
      </p>
      <h1 className="m-0 mb-5 font-mono text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-fg">
        Hello, I&apos;m
        <br />
        <span className="text-accent">{profile.name}</span>
      </h1>
      <p className="m-0 mb-9 max-w-[540px] text-[clamp(1rem,2vw,1.2rem)] leading-[1.6] text-muted">
        Full Stack Developer building modern web applications with JavaScript, React, and Node.js.
      </p>

      <div className="mb-10 flex flex-wrap gap-3">
        <button className="btn-primary" onClick={() => onNavigate('main', 'projects')}>
          View Projects
        </button>
        <button className="btn-outline" onClick={openResume}>
          View CV
        </button>
        <button className="btn-outline" onClick={() => onNavigate('contact')}>
          Get in Touch
        </button>
      </div>

      <div className="flex flex-wrap gap-x-6">
        <a href={profile.github.url} target="_blank" rel="noopener noreferrer" className={socialClass}>
          <GitHubIcon /> GitHub
        </a>
        <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer" className={socialClass}>
          <LinkedInIcon /> LinkedIn
        </a>
      </div>
    </section>
  )
}
