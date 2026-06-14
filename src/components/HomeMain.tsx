import AppFooter from './AppFooter'
import GameCard from './GameCard'
import { games } from '../data/games'

type HomeMainProps = {
  onOpenGameDetail: (code: string) => void
}

export default function HomeMain({ onOpenGameDetail }: HomeMainProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main className="mx-auto grid w-full max-w-[1500px] flex-1 content-start gap-7 px-4 py-5 md:px-6">
        <section className="grid content-start gap-3" aria-label="Game yang Direkomendasikan">
          <div className="grid content-start items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" aria-label="Daftar game">
            {games.map((game) => (
              <GameCard key={game.code} game={game} onClick={() => onOpenGameDetail(game.code)} />
            ))}
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
