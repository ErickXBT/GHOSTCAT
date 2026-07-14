import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Bot, Smartphone, Shirt, Globe2 } from 'lucide-react';

const phases = [
  {
    phase: "PHASE 1",
    title: "Launch Token",
    desc: "Fair launch of $GHOST and initial liquidity.",
    icon: <Rocket size={20} className="text-primary" />
  },
  {
    phase: "PHASE 2",
    title: "Build Community",
    desc: "Grow the strongest ghost community in Web3.",
    icon: <Users size={20} className="text-primary" />
  },
  {
    phase: "PHASE 3",
    title: "Beta Release",
    desc: "Early access to exclusive features for our community.",
    icon: <Bot size={20} className="text-primary" />
  },
  {
    phase: "PHASE 4",
    title: "Public App Launch",
    desc: "Full app launch with powerful ghost tools.",
    icon: <Smartphone size={20} className="text-primary" />
  },
  {
    phase: "PHASE 5",
    title: "Merch & Collabs",
    desc: "GHOST HOOD merch drops and brand collaborations.",
    icon: <Shirt size={20} className="text-primary" />
  },
  {
    phase: "PHASE 6",
    title: "Ghost Ecosystem",
    desc: "Expand the ecosystem and onboard millions worldwide.",
    icon: <Globe2 size={20} className="text-primary" />
  }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest text-xs uppercase mb-4"
          >
            ROADMAP
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight flex flex-col md:flex-row gap-2 md:gap-4 justify-center"
          >
            <span>Our Vision.</span>
            <span className="text-primary text-glow">Step by Step.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            A clear path from ghost launch to a global community ecosystem.
          </motion.p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-0">
          
          {/* Connecting line (Desktop horizontal, Mobile vertical) */}
          <div className="absolute left-10 md:left-0 md:top-10 top-0 bottom-0 md:bottom-auto w-0.5 md:w-full md:h-0.5 bg-primary/20 -z-10 border-dashed border-primary border-r-2 md:border-b-2 md:border-r-0 border-opacity-30" />
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-4 lg:gap-6">
            {phases.map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-8 group"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 md:w-20 md:h-20 shrink-0 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.2)] group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 z-10">
                  {phase.icon}
                </div>
                
                {/* Content */}
                <div className="flex flex-col items-start md:items-center text-left md:text-center pt-1 md:pt-0">
                  <div className="text-primary font-black text-[10px] tracking-widest uppercase mb-2 bg-primary/10 px-2 py-0.5 rounded">
                    {phase.phase}
                  </div>
                  <h3 className="text-white font-bold text-lg md:text-base lg:text-lg mb-2 leading-tight">
                    {phase.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-[200px] leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
