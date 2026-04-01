import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import GuestHero from './components/GuestHero';
import AIConciergeChat from './components/AIConciergeChat';
import ItineraryBuilder from './components/ItineraryBuilder';
import LocalExperiences from './components/LocalExperiences';
import StayTimeline from './components/StayTimeline';

export default function GuestExperience() {
  return (
    <main className="min-h-screen bg-resort-bg">
      <Header />
      <GuestHero />
      <AIConciergeChat />
      <ItineraryBuilder />
      <LocalExperiences />
      <StayTimeline />
      <Footer />
    </main>
  );
}