import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Twitter, Send, Activity } from 'lucide-react';
import mascotImg from '@assets/2_1784019392022.png';

export default function CtaSection() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0xGH05Tc4T...c4Tgh05T";

  const handleCopy = () => {
    navigator.clipboard.writeText("0xGH05Tc4T1234567890c4Tgh05T");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-background relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_0_50px_rgba(204,255,0,0.15)]"
        >
          {/* Subtle noise/texture overlay could go here */}
          
          {/* LEFT: Mascot */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-start relative">
            <div className="relative w-full max-w-[350px] aspect-square bg-background rounded-full border-4 border-background/20 overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.15)_0%,transparent_70%)] pointer-events-none" />
              <img 
                src={mascotImg} 
                alt="Ghost Mascot" 
                className="w-full h-full object-cover mix-blend-lighten scale-110 mt-4"
              />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            <h2 className="text-4xl md:text-5xl font-black text-background mb-6 tracking-tight leading-[1.1]">
              Join the future of the $GHOST community.
            </h2>
            
            <p className="text-background/80 text-lg font-medium mb-10 max-w-lg leading-relaxed">
              Be part of a movement that's changing how we approach crypto culture and community.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-10">
              <button className="w-full sm:w-auto bg-background text-primary px-10 py-4 rounded-full font-black text-lg tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl border border-background/20 hover:bg-background/90">
                Buy $GHOST →
              </button>
              
              <div className="flex gap-3">
                <a href="#" className="w-14 h-14 rounded-full border-2 border-background/20 flex items-center justify-center text-background hover:bg-background/10 hover:border-background transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="w-14 h-14 rounded-full border-2 border-background/20 flex items-center justify-center text-background hover:bg-background/10 hover:border-background transition-colors">
                  <Send size={24} />
                </a>
                <a href="#" className="w-14 h-14 rounded-full border-2 border-background/20 flex items-center justify-center text-background hover:bg-background/10 hover:border-background transition-colors">
                  <Activity size={24} />
                </a>
              </div>
            </div>

            {/* Contract Address */}
            <div className="w-full max-w-md bg-background/5 border border-background/20 rounded-2xl p-1 relative">
              <div className="absolute -top-3 left-4 bg-primary px-2 text-[10px] font-black tracking-widest text-background uppercase">
                CONTRACT ADDRESS
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <code className="text-background font-mono font-bold text-sm tracking-wider">
                  {contractAddress}
                </code>
                <button 
                  onClick={handleCopy}
                  className="bg-background text-primary p-2 rounded-xl hover:bg-background/80 transition-colors"
                  aria-label="Copy contract address"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
