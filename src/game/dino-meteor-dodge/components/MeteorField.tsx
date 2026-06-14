import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type MeteorFieldProps = {
  playerRef: RefObject<THREE.Group | null>
  crashedRef: RefObject<boolean>
  onHit: () => void
  onPassed: () => void
}

type MeteorState = {
  active: boolean
  speed: number
  radius: number
  spinX: number
  spinY: number
}

type MeteorMark = {
  position: [number, number, number]
  scale: [number, number, number]
  rotation: [number, number, number]
  color: string
}

const meteorCount = 9
const spawnX = 24
const despawnX = -16
const collisionRadius = 1.35
const rockColors = ['#6f6a60', '#8c8578', '#504f4b', '#9a9284', '#5c6267', '#7b756b']
const markColors = ['#2f3134', '#3f3b35', '#575149', '#1f252b']

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function MeteorField({ playerRef, crashedRef, onHit, onPassed }: MeteorFieldProps) {
  const meteorRefs = useRef<Array<THREE.Group | null>>([])
  const spawnTimer = useRef(0.35)
  const meteorStates = useRef<MeteorState[]>(
    Array.from({ length: meteorCount }, () => ({
      active: false,
      speed: 0,
      radius: 0,
      spinX: 0,
      spinY: 0,
    })),
  )

  const meteors = useMemo(
    () =>
      Array.from({ length: meteorCount }, (_, index) => {
        const marks: MeteorMark[] = Array.from({ length: 7 }, () => {
          const position = new THREE.Vector3(
            randomBetween(-1, 1),
            randomBetween(-1, 1),
            randomBetween(-1, 1),
          ).normalize()

          return {
            position: [position.x * 0.95, position.y * 0.95, position.z * 0.95],
            scale: [randomBetween(0.08, 0.18), randomBetween(0.04, 0.12), randomBetween(0.08, 0.22)],
            rotation: [randomBetween(0, Math.PI), randomBetween(0, Math.PI), randomBetween(0, Math.PI)],
            color: markColors[Math.floor(randomBetween(0, markColors.length))],
          }
        })

        return {
          id: index,
          color: rockColors[index % rockColors.length],
          marks,
        }
      }),
    [],
  )

  useFrame((_, delta) => {
    if (crashedRef.current) return

    const player = playerRef.current
    if (!player) return

    spawnTimer.current -= delta

    if (spawnTimer.current <= 0) {
      const nextIndex = meteorStates.current.findIndex((meteor) => !meteor.active)
      const meteor = nextIndex >= 0 ? meteorRefs.current[nextIndex] : null
      const state = nextIndex >= 0 ? meteorStates.current[nextIndex] : null

      if (meteor && state) {
        state.active = true
        state.speed = randomBetween(6.5, 10)
        state.radius = randomBetween(0.35, 1.35)
        state.spinX = randomBetween(1.8, 4.6)
        state.spinY = randomBetween(1.6, 4.2)

        meteor.visible = true
        meteor.scale.set(
          state.radius * randomBetween(0.75, 1.45),
          state.radius * randomBetween(0.65, 1.25),
          state.radius * randomBetween(0.75, 1.55),
        )
        meteor.position.set(
          player.position.x + spawnX,
          randomBetween(1.15, 2.55),
          player.position.z + randomBetween(-7.5, 7.5),
        )
        meteor.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      }

      spawnTimer.current = randomBetween(0.55, 1.2)
    }

    for (let index = 0; index < meteorCount; index += 1) {
      const meteor = meteorRefs.current[index]
      const state = meteorStates.current[index]

      if (!meteor || !state.active) continue

      meteor.position.x -= state.speed * delta
      meteor.rotation.x += state.spinX * delta
      meteor.rotation.y += state.spinY * delta

      const dx = meteor.position.x - player.position.x
      const dy = meteor.position.y - (player.position.y + 1.55)
      const dz = meteor.position.z - player.position.z
      const hitDistance = collisionRadius + state.radius

      if (dx * dx + dy * dy + dz * dz < hitDistance * hitDistance) {
        state.active = false
        meteor.visible = false
        onHit()
        return
      }

      if (meteor.position.x < player.position.x + despawnX) {
        state.active = false
        meteor.visible = false
        onPassed()
      }
    }
  })

  return (
    <group>
      {meteors.map((meteor) => (
        <group
          key={meteor.id}
          ref={(node) => {
            meteorRefs.current[meteor.id] = node
          }}
          visible={false}
        >
          <mesh castShadow>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={meteor.color} roughness={0.96} metalness={0.02} flatShading />
          </mesh>
          {meteor.marks.map((mark, markIndex) => (
            <mesh
              key={markIndex}
              castShadow
              position={mark.position}
              rotation={mark.rotation}
              scale={mark.scale}
            >
              <tetrahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={mark.color} roughness={1} flatShading />
            </mesh>
          ))}
          <pointLight color="#dbeafe" intensity={0.28} distance={3.5} />
        </group>
      ))}
    </group>
  )
}
