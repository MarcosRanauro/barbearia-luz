'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SERVICES_CATALOG, type ServiceItem } from '@/data/services';
import { formatDuration, formatPrice } from '@/lib/utils/formatters';

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export function ServicesSection({ services = SERVICES_CATALOG }: ServicesSectionProps) {
  const tabs = ['Cabelo', 'Barba', 'Combos', 'Química', 'Acabamento'] as const;
  type TabType = (typeof tabs)[number];

  const [activeTab, setActiveTab] = useState<TabType>('Cabelo');

  const filteredServices = services.filter(
    (service) => service.is_active && service.category === activeTab
  );

  return (
    <section id="servicos" className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            Cardápio Completo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Serviços & Procedimentos
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            17 opções personalizadas para seu estilo, da barboterapia com ozônio ao platinado nevou.
          </p>

          {/* Navegação por Abas (Tabs) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-sm max-w-xl mx-auto">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab;
              const count = services.filter((s) => s.category === tab && s.is_active).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center justify-center gap-2 flex-1 min-w-[95px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-md shadow-amber-500/25 font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <span className="truncate">{tab}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold leading-none shrink-0 ${
                      isSelected ? 'bg-neutral-950/20 text-neutral-950 font-extrabold' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grade de Cards de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-900/40 border border-neutral-800/80 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <span className="shrink-0 text-amber-400 font-black text-lg">
                    {formatPrice(service.price_cents)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                  <svg
                    className="w-4 h-4 text-amber-500/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formatDuration(service.duration_minutes)}
                </span>

                <Link
                  href={`/agendar?servico=${encodeURIComponent(service.id)}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-amber-500 text-amber-400 hover:text-neutral-950 text-xs font-bold transition-all duration-150 border border-neutral-700/60 hover:border-amber-500 shadow-sm"
                >
                  <span>Agendar este</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da Seção com Banner de Atendimento */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Dúvidas sobre o procedimento ideal?</h4>
            <p className="text-xs text-neutral-400 mt-0.5">Nossos barbeiros realizam consultoria visagista gratuita no início do seu atendimento.</p>
          </div>
          <Link
            href="/agendar"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black transition-colors"
          >
            Escolher Barbeiro e Horário →
          </Link>
        </div>
      </div>
    </section>
  );
}
