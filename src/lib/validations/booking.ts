import { z } from 'zod';

/**
 * Schema de validação Zod para os dados do agendamento.
 * Valida horário de início aceitando formatos ISO (UTC), com offset (ex: -03:00) ou string parseável por Date.
 */
export const bookingSchema = z.object({
  barberId: z.string().min(1, 'Selecione um profissional da equipe.'),
  serviceIds: z.array(z.string()).min(1, 'Selecione pelo menos um serviço.'),
  startAt: z
    .string()
    .min(1, 'Horário de início é obrigatório.')
    .refine(
      (val) => {
        if (!val || typeof val !== 'string') return false;
        const d = new Date(val);
        return !isNaN(d.getTime());
      },
      { message: 'Horário de início inválido.' }
    ),
  clientName: z
    .string()
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'Nome muito longo.'),
  clientPhone: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine(
      (val) => val.length === 10 || val.length === 11,
      'Telefone inválido. Informe o DDD e o número completo (10 ou 11 dígitos).'
    ),
  notes: z.string().max(300).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export interface BookingResponse {
  success: boolean;
  error?: string;
  data?: {
    appointmentId: string;
    barberName: string;
    barberSlug: string;
    clientName: string;
    clientPhone: string;
    servicesNames: string[];
    startAt: string;
    endAt: string;
    totalPriceCents: number;
    totalDurationMinutes: number;
  };
}
