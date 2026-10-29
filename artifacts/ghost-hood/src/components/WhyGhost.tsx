import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, ShieldCheck, Ghost, Flame, Smile } from 'lucide-react';
import { ghostCatBeachSunset, ghostCatVideoWhy } from '@/assets';

export default function WhyGhost() {
  return (
    <section id="why-ghost" className="relative py-28 overflow-hidden bg-white grid-bg">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span>MEMO 03 // WHY CHOOSE THE GHOST</span>
          </div>
          <h2
            className="font-black leading-[0.94] tracking-tight text-gray-950 max-w-2xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
          >
            Why <span className="text-[#0052FF]">$GHOSTCAT</span>?
          </h2>
        </motion.div>

        {/* Bento Grid: 1 Explanation on Left, 1 Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between border border-gray-200 rounded-2xl p-8 md:p-12 relative overflow-hidden bg-white shadow-sm"
          >
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-blue-100 bg-blue-50/70 text-xs font-bold text-[#0052FF]">
                <ShieldCheck size={14} />
                <span>ZERO OVERPROMISE • PURE MEME &amp; ARCADE VIBES</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight leading-snug">
                Built on unkillable meme energy, real browser games, and absolute honesty.
              </h3>

              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-medium">
                In a crypto space filled with complex whitepapers, exaggerated claims, and corporate promises that never materialize, <strong className="text-gray-950 font-bold">$GHOSTCAT</strong> chooses radical transparency and genuine fun. We don't pretend to be anything we're not.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-medium">
                Instead, $GHOSTCAT brings together pure meme culture, viral internet humor, and a lightweight browser arcade where the community can play directly with zero friction. What you see is what you get: an honest, playful home where degens can chill, hit high scores, and haunt the charts together.
              </p>

              {/* Callout box */}
              <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-xl">👻</span> Zero False Promises. 100% Playable.
                  </p>
                  <p className="text-sm font-semibold tracking-wide mt-1 text-[#0052FF]">
                    No corporate fluff, no fake roadmaps — just real meme fun.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 text-xs font-black tracking-wider uppercase rounded-lg text-white bg-[#0052FF] shadow-xs shrink-0">
                  HONEST VIBES
                </span>
              </div>

              {/* 3 Core Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                  <p className="text-[10px] font-mono text-gray-500 mb-1 uppercase font-bold">01 / CULTURE</p>
                  <p className="text-gray-950 font-bold text-sm">Pure Meme Energy</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">100% community-driven internet humor.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                  <p className="text-[10px] font-mono text-gray-500 mb-1 uppercase font-bold">02 / GAMEPLAY</p>
                  <p className="text-gray-950 font-bold text-sm">Ghost Arcade</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Instant casual browser mini-games.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                  <p className="text-[10px] font-mono text-gray-500 mb-1 uppercase font-bold">03 / HONESTY</p>
                  <p className="text-gray-950 font-bold text-sm">Zero Fluff</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Fair launch, locked LP, no fake utility.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Single Featured Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm h-full flex flex-col justify-between"
            >
              {/* Card Header Bar */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
                  <span className="text-xs font-mono font-bold text-gray-700 ml-1">SPEC_WHY_GHOST.RAW</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded text-white font-bold bg-[#0052FF]">
                  REAL DEGEN
                </span>
              </div>

              {/* Visual Video */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <video
                  src={ghostCatVideoWhy || '/videos/why_beach_sunset.mp4'}
                  poster={ghostCatBeachSunset}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <div>
                    <p className="text-xs font-mono text-gray-300 uppercase">CORE TENET</p>
                    <p className="text-white font-bold text-base">Unkillable Chill</p>
                  </div>
                  <p className="text-xs font-mono font-bold text-[#0052FF] bg-white px-2 py-0.5 rounded-sm">
                    0% OVERPROMISE
                  </p>
                </div>
              </div>

              {/* Stats & Verification Sheet */}
              <div className="p-6 space-y-3 bg-white">
                <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2.5">
                  <span className="text-gray-500 font-mono font-medium">CORPORATE FLUFF</span>
                  <span className="font-mono font-bold text-gray-900">0% (NONE)</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2.5">
                  <span className="text-gray-500 font-mono font-medium">COMMUNITY MEME VIBES</span>
                  <span className="font-mono font-bold text-[#0052FF]">100% PURE</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2.5">
                  <span className="text-gray-500 font-mono font-medium">ARCADE MINI-GAMES</span>
                  <span className="font-mono font-bold text-gray-900">PLAYABLE IN BROWSER</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-gray-500 font-mono font-medium">ROADMAP STATUS</span>
                  <span className="font-mono font-bold text-gray-900">100% TRANSPARENT</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs font-mono tracking-wider font-bold text-[#0052FF]">
                    ✦ NO STRESS • NO FOMO • JUST GHOST ✦
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
