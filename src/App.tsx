import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Stars } from '@react-three/drei'
import { ArrowLeft, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import DetailMain from './components/DetailMain'
import HomeMain from './components/HomeMain'
import LoadingOverlay from './components/LoadingOverlay'
import { getGameByCode } from './data/games'
import { clearGestureInput, MeteorDinoBackground, MobileGestureControls, PlayerController } from './game/dino-meteor-dodge'

const defaultGameCode = 'dino-meteor-dodge'
const gameBasePath = '/game/'

const movementMap = [
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'up', keys: ['ArrowUp', 'KeyW'] },
  { name: 'down', keys: ['ArrowDown', 'KeyS'] },
]

type Screen = 'home' | 'detail' | 'playing'

function getScreenFromPath(): Screen {
  if (window.location.pathname.startsWith(gameBasePath)) return 'detail'

  return 'home'
}

function getGameCodeFromPath() {
  if (!window.location.pathname.startsWith(gameBasePath)) return defaultGameCode

  return window.location.pathname.slice(gameBasePath.length) || defaultGameCode
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(() => getScreenFromPath())
  const [selectedGameCode, setSelectedGameCode] = useState(() => getGameCodeFromPath())
  const [isCrashed, setIsCrashed] = useState(false)
  const [restartKey, setRestartKey] = useState(0)
  const [score, setScore] = useState(0)
  const selectedGame = getGameByCode(selectedGameCode)

  const restartGame = () => {
    clearGestureInput()
    setIsCrashed(false)
    setScore(0)
    setRestartKey((key) => key + 1)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (screen !== 'playing' || event.code !== 'Space' || !isCrashed) return

      event.preventDefault()
      restartGame()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCrashed, screen])

  useEffect(() => {
    const handlePopState = () => {
      setScreen(getScreenFromPath())
      setSelectedGameCode(getGameCodeFromPath())
      setIsCrashed(false)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const goHome = () => {
    clearGestureInput()
    window.history.pushState(null, '', '/')
    setScreen('home')
    setIsCrashed(false)
  }

  const openGameDetail = (code: string) => {
    clearGestureInput()
    window.history.pushState(null, '', `${gameBasePath}${code}`)
    setSelectedGameCode(code)
    setScreen('detail')
    setIsCrashed(false)
  }

  const startGame = () => {
    restartGame()
    setScreen('playing')
  }

  const backToDetail = () => {
    clearGestureInput()
    setIsCrashed(false)
    setScreen('detail')
  }

  return (
    <KeyboardControls map={movementMap}>
      <main className="relative h-dvh w-full overflow-hidden bg-[#262625] text-base-content" data-theme="dark">
        {screen === 'playing' && (
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
            <color attach="background" args={['#11151c']} />
            <fog attach="fog" args={['#11151c', 36, 90]} />

            <ambientLight intensity={0.65} />
            <directionalLight
              castShadow
              position={[8, 10, 5]}
              intensity={2.2}
              shadow-mapSize={[2048, 2048]}
            />
            <pointLight position={[-8, 3, -8]} color="#52df55" intensity={2.4} />
            <Stars radius={80} depth={48} count={450} factor={2.2} fade speed={0.35} />
            <MeteorDinoBackground />

            <PlayerController
              key={restartKey}
              onCrash={() => setIsCrashed(true)}
              onMeteorPassed={() => setScore((currentScore) => currentScore + 1)}
            />
          </Canvas>
        )}

        {screen === 'home' && (
          <section className="flex h-full flex-col overflow-y-auto bg-[linear-gradient(135deg,#30342d_0%,#2d2a2a_44%,#242423_100%)] text-base-content">
            <AppHeader mode="home" onHome={goHome} />
            <HomeMain onOpenGameDetail={openGameDetail} />
          </section>
        )}

        {screen === 'detail' && (
          <section className="flex h-full flex-col overflow-y-auto bg-[linear-gradient(135deg,#30342d_0%,#2d2a2a_44%,#242423_100%)] text-base-content">
            <AppHeader mode="detail" onHome={goHome} />
            <DetailMain game={selectedGame} onStartGame={startGame} />
            <AppFooter />
          </section>
        )}

        {screen === 'playing' && (
          <div className="card card-compact fixed left-4 top-4 z-10 bg-base-100/70 shadow-xl backdrop-blur">
            <div className="card-body flex-row items-center gap-3">
              <Trophy aria-hidden="true" className="text-success" size={24} strokeWidth={1.9} />
              <div>
                <div className="text-[11px] font-black uppercase text-base-content/60">Score</div>
                <div className="text-lg font-black leading-none">{score}</div>
              </div>
            </div>
          </div>
        )}

        {screen === 'playing' && (
          <button className="btn btn-circle fixed right-4 top-4 z-10 bg-base-100/70 shadow-xl backdrop-blur md:hidden" type="button" aria-label="Kembali ke detail game" onClick={backToDetail}>
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
        )}

        {screen === 'playing' && (
          <div className="fixed bottom-4 left-1/2 z-10 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 rounded-box bg-base-100/70 px-4 py-3 text-center text-sm shadow-xl backdrop-blur">
            {isCrashed
              ? 'Dino terkena meteor. Tekan spasi atau tombol mulai lagi.'
              : 'Gunakan W A S D, tombol panah, atau gesture untuk menghindari meteor.'}
          </div>
        )}

        {screen === 'playing' && <MobileGestureControls isCrashed={isCrashed} onRestart={restartGame} />}

        {screen === 'playing' && <LoadingOverlay />}
      </main>
    </KeyboardControls>
  )
}
