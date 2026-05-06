"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Car } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export const CarScrollbar = () => {
  const { scrollYProgress } = useScroll();
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Smooth out the scroll progress for the car position
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate left position for horizontal movement
  const carLeft = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = clickX / rect.width;
    const scrollTarget = progress * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-10 left-0 right-0 z-[9999] px-10 hidden lg:block select-none">
      <div className="max-w-7xl mx-auto">
        {/* Scroll Track Container */}
        <div 
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative h-12 w-full flex items-center group cursor-pointer"
          title="Click to navigate"
        >
          {/* Track Line - Futuristic aesthetic */}
          <div className="relative h-1.5 w-full bg-muted/20 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm group-hover:bg-muted/30 transition-colors">
            {/* Animated Progress Fill */}
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-primary/80 to-primary/40 rounded-full origin-left"
              style={{ scaleX: smoothProgress }}
            />
          </div>

          {/* Decorative Markers */}
          <div className="absolute inset-x-0 h-4 flex justify-between px-4 pointer-events-none opacity-40">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-full w-[1px] bg-primary/30" />
            ))}
          </div>

          {/* The Car "Thumb" */}
          <motion.div
            className="absolute top-1/2 z-10 pointer-events-none"
            style={{ 
              left: carLeft,
              x: "-50%",
              y: "-50%" 
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Glow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-12 h-12 bg-primary/30 blur-xl rounded-full"
              />
              
              {/* Car Icon Container */}
              <div className="relative bg-background border-2 border-primary/50 p-2 rounded-2xl shadow-[0_0_25px_rgba(var(--primary),0.4)] backdrop-blur-md flex items-center justify-center transform transition-transform group-hover:scale-110">
                <Car className="w-6 h-6 text-primary" />
                
                {/* Speed Lines Effect (horizontal) */}
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-[2px] w-4 bg-primary/20 rounded-full" />
                  <div className="h-[2px] w-2 bg-primary/10 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Label */}
          <div className="absolute -bottom-6 right-0">
             <span className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">
                VROOM CRUISE CONTROL
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};
