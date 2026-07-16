import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  { num: '01', phase: 'PHASE 1', title: 'Launch Token', desc: 'Fair launch of $GHOST and initial liquidity.', status: 'STILL THE FUTURE' },
  { num: '02', phase: 'PHASE 2', title: 'Build Community', desc: 'Grow the strongest ghost community in Web3.', status: 'STILL THE FUTURE' },
  { num: '03', phase: 'PHASE 3', title: 'Beta Release', desc: 'Early access to exclusive features for our community.', status: 'STILL THE FUTURE' },
  { num: '04', phase: 'PHASE 4', title: 'Public App Launch', desc: 'Full app launch with powerful ghost tools.', status: 'STILL THE FUTURE' },
  { num: '05', phase: 'PHASE 5', title: 'Merch & Collabs', desc: 'GHOST HOOD merch drops and brand collaborations.', status: 'STILL THE FUTURE' },
  { num: '06', phase: 'PHASE 6', title: 'Ghost Ecosystem', desc: 'Expand the ecosystem and onboard millions worldwide.', status: 'STILL THE FUTURE' },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-28 overflow-hidden grid-bg" style={{ backgroundColor: '#0B100C' }}>
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-4">
            MEMO 02 // PLATFORM ONBOARDING HISTORY
          </p>
          <h2
            className="font-black leading-[0.93] tracking-tight text-white"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Every phase, we treat like{' '}
            <span style={{ color: '#CCFF00' }}>still the future.</span>
          </h2>
        </motion.div>

        {/* Table style like reference */}
        <div className="border border-white/[0.07] rounded-lg overflow-hidden">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="flex items-center gap-6 px-8 py-5 border-b border-white/[0.07] last:border-0 group hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-muted-foreground/60 text-xs font-mono w-6 shrink-0">{phase.num}</span>
              <span className="font-bold text-white text-base w-40 shrink-0 group-hover:text-primary transition-colors">{phase.title}</span>
              <span className="text-sm flex-1 hidden md:block" style={{ color: 'rgba(233,243,234,0.5)' }}>{phase.desc}</span>
              <span
                className="shrink-0 px-3 py-1 text-[10px] font-black tracking-[0.18em] uppercase rounded-sm border"
                style={{ color: '#CCFF00', borderColor: 'rgba(204,255,0,0.3)', backgroundColor: 'rgba(204,255,0,0.07)' }}
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
