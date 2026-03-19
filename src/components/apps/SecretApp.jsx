import { useState, useEffect, useRef } from 'react'

const bootLines = [
  '> INITIALIZING DIVERGENCE METER...',
  '> READING WORLD LINE: 1.048596',
  '> HELLO, OKABE.',
  '>',
  '> This portfolio was crafted by',
  '> a self-proclaimed mad scientist.',
  '>',
  '> Ahron Mosqe Gabriel C. Javier',
  '> Frontend Developer · UI/UX · NCII',
  '> Philippines · Class of 2025',
  '>',
  '> "The universe has a beginning,',
  '>  but no end. — Infinite."',
  '>',
  '> El Psy Kongroo.',
  '>',
  '> ────────────────────────────',
  '> Type "help" for available commands.',
]

const commands = {
  help:   '> Commands: help · about · steins · stack · clear',
  about:  '> Ahron. Builds fast. Designs well. Drinks too much coffee.',
  steins: '> Steins;Gate is the greatest visual novel ever made. No debate.',
  stack:  '> React · Laravel · PostgreSQL · Python · Tailwind · GSAP',
}

export default function SecretApp() {
  const [displayed, setDisplayed] = useState([])
  const [input, setInput] = useState('')
  const [responses, setResponses] = useState([])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setDisplayed(d => [...d, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    inputRef.current?.focus()
  }, [displayed, responses])

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return
    const cmd = input.trim().toLowerCase()

    if (cmd === 'clear') {
      setDisplayed([])
      setResponses([])
      setInput('')
      return
    }

    const res = commands[cmd] ?? `> Unknown command: "${cmd}". Try "help".`
    setResponses(r => [...r, { cmd: '$ ' + input, res }])
    setInput('')
  }

  return (
    <div
      className="p-5 h-full flex flex-col font-mono text-xs leading-6 overflow-auto"
      style={{ background: '#0d0d0d', color: '#00ff88' }}
      onClick={() => inputRef.current?.focus()}
    >
      {displayed.map((line, i) => (
        <div key={i} style={{ color: line.includes('El Psy') ? '#60a5fa' : '#00ff88' }}>
          {line}
        </div>
      ))}

      {responses.map((r, i) => (
        <div key={i}>
          <div style={{ color: '#60a5fa' }}>{r.cmd}</div>
          <div style={{ color: '#00ff88' }}>{r.res}</div>
        </div>
      ))}

      <div className="flex items-center gap-2 mt-2">
        <span style={{ color: '#60a5fa' }}>$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none"
          style={{ color: '#00ff88', caretColor: '#00ff88' }}
          placeholder="type a command..."
        />
      </div>

      <div ref={bottomRef} />
    </div>
  )
}