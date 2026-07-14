import React from 'react';
import { motion } from 'framer-motion';
import mascotImg from '@assets/2_1784019392022.png';

export default function Story() {
  return (
    <section id="story" className="relative py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest text-xs uppercase mb-4"
          >
            ORIGIN STORY
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            The Legend of <span className="text-primary text-glow">Ghost</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            From the shadows of meme culture, a ghost cat was born.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "1",
              img: mascotImg,
              text: <>Long before memes ruled the internet, Ghost believed crypto culture should be <span className="text-primary font-medium">personal, intelligent, and available to everyone.</span></>,
              imgClass: "mix-blend-lighten opacity-80"
            },
            {
              num: "2",
              img: mascotImg,
              text: <>Tired of faceless tokens and empty promises, Ghost set <span className="text-primary font-medium">out to build a community</span> that helps millions live their best chain life.</>,
              imgClass: "mix-blend-lighten drop-shadow-[0_0_15px_rgba(204,255,0,0.5)] scale-105"
            },
            {
              num: "3",
              img: mascotImg,
              text: <>Today, <span className="text-primary font-medium">GHOST HOOD is just getting started.</span></>,
              imgClass: "mix-blend-lighten"
            }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.2) }}
              className="bg-card border border-card-border rounded-3xl p-8 relative group hover:-translate-y-2 transition-transform duration-500 box-glow-hover flex flex-col items-center text-center overflow-hidden"
            >
              {/* Number indicator */}
              <div className="absolute top-6 left-6 w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary font-black text-lg bg-background/50 group-hover:bg-primary group-hover:text-background transition-colors z-10">
                {card.num}
              </div>
              
              <div className="h-48 w-full flex items-center justify-center mb-8 relative">
                {/* Subtle behind-image glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/10 rounded-full blur-[30px] group-hover:bg-primary/20 transition-colors" />
                <img 
                  src={card.img} 
                  alt={`Ghost Story Part ${card.num}`} 
                  className={`h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 ${card.imgClass}`}
                />
                
                {i === 2 && (
                  <div className="absolute bottom-0 bg-primary/10 border border-primary text-primary px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase z-20 backdrop-blur-sm">
                    GHOST HOOD
                  </div>
                )}
              </div>
              
              <p className="text-foreground leading-relaxed text-sm md:text-base font-medium relative z-10">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
