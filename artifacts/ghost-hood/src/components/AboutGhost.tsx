import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Sparkles, Gamepad2, Smile, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ghostCatTradingLair, ghostCatVideoAbout } from '@/assets';

export default function AboutGhost() {
  return (
    <section id="about" className="relative py-28 overflow-hidden bg-white grid-bg">
      <div className="container mx-auto px-6 md:px-10">
        {/* Memo Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span>MEMO 01 // OVERVIEW & IDENTITY</span>
          </div>
          <h2
            className="font-black leading-[0.94] tracking-tight text-gray-950 max-w-3xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
          >
            About <span className="text-[#0052FF]">$GHOSTCAT.</span>
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Story & Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between border border-gray-200 rounded-2xl p-8 md:p-12 relative overflow-hidden bg-white shadow-sm"
          >
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-blue-100 bg-blue-50/70 text-xs font-bold text-[#0052FF]">
                <Ghost size={14} />
                <span>MEET THE GHOST THAT NEVER LEAVES THE TIMELINE</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight leading-snug">
                Born from internet meme culture, bringing together cute spooky vibes &amp; degen energy.
              </h3>

              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-medium">
                Meet <strong className="text-gray-950 font-bold">$GHOSTCAT</strong> — the ghost that never leaves the timeline. Born from internet meme culture, $GHOSTCAT brings together cute spooky vibes, degen energy, and a community that never takes things too seriously.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-medium">
                But this ghost isn't here just to haunt your feed. We're building a fun ecosystem where the community can explore games, discover new ways to play, and enjoy a growing gallery of unforgettable memes.
              </p>

              {/* Callout box */}
              <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-xl">👻</span> No stress. No FOMO. Just chill.
                  </p>
                  <p className="text-sm font-semibold tracking-wide mt-1 text-[#0052FF]">
                    Ghost the ordinary. Play the extraordinary.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 text-xs font-black tracking-wider uppercase rounded-lg text-white bg-[#0052FF] shadow-xs shrink-0">
                  WELCOME TO THE HAUNT
                </span>
              </div>

              <p className="text-sm font-mono tracking-wider text-gray-400 pt-2 font-medium">
                &gt;&gt; Welcome to the haunting side of crypto.
              </p>
            </div>
          </motion.div>

          {/* Right Bento Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Mascot Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-gray-200 rounded-2xl overflow-hidden relative group bg-white shadow-sm"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0052FF] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-gray-700 ml-1">SPEC_GHOST_CAT.RAW</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded text-white font-bold bg-[#0052FF]">
                  LIVE VIDEO
                </span>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <video
                  src={ghostCatVideoAbout || '/videos/about_trading_lair.mp4'}
                  poster={ghostCatTradingLair}
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
                    <p className="text-xs font-mono text-gray-300 uppercase">SUBJECT</p>
                    <p className="text-white font-bold text-base">$GHOSTCAT Companion</p>
                  </div>
                  <p className="text-xs font-mono font-bold text-[#0052FF] bg-white px-2 py-0.5 rounded-sm">
                    100% UNKILLABLE
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pillar badges grid */}
            <div className="grid grid-cols-2 gap-3.5 flex-1">
              {[
                { icon: <Sparkles size={18} />, title: "Cute Spooky Vibes", desc: "Cozy ghost aesthetics" },
                { icon: <Gamepad2 size={18} />, title: "Play & Explore", desc: "Interactive casual games" },
                { icon: <Smile size={18} />, title: "Degen Energy", desc: "Pure Web3 meme culture" },
                { icon: <ShieldCheck size={18} />, title: "Just Chill", desc: "Zero stress, zero FOMO" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="p-5 border border-gray-200 rounded-2xl flex flex-col justify-between hover:border-[#0052FF]/60 hover:shadow-sm transition-all bg-white"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 border border-blue-100 bg-blue-50 text-[#0052FF]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-950 mb-0.5">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
