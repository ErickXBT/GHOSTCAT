import React from 'react';
import { motion } from 'framer-motion';
import legendBannerImg from '@assets/ghostcat_legend_banner.png';

const cards = [
  {
    num: '01',
    label: 'ORIGIN',
    heading: 'Born from the shadows of meme culture.',
    body: <>Long before memes ruled the internet, Ghost believed crypto culture should be <span style={{ color: '#CCFF00' }}>personal, intelligent, and available to everyone.</span></>,
  },
  {
    num: '02',
    label: 'MOVEMENT',
    heading: 'Tired of faceless tokens and empty promises.',
    body: <>Ghost set out to build a community that helps millions live their best chain life — <span style={{ color: '#CCFF00' }}>no stress, no fomo.</span></>,
  },
  {
    num: '03',
    label: 'NOW',
    heading: 'GHOSTCAT is just getting started.',
    body: <>Today the hood haunts the chain — <span style={{ color: '#CCFF00' }}>unkillable, un-fomo-able, and completely sincere about vibes.</span></>,
  },
];

export default function Story() {
  return (
    <section id="story" className="relative py-28 overflow-hidden grid-bg" style={{ backgroundColor: '#0B100C' }}>
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-4">
            MEMO 01 // THE ORIGIN
          </p>
          <h2
            className="font-black leading-[0.93] tracking-tight text-white"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            The legend of{' '}
            <span style={{ color: '#CCFF00' }}>Ghost.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-white/[0.07] rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col p-8 border-b md:border-b-0 md:border-r border-white/[0.07] last:border-0 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-black tracking-[0.22em] uppercase text-muted-foreground">
                  {card.label}
                </span>
                <span className="text-2xl font-black" style={{ color: 'rgba(204,255,0,0.18)', fontFamily: 'Poppins, sans-serif' }}>
                  {card.num}
                </span>
              </div>

              {/* Legend Banner */}
              <div className="mx-[-2rem] mb-6 relative overflow-hidden aspect-[1024/373]">
                <img
                  src={legendBannerImg}
                  alt={`Ghost Story ${card.num}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="text-white font-bold text-lg leading-tight mb-3">
                {card.heading}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(233,243,234,0.55)' }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
