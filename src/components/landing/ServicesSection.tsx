'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Database } from '@/types/database.types';
import { formatDuration, formatPrice } from '@/lib/utils/formatters';

export type ServiceItem = Database['public']['Tables']['services']['Row'];

export const DEFAULT_SERVICES: ServiceItem[] = [
  // Cabelo
  {
    id: 'cabelo-corte-moderno',
    name: 'Corte Tradicional / Fade',
    description: 'Degradê impecável, tesoura e acabamento personalizado ao seu estilo e visagismo facial.',
    duration_minutes: 40,
    price_cents: 4000,
    category: 'Cabelo',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'cabelo-navalhado',
    name: 'Corte Degradê Navalhado',
    description: 'Fade com navalha rente à pele e finalização com pomada modeladora de alto padrão.',
    duration_minutes: 45,
    price_cents: 4500,
    category: 'Cabelo',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'cabelo-infantil',
    name: 'Corte Infantil (Kids)',
    description: 'Atendimento especial com paciência e técnica para os pequenos ficarem no estilo.',
    duration_minutes: 30,
    price_cents: 3500,
    category: 'Cabelo',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // Barba
  {
    id: 'barba-terapia',
    name: 'Barboterapia Tradicional',
    description: 'Toalha quente com óleos essenciais, massagem facial relaxante, navalhete descartável e pós-barba refrescante.',
    duration_minutes: 35,
    price_cents: 3500,
    category: 'Barba',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'barba-alinhamento',
    name: 'Modelagem e Alinhamento de Barba',
    description: 'Desenho das linhas na máquina e navalhete com hidratação e balm nutritivo.',
    duration_minutes: 25,
    price_cents: 2800,
    category: 'Barba',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // Combos
  {
    id: 'combo-corte-barba',
    name: 'Combo Corte + Barboterapia',
    description: 'A experiência completa: corte de cabelo estilizado somado ao ritual relaxante de toalha quente e barba.',
    duration_minutes: 70,
    price_cents: 7000,
    category: 'Combos',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'combo-vip-luz',
    name: 'Combo VIP Luz (Corte + Barba + Sobrancelha)',
    description: 'Tratamento completo para quem não abre mão do alinhamento visual impecável.',
    duration_minutes: 85,
    price_cents: 8500,
    category: 'Combos',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // Acabamento
  {
    id: 'acabamento-pezinho',
    name: 'Pezinho / Acabamento / Contorno',
    description: 'Alinhamento dos contornos da nuca e laterais para manter o corte em dia.',
    duration_minutes: 15,
    price_cents: 1500,
    category: 'Acabamento',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'acabamento-sobrancelha',
    name: 'Design de Sobrancelha na Navalha',
    description: 'Limpeza e desenho natural dos fios com extrema precisão.',
    duration_minutes: 15,
    price_cents: 1500,
    category: 'Acabamento',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // Química
  {
    id: 'quimica-platinado',
    name: 'Platinado Global / Nevou',
    description: 'Descoloração segura com produtos de alta performance e matização uniforme.',
    duration_minutes: 120,
    price_cents: 12000,
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'quimica-camuflagem',
    name: 'Camuflagem de Cabelo / Barba',
    description: 'Tonalização sutil para redução dos fios brancos com aspecto natural.',
    duration_minutes: 30,
    price_cents: 4500,
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
];

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export function ServicesSection({ services = DEFAULT_SERVICES }: ServicesSectionProps) {
  const categories = ['Todos', 'Cabelo', 'Barba', 'Combos', 'Acabamento', 'Química'] as const;
  type SelectedCategory = (typeof categories)[number];

  const [activeCategory, setActiveCategory] = useState<SelectedCategory>('Todos');

  const filteredServices = services.filter((service) => {
    if (!service.is_active) return false;
    if (activeCategory === 'Todos') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="servicos" className="py-20 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-500 font-semibold text-xs tracking-widest uppercase">
            Nosso Cardápio
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Serviços Especializados
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Qualidade artesanal, técnicas contemporâneas e produtos premium para valorizar o seu estilo.
          </p>

          {/* Abas de Categorias */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  {category}
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
              className="flex flex-col justify-between p-6 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-900 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <span className="shrink-0 text-amber-400 font-extrabold text-base">
                    {formatPrice(service.price_cents)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
                  <svg
                    className="w-4 h-4 text-amber-500"
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
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Agendar este
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
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
