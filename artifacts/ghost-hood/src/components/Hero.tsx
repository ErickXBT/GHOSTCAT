import React from 'react';
import { motion } from 'framer-motion';
import mascotImg from '@assets/2_1784019392022.png';
import catFaceImg from '@assets/GHOST_HOOD_1784018789875.jpg';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-0 flex flex-col justify-center overflow-hidden grid-bg"
      style={{ backgroundColor: '#0B100C' }}
    >
      {/* Subtle radial glow behind content */}
      <div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(204,255,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 md:px-10 w-full flex-1 flex flex-col justify-center relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground"
        >
          INTERNAL MEMO // FOR IMMEDIATE DISTRIBUTION
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">
          {/* LEFT */}
          <div className="flex flex-col items-start z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-black leading-[0.92] tracking-tight mb-7"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                color: '#ffffff',
              }}
            >
              No Stress,<br />
              No Fomo,<br />
              <span style={{ color: '#CCFF00' }}>Just $GHOSTCAT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-base md:text-lg mb-10 max-w-md leading-relaxed"
              style={{ color: 'rgba(233,243,234,0.55)', fontStyle: 'italic' }}
            >
              The ghost cat who haunts the chain — unkillable, un-fomo-able,<br className="hidden md:block" /> and completely sincere about vibes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <button
                className="px-7 py-3 font-black text-sm tracking-widest uppercase rounded-sm transition-all hover:opacity-90 active:scale-95 shadow-[0_0_24px_rgba(204,255,0,0.18)]"
                style={{ backgroundColor: '#CCFF00', color: '#0B100C' }}
              >
                Buy $GHOST ↗
              </button>
              <button
                className="px-7 py-3 font-semibold text-sm tracking-wider uppercase border border-white/15 text-muted-foreground hover:text-white hover:border-white/30 transition-colors rounded-sm"
              >
                Learn More ↓
              </button>
            </motion.div>

            {/* Ticker below CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex items-center gap-3"
            >
              <span
                className="text-[10px] font-black tracking-[0.25em] uppercase"
                style={{ color: 'rgba(204,255,0,0.5)' }}
              >
                TICKER, PENDING BOARD APPROVAL:
              </span>
              <span
                className="px-2.5 py-1 text-[11px] font-black tracking-widest rounded-sm"
                style={{ backgroundColor: '#CCFF00', color: '#0B100C' }}
              >
                $GHOST
              </span>
            </motion.div>
          </div>

          {/* RIGHT: Ghost Cat Card */}
          <div className="flex justify-center lg:justify-end items-center relative min-h-[380px]">
            {/* ID card-like frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full max-w-[340px] rounded-xl border border-white/[0.09] overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-sm overflow-hidden border border-primary/30">
                    <img src={catFaceImg} alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: '#E9F3EA' }}>
                    GHOST HOOD INC.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
                  EMP 000001
                </span>
              </div>

              {/* Mascot image */}
              <div
                className="w-full flex items-end justify-center relative overflow-hidden"
                style={{ height: 260, backgroundColor: 'rgba(204,255,0,0.04)' }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center 60%, rgba(204,255,0,0.06) 0%, transparent 70%)' }} />
                <motion.img
                  src={mascotImg}
                  alt="Ghost Hood Mascot"
                  className="h-full object-contain relative z-10 pointer-events-none"
                  style={{ mixBlendMode: 'screen', filter: 'brightness(1.05)' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Card data rows */}
              <div className="border-t border-white/[0.07] px-4 py-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Ghost Cat</span>
                  <span className="text-xs font-black tracking-wider text-white">GHOST HOOD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Title</span>
                  <span className="text-xs font-black tracking-wider" style={{ color: '#CCFF00' }}>No Stress, No Fomo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Status</span>
                  <span className="text-xs font-bold text-white">Still Haunting ✦</span>
                </div>
              </div>

              {/* Barcode strip */}
              <div className="border-t border-white/[0.07] px-4 py-3 flex items-center justify-between">
                <div className="flex gap-px">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-5 rounded-[1px]"
                      style={{
                        width: [1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 1, 3, 1, 2][i] * 1.5,
                        backgroundColor: 'rgba(233,243,234,0.18)',
                      }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground/60 ml-3">
                  STILL HAUNTING
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom separator spacing */}
      <div className="h-20" />
    </section>
  );
}
