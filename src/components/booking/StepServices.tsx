'use client';

import { useState } from 'react';
import { SERVICES_CATALOG, type ServiceItem } from '@/data/services';
import { formatDuration, formatPrice } from '@/lib/utils/formatters';

interface StepServicesProps {
  selectedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepServices({
  selectedServiceIds,
  onToggleService,
  onNext,
  onBack,
}: StepServicesProps) {
  const categories = ['Todos', 'Cabelo', 'Barba', 'Combos', 'Química', 'Acabamento'] as const;
  type Category = (typeof categories)[number];

  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const filteredServices = SERVICES_CATALOG.filter((s) => {
    if (!s.is_active) return false;
    if (activeCategory === 'Todos') return true;
    return s.category === activeCategory;
  });

  const selectedServices = SERVICES_CATALOG.filter((s) => selectedServiceIds.includes(s.id));
  const totalPriceCents = selectedServices.reduce((acc, s) => acc + s.price_cents, 0);
  const totalDurationMinutes = selectedServices.reduce((acc, s) => acc + s.duration_minutes, 0);

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Selecione os Serviços
        </h2>
        <p className="mt-1 text-sm text-neutral-400 font-light">
          Você pode selecionar mais de um serviço para a mesma sessão (ex: Corte + Barba + Sobrancelha):
        </p>

        {/* Filtro de Categorias */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grade de Serviços com Checkbox Estilizado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
        {filteredServices.map((service: ServiceItem) => {
          const isSelected = selectedServiceIds.includes(service.id);

          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service.id)}
              className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3.5 select-none ${
                isSelected
                  ? 'bg-neutral-900 border-amber-500 ring-1 ring-amber-500/40 shadow-md'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/90'
              }`}
            >
              {/* Checkbox Visual Personalizado */}
              <div
                className={`w-5 h-5 rounded-md mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                  isSelected
                    ? 'bg-amber-500 border-amber-500 text-neutral-950'
                    : 'border-neutral-700 bg-neutral-950'
                }`}
              >
                {isSelected && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {service.name}
                  </h3>
                  <span className="text-amber-400 font-extrabold text-sm shrink-0">
                    {formatPrice(service.price_cents)}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed font-light">
                  {service.description}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatDuration(service.duration_minutes)}</span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-neutral-400">{service.category}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rodapé Fixo com Contador e Resumo Somado */}
      <div className="fixed bottom-0 left-0 w-full bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-4 z-40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-neutral-400 block text-[11px]">Selecionados</span>
              <span className="text-white font-bold">{selectedServiceIds.length} serviços</span>
            </div>
            <div className="h-6 w-px bg-neutral-800" />
            <div>
              <span className="text-neutral-400 block text-[11px]">Duração Estimada</span>
              <span className="text-neutral-200 font-bold">{formatDuration(totalDurationMinutes)}</span>
            </div>
            <div className="h-6 w-px bg-neutral-800" />
            <div>
              <span className="text-neutral-400 block text-[11px]">Valor Total</span>
              <span className="text-amber-400 font-black text-base">{formatPrice(totalPriceCents)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs sm:text-sm font-semibold border border-neutral-800 transition-colors"
            >
              Voltar
            </button>
            <button
              type="button"
              disabled={selectedServiceIds.length === 0}
              onClick={onNext}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
            >
              Continuar para Data e Hora →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
