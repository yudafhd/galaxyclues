import { ArrowLeft, Orbit, Rocket, Search } from 'lucide-react'

type AppHeaderProps = {
  mode: 'home' | 'detail'
  onHome: () => void
  onPrimaryAction?: () => void
}

export default function AppHeader({ mode, onHome, onPrimaryAction }: AppHeaderProps) {
  if (mode === 'detail') {
    return (
      <header className="navbar sticky top-0 z-30 min-h-20 gap-3 border-b border-base-content/10 bg-base-200/90 px-4 backdrop-blur md:px-6">
        <button className="btn btn-ghost gap-2" type="button" onClick={onHome}>
          <ArrowLeft aria-hidden="true" size={18} />
        </button>
        <label className="input input-bordered flex min-h-12 flex-1 items-center gap-3 border-0 bg-base-100/35 text-base-content/60">
          <Search aria-hidden="true" size={18} />
          <span>Dino Meteor</span>
        </label>
      </header>
    )
  }

  return (
    <header className="landing-header">
      <div className="landing-header-shell">
        <button className="landing-brand-button" type="button" onClick={onHome}>
          <Orbit aria-hidden="true" className="landing-brand-icon" size={42} strokeWidth={2.2} />
          {/* <span className="landing-brand-title">
            Galaxy <span className="text-success drop-shadow">Clues</span>
          </span> */}
        </button>

        <label className="landing-search input input-bordered">
          <Search aria-hidden="true" className="shrink-0" size={20} />
          <span className="truncate">Cari permainan atau genre</span>
        </label>

        <nav className="ml-auto hidden items-center gap-10 text-sm font-black text-base-content/75 lg:flex" aria-label="Landing navigation">
          <a className="hover:text-success" href="#mission">Mission</a>
          <a className="hover:text-success" href="#characters">Characters</a>
          <a className="hover:text-success" href="#features">Features</a>
        </nav>

        <button
          className="landing-play-button"
          type="button"
          onClick={onPrimaryAction}
        >
          <Rocket aria-hidden="true" size={18} />
          <span className="hidden sm:inline">Play Now</span>
        </button>
      </div>
    </header>
  )
}
