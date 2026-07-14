import React from 'react';
import { motion } from 'framer-motion';
import mascotImg from '@assets/2_1784019392022.png';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-start max-w-2xl z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8"
            >
              <span className="text-[10px]">✦</span> Powered by Community
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-white mb-6"
            >
              Your Ghost <br/>
              <span className="text-primary text-glow drop-shadow-md">$GHOST</span> <br/>
              Companion.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed"
            >
              Personalized vibes. Smarter moves. Ghostlier you. Powered by $GHOST.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-background font-black text-lg tracking-wide hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                Buy $GHOST →
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-white/20 text-white font-bold text-lg hover:border-white hover:bg-white/5 transition-all">
                Learn More
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 opacity-60"
            >
              <span className="text-primary">✦</span> Built on blockchain
            </motion.div>
          </div>

          {/* RIGHT: Mascot */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-center relative z-0 min-h-[400px]">
            {/* Glow behind mascot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[100px]" />
            
            <motion.img 
              src={mascotImg} 
              alt="Ghost Hood Mascot" 
              className="w-full max-w-[400px] md:max-w-[550px] lg:max-w-[650px] object-contain relative z-10 mix-blend-lighten pointer-events-none"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
        </div>
      </div>

      {/* Bottom Feature Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full mt-24 px-6"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-card rounded-2xl border border-card-border shadow-2xl relative overflow-hidden">
            {/* Very subtle glow in the card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />
            
            {[
              { title: "AI-Powered. Privacy First.", desc: "Your vibe is yours. We haunt the chain for you." },
              { title: "Ghost Ecosystem", desc: "$GHOST powers the future Ghost community." },
              { title: "Early Haunters Win", desc: "Community comes first. Early believers grow with the ecosystem." },
              { title: "More Than a Meme", desc: "A real product roadmap backed by a long-term vision." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h3 className="text-white font-bold text-sm tracking-wide">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed pl-4.5">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
