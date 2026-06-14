import AssetModel from './AssetModel'
import type { ThreeElements } from '@react-three/fiber'

type DinoProps = ThreeElements['group']

function ProceduralDino(props: DinoProps) {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.45, 1.1, 8, 18]} />
        <meshStandardMaterial color="#5dd45f" roughness={0.62} />
      </mesh>

      <mesh castShadow position={[0.72, 1.35, 0.02]}>
        <boxGeometry args={[0.9, 0.62, 0.62]} />
        <meshStandardMaterial color="#64df66" roughness={0.58} />
      </mesh>

      <mesh castShadow position={[1.12, 1.5, -0.2]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#111827" roughness={0.3} />
      </mesh>

      <mesh castShadow position={[-0.75, 1.08, 0]} rotation={[0, 0, -0.35]}>
        <coneGeometry args={[0.18, 1.15, 8]} />
        <meshStandardMaterial color="#50bf51" roughness={0.65} />
      </mesh>

      <mesh castShadow position={[-0.18, 0.03, -0.22]}>
        <boxGeometry args={[0.24, 0.72, 0.24]} />
        <meshStandardMaterial color="#3aa342" roughness={0.7} />
      </mesh>

      <mesh castShadow position={[0.34, 0.03, 0.22]}>
        <boxGeometry args={[0.24, 0.72, 0.24]} />
        <meshStandardMaterial color="#3aa342" roughness={0.7} />
      </mesh>

      <mesh castShadow position={[0.6, 0.85, -0.44]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.2, 0.58, 0.18]} />
        <meshStandardMaterial color="#4cbd4e" roughness={0.68} />
      </mesh>
    </group>
  )
}

export default function Dino(props: DinoProps) {
  return (
    <AssetModel
      src="/models/dino.glb"
      rotation={[0, Math.PI / 2, 0]}
      scale={1}
      {...props}
      fallback={<ProceduralDino scale={1.1} />}
    />
  )
}
