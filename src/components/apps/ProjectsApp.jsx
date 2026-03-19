const projects = [
  {
    num: '01',
    title: 'ExerSearch',
    tags: ['React', 'Laravel', 'PostgreSQL', 'Python'],
    desc: 'A fitness platform that connects users to nearby gyms, personalized workout plans, and meal plans based on their preferences. Also gives small gym owners a space to get discovered online.',
    github: 'https://github.com/gabbby04/exersearch',
    live: 'https://exersearch.online',
  },
  {
    num: '02',
    title: 'Bilis Sagoot',
    tags: ['Python', 'Pygame'],
    desc: 'A Jeopardy-style quiz game built to gamify classroom learning. Supports up to 6 teams, live score tracking, a question timer, and dynamic question loading from CSV files.',
    github: 'https://github.com/gabbby04/Jeopardy',
    live: null,
  },
  {
    num: '03',
    title: 'Bermuda Frenzy',
    tags: ['Python', 'Pygame'],
    desc: 'A Feeding Frenzy-inspired survival game set underwater. Survive the Bermuda challenge by reaching 500 points while navigating an increasingly dangerous ocean.',
    github: 'https://github.com/Phayce04/Bermuda-Frenzy',
    live: null,
  },
]

export default function ProjectsApp() {
  return (
    <div className="p-4 space-y-3" style={{ background: 'var(--os-cream)' }}>
      {projects.map(p => (
        <div key={p.num}
          className="p-4 rounded-2xl border transition-all hover:shadow-md group"
          style={{ borderColor: 'var(--os-border)', background: 'white' }}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold shrink-0"
                style={{ fontFamily: 'Syne', color: 'rgba(30,27,46,0.08)' }}>
                {p.num}
              </span>
              <div>
                <div className="flex gap-1.5 mb-1 flex-wrap">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'var(--os-blue-light)', color: 'var(--os-blue)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="font-bold text-sm"
                  style={{ fontFamily: 'Syne', color: 'var(--os-dark)' }}>
                  {p.title}
                </div>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
              <a href={p.github} target="_blank" rel="noreferrer"
                className="text-xs px-2 py-1 rounded-lg font-mono transition-colors hover:opacity-80"
                style={{ background: 'var(--os-blue-light)', color: 'var(--os-blue)' }}>
                GitHub ↗
              </a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer"
                  className="text-xs px-2 py-1 rounded-lg font-mono hover:opacity-80"
                  style={{ background: 'rgba(30,27,46,0.07)', color: 'var(--os-dark)' }}>
                  Live ↗
                </a>
              )}
            </div>
          </div>
          <p className="text-xs leading-relaxed"
            style={{ color: 'var(--os-muted)', paddingLeft: '2.75rem' }}>
            {p.desc}
          </p>
        </div>
      ))}
    </div>
  )
}