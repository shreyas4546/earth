import React, { useEffect, useRef } from 'react';

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: { x: number; y: number; age: number }[] = [];
    let mouse: { x: number; y: number } | null = null;
    const maxAge = 25;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse) {
        // Add new point at current mouse position
        points.push({ x: mouse.x, y: mouse.y, age: 0 });
      }

      // Remove old points
      if (points.length > maxAge) {
        points.shift();
      }
      
      // Update ages
      points.forEach(p => p.age++);

      // Draw trail
      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw segments to create a tapering effect
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Calculate opacity and width based on age
          // Newest points (low age, ratio ~1) are opaque and thick
          const ageRatio = 1 - (p1.age / maxAge);
          
          // Width tapers from 6px to 0px
          ctx.lineWidth = ageRatio * 6; 
          
          // Interpolate colors: Primary (#6366f1) -> Accent (#a855f7)
          // Primary RGB: 99, 102, 241
          // Accent RGB: 168, 85, 247
          // Newest (ageRatio 1) = Primary
          // Oldest (ageRatio 0) = Accent
          const r = Math.floor(99 * ageRatio + 168 * (1 - ageRatio));
          const g = Math.floor(102 * ageRatio + 85 * (1 - ageRatio));
          const b = Math.floor(241 * ageRatio + 247 * (1 - ageRatio));

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ageRatio * 0.5})`; 
          
          // Add glow
          ctx.shadowBlur = 8 * ageRatio;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
          
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 mix-blend-screen" />;
};