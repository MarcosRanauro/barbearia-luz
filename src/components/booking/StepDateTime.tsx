'use client';

import { useState, useEffect, useTransition } from 'react';
import { fetchAvailableSlots } from '@/lib/actions/booking';

interface StepDateTimeProps {
  barberId: string;
  totalDurationMinutes: number;
  selectedDate: string; // YYYY-MM-DD
  selectedSlotTime: string; // ISO
  onSelectDate: (date: string) => void;
  onSelectSlotTime: (slotTime: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDateTime({
  barberId,
  totalDurationMinutes,
  selectedDate,
  selectedSlotTime,
  onSelectDate,
  onSelectSlotTime,
  onNext,
  onBack,
}: StepDateTimeProps) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // Gerar os próximos 14 dias úteis (Segunda a Sábado)
  const daysList = getNextWorkingDays(14);
  const activeDate = selectedDate || (daysList[0]?.dateString ?? '');

  // Carregar slots disponíveis sempre que mudar a data ativa ou o barbeiro
  useEffect(() => {
    if (!activeDate || !barberId) return;

    let isMounted = true;

    startTransition(async () => {
      try {
        const slots = await fetchAvailableSlots(barberId, activeDate, totalDurationMinutes || 30);
        if (isMounted) {
          setAvailableSlots(slots);
        }
      } catch (err) {
        console.error('Erro ao buscar slots:', err);
        if (isMounted) {
          setAvailableSlots([]);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeDate, barberId, totalDurationMinutes]);

  const handleDayClick = (dateString: string) => {
    onSelectDate(dateString);
    onSelectSlotTime('');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Data e Horário
        </h2>
        <p className="mt-1 text-sm text-neutral-400 font-light">
          Atendimento de Segunda a Sábado das 09h às 19h no Bairro da Luz. Escolha seu melhor momento:
        </p>
      </div>

      {/* 1. Carrossel/Lista de Dias Disponíveis */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
          1. Escolha o Dia
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {daysList.map((day) => {
            const isSelected = activeDate === day.dateString;

            return (
              <button
                key={day.dateString}
                type="button"
                onClick={() => handleDayClick(day.dateString)}
                className={`p-3 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-amber-500 border-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider ${
                    isSelected ? 'text-neutral-950' : 'text-neutral-400'
                  }`}
                >
                  {day.weekdayShort}
                </span>
                <span className="text-lg font-black my-0.5">{day.dayNumber}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? 'text-neutral-950' : 'text-neutral-500'
                  }`}
                >
                  {day.monthShort}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Grid de Horários do Dia */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            2. Horários Livres (09h às 19h)
          </label>
          <span className="text-[11px] text-neutral-500">
            {isPending
              ? 'Verificando agenda...'
              : `${availableSlots.length} horários disponíveis`}
          </span>
        </div>

        {isPending ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800">
            <div className="inline-block w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-neutral-400">Consultando disponibilidade em tempo real no Supabase...</p>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800">
            <p className="text-sm font-semibold text-neutral-300">
              Não há horários disponíveis para a data selecionada.
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Todos os slots foram preenchidos ou o expediente já se encerrou. Por favor, escolha outro dia acima.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {availableSlots.map((slotIso) => {
              const isSelected = selectedSlotTime === slotIso;
              const dateObj = new Date(slotIso);
              const timeFormatted = dateObj.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <button
                  key={slotIso}
                  type="button"
                  onClick={() => onSelectSlotTime(slotIso)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 border-amber-500 text-neutral-950 shadow-md shadow-amber-500/25 scale-[1.03]'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-amber-500/50 hover:bg-neutral-800/80'
                  }`}
                >
                  {timeFormatted}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs sm:text-sm font-bold border border-neutral-800 transition-colors"
        >
          ← Voltar aos Serviços
        </button>

        <button
          type="button"
          disabled={!selectedSlotTime}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
        >
          <span>Avançar para Seus Dados</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * Função utilitária para gerar os próximos N dias úteis da barbearia (Segunda a Sábado)
 */
function getNextWorkingDays(count: number) {
  const days: {
    dateString: string;
    dayNumber: number;
    weekdayShort: string;
    monthShort: string;
  }[] = [];

  const now = new Date();
  const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  while (days.length < count) {
    const dayOfWeek = candidate.getDay(); // 0 = Domingo
    if (dayOfWeek !== 0) {
      const year = candidate.getFullYear();
      const month = String(candidate.getMonth() + 1).padStart(2, '0');
      const day = String(candidate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;

      const weekdayShort = candidate.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      const monthShort = candidate.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

      days.push({
        dateString,
        dayNumber: candidate.getDate(),
        weekdayShort,
        monthShort,
      });
    }
    candidate.setDate(candidate.getDate() + 1);
  }

  return days;
}
