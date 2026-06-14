import { ArrowLeft, Search } from 'lucide-react'

type AppHeaderProps = {
  mode: 'home' | 'detail'
  onHome: () => void
}

export default function AppHeader({ mode, onHome }: AppHeaderProps) {
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
    <header className="navbar sticky top-0 z-30 min-h-20 shrink-0 gap-4 border-b border-base-content/10 bg-base-200/90 px-4 backdrop-blur md:px-6">
      <button className="btn btn-ghost min-w-0 shrink-0 gap-3 px-1 text-2xl font-black normal-case" type="button" onClick={onHome}>
        <span className="grid h-11 w-11 shrink-0 place-items-center md:hidden text-2xl">GC</span>
        <span className="hidden max-w-[42vw] truncate sm:inline">Galaxy Clues</span>
      </button>

      <label className="input input-bordered flex min-h-12 min-w-0 flex-1 items-center gap-3 border-0 bg-base-100/35 text-base-content/60 md:max-w-3xl">
        <Search aria-hidden="true" className="shrink-0" size={20} />
        <span className="truncate">Cari permainan atau genre</span>
      </label>
    </header>
  )
}
