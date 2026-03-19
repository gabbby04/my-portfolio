import { useRef, useState } from 'react'

export default function Window({ id, title, icon, children, state, onClose, onMinimize, onFocus, onMove, width = 580, height = 440 }) {
  if (!state) return null
  const { open, minimized, zIndex, x, y } = state
  const dragRef = useRef(null)
  const posRef = useRef({ x, y })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const [size, setSize] = useState({ width, height })
  const [maximized, setMaximized] = useState(false)
  const prevSize = useRef({ width, height, x, y })

  if (!open) return null

  const startDrag = (e) => {
    if (e.target.closest('.win-controls')) return
    if (maximized) return
    dragging.current = true
    offset.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y }
    onFocus(id)

    const onMouseMove = (e) => {
      if (!dragging.current) return
      const nx = Math.max(0, e.clientX - offset.current.x)
      const ny = Math.max(32, e.clientY - offset.current.y)
      posRef.current = { x: nx, y: ny }
      dragRef.current.style.left = nx + 'px'
      dragRef.current.style.top = ny + 'px'
    }
    const onMouseUp = () => {
      dragging.current = false
      onMove(id, posRef.current.x, posRef.current.y)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const toggleMaximize = () => {
    if (!maximized) {
      prevSize.current = { width: size.width, height: size.height, x: posRef.current.x, y: posRef.current.y }
      setSize({ width: window.innerWidth, height: window.innerHeight - 32 })
      posRef.current = { x: 0, y: 32 }
      dragRef.current.style.left = '0px'
      dragRef.current.style.top = '32px'
    } else {
      setSize({ width: prevSize.current.width, height: prevSize.current.height })
      posRef.current = { x: prevSize.current.x, y: prevSize.current.y }
      dragRef.current.style.left = prevSize.current.x + 'px'
      dragRef.current.style.top = prevSize.current.y + 'px'
    }
    setMaximized(m => !m)
  }

  // Resize handler
  const startResize = (e) => {
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.width
    const startH = size.height

    const onMouseMove = (e) => {
      const newW = Math.max(320, startW + e.clientX - startX)
      const newH = Math.max(240, startH + e.clientY - startY)
      setSize({ width: newW, height: newH })
    }
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      ref={dragRef}
      className="absolute select-none"
      style={{
        left: x, top: y,
        width: maximized ? '100vw' : size.width,
        height: maximized ? 'calc(100vh - 32px)' : size.height,
        zIndex,
        borderRadius: maximized ? 0 : '16px',
        overflow: 'hidden',
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
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b select-none"
        style={{
          background: 'var(--os-cream)',
          borderColor: 'var(--os-border)',
          cursor: maximized ? 'default' : 'grab',
        }}
        onMouseDown={startDrag}
        onDoubleClick={toggleMaximize}
      >
       {/* Traffic lights */}
      <div className="win-controls flex gap-2 shrink-0">
        <button 
          onClick={() => onClose(id)}
          className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:brightness-90"
          style={{ background: '#ff5f57' }}
          title="Close"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1l6 6M7 1L1 7" stroke="#7a1a17" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          onClick={() => onMinimize(id)}
          className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:brightness-90"
          style={{ background: '#ffbd2e' }}
          title="Minimize"
        >
          <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
            <path d="M1 1h6" stroke="#7a5000" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          onClick={toggleMaximize}
          className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:brightness-90"
          style={{ background: '#28c840' }}
          title={maximized ? 'Restore' : 'Maximize'}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            {maximized
              ? <path d="M2 6L6 2M4 2h2v2M2 4H4v2" stroke="#0a4a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M1 3V1h2M5 1h2v2M7 5v2H5M3 7H1V5" stroke="#0a4a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
        </button>
      </div>
        {/* Title */}
        <span
          className="flex items-center gap-1.5 text-xs font-medium truncate"
          style={{ fontFamily: 'DM Mono', color: 'var(--os-muted)', letterSpacing: '0.05em' }}
        >
          {icon} {title}
        </span>
      </div>

      {/* Content */}
      <div
        className="overflow-auto"
        style={{ height: 'calc(100% - 44px)', userSelect: 'text' }}
      >
        {children}
      </div>

      {/* Resize handle */}
      {!maximized && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          style={{ zIndex: 10 }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10"
            style={{ position: 'absolute', bottom: '4px', right: '4px', opacity: 0.25 }}>
            <path d="M9 1L1 9M9 5L5 9M9 9" stroke="var(--os-dark)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}