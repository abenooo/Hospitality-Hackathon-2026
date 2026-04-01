'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const STATS = [
{ value: '+34%', label: 'Revenue Lift', color: 'bg-primary text-white', rotate: 'tile-rotate-neg' },
{ value: '91%', label: 'Occupancy AI', color: 'bg-accent text-white', rotate: 'tile-rotate-pos' },
{ value: '2.4s', label: 'AI Response', color: 'bg-resort-dark text-white', rotate: 'tile-rotate-neg-sm' }];


const TYPING_PHRASES = [
'Predict bookings 30 days out.',
'Auto-adjust room pricing.',
'Greet guests in Amharic.',
'Maximize lakeside experiences.',
'Prevent cancellations early.'];


export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  // Typing animation
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < phrase.length) {
      timeout = setTimeout(() => setTypedText(phrase.slice(0, typedText.length + 1)), 55);
    } else if (!isDeleting && typedText.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => setTypedText(phrase.slice(0, typedText.length - 1)), 28);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIdx]);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!tilesRef.current) return;
      const y = window.scrollY;
      tilesRef.current.style.transform = `translateY(${y * 0.12}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
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
      className="relative min-h-screen pt-28 pb-16 overflow-hidden wireframe-bg noise-overlay">
      
      {/* Atmospheric blobs */}
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-primary/8 blob-animate pointer-events-none" />
      <div className="absolute bottom-10 right-[-8%] w-[400px] h-[400px] bg-accent/6 blob-animate-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Eyebrow */}
        <div className="flex justify-center mb-8 scroll-reveal">
          <div className="inline-flex items-center gap-2.5 bg-white border border-resort-border rounded-full px-5 py-2.5 shadow-soft">
            <span className="status-live">
              <span className="status-dot" />
              <span className="text-xs font-700 text-primary uppercase tracking-widest">Live Intelligence</span>
            </span>
            <span className="w-px h-4 bg-resort-border" />
            <span className="text-xs font-600 text-resort-muted">Kuriftu Resorts AI · Ethiopia</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center mb-8 scroll-reveal scroll-reveal-delay-1">
          <h1 className="font-display font-800 text-hero text-resort-foreground mb-0 leading-none">
            <span className="block">Where Ethiopia&apos;s</span>
            <span className="block text-primary italic font-300">Finest Hospitality</span>
            <span className="block">Meets AI Intelligence</span>
          </h1>
        </div>

        {/* Typing Subheadline */}
        <div className="text-center mb-10 scroll-reveal scroll-reveal-delay-2">
          <p className="text-lg sm:text-xl text-resort-muted font-500 max-w-2xl mx-auto leading-relaxed mb-3">
            Kuriftu Resorts — powered by AI to deliver extraordinary lakeside experiences across Ethiopia.
          </p>
          <div className="inline-flex items-center gap-1 text-lg sm:text-xl font-700 text-primary">
            <span>{typedText}</span>
            <span className="typing-cursor" />
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 scroll-reveal scroll-reveal-delay-3">
          <Link
            href="/operator-dashboard"
            className="inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-2xl font-700 text-base hover:scale-105 hover:bg-primary-light transition-all shadow-premium">
            
            <Icon name="ChartBarIcon" size={18} variant="solid" />
            See Live Dashboard
          </Link>
          <Link
            href="/guest-experience"
            className="inline-flex items-center gap-2.5 bg-white border-2 border-resort-border text-resort-foreground px-8 py-4 rounded-2xl font-700 text-base hover:border-primary/30 hover:bg-primary-50 transition-all">
            
            <Icon name="ChatBubbleLeftRightIcon" size={18} />
            Try Guest AI
          </Link>
        </div>

        {/* Tile Grid — Premium Hero Visual */}
        <div ref={tilesRef} className="scroll-reveal scroll-reveal-delay-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
            {/* Image Tile 1 */}
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl tile-rotate-pos hover-lift">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_11ab3a9db-1772249665560.png"
                alt="Luxury Kuriftu Resort pool surrounded by lush Ethiopian landscape at sunset"
                fill
                className="object-cover" />
              
            </div>

            {/* Stat Tile — Revenue */}
            <div className="bg-primary text-white p-7 rounded-3xl flex flex-col justify-between text-left tile-rotate-neg shadow-premium hover-lift min-h-[200px]">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center mb-4">
                <Icon name="CurrencyDollarIcon" size={22} className="text-white" variant="solid" />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-display font-800">+34%</p>
                <p className="text-[11px] font-700 uppercase tracking-widest opacity-60 mt-1">Revenue Lift</p>
              </div>
            </div>

            {/* Image Tile 2 — center, taller */}
            <div className="row-span-1 sm:row-span-1 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl tile-rotate-pos-sm hover-lift">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1f7056520-1772060950888.png"
                alt="Kuriftu Resort hotel lobby with elegant interior design and warm lighting"
                fill
                className="object-cover" />
              
            </div>

            {/* Stat Tile — Occupancy */}
            <div className="bg-accent text-white p-7 rounded-3xl flex flex-col justify-between text-left tile-rotate-neg-sm shadow-gold hover-lift min-h-[200px]">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center mb-4">
                <Icon name="HomeModernIcon" size={22} className="text-white" variant="solid" />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-display font-800">91%</p>
                <p className="text-[11px] font-700 uppercase tracking-widest opacity-60 mt-1">Peak Occupancy</p>
              </div>
            </div>

            {/* Image Tile 3 — hidden on small */}
            <div className="hidden lg:block aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl tile-rotate-pos-lg hover-lift">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_19a2b6b03-1775030067940.png"
                alt="Panoramic view of Ethiopian lake from Kuriftu Resort terrace at golden hour"
                fill
                className="object-cover" />
              
            </div>
          </div>

          {/* Dashboard Mockup Float */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-[2.5rem] blur-2xl -z-10 scale-95" />
            <div className="glass-card p-3 sm:p-4 shadow-premium hover-lift">
              <div className="bg-resort-dark rounded-[1.5rem] overflow-hidden">
                {/* Mockup Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex items-center gap-2 bg-white/8 rounded-full px-4 py-1.5">
                    <span className="status-dot" />
                    <span className="text-[11px] font-600 text-white/70">Kuriftu Resorts Intelligence · Live</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="offline-badge">Offline-Ready</span>
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="grid grid-cols-3 gap-3 p-4 sm:p-5">
                  <div className="col-span-2 bg-white/6 rounded-2xl p-4">
                    <p className="text-[11px] font-700 text-white/40 uppercase tracking-widest mb-3">7-Day Revenue Forecast · ETB</p>
                    <div className="flex items-end gap-2 h-20">
                      {[55, 70, 62, 85, 78, 91, 88].map((h, i) =>
                      <div
                        key={i}
                        className="flex-1 rounded-t-md transition-all duration-500"
                        style={{
                          height: `${h}%`,
                          background: i === 5 ? '#E8A020' : `rgba(26, 107, 74, ${0.4 + i * 0.08})`
                        }} />

                      )}
                    </div>
                    <div className="flex justify-between mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) =>
                      <span key={d} className="text-[9px] text-white/30 font-600">{d}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="bg-primary/30 rounded-xl p-3 flex-1">
                      <p className="text-[10px] text-white/40 font-600 uppercase tracking-wider mb-1">AI Alert</p>
                      <p className="text-xs text-white font-600 leading-snug">Raise weekend rate +18% — demand spike detected</p>
                    </div>
                    <div className="bg-accent/20 rounded-xl p-3 flex-1">
                      <p className="text-[10px] text-white/40 font-600 uppercase tracking-wider mb-1">Occupancy</p>
                      <p className="text-2xl font-display font-800 text-white">91%</p>
                      <p className="text-[10px] text-accent font-600">↑ +12% vs last week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}