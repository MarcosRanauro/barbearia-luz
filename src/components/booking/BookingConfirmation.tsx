import Link from 'next/link';
import { formatDuration, formatPhone, formatPrice } from '@/lib/utils/formatters';

interface BookingConfirmationProps {
  data: {
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
  onNewBooking?: () => void;
}

export function BookingConfirmation({ data, onNewBooking }: BookingConfirmationProps) {
  const startDate = new Date(data.startAt);
  const endDate = new Date(data.endAt);

  const formattedDate = startDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const formattedStartTime = startDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedEndTime = endDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Mensagem pré-formatada para o WhatsApp da Barbearia
  const whatsappMessage = encodeURIComponent(
    `*Confirmação de Agendamento - Barbearia Luz*\n\n` +
      `*Cliente:* ${data.clientName}\n` +
      `*Profissional:* ${data.barberName}\n` +
      `*Data:* ${formattedDate}\n` +
      `*Horário:* ${formattedStartTime} às ${formattedEndTime}\n` +
      `*Serviços:* ${data.servicesNames.join(', ')}\n` +
      `*Valor Total:* ${formatPrice(data.totalPriceCents)}\n` +
      `*Código:* ${data.appointmentId.slice(0, 8).toUpperCase()}\n\n` +
      `Gostaria de confirmar minha reserva! 💈`
  );

  const whatsappUrl = `https://wa.me/5521980134488?text=${whatsappMessage}`;

  return (
    <div className="max-w-2xl mx-auto py-8 text-center space-y-8">
      {/* Ícone de Sucesso */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 shadow-xl shadow-emerald-500/10 animate-bounce">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div>
        <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Agendamento Confirmado!
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
          Tudo Pronto para Cuidar do Seu Estilo
        </h2>
        <p className="mt-2 text-sm text-neutral-400 max-w-md mx-auto font-light">
          Seu horário foi garantido com sucesso no banco de dados. Enviamos os detalhes abaixo:
        </p>
      </div>

      {/* Cartão de Resumo Oficial */}
      <div className="p-7 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 text-left space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
              Comprovante de Reserva
            </span>
            <h3 className="text-base font-bold text-white">Barbearia Luz — Bairro da Luz</h3>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            #{data.appointmentId.slice(0, 8).toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-neutral-500 block text-[11px]">Cliente</span>
            <span className="text-white font-bold">{data.clientName}</span>
            <span className="text-neutral-400 block">{formatPhone(data.clientPhone)}</span>
          </div>

          <div>
            <span className="text-neutral-500 block text-[11px]">Profissional</span>
            <span className="text-amber-400 font-bold">{data.barberName}</span>
          </div>

          <div>
            <span className="text-neutral-500 block text-[11px]">Data</span>
            <span className="text-neutral-200 font-semibold capitalize">{formattedDate}</span>
          </div>

          <div>
            <span className="text-neutral-500 block text-[11px]">Horário</span>
            <span className="text-neutral-200 font-semibold">
              {formattedStartTime} às {formattedEndTime} ({formatDuration(data.totalDurationMinutes)})
            </span>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-3">
          <span className="text-neutral-500 block text-[11px] mb-1.5">Procedimentos Selecionados</span>
          <div className="flex flex-wrap gap-1.5">
            {data.servicesNames.map((name) => (
              <span
                key={name}
                className="text-xs px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-200 border border-neutral-700/60 font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-3 flex items-center justify-between">
          <span className="text-xs text-neutral-400">Total a Pagar no Local</span>
          <span className="text-xl font-black text-amber-400">
            {formatPrice(data.totalPriceCents)}
          </span>
        </div>

        <div className="bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-800/70 text-xs text-neutral-400 leading-relaxed">
          📍 <strong>Endereço:</strong> Rua Barão de São Félix, Bairro da Luz — Nova Iguaçu, RJ.<br />
          ❄️ Ambiente climatizado com chopp e café cortesia. Chegue com 5 minutos de antecedência.
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 font-black text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 2.22.723 4.27 1.95 5.945L2 22l4.172-1.914c1.61.94 3.484 1.484 5.859 1.484 5.531 0 10.031-4.5 10.031-10.031C22.062 6.5 17.562 2 12.031 2zm0 18.062c-1.922 0-3.664-.531-5.188-1.469l-.375-.227-2.734 1.25.75-2.656-.242-.391a8.12 8.12 0 01-1.242-4.569c0-4.47 3.633-8.102 8.102-8.102 4.469 0 8.102 3.633 8.102 8.102 0 4.47-3.633 8.055-8.172 8.055z" />
          </svg>
          <span>Enviar confirmação no WhatsApp da Barbearia</span>
        </a>

        {onNewBooking ? (
          <button
            type="button"
            onClick={onNewBooking}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-sm border border-neutral-800 transition-colors"
          >
            Fazer Outro Agendamento
          </button>
        ) : (
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-sm border border-neutral-800 transition-colors"
          >
            Voltar para a Página Inicial
          </Link>
        )}
      </div>
    </div>
  );
}
