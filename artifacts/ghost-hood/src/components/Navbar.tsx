import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import catFaceImg from '@assets/GHOST_HOOD_1784018789875.jpg';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Story', href: '#story' },
  { name: 'Why $GHOST', href: '#why-ghost' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Sneak Peek', href: '#sneak-peek' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-3 z-50 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 group-hover:border-primary transition-colors">
            <img src={catFaceImg} alt="Ghost Hood" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none font-black tracking-wider">
            <span className="text-white text-lg">GHOST</span>
            <span className="text-primary text-lg">HOOD</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="relative text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-white transition-colors py-2"
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-card hover:bg-card-border border border-primary/30 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all hover:box-glow hover:border-primary group">
            Buy $GHOST
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform text-primary">→</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 h-screen bg-background border-b border-white/10 pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-2xl font-bold uppercase tracking-wider ${
                    activeSection === link.href.substring(1) ? 'text-primary' : 'text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8">
                <button className="bg-primary text-background px-8 py-4 rounded-full font-bold text-lg tracking-wide w-full max-w-xs mx-auto">
                  Buy $GHOST →
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
