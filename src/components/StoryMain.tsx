import Card from './Card'
import AppFooter from './AppFooter'
import { stories } from '../data/stories'

type StoryMainProps = {
  onOpenGameDetail: (code: string) => void
}

export default function StoryMain({ onOpenGameDetail }: StoryMainProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main className="mx-auto grid w-full max-w-[1500px] flex-1 content-start gap-5 px-4 py-5 md:px-6">
        <section className="grid gap-2">
          <p className="text-xs font-black uppercase text-success">Story Path</p>
          <h1 className="text-4xl font-black leading-none text-base-content md:text-5xl">Save Earth Missions</h1>
          <p className="max-w-2xl text-sm font-semibold text-base-content/60">
            Ikuti petunjuk dari Bumi ke Mars. Card pertama membuka game Dino Meteor yang sedang aktif.
          </p>
        </section>

        <section className="grid content-start gap-3" aria-label="Daftar story Galaxy Clues">
          <div className="grid content-start items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {stories.map((story) => (
              <Card
                key={story.code}
                item={story}
                onClick={() => {
                  if (story.gameCode) onOpenGameDetail(story.gameCode)
                }}
              />
            ))}
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
