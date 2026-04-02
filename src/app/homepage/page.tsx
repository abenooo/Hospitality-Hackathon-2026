import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ChallengeSection from './components/ChallengeSection';
import HeroSection from './components/HeroSection';
import ModulesBentoSection from './components/ModulesBentoSection';
import RevenueImpactSection from './components/RevenueImpactSection';
import CtaSection from './components/CtaSection';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-resort-bg">
      <Header />
      <HeroSection />
      <ChallengeSection />
      <ModulesBentoSection />
      <RevenueImpactSection />
      <CtaSection />
      <Footer />
    </main>
  );
}