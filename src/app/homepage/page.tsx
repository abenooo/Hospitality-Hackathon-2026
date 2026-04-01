import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import HeroSection from './components/HeroSection';
import ModulesBentoSection from './components/ModulesBentoSection';
import RevenueImpactSection from './components/RevenueImpactSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-resort-bg">
      <Header />
      <HeroSection />
      <ModulesBentoSection />
      <RevenueImpactSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}