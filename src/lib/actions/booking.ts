'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { findBarber } from '@/data/barbers';
import { SERVICES_CATALOG } from '@/data/services';
import { bookingSchema, type BookingResponse } from '@/lib/validations/booking';

/**
 * Server Action para criação segura de agendamento com trava anti-concorrência.
 */
export async function createAppointment(rawInput: unknown): Promise<BookingResponse> {
  const parseResult = bookingSchema.safeParse(rawInput);

  if (!parseResult.success) {
    console.error('[createAppointment] Falha na validação Zod:', {
      rawInput,
      errors: parseResult.error.format(),
    });
    const firstError = parseResult.error.issues[0]?.message ?? 'Dados de agendamento inválidos.';
    return {
      success: false,
      error: firstError,
    };
  }

  const { barberId, serviceIds, startAt, clientName, clientPhone, notes } = parseResult.data;

  // 1. Instanciação e validação robusta da data de início
  const startDate = new Date(startAt);
  if (isNaN(startDate.getTime())) {
    console.error('[createAppointment] Data inválida ao instanciar new Date(startAt):', {
      startAt,
      type: typeof startAt,
    });
    return {
      success: false,
      error: 'Horário de início inválido.',
    };
  }

  // 2. Identificar o barbeiro (aceita slug amigável ou UUID)
  const barber = findBarber(barberId);
  if (!barber || !barber.is_active) {
    return {
      success: false,
      error: 'O profissional selecionado não está disponível para agendamento.',
    };
  }

  const targetBarberId = barber.id;

  // 3. Localizar serviços e somar duração e preço
  const selectedServices = SERVICES_CATALOG.filter((s) => serviceIds.includes(s.id));
  if (selectedServices.length === 0) {
    return {
      success: false,
      error: 'Nenhum serviço válido foi selecionado.',
    };
  }

  const totalDurationMinutes = selectedServices.reduce((acc, s) => acc + s.duration_minutes, 0);
  const totalPriceCents = selectedServices.reduce((acc, s) => acc + s.price_cents, 0);

  // 4. Calcular horário final somando duração dos serviços e converter para ISO universal
  const endDate = new Date(startDate.getTime() + totalDurationMinutes * 60 * 1000);
  const startAtIso = startDate.toISOString();
  const endAtIso = endDate.toISOString();

  try {
    const supabaseAdmin = createAdminClient();

    // 5. Upsert do cliente pelo telefone único (normalizado apenas dígitos)
    const { data: existingClient, error: clientSearchError } = await supabaseAdmin
      .from('clients')
      .select('id, name')
      .eq('phone', clientPhone)
      .maybeSingle();

    if (clientSearchError) {
      console.error('Erro ao verificar cliente existente:', clientSearchError);
    }

    let clientId: string;

    if (existingClient) {
      clientId = existingClient.id;
      // Atualiza o nome se o cliente tiver preenchido algo diferente
      await supabaseAdmin
        .from('clients')
        .update({
          name: clientName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', clientId);
    } else {
      const { data: newClient, error: clientInsertError } = await supabaseAdmin
        .from('clients')
        .insert({
          name: clientName,
          phone: clientPhone,
          notes: notes ?? null,
        })
        .select('id')
        .single();

      if (clientInsertError || !newClient) {
        console.error('Erro ao cadastrar cliente:', clientInsertError);
        return {
          success: false,
          error: 'Falha ao registrar os dados do cliente. Tente novamente.',
        };
      }
      clientId = newClient.id;
    }

    // 6. Inserir agendamento com validação da constraint temporal btree_gist
    const { data: appointment, error: appointmentError } = await supabaseAdmin
      .from('appointments')
      .insert({
        barber_id: targetBarberId,
        client_id: clientId,
        start_at: startAtIso,
        end_at: endAtIso,
        status: 'confirmed',
        total_price_cents: totalPriceCents,
        notes: notes ?? null,
      })
      .select('id')
      .single();

    if (appointmentError) {
      // Captura específica da constraint de exclusão anti-conflito (btree_gist)
      const isExclusionConflict =
        appointmentError.code === '23P01' ||
        appointmentError.message?.toLowerCase().includes('no_overlapping_appointments') ||
        appointmentError.message?.toLowerCase().includes('exclusion') ||
        appointmentError.details?.toLowerCase().includes('conflicting key');

      if (isExclusionConflict) {
        return {
          success: false,
          error:
            'Este horário acabou de ser reservado por outro cliente. Por favor, escolha outro slot.',
        };
      }

      console.error('Erro ao criar agendamento no Supabase:', appointmentError);
      return {
        success: false,
        error: 'Não foi possível confirmar seu agendamento no momento. Tente novamente.',
      };
    }

    // 7. Registrar serviços contratados em appointment_services
    const appointmentServicesPayload = selectedServices.map((service) => ({
      appointment_id: appointment.id,
      service_id: service.id,
      price_cents: service.price_cents,
      duration_minutes: service.duration_minutes,
    }));

    // Gravar itens do agendamento
    const { error: itemsError } = await supabaseAdmin
      .from('appointment_services')
      .insert(appointmentServicesPayload);

    if (itemsError) {
      console.warn('Aviso: itens associados a appointment_services:', itemsError.message);
    }

    return {
      success: true,
      data: {
        appointmentId: appointment.id,
        barberName: barber.name,
        barberSlug: barber.slug,
        clientName,
        clientPhone,
        servicesNames: selectedServices.map((s) => s.name),
        startAt: startAtIso,
        endAt: endAtIso,
        totalPriceCents,
        totalDurationMinutes,
      },
    };
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Erro inesperado na Server Action createAppointment:', {
      error: error?.message,
      stack: error?.stack,
      startAt,
    });

    return {
      success: false,
      error: error?.message || 'Ocorreu um erro interno ao processar o agendamento.',
    };
  }
}

/**
 * Consulta slots disponíveis para um determinado barbeiro e data.
 * Tenta executar a RPC get_available_slots e provê cálculo seguro considerando o fuso do Brasil.
 */
export async function fetchAvailableSlots(
  barberId: string,
  dateString: string,
  durationMinutes: number
): Promise<string[]> {
  const barber = findBarber(barberId);
  const targetBarberId = barber?.id ?? barberId;

  try {
    const supabaseAdmin = createAdminClient();

    // 1. Tentar chamar a RPC segura do Supabase get_available_slots
    const { data: rpcSlots, error: rpcError } = await supabaseAdmin.rpc('get_available_slots', {
      p_barber_id: targetBarberId,
      p_date: dateString,
      p_duration_minutes: durationMinutes,
    });

    if (!rpcError && rpcSlots && rpcSlots.length > 0) {
      return rpcSlots.map((item: { slot_time: string }) => item.slot_time);
    }
  } catch {
    // Se a RPC falhar ou o banco estiver sem horários de expediente cadastrados,
    // calculamos os slots no padrão comercial da casa (09h às 19h, Seg a Sáb)
  }

  // Fallback: cálculo de grade padrão (Seg a Sáb, 09:00 às 19:00 no fuso de Brasília)
  return calculateDefaultBusinessSlots(targetBarberId, dateString, durationMinutes);
}

/**
 * Gera os slots comerciais da Barbearia Luz (09h às 19h, passos de 30min).
 * Utiliza o fuso horário oficial de Brasília (UTC-3) para evitar divergências de timezone.
 */
async function calculateDefaultBusinessSlots(
  barberId: string,
  dateString: string,
  durationMinutes: number
): Promise<string[]> {
  // Instanciar data no fuso de Brasília para conferir o dia da semana
  const dateCheck = new Date(`${dateString}T12:00:00-03:00`);
  const dayOfWeek = dateCheck.getDay(); // 0 = Domingo

  // Fechado aos domingos
  if (dayOfWeek === 0) {
    return [];
  }

  // Buscar agendamentos confirmados do barbeiro nesta data
  const startOfDay = new Date(`${dateString}T00:00:00-03:00`).toISOString();
  const endOfDay = new Date(`${dateString}T23:59:59-03:00`).toISOString();

  let occupiedIntervals: { start: number; end: number }[] = [];

  try {
    const supabaseAdmin = createAdminClient();
    const { data: appointments } = await supabaseAdmin
      .from('appointments')
      .select('start_at, end_at')
      .eq('barber_id', barberId)
      .eq('status', 'confirmed')
      .gte('start_at', startOfDay)
      .lte('start_at', endOfDay);

    if (appointments) {
      occupiedIntervals = appointments.map((a) => ({
        start: new Date(a.start_at).getTime(),
        end: new Date(a.end_at).getTime(),
      }));
    }
  } catch {
    // Sem conectividade de appointments
  }

  const slots: string[] = [];
  const now = new Date();

  // Das 09:00 às 19:00 (Horário de Brasília)
  const openingHour = 9;
  const closingHour = 19;
  const stepMinutes = 30;

  for (let hour = openingHour; hour < closingHour; hour++) {
    for (let minute = 0; minute < 60; minute += stepMinutes) {
      const hourPadded = String(hour).padStart(2, '0');
      const minPadded = String(minute).padStart(2, '0');

      // Slot explícito no fuso horário de Brasília (-03:00)
      const slotIsoBR = `${dateString}T${hourPadded}:${minPadded}:00-03:00`;
      const slotStart = new Date(slotIsoBR);
      const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

      // Não pode ultrapassar o horário de fechamento (19h em Brasília)
      const dayClosing = new Date(`${dateString}T${closingHour}:00:00-03:00`);
      if (slotEnd.getTime() > dayClosing.getTime()) {
        continue;
      }

      // Slot deve estar no futuro caso seja a data de hoje
      if (slotStart.getTime() <= now.getTime()) {
        continue;
      }

      // Checar sobreposição com intervalos ocupados
      const startMs = slotStart.getTime();
      const endMs = slotEnd.getTime();

      const hasConflict = occupiedIntervals.some((occ) => startMs < occ.end && endMs > occ.start);

      if (!hasConflict) {
        slots.push(slotStart.toISOString());
      }
    }
  }

  return slots;
}
