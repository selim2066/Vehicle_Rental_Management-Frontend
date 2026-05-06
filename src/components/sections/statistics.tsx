"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Users, Car, MapPin, Award } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Happy Customers", value: 15, suffix: "k+", icon: Users },
  { label: "Premium Vehicles", value: 250, suffix: "+", icon: Car },
  { label: "Available Cities", value: 12, suffix: "", icon: MapPin },
  { label: "Awards Won", value: 24, suffix: "", icon: Award },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001
  });
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function Statistics() {
  return (
    <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: i * 0.1 
              }}
              viewport={{ once: false }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-[2rem] bg-white/10 mb-6 group-hover:bg-white/20 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-5xl md:text-6xl font-bold tracking-tighter flex items-center justify-center">
                  <Counter value={stat.value} />
                  <span className="text-white/80">{stat.suffix}</span>
                </h3>
                <p className="text-primary-foreground/60 font-bold uppercase tracking-widest text-[10px] mt-2">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
