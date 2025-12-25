import React from 'react';
import { motion } from 'framer-motion';
import { BentoItemProps } from '../types';

const BentoItem: React.FC<BentoItemProps> = ({ title, description, icon, colSpan = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className={`
        relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 
        backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10
        ${colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}
        ${colSpan === 3 ? 'md:col-span-3' : ''}
        group
      `}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-all group-hover:bg-primary/30" />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-white">
          {icon}
        </div>
        <div>
          <h3 className="mb-2 text-xl font-medium text-white tracking-tight">{title}</h3>
          <p className="text-sm leading-relaxed text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BentoItem;