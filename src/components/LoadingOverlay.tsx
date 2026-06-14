import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function LoadingOverlay() {
  const { active, progress, total, item } = useProgress()
  const [isVisible, setIsVisible] = useState(true)
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)))

  useEffect(() => {
    if (active || (total > 0 && roundedProgress < 100)) {
      setIsVisible(true)
      return
    }

    const timeout = window.setTimeout(() => {
      setIsVisible(false)
    }, total > 0 ? 450 : 900)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [active, roundedProgress, total])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-base-300/95 px-6 text-base-content backdrop-blur" role="status" aria-live="polite">
      <div className="grid w-full max-w-xs justify-items-center gap-4">
        <span className="loading loading-spinner loading-lg text-success" aria-hidden="true" />
        <div className="text-base font-black">Loading Assets</div>
        <progress className="progress progress-success h-2 w-full" value={total > 0 ? roundedProgress : 18} max={100} />
        <div className="min-h-5 text-center text-xs font-semibold text-base-content/60">
          {total > 0 ? `${roundedProgress}%` : 'Preparing game'}
          {item ? ` - ${item.split('/').pop()}` : ''}
        </div>
      </div>
    </div>
  )
}
