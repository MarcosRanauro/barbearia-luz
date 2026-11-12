import Link from 'next/link';

export interface BarberProfile {
  id: string;
  name: string;
  nickname: string;
  specialties: string[];
  bio: string;
  initials: string;
}

export const BARBERS_TEAM: BarberProfile[] = [
  {
    id: 'renan',
    name: 'Renan Luz',
    nickname: 'Renan',
    specialties: ['Fade Moderno', 'Visagismo', 'Cortes Clássicos'],
    bio: 'Fundador e mestre barbeiro com mais de 8 anos de experiência aperfeiçoando traços e valorizando a autoestima masculina.',
    initials: 'RL',
  },
  {
    id: 'mike',
    name: 'Mike Barbeiro',
    nickname: 'Mike',
    specialties: ['Degradê Navalhado', 'Platinados', 'Freestyle'],
    bio: 'Especialista em cortes urbanos contemporâneos, transições limpas e desenhos geométricos de alta precisão.',
    initials: 'MB',
  },
  {
    id: 'davi',
    name: 'Davi Silva',
    nickname: 'Davi',
    specialties: ['Barboterapia', 'Tratamentos Capilares', 'Design de Barba'],
    bio: 'Focado no ritual clássico da barboterapia com toalha quente, alinhamento milimétrico e conforto absoluto.',
    initials: 'DS',
  },
  {
    id: 'leandro',
    name: 'Leandro Santos',
    nickname: 'Leandro',
    specialties: ['Tesoura Clássica', 'Penteados Clássicos', 'Corte Infantil'],
    bio: 'Mestre da técnica tradicional de tesoura e finalização em camadas, aliando paciência, atenção e agilidade.',
    initials: 'LS',
  },
];

export function BarbersSection() {
  return (
    <section id="barbeiros" className="py-20 bg-neutral-900/40 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase">
            Equipe Especializada
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Nossos Profissionais
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Conheça os profissionais que garantem excelência em cada detalhe do seu atendimento.
          </p>
        </div>

        {/* Grade de 4 Barbeiros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BARBERS_TEAM.map((barber) => (
            <div
              key={barber.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 group"
            >
              <div>
                {/* Avatar / Monograma com aro dourado */}
                <div className="flex items-center justify-center mx-auto w-24 h-24 rounded-full bg-neutral-950 border-2 border-amber-500/40 group-hover:border-amber-500 shadow-inner mb-5 transition-colors">
                  <span className="text-2xl font-black text-amber-400 tracking-wider">
                    {barber.initials}
                  </span>
                </div>

                <div className="text-center mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {barber.nickname}
                  </h3>
                  <span className="text-xs text-neutral-400 font-medium">{barber.name}</span>
                </div>

                <p className="text-xs text-neutral-400 text-center leading-relaxed mb-4">
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
                href={`/agendar?barbeiro=${encodeURIComponent(barber.id)}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-amber-500 text-neutral-200 hover:text-neutral-950 text-xs sm:text-sm font-bold border border-neutral-700 hover:border-amber-500 transition-all duration-200 shadow-sm"
              >
                Agendar com {barber.nickname}
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
