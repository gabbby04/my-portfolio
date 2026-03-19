import { useEffect, useState } from 'react'
import { User, Zap, FolderOpen, Mail, Terminal } from 'lucide-react'
import useWindow from '../hooks/useWindow'
import Window from './Window'
import Taskbar from './Taskbar'
import HeroApp from './apps/HeroApp'
import SkillsApp from './apps/SkillsApp'
import ProjectsApp from './apps/ProjectsApp'
import ContactApp from './apps/ContactApp'
import SecretApp from './apps/SecretApp'

const windowConfig = {
  hero: { title: 'ahron.me', icon: User, width: 620, height: 560, component: HeroApp },
  skills:   { title: 'skills.exe',    icon: Zap,        width: 500, height: 420, component: SkillsApp   },
  projects: { title: 'projects/',     icon: FolderOpen, width: 560, height: 480, component: ProjectsApp },
  contact:  { title: 'contact.form',  icon: Mail,       width: 480, height: 500, component: ContactApp  },
  secret:   { title: 'terminal',      icon: Terminal,   width: 520, height: 380, component: SecretApp   },
}

const stickyNotes = [
  { text: 'vibe code tym',        top: '12%', right: '4%',  rotate: '2deg',    color: '#fef08a' },
  { text: 'El Psy Kongroo.', top: '35%', right: '3%',  rotate: '-1.5deg', color: '#bbf7d0' },
  { text: 'hire me pls:3',     top: '58%', right: '5%',  rotate: '1deg',    color: '#fecdd3' },
]

const bootLines = [
  'AHRON OS v1.0',
  'Booting system...',
  'Loading portfolio assets...',
  'Mounting personality modules...',
  'El Psy Kongroo.',
  'Welcome.',
]

export default function Desktop() {
  const { windows, openWindow, closeWindow, minimizeWindow, focusWindow, moveWindow } = useWindow()
  const [booted, setBooted] = useState(false)
  const [bootText, setBootText] = useState('')

  // Boot sequence
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i < bootLines.length) {
        setBootText(bootLines[i])
        i++
      } else {
        clearInterval(t)
        setTimeout(() => setBooted(true), 600)
      }
    }, 380)
    return () => clearInterval(t)
  }, [])

  // Secret: type "elpsy" anywhere to open terminal
  useEffect(() => {
    let typed = ''
    const handler = (e) => {
      typed += e.key.toLowerCase()
      if (typed.includes('steinsgate')) {
        openWindow('secret')
        typed = ''
      }
      if (typed.length > 10) typed = typed.slice(-10)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openWindow])

  if (!booted) return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4"
      style={{ background: '#0d0d0d' }}>
      <div className="text-4xl font-bold tracking-tight"
        style={{ color: '#2563eb', fontFamily: 'Syne' }}>
        AHRON OS
      </div>
      <div className="text-sm tracking-widest"
        style={{ color: '#555', fontFamily: 'DM Mono' }}>
        {bootText}
      </div>
      <div className="w-48 h-px mt-2 overflow-hidden" style={{ background: '#1a1a1a' }}>
        <div className="h-full animate-pulse" style={{ background: '#2563eb', width: '60%' }} />
      </div>
    </div>
  )

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: 'var(--os-bg)' }}>

      {/* Dot grid wallpaper */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

      {/* Menu bar */}
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-5 z-50"
        style={{
          background: 'rgba(250,248,243,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(30,27,46,0.08)',
        }}>
        <div className="flex items-center gap-5">
          <span className="text-sm font-bold tracking-tight"
            style={{ fontFamily: 'Syne', color: 'var(--os-dark)' }}>
            Gab
          </span>
          <span style={{ fontFamily: 'DM Mono', color: 'var(--os-muted)', fontSize: '0.65rem' }}>
            {new Date().toLocaleDateString('en-PH', {
              weekday: 'short', month: 'short', day: 'numeric'
            })}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--os-muted)', fontSize: '0.65rem', fontFamily: 'DM Mono' }}>PH</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
            <span style={{ color: 'var(--os-blue)', fontSize: '0.65rem', fontFamily: 'DM Mono' }}>
              Available
            </span>
          </div>
        </div>
      </div>

      {/* Sticky notes */}
      {stickyNotes.map((note, i) => (
        <div key={i} className="absolute p-3 w-28 cursor-default"
          style={{
            top: note.top,
            right: note.right,
            background: note.color,
            transform: `rotate(${note.rotate})`,
            color: '#1e1b2e',
            fontSize: '0.7rem',
            fontFamily: 'DM Mono',
            lineHeight: 1.5,
            boxShadow: '2px 3px 12px rgba(0,0,0,0.08)',
          }}>
          {note.text}
        </div>
      ))}

      {/* Windows */}
      {Object.entries(windowConfig).map(([id, cfg]) => (
        <Window
          key={id}
          id={id}
          title={cfg.title}
          icon={<cfg.icon size={12} strokeWidth={1.5} />}
          width={cfg.width}
          height={cfg.height}
          state={windows[id]}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
        >
          <cfg.component />
        </Window>
      ))}

      {/* Keyboard hint */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="text-xs font-mono text-center"
          style={{ color: 'var(--os-muted)', opacity: 0.4, letterSpacing: '0.08em', fontSize: '0.65rem' }}>
          psst — try typing something
        </p>
      </div>

      <Taskbar windows={windows} onOpen={openWindow} />
    </div>
  )
}