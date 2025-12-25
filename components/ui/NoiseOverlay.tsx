import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.80" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};