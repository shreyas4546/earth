import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Globe, 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  Cpu, 
  ArrowRight 
} from 'lucide-react';
import { Header } from './components/Header';
import { Hero3D } from './components/Hero3D';
import BentoItem from './components/BentoGrid';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { MagneticButton } from './components/ui/MagneticButton';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-white selection:bg-primary/30 selection:text-white">
      <NoiseOverlay />
      <Header />

      {/* Ambient Background Lights (Aurora) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/20 blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 overflow-hidden">
          
          {/* Background 3D Layer */}
          <div className="absolute inset-0 z-0">
             <Hero3D />
             {/* Gradient overlay to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />
             <div className="absolute inset-0 bg-background/30 pointer-events-none" />
          </div>

          <div className="z-10 flex flex-col items-center text-center max-w-4xl pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary backdrop-blur-sm"
            >
              Redefining Digital Experiences
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
              className="mb-8 text-5xl font-bold leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl"
            >
              We Craft <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                Digital Gravity.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-10 max-w-xl text-lg text-gray-300 md:text-xl leading-relaxed"
            >
              Lumina is a strategic design agency blending 3D interaction, fluid motion, and robust engineering to build brands that matter.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex gap-4 pointer-events-auto"
            >
               <MagneticButton>
                  <button className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-gray-200 hover:scale-105">
                    Start a Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
               </MagneticButton>
               <MagneticButton>
                  <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                    View Showreel
                  </button>
               </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* FEATURES SECTION (Bento Grid) */}
        <section className="relative z-10 px-4 py-32 md:px-20" id="services">
          <div className="mb-20">
             <motion.h2 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
             >
               Our Expertise
             </motion.h2>
             <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
            <BentoItem 
              title="Global Scale"
              description="Infrastructure designed to handle millions of requests without breaking a sweat. Edge-ready."
              icon={<Globe className="h-6 w-6 text-white" />}
              colSpan={2}
            />
            <BentoItem 
              title="Lightning Fast"
              description="Optimized for Core Web Vitals. We don't just build websites; we build performance engines."
              icon={<Zap className="h-6 w-6 text-white" />}
            />
            <BentoItem 
              title="Data Driven"
              description="Analytics integrated at the core. Decisions backed by real user behavior data."
              icon={<BarChart3 className="h-6 w-6 text-white" />}
            />
            <BentoItem 
              title="Mobile First"
              description="Responsive design isn't an afterthought. It's our starting point for every pixel."
              icon={<Smartphone className="h-6 w-6 text-white" />}
            />
             <BentoItem 
              title="Secure by Default"
              description="Enterprise-grade security standards applied to every project, no matter the size."
              icon={<ShieldCheck className="h-6 w-6 text-white" />}
            />
             <BentoItem 
              title="Next-Gen Tech"
              description="Leveraging the latest in AI, WebGL, and React Server Components to stay ahead."
              icon={<Cpu className="h-6 w-6 text-white" />}
              colSpan={3}
            />
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative py-32 flex flex-col items-center justify-center px-4 text-center overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
           
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="z-10 max-w-3xl"
           >
             <h2 className="mb-8 text-5xl font-bold tracking-tighter md:text-7xl">
               Ready to create <br/> something impossible?
             </h2>
             <MagneticButton>
                <button className="rounded-full bg-gradient-to-r from-primary to-accent px-10 py-5 text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105">
                  Get in Touch
                </button>
             </MagneticButton>
           </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black py-12 px-4 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
               <div className="h-4 w-4 rounded-full bg-white" />
               <span className="font-bold">Lumina</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 Lumina Agency Inc.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;