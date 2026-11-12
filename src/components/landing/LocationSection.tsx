export function LocationSection() {
  const schedule = [
    { days: 'Segunda a Sábado', hours: '09:00 às 19:00' },
    { days: 'Domingos e Feriados', hours: 'Fechado (ou sob agendamento VIP)' },
  ];

  return (
    <section id="localizacao" className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Informações de Contato e Horários */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              Onde Estamos
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Localização & Horários
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Fácil acesso no tradicional Bairro da Luz em Nova Iguaçu, com vagas de estacionamento nas imediações e ambiente acolhedor.
            </p>

            {/* Cartão de Endereço Real */}
            <div className="mt-8 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neutral-950 border border-amber-500/30 text-amber-400 shrink-0 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Endereço Oficial</h3>
                  <p className="text-sm font-semibold text-amber-300 mt-1">
                    Rua Barão de São Félix — Bairro da Luz
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Nova Iguaçu — RJ, CEP de fácil localização na Baixada Fluminense.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://maps.google.com/?q=Rua+Barao+de+Sao+Felix+Bairro+da+Luz+Nova+Iguacu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Abrir no Google Maps</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horários de Atendimento */}
            <div className="mt-6 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horário de Atendimento
              </h3>
              <div className="space-y-2.5">
                {schedule.map((item) => (
                  <div key={item.days} className="flex justify-between items-center text-xs sm:text-sm py-1.5 border-b border-neutral-800/60 last:border-0">
                    <span className="text-neutral-400">{item.days}</span>
                    <span className="font-bold text-neutral-200">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Visual / Destaques de Conforto */}
          <div className="relative rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 shadow-2xl flex flex-col justify-between h-full min-h-[420px]">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Barbearia Luz • Nova Iguaçu</span>
                <span className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Atendimento Ativo
                </span>
              </div>

              <h4 className="text-2xl font-black text-white">Padrão de Conforto & Hospitalidade</h4>
              <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Ambiente 100% climatizado com renovação de ar constante.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Café expresso moído na hora e chopp artesanal trincando.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Wi-Fi gratuito de alta velocidade para clientes.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Cadeiras reclináveis para máximo conforto durante a barboterapia.</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-neutral-800">
              <a
                href="https://maps.google.com/?q=Rua+Barao+de+Sao+Felix+Bairro+da+Luz+Nova+Iguacu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm transition-all duration-200 shadow-md shadow-amber-500/20"
              >
                <span>Traçar Rota no Waze ou Google Maps</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
