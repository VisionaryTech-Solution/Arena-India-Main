import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const SPORT_IMAGES = {
  cricket:        '/sports/cricket.jpg',
  football:       '/sports/football.jpg',
  basketball:     '/sports/basketball.jpg',
  volleyball:     '/sports/volleyball.jpg',
  tennis:         '/sports/tennis.jpg',
  badminton:      '/sports/badminton.jpg',
  hockey:         '/sports/hockey.jpg',
  kabaddi:        '/sports/kabaddi.jpg',
  running:        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
  athletics:      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  swimming:       'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80',
  boxing:         'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80',
  gymnastics:     'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80',
  'table tennis': 'https://images.unsplash.com/photo-1611251135345-18c56206b863?w=800&q=80',
}
const FALLBACK = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80'

function getSportImage(sport) {
  return SPORT_IMAGES[sport?.toLowerCase().trim()] || FALLBACK
}

const AUTOPLAY = 3000
const CARD_W   = 260
const CARD_H   = 360

// slot offset → visual style
const SLOT_STYLE = {
  '-2': { x: -580, rotateY:  42, scale: 0.62, opacity: 0.35, z: 1 },
  '-1': { x: -270, rotateY:  22, scale: 0.80, opacity: 0.65, z: 2 },
   '0': { x:    0, rotateY:   0, scale: 1.00, opacity: 1.00, z: 3 },
   '1': { x:  270, rotateY: -22, scale: 0.80, opacity: 0.65, z: 2 },
   '2': { x:  580, rotateY: -42, scale: 0.62, opacity: 0.35, z: 1 },
}

// off-screen slots for cards entering/leaving
const OFF_LEFT  = { x: -900, rotateY:  60, scale: 0.5, opacity: 0, z: 0 }
const OFF_RIGHT = { x:  900, rotateY: -60, scale: 0.5, opacity: 0, z: 0 }

function getSlot(eventIndex, activeIndex, total) {
  let offset = eventIndex - activeIndex
  // wrap around
  if (offset > total / 2)  offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

function Arrow({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-gray-200 bg-white text-[#1A1A1A] shadow-sm hover:border-red-600 hover:bg-red-600 hover:text-white"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )
}

export default function EventCarousel({ events = [] }) {
  const total    = events.length
  const [index,  setIndex] = useState(0)
  const timerRef = useRef(null)
  const paused   = useRef(false)
  const touchX   = useRef(null)
  const dir      = useRef(1)

  const maxIndex = total - 1

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!paused.current) {
        dir.current = 1
        setIndex((i) => (i >= maxIndex ? 0 : i + 1))
      }
    }, AUTOPLAY)
  }, [maxIndex])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const go   = (n) => { dir.current = n >= index ? 1 : -1; setIndex(Math.max(0, Math.min(maxIndex, n))); startTimer() }
  const next = () => { dir.current = 1;  setIndex((i) => (i >= maxIndex ? 0 : i + 1)); startTimer() }
  const prev = () => { dir.current = -1; setIndex((i) => (i <= 0 ? maxIndex : i - 1)); startTimer() }

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const dx = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) { dx > 0 ? next() : prev() }
    touchX.current = null
  }

  if (!total) return null

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 3D arc stage */}
      <div style={{ height: 400, perspective: '1000px', position: 'relative', overflow: 'hidden' }}>
        {events.map((event) => {
          const img    = getSportImage(event.sport)
          const offset = getSlot(events.indexOf(event), index, total)
          const style  = SLOT_STYLE[String(offset)] ?? (dir.current > 0 ? OFF_RIGHT : OFF_LEFT)

          return (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              onClick={(e) => { e.preventDefault(); go(events.indexOf(event)); paused.current = true }}
              style={{
                position:     'absolute',
                top:          '50%',
                left:         '50%',
                width:        CARD_W,
                height:       CARD_H,
                marginTop:    -(CARD_H / 2),
                marginLeft:   -(CARD_W / 2),
                transform:    `translateX(${style.x}px) rotateY(${style.rotateY}deg) scale(${style.scale})`,
                opacity:      style.opacity,
                zIndex:       style.z,
                transition:   'transform 600ms cubic-bezier(0.4,0,0.2,1), opacity 600ms ease',
                borderRadius: 16,
                overflow:     'hidden',
                cursor:       'pointer',
              }}
              aria-label={event.event_name}
            >
              <img src={img} alt={event.sport} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-block rounded bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  {event.sport}
                </span>
                <h3 className="mt-2 line-clamp-2 font-display text-sm font-bold leading-snug text-white">
                  {event.event_name}
                </h3>
                <p className="mt-1 text-[11px] text-white/70">
                  📍 {event.city}{event.state ? `, ${event.state}` : ''}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex w-16 shrink-0 items-center gap-2">
          <span className="font-display text-sm font-bold text-red-600">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-400">{String(total).padStart(2, '0')}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5" style={{ minWidth: total * 14 }}>
          {events.map((_, i) => (
            <button key={i} type="button" aria-label={`Go to slide ${i + 1}`}
              onClick={() => { paused.current = true; go(i) }}
              style={{ width: i === index ? 24 : 6, transition: 'width 300ms ease, background-color 300ms ease' }}
              className={`h-1.5 shrink-0 rounded-full ${i === index ? 'bg-red-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
        <div className="flex w-24 shrink-0 justify-end gap-2">
          <Arrow direction="prev" onClick={() => { paused.current = true; prev() }} />
          <Arrow direction="next" onClick={() => { paused.current = true; next() }} />
        </div>
      </div>
    </div>
  )
}
