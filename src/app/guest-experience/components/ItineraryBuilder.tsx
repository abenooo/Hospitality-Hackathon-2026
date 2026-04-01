'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const INTERESTS = [
{ id: 'culture', label: 'Culture & History', icon: '🏛️' },
{ id: 'nature', label: 'Nature & Hiking', icon: '🏔️' },
{ id: 'food', label: 'Food & Coffee', icon: '☕' },
{ id: 'wellness', label: 'Wellness & Spa', icon: '🧘' },
{ id: 'adventure', label: 'Adventure', icon: '🪂' },
{ id: 'local', label: 'Local Life', icon: '🎭' }];


const ITINERARIES: Record<string, {time: string;title: string;desc: string;cost: string;img: string;imgAlt: string;}[]> = {
  culture: [
  { time: '8:00am', title: 'Lalibela Rock Churches', desc: 'UNESCO World Heritage — 11 monolithic churches carved from single rocks. Guide Abebe included.', cost: '1,800 ETB', img: "https://img.rocket.new/generatedImages/rocket_gen_img_1c6283847-1770288097867.png", imgAlt: 'Ancient Lalibela rock-hewn church carved from red stone in Ethiopia' },
  { time: '1:00pm', title: 'Traditional Injera Lunch', desc: 'Authentic family-style Ethiopian lunch at Meseret restaurant in Lalibela town.', cost: '320 ETB', img: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe55e470-1766304258704.png", imgAlt: 'Traditional Ethiopian injera flatbread with colorful stews served on round tray' },
  { time: '4:00pm', title: 'Coffee Ceremony', desc: 'Traditional Buna ceremony at the resort with green coffee beans roasted over charcoal.', cost: 'Complimentary', img: "https://img.rocket.new/generatedImages/rocket_gen_img_15a516979-1772527303074.png", imgAlt: 'Traditional Ethiopian coffee ceremony with small cups and incense burning' }],

  nature: [
  { time: '5:30am', title: 'Simien Mountains Sunrise Trek', desc: 'Gelada baboon spotting and panoramic views from 3,600m. Local guide included. Light breakfast provided.', cost: '2,200 ETB', img: "https://img.rocket.new/generatedImages/rocket_gen_img_14ce41776-1768296645813.png", imgAlt: 'Dramatic Simien Mountains landscape with steep cliffs and lush valleys in Ethiopia' },
  { time: '12:00pm', title: 'Rift Valley Flamingo Walk', desc: 'Lake Langano flamingo and pelican watching with expert naturalist guide.', cost: '950 ETB', img: "https://images.unsplash.com/photo-1718019080587-65efd8e62ba9", imgAlt: 'Pink flamingos wading in shallow lake water with blue sky reflection' },
  { time: '5:00pm', title: 'Sunset at Lake Awash', desc: 'Private sundowner setup at the lake shore with local wine and snacks.', cost: '680 ETB', img: "https://images.unsplash.com/photo-1635972891208-d172a1174bb7", imgAlt: 'Golden sunset over African lake with silhouetted trees and calm water' }],

  food: [
  { time: '9:00am', title: 'Coffee Farm Visit', desc: 'Tour a local Yirgacheffe coffee farm, hand-pick beans, and roast your own batch to take home.', cost: '1,200 ETB', img: "https://images.unsplash.com/photo-1623167986766-ed47d82ff29b", imgAlt: 'Red coffee cherries growing on green coffee plant branches on a farm' },
  { time: '12:30pm', title: 'Market & Cooking Class', desc: 'Shop local spices at Merkato, then cook Doro Wat and Tibs with Chef Tigist.', cost: '1,800 ETB', img: "https://images.unsplash.com/photo-1648032031306-5eba97849ff2", imgAlt: 'Colorful spices and herbs arranged in market stalls with warm lighting' },
  { time: '7:00pm', title: 'Tej Tasting Dinner', desc: 'Traditional honey wine tasting paired with a full Ethiopian feast under the stars.', cost: '920 ETB', img: "https://images.unsplash.com/photo-1595732301236-42a26208b2fc", imgAlt: 'Elegant dinner table set outdoors at night with candles and traditional dishes' }]

};

export default function ItineraryBuilder() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['culture']);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleInterest = (id: string) => {
    setGenerated(false);
    setSelectedInterests((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1800);
  };

  const activeItinerary = selectedInterests.length > 0 ?
  ITINERARIES[selectedInterests[0]] || ITINERARIES.culture :
  ITINERARIES.culture;

  return (
    <section id="itinerary" ref={sectionRef} className="py-20 lg:py-24 bg-resort-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12 scroll-reveal">
          <p className="text-xs font-700 uppercase tracking-widest text-primary mb-3">AI Itinerary Builder</p>
          <h2 className="font-display font-800 text-section-title text-resort-foreground">
            Your perfect day,<br />
            <span className="text-primary italic font-300">crafted by AI.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Interest Selector */}
          <div className="scroll-reveal">
            <div className="soft-card p-7">
              <h3 className="text-base font-700 text-resort-foreground mb-2">What excites you most?</h3>
              <p className="text-sm text-resort-muted font-500 mb-6">Select your interests and we'll build a personalized day itinerary.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
                {INTERESTS.map((interest) =>
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-sm font-700 transition-all hover:scale-105 ${
                  selectedInterests.includes(interest.id) ?
                  'bg-primary border-primary text-white shadow-premium' :
                  'bg-white border-resort-border text-resort-foreground hover:border-primary/30'}`
                  }>
                  
                    <span className="text-2xl">{interest.icon}</span>
                    <span className="text-xs text-center leading-tight">{interest.label}</span>
                  </button>
                )}
              </div>

              {/* Duration */}
              <div className="mb-6">
                <p className="text-xs font-700 text-resort-muted uppercase tracking-wider mb-3">Trip Duration</p>
                <div className="flex gap-2">
                  {['Half Day', 'Full Day', '2 Days'].map((d) =>
                  <button
                    key={d}
                    className="flex-1 py-2.5 rounded-xl border border-resort-border text-xs font-700 text-resort-muted hover:border-primary hover:text-primary transition-all first:bg-primary first:text-white first:border-primary">
                    
                      {d}
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={generate}
                disabled={selectedInterests.length === 0 || loading}
                className="w-full flex items-center justify-center gap-2.5 bg-primary text-white py-4 rounded-2xl font-700 text-sm hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-premium">
                
                {loading ?
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    AI is crafting your itinerary...
                  </> :

                <>
                    <Icon name="SparklesIcon" size={16} variant="solid" />
                    Generate My Itinerary
                  </>
                }
              </button>
            </div>
          </div>

          {/* Right: Generated Itinerary */}
          <div className="scroll-reveal scroll-reveal-delay-2">
            {!generated ?
            <div className="soft-card p-7 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                  <Icon name="MapIcon" size={28} className="text-primary" />
                </div>
                <h3 className="text-base font-700 text-resort-foreground mb-2">Your AI itinerary will appear here</h3>
                <p className="text-sm text-resort-muted font-500">
                  Select your interests and click Generate. Our AI will build a personalized day plan based on your preferences, current weather, and local events.
                </p>
              </div> :

            <div className="soft-card p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-700 text-resort-foreground">Your AI Itinerary</h3>
                    <p className="text-xs text-resort-muted font-500">April 1, 2026 · Personalized for you</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-primary-50 border border-primary/15 rounded-full px-3 py-1.5">
                    <Icon name="SparklesIcon" size={12} variant="solid" className="text-primary" />
                    <span className="text-[11px] font-700 text-primary">AI Generated</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeItinerary.map((item, i) =>
                <div key={i} className="itinerary-card p-4 flex gap-4 group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <AppImage
                      src={item.img}
                      alt={item.imgAlt}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full" />
                    
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-[11px] font-700 text-primary bg-primary-50 px-2 py-0.5 rounded-full">
                            {item.time}
                          </span>
                          <span className="text-xs font-700 text-resort-foreground shrink-0">{item.cost}</span>
                        </div>
                        <p className="text-sm font-700 text-resort-foreground mb-1">{item.title}</p>
                        <p className="text-xs text-resort-muted font-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                )}
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-sm font-700 hover:bg-primary-light transition-all">
                    <Icon name="CheckIcon" size={15} variant="solid" />
                    Book All Activities
                  </button>
                  <button className="w-11 h-11 rounded-xl border border-resort-border flex items-center justify-center text-resort-muted hover:text-primary hover:border-primary/30 transition-all">
                    <Icon name="ShareIcon" size={17} />
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>);

}