import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'

// ─── ADD YOUR AUDIO FILES HERE ──────────────────────────────────────
// Drop .mp3 files in public/music/ and update the tracks below
// Get free lo-fi tracks from pixabay.com/music (search "lofi")
const tracks = [
  { title: 'Lofi Track 1',  artist: 'Unknown Artist', src: '/music/track1.mp3' },
  { title: 'Lofi Track 2',  artist: 'Unknown Artist', src: '/music/track2.mp3' },
  { title: 'Lofi Track 3',  artist: 'Unknown Artist', src: '/music/track3.mp3' },
]
// ────────────────────────────────────────────────────────────────────

export default function MusicApp({ onTrackChange }) {
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying]       = useState(false)
  const [progress, setProgress]     = useState(0)
  const [volume, setVolume]         = useState(0.6)
  const audioRef = useRef(null)

  const track = tracks[trackIndex]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      playing ? audioRef.current.play() : audioRef.current.pause()
    }
    onTrackChange?.(playing ? track : null)
  }, [playing, trackIndex])

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setProgress((audio.currentTime / audio.duration) * 100 || 0)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio) return
    const pct = e.target.value / 100
    audio.currentTime = pct * audio.duration
    setProgress(e.target.value)
  }

  const next = () => setTrackIndex(i => (i + 1) % tracks.length)
  const prev = () => setTrackIndex(i => (i - 1 + tracks.length) % tracks.length)

  return (
    <div className="p-6 h-full flex flex-col justify-between" style={{ background: 'var(--os-cream)' }}>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={next}
      />

      {/* Album art placeholder */}
      <div
        className="w-full rounded-2xl mb-5 flex items-center justify-center"
        style={{
          height: '160px',
          background: 'linear-gradient(135deg, #dbeafe, #ede9fe)',
          border: '1px solid rgba(37,99,235,0.1)',
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'var(--os-blue)',
            animation: playing ? 'spin 4s linear infinite' : 'none',
          }}
        >
          <div className="w-4 h-4 rounded-full" style={{ background: 'var(--os-cream)' }} />
        </div>
      </div>

      {/* Track info */}
      <div className="mb-4">
        <div className="font-bold text-sm mb-0.5" style={{ fontFamily: 'Syne', color: 'var(--os-dark)' }}>
          {track.title}
        </div>
        <div style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: 'var(--os-muted)' }}>
          {track.artist}
        </div>
      </div>

      {/* Progress bar */}
      <input
        type="range"
        min="0" max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full mb-4"
        style={{ accentColor: 'var(--os-blue)', height: '3px' }}
      />

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev}
          className="p-2 rounded-xl transition-all hover:bg-blue-50"
          style={{ color: 'var(--os-muted)' }}>
          <SkipBack size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'var(--os-blue)', color: 'white' }}
        >
          {playing
            ? <Pause size={18} strokeWidth={1.5} />
            : <Play  size={18} strokeWidth={1.5} style={{ marginLeft: '2px' }} />
          }
        </button>
        <button onClick={next}
          className="p-2 rounded-xl transition-all hover:bg-blue-50"
          style={{ color: 'var(--os-muted)' }}>
          <SkipForward size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <Volume2 size={13} strokeWidth={1.5} style={{ color: 'var(--os-muted)' }} />
        <input
          type="range" min="0" max="1" step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="flex-1"
          style={{ accentColor: 'var(--os-blue)', height: '3px' }}
        />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
}