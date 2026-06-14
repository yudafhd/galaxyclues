import { Move, RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { clearGestureInput, setGestureInput } from '../gestureInput'

type MobileGestureControlsProps = {
  isCrashed: boolean
  onRestart: () => void
}

const thumbLimit = 42

function getThumbOffsetClass({ x, y }: { x: number; y: number }) {
  const horizontal = x > 14 ? 'translate-x-8' : x < -14 ? '-translate-x-8' : 'translate-x-0'
  const vertical = y > 14 ? 'translate-y-8' : y < -14 ? '-translate-y-8' : 'translate-y-0'

  if (horizontal === 'translate-x-0' && vertical === 'translate-y-0') return 'translate-x-0 translate-y-0'
  if (horizontal === 'translate-x-8' && vertical === '-translate-y-8') return 'translate-x-8 -translate-y-8'
  if (horizontal === 'translate-x-8' && vertical === 'translate-y-8') return 'translate-x-8 translate-y-8'
  if (horizontal === '-translate-x-8' && vertical === '-translate-y-8') return '-translate-x-8 -translate-y-8'
  if (horizontal === '-translate-x-8' && vertical === 'translate-y-8') return '-translate-x-8 translate-y-8'

  return `${horizontal} ${vertical}`
}

export default function MobileGestureControls({ isCrashed, onRestart }: MobileGestureControlsProps) {
  const padRef = useRef<HTMLDivElement>(null)
  const activePointerId = useRef<number | null>(null)
  const [thumb, setThumb] = useState({ x: 0, y: 0 })

  const updateGesture = (clientX: number, clientY: number) => {
    const pad = padRef.current
    if (!pad) return

    const rect = pad.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rawX = clientX - centerX
    const rawY = clientY - centerY
    const distance = Math.hypot(rawX, rawY)
    const scale = distance > thumbLimit ? thumbLimit / distance : 1
    const x = rawX * scale
    const y = rawY * scale

    setThumb({ x, y })
    setGestureInput({
      horizontal: x / thumbLimit,
      vertical: -y / thumbLimit,
    })
  }

  const resetGesture = () => {
    activePointerId.current = null
    setThumb({ x: 0, y: 0 })
    clearGestureInput()
  }

  if (isCrashed) {
    return (
      <div className="fixed bottom-24 left-1/2 z-20 md:hidden -translate-x-1/2">
        <button className="btn btn-success gap-2 text-success-content shadow-xl" type="button" onClick={onRestart}>
          <RotateCcw aria-hidden="true" size={18} />
          <span>Mulai lagi</span>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-24 left-4 z-20 md:hidden">
      <div
        ref={padRef}
        className="relative grid h-32 w-32 touch-none place-items-center rounded-full border border-base-content/15 bg-base-100/35 shadow-2xl backdrop-blur"
        role="application"
        aria-label="Kontrol gesture"
        onPointerDown={(event) => {
          event.preventDefault()
          activePointerId.current = event.pointerId
          event.currentTarget.setPointerCapture(event.pointerId)
          updateGesture(event.clientX, event.clientY)
        }}
        onPointerMove={(event) => {
          if (activePointerId.current !== event.pointerId) return
          event.preventDefault()
          updateGesture(event.clientX, event.clientY)
        }}
        onPointerUp={(event) => {
          if (activePointerId.current !== event.pointerId) return
          event.preventDefault()
          resetGesture()
        }}
        onPointerCancel={resetGesture}
        onLostPointerCapture={resetGesture}
      >
        <div className="absolute h-20 w-20 rounded-full border border-base-content/10" />
        <div
          className={`grid h-14 w-14 place-items-center rounded-full bg-success text-success-content shadow-xl transition-transform ${getThumbOffsetClass(thumb)}`}
        >
          <Move aria-hidden="true" size={22} />
        </div>
      </div>
    </div>
  )
}
