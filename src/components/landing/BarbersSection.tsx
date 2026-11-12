import Link from 'next/link';
import { BARBERS } from '@/data/barbers';

export function BarbersSection() {
  return (
    <section id="barbeiros" className="py-20 sm:py-28 bg-neutral-900/40 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            Equipe Especializada
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Nossos Profissionais
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            Mestres que dominam do degradê clássico à barboterapia com ozônio, com atendimento exclusivo.
          </p>
        </div>

        {/* Grade de 4 Barbeiros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 group"
            >
              <div>
                {/* Avatar / Monograma com aro dourado */}
                <div className="relative flex items-center justify-center mx-auto w-24 h-24 rounded-full bg-neutral-950 border-2 border-amber-500/40 group-hover:border-amber-500 shadow-inner mb-5 transition-colors">
                  <span className="text-2xl font-black text-amber-400 tracking-wider">
                    {barber.initials}
                  </span>
                  {barber.isOwner && (
                    <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider shadow">
                      Admin
                    </span>
                  )}
                </div>

                <div className="text-center mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {barber.nickname}
                  </h3>
                  <span className="text-xs text-neutral-400 font-medium">{barber.name}</span>
                </div>

                <p className="text-xs text-neutral-400 text-center leading-relaxed mb-4 font-light">
                  {barber.bio}
                </p>

                {/* Tags de Especialidade */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                  {barber.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-800/90 text-amber-300/90 border border-neutral-700/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botão de Agendamento com o barbeiro */}
              <Link
                href={`/agendar?barbeiro=${encodeURIComponent(barber.slug)}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 text-neutral-200 hover:text-neutral-950 text-xs sm:text-sm font-bold border border-neutral-700 hover:border-amber-500 transition-all duration-200 shadow-sm"
              >
                <span>Agendar com {barber.nickname}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
