import React from 'react';
import { Twitter, Send, MessagesSquare } from 'lucide-react';
import { ghostCatLogo } from '@/assets';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t border-gray-200 overflow-hidden text-gray-900">
      {/* Main footer content */}
      <div className="container mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#home" onClick={scrollToTop} className="flex items-center gap-2 group mb-4">
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-gray-200 group-hover:border-[#0052FF] transition-colors shrink-0">
                <img src={ghostCatLogo} alt="GHOSTCAT" className="w-full h-full object-cover" />
              </div>
              <span className="font-black tracking-[0.14em] text-sm uppercase text-gray-950">
                GHOST<span className="text-[#0052FF]">CAT</span>
              </span>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              The open ghost ecosystem. A stress-free, fomo-free token with transparent on-chain vibes.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: Twitter, href: "https://x.com/heyghostcat", label: "Twitter" },
                { Icon: Send, href: "https://t.me/heyghostcat", label: "Telegram" },
                { Icon: MessagesSquare, href: "#", label: "Chat" }
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:text-[#0052FF] hover:border-[#0052FF] transition-colors shadow-sm"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Product links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[11px] font-black tracking-[0.22em] uppercase text-gray-400 mb-5">Product</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'About $GHOSTCAT', href: '#about' },
                { label: 'Ghost Story', href: '#story' },
                { label: 'Why $GHOSTCAT', href: '#why-ghost' },
                { label: 'Roadmap', href: '#roadmap' },
                { label: 'Ghost Gallery', href: '#gallery' },
                { label: 'Ghost Game', href: '/game' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 text-sm hover:text-[#0052FF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[11px] font-black tracking-[0.22em] uppercase text-gray-400 mb-5">Resources</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'X (Twitter)', href: 'https://x.com/heyghostcat' },
                { label: 'Telegram', href: 'https://t.me/heyghostcat' },
                { label: 'DexScreener', href: '#' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href !== '#' ? '_blank' : undefined}
                  rel={link.href !== '#' ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 text-sm hover:text-[#0052FF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            MIT licensed · © {new Date().getFullYear()} GHOSTCAT. GHOSTCAT is a meme utility token — not financial advice.
          </p>
          <a
            href="#home"
            onClick={scrollToTop}
            className="text-gray-500 text-xs hover:text-[#0052FF] transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>

      {/* Giant bold branded statement text */}
      <div
        className="w-full overflow-hidden select-none py-6 border-t border-gray-100"
        aria-hidden="true"
      >
        <p
          className="font-black text-center leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(3.5rem, 16vw, 16rem)',
            lineHeight: 0.88,
          }}
        >
          <span className="text-black">GHOST</span>
          <span className="text-[#0052FF]">CAT</span>
        </p>
      </div>
    </footer>
  );
}
