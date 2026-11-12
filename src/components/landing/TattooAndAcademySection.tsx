export function TattooAndAcademySection() {
  return (
    <section id="estudio-e-academia" className="py-20 sm:py-28 bg-neutral-900/40 text-white border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            Além do Corte
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Tattoo Studio & Academia
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            Estrutura multifuncional que reúne arte corporal autoral e formação profissional de excelência em Nova Iguaçu.
          </p>
        </div>

        {/* Grade Dupla (Tattoo + Academia) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Estúdio de Tatuagem Parceiro */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Arte Corporal
                  </span>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    Estúdio de Tattoo Parceiro
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Sob Medida
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                Comodidade única no Bairro da Luz: faça seu corte de precisão e marque sua sessão de tatuagem no mesmo espaço climatizado e acolhedor.
              </p>

              <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Biossegurança total:</strong> materiais 100% descartáveis e esterilização hospitalar.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Estilos refinados:</strong> Blackwork, Fineline, Lettering, Tribal e Flash Tattoos exclusivos.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Atendimento personalizado:</strong> criações autorais com horário marcado.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <a
                href="https://wa.me/5521992286447?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20tatuagem%20no%20est%C3%BAdio%20da%20Barbearia%20Luz."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/40 hover:border-amber-400 transition-all duration-200 shadow-sm"
              >
                <span>Falar com o Tatuador ((21) 99228-6447)</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 2: Academia de Formação para Barbeiros */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Educação Profissional
                  </span>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    Academia de Formação
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Turmas Abertas
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                Capacitamos quem deseja ingressar ou se aperfeiçoar na profissão de barbeiro com mentoria prática individualizada e vivência real de bancada.
              </p>

              <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Do Zero ao Avançado:</strong> tesoura clássica, degradê navalhado e visagismo.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Prática em Modelos Reais:</strong> aprendizado direto na prática sob supervisão direta.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Gestão e Atendimento:</strong> como conquistar e fidelizar clientes de alto valor.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <a
                href="https://wa.me/5521980134488?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20cursos%20da%20Academia%20de%20Barbeiros%20da%20Barbearia%20Luz."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-amber-500/20"
              >
                <span>Consultar Vagas na Academia ((21) 98013-4488)</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
