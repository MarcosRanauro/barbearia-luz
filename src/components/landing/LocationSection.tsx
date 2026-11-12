export function LocationSection() {
  const schedule = [
    { days: 'Segunda a Sexta-feira', hours: '09:00 às 20:00' },
    { days: 'Sábado', hours: '08:00 às 19:00' },
    { days: 'Domingos e Feriados', hours: 'Fechado (ou sob consulta especial)' },
  ];

  return (
    <section id="localizacao" className="py-20 bg-neutral-900/50 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Informações de Contato e Horários */}
          <div>
            <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase">
              Onde Estamos
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Localização & Horários
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Situada no tradicional Bairro da Luz em Nova Iguaçu, nossa barbearia oferece facilidade de acesso, estacionamento nas proximidades e um espaço acolhedor.
            </p>

            {/* Cartão de Endereço */}
            <div className="mt-8 p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-neutral-950 border border-amber-500/30 text-amber-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Endereço</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                    Bairro da Luz — Nova Iguaçu, RJ
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Região central e de fácil localização com comodidades locais.
                  </p>
                  <div className="mt-3">
                    <a
                      href="https://maps.google.com/?q=Barbearia+Luz+Nova+Iguacu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Abrir no Google Maps</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horários de Atendimento */}
            <div className="mt-6 p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horário de Funcionamento
              </h3>
              <div className="space-y-2">
                {schedule.map((item) => (
                  <div key={item.days} className="flex justify-between items-center text-xs py-1.5 border-b border-neutral-800/60 last:border-0">
                    <span className="text-neutral-400">{item.days}</span>
                    <span className="font-semibold text-neutral-200">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Visual / Mapa Interativo Ilustrado */}
          <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl overflow-hidden flex flex-col justify-between h-full min-h-[380px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Nova Iguaçu • RJ</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Aberto para Atendimento
                </span>
              </div>

              <h4 className="text-xl font-bold text-white">Comodidades do Espaço</h4>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Ambiente 100% climatizado com ar-condicionado de alta potência.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Café expresso moído na hora e chopp artesanal gelado.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Wi-Fi de alta velocidade e tomadas para recarga de aparelhos.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Cadeiras de barbeiro ergonômicas e higienizadas a cada uso.
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-neutral-800">
              <a
                href="https://maps.google.com/?q=Barbearia+Luz+Nova+Iguacu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-amber-500/20"
              >
                <span>Traçar Rota no Waze / Google Maps</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
