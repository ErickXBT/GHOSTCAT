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
    <div className="border-y border-gray-200 bg-gray-50/60 overflow-hidden py-3 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3.5 mx-4">
            <span className={`text-xs font-black tracking-[0.22em] uppercase ${item === '$GHOSTCAT' ? 'text-[#0052FF]' : 'text-gray-700'}`}>
              {item}
            </span>
            <span className="text-[#0052FF] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
