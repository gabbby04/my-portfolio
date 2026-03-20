import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const formatted = time.toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  })


  const [timePart, ampm] = formatted.split(' ')
  const [hours, minutes, seconds] = timePart.split(':')

  return (
    <div className="absolute select-none" style={{ top: '12%', left: '3%' }}>
      <div
        className="px-5 py-4 rounded-2xl"
        style={{
          background: 'rgba(250,248,243,0.55)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(30,27,46,0.08)',
          boxShadow: '0 4px 20px rgba(30,27,46,0.06)',
        }}
      >
        <div className="flex items-end gap-1 leading-none">
          <span
            style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: '3rem',
                color: 'var(--os-dark)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
            }}
            >
            {hours}
            <span style={{ color: 'var(--os-blue)' }}>:</span>
            {minutes}
          </span>
          <div className="flex flex-col mb-1" style={{ gap: '2px' }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              color: 'var(--os-blue)',
              lineHeight: 1,
            }}>
              {ampm}
            </span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              color: 'var(--os-muted)',
              lineHeight: 1,
            }}>
              :{seconds}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}