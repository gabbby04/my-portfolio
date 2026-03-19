export default function ReadmeApp() {
  const content = [
    { type: 'heading',  text: 'AHRON_README.txt'                                          },
    { type: 'divider'                                                                      },
    { type: 'label',    text: '> WHO AM I'                                                },
    { type: 'body',     text: "I'm Ahron Mosqe Gabriel C. Javier — a 21-year-old Computer Science student from the Philippines graduating in 2026. I've been building interfaces since my first year, not because I had to, but because I genuinely fell in love with the craft of making things look and feel right."   },
    { type: 'spacer'                                                                       },
    { type: 'label',    text: '> HOW I GOT HERE'                                          },
    { type: 'body',     text: "It started with curiosity. I opened a browser DevTools one day and couldn't stop. HTML felt like drawing with code. CSS felt like art with rules. JavaScript felt like giving things a heartbeat. By the end of first year I knew — this is what I want to do."                          },
    { type: 'spacer'                                                                       },
    { type: 'label',    text: '> WHY FRONTEND'                                            },
    { type: 'body',     text: "Because it's the part people actually touch. Anyone can build something that works. I want to build something that feels good to use. The gap between functional and delightful — that's where I live."                                                                                   },
    { type: 'spacer'                                                                       },
    { type: 'label',    text: '> WHAT I\'M LOOKING FOR'                                   },
    { type: 'body',     text: "A team that cares about craft. A place where I can ship real things, grow fast, and work with people who sweat the details as much as I do. Open to full-time roles, freelance, and anything interesting."                                                                            },
    { type: 'spacer'                                                                       },
    { type: 'label',    text: '> FUN FACTS'                                               },
    { type: 'body',     text: "— Steins;Gate is the greatest story ever told. No debate.\n— I hold an NCII certification in Computer Systems Servicing.\n— I can go from Figma mockup to deployed site in a weekend.\n— El Psy Kongroo."                                                                           },
    { type: 'spacer'                                                                       },
    { type: 'divider'                                                                      },
    { type: 'muted',    text: 'EOF — thanks for reading.'                                 },
  ]

  return (
    <div
      className="p-6 h-full overflow-auto"
      style={{ background: '#0d0d0d', fontFamily: 'DM Mono' }}
    >
      {content.map((line, i) => {
        if (line.type === 'heading') return (
          <div key={i} className="text-sm font-bold mb-1" style={{ color: '#f0f0f0', fontSize: '0.8rem' }}>
            {line.text}
          </div>
        )
        if (line.type === 'divider') return (
          <div key={i} className="mb-3" style={{ color: '#333', fontSize: '0.7rem' }}>
            {'─'.repeat(44)}
          </div>
        )
        if (line.type === 'label') return (
          <div key={i} className="mt-4 mb-1" style={{ color: '#2563eb', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            {line.text}
          </div>
        )
        if (line.type === 'body') return (
          <div key={i} style={{ color: '#888', fontSize: '0.7rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {line.text}
          </div>
        )
        if (line.type === 'muted') return (
          <div key={i} className="mt-2" style={{ color: '#333', fontSize: '0.65rem' }}>
            {line.text}
          </div>
        )
        if (line.type === 'spacer') return <div key={i} className="h-1" />
        return null
      })}
    </div>
  )
}