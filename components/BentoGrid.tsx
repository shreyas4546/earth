import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BentoItemProps } from '../types';

const BentoItem: React.FC<BentoItemProps> = ({ title, description, icon, colSpan = 1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Main parallax for the card itself (moves slightly against scroll)
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  // Internal parallax for the blob (moves faster than card for depth)
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`
        h-full
        ${colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}
        ${colSpan === 3 ? 'md:col-span-3' : ''}
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(99, 102, 241, 0.5)", 
          boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.3)" 
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
        className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm group cursor-default"
      >
        {/* Decorative Blur blob that reacts to hover and scroll */}
        <motion.div 
            style={{ y: blobY }}
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/40 group-hover:scale-150" 
        />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium text-white tracking-tight transition-colors group-hover:text-primary">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BentoItem;