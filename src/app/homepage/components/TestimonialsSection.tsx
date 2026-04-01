'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const TESTIMONIALS = [
{
  quote: "Kuriftu's AI predicted a 40% drop in bookings three weeks before the rainy season. We adjusted pricing and ran targeted promotions — best low-season revenue we have ever recorded.",
  author: "Yohannes Tadesse",
  role: "General Manager",
  company: "Kuriftu Resort & Spa, Bishoftu",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12eebc9ab-1775030068433.png",
  metric: "+28% low-season revenue"
},
{
  quote: "The Amharic AI concierge transformed our guest experience. Visitors get personalized recommendations for boat rides, spa treatments, and cultural events — in their own language.",
  author: "Mekdes Alemu",
  role: "Guest Experience Director",
  company: "Kuriftu Resort & Spa, Entoto",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14cbf6c62-1775030066363.png",
  metric: "4.9★ guest satisfaction"
},
{
  quote: "We manage multiple Kuriftu properties across Ethiopia. Before the AI layer, coordinating pricing was a challenge. Now it's automated and revenue is up 34% across the portfolio.",
  author: "Dawit Bekele",
  role: "Resort Portfolio Director",
  company: "Kuriftu Resorts Group",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png",
  metric: "+34% portfolio revenue"
}];


export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIdx(next);
      setAnimating(false);
    }, 300);
  };

  const handleNext = () => goTo((idx + 1) % TESTIMONIALS.length);

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 6000);
    return () => {if (intervalRef.current) clearInterval(intervalRef.current);};
  }, [idx]);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-resort-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12 scroll-reveal">
          <p className="text-xs font-700 uppercase tracking-widest text-primary mb-3">Guest Stories</p>
          <h2 className="font-display font-800 text-section-title text-resort-foreground">
            Trusted by Guests &amp; Operators<br />
            <span className="text-primary italic font-300">Across Kuriftu Properties.</span>
          </h2>
        </div>

        {/* Main Testimonial Block */}
        <div className="bg-resort-dark rounded-[40px] p-8 sm:p-12 lg:p-16 relative overflow-hidden noise-overlay scroll-reveal">
          {/* Blobs */}
          <div className="absolute top-[-15%] right-[-5%] w-80 h-80 bg-primary/20 blob-animate pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-60 h-60 bg-accent/10 blob-animate-2 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Quote */}
            <div>
              {/* Avatar stack */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-3">
                  {TESTIMONIALS.map((testimonial, i) =>
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-resort-dark overflow-hidden transition-all duration-300 ${
                    i === idx ? 'scale-125 z-10 border-accent' : 'opacity-50'}`
                    }>
                    
                      <AppImage
                      src={testimonial.avatar}
                      alt={`Portrait of ${testimonial.author}`}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full" />
                    
                    </div>
                  )}
                </div>
                <span className="text-xs font-600 text-white/40 uppercase tracking-widest">
                  {idx + 1} / {TESTIMONIALS.length}
                </span>
              </div>

              <blockquote
                className={`text-xl sm:text-2xl font-300 text-white leading-relaxed italic mb-8 transition-all duration-300 ${
                animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`
                }>
                
                "{t.quote}"
              </blockquote>

              <div className={`transition-all duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
                <p className="font-700 text-accent uppercase tracking-widest text-sm">{t.author}</p>
                <p className="text-xs text-white/40 font-600 uppercase tracking-[0.3em] mt-1">{t.role} · {t.company}</p>
              </div>
            </div>

            {/* Metric + Controls */}
            <div className="flex flex-col justify-between gap-8">
              {/* Metric Card */}
              <div
                className={`bg-white/6 border border-white/10 rounded-2xl p-7 transition-all duration-300 ${
                animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`
                }>
                
                <Icon name="TrophyIcon" size={28} variant="solid" className="text-accent mb-4" />
                <p className="font-display font-800 text-3xl text-white mb-2">{t.metric}</p>
                <p className="text-sm text-white/40 font-500">Verified result after 90 days</p>
              </div>

              {/* Progress + Controls */}
              <div>
                {/* Progress Bar */}
                <div className="h-px bg-white/10 rounded-full mb-6 overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${(idx + 1) / TESTIMONIALS.length * 100}%` }} />
                  
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => goTo((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                    aria-label="Previous testimonial">
                    
                    <Icon name="ChevronLeftIcon" size={18} />
                  </button>
                  <div className="flex gap-2">
                    {TESTIMONIALS.map((_, i) =>
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`rounded-full transition-all duration-300 ${
                      i === idx ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`
                      }
                      aria-label={`Go to testimonial ${i + 1}`} />

                    )}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-11 h-11 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all"
                    aria-label="Next testimonial">
                    
                    <Icon name="ChevronRightIcon" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}