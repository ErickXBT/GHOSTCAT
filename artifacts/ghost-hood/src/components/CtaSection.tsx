import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Twitter, Send, Activity } from 'lucide-react';

export default function CtaSection() {
  const [copied, setCopied] = useState(false);
  const contractAddress = '0xdc73a7295d1d9be1543d96e333950af7...';

  const handleCopy = () => {
    navigator.clipboard.writeText('0xdc73a7295d1d9be1543d96e333950af7ghost');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-28 px-6 md:px-10 grid-bg" style={{ backgroundColor: '#0B100C' }}>
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-white/[0.07] rounded-xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(204,255,0,0.05) 0%, transparent 60%)' }} />

          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-6">
            WHAT'S THE TIMELINE?
          </p>

          <h2
            className="font-black leading-[0.93] tracking-tight text-white mb-3"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
          >
            What's the timeline?
          </h2>

          <p className="text-muted-foreground text-base italic mb-8">
            Signed off by the hood. The ticker is:
          </p>

          {/* Ticker badge */}
          <div className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-black tracking-widest uppercase rounded-sm"
              style={{ backgroundColor: '#CCFF00', color: '#0B100C' }}
            >
              $GHOSTCAT
              <span className="opacity-60 text-xs">✦</span>
            </span>
          </div>

          {/* Contract Address */}
          <div
            className="border border-white/[0.07] rounded-lg px-5 py-4 mb-6 flex items-center justify-between gap-4 text-left mx-auto max-w-md"
            style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
          >
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-1">CONTRACT ADDRESS</p>
              <code className="text-sm font-mono text-white/70 tracking-wider">{contractAddress}</code>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/25 transition-colors"
              aria-label="Copy"
            >
              {copied ? <Check size={15} style={{ color: '#CCFF00' }} /> : <Copy size={15} />}
            </button>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              className="px-7 py-3 font-black text-sm tracking-widest uppercase rounded-sm transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#CCFF00', color: '#0B100C' }}
            >
              Buy $GHOSTCAT ↗
            </button>
            <button
              className="inline-flex items-center gap-2 px-7 py-3 font-semibold text-sm tracking-wider uppercase border border-white/15 text-muted-foreground hover:text-white hover:border-white/30 transition-colors rounded-sm"
            >
              <span style={{ color: '#CCFF00' }}>✦</span> Launched on Chain
            </button>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex justify-center gap-3">
            {[Twitter, Send, Activity].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/25 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Signature block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 border border-white/[0.07] rounded-lg p-6 flex items-start justify-between gap-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.015)' }}
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">SIGNATURE</p>
            <p className="text-white font-bold italic text-base mb-1">Best regards,</p>
            <p className="text-white font-black text-sm">Ghost Cat</p>
            <p className="text-muted-foreground text-xs">No Stress, No Fomo. Still haunting.</p>
            <p className="text-muted-foreground/40 text-[10px] mt-2">Away message: vibes, hood, ghostcat.</p>
          </div>
          <span
            className="shrink-0 px-2.5 py-1 text-[11px] font-black tracking-widest rounded-sm"
            style={{ backgroundColor: '#CCFF00', color: '#0B100C' }}
          >
            $GHOSTCAT
          </span>
        </motion.div>
      </div>
    </section>
  );
}
