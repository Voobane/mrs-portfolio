import { skillGroups } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'

function BentoCard({ tag, title, className = '', children }) {
  return (
    <div className={`card p-7 transition-colors duration-200 hover:border-accent-lo ${className}`}>
      <div className="label-mono mb-2.5 text-accent">{tag}</div>
      <h3 className="m-0 mb-3 text-[1.05rem] font-bold text-fg">{title}</h3>
      {children}
    </div>
  )
}

const text = 'm-0 text-[0.9rem] leading-[1.6] text-muted'

export default function About() {
  return (
    <section id="about-section" className="mb-20 scroll-mt-20">
      <SectionHeader title="About Me" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BentoCard tag="Profile" title="Full Stack Developer" className="md:row-span-2">
          <p className={text}>
            I&apos;m a developer with a hands-on background — I&apos;ve built real things, from custom CNC mills to
            full-stack web applications. That maker mindset carries over into how I write code: I care about how
            things actually work, not just whether they run.
          </p>
          <p className={`${text} mt-3`}>
            I completed a full-stack bootcamp focused on JavaScript, and I&apos;m most comfortable in the MERN stack
            (MongoDB, Express, React, Node.js) and working with REST APIs and databases.
          </p>
          <p className={`${text} mt-3`}>
            I&apos;m currently building out my portfolio and looking for opportunities to contribute to a team and keep
            growing.
          </p>
        </BentoCard>

        <BentoCard tag="Background" title="Maker at Heart">
          <p className={text}>
            Before web dev: 3D printing, Arduino, Fusion 360 CAD, CNC machining — I built my own CNC mill. The same
            precision and problem-solving I applied to hardware now goes into software.
          </p>
        </BentoCard>

        <BentoCard tag="Tech Stack" title="What I Work With" className="md:col-span-2">
          <div className="mt-2 flex flex-col gap-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-1.5">
                <span className="label-mono font-bold text-muted">{group.label}</span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-accent-lo px-2.5 py-1 font-mono text-[0.78rem] font-semibold tracking-[0.03em] text-accent-hi"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  )
}
