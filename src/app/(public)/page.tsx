import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { BarbersSection } from '@/components/landing/BarbersSection';
import { TattooStudioSection } from '@/components/landing/TattooStudioSection';
import { LocationSection } from '@/components/landing/LocationSection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BarbersSection />
        <TattooStudioSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
