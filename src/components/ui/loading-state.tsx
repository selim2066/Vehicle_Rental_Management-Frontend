"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
}

export function LoadingState({ 
  title = "Loading Data", 
  subtitle = "Retrieving your premium details..." 
}: LoadingStateProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm rounded-[3rem]">
      <div className="relative">
        {/* Animated Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-primary/40 rounded-full scale-75"
        />
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-2xl font-heading font-bold tracking-tight">
          {title}
        </p>
        <p className="text-muted-foreground text-sm font-medium mt-1">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}
