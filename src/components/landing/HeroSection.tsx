import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-20 md:py-32 border-b border-neutral-900">
      {/* Background glow decorativo âmbar/dourado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badges de autoridade */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm">
            <svg
              className="w-4 h-4 text-amber-400 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.9 estrelas no Google</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>+160 avaliações reais</span>
          </div>
        </div>

        {/* Headline de destaque */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Tradição, estilo e precisão em{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            Nova Iguaçu
          </span>
        </h1>

        {/* Subtítulo descritivo */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          Viva a experiência completa de autocuidado masculino. Cortes clássicos e modernos, barboterapia relaxante, chopp gelado e um estúdio de tatuagem exclusivo sob o mesmo teto.
        </p>

        {/* Chamadas para ação (CTAs) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/agendar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-base transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg
              className="w-5 h-5"
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
            Agendar Horário
          </Link>

          <a
            href="https://wa.me/5521999990001?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Barbearia%20Luz."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-base border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 2.22.723 4.27 1.95 5.945L2 22l4.172-1.914c1.61.94 3.484 1.484 5.859 1.484 5.531 0 10.031-4.5 10.031-10.031C22.062 6.5 17.562 2 12.031 2zm0 18.062c-1.922 0-3.664-.531-5.188-1.469l-.375-.227-2.734 1.25.75-2.656-.242-.391a8.12 8.12 0 01-1.242-4.569c0-4.47 3.633-8.102 8.102-8.102 4.469 0 8.102 3.633 8.102 8.102 0 4.47-3.633 8.055-8.172 8.055z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
