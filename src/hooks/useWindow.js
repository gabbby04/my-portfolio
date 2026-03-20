import { useState, useCallback } from 'react'

export default function useWindow(initialState = {}) {
  const [windows, setWindows] = useState({
    hero:     { open: true,  minimized: false, zIndex: 10, x: 80,  y: 60  },
    skills:   { open: false, minimized: false, zIndex: 9,  x: 160, y: 100 },
    projects: { open: false, minimized: false, zIndex: 9,  x: 200, y: 80  },
    contact:  { open: false, minimized: false, zIndex: 9,  x: 120, y: 90  },
    secret:   { open: false, minimized: false, zIndex: 9,  x: 240, y: 120 },
    readme:   { open: false, minimized: false, zIndex: 9,  x: 180, y: 110 },
    photos:   { open: false, minimized: false, zIndex: 9,  x: 140, y: 90  },
  
  })

  const [topZ, setTopZ] = useState(20)

  const openWindow = useCallback((id) => {
    setTopZ(z => z + 1)
    setWindows(w => ({
      ...w,
      [id]: { ...w[id], open: true, minimized: false, zIndex: topZ + 1 }
    }))
  }, [topZ])

  const closeWindow = useCallback((id) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], open: false } }))
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], minimized: !w[id].minimized } }))
  }, [])

  const focusWindow = useCallback((id) => {
    setTopZ(z => z + 1)
    setWindows(w => ({ ...w, [id]: { ...w[id], zIndex: topZ + 1 } }))
  }, [topZ])

  const moveWindow = useCallback((id, x, y) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], x, y } }))
  }, [])

  return { windows, openWindow, closeWindow, minimizeWindow, focusWindow, moveWindow }
}