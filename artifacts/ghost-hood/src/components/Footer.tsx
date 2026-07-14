import React from 'react';
import { Twitter, Send, MessagesSquare } from 'lucide-react';
import fullLogoImg from '@assets/1_1784018793699.jpg';
import catFaceImg from '@assets/GHOST_HOOD_1784018789875.jpg';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
            <a href="#home" onClick={scrollToTop} className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30 group-hover:border-primary transition-colors">
                <img src={catFaceImg} alt="Ghost Hood" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col leading-none font-black tracking-wider">
                <span className="text-white text-xl">GHOST</span>
                <span className="text-primary text-xl">HOOD</span>
              </div>
            </a>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-8">
              Your Ghost Companion. Personalized vibes. Ghostlier you. A movement changing how we approach crypto culture.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-colors">
                <Send size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-colors">
                <MessagesSquare size={18} />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-3"></div>

          {/* Links Columns */}
          <div className="md:col-span-3 lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Product</h4>
            <nav className="flex flex-col gap-4">
              {['Why $GHOST', 'Roadmap', 'Sneak Peek'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(/ |\$/g, '').replace('peek', 'sneak-peek')}`} 
                  className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors inline-block w-fit"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="md:col-span-3 lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Community</h4>
            <nav className="flex flex-col gap-4">
              {['X (Twitter)', 'Telegram', 'DexScreener'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors inline-block w-fit"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-muted-foreground/60 text-xs font-medium">
            © {new Date().getFullYear()} GHOST HOOD. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs font-medium uppercase tracking-wider">
            GHOST HOOD is a meme utility token. Nothing here is financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
