import { useState } from 'react'

const photos = [
  { src: 'pic (1).jpg', caption: 'test' },
  { src: 'pic (2).jpg', caption: 'Replace with your caption' },
  { src: 'pic (3).jpg', caption: 'Replace with your caption' },

]
// ────────────────────────────────────────────────────────────────────

export default function PhotosApp() {
  const [active, setActive] = useState(null)

  return (
    <div className="p-4 h-full overflow-auto" style={{ background: 'var(--os-cream)' }}>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl cursor-pointer group"
            style={{ aspectRatio: '1', background: 'var(--os-blue-light)' }}
            onClick={() => setActive(photo)}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to top, rgba(30,27,46,0.6), transparent)' }}
            >
              <span style={{ color: 'white', fontSize: '0.6rem', fontFamily: 'DM Mono' }}>
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setActive(null)}
        >
          <div className="relative max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.caption}
              className="w-full rounded-2xl object-cover"
              style={{ maxHeight: '70vh' }}
            />
            <div
              className="mt-3 text-center"
              style={{ color: '#aaa', fontFamily: 'DM Mono', fontSize: '0.7rem' }}
            >
              {active.caption}
            </div>
            <button
              onClick={() => setActive(null)}
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-opacity hover:opacity-80"
              style={{ background: 'var(--os-blue)', color: 'white', fontFamily: 'DM Mono' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}