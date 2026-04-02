'use client';

import React, { useEffect, useRef } from 'react';

export default function ChallengeSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.12 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-b border-resort-border bg-white py-14 lg:py-16"
    >
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <p className="scroll-reveal mb-3 text-xs font-700 uppercase tracking-widest text-primary">
          Hospitality Hackathon 2026 · Ethiopia
        </p>
        <h2 className="scroll-reveal scroll-reveal-delay-1 font-display text-2xl font-800 text-resort-foreground sm:text-3xl">
          Problem we&apos;re solving
        </h2>
        <p className="scroll-reveal scroll-reveal-delay-2 mt-4 text-base font-500 leading-relaxed text-resort-muted">
          Design and prototype an <strong className="font-700 text-resort-foreground">AI-powered solution</strong> that
          transforms how a resort <strong className="font-700 text-resort-foreground">operates</strong>,{' '}
          <strong className="font-700 text-resort-foreground">serves guests</strong>, or{' '}
          <strong className="font-700 text-resort-foreground">generates revenue</strong> — using AI and ML for Ethiopian
          hospitality.
        </p>
      </div>
    </section>
  );
}
