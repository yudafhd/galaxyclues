import { useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function MeteorDinoBackground() {
  const texture = useTexture('/assets/meteor-dino-bg.png')

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
  }, [texture])

  return (
    <mesh position={[28, 2.35, -6]} rotation={[0, -Math.PI / 2, 0]} renderOrder={-10}>
      <planeGeometry args={[110, 61.96]} />
      <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  )
}
