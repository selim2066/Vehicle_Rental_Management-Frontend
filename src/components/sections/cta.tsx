"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          className="relative bg-primary dark:bg-muted/10 rounded-[3rem] p-12 md:p-24 overflow-hidden text-center border border-primary/10"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 dark:bg-white/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-primary/20 backdrop-blur-md border border-white/10 dark:border-primary/10 text-white dark:text-primary text-xs font-bold uppercase tracking-widest mb-8">
              <Star className="w-4 h-4 fill-white dark:fill-primary" />
              Limited Time Offer
            </div>
            
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white dark:text-foreground leading-[1.1] mb-8 tracking-tighter">
              Ready to hit the <br />
              <span className="italic">open road?</span>
            </h2>
            
            <p className="text-white/80 dark:text-muted-foreground max-w-xl mx-auto text-lg md:text-xl mb-12 font-medium">
              Join thousands of satisfied customers who have experienced the thrill of driving our premium vehicles. Your next adventure starts here.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/signup" 
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-10 h-16 text-lg font-bold group")}
              >
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/vehicles" 
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-10 h-16 text-lg font-bold bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white dark:text-foreground dark:border-primary/10")}
              >
                View All Vehicles
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
