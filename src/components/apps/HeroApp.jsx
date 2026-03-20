import { MapPin, CalendarDays, Award, Github, Download } from 'lucide-react'

export default function HeroApp() {
  return (
    <div className="h-full overflow-auto" style={{ background: 'var(--os-cream)' }}>

      {/* Top strip */}
      <div className="flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: 'var(--os-border)' }}>
        <div style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', color: 'var(--os-muted)', letterSpacing: '0.15em' }}>
          AHRON.ME — v1.0
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
          <span style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', color: 'var(--os-muted)' }}>
            OPEN TO WORK
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex" style={{ minHeight: 'calc(100% - 44px)' }}>

        {/* Left — photo column */}
        <div className="shrink-0 flex flex-col" style={{ width: '170px', borderRight: '1px solid var(--os-border)' }}>
          <img
            src="./mypic.png"
            alt="Ahron"
            className="w-full object-cover"
            style={{ height: '180px', borderBottom: '1px solid var(--os-border)' }}
          />
          {[
            { icon: MapPin,       text: 'Philippines'    },
            { icon: CalendarDays, text: 'CS · 2026'      },
            { icon: Award,        text: 'NCII Certified' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 px-4 py-3"
              style={{ borderBottom: '1px solid var(--os-border)' }}>
              <Icon size={12} strokeWidth={1.5} style={{ color: 'var(--os-blue)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', color: 'var(--os-muted)' }}>
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Right — info column */}
        <div className="flex-1 flex flex-col justify-between p-5">
          <div>
            {/* Name */}
            <h1 style={{
              fontFamily: 'Syne',
              fontWeight: 800,
              fontSize: '1.9rem',
              color: 'var(--os-dark)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '0.6rem',
            }}>
              Ahron<br />
              <span style={{ color: 'var(--os-blue)' }}>Gabriel</span><br />
              Javier
            </h1>

            {/* Role */}
            <div style={{
              fontFamily: 'DM Mono',
              fontSize: '0.62rem',
              color: 'var(--os-muted)',
              letterSpacing: '0.12em',
              marginBottom: '1.25rem',
              lineHeight: 1.8,
            }}>
              FRONTEND DEVELOPER · UI/UX DESIGNER
            </div>

            {/* Bio */}
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--os-muted)',
              lineHeight: 1.85,
              marginBottom: '1.25rem',
              maxWidth: '34ch',
            }}>
              4th year Computer Science student from the Philippines with a deep love for building interfaces that feel as good as they look. Frontend-first since day one, with enough backend experience to ship complete products end to end. I care about the details — every pixel, every transition, every interaction.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {['React', 'Tailwind CSS', 'GSAP', 'Laravel', 'Figma'].map(tag => (
                <span key={tag}
                  className="px-2.5 py-1 rounded-xl font-semibold"
                  style={{
                    background: 'var(--os-blue-light)',
                    color: 'var(--os-blue)',
                    fontSize: '0.62rem',
                    fontFamily: 'DM Mono',
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-2.5">
            <a href="https://github.com/gabbby04" target="_blank" rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: 'var(--os-blue)',
                fontFamily: 'DM Mono',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                textDecoration: 'none',
              }}>
              <Github size={13} strokeWidth={1.5} />
              GITHUB
            </a>
            <a href="/resume.pdf" download
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all hover:opacity-80"
              style={{
                background: 'rgba(30,27,46,0.06)',
                color: 'var(--os-dark)',
                fontFamily: 'DM Mono',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                border: '1px solid var(--os-border)',
                textDecoration: 'none',
              }}>
              <Download size={13} strokeWidth={1.5} />
              RESUME
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}