import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import catFaceUrl from '@assets/ghostcat_logo.jpg';
import { Heart, Brain, Shield, Coffee, Send, Activity, Moon, Droplets } from 'lucide-react';

const mockResponses: Record<string, { reply: string; tag: string }> = {
  symptoms: {
    reply: "Hello! I am your AI Healthcare Companion. Based on your description, mild fatigue and headache combined with low hydration are common signs of mild dehydration or circadian fatigue.\n\nFirst Recommendations:\n1. Drink 500ml of warm water slowly.\n2. Perform gentle neck and shoulder stretches for 2 minutes.\n3. Take a 15-minute screen break.\n\n*Note: I am an AI wellness assistant and not a medical doctor. If symptoms persist, please consult a physician.*",
    tag: "Symptom Check Result"
  },
  stress: {
    reply: "Feeling stressed is completely normal. Let us practice Box Breathing (4-4-4-4) together:\n\n1. Inhale through your nose for 4 seconds.\n2. Hold your breath for 4 seconds.\n3. Exhale slowly through your mouth for 4 seconds.\n4. Hold with empty lungs for 4 seconds.\n\nRepeat this cycle 3 times. Your cortisol levels will decrease and your heart rate will relax. Would you like a 1-minute guided meditation?",
    tag: "Mental Wellness Exercise"
  },
  diet: {
    reply: "To optimize your daily energy levels, here is a custom Ghost Diet menu:\n\n- Breakfast: Oatmeal with banana, almonds, and honey (Slow-release carbs + magnesium).\n- Lunch: Grilled chicken breast with steamed broccoli and brown rice.\n- Afternoon Snack: Low-fat Greek yogurt or an apple.\n- Dinner: Grilled salmon (Omega-3 for brain health) with mixed green salad.\n\nLimit caffeine after 2 PM for optimal sleep quality.",
    tag: "Nutritional Advice"
  }
};

export default function Healthcare() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; tag?: string }>>([
    { sender: 'bot', text: 'Hello! I am your GHOSTCAT AI Healthcare Companion. How is your health or wellness today? Select a preset query below or ask me anything.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [key, setKey] = useState(0); // For restarting animations

  useEffect(() => {
    // Reset key to trigger animations on load
    setKey(prev => prev + 1);
  }, []);

  const handleSelectOption = (key: string, label: string) => {
    if (isTyping) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: label }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = mockResponses[key] || { reply: "I'm sorry, I didn't catch that.", tag: "System Response" };
      setMessages(prev => [...prev, { sender: 'bot', text: response.reply, tag: response.tag }]);
      setIsTyping(false);
    }, 900);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userText = chatInput;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Your question has been received. GHOSTCAT AI is analyzing our wellness database to provide the best health insights. Please select one of our preset options for instant responses.";
      let tagText = "AI Response";

      if (userText.toLowerCase().includes('headache') || userText.toLowerCase().includes('dizzy') || userText.toLowerCase().includes('tired') || userText.toLowerCase().includes('fatigue')) {
        replyText = mockResponses.symptoms.reply;
        tagText = mockResponses.symptoms.tag;
      } else if (userText.toLowerCase().includes('stress') || userText.toLowerCase().includes('anxious') || userText.toLowerCase().includes('anxiety') || userText.toLowerCase().includes('calm')) {
        replyText = mockResponses.stress.reply;
        tagText = mockResponses.stress.tag;
      } else if (userText.toLowerCase().includes('diet') || userText.toLowerCase().includes('eat') || userText.toLowerCase().includes('food') || userText.toLowerCase().includes('nutrition')) {
        replyText = mockResponses.diet.reply;
        tagText = mockResponses.diet.tag;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: replyText, tag: tagText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0b100c', color: '#e9f3ea' }}>
      
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes drawPath {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes progressRing {
          from { stroke-dashoffset: 251.2; }
          to { stroke-dashoffset: 40.2; } /* 84% filled */
        }
        @keyframes barGrow {
          from { height: 0%; }
          to { height: var(--target-height); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        .animate-path {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawPath 2s ease-out forwards;
        }
        .animate-ring {
          stroke-dasharray: 251.2;
          stroke-dashoffset: 251.2;
          animation: progressRing 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-bar {
          animation: barGrow 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-4 border-b shrink-0"
        style={{ borderColor: 'rgba(204,255,0,0.12)', backgroundColor: '#0b100c' }}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-full overflow-hidden border"
            style={{ borderColor: 'rgba(204,255,0,0.3)' }}
          >
            <img src={catFaceUrl} alt="GHOSTCAT" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none font-black tracking-wider">
            <span className="text-white text-base">GHOST</span>
            <span className="text-base" style={{ color: '#ccff00' }}>CAT</span>
          </div>
        </Link>

        <div className="text-center">
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: 'rgba(204,255,0,0.6)' }}
          >
            COMPANION UTILITY
          </p>
          <p className="text-white font-black text-lg tracking-tight leading-none">
            AI HEALTHCARE
          </p>
        </div>

        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all hover:scale-105"
          style={{ color: '#ccff00', borderColor: 'rgba(204,255,0,0.35)' }}
        >
          ← Back
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-6 md:px-10 py-10 max-w-6xl flex flex-col gap-14">
        
        {/* Upper Row: Intro & Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Explanation & Benefits */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: '#ccff00' }}>
                $GHOSTCAT UTILITY ROADMAP
              </span>
              <h1 className="text-3xl md:text-4xl font-black mt-2 leading-none">
                AI Healthcare <br />
                <span style={{ color: '#ccff00' }}>Companion</span>
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                GHOSTCAT is not just another meme token. We integrate medical-grade artificial intelligence to bring a secure, decentralized, and 24/7 wellness companion right into your pocket.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-4">
              {[
                {
                  Icon: Heart,
                  title: "Accurate Symptom Analyzer",
                  desc: "AI-trained assistant that helps analyze early wellness symptoms instantly and provides first-aid guidance."
                },
                {
                  Icon: Brain,
                  title: "Mental Wellness Support",
                  desc: "Relaxation exercises, guided breathing cycles, and conversational support to reduce stress, anxiety, or work burnout."
                },
                {
                  Icon: Coffee,
                  title: "Personalized Nutrition",
                  desc: "Daily healthy meal plans and micro-exercise recommendations tailored to your personal activity profile."
                },
                {
                  Icon: Shield,
                  title: "Decentralized Privacy",
                  desc: "All wellness consultation sessions are fully encrypted. Your medical privacy is our absolute priority."
                }
              ].map((f, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg border border-white/[0.06] hover:bg-white/[0.01] transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <f.Icon size={18} style={{ color: '#ccff00' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{f.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Chatbot Simulator */}
          <div className="lg:col-span-7 flex flex-col rounded-xl border border-white/[0.08] overflow-hidden shadow-2xl h-[650px] relative" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            
            {/* Simulator Header */}
            <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">AI COMPANION SIMULATOR</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-sm font-black bg-primary/10 text-primary border border-primary/20">
                ACTIVE
              </span>
            </div>

            {/* Chat Messages Container */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  {msg.tag && (
                    <span className="text-[8px] font-mono uppercase tracking-widest text-primary/70 mb-1">
                      {msg.tag}
                    </span>
                  )}
                  <div
                    className="p-3.5 rounded-lg text-sm leading-relaxed"
                    style={{
                      backgroundColor: msg.sender === 'user' ? '#ccff00' : 'rgba(255,255,255,0.04)',
                      color: msg.sender === 'user' ? '#0b100c' : '#e9f3ea',
                      borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                      border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.04)'
                    }}
                  >
                    {msg.text.split('\n').map((para, pIdx) => (
                      <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="self-start max-w-[85%] flex items-center gap-1.5 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>

            {/* Chat Simulator Actions / Input */}
            <div className="p-4 border-t border-white/[0.07]" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
              
              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={() => handleSelectOption('symptoms', 'Analyze fatigue & headache')}
                  className="px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-xs font-semibold text-muted-foreground hover:text-white"
                >
                  🔍 Analyze Fatigue
                </button>
                <button
                  onClick={() => handleSelectOption('stress', 'Combat stress & anxiety')}
                  className="px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-xs font-semibold text-muted-foreground hover:text-white"
                >
                  🧘 Combat Stress
                </button>
                <button
                  onClick={() => handleSelectOption('diet', 'Healthy meal plan recommendations')}
                  className="px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-xs font-semibold text-muted-foreground hover:text-white"
                >
                  🍎 Meal Plan
                </button>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask something about your wellness (e.g. 'I am stressed' or 'check diet')..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded border border-white/10 focus:border-primary/50 focus:outline-none bg-[#080c09] text-sm text-white"
                />
                <button
                  type="submit"
                  className="w-10 h-10 flex items-center justify-center rounded transition-all active:scale-95"
                  style={{ backgroundColor: '#ccff00', color: '#0b100c' }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Lower Row: Biometric Analytics Dashboard */}
        <div className="border border-white/[0.07] rounded-xl p-8 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
          {/* Subtle grid background panel */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(204,255,0,0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          
          <div className="mb-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-black tracking-[0.25em] uppercase text-muted-foreground">REAL-TIME CLINICAL METRICS</span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">Biometric Analytics Dashboard</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Data simulated via GHOST AI</span>
              <button 
                onClick={() => setKey(prev => prev + 1)}
                className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded border hover:bg-white/[0.03] transition-all"
                style={{ color: '#ccff00', borderColor: 'rgba(204,255,0,0.3)' }}
              >
                🔄 Refresh Stats
              </button>
            </div>
          </div>

          {/* Biometrics Grid */}
          <div key={key} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            {/* Widget 1: Sleep Quality */}
            <div className="p-5 rounded-lg border border-white/[0.06] flex flex-col items-center text-center" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2 mb-3 self-start">
                <Moon size={16} style={{ color: '#ccff00' }} />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Sleep Efficiency</span>
              </div>
              <div className="relative w-28 h-28 flex items-center justify-center my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                  <circle cx="50" cy="50" r="40" stroke="#ccff00" strokeWidth="6" fill="transparent" className="animate-ring" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-white">84%</span>
                  <span className="text-[8px] text-muted-foreground uppercase tracking-widest">Optimal</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Deep sleep ratio improved by +12% since last weekly report.</p>
            </div>

            {/* Widget 2: Stress Level Trend */}
            <div className="p-5 rounded-lg border border-white/[0.06] flex flex-col" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Activity size={16} style={{ color: '#ccff00' }} />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Stress Index (HRV)</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-black text-white">28</span>
                  <span className="text-xs font-bold text-emerald-400">/ 100</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">State: Optimal & Relaxed</span>
                
                {/* Custom SVG Heartrate Line animation */}
                <div className="h-14 mt-4 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    <path
                      d="M0 30 L40 30 L50 15 L60 45 L70 30 L110 30 L120 5 L130 55 L140 30 L200 30"
                      fill="transparent"
                      stroke="#ccff00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-path"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Widget 3: Weekly Activity Index */}
            <div className="p-5 rounded-lg border border-white/[0.06] flex flex-col" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Activity size={16} style={{ color: '#ccff00' }} />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Weekly Caloric Burn</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-white">2,450</span>
                  <span className="text-[10px] text-muted-foreground font-medium">kcal/avg</span>
                </div>
                {/* Animated Column Bar Chart */}
                <div className="h-20 flex items-end justify-between gap-1 mt-4">
                  {[
                    { day: 'M', h: '45%' },
                    { day: 'T', h: '75%' },
                    { day: 'W', h: '60%' },
                    { day: 'T', h: '90%' },
                    { day: 'F', h: '50%' },
                    { day: 'S', h: '35%' },
                    { day: 'S', h: '80%' },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full rounded-t-sm" style={{ backgroundColor: 'rgba(255,255,255,0.03)', height: '100%', display: 'flex', alignItems: 'end' }}>
                        <div 
                          className="w-full rounded-t-sm animate-bar" 
                          style={{ 
                            backgroundColor: '#ccff00', 
                            '--target-height': bar.h,
                            animationDelay: `${i * 100}ms`
                          } as React.CSSProperties} 
                        />
                      </div>
                      <span className="text-[9px] text-muted-foreground font-mono">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Widget 4: Hydration Tracker */}
            <div className="p-5 rounded-lg border border-white/[0.06] flex flex-col" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Droplets size={16} style={{ color: '#ccff00' }} />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Hydration Level</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-white">2.4</span>
                  <span className="text-sm font-bold text-muted-foreground">/ 3.0 Liters</span>
                </div>
                <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full h-3 mt-4 overflow-hidden relative">
                  {/* Wave simulation */}
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ 
                      width: '80%', 
                      background: 'linear-gradient(90deg, #ccff00 0%, #a2cc00 100%)',
                      boxShadow: '0 0 10px rgba(204,255,0,0.3)'
                    }} 
                  />
                </div>
                <span className="text-[10px] text-muted-foreground mt-3">Target status: 80% achieved today. 1 glass remaining.</span>
              </div>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
}
