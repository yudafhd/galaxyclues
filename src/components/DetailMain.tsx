import { Gamepad2, Move, Play, Shield, Sparkles, Trophy } from 'lucide-react'
import { GameCover } from './GameCard'
import type { GameItem } from '../data/games'

type DetailMainProps = {
  game: GameItem
  onStartGame: () => void
}

const detailItems = [
  {
    icon: <Move aria-hidden="true" size={22} />,
    title: 'Kontrol',
    copy: 'W A S D atau tombol panah menggerakkan dino dalam batas arena.',
  },
  {
    icon: <Shield aria-hidden="true" size={22} />,
    title: 'Tujuan',
    copy: 'Hindari meteor yang datang dari depan. Tabrakan membuat dino jatuh.',
  },
  {
    icon: <Trophy aria-hidden="true" size={22} />,
    title: 'Skor',
    copy: 'Setiap meteor yang berhasil lewat menambah skor satu poin.',
  },
  {
    icon: <Sparkles aria-hidden="true" size={22} />,
    title: 'Mode',
    copy: 'Arcade 3D ringan untuk browser mobile dan desktop.',
  },
  {
    icon: <Gamepad2 aria-hidden="true" size={22} />,
    title: 'Mulai Ulang',
    copy: 'Tekan spasi setelah terkena meteor untuk mencoba lagi.',
  },
]

export default function DetailMain({ game, onStartGame }: DetailMainProps) {
  return (
    <main className="mx-auto grid w-full max-w-[1180px] flex-1 gap-4 px-4 py-5 md:px-6">
      <section className="grid gap-4 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1fr)]">
        <GameCover coverImage={game.coverImage} name={game.name} large />

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body justify-center">
            <p className="text-xs font-black uppercase text-success">Game detail</p>
            <h1 className="text-5xl font-black leading-none">{game.name}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-success font-black text-success-content">{game.type}</span>
              <span className="badge badge-ghost font-black">{game.category}</span>
              <span className="badge badge-ghost font-black">Rating {game.rating}</span>
            </div>
            <p className="text-base-content/55">/{game.code}</p>
            <button className="btn btn-success mt-4 gap-2 text-success-content" type="button" onClick={onStartGame}>
              <Play aria-hidden="true" size={20} fill="currentColor" />
              <span>Mulai</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {detailItems.map((item) => (
          <div key={item.title} className="card bg-base-200 shadow-xl">
            <div className="card-body gap-3 p-4">
              <span className="text-success">{item.icon}</span>
              <h2 className="font-black">{item.title}</h2>
              <p className="text-sm leading-relaxed text-base-content/70">{item.copy}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
