import AssetModel from './AssetModel'

function ProceduralArena() {
  return (
    <group position={[0, -1, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[28, 96]} />
        <meshStandardMaterial color="#293b47" roughness={0.88} metalness={0.05} />
      </mesh>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[7.5, 7.7, 96]} />
        <meshStandardMaterial color="#f4c542" roughness={0.55} emissive="#3f2800" />
      </mesh>

      {Array.from({ length: 20 }).map((_, index) => {
        const angle = (index / 20) * Math.PI * 2
        const x = Math.cos(angle) * 14
        const z = Math.sin(angle) * 14

        return (
          <mesh key={index} castShadow receiveShadow position={[x, 0.45, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.5, 0.9, 1.8]} />
            <meshStandardMaterial color={index % 2 ? '#64748b' : '#3f5f6e'} roughness={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Arena() {
  return <AssetModel src="/models/arena.glb" position={[0, -1, 0]} scale={1} fallback={<ProceduralArena />} />
}
