import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Vote, Coins, Store, PiggyBank, Flame } from 'lucide-react';

const features = [
  {
    icon: <Crown size={24} className="text-primary" />,
    title: "Ghost Premium Access",
    desc: "Unlock exclusive features and deeply personalized ghost insights."
  },
  {
    icon: <Vote size={24} className="text-primary" />,
    title: "Governance",
    desc: "Vote on key decisions and help shape the future of GHOST HOOD."
  },
  {
    icon: <Coins size={24} className="text-primary" />,
    title: "Ecosystem Rewards",
    desc: "Earn $GHOST for staying active, hitting goals, and contributing."
  },
  {
    icon: <Store size={24} className="text-primary" />,
    title: "Future Marketplace",
    desc: "Spend $GHOST on future products, apps, and premium tools."
  },
  {
    icon: <PiggyBank size={24} className="text-primary" />,
    title: "Staking Rewards",
    desc: "Stake $GHOST to earn rewards and strengthen the ecosystem."
  },
  {
    icon: <Flame size={24} className="text-primary" />,
    title: "Deflationary Model",
    desc: "A share of every fee buys back and burns $GHOST over time."
  }
];

export default function WhyGhost() {
  return (
    <section id="why-ghost" className="relative py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest text-xs uppercase mb-4"
          >
            UTILITY
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Why <span className="text-primary text-glow">$GHOST</span>?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            One token, an entire ghost ecosystem. Here's what $GHOST unlocks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:bg-card hover:border-primary/50 transition-all duration-300 group box-glow-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-lg">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
