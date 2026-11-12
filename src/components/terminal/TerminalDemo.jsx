import { useEffect, useRef, useState } from 'react'
import { loadState, saveState } from '../../lib/storage.js'

const COLORS = {
  't-green': 'text-term-green',
  't-blue': 'text-term-blue',
  't-yellow': 'text-term-yellow',
  't-muted': 'text-term-muted',
  't-red': 'text-term-red',
}

// Question-and-answer flows (the first prompt is already printed by the intro)
const SVG_STEPS = [
  { key: 'text', prompt: '? Enter up to 3 characters for logo text:', validate: (v) => (v.length > 3 ? 'Max 3 characters!' : null) },
  { key: 'textColor', prompt: '? Enter text color (keyword or hex):' },
  { key: 'shape', prompt: '? Choose a shape:', choices: ['circle', 'triangle', 'square'] },
  { key: 'shapeColor', prompt: '? Enter shape color (keyword or hex):' },
]

const README_STEPS = [
  { key: 'title', prompt: '? What is your project title?' },
  { key: 'desc', prompt: '? Provide a description of your project:' },
  { key: 'install', prompt: '? What are the installation instructions?' },
  { key: 'usage', prompt: '? What is the usage information?' },
  { key: 'contributing', prompt: '? What are the contribution guidelines?' },
  { key: 'tests', prompt: '? What are the test instructions?' },
  { key: 'license', prompt: '? Choose a license:', choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'] },
  { key: 'github', prompt: '? What is your GitHub username?' },
  { key: 'email', prompt: '? What is your email address?' },
]

const line = (text = '', cls) => ({ text, cls })

const menuLines = (demo) => [line(), ...demo.menu.map((item, i) => line(`  ${i + 1}. ${item}`)), line()]

const promptLines = (step) => [line(step.prompt, 't-yellow'), ...(step.choices || []).map((c) => line(`  › ${c}`))]

function svgResult(a) {
  return [line('✓ Generated logo.svg', 't-green'), line(), { svg: a }]
}

function readmeResult(a) {
  const rule = line('─'.repeat(50), 't-muted')
  return [
    line('✓ README.md generated successfully!', 't-green'),
    line(),
    line('Preview:', 't-muted'),
    rule,
    line(`# ${a.title || 'My Project'}`),
    line(),
    line(`![License](https://img.shields.io/badge/license-${a.license || 'MIT'}-blue.svg)`),
    line(),
    line('## Description'),
    line(a.desc || 'Project description.'),
    line(),
    line('## Table of Contents'),
    line('- [Installation](#installation)'),
    line('- [Usage](#usage)'),
    line('- [License](#license)'),
    line('- [Questions](#questions)'),
    line(),
    line('## Installation'),
    line(a.install || 'npm install'),
    line(),
    line('## Usage'),
    line(a.usage || 'npm start'),
    line(),
    line('## Questions'),
    line(`GitHub: https://github.com/${a.github || 'Voobane'}`),
    line(`Email: ${a.email || 'voodoobane07@gmail.com'}`),
    rule,
  ]
}

function SvgLogo({ text, textColor, shape, shapeColor }) {
  const fill = shapeColor || '#4a4fff'
  const s = (shape || 'circle').toLowerCase()
  return (
    <div className="mb-4 mt-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200" className="max-w-full">
        {s === 'circle' && <circle cx="150" cy="100" r="80" fill={fill} />}
        {s === 'triangle' && <polygon points="150,20 230,180 70,180" fill={fill} />}
        {s !== 'circle' && s !== 'triangle' && <rect x="70" y="20" width="160" height="160" fill={fill} />}
        <text x="150" y="110" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace" fontSize="40" fontWeight="bold" fill={textColor || '#fff'}>
          {(text || 'SVG').slice(0, 3)}
        </text>
      </svg>
    </div>
  )
}

function WindowDots() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="size-3 rounded-full bg-term-red" />
      <span className="size-3 rounded-full bg-term-yellow" />
      <span className="size-3 rounded-full bg-term-green" />
    </div>
  )
}

export default function TerminalDemo({ demo }) {
  const flow = demo.svgFlow ? 'svg' : demo.readmeFlow ? 'readme' : 'menu'
  const steps = flow === 'svg' ? SVG_STEPS : README_STEPS
  const resultFor = flow === 'svg' ? svgResult : readmeResult

  // A finished SVG/README run is remembered, so reopening shows the result
  const [saved] = useState(() => (flow === 'menu' ? {} : loadState(demo.cacheKey)))
  const [lines, setLines] = useState(() => {
    const intro = demo.intro.map((l) => line(l.text, l.cls))
    if (flow === 'menu') return [...intro, ...menuLines(demo)]
    if (saved.done) return [...intro, ...resultFor(saved.answers || {})]
    return intro
  })
  const [value, setValue] = useState('')
  const [promptChar, setPromptChar] = useState('>')
  const [disabled, setDisabled] = useState(Boolean(saved.done))

  const stepRef = useRef(0)
  const answersRef = useRef({})
  const waitingRef = useRef(null) // follow-up handler while the menu asks a question
  const timers = useRef([])
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  const add = (...newLines) => setLines((prev) => [...prev, ...newLines])
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  useEffect(() => {
    later(() => inputRef.current?.focus(), 100)
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  function handleMenu(val) {
    add(line(`> ${val}`, 't-green'))

    if (waitingRef.current) {
      const result = waitingRef.current(val)
      waitingRef.current = null
      setPromptChar('>')
      add(line(result, 't-green'), line(), line('What would you like to do?'), ...menuLines(demo))
      return
    }

    const num = Number.parseInt(val, 10)
    if (Number.isNaN(num) || num < 1 || num > demo.menu.length) {
      add(line('Please enter a valid option number.', 't-red'))
      return
    }

    const handler = demo.handlers[demo.menu[num - 1]]
    if (handler.exit) {
      add(line(), line('Goodbye! 👋', 't-green'))
      setDisabled(true)
    } else if (handler.output) {
      add(line(), ...handler.output.map((l) => line(l.text, l.cls)), line(), line('What would you like to do?'), ...menuLines(demo))
    } else if (handler.prompt) {
      add(line(), line(handler.prompt, 't-yellow'))
      setPromptChar('→')
      waitingRef.current = handler.followUp
    }
  }

  function handleSteps(val) {
    const step = steps[stepRef.current]
    if (!step) return
    const error = step.validate?.(val)
    if (error) {
      add(line(error, 't-red'))
      return
    }

    add(line(`> ${val}`, 't-green'))
    answersRef.current = { ...answersRef.current, [step.key]: val }
    stepRef.current += 1

    const next = steps[stepRef.current]
    if (next) {
      add(...promptLines(next))
      return
    }

    const answers = answersRef.current
    saveState(demo.cacheKey, { done: true, answers })
    setDisabled(true)
    add(line(), line(flow === 'svg' ? 'Generating logo…' : 'Generating README.md…', 't-muted'))
    later(() => add(...resultFor(answers)), 600)
  }

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return
    const val = value.trim()
    if (!val) return
    setValue('')
    if (flow === 'menu') handleMenu(val)
    else handleSteps(val)
  }

  return (
    <div className="flex min-h-[min(520px,70vh)] w-full flex-1 flex-col bg-term-bg font-mono">
      <div className="flex shrink-0 items-center gap-2.5 border-b border-[#2a2d38] bg-term-bar px-4 py-2.5">
        <WindowDots />
        <span className="ml-2 truncate text-xs text-[#7880b0]">node index.js — {demo.name}</span>
      </div>

      <div ref={outputRef} className="flex-1 overflow-auto px-5 py-4 text-[0.82rem] leading-[1.7] text-term-text">
        {lines.map((l, i) =>
          l.svg ? (
            <SvgLogo key={i} {...l.svg} />
          ) : (
            <div key={i} className={`whitespace-pre ${COLORS[l.cls] || ''}`}>
              {l.text || ' '}
            </div>
          ),
        )}
      </div>

      <div className="flex shrink-0 items-center border-t border-term-bar px-5 py-3">
        <span className="mr-2 whitespace-nowrap text-[0.82rem] text-term-green">{promptChar}</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Press Restart to run it again' : 'Type your answer and press Enter…'}
          aria-label="Terminal input"
          className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[0.82rem] text-[#e8eaff] caret-term-blue outline-none placeholder:text-term-muted"
        />
      </div>
    </div>
  )
}
