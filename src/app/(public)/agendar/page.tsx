import { Suspense } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { BookingFlow } from '@/components/booking/BookingFlow';

export default function AgendarPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Suspense
          fallback={
            <div className="w-full py-24 text-center">
              <div className="inline-block w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm text-neutral-400">Carregando fluxo de agendamento...</p>
            </div>
          }
        >
          <BookingFlow />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
