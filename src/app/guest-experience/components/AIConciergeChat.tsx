'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Message {
  id: number;
  role: 'ai' | 'guest';
  text: string;
  time: string;
  lang?: 'en' | 'am';
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'ai',
    text: "Selam! 👋 I'm your Kuriftu Resorts AI Concierge. I know you've been here for 2 days and love hiking. Today I'd recommend the Simien Mountains sunrise trek — only 12 spots left. Want me to reserve one for you?",
    time: '09:02',
    lang: 'en',
  },
  {
    id: 2,
    role: 'guest',
    text: "Yes! That sounds amazing. What time does it start and what should I bring?",
    time: '09:04',
  },
  {
    id: 3,
    role: 'ai',
    text: "Perfect! The trek starts at 5:30am from the resort lobby. I'll have your packed breakfast (injera + honey) ready by 5:15am. Bring light layers — it's 12°C at the summit. I've also pre-booked you a local guide, Abebe, who speaks English. Shall I confirm?",
    time: '09:04',
    lang: 'en',
  },
];

const QUICK_REPLIES = [
  "Yes, confirm the booking!",
  "What\'s the cost?",
  "Any other activities today?",
  "Show me the menu for dinner",
  "I need a taxi to Lalibela",
];

const AI_RESPONSES: Record<string, string> = {
  "Yes, confirm the booking!": "✅ Booked! Simien Mountains sunrise trek confirmed for tomorrow 5:30am. Abebe will meet you at the lobby. I've added it to your itinerary and set a 5:00am wake-up call. Is there anything else I can arrange for your stay?",
  "What's the cost?": "The Simien Mountains trek is 1,800 ETB per person and includes your local guide Abebe, packed breakfast, and park entry fee. This is already included in your Premium Stay package — so it's complimentary for you! 🎉",
  "Any other activities today?": "For today I recommend: ☕ Coffee ceremony at 3pm in the resort garden (free), 🏊 Pool sunset hour 5-7pm, and 🍽️ Traditional Ethiopian dinner at 7pm featuring Doro Wat and Tej. Shall I reserve a spot for any of these?",
  "Show me the menu for dinner": "Tonight's dinner highlights: 🍗 Doro Wat (chicken stew with berbere) — 420 ETB, 🥩 Tibs (sautéed lamb) — 380 ETB, 🌿 Shiro (chickpea stew, vegetarian) — 280 ETB. All served with fresh injera. Our chef Tigist recommends the Doro Wat tonight — it's exceptional!",
  "I need a taxi to Lalibela": "I've arranged a reliable driver, Solomon, for your Lalibela trip. Departure: 7:00am, return: 6:00pm. Cost: 2,200 ETB round trip. Solomon speaks English and will guide you to all 11 rock-hewn churches. Shall I confirm this booking?",
};

export default function AIConciergeChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const guestMsg: Message = { id: Date.now(), role: 'guest', text, time: timeStr };
    setMessages((prev) => [...prev, guestMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = AI_RESPONSES[text] ||
        "Great question! Let me check that for you. Based on your preferences and current resort availability, I'll have a personalized recommendation ready in a moment. Is there anything specific you'd like me to focus on?";

      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: response,
        time: timeStr,
        lang,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <section id="concierge" ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12 scroll-reveal">
          <p className="text-xs font-700 uppercase tracking-widest text-primary mb-3">AI Concierge</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2 className="font-display font-800 text-section-title text-resort-foreground">
              Ask anything.<br />
              <span className="text-primary italic font-300">Get a personal answer.</span>
            </h2>
            <p className="text-base text-resort-muted font-500 max-w-sm leading-relaxed">
              Our AI concierge knows your preferences, your stay history, and the best of Ethiopia — and responds in under 2 seconds.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Chat Window */}
          <div className="lg:col-span-3 scroll-reveal">
            <div className="soft-card overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-resort-border bg-resort-muted-bg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="SparklesIcon" size={18} variant="solid" className="text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="text-sm font-700 text-resort-foreground">Kuriftu Resorts Concierge</p>
                    <div className="flex items-center gap-1.5">
                      <span className="status-dot" />
                      <p className="text-[11px] text-primary font-600">Online · Responds in 2s</p>
                    </div>
                  </div>
                </div>
                <div className="lang-toggle flex">
                  <button
                    onClick={() => setLang('en')}
                    className={`lang-btn ${lang === 'en' ? 'active' : 'text-resort-muted'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('am')}
                    className={`lang-btn ${lang === 'am' ? 'active' : 'text-resort-muted'}`}
                  >
                    አማ
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-container p-5 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'guest' ? 'justify-end' : 'justify-start'} bubble-in`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1 mr-2">
                        <Icon name="SparklesIcon" size={13} variant="solid" className="text-white" />
                      </div>
                    )}
                    <div className={`max-w-[78%] ${msg.role === 'guest' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm font-500 leading-relaxed ${
                          msg.role === 'guest' ?'bg-primary text-white rounded-tr-sm' :'bg-resort-muted-bg text-resort-foreground rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-resort-muted font-500 px-1">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 bubble-in">
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Icon name="SparklesIcon" size={13} variant="solid" className="text-white" />
                    </div>
                    <div className="bg-resort-muted-bg rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 bg-resort-muted rounded-full ai-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="text-xs font-600 text-primary bg-primary-50 border border-primary/15 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 bg-resort-muted-bg rounded-xl border border-resort-border p-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                    placeholder={lang === 'en' ? 'Ask me anything about your stay...' : 'ስለ ቆይታዎ ማንኛውንም ነገር ይጠይቁ...'}
                    className="flex-1 bg-transparent text-sm font-500 text-resort-foreground placeholder:text-resort-muted outline-none px-2 min-h-[44px]"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Icon name="PaperAirplaneIcon" size={16} variant="solid" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — AI Capabilities */}
          <div className="lg:col-span-2 space-y-4 scroll-reveal scroll-reveal-delay-2">
            <div className="soft-card p-6">
              <h3 className="text-sm font-700 text-resort-foreground mb-4">What I can do for you</h3>
              <div className="space-y-3">
                {[
                  { icon: 'MapIcon', title: 'Plan daily itineraries', sub: 'Based on weather, crowds & your preferences', color: 'bg-primary-50 text-primary' },
                  { icon: 'CalendarIcon', title: 'Book activities & tours', sub: 'Lalibela, Simien, Rift Valley, coffee tours', color: 'bg-primary-50 text-primary' },
                  { icon: 'TruckIcon', title: 'Arrange transport', sub: 'Taxis, shuttles, airport transfers', color: 'bg-accent/10 text-accent-dark' },
                  { icon: 'ClipboardDocumentListIcon', title: 'Restaurant reservations', sub: 'In-resort dining + local recommendations', color: 'bg-accent/10 text-accent-dark' },
                  { icon: 'LanguageIcon', title: 'Translate & explain', sub: 'Local customs, Amharic phrases, etiquette', color: 'bg-primary-50 text-primary' },
                ].map((cap) => (
                  <div key={cap.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-resort-muted-bg transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cap.color}`}>
                      <Icon name={cap.icon as any} size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-700 text-resort-foreground">{cap.title}</p>
                      <p className="text-[11px] text-resort-muted font-500">{cap.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gradient-animate rounded-2xl p-5 text-white noise-overlay relative overflow-hidden">
              <div className="relative z-10">
                <Icon name="WifiIcon" size={20} className="text-accent mb-3" />
                <p className="text-sm font-700 mb-1">Works without internet</p>
                <p className="text-xs text-white/60 font-500 leading-relaxed">
                  Our AI concierge stores your preferences and key resort data locally. Full functionality even in low-connectivity areas of Ethiopia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}