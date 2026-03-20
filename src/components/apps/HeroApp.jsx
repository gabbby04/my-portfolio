import { MapPin, CalendarDays, Award } from 'lucide-react'

export default function HeroApp() {
  return (
    <div className="p-8 h-full flex flex-col justify-between" style={{ background: 'var(--os-cream)' }}>
      <div>
        <div className="flex items-start gap-4 mb-6">
            <img
              src="./mypic.png"
              className="w-28 h-28 rounded-2xl object-cover shrink-0"
              alt="Ahron"
            />
          <div>
            <div className="text-xs font-mono mb-1.5 tracking-widest"
              style={{ color: 'var(--os-blue)', fontSize: '0.6rem' }}>
              FRONTEND DEVELOPER · UI/UX
            </div>
            <h1 className="text-2xl font-bold leading-tight"
            style={{ fontFamily: 'Syne', color: 'var(--os-dark)', letterSpacing: '-0.02em' }}>
            Ahron Mosqe Gabriel<br />C. Javier
            </h1>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--os-muted)', maxWidth: '42ch' }}>
          4th year Computer Science student from the Philippines with a deep love for
          building interfaces that feel as good as they look. Frontend-first since day one,
          with enough backend experience to ship complete products end to end.
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {[
            { icon: MapPin,       text: 'Philippines'                        },
            { icon: CalendarDays, text: 'BS Computer Science · Class of 2026' },
            { icon: Award,        text: 'NCII — Computer Systems Servicing'   },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={13} strokeWidth={1.5} style={{ color: 'var(--os-blue)' }} />
              <span className="text-xs" style={{ color: 'var(--os-muted)', fontFamily: 'DM Mono' }}>
                {text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {['React', 'Tailwind CSS', 'GSAP', 'Laravel', 'Figma'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'var(--os-blue-light)', color: 'var(--os-blue)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <a href="https://github.com/gabbby04" target="_blank" rel="noreferrer"
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'var(--os-blue)', fontFamily: 'DM Mono', fontSize: '0.75rem' }}>
          View Github
        </a>
        <a href="resume.pdf" download
          className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{ background: 'rgba(30,27,46,0.07)', color: 'var(--os-dark)', fontFamily: 'DM Mono', fontSize: '0.75rem' }}>
          Resume
        </a>
      </div>
    </div>
  )
}