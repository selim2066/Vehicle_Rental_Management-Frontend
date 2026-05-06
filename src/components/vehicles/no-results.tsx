"use client";

import { motion } from "framer-motion";
import { Filter, SearchX, RotateCcw, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoResults() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-32 px-6 bg-card/50 backdrop-blur-xl rounded-[4rem] border border-border/40 max-w-4xl mx-auto relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        <div className="relative w-32 h-32 mx-auto mb-10">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)]"
          >
            <CarFront className="w-16 h-16 text-primary/60" />
          </motion.div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-lg">
            <SearchX className="w-5 h-5 text-destructive" />
          </div>
        </div>

        <h2 className="text-4xl font-heading font-bold mb-6 tracking-tight">
          Garage is <span className="text-primary italic">Empty</span>
        </h2>
        <p className="text-muted-foreground text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          We couldn&apos;t find any vehicles matching your current selection. Let&apos;s try widening your search criteria.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="rounded-full px-10 h-14 font-bold text-lg group gap-2 shadow-xl shadow-primary/20" asChild>
            <Link href="/vehicles">
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Reset All Filters
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-10 h-14 font-bold text-lg border-border/60 hover:bg-muted/50" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        
        {/* Subtle hint */}
        <p className="mt-12 text-sm text-muted-foreground/60 font-medium tracking-wide uppercase">
          Pro tip: Try searching by brand or body type
        </p>
      </div>
    </motion.div>
  );
}
