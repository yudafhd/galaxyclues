import { Compass, PlayCircle, RadioTower, Shield, WifiOff } from 'lucide-react'
import { useState } from 'react'
import AppFooter from './AppFooter'
import { Image } from './ui'

type HomeMainProps = {
  onOpenStory: () => void
  showIntro: boolean
  onFinishIntro: () => void
}

const introPages = [
  {
    kicker: 'Tahun 2426',
    text: 'Empat ratus tahun dari sekarang, Bumi hampir tidak memiliki energi untuk menjalankan kehidupan.',
  },
  {
    kicker: 'Tahun 2436',
    text: 'Sepuluh tahun setelahnya, seribu orang diberangkatkan ke Mars dengan kapal induk raksasa untuk menjalankan misi besar pencarian energi.',
  },
  {
    kicker: 'Misi Energi Mars',
    text: 'Karena misi besar ini, Bumi sudah kehabisan energi dan hanya mengandalkan energi kiriman dari Mars untuk mencegah kepunahan.',
  },
  {
    kicker: 'Sinyal Terputus',
    text: 'Tapi tiba-tiba saja para Marsian, orang-orang yang lahir di Mars, kehilangan sinyal komunikasi ke Bumi. Pengiriman energi pun terhenti. Apa yang sebenarnya terjadi?',
  },
  {
    kicker: 'Galaxy Clues',
    text: 'Chapter 1.',
  },
]

export default function HomeMain({ onOpenStory, showIntro, onFinishIntro }: HomeMainProps) {
  const [introIndex, setIntroIndex] = useState(0)
  const introPage = introPages[introIndex]
  const isLastIntro = introIndex === introPages.length - 1

  if (showIntro) {
    return (
      <section className="intro-screen">
        <div className="intro-copy" key={introPage.kicker}>
          <p className="intro-kicker">{introPage.kicker}</p>
          <h1 className="intro-text">{introPage.text}</h1>
        </div>

        <div className="intro-actions">
          <button className="btn btn-ghost text-base-content/60" type="button" onClick={onFinishIntro}>
            Lewati
          </button>
          <button
            className="btn btn-success text-success-content"
            type="button"
            onClick={() => {
              if (isLastIntro) {
                onFinishIntro()
                return
              }

              setIntroIndex((current) => current + 1)
            }}
          >
            {isLastIntro ? 'Masuk' : 'Lanjut'}
          </button>
        </div>
      </section>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main className="landing-main mx-auto grid min-w-0 w-full max-w-[1500px] flex-1 content-start gap-5 px-4 py-6 md:px-6">
        <section className="landing-hero-grid">
          <div className="landing-hero-copy">
            <h1 className="landing-title">
              <span className="block text-base-content drop-shadow-2xl">Galaxy</span>
              <span className="block text-success drop-shadow-2xl">Clues</span>
            </h1>

            <p className="landing-copy">
              Dino dan hero berpetualang di Mars untuk mencari petunjuk, memulihkan sinyal yang hilang, dan menyelamatkan Bumi dari kegelapan kosmik.
            </p>

            <div className="landing-actions">
              <button className="btn btn-success gap-2 px-7 text-success-content shadow-lg shadow-success/25" type="button" onClick={onOpenStory}>
                <Compass aria-hidden="true" size={19} />
                <span>Mulai Misi</span>
              </button>
              <button className="btn btn-outline gap-2 border-base-content/15 bg-base-200/30" type="button" onClick={onOpenStory}>
                <PlayCircle aria-hidden="true" size={20} />
                <span>Lihat Trailer</span>
              </button>
            </div>

            <div id="features" className="landing-mini-grid">
              {[
                { icon: <WifiOff aria-hidden="true" size={24} />, title: 'Signal Lost', copy: 'Sinyal terputus di seluruh planet.' },
                { icon: <RadioTower aria-hidden="true" size={24} />, title: 'Find Clues', copy: 'Temukan petunjuk di Mars.' },
                { icon: <Shield aria-hidden="true" size={24} />, title: 'Save Earth', copy: 'Pulihkan koneksi dan selamatkan Bumi.' },
              ].map((item) => (
                <div key={item.title} className="landing-mini-card">
                  <div className="landing-mini-icon">{item.icon}</div>
                  <div className="min-w-0">
                    <h2 className="landing-mini-title">{item.title}</h2>
                    <p className="landing-mini-copy">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section id="mission" className="landing-mission-panel">
            <Image
              wrapperClassName="landing-mission-image border border-success/20 shadow-2xl"
              imageClassName="object-cover"
              src="/assets/background-hero-dino.png"
              alt="Galaxy Clues story brief"
              loading="eager"
            />
            <div className="landing-brief-card">
              <p className="text-sm font-black uppercase text-success">Story Brief</p>
              <p className="text-base font-bold leading-relaxed md:text-lg">
                Bumi kehilangan koneksi. Mars ikut gelap. Jejak sinyal terakhir mengarah ke sabuk meteor.
              </p>
            </div>
          </section>
        </section>

      </main>

      <AppFooter />
    </div>
  )
}
