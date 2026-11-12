import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Marca / Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-amber-400 transition-colors">
            BARBEARIA <span className="text-amber-500">LUZ</span>
          </span>
        </Link>

        {/* Links de Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-neutral-300">
          <a href="#servicos" className="hover:text-amber-400 transition-colors">
            Serviços
          </a>
          <a href="#barbeiros" className="hover:text-amber-400 transition-colors">
            Barbeiros
          </a>
          <a href="#tatuagem" className="hover:text-amber-400 transition-colors">
            Tattoo Studio
          </a>
          <a href="#localizacao" className="hover:text-amber-400 transition-colors">
            Localização
          </a>
        </nav>

        {/* CTA Agendar */}
        <div className="flex items-center gap-3">
          <Link
            href="/agendar"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm shadow-amber-500/20"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Agendar</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
