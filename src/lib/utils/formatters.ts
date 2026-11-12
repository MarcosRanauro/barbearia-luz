/**
 * Utilitários de formatação para moeda, tempo e dados de contato.
 * Barbearia Luz - TypeScript Estrito (sem 'any').
 */

/**
 * Converte valor em centavos para string no formato monetário Real Brasileiro (BRL).
 * Exemplo: 3500 -> "R$ 35,00"
 */
export function formatPrice(cents: number): string {
  const valueInReais = cents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valueInReais);
}

/**
 * Formata duração em minutos para exibição amigável.
 * Exemplo: 30 -> "30 min", 60 -> "60 min" (ou "1h 30min" caso >= 60 se desejado, mas mantendo o padrão legível).
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Aplica máscara de telefone padrão brasileiro (celular com 11 dígitos ou fixo com 10 dígitos).
 * Exemplo: "21999990001" -> "(21) 99999-0001"
 * Exemplo: "2126670000" -> "(21) 2667-0000"
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }

  // Se já tiver 12 ou 13 dígitos incluindo DDI (ex: 5521999990001)
  if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) {
    return cleanPhone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  return phone;
}
