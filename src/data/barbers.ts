import type { UserRole } from '@/types/database.types';

export interface Barber {
  id: string; // UUID correspondente em profiles
  slug: string;
  name: string;
  nickname: string;
  role: UserRole;
  isOwner: boolean;
  specialties: string[];
  bio: string;
  initials: string;
  phone: string;
  email: string;
  is_active: boolean;
}

export const BARBERS: Barber[] = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    slug: 'leandro',
    name: 'Leandro Santos',
    nickname: 'Leandro',
    role: 'admin', // Proprietário com privilégios totais de admin
    isOwner: true,
    specialties: ['Tesoura Clássica', 'Penteados Tradicionais', 'Corte Infantil'],
    bio: 'Proprietário e mestre barbeiro. Referência na técnica clássica na tesoura e gestão, garantindo excelência e hospitalidade máxima na casa.',
    initials: 'LS',
    phone: '21980134488',
    email: 'leandro@barbearialuz.com.br',
    is_active: true,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    slug: 'renan',
    name: 'Renan Luz',
    nickname: 'Renan',
    role: 'barber',
    isOwner: false,
    specialties: ['Fade Moderno', 'Visagismo', 'Cortes Clássicos'],
    bio: 'Mestre barbeiro com mais de 8 anos de experiência aperfeiçoando traços faciais e elevando a autoestima masculina.',
    initials: 'RL',
    phone: '21980134488',
    email: 'renan@barbearialuz.com.br',
    is_active: true,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    slug: 'mike',
    name: 'Mike Barbeiro',
    nickname: 'Mike',
    role: 'barber',
    isOwner: false,
    specialties: ['Degradê Navalhado', 'Platinados / Nevou', 'Freestyle'],
    bio: 'Especialista em cortes urbanos contemporâneos, transições limpas e desenhos geométricos de alta precisão.',
    initials: 'MB',
    phone: '21980134488',
    email: 'mike@barbearialuz.com.br',
    is_active: true,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000004',
    slug: 'davi',
    name: 'Davi Silva',
    nickname: 'Davi',
    role: 'barber',
    isOwner: false,
    specialties: ['Barboterapia com Ozônio', 'Tratamentos Capilares', 'Design de Barba'],
    bio: 'Focado no ritual relaxante da toalha quente com ozônio, alinhamento milimétrico de barba e conforto absoluto.',
    initials: 'DS',
    phone: '21980134488',
    email: 'davi@barbearialuz.com.br',
    is_active: true,
  },
];

/**
 * Busca barbeiro por ID ou por slug amigável (ex: 'leandro' ou 'c0000000-0000-0000-0000-000000000001')
 */
export function findBarber(idOrSlug: string): Barber | undefined {
  return BARBERS.find(
    (b) => b.id.toLowerCase() === idOrSlug.toLowerCase() || b.slug.toLowerCase() === idOrSlug.toLowerCase()
  );
}
