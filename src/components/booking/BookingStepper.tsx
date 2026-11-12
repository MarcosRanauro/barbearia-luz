interface BookingStepperProps {
  currentStep: 1 | 2 | 3 | 4;
  onStepClick?: (step: 1 | 2 | 3 | 4) => void;
}

export function BookingStepper({ currentStep, onStepClick }: BookingStepperProps) {
  const steps = [
    { number: 1, label: 'Profissional', title: '1. Barbeiro' },
    { number: 2, label: 'Serviços', title: '2. Serviços' },
    { number: 3, label: 'Data e Hora', title: '3. Data & Hora' },
    { number: 4, label: 'Identificação', title: '4. Seus Dados' },
  ] as const;

  return (
    <div className="w-full py-4 mb-8">
      {/* Barra de Progresso Superior */}
      <div className="relative flex items-center justify-between max-w-2xl mx-auto">
        {/* Linha de conexão atrás dos círculos */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-0.5 bg-neutral-800 -z-0" />
        <div
          className={`absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 -z-0 ${
            currentStep === 1
              ? 'w-0'
              : currentStep === 2
              ? 'w-1/3'
              : currentStep === 3
              ? 'w-2/3'
              : 'w-full'
          }`}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isClickable = isCompleted && onStepClick;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.number as 1 | 2 | 3 | 4)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isCurrent
                    ? 'bg-amber-500 text-neutral-950 ring-4 ring-amber-500/20 shadow-lg shadow-amber-500/20 scale-105'
                    : isCompleted
                    ? 'bg-neutral-800 text-amber-400 border border-amber-500/50 hover:bg-neutral-700 cursor-pointer'
                    : 'bg-neutral-900 text-neutral-500 border border-neutral-800 cursor-default'
                }`}
                title={step.title}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </button>
              <span
                className={`mt-2 text-[11px] sm:text-xs font-semibold hidden xs:block ${
                  isCurrent ? 'text-amber-400 font-bold' : isCompleted ? 'text-neutral-300' : 'text-neutral-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
