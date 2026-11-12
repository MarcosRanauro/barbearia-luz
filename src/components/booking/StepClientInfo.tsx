'use client';

import { findBarber } from '@/data/barbers';
import { SERVICES_CATALOG } from '@/data/services';
import { formatDuration, formatPrice } from '@/lib/utils/formatters';

interface StepClientInfoProps {
  barberId: string;
  serviceIds: string[];
  slotTime: string; // ISO
  clientName: string;
  clientPhone: string;
  notes: string;
  isSubmitting: boolean;
  errorMessage?: string;
  onChangeName: (name: string) => void;
  onChangePhone: (phone: string) => void;
  onChangeNotes: (notes: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function StepClientInfo({
  barberId,
  serviceIds,
  slotTime,
  clientName,
  clientPhone,
  notes,
  isSubmitting,
  errorMessage,
  onChangeName,
  onChangePhone,
  onChangeNotes,
  onSubmit,
  onBack,
}: StepClientInfoProps) {
  const barber = findBarber(barberId);
  const selectedServices = SERVICES_CATALOG.filter((s) => serviceIds.includes(s.id));
  const totalPriceCents = selectedServices.reduce((acc, s) => acc + s.price_cents, 0);
  const totalDurationMinutes = selectedServices.reduce((acc, s) => acc + s.duration_minutes, 0);

  const slotDate = slotTime ? new Date(slotTime) : null;
  const formattedDate = slotDate
    ? slotDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
      })
    : '';
  const formattedTime = slotDate
    ? slotDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  // Máscara ao digitar o telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    onChangePhone(value);
  };

  const isFormValid = clientName.trim().length >= 3 && clientPhone.replace(/\D/g, '').length >= 10;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Revise e Confirme sua Reserva
        </h2>
        <p className="mt-1 text-sm text-neutral-400 font-light">
          Informe seus dados de contato para enviarmos a confirmação instantânea:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário do Cliente (7 colunas) */}
        <div className="lg:col-span-7 space-y-5 p-6 sm:p-7 rounded-2xl bg-neutral-900/80 border border-neutral-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Dados para Confirmação
          </h3>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs sm:text-sm font-medium flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Nome Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Carlos Eduardo"
              value={clientName}
              onChange={(e) => onChangeName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              WhatsApp (com DDD) *
            </label>
            <input
              type="tel"
              required
              placeholder="(21) 99999-0000"
              value={clientPhone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Enviaremos o lembrete de comparecimento diretamente no seu WhatsApp.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Observações (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Prefiro tesoura no topo, barba bem alinhada..."
              value={notes}
              onChange={(e) => onChangeNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onBack}
              className="px-5 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs sm:text-sm font-semibold border border-neutral-800 transition-colors"
            >
              ← Alterar Data
            </button>

            <button
              type="button"
              disabled={!isFormValid || isSubmitting}
              onClick={onSubmit}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Garantindo Slot...</span>
                </>
              ) : (
                <>
                  <span>Confirmar Agendamento</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card de Resumo da Reserva (5 colunas) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
          <div className="border-b border-neutral-800 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
              Resumo do Atendimento
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">Barbearia Luz</h4>
            <p className="text-xs text-neutral-400">Rua Barão de São Félix, Bairro da Luz — Nova Iguaçu</p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Barbeiro */}
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Profissional</span>
              <span className="text-white font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {barber?.nickname ?? 'Barbeiro da Casa'}
              </span>
            </div>

            {/* Data e Horário */}
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Horário Marcado</span>
              <span className="text-amber-300 font-extrabold capitalize">
                {formattedDate} às {formattedTime}
              </span>
            </div>

            {/* Duração Estimada */}
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Tempo de Sessão</span>
              <span className="text-neutral-200 font-medium">
                {formatDuration(totalDurationMinutes)}
              </span>
            </div>
          </div>

          {/* Serviços Listados */}
          <div className="border-t border-neutral-800 pt-3">
            <span className="text-xs font-semibold text-neutral-400 block mb-2">
              Serviços Selecionados:
            </span>
            <div className="space-y-1.5">
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center text-xs">
                  <span className="text-neutral-300">{service.name}</span>
                  <span className="text-neutral-400 font-semibold">{formatPrice(service.price_cents)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Valor Total */}
          <div className="border-t border-neutral-800 pt-4 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-neutral-400 block">Total a Pagar</span>
              <span className="text-[10px] text-neutral-500">Pagamento presencial (Pix/Cartão/Dinheiro)</span>
            </div>
            <span className="text-2xl font-black text-amber-400">
              {formatPrice(totalPriceCents)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
