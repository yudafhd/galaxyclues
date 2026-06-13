import { useKeyboardControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import Dino from './Dino'
import MeteorField from './MeteorField'

type MovementControl = 'left' | 'right'

const velocity = new THREE.Vector3()
const direction = new THREE.Vector3()
const target = new THREE.Vector3()
const desiredCameraPosition = new THREE.Vector3()
const cameraOffset = new THREE.Vector3(-12, 6.5, 0)
const lookAheadOffset = new THREE.Vector3(4.5, 1.85, 0)

type PlayerControllerProps = {
  onCrash: () => void
  onMeteorPassed: () => void
}

export default function PlayerController({ onCrash, onMeteorPassed }: PlayerControllerProps) {
  const { camera } = useThree()
  const [, getKeys] = useKeyboardControls<MovementControl>()
  const playerRef = useRef<THREE.Group>(null)
  const dinoRef = useRef<THREE.Group>(null)
  const crashedRef = useRef(false)
  const crashTime = useRef(0)
  const initialised = useRef(false)

  useEffect(() => {
    if (!initialised.current) {
      camera.position.set(-12, 6.5, -6)
      initialised.current = true
    }
  }, [camera])

  useFrame((state, delta) => {
    const player = playerRef.current
    const dino = dinoRef.current

    if (!player || !dino) return

    const { left, right } = getKeys()
    const speed = 4.6
    const hover = Math.sin(state.clock.elapsedTime * 1.8)

    if (crashedRef.current) {
      crashTime.current += delta

      dino.position.y = Math.max(-3.8, 1.6 - crashTime.current * 3.4)
      dino.rotation.x += delta * 8.2
      dino.rotation.y += delta * 6.5
      dino.rotation.z += delta * 10
      dino.scale.setScalar(Math.max(0.08, 1 - crashTime.current * 0.62))
    } else {
      direction.set(0, 0, Number(right) - Number(left))

      if (direction.lengthSq() > 0) {
        direction.normalize()
        velocity.copy(direction).multiplyScalar(speed * delta)
        player.position.add(velocity)
      }

      dino.position.y = 1.6 + hover * 0.28
      dino.rotation.x = 0
      dino.rotation.y = 0
      dino.rotation.z = hover * 0.035
      dino.scale.setScalar(1)
    }

    target.copy(player.position).add(lookAheadOffset)
    desiredCameraPosition.copy(cameraOffset).applyAxisAngle(THREE.Object3D.DEFAULT_UP, player.rotation.y).add(player.position)

    camera.position.lerp(desiredCameraPosition, 1 - Math.exp(-4.5 * delta))
    camera.lookAt(target)
  })

  return (
    <>
      <group ref={playerRef} position={[0, 0, -6]}>
        <group ref={dinoRef}>
          <Dino />
        </group>
      </group>
      <MeteorField
        playerRef={playerRef}
        crashedRef={crashedRef}
        onPassed={onMeteorPassed}
        onHit={() => {
          if (crashedRef.current) return

          crashedRef.current = true
          onCrash()
        }}
      />
    </>
  )
}
