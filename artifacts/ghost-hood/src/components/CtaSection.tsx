import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Send, Activity } from 'lucide-react';

export default function CtaSection() {
  const contractAddress = 'TBA — Contract not yet deployed';

  return (
    <section
      id="timeline"
      className="py-24 px-6 md:px-10 border-t border-gray-200"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-gray-200 shadow-xl shadow-gray-100 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ backgroundColor: '#ffffff' }}
        >
          {/* Subtle blue ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(0,82,255,0.06) 0%, transparent 60%)',
            }}
          />

          <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#0052FF] mb-3">
            WHAT'S THE TIMELINE?
          </p>

          <h2
            className="font-black leading-[1.02] tracking-tight text-gray-950 mb-3"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            What's the <span className="text-[#0052FF]">Timeline?</span>
          </h2>

          <p className="text-gray-600 text-base max-w-lg mx-auto mb-8">
            Signed off by the hood. Zero stress, zero FOMO. Pure on-chain transparency and high-conviction vibes. The ticker is:
          </p>

          {/* Ticker badge */}
          <div className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black tracking-widest uppercase rounded-full shadow-md shadow-blue-500/20"
              style={{ backgroundColor: '#0052FF', color: '#ffffff' }}
            >
              <span>✦</span> $GHOSTCAT <span>✦</span>
            </span>
          </div>

          {/* Contract Address */}
          <div
            className="border border-gray-200 rounded-2xl px-5 py-4 mb-8 text-left mx-auto max-w-md shadow-sm"
            style={{ backgroundColor: '#f9fafb' }}
          >
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-500 mb-1">
              CONTRACT ADDRESS
            </p>
            <code className="text-sm font-mono tracking-wider text-gray-900 font-semibold block truncate">
              {contractAddress}
            </code>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              className="w-full sm:w-auto px-8 py-3.5 font-black text-sm tracking-widest uppercase rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
              style={{ backgroundColor: '#0052FF', color: '#ffffff' }}
            >
              Buy $GHOSTCAT ↗
            </button>
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 font-bold text-sm tracking-wider uppercase border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-colors rounded-xl shadow-sm"
              style={{ backgroundColor: '#ffffff' }}
            >
              <span style={{ color: '#0052FF' }}>✦</span> Launched on Chain
            </button>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex justify-center gap-3">
            {[
              { Icon: Twitter, href: "https://x.com/heyghostcat", label: "Twitter" },
              { Icon: Send, href: "https://t.me/heyghostcat", label: "Telegram" },
              { Icon: Activity, href: "#", label: "Activity" }
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                aria-label={label}
                target={href !== '#' ? '_blank' : undefined}
                rel={href !== '#' ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#0052FF] hover:border-[#0052FF] transition-colors shadow-sm"
                style={{ backgroundColor: '#ffffff' }}
              >
                <Icon size={16} />
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
          className="mt-8 border border-gray-200 rounded-2xl p-6 flex items-start justify-between gap-4 shadow-sm"
          style={{ backgroundColor: '#f9fafb' }}
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">
              SIGNATURE
            </p>
            <p className="text-gray-950 font-bold italic text-base mb-1">Best regards,</p>
            <p className="text-gray-950 font-black text-sm">Ghost Cat</p>
            <p className="text-gray-600 text-xs">No Stress, No Fomo. Still haunting.</p>
            <p className="text-gray-400 text-[10px] mt-2 font-mono">Away message: vibes, hood, ghostcat.</p>
          </div>
          <span
            className="shrink-0 px-3 py-1.5 text-xs font-black tracking-widest rounded-lg border border-blue-200"
            style={{ backgroundColor: '#eff6ff', color: '#0052FF' }}
          >
            $GHOSTCAT
          </span>
        </motion.div>
      </div>
    </section>
  );
}
