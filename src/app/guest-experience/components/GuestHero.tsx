'use client';

import React, { useEffect, useRef, useState } from 'react';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function GuestHero() {
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const sectionRef = useRef<HTMLElement>(null);

  const copy = {
    en: {
      eyebrow: 'Kuriftu Smart Guest Experience',
      title: 'Your personal AI',
      titleAccent: 'concierge',
      titleEnd: 'at Kuriftu.',
      sub: 'Personalized itineraries, lakeside experiences, and real-time recommendations — in Amharic or English. Available 24/7, even offline.',
      cta1: 'Chat with AI Concierge',
      cta2: 'Build My Itinerary'
    },
    am: {
      eyebrow: 'ኩሪፍቱ ስማርት እንግዳ ልምድ',
      title: 'የእርስዎ ግላዊ AI',
      titleAccent: 'ኮንሲርጅ',
      titleEnd: 'በኩሪፍቱ።',
      sub: 'ግላዊ የጉዞ መርሃ ግብሮች፣ የሐይቅ ዳርቻ ልምዶች እና የቀጥታ ምክሮች — በአማርኛ ወይም በእንግሊዝኛ። 24/7 ይገኛል።',
      cta1: 'AI ኮንሲርጅ ጋር ያውሩ',
      cta2: 'የጉዞ መርሃ ግብሬን ይገንቡ'
    }
  };

  const t = copy[lang];

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-28 pb-16 overflow-hidden wireframe-bg noise-overlay">
      {/* Blobs */}
      <div className="absolute top-16 right-[-8%] w-96 h-96 bg-accent/6 blob-animate pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-72 h-72 bg-primary/6 blob-animate-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Language Toggle + Eyebrow */}
            <div className="flex items-center gap-3 mb-7 scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-white border border-resort-border rounded-full px-4 py-2">
                <Icon name="SparklesIcon" size={13} variant="solid" className="text-accent" />
                <span className="text-xs font-700 text-resort-foreground uppercase tracking-widest">{t.eyebrow}</span>
              </div>
              {/* Language Toggle */}
              <div className="lang-toggle flex">
                <button
                  onClick={() => setLang('en')}
                  className={`lang-btn ${lang === 'en' ? 'active' : 'text-resort-muted'}`}>
                  EN
                </button>
                <button
                  onClick={() => setLang('am')}
                  className={`lang-btn ${lang === 'am' ? 'active' : 'text-resort-muted'}`}>
                  አማ
                </button>
              </div>
            </div>

            <h1 className="font-display font-800 text-hero text-resort-foreground mb-5 scroll-reveal scroll-reveal-delay-1">
              <span className="block">{t.title}</span>
              <span className="block text-primary italic font-300">{t.titleAccent}</span>
              <span className="block">{t.titleEnd}</span>
            </h1>

            <p className="text-base sm:text-lg text-resort-muted font-500 leading-relaxed mb-8 max-w-lg scroll-reveal scroll-reveal-delay-2">
              {t.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 scroll-reveal scroll-reveal-delay-3">
              <a
                href="#concierge"
                className="inline-flex items-center justify-center gap-2.5 bg-primary text-white px-7 py-4 rounded-2xl font-700 text-sm hover:scale-105 hover:bg-primary-light transition-all shadow-premium">
                <Icon name="ChatBubbleLeftRightIcon" size={17} />
                {t.cta1}
              </a>
              <a
                href="#itinerary"
                className="inline-flex items-center justify-center gap-2.5 bg-white border-2 border-resort-border text-resort-foreground px-7 py-4 rounded-2xl font-700 text-sm hover:border-primary/30 hover:bg-primary-50 transition-all">
                <Icon name="MapIcon" size={17} />
                {t.cta2}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mt-8 scroll-reveal scroll-reveal-delay-4">
              {[
              { icon: 'LanguageIcon', label: lang === 'en' ? 'Amharic + English' : 'አማርኛ + እንግሊዝኛ' },
              { icon: 'WifiIcon', label: lang === 'en' ? 'Works Offline' : 'ያለ ኢንተርኔት' },
              { icon: 'ClockIcon', label: lang === 'en' ? '24/7 Available' : '24/7 ይገኛል' }].
              map((b) =>
              <div key={b.label} className="inline-flex items-center gap-1.5 text-xs font-600 text-resort-muted bg-white border border-resort-border rounded-full px-3 py-1.5">
                  <Icon name={b.icon as any} size={13} className="text-primary" />
                  {b.label}
                </div>
              )}
            </div>
          </div>

          {/* Right Visual */}
          <div className="scroll-reveal scroll-reveal-delay-2">
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-[32px] overflow-hidden shadow-premium aspect-[4/5] relative">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_179e1fa60-1774976181083.png"
                  alt="Guest enjoying Ethiopian coffee ceremony at Kuriftu Resort with traditional lakeside setting"
                  fill
                  className="object-cover"
                  priority />
                
                <div className="absolute inset-0 bg-gradient-to-t from-resort-dark/60 via-transparent to-transparent" />

                {/* Overlay Chat Bubble */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card-dark p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Icon name="SparklesIcon" size={14} variant="solid" className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-700 text-accent mb-1">Kuriftu AI Concierge</p>
                        <p className="text-xs text-white/80 font-500 leading-relaxed">
                          Good morning, Mekdes! ☀️ Today I recommend a sunrise boat ride on Lake Bishoftu at 6:30am — calm waters and stunning views. Shall I book it?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat */}
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl p-4 shadow-card border border-resort-border">
                <p className="text-xs font-700 text-resort-muted uppercase tracking-wider mb-1">Satisfaction</p>
                <p className="font-display font-800 text-2xl text-resort-foreground">4.9★</p>
                <p className="text-[10px] text-primary font-600">↑ AI-personalized</p>
              </div>

              {/* Floating Language Pill */}
              <div className="absolute -bottom-4 -left-4 bg-primary text-white rounded-xl px-4 py-2.5 shadow-premium">
                <p className="text-xs font-700">ሰላም! 🇪🇹</p>
                <p className="text-[10px] opacity-70">Amharic AI Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}