import { useEffect, useState } from 'react'
import { User, Zap, FolderOpen, Mail, Terminal, FileText, Image, Music } from 'lucide-react'

const apps = [
  { id: 'hero',     icon: User,      label: 'About Me'   },
  { id: 'skills',   icon: Zap,       label: 'Skills'     },
  { id: 'projects', icon: FolderOpen,label: 'Projects'   },
  { id: 'contact',  icon: Mail,      label: 'Contact'    },
  { id: 'readme',   icon: FileText,  label: 'README.txt' },
  { id: 'photos',   icon: Image,     label: 'Gallery'    },
  { id: 'music',    icon: Music,     label: 'Lo-fi'      },
  { id: 'secret',   icon: Terminal,  label: '???'        },
]

export default function Taskbar({ windows, onOpen }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-PH', {
        hour: '2-digit', minute: '2-digit', hour12: true,
        timeZone: 'Asia/Manila'
      }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-4 py-2.5 rounded-2xl"
      style={{
        background: 'rgba(250,248,243,0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(30,27,46,0.1)',
        boxShadow: '0 8px 32px rgba(30,27,46,0.12)',
      }}>
      {apps.map(({ id, icon: Icon, label }) => (
        <button key={id} onClick={() => onOpen(id)}
          title={label}
          className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all hover:scale-110 active:scale-95 group"
          style={{
            background: windows[id]?.open && !windows[id]?.minimized
              ? 'var(--os-blue-light)' : 'transparent'
          }}>
          <Icon size={18} strokeWidth={1.5}
            style={{
              color: windows[id]?.open && !windows[id]?.minimized
                ? 'var(--os-blue)' : 'var(--os-muted)'
            }} />
          <span className="absolute -top-8 bg-gray-900 text-white px-2 py-0.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ fontSize: '0.6rem', fontFamily: 'DM Mono' }}>
            {label}
          </span>
          {windows[id]?.open && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full"
              style={{ background: 'var(--os-blue)' }} />
          )}
        </button>
      ))}

      
    </div>
  )
}