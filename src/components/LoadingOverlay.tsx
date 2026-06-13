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
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-mark" aria-hidden="true" />
      <div className="loading-title">Loading Assets</div>
      <div className="loading-progress">
        <div className="loading-progress-fill" style={{ width: `${total > 0 ? roundedProgress : 18}%` }} />
      </div>
      <div className="loading-detail">
        {total > 0 ? `${roundedProgress}%` : 'Preparing game'}
        {item ? ` - ${item.split('/').pop()}` : ''}
      </div>
    </div>
  )
}
