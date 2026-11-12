import type { Database } from '@/types/database.types';

export type ServiceItem = Database['public']['Tables']['services']['Row'];

export const SERVICES_CATALOG: ServiceItem[] = [
  // --- Cabelo ---
  {
    id: 'corte-tradicional',
    name: 'Corte Tradicional',
    description: 'Corte completo com tesoura ou máquina, degradê personalizado, acabamento na navalha e finalização com pomada modeladora.',
    duration_minutes: 30,
    price_cents: 4500, // R$ 45,00
    category: 'Cabelo',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'pezinho-acabamento',
    name: 'Pezinho / Acabamento',
    description: 'Contorno e alinhamento milimétrico da linha do cabelo e nuca com navalhete descartável.',
    duration_minutes: 15,
    price_cents: 2000, // R$ 20,00
    category: 'Cabelo',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'lavagem-especial',
    name: 'Lavagem Especial',
    description: 'Higienização profunda dos fios no lavatório com xampu refrescante e massagem capilar revigorante.',
    duration_minutes: 15,
    price_cents: 1500, // R$ 15,00
    category: 'Cabelo',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // --- Barba ---
  {
    id: 'barba-simples',
    name: 'Barba Simples',
    description: 'Aparação de volume, alinhamento dos contornos com navalhete descartável e pós-barba hidratante.',
    duration_minutes: 30,
    price_cents: 3500, // R$ 35,00
    category: 'Barba',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'barboterapia-completa',
    name: 'Barboterapia Completa com Ozônio',
    description: 'Experiência sensorial com vapor de ozônio, toalha quente, óleos essenciais relaxantes, massagem facial e navalhete.',
    duration_minutes: 45,
    price_cents: 4500, // R$ 45,00
    category: 'Barba',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'pigmentacao-barba',
    name: 'Pigmentação de Barba',
    description: 'Preenchimento visual e camuflagem de falhas ou fios brancos na barba com acabamento natural e duradouro.',
    duration_minutes: 30,
    price_cents: 3000, // R$ 30,00
    category: 'Barba',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // --- Combos ---
  {
    id: 'combo-corte-barba-tradicional',
    name: 'Corte + Barba Tradicional',
    description: 'A combinação essencial do cavalheiro moderno: corte com degradê ajustado e barba alinhada com maestria.',
    duration_minutes: 60,
    price_cents: 7500, // R$ 75,00
    category: 'Combos',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'combo-corte-barboterapia',
    name: 'Corte + Barboterapia',
    description: 'Corte completo estilizado mais o ritual completo de barboterapia com toalha quente, ozônio e hidratação facial.',
    duration_minutes: 75,
    price_cents: 8500, // R$ 85,00
    category: 'Combos',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'combo-master-sobrancelha',
    name: 'Combo Master com Sobrancelha',
    description: 'Tratamento VIP completo: corte de cabelo estilizado, barboterapia relaxante e alinhamento de sobrancelha na navalha.',
    duration_minutes: 90,
    price_cents: 10000, // R$ 100,00
    category: 'Combos',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // --- Acabamento ---
  {
    id: 'sobrancelha-navalha',
    name: 'Sobrancelha na Navalha',
    description: 'Limpeza e desenho anatômico dos contornos da sobrancelha na navalha com extrema precisão e simetria.',
    duration_minutes: 15,
    price_cents: 1999, // R$ 19,99
    category: 'Acabamento',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'limpeza-pele-express',
    name: 'Limpeza de Pele Express',
    description: 'Remoção de cravos e impurezas, esfoliação suave, máscara facial e hidratação para revigorar o rosto.',
    duration_minutes: 30,
    price_cents: 4000, // R$ 40,00
    category: 'Acabamento',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },

  // --- Química ---
  {
    id: 'platinado-nevou',
    name: 'Platinado / Nevou',
    description: 'Descoloração global de alto nível com proteção aos fios, matização e brilho platinado impecável.',
    duration_minutes: 90,
    price_cents: 10000, // R$ 100,00
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'luzes-mechas',
    name: 'Luzes / Mechas',
    description: 'Clareamento capilar em mechas para iluminação e contraste moderno com produtos de ponta.',
    duration_minutes: 60,
    price_cents: 7000, // R$ 70,00
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'progressiva',
    name: 'Progressiva',
    description: 'Alinhamento térmico capilar, redução expressiva de volume e frizz com brilho e sedosidade.',
    duration_minutes: 60,
    price_cents: 8000, // R$ 80,00
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'hidratacao-profunda',
    name: 'Hidratação',
    description: 'Reposição hídrica e lipídica com máscara capilar premium para devolver maciez aos fios ressecados.',
    duration_minutes: 30,
    price_cents: 3500, // R$ 35,00
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'matizacao',
    name: 'Matização',
    description: 'Neutralização de tons amarelados indesejados em fios claros, loiros ou platinados.',
    duration_minutes: 30,
    price_cents: 4000, // R$ 40,00
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'relaxamento-capilar',
    name: 'Relaxamento',
    description: 'Suavização e soltura de cachos para facilitar o penteado e domar o volume com segurança.',
    duration_minutes: 45,
    price_cents: 5000, // R$ 50,00
    category: 'Química',
    is_active: true,
    created_at: '2026-11-12T00:00:00Z',
    updated_at: '2026-11-12T00:00:00Z',
  },
];
