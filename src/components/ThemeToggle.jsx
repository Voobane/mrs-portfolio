export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative h-[26px] w-12 shrink-0 cursor-pointer rounded-[13px] border border-line bg-card after:absolute after:-inset-2.5 after:content-['']"
    >
      <span
        className={`absolute left-[3px] top-[3px] flex size-[18px] items-center justify-center rounded-full bg-accent text-[10px] transition-transform duration-300 ${
          isDark ? 'translate-x-[22px]' : ''
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
