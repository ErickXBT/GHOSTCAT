import React from 'react';

const items = [
  'NO STRESS',
  'NO FOMO',
  '$GHOSTCAT',
  'GHOSTCAT',
  'JUST VIBES',
  'HOLD THE HOOD',
  'GHOST GANG',
  'PURR TO THE MOON',
  'NO STRESS',
  'NO FOMO',
  '$GHOSTCAT',
  'GHOSTCAT',
  'JUST VIBES',
  'HOLD THE HOOD',
  'GHOST GANG',
  'PURR TO THE MOON',
];

export default function Ticker() {
  return (
    <div className="border-y border-white/[0.07] bg-card/40 overflow-hidden py-3 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0B100C, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0B100C, transparent)' }} />

      <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-4">
            <span className="text-[11px] font-black tracking-[0.22em] uppercase text-muted-foreground">
              {item}
            </span>
            <span className="text-primary text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
