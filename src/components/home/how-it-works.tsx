"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, Calendar, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const steps = [
  {
    number: "01",
    title: "Browse the Fleet",
    description: "Search and filter premium vehicles by type, fuel, transmission, and availability.",
    icon: Search,
    floatDuration: 3.2,
  },
  {
    number: "02",
    title: "Pick Your Dates",
    description: "Choose rental start and end dates; pricing auto-calculates in real time.",
    icon: Calendar,
    floatDuration: 3.8,
  },
  {
    number: "03",
    title: "Confirm & Book",
    description: "Secure your booking instantly with JWT-authenticated checkout.",
    icon: ShieldCheck,
    floatDuration: 3.5,
  },
  {
    number: "04",
    title: "Hit the Road",
    description: "Receive confirmation and enjoy your premium vehicle journey.",
    icon: MapPin,
    floatDuration: 4.1,
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      // GSAP shadow pulse animation synced with float
      gsap.to(cardRef.current, {
        boxShadow: "0 12px 50px rgba(var(--primary-rgb), 0.22)",
        duration: step.floatDuration / 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    }
  }, [step.floatDuration, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.21, 1.11, 0.81, 0.99] // Custom spring-like curve
      }}
      className="relative group h-full"
    >
      {/* Infinite Float Animation */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: step.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ 
          y: -24, 
          scale: 1.03,
          transition: { type: "spring", stiffness: 300, damping: 20 } 
        }}
        className="h-full p-8 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-border/40 flex flex-col items-center text-center gap-6 shadow-[0_8px_40px_rgba(var(--primary-rgb),0.12)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(var(--primary-rgb),0.28)]"
      >
        {/* Ghost Number */}
        <motion.span 
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10rem] font-bold opacity-[0.03] pointer-events-none select-none z-0"
          whileHover={{ y: -4 }}
        >
          {step.number}
        </motion.span>

        {/* Icon Badge */}
        <motion.div 
          className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative z-10"
          whileHover={{ rotate: 8, scale: 1.15 }}
        >
          <step.icon className="w-8 h-8 text-primary" />
        </motion.div>

        {/* Content */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-2xl font-heading font-bold tracking-tight">{step.title}</h3>
          <p className="text-foreground/60 leading-relaxed">{step.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ConnectorLine = () => {
  return (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden lg:block -z-10 px-[12.5%]">
      <svg width="100%" height="20" viewBox="0 0 800 20" fill="none" className="overflow-visible">
        <motion.path
          d="M 0 10 Q 200 10 400 10 Q 600 10 800 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="text-border/40"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Traveling Dot */}
        <circle r="4" fill="var(--primary)">
          <animateMotion
            path="M 0 10 Q 200 10 400 10 Q 600 10 800 10"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

const MobileConnector = () => {
  return (
    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-dashed lg:hidden -z-10 opacity-20">
      <div className="h-full w-full border-l-2 border-dashed border-border/40" />
    </div>
  );
};

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heading = "How Vroom Works";
  const words = heading.split(" ");

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="how-it-works">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20"
          >
            Simple Process
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight overflow-hidden">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto"
          >
            From browse to road in four simple steps.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-20">
          <ConnectorLine />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
