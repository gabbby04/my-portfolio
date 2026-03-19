import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const dotsRef = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const dots = 12

  useEffect(() => {
    const positions = Array(dots).fill({ x: 0, y: 0 })

    const handleMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMove)

    let animId
    const animate = () => {
      positions[0] = { ...mousePos.current }
      for (let i = 1; i < dots; i++) {
        positions[i] = {
          x: positions[i].x + (positions[i - 1].x - positions[i].x) * 0.35,
          y: positions[i].y + (positions[i - 1].y - positions[i].y) * 0.35,
        }
      }
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        const scale = 1 - i / dots
        dot.style.left = positions[i].x - 4 * scale + 'px'
        dot.style.top  = positions[i].y - 4 * scale + 'px'
        dot.style.width  = 8 * scale + 'px'
        dot.style.height = 8 * scale + 'px'
        dot.style.opacity = (1 - i / dots) * 0.5
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {Array(dots).fill(null).map((_, i) => (
        <div
          key={i}
          ref={el => dotsRef.current[i] = el}
          className="fixed pointer-events-none z-50 rounded-full"
          style={{ background: '#2563eb', position: 'fixed' }}
        />
      ))}
    </>
  )
}