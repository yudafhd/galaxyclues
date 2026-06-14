import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Lock, Star } from 'lucide-react'
import type { StoryItem } from '../data/stories'
import { Dino } from '../game/dino-meteor-dodge'
import { Image } from './ui'

type CardProps = {
  item: StoryItem
  onClick: () => void
}

export function CardCover({ coverImage, name, large = false }: { coverImage?: string; name: string; large?: boolean }) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-box bg-[radial-gradient(circle_at_74%_20%,rgba(82,223,85,0.38),transparent_18%),linear-gradient(135deg,#55315f_0%,#2e2138_48%,#181818_100%)]',
        large ? 'min-h-48 md:min-h-60' : 'aspect-video',
      ].join(' ')}
      aria-hidden="true"
    >
      {coverImage ? (
        <Image wrapperClassName="h-full w-full rounded-none" imageClassName="object-cover" src={coverImage} alt={name} />
      ) : (
        <>
          <div className="absolute inset-0">
            <Canvas
              gl={{ alpha: true }}
              camera={{
                position: [0.2, 1.4, 5.3],
                fov: 38,
                near: 0.1,
                far: 100,
              }}
            >
              <ambientLight intensity={1.35} />
              <directionalLight position={[3, 5, 4]} intensity={2.3} />
              <pointLight position={[-4, 2, 3]} color="#52df55" intensity={2} />
              <Stars radius={35} depth={20} count={180} factor={2} fade speed={0.2} />
              <group position={[-0.25, -1.05, 0]} rotation={[0.04, 0.78, -0.1]} scale={1.65}>
                <Dino />
              </group>
            </Canvas>
          </div>
          <div className="absolute left-[13%] top-[24%] h-4 w-5 rotate-12 rounded-[45%_55%_48%_52%] bg-[#8b8478]" />
          <div className="absolute right-[18%] top-[35%] h-9 w-12 rotate-12 rounded-[45%_55%_48%_52%] bg-[#8b8478]" />
          <div className="absolute bottom-[24%] right-[10%] h-5 w-7 -rotate-12 rounded-[45%_55%_48%_52%] bg-[#5e5a54]" />
        </>
      )}
    </div>
  )
}

export default function Card({ item, onClick }: CardProps) {
  const isPlayable = Boolean(item.gameCode)

  return (
    <button
      className="card h-auto overflow-hidden bg-base-200 text-left shadow-xl transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      type="button"
      onClick={onClick}
      disabled={!isPlayable}
    >
      <div className="relative">
        <span className={`badge absolute left-2 top-2 z-10 font-black ${isPlayable ? 'badge-success text-success-content' : 'badge-ghost'}`}>
          {item.type}
        </span>
        {!isPlayable && (
          <span className="badge badge-ghost absolute right-2 top-2 z-10 gap-1 font-black">
            <Lock aria-hidden="true" size={12} />
            Soon
          </span>
        )}
        <CardCover coverImage={item.coverImage} name={item.title} />
      </div>

      <div className="card-body gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-base font-black text-base-content">{item.title}</h2>
            <p className="text-sm font-semibold text-base-content/55">{item.category}</p>
          </div>
          <div className="badge badge-ghost shrink-0 gap-1 font-black">
            <Star aria-hidden="true" size={14} fill="currentColor" />
            {item.rating}
          </div>
        </div>
      </div>
    </button>
  )
}
