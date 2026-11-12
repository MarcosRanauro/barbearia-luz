'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookingStepper } from './BookingStepper';
import { StepBarber } from './StepBarber';
import { StepServices } from './StepServices';
import { StepDateTime } from './StepDateTime';
import { StepClientInfo } from './StepClientInfo';
import { BookingConfirmation } from './BookingConfirmation';
import { createAppointment, type BookingResponse } from '@/lib/actions/booking';
import { findBarber } from '@/data/barbers';
import { SERVICES_CATALOG } from '@/data/services';

export function BookingFlow() {
  const searchParams = useSearchParams();

  // Pré-seleção inicial síncrona a partir dos searchParams
  const barberParam = searchParams.get('barbeiro') || searchParams.get('barber');
  const initialBarber = barberParam ? findBarber(barberParam)?.slug ?? '' : '';

  const serviceParam = searchParams.get('servico') || searchParams.get('service');
  const initialService = serviceParam
    ? SERVICES_CATALOG.find((s) => s.id.toLowerCase() === serviceParam.toLowerCase())
    : undefined;

  // Estados do Fluxo
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBarberId, setSelectedBarberId] = useState<string>(initialBarber);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    initialService ? [initialService.id] : []
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Estados de Submissão e Resultado
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingResponse['data'] | null>(null);

  // Alternar seleção múltipla de serviços
  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Submissão do agendamento
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await createAppointment({
        barberId: selectedBarberId,
        serviceIds: selectedServiceIds,
        startAt: selectedSlotTime,
        clientName,
        clientPhone,
        notes: notes || undefined,
      });

      if (!result.success || !result.data) {
        setErrorMessage(
          result.error ?? 'Não foi possível confirmar o agendamento. Verifique os dados e tente novamente.'
        );
        setIsSubmitting(false);
        return;
      }

      // Sucesso!
      setConfirmedBooking(result.data);
      setIsSubmitting(false);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error?.message || 'Erro inesperado ao salvar agendamento.');
      setIsSubmitting(false);
    }
  };

  // Resetar para novo agendamento
  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setCurrentStep(1);
    setSelectedBarberId('');
    setSelectedServiceIds([]);
    setSelectedDate('');
    setSelectedSlotTime('');
    setClientName('');
    setClientPhone('');
    setNotes('');
    setErrorMessage('');
  };

  // Se já tiver concluído, exibe tela de confirmação
  if (confirmedBooking) {
    return (
      <BookingConfirmation
        data={confirmedBooking}
        onNewBooking={handleResetBooking}
      />
    );
  }

  // Calcular duração total para a grade de horários
  const totalDurationMinutes = SERVICES_CATALOG.filter((s) => selectedServiceIds.includes(s.id)).reduce(
    (acc, s) => acc + s.duration_minutes,
    0
  );

  return (
    <div className="w-full">
      {/* Barra de Progresso nos 4 Passos */}
      <BookingStepper
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />

      {/* Conteúdo Dinâmico do Passo Atual */}
      <div className="mt-8 transition-all duration-300">
        {currentStep === 1 && (
          <StepBarber
            selectedBarberId={selectedBarberId}
            onSelectBarber={(barberId) => setSelectedBarberId(barberId)}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepServices
            selectedServiceIds={selectedServiceIds}
            onToggleService={handleToggleService}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepDateTime
            barberId={selectedBarberId}
            totalDurationMinutes={totalDurationMinutes || 30}
            selectedDate={selectedDate}
            selectedSlotTime={selectedSlotTime}
            onSelectDate={(date) => setSelectedDate(date)}
            onSelectSlotTime={(slot) => setSelectedSlotTime(slot)}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepClientInfo
            barberId={selectedBarberId}
            serviceIds={selectedServiceIds}
            slotTime={selectedSlotTime}
            clientName={clientName}
            clientPhone={clientPhone}
            notes={notes}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            onChangeName={(name) => setClientName(name)}
            onChangePhone={(phone) => setClientPhone(phone)}
            onChangeNotes={(val) => setNotes(val)}
            onSubmit={handleSubmitBooking}
            onBack={() => setCurrentStep(3)}
          />
        )}
      </div>
    </div>
  );
}
