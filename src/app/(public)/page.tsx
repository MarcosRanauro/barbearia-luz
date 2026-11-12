import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { BarbersSection } from '@/components/landing/BarbersSection';
import { ReviewsSection } from '@/components/landing/ReviewsSection';
import { TattooAndAcademySection } from '@/components/landing/TattooAndAcademySection';
import { LocationSection } from '@/components/landing/LocationSection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950 font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BarbersSection />
        <ReviewsSection />
        <TattooAndAcademySection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
