import { useState } from 'react'
import { Mail, Github, Linkedin } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    val: 'ahronjavier16@gmail.com',
    href: 'mailto:ahronjavier16@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    val: 'github.com/gabbby04',
    href: 'https://github.com/gabbby04',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    val: 'linkedin.com/in/ahron-javier',
    href: 'https://www.linkedin.com/in/ahron-javier-638082345/',
  },
]

export default function ContactApp() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="p-6" style={{ background: 'var(--os-cream)' }}>
      <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--os-muted)', maxWidth: '38ch' }}>
        Open to full-time roles, freelance, and collabs. Or just want to talk tech — I'm here.
      </p>

      <div className="flex flex-col gap-2 mb-5">
        {links.map(({ icon: Icon, label, val, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all hover:border-blue-300 hover:bg-blue-50 group"
            style={{ borderColor: 'var(--os-border)', background: 'white', textDecoration: 'none' }}>
            <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--os-blue)', flexShrink: 0 }} />
            <span className="text-xs font-mono font-medium w-16 shrink-0" style={{ color: 'var(--os-blue)' }}>
              {label}
            </span>
            <span className="text-xs transition-colors group-hover:text-blue-600"
              style={{ color: 'var(--os-muted)', fontFamily: 'DM Mono' }}>
              {val}
            </span>
          </a>
        ))}
      </div>

      {sent ? (
        <div className="p-4 rounded-2xl text-center text-sm font-semibold"
          style={{ background: '#dcfce7', color: '#166534' }}>
          Message sent! I'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required placeholder="Your name"
              className="px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-blue-400"
              style={{ borderColor: 'var(--os-border)', background: 'white', color: 'var(--os-dark)' }} />
            <input
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required type="email" placeholder="your@email.com"
              className="px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-blue-400"
              style={{ borderColor: 'var(--os-border)', background: 'white', color: 'var(--os-dark)' }} />
          </div>
          <textarea
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required rows={3} placeholder="Tell me about your project or just say hi."
            className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-blue-400 resize-none"
            style={{ borderColor: 'var(--os-border)', background: 'white', color: 'var(--os-dark)' }} />
          <button type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'var(--os-blue)', fontFamily: 'DM Mono' }}>
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}