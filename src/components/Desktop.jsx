import { useEffect, useState, useRef } from 'react'
import { User, Zap, FolderOpen, Mail, Terminal, FileText, Image, Music } from 'lucide-react'
import useWindow from '../hooks/useWindow'
import Window from './Window'
import Taskbar from './Taskbar'
import CursorTrail from './CursorTrail'
import Clock from './widgets/Clock'
import HeroApp from './apps/HeroApp'
import SkillsApp from './apps/SkillsApp'
import ProjectsApp from './apps/ProjectsApp'
import ContactApp from './apps/ContactApp'
import SecretApp from './apps/SecretApp'
import ReadmeApp from './apps/ReadMeApp'
import PhotosApp from './apps/PhotosApp'
import MusicApp from './apps/MusicApp'

const windowConfig = {
  hero: { title: 'ahron.me', icon: User, width: 620, height: 560, component: null },
  skills:   { title: 'skills.exe',    icon: Zap,       width: 500, height: 420, component: SkillsApp   },
  projects: { title: 'projects/',     icon: FolderOpen,width: 560, height: 480, component: ProjectsApp },
  contact:  { title: 'contact.form',  icon: Mail,      width: 480, height: 500, component: ContactApp  },
  secret:   { title: 'terminal',      icon: Terminal,  width: 520, height: 380, component: SecretApp   },
  readme:   { title: 'README.txt',    icon: FileText,  width: 520, height: 460, component: ReadmeApp   },
  photos:   { title: 'gallery/',      icon: Image,     width: 560, height: 480, component: PhotosApp   },
  music:    { title: 'lofi.player',   icon: Music,     width: 340, height: 480, component: null        },
}

const stickyNotes = [
  { text: 'kain na!',        top: '12%', right: '4%',  rotate: '2deg',    color: '#fef08a' },
  { text: 'El Psy Kongroo.', top: '35%', right: '3%',  rotate: '-1.5deg', color: '#bbf7d0' },
  { text: 'hire me pls',     top: '58%', right: '5%',  rotate: '1deg',    color: '#fecdd3' },
]

const desktopIcons = [
  { id: 'readme', icon: FileText, label: 'README.txt' },
  { id: 'photos', icon: Image,    label: 'gallery/'   },
  { id: 'music',  icon: Music,    label: 'lofi.player'},
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
  const [booted, setBooted]         = useState(false)
  const [bootText, setBootText]     = useState('')
  const [bootCharIdx, setBootCharIdx] = useState(0)
  const [bootLineIdx, setBootLineIdx] = useState(0)
  const [nowPlaying, setNowPlaying] = useState(null)

  // Boot sequence — character by character
  useEffect(() => {
    if (bootLineIdx >= bootLines.length) {
      setTimeout(() => setBooted(true), 600)
      return
    }
    const line = bootLines[bootLineIdx]
    if (bootCharIdx < line.length) {
      const t = setTimeout(() => {
        setBootText(prev => prev + line[bootCharIdx])
        setBootCharIdx(i => i + 1)
      }, 40)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setBootText('')
        setBootCharIdx(0)
        setBootLineIdx(i => i + 1)
      }, 500)
      return () => clearTimeout(t)
    }
  }, [bootLineIdx, bootCharIdx])

  // Secret easter egg
  useEffect(() => {
    let typed = ''
    const handler = (e) => {
      typed += e.key.toLowerCase()
      if (typed.includes('elpsy')) { openWindow('secret'); typed = '' }
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
      <div className="text-sm tracking-widest min-h-5"
        style={{ color: '#555', fontFamily: 'DM Mono' }}>
        {bootText}<span style={{ color: '#2563eb', animation: 'blink 1s infinite' }}>_</span>
      </div>
      <div className="w-48 h-px mt-2 overflow-hidden" style={{ background: '#1a1a1a' }}>
        <div className="h-full animate-pulse" style={{ background: '#2563eb', width: '60%' }} />
      </div>
    </div>
  )

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: 'var(--os-bg)' }}>

      <CursorTrail />

      {/* Dot grid */}
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
            style={{ fontFamily: 'Syne', color: 'var(--os-dark)' }}>Gab</span>
    
        </div>
        <div className="flex items-center gap-4">
          {nowPlaying && (
            <span style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'var(--os-blue)' }}>
              ♫ {nowPlaying.title}
            </span>
          )}
          <span style={{ color: 'var(--os-muted)', fontSize: '0.65rem', fontFamily: 'DM Mono' }}>PH</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
            <span style={{ color: 'var(--os-blue)', fontSize: '0.65rem', fontFamily: 'DM Mono' }}>Available</span>
          </div>
        </div>
      </div>

     
      <Clock />

    
        {stickyNotes.map((note, i) => (
    <div
        key={i}
        className="absolute p-3 w-28 cursor-default sticky-note"
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
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
        e.currentTarget.style.transform = `rotate(0deg) scale(1.08)`
        e.currentTarget.style.boxShadow = '4px 8px 20px rgba(0,0,0,0.15)'
        }}
        onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${note.rotate}) scale(1)`
        e.currentTarget.style.boxShadow = '2px 3px 12px rgba(0,0,0,0.08)'
        }}
    >
        {note.text}
    </div>
    ))}

      {/* Desktop icons */}
      <div className="absolute flex flex-col gap-4"
        style={{ bottom: '6rem', left: '2rem' }}>
        {desktopIcons.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onDoubleClick={() => openWindow(id)}
            className="flex flex-col items-center gap-1 group w-16"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95"
              style={{
                background: windows[id]?.open ? 'var(--os-blue-light)' : 'rgba(250,248,243,0.6)',
                border: '1px solid rgba(30,27,46,0.08)',
                backdropFilter: 'blur(8px)',
              }}>
              <Icon size={20} strokeWidth={1.5}
                style={{ color: windows[id]?.open ? 'var(--os-blue)' : 'var(--os-muted)' }} />
            </div>
            <span style={{
              fontFamily: 'DM Mono', fontSize: '0.58rem',
              color: 'var(--os-dark)', textAlign: 'center',
              textShadow: '0 1px 3px rgba(250,248,243,0.8)',
            }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {Object.entries(windowConfig).map(([id, cfg]) => {
        let Component
        if (id === 'music') Component = () => <MusicApp onTrackChange={setNowPlaying} />
        else if (id === 'hero') Component = () => <HeroApp onOpenProjects={() => openWindow('projects')} />
        else Component = cfg.component

        return (
            <Window
            key={id} id={id}
            title={cfg.title}
            icon={<cfg.icon size={12} strokeWidth={1.5} />}
            width={cfg.width} height={cfg.height}
            state={windows[id]}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
            >
            <Component />
            </Window>
        )
        })}

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