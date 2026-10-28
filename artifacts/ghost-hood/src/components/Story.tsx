import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Flame } from 'lucide-react';
import { ghostCatMoonLounge } from '@/assets';

const storyPoints = [
  {
    num: '01',
    label: 'THE LEGENDS DISAPPEARED',
    heading: 'Some chase 100x. One ghost never left.',
    body: (
      <>
        They say every blockchain has its legends. Some chase green candles. Some hunt the next 100x. Others simply disappear when the market turns red.{' '}
        <span className="text-[#0052FF] font-semibold">But one little ghost never left.</span>
      </>
    ),
  },
  {
    num: '02',
    label: 'CHAOS & MEMES',
    heading: 'A feline spirit haunting timelines.',
    body: (
      <>
        Meet <strong className="text-gray-950">GHOSTCAT</strong> — a mysterious feline spirit born from the chaos of meme culture. Quietly haunting timelines, popping up in unexpected places, and{' '}
        <span className="text-[#0052FF] font-semibold">reminding degens everywhere that crypto should be fun.</span>
      </>
    ),
  },
  {
    num: '03',
    label: 'THE UNIVERSE',
    heading: 'Community-powered playground & arcade.',
    body: (
      <>
        What started as a ghostly meme is growing into something bigger: a community-powered universe featuring a gaming arcade, a gallery full of memes, and a home for everyone who loves the weird side of the internet.{' '}
        <span className="text-[#0052FF] font-semibold">No complicated lore. No serious faces.</span>
      </>
    ),
  },
];

export default function Story() {
  return (
    <section id="story" className="relative py-28 overflow-hidden bg-white grid-bg">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span>MEMO 02 // CHAIN LORE & SCRIPT</span>
          </div>
          <h2
            className="font-black leading-[0.94] tracking-tight text-gray-950 max-w-4xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
          >
            Every Chain Has a{' '}
            <span className="text-[#0052FF]">Ghost Story.</span>
          </h2>
        </motion.div>

        {/* 3 Story Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {storyPoints.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col p-8 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-[#0052FF]/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-gray-500">
                  {card.label}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#0052FF] border border-blue-100">
                  {card.num}
                </span>
              </div>
              <h3 className="text-gray-950 font-bold text-xl leading-snug mb-3 group-hover:text-[#0052FF] transition-colors">
                {card.heading}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 font-medium">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Big Creed & Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-md relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Creed text */}
            <div className="lg:col-span-7 p-8 md:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-blue-100 bg-blue-50 text-xs font-bold text-[#0052FF]">
                <Flame size={14} />
                <span>THE GHOST MANIFESTO</span>
              </div>

              <blockquote className="text-2xl md:text-3xl font-black text-gray-950 leading-snug tracking-tight">
                "The chain is our playground. The memes are our language. And the ghost is just getting started."
              </blockquote>

              <p className="text-base text-gray-600 font-medium leading-relaxed">
                Just a ghost cat, a wild community, and endless ways to have fun. No complicated lore. No serious faces.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <span className="px-4 py-2 font-mono text-xs font-bold tracking-wider rounded-lg border border-blue-200 bg-blue-50 text-[#0052FF]">
                  Stay spooky. Stay degen. 👻🐱
                </span>
              </div>
            </div>

            {/* Banner graphic */}
            <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[300px] overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-100">
              <img
                src={ghostCatMoonLounge}
                alt="Ghostcat Neon Moon Lounge"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
