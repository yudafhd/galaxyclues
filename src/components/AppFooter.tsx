import { Compass, Gamepad2, RadioTower, Users } from 'lucide-react'

export default function AppFooter() {
  return (
    <footer className="mx-auto grid w-full max-w-[1500px] gap-3 px-4 pb-6 md:px-6">
      <section className="grid gap-3 rounded-box border border-base-content/10 bg-base-200/35 p-3 text-xs font-semibold text-base-content/55 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <Gamepad2 aria-hidden="true" size={20} />, title: 'Indie Game', copy: 'Dibuat dengan cinta' },
          { icon: <RadioTower aria-hidden="true" size={20} />, title: 'Platform', copy: 'Web Browser' },
          { icon: <Compass aria-hidden="true" size={20} />, title: 'Genre', copy: 'Petualangan + Puzzle' },
          { icon: <Users aria-hidden="true" size={20} />, title: 'Usia', copy: '7+ Tahun' },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="text-base-content/70">{item.icon}</span>
            <span>
              <span className="block text-base-content/75">{item.title}</span>
              <span>{item.copy}</span>
            </span>
          </div>
        ))}
      </section>
    </footer>
  )
}
