import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Vote, Coins, Store, PiggyBank, Flame } from 'lucide-react';

const features = [
  { icon: <Crown size={20} />, label: '01 / ON RECORD', title: 'Ghost Premium Access', desc: 'Unlock exclusive features and deeply personalized ghost insights.' },
  { icon: <Vote size={20} />, label: '02 / ON RECORD', title: 'Governance', desc: 'Vote on key decisions and help shape the future of GHOSTCAT.' },
  { icon: <Coins size={20} />, label: '03 / ON RECORD', title: 'Ecosystem Rewards', desc: 'Earn $GHOSTCAT for staying active, hitting goals, and contributing.' },
  { icon: <Store size={20} />, label: '04 / ON RECORD', title: 'Future Marketplace', desc: 'Spend $GHOSTCAT on future products, apps, and premium tools.' },
  { icon: <PiggyBank size={20} />, label: '05 / ON RECORD', title: 'Staking Rewards', desc: 'Stake $GHOSTCAT to earn rewards and strengthen the ecosystem.' },
  { icon: <Flame size={20} />, label: '06 / ON RECORD', title: 'Deflationary Model', desc: 'A share of every fee buys back and burns $GHOSTCAT over time.' },
];

export default function WhyGhost() {
  return (
    <section id="why-ghost" className="relative py-28 overflow-hidden grid-bg" style={{ backgroundColor: '#0B100C' }}>
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-4">
            MEMO 03 // MINUTES FROM THE LAST ALL-HANDS
          </p>
          <h2
            className="font-black leading-[0.93] tracking-tight text-white max-w-2xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Why{' '}
            <span style={{ color: '#CCFF00' }}>$GHOSTCAT</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-white/[0.07] rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col p-7 border-b lg:border-b-0 lg:border-r border-white/[0.07] last:border-0 group hover:bg-white/[0.02] transition-colors cursor-default"
            >
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-5">{f.label}</p>
              <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(233,243,234,0.5)' }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
