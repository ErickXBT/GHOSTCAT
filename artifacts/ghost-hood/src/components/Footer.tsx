import React from 'react';
import { Twitter, Send, MessagesSquare } from 'lucide-react';
import catFaceImg from '@assets/ghostcat_logo.jpg';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background border-t border-white/[0.06] overflow-hidden" style={{ backgroundColor: '#0B100C' }}>
      {/* Main footer content */}
      <div className="container mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#home" onClick={scrollToTop} className="flex items-center gap-2 group mb-4">
              <div className="w-6 h-6 rounded-sm overflow-hidden border border-primary/30 group-hover:border-primary transition-colors shrink-0">
                <img src={catFaceImg} alt="GHOSTCAT" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold tracking-[0.18em] text-xs uppercase text-white/80">GHOSTCAT</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              The open ghost ecosystem. A stress-free, fomo-free token with on-chain vibes.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: Twitter, href: "https://x.com/heyghostcat" },
                { Icon: Send, href: "https://t.me/heyghostcat" },
                { Icon: MessagesSquare, href: "#" }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  className="w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/25 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Product links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[10px] font-black tracking-[0.22em] uppercase text-muted-foreground mb-5">Product</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Why $GHOSTCAT', href: '#why-ghost' },
                { label: 'Roadmap', href: '#roadmap' },
                { label: 'Sneak Peek', href: '#sneak-peek' },
                { label: 'AI Healthcare', href: '/healthcare' },
                { label: 'Ghost Game', href: '/game' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[10px] font-black tracking-[0.22em] uppercase text-muted-foreground mb-5">Resources</h4>
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
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground/50 text-xs">
            MIT licensed · © {new Date().getFullYear()} GHOSTCAT. GHOSTCAT is a meme utility token — not financial advice.
          </p>
          <a
            href="#home"
            onClick={scrollToTop}
            className="text-muted-foreground/50 text-xs hover:text-white transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>

      {/* Giant watermark text */}
      <div
        className="w-full overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
        style={{ marginTop: '-0.5rem' }}
      >
        <p
          className="font-black text-center leading-none tracking-tight whitespace-nowrap"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(4rem, 18vw, 18rem)',
            color: 'rgba(255,255,255,0.028)',
            lineHeight: 0.85,
          }}
        >
          GHOSTCAT
        </p>
      </div>
    </footer>
  );
}
