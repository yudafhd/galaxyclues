import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Stars } from '@react-three/drei'
import { UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoadingOverlay from './components/LoadingOverlay'
import PlayerController from './components/PlayerController'

const movementMap = [
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'up', keys: ['ArrowUp', 'KeyW'] },
  { name: 'down', keys: ['ArrowDown', 'KeyS'] },
]

export default function App() {
  const [isCrashed, setIsCrashed] = useState(false)
  const [restartKey, setRestartKey] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || !isCrashed) return

      event.preventDefault()
      setIsCrashed(false)
      setScore(0)
      setRestartKey((key) => key + 1)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCrashed])

  return (
    <KeyboardControls map={movementMap}>
      <main className="game-wrapper">
        <Canvas
          shadows
          gl={{ alpha: true }}
          camera={{
            position: [-12, 6.5, -6],
            fov: 58,
            near: 0.1,
            far: 1000,
          }}
        >
          <color attach="background" args={['#101622']} />
          <fog attach="fog" args={['#101622', 28, 80]} />

          <ambientLight intensity={0.65} />
          <directionalLight
            castShadow
            position={[8, 10, 5]}
            intensity={2.2}
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-8, 3, -8]} color="#6be7ff" intensity={2.4} />
          <Stars radius={80} depth={48} count={1200} factor={3} fade speed={0.45} />

          <PlayerController
            key={restartKey}
            onCrash={() => setIsCrashed(true)}
            onMeteorPassed={() => setScore((currentScore) => currentScore + 1)}
          />
        </Canvas>

        <div className="profile-panel">
          <UserCircle aria-hidden="true" size={28} strokeWidth={1.8} />
          <div>
            <div className="profile-name">Dino Pilot</div>
            <div className="profile-score">Score {score}</div>
          </div>
        </div>

        <div className="hint">
          {isCrashed
            ? 'Dino terkena meteor. Tekan spasi untuk mulai lagi.'
            : 'Gunakan W A S D atau tombol panah untuk menghindari meteor.'}
        </div>

        <LoadingOverlay />
      </main>
    </KeyboardControls>
  )
}
