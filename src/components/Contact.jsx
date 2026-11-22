import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'
import { GitHubIcon, LinkedInIcon } from './icons.jsx'

const EMPTY_FORM = { fname: '', lname: '', email: '', subject: '', message: '' }
const REQUIRED = ['fname', 'email', 'message']
const SUBJECTS = {
  job: 'Job opportunity',
  freelance: 'Freelance project',
  collab: 'Collaboration',
  other: 'Just saying hi',
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      /* clipboard blocked — the address is still visible to copy by hand */
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2.5 rounded-[10px] border border-line bg-page px-3.5 py-2.5">
      <span className="min-w-0 flex-1 truncate font-mono text-[0.82rem] text-fg">{profile.email}</span>
      <button
        onClick={copy}
        className="min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-md bg-accent px-4 font-mono md:min-h-8 text-[0.7rem] font-bold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-accent-hi"
      >
        {copied ? 'COPIED!' : 'COPY'}
      </button>
    </div>
  )
}

function Field({ label, id, children }) {
  return (
    <div className="mb-4 flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-muted">
        {label}
      </label>
      {children}
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: false }))
  }

  const submit = (e) => {
    e.preventDefault()
    const missing = Object.fromEntries(REQUIRED.filter((k) => !form[k].trim()).map((k) => [k, true]))
    if (Object.keys(missing).length) {
      setErrors(missing)
      return
    }

    // GitHub Pages has no server, so open the visitor's email app with the message filled in
    const fullName = `${form.fname} ${form.lname}`.trim()
    const topic = SUBJECTS[form.subject]
    const subject = `Portfolio contact from ${fullName}${topic ? ` — ${topic}` : ''}`
    const body = `${form.message.trim()}\n\n— ${fullName} (${form.email.trim()})`
    setStatus('sending')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    timer.current = setTimeout(() => setStatus('sent'), 1000)
  }

  const reset = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setStatus('idle')
  }

  const fieldClass = (name) => `field ${errors[name] ? 'border-danger' : ''}`

  if (status === 'sent') {
    return (
      <div className="py-8 text-center" role="status">
        <div className="mb-4 text-5xl">✅</div>
        <h4 className="m-0 mb-2 text-[1.1rem] font-bold text-fg">Almost there!</h4>
        <p className="m-0 mb-5 text-[0.9rem] text-muted">
          Your email app should have opened with your message ready — just hit send. I&apos;ll get back to you within a
          day or two.
        </p>
        <button className="btn-outline" onClick={reset}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <Field label="First name" id="fname">
          <input
            id="fname"
            name="fname"
            placeholder="Jane"
            autoComplete="given-name"
            value={form.fname}
            onChange={update}
            className={fieldClass('fname')}
            required
          />
        </Field>
        <Field label="Last name" id="lname">
          <input
            id="lname"
            name="lname"
            placeholder="Smith"
            autoComplete="family-name"
            value={form.lname}
            onChange={update}
            className={fieldClass('lname')}
          />
        </Field>
      </div>
      <Field label="Email address" id="email">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          autoComplete="email"
          value={form.email}
          onChange={update}
          className={fieldClass('email')}
          required
        />
      </Field>
      <Field label="What brought you here?" id="subject">
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={update}
          className={`${fieldClass('subject')} select-arrow cursor-pointer appearance-none pr-9`}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {Object.entries(SUBJECTS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" id="message">
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about the opportunity or project…"
          value={form.message}
          onChange={update}
          className={`${fieldClass('message')} min-h-[120px] resize-y leading-[1.6]`}
          required
        />
      </Field>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-accent px-6 py-[13px] text-[0.95rem] font-bold tracking-[0.02em] text-white transition duration-200 hover:-translate-y-px hover:bg-accent-hi disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Opening email…' : 'Send message →'}
      </button>
    </form>
  )
}

const socialLinkClass =
  'group flex items-center gap-3 rounded-[10px] border border-line bg-page px-3.5 py-3 text-sm font-medium text-fg no-underline transition-colors duration-200 hover:border-accent hover:text-accent'

export default function Contact() {
  return (
    <div className="pb-[60px] pt-10 md:pb-20 md:pt-16">
      <header className="mb-14">
        <p className="m-0 mb-4 mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-accent before:size-2 before:rounded-full before:bg-accent before:content-['']">
          Contact
        </p>
        <h1 className="m-0 mb-4 font-mono text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
          Let&apos;s work
          <br />
          <span className="text-accent">together.</span>
        </h1>
        <p className="m-0 max-w-[520px] text-[1.05rem] leading-[1.65] text-muted">
          I&apos;m open to full-time roles, freelance projects, and collaboration. Reach out however works best for you —
          copy my email or fill out the form and I&apos;ll get back to you.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
        <div className="flex flex-col">
          <p className="label-mono m-0 mb-5 tracking-[0.12em] text-muted">Direct</p>
          <div className="card mb-5 p-7">
            <h3 className="m-0 mb-1.5 font-mono text-[0.9rem] font-bold text-fg">Email me directly</h3>
            <p className="m-0 mb-[18px] text-[0.85rem] text-muted">
              Copy the address and open your email client, or use the form on the right.
            </p>
            <CopyEmail />
          </div>
          <div className="card p-7">
            <h3 className="m-0 mb-4 font-mono text-[0.9rem] font-bold text-fg">Find me online</h3>
            <div className="flex flex-col gap-3">
              <a href={profile.github.url} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                <span className="shrink-0 text-muted transition-colors duration-200 group-hover:text-accent">
                  <GitHubIcon size={18} />
                </span>
                GitHub — {profile.github.handle}
                <span className="ml-auto font-mono text-xs text-muted">↗</span>
              </a>
              <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                <span className="shrink-0 text-muted transition-colors duration-200 group-hover:text-accent">
                  <LinkedInIcon size={18} />
                </span>
                LinkedIn — {profile.name}
                <span className="ml-auto font-mono text-xs text-muted">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="card p-9">
          <span className="label-mono mb-5 block tracking-[0.12em] text-muted">Send a message</span>
          <h3 className="m-0 mb-1.5 text-base font-bold text-fg">Get in touch</h3>
          <p className="m-0 mb-7 text-sm leading-[1.55] text-muted">Fill out the form and I&apos;ll reply within a day or two.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
