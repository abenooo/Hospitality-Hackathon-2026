'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const EXPERIENCES = [
{
  category: 'Heritage',
  title: 'Lalibela Rock Churches',
  region: 'Northern Ethiopia',
  duration: '6 hours',
  price: '1,800 ETB',
  rating: 4.9,
  reviews: 284,
  tags: ['UNESCO', 'Guided', 'Cultural'],
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_1aa34c854-1765382003855.png",
  imgAlt: 'Lalibela rock church carved into red volcanic rock with cross-shaped architecture',
  aiPick: true,
  color: 'bg-primary'
},
{
  category: 'Nature',
  title: 'Simien Mountains Trek',
  region: 'Amhara Region',
  duration: '8 hours',
  price: '2,200 ETB',
  rating: 4.8,
  reviews: 196,
  tags: ['Hiking', 'Wildlife', 'Sunrise'],
  img: "https://images.unsplash.com/photo-1727078262067-b9b8bd098ac5",
  imgAlt: 'Simien Mountains dramatic escarpment with clouds below and green highlands above',
  aiPick: false,
  color: 'bg-accent'
},
{
  category: 'Coffee',
  title: 'Yirgacheffe Farm Tour',
  region: 'SNNPR Region',
  duration: '4 hours',
  price: '1,200 ETB',
  rating: 4.7,
  reviews: 143,
  tags: ['Coffee', 'Farm', 'Tasting'],
  img: "https://images.unsplash.com/photo-1605936049970-f4acfe8d4027",
  imgAlt: 'Ripe red coffee cherries on coffee plant branch with green leaves',
  aiPick: false,
  color: 'bg-accent-dark'
},
{
  category: 'Wildlife',
  title: 'Rift Valley Flamingos',
  region: 'Oromia Region',
  duration: '3 hours',
  price: '950 ETB',
  rating: 4.6,
  reviews: 89,
  tags: ['Birds', 'Lake', 'Photography'],
  img: "https://images.unsplash.com/photo-1686937586142-cdee5989b979",
  imgAlt: 'Flock of flamingos standing in shallow lake water with pink reflections',
  aiPick: false,
  color: 'bg-primary-light'
}];


export default function LocalExperiences() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const categories = ['All', 'Heritage', 'Nature', 'Coffee', 'Wildlife'];

  const filtered = activeCategory === 'All' ?
  EXPERIENCES :
  EXPERIENCES?.filter((e) => e?.category === activeCategory);

  useEffect(() => {
    const els = sectionRef?.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.08 }
    );
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 scroll-reveal">
          <div>
            <p className="text-xs font-700 uppercase tracking-widest text-primary mb-3">Local Experiences</p>
            <h2 className="font-display font-800 text-section-title text-resort-foreground">
              Discover Ethiopia.<br />
              <span className="text-primary italic font-300">Curated by AI.</span>
            </h2>
          </div>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories?.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-700 transition-all ${
              activeCategory === cat ?
              'bg-primary text-white shadow-sm' :
              'bg-resort-muted-bg text-resort-muted hover:text-resort-foreground'}`
              }>
              
                {cat}
              </button>
            )}
          </div>
        </div>

        {/* Experience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children scroll-reveal">
          {filtered?.map((exp) =>
          <div key={exp?.title} className="soft-card overflow-hidden hover-lift group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <AppImage
                src={exp?.img}
                alt={exp?.imgAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-resort-dark/50 to-transparent" />

                {/* AI Pick Badge */}
                {exp?.aiPick &&
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-accent text-white rounded-full px-2.5 py-1 text-[10px] font-800">
                    <Icon name="SparklesIcon" size={10} variant="solid" />
                    AI Pick
                  </div>
              }

                {/* Category */}
                <div className={`absolute top-3 right-3 ${exp?.color} text-white rounded-full px-2.5 py-1 text-[10px] font-700`}>
                  {exp?.category}
                </div>

                {/* Duration overlay */}
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white rounded-full px-2.5 py-1">
                  <Icon name="ClockIcon" size={11} />
                  <span className="text-[10px] font-600">{exp?.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-[10px] font-700 text-primary uppercase tracking-wider mb-1">{exp?.region}</p>
                <h3 className="text-sm font-800 text-resort-foreground mb-2">{exp?.title}</h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {exp?.tags?.map((tag) =>
                <span key={tag} className="text-[10px] font-600 text-resort-muted bg-resort-muted-bg px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon name="StarIcon" size={13} variant="solid" className="text-accent" />
                    <span className="text-xs font-700 text-resort-foreground">{exp?.rating}</span>
                    <span className="text-xs text-resort-muted font-500">({exp?.reviews})</span>
                  </div>
                  <span className="text-sm font-800 text-primary">{exp?.price}</span>
                </div>

                <button className="w-full mt-3 py-2.5 bg-resort-muted-bg text-resort-foreground text-xs font-700 rounded-xl hover:bg-primary hover:text-white transition-all">
                  Book This Experience
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}