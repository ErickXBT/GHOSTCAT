import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  { 
    num: '01', 
    phase: 'PHASE 1', 
    title: 'Fair Token Launch', 
    desc: 'Fair stealth launch on DEX with 100% burned liquidity pool, verified contract, and community distribution.', 
    status: 'ACTIVE NOW' 
  },
  { 
    num: '02', 
    phase: 'PHASE 2', 
    title: 'Ghost Gang Raids', 
    desc: 'Viral meme campaigns across Telegram & X, DexScreener & CoinGecko trending, and community raids.', 
    status: 'IN PROGRESS' 
  },
  { 
    num: '03', 
    phase: 'PHASE 3', 
    title: 'Arcade Mini-Games', 
    desc: 'Launch playable browser-based Ghost arcade mini-game, high-score tracking, and community challenges.', 
    status: 'PLAYABLE' 
  },
  { 
    num: '04', 
    phase: 'PHASE 4', 
    title: 'Meme Vault & Stickers', 
    desc: 'Official community meme pack releases, viral Telegram stickers, and ghost cat social avatar drops.', 
    status: 'UPCOMING' 
  },
  { 
    num: '05', 
    phase: 'PHASE 5', 
    title: 'Community Gaming Nights', 
    desc: 'Casual community high-score challenges, arcade leaderboard showdowns, and meme creation highlights.', 
    status: 'UPCOMING' 
  },
  { 
    num: '06', 
    phase: 'PHASE 6', 
    title: 'Merch Drops & IRL Haunt', 
    desc: 'Streetwear drops (hoodies, stickers, ghost caps) and underground Web3 crypto gaming meetups.', 
    status: 'UPCOMING' 
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-28 overflow-hidden bg-white grid-bg">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span>MEMO 02 // ROADMAP & ONBOARDING</span>
          </div>
          <h2
            className="font-black leading-[0.94] tracking-tight text-gray-950"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
          >
            Every phase, we treat like{' '}
            <span className="text-[#0052FF]">still the future.</span>
          </h2>
        </motion.div>

        {/* Clean Table style like reference */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="flex items-center gap-6 px-8 py-5 border-b border-gray-100 last:border-0 group hover:bg-gray-50/80 transition-colors"
            >
              <span className="text-gray-400 text-xs font-mono font-bold w-6 shrink-0">{phase.num}</span>
              <span className="font-bold text-gray-950 text-base w-44 shrink-0 group-hover:text-[#0052FF] transition-colors">{phase.title}</span>
              <span className="text-sm flex-1 hidden md:block text-gray-500 font-medium">{phase.desc}</span>
              <span
                className="shrink-0 px-3.5 py-1.5 text-[10px] font-black tracking-[0.16em] uppercase rounded-lg border shadow-xs"
                style={
                  phase.status === 'ACTIVE NOW' || phase.status === 'PLAYABLE'
                    ? { color: '#FFFFFF', backgroundColor: '#0052FF', borderColor: '#0052FF' }
                    : phase.status === 'IN PROGRESS'
                    ? { color: '#0052FF', borderColor: 'rgba(0,82,255,0.3)', backgroundColor: 'rgba(0,82,255,0.08)' }
                    : { color: '#6B7280', borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }
                }
              >
                {phase.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
