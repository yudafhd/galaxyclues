import { useGLTF } from '@react-three/drei'
import type { ReactNode } from 'react'
import { Suspense, useEffect, useState } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import type { Group } from 'three'

type AssetModelProps = Omit<ThreeElements['primitive'], 'object'> & {
  src: string
  fallback: ReactNode
}

function LoadedModel({ src, ...props }: Omit<AssetModelProps, 'fallback'>) {
  const { scene } = useGLTF(src) as { scene: Group }

  return <primitive object={scene} {...props} />
}

export default function AssetModel({ src, fallback, ...props }: AssetModelProps) {
  const [assetExists, setAssetExists] = useState<boolean | null>(null)

  useEffect(() => {
    let mounted = true

    fetch(src, { method: 'HEAD' })
      .then((response) => {
        const contentType = response.headers.get('content-type') ?? ''
        const isModelResponse = !contentType.includes('text/html')

        if (mounted) setAssetExists(response.ok && isModelResponse)
      })
      .catch(() => {
        if (mounted) setAssetExists(false)
      })

    return () => {
      mounted = false
    }
  }, [src])

  if (!assetExists) {
    return <>{fallback}</>
  }

  return (
    <Suspense fallback={fallback}>
      <LoadedModel src={src} {...props} />
    </Suspense>
  )
}
