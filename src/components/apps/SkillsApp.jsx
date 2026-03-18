import { Circle } from 'lucide-react'

const skills = {
  'Frontend': [
    'HTML', 'CSS', 'JavaScript',
    'React', 'React Router',
    'Tailwind CSS', 'SASS/SCSS',
    'GSAP',
  ],
  'Backend': [
    'Laravel', 'PHP',
    'Node.js',
    'MySQL', 'PostgreSQL',
    ],
  'Languages & Tools': [
  'Python', 'Java',
  'Git', 'Figma',
],
}

const colors = {
  'Frontend': { bg: '#dbeafe', text: '#1d4ed8' },
  'Backend':  { bg: '#fef3c7', text: '#92400e' },
  'Languages & Tools':{ bg: '#dcfce7', text: '#166534' },
}

export default function SkillsApp() {
  return (
    <div className="p-6 space-y-5" style={{ background: 'var(--os-cream)' }}>
      {Object.entries(skills).map(([cat, tags]) => (
        <div key={cat}>
          <div className="flex items-center gap-2 mb-2.5">
            <Circle size={6} fill={colors[cat].text} stroke="none" />
            <span className="text-xs font-mono tracking-widest"
              style={{ color: 'var(--os-muted)', fontSize: '0.6rem' }}>
              {cat.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105 cursor-default"
                style={{ background: colors[cat].bg, color: colors[cat].text }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="p-4 rounded-2xl border"
        style={{ borderColor: 'rgba(245,158,11,0.25)', background: 'rgba(254,243,199,0.4)' }}>
        <div className="text-xs font-mono mb-1 tracking-widest"
          style={{ color: '#b45309', fontSize: '0.6rem' }}>
          TESDA CERTIFICATION
        </div>
        <div className="text-sm font-bold" style={{ fontFamily: 'Syne', color: '#92400e' }}>
          NCII — Computer Systems Servicing
        </div>
        <div className="text-xs mt-0.5" style={{ color: '#b45309', fontFamily: 'DM Mono' }}>
          Network Administration · Hardware · Systems
        </div>
      </div>
    </div>
  )
}