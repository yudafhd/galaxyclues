import { BookOpen, ChevronLeft, ChevronRight, Compass, Play, Satellite, ShieldAlert, WifiOff } from 'lucide-react'
import { useState } from 'react'
import type { GameItem } from '../../../data/games'

type DinoMeteorStoryBookProps = {
  game: GameItem
  onStartGame: () => void
}

const storyPages = [
  {
    icon: <WifiOff aria-hidden="true" size={26} />,
    label: 'Lampir 01',
    title: 'Mars Terputus',
    body: 'Tiba-tiba saja Mars kehilangan koneksi dengan Bumi. Semua jalur komunikasi antarplanet menjadi sunyi, seolah ada sesuatu yang memutuskan napas jaringan utama.',
  },
  {
    icon: <Satellite aria-hidden="true" size={26} />,
    label: 'Lampir 02',
    title: 'Sinyal Gangguan',
    body: 'Ada sinyal gangguan sangat besar yang mengacaukan jalur sinyal menuju Bumi. Polanya tidak alami, berulang, dan bergerak dari area yang belum pernah dipetakan.',
  },
  {
    icon: <ShieldAlert aria-hidden="true" size={26} />,
    label: 'Lampir 03',
    title: 'Para Guardian Bergerak',
    body: 'Para Rulers dan Guardian terbaik Mars ditugaskan menuju titik koordinat jalur Bumi untuk memeriksa sumber gangguan. Namun saat mereka berangkat, perjalanan berubah menjadi rangkaian masalah yang tidak terduga.',
  },
  {
    icon: <Compass aria-hidden="true" size={26} />,
    label: 'Lampir 04',
    title: 'Misi Dino Meteor',
    body: 'Dalam game ini, dino harus melewati jalur meteor untuk mencapai koordinat gangguan sinyal. Hindari meteor, bertahan sejauh mungkin, dan kumpulkan skor dari setiap rintangan yang berhasil dilewati.',
  },
]

export default function DinoMeteorStoryBook({ game, onStartGame }: DinoMeteorStoryBookProps) {
  const [pageIndex, setPageIndex] = useState(0)
  const page = storyPages[pageIndex]
  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === storyPages.length - 1

  return (
    <main className="mx-auto grid w-full max-w-[1180px] flex-1 content-center gap-5 px-4 py-5 md:px-6">
      <section className="storybook-shell">
        <div className="storybook-cover">
          <div className="storybook-cover-orbit" aria-hidden="true" />
          <div className="storybook-cover-content">
            <div className="storybook-cover-mark">
              <BookOpen aria-hidden="true" size={28} />
            </div>
            <p className="storybook-eyebrow">Galaxy Clues Archive</p>
            <h1 className="storybook-cover-title">{game.name}</h1>
            <p className="storybook-cover-copy">Sebuah catatan awal dari misi penyelamatan jalur sinyal Bumi dan Mars.</p>
          </div>
        </div>

        <article className="storybook-page">
          <div className="storybook-page-head">
            <span className="storybook-page-icon">{page.icon}</span>
            <span className="storybook-page-label">{page.label}</span>
          </div>

          <div className="storybook-page-body">
            <h2>{page.title}</h2>
            <p>{page.body}</p>
          </div>

          <div className="storybook-progress" aria-label={`Halaman ${pageIndex + 1} dari ${storyPages.length}`}>
            {storyPages.map((item, index) => (
              <span key={item.label} className={index === pageIndex ? 'is-active' : ''} />
            ))}
          </div>

          <div className="storybook-actions">
            <button className="btn btn-outline gap-2 border-base-content/15 bg-base-200/30" type="button" disabled={isFirstPage} onClick={() => setPageIndex((current) => current - 1)}>
              <ChevronLeft aria-hidden="true" size={18} />
              <span>Sebelum</span>
            </button>

            {isLastPage ? (
              <button className="btn btn-success gap-2 text-success-content" type="button" onClick={onStartGame}>
                <Play aria-hidden="true" size={18} fill="currentColor" />
                <span>Mulai Game</span>
              </button>
            ) : (
              <button className="btn btn-success gap-2 text-success-content" type="button" onClick={() => setPageIndex((current) => current + 1)}>
                <span>Lanjut</span>
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            )}
          </div>
        </article>
      </section>
    </main>
  )
}
