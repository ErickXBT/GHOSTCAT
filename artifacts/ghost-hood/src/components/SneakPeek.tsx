import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, Flame, Coins, LineChart } from 'lucide-react';
import mascotImg from '@assets/2_1784019392022.png';

export default function SneakPeek() {
  return (
    <section id="sneak-peek" className="relative py-28 overflow-hidden grid-bg" style={{ backgroundColor: '#0B100C' }}>
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-4">
            MEMO 04 // WHAT'S COMING
          </p>
          <h2
            className="font-black leading-[0.93] tracking-tight text-white"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Sneak Peek:{' '}
            <span style={{ color: '#CCFF00' }}>What's Coming</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-white/[0.07] rounded-lg overflow-hidden auto-rows-auto" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>

          {/* Card 1: AI Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:row-span-2 p-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.07] group hover:bg-white/[0.02] transition-colors min-h-[320px]"
          >
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-5">01 / ON RECORD</p>
            <h3 className="text-white font-bold text-base mb-6 flex items-center gap-2">
              <MessageSquare size={16} style={{ color: '#CCFF00' }} /> AI Chat
            </h3>
            <div className="flex flex-col gap-4 flex-1">
              <div className="border border-white/[0.07] rounded-lg rounded-tr-sm p-3.5 w-[82%] self-start text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: '#E9F3EA' }}>
                How do I get more $GHOSTCAT?
              </div>
              <div className="border border-white/[0.07] rounded-lg rounded-tl-sm p-3.5 w-[88%] self-end text-sm" style={{ backgroundColor: 'rgba(204,255,0,0.07)', color: 'rgba(233,243,234,0.75)', borderColor: 'rgba(204,255,0,0.2)' }}>
                Stake your tokens and participate in community missions to earn more $GHOSTCAT...
              </div>
            </div>
            <div className="mt-5 border border-white/[0.07] rounded-sm px-4 py-2.5 flex items-center gap-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
              <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(204,255,0,0.2)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#CCFF00' }} />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Ghost Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="p-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.07] group hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-5">02 / ON RECORD</p>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <Flame size={16} style={{ color: '#CCFF00' }} /> Ghost Score
            </h3>
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="38" stroke="rgba(255,255,255,0.07)" strokeWidth="6" fill="none" />
                  <circle cx="48" cy="48" r="38" stroke="#CCFF00" strokeWidth="6" fill="none" strokeDasharray="239" strokeDashoffset="33" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-black text-white">9.2k</span>
                </div>
              </div>
              <div>
                <span className="block text-xs font-black tracking-wider uppercase mb-1" style={{ color: '#CCFF00' }}>Legendary</span>
                <span className="text-muted-foreground text-xs">Top 1% of all ghost holders</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Token Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="p-7 flex flex-col border-b border-white/[0.07] group hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-5">03 / ON RECORD</p>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <LineChart size={16} style={{ color: '#CCFF00' }} /> Token Stats
            </h3>
            <div className="text-2xl font-black text-white mb-4">
              2,450 <span className="text-sm font-bold" style={{ color: '#CCFF00' }}>$GHOSTCAT</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Staked', pct: '65%' },
                { label: 'Earned', pct: '25%' },
                { label: 'Burned', pct: '10%' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="text-white font-bold">{s.pct}</span>
                  </div>
                  <div className="h-1 w-full rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-full rounded-full" style={{ width: s.pct, backgroundColor: i === 0 ? '#CCFF00' : i === 1 ? 'rgba(233,243,234,0.5)' : 'rgba(233,243,234,0.2)' }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Daily Missions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="p-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.07] group hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-5">04 / ON RECORD</p>
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <CheckCircle2 size={16} style={{ color: '#CCFF00' }} /> Daily Missions
              </h3>
              <span className="text-[10px] font-black tracking-wider uppercase px-2 py-1 rounded-sm" style={{ backgroundColor: 'rgba(204,255,0,0.1)', color: '#CCFF00' }}>
                +50 today
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { task: 'Share a post', done: true },
                { task: 'Stake tokens', done: true },
                { task: 'Vote on proposal', done: false },
              ].map((m, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-sm border ${m.done ? 'border-primary/20' : 'border-white/[0.07]'}`} style={{ backgroundColor: m.done ? 'rgba(204,255,0,0.05)' : 'rgba(255,255,255,0.02)' }}>
                  <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${m.done ? '' : 'border-white/20'}`} style={m.done ? { backgroundColor: '#CCFF00', borderColor: '#CCFF00' } : {}}>
                    {m.done && <span className="text-[8px] font-black" style={{ color: '#0B100C' }}>✓</span>}
                  </div>
                  <span className={`text-sm ${m.done ? 'text-white' : 'text-muted-foreground'}`}>{m.task}</span>
                  <span className="ml-auto text-xs font-bold" style={{ color: '#CCFF00' }}>+10</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 5: And much more */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32 }}
            className="p-7 flex items-center justify-between relative overflow-hidden group hover:bg-white/[0.02] transition-colors"
          >
            <div className="relative z-10">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-4">05 / ON RECORD</p>
              <h3 className="text-white font-bold text-lg mb-1">
                <span style={{ color: '#CCFF00' }}>Ghost Cat</span> — lets double<br />click on that
              </h3>
              <p className="text-sm text-muted-foreground">Join the community to unlock</p>
            </div>
            <img
              src={mascotImg}
              alt="Ghost"
              className="absolute -right-6 bottom-0 h-32 object-contain mix-blend-screen opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 pointer-events-none"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
