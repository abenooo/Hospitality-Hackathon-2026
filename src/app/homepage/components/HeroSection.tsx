'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const TYPING_PHRASES = [
  'Smarter pricing for every season.',
  'Guests assisted in Amharic and English.',
  'Operators see demand before it peaks.',
];

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < phrase.length) {
      timeout = setTimeout(() => setTypedText(phrase.slice(0, typedText.length + 1)), 50);
    } else if (!isDeleting && typedText.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => setTypedText(phrase.slice(0, typedText.length - 1)), 28);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIdx]);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.15 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pb-16 pt-28 wireframe-bg noise-overlay"
    >
      <div className="pointer-events-none absolute left-[-10%] top-20 h-[420px] w-[420px] bg-primary/8 blob-animate" />
      <div className="pointer-events-none absolute bottom-0 right-[-8%] h-[360px] w-[360px] bg-accent/6 blob-animate-2" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6">
        <div className="mb-8 flex justify-center scroll-reveal">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-resort-border bg-white px-5 py-2.5 shadow-soft">
            <span className="status-dot" />
            <span className="text-xs font-700 uppercase tracking-widest text-primary">Prototype</span>
            <span className="h-4 w-px bg-resort-border" />
            <span className="text-xs font-600 text-resort-muted">Kuriftu Resorts · Ethiopia</span>
          </div>
        </div>

        <div className="mb-6 scroll-reveal scroll-reveal-delay-1 text-center">
          <h1 className="font-display text-hero font-800 leading-tight text-resort-foreground">
            <span className="block">AI for operations,</span>
            <span className="block text-primary italic font-300">guest experience,</span>
            <span className="block">and revenue.</span>
          </h1>
        </div>

        <div className="mb-10 scroll-reveal scroll-reveal-delay-2 text-center">
          <p className="mx-auto max-w-2xl text-lg font-500 leading-relaxed text-resort-muted sm:text-xl">
            A hackathon concept: use artificial intelligence and machine learning to help Ethiopian resorts run better,
            serve guests smarter, and grow sustainable revenue.
          </p>
          <div className="mt-5 inline-flex items-center gap-1 text-lg font-700 text-primary sm:text-xl">
            <span>{typedText}</span>
            <span className="typing-cursor inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
          </div>
        </div>

        <div className="flex scroll-reveal scroll-reveal-delay-3 flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/operator-dashboard"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-primary px-8 py-4 text-base font-700 text-white shadow-premium transition-all hover:scale-[1.02] hover:bg-primary-light"
          >
            <Icon name="ChartBarIcon" size={18} variant="solid" />
            Operator demo
          </Link>
          <Link
            href="/guest-experience"
            className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-resort-border bg-white px-8 py-4 text-base font-700 text-resort-foreground transition-all hover:border-primary/30 hover:bg-primary-50"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={18} />
            Guest experience demo
          </Link>
        </div>
      </div>
    </section>
  );
}
