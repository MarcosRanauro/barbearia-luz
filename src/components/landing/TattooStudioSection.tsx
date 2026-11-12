export function TattooStudioSection() {
  const highlights = [
    {
      title: 'Biossegurança Rigorosa',
      description: 'Materiais 100% descartáveis, agulhas lacradas de uso único e esterilização certificada.',
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Estilos Autênticos',
      description: 'Especialistas em Blackwork, Fineline, Lettering, Tradicional e Flash Tattoos exclusivos.',
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: 'Conveniência Total',
      description: 'Corte de cabelo, barba alinhada e arte na pele no mesmo endereço no Bairro da Luz.',
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="tatuagem" className="py-20 bg-neutral-950 text-white border-b border-neutral-900 relative overflow-hidden">
      {/* Luz ambiente discreta */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna Texto e Diferenciais */}
          <div>
            <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase">
              Diferencial Exclusivo
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Estúdio de Tatuagem Integrado
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Elevamos o conceito de barbearia ao reunir os melhores profissionais de corte e tatuadores talentosos em uma estrutura única, sofisticada e equipada com os mais altos padrões de higiene e conforto.
            </p>

            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                  <div className="p-2 rounded-lg bg-neutral-950 border border-amber-500/20 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="https://wa.me/5521999990001?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20tatuagem."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 font-semibold text-sm border border-amber-500/40 hover:border-amber-400 transition-all duration-200"
              >
                <span>Solicitar Orçamento de Tattoo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna Visual de Destaque */}
          <div className="relative">
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div>
                  <span className="text-xs text-amber-500 uppercase tracking-widest font-bold">Luz Tattoo Studio</span>
                  <h3 className="text-lg font-bold text-white">Flash Days & Sessões Personalizadas</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Agenda Aberta
                </span>
              </div>

              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex items-center justify-between py-2 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Ambiente</span>
                  <span className="font-medium text-white">Climatizado e com som ambiente</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Horários</span>
                  <span className="font-medium text-white">Atendimento exclusivo com hora marcada</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Projetos</span>
                  <span className="font-medium text-white">Desenhos autorais e referências sob medida</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-neutral-400">Localização</span>
                  <span className="font-medium text-white">Bairro da Luz, Nova Iguaçu - RJ</span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center">
                <p className="text-xs text-neutral-400">
                  Aproveite seu agendamento de cabelo ou barba para tirar suas dúvidas e conferir os flashes disponíveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
