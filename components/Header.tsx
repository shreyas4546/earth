import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Adjust background opacity based on scroll
    setBgOpacity(Math.min(latest / 200, 0.8));
  });

  const links = ['Work', 'Services', 'Agency', 'Contact'];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pt-6 px-4"
    >
      <div 
        className="w-full max-w-5xl rounded-full border border-white/10 px-6 py-3 backdrop-blur-md transition-all duration-300"
        style={{ backgroundColor: `rgba(3, 7, 18, ${bgOpacity})` }}
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-primary to-accent" />
            <span className="font-bold tracking-tight text-white">Lumina</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <MagneticButton key={link} className="cursor-pointer">
                <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                  {link}
                </a>
              </MagneticButton>
            ))}
          </div>

          <div className="hidden md:block">
             <MagneticButton>
                <button className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-transform hover:scale-105">
                  Let's Talk
                </button>
             </MagneticButton>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-4 right-4 rounded-3xl bg-surface border border-white/10 p-6 md:hidden backdrop-blur-xl"
        >
           <div className="flex flex-col gap-6 items-center">
            {links.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="text-lg font-medium text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
             <button className="w-full rounded-full bg-white py-3 text-sm font-bold text-black">
                  Let's Talk
            </button>
           </div>
        </motion.div>
      )}
    </motion.header>
  );
};