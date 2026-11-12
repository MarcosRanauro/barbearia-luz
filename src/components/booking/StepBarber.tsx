import { BARBERS, type Barber } from '@/data/barbers';

interface StepBarberProps {
  selectedBarberId: string;
  onSelectBarber: (barberId: string) => void;
  onNext: () => void;
}

export function StepBarber({ selectedBarberId, onSelectBarber, onNext }: StepBarberProps) {
  const handleSelectAndProceed = (barber: Barber) => {
    onSelectBarber(barber.slug);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Escolha seu Profissional
        </h2>
        <p className="mt-1 text-sm text-neutral-400 font-light">
          Nossa equipe é formada por especialistas renomados de Nova Iguaçu. Selecione quem cuidará do seu visual:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {BARBERS.map((barber) => {
          const isSelected =
            selectedBarberId.toLowerCase() === barber.slug.toLowerCase() ||
            selectedBarberId.toLowerCase() === barber.id.toLowerCase();

          return (
            <button
              key={barber.id}
              type="button"
              onClick={() => handleSelectAndProceed(barber)}
              className={`p-5 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex items-start gap-4 ${
                isSelected
                  ? 'bg-neutral-900 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/30'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/90'
              }`}
            >
              {/* Monograma do Barbeiro */}
              <div className="relative shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-neutral-950 border border-amber-500/30">
                <span className="text-lg font-black text-amber-400 tracking-wider">
                  {barber.initials}
                </span>
                {barber.isOwner && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-neutral-950 text-[9px] font-black uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white truncate">
                    {barber.nickname}
                  </h3>
                  {isSelected && (
                    <span className="shrink-0 text-amber-400 text-xs font-bold flex items-center gap-1">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Selecionado
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                  {barber.bio}
                </p>

                <div className="mt-2.5 flex flex-wrap gap-1">
                  {barber.specialties.slice(0, 2).map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end max-w-3xl mx-auto">
        <button
          type="button"
          disabled={!selectedBarberId}
          onClick={onNext}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
        >
          <span>Continuar para Serviços</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
