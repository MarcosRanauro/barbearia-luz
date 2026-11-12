import { CLIENT_REVIEWS, NOTABLE_CLIENTS } from '@/data/reviews';

export function ReviewsSection() {
  return (
    <section id="avaliacoes" className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-900 relative overflow-hidden">
      {/* Background glow sutil */}
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            Prova Social & Reputação
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Avaliado por Quem Vive a Experiência
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            Mais de 160 avaliações 5 estrelas no Google e a preferência de atletas e personalidades de Nova Iguaçu e RJ.
          </p>
        </div>

        {/* Depoimentos do Google */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CLIENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all duration-200 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {review.badge && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {review.badge}
                    </span>
                  )}
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
                <div>
                  <h4 className="text-sm font-bold text-white">{review.author}</h4>
                  <span className="text-xs text-neutral-500">{review.dateText}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {review.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Presença de Atletas e Personalidades */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs text-amber-500 font-extrabold uppercase tracking-wider">
                Frequência VIP
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                A Escolha de Atletas e Personalidades do RJ
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Nossas cadeiras recebem regularmente atletas de ponta e figuras públicas que exigem discrição, pontualidade rigorosa e acabamento de alta definição para gravações, jogos e eventos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0 max-w-md">
              {NOTABLE_CLIENTS.map((item) => (
                <div key={item.category} className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
                  <h4 className="text-xs font-bold text-amber-400 mb-1">{item.category}</h4>
                  <p className="text-[11px] text-neutral-400 leading-normal">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
