export interface ClientReview {
  id: string;
  author: string;
  rating: number;
  dateText: string;
  source: 'Google Avaliações';
  comment: string;
  badge?: string;
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'review-1',
    author: 'Fabricio Lucas',
    rating: 5,
    dateText: 'Cliente assíduo',
    source: 'Google Avaliações',
    comment: 'Lugar diferenciado demais em Nova Iguaçu! Atendimento de primeira qualidade, pontualidade britânica no horário marcado e o ambiente climatizado com chopp gelado faz toda diferença. Corto sempre com a equipe e não troco por nenhuma.',
    badge: 'Avaliação Verificada',
  },
  {
    id: 'review-2',
    author: 'Jonathan Matos',
    rating: 5,
    dateText: 'Cliente verificado',
    source: 'Google Avaliações',
    comment: 'Melhor barbearia da região da Luz e adjacências. A barboterapia com ozônio é surreal, relaxamento total depois de um dia puxado de trabalho. Profissionais que realmente entendem de corte e visagismo.',
    badge: 'Avaliação Verificada',
  },
];

export interface NotableClient {
  category: string;
  description: string;
}

export const NOTABLE_CLIENTS: NotableClient[] = [
  {
    category: 'Atletas & Futebol',
    description: 'Jogadores profissionais e atletas de clubes do Rio de Janeiro confiam no alinhamento da Barbearia Luz antes dos jogos e aparições públicas.',
  },
  {
    category: 'Personalidades & Criadores',
    description: 'Influenciadores e empresários de Nova Iguaçu e Baixada Fluminense que mantêm o visual sempre impecável com nossos barbeiros.',
  },
];
