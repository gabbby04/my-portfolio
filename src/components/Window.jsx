import { useRef, useEffect } from 'react'

export default function Window({ id, title, icon, children, state, onClose, onMinimize, onFocus, onMove, width = 580, height = 440 }) {
  const { open, minimized, zIndex, x, y } = state
  const dragRef = useRef(null)
  const posRef = useRef({ x, y })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  useEffect(() => { posRef.current = { x, y } }, [x, y])

  if (!open) return null

  const startDrag = (e) => {
    if (e.target.closest('.win-controls')) return
    dragging.current = true
    offset.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y }
    onFocus(id)

    const onMove = (e) => {
      if (!dragging.current) return
      const nx = Math.max(0, e.clientX - offset.current.x)
      const ny = Math.max(0, e.clientY - offset.current.y)
      posRef.current = { x: nx, y: ny }
      dragRef.current.style.left = nx + 'px'
      dragRef.current.style.top = ny + 'px'
    }
    const onUp = () => {
      dragging.current = false
      onMove({ x: posRef.current.x, y: posRef.current.y })
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div
      ref={dragRef}
      className="absolute rounded-2xl overflow-hidden select-none"
      style={{
        left: x, top: y, width, zIndex,
        boxShadow: 'var(--os-window-shadow)',
        background: 'var(--os-window-bg)',
        border: '1px solid var(--os-border)',
        transition: minimized ? 'transform 0.3s ease, opacity 0.3s ease' : 'none',
        transform: minimized ? 'scale(0.85) translateY(20px)' : 'scale(1)',
        opacity: minimized ? 0 : 1,
        pointerEvents: minimized ? 'none' : 'all',
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* title */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b cursor-grab active:cursor-grabbing"
        style={{ background: 'var(--os-cream)', borderColor: 'var(--os-border)' }}
        onMouseDown={startDrag}
      >
        <div className="win-controls flex gap-2">
          <button onClick={() => onClose(id)}
            className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
          <button onClick={() => onMinimize(id)}
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-400 opacity-40 cursor-not-allowed" />
        </div>
        <span className="text-xs font-medium flex items-center gap-1.5" style={{ fontFamily: 'DM Mono', color: 'var(--os-muted)', letterSpacing: '0.05em' }}>
          {icon} {title}
        </span>
      </div>

      {/* start content */}
      <div className="overflow-auto" style={{ height: height - 44, userSelect: 'text' }}>
        {children}
      </div>
    </div>
  )
}