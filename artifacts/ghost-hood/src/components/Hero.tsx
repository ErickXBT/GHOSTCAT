import React from 'react';
import { motion } from 'framer-motion';
import { ghostCatBmx, ghostCatLogo } from '@/assets';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-white grid-bg"
    >
      {/* Subtle blue ambient radial glow behind content */}
      <div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(0, 82, 255, 0.05) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 md:px-10 w-full flex-1 flex flex-col justify-center relative z-10">
        {/* OpenLaunch-style Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50/90 text-xs font-semibold text-gray-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span className="tracking-wide">INTERNAL MEMO // FOR IMMEDIATE DISTRIBUTION</span>
            <span className="text-[#0052FF] font-bold">→</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT: Text & Headings */}
          <div className="flex flex-col items-start z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-black leading-[0.94] tracking-tight mb-6 text-gray-950"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2.8rem, 6vw, 5.8rem)',
              }}
            >
              No Stress,<br />
              No Fomo,<br />
              Just Chill<br />
              <span className="text-[#0052FF]">$GHOSTCAT.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-base md:text-lg mb-8 max-w-lg leading-relaxed text-gray-600 font-medium"
            >
              The ghost cat who haunts the chain — unkillable, un-fomo-able, and completely sincere about vibes. What you see is what you get.
            </motion.p>

            {/* OpenLaunch-style Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                className="px-7 py-3.5 font-bold text-sm tracking-wide rounded-xl transition-all hover:bg-blue-600 active:scale-95 text-white shadow-sm flex items-center justify-center gap-2"
                style={{ backgroundColor: '#0052FF' }}
              >
                <span>Buy $GHOSTCAT</span>
                <span>↗</span>
              </button>
              <a
                href="#about"
                className="px-7 py-3.5 font-bold text-sm tracking-wide rounded-xl border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Learn More</span>
                <span>↓</span>
              </a>
            </motion.div>

            {/* OpenLaunch-style Stat Metrics Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-10 p-5 rounded-2xl border border-gray-200 bg-gray-50/70 w-full max-w-lg shadow-xs"
            >
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    COMMUNITY
                  </p>
                  <p className="text-xl md:text-2xl font-black text-gray-950">100%</p>
                  <p className="text-xs text-gray-500 font-medium">Organic Degen</p>
                </div>
                <div className="border-l border-gray-200 pl-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    BUY / SELL TAX
                  </p>
                  <p className="text-xl md:text-2xl font-black text-[#0052FF]">0%</p>
                  <p className="text-xs text-gray-500 font-medium">Zero Slippage</p>
                </div>
                <div className="border-l border-gray-200 pl-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    LIQUIDITY
                  </p>
                  <p className="text-xl md:text-2xl font-black text-gray-950">LOCKED</p>
                  <p className="text-xs text-gray-500 font-medium">Forever</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Full-Frame Hero Artwork Showcase */}
          <div className="flex justify-center items-center relative w-full">
            {/* Subtle blue backlight glow */}
            <div
              className="absolute inset-0 pointer-events-none -z-0 blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle at 60% 50%, rgba(0, 82, 255, 0.3) 0%, transparent 70%)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative w-full rounded-2xl border border-gray-200 hover:border-[#0052FF]/60 overflow-hidden shadow-xl group bg-white transition-all duration-300"
            >
              {/* Clean Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md overflow-hidden border border-gray-200 shrink-0">
                    <img src={ghostCatLogo} alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-800">
                    GHOSTCAT // OFFICIAL HERO ARTWORK
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-white font-bold tracking-wider bg-[#0052FF]">
                    FULL FRAME
                  </span>
                </div>
              </div>

              {/* Full-Frame 16:9 Artwork Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <motion.img
                  src={ghostCatBmx}
                  alt="GHOSTCAT BMX Halloween Ride — No Stress, No Fomo, Just Chill"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  animate={{ scale: [1, 1.015, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Bottom Info Strip */}
              <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#0052FF]">
                    ✦ NO STRESS, NO FOMO, JUST CHILL
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase font-medium">
                  1920 × 1080 • 100% UNKILLABLE
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
