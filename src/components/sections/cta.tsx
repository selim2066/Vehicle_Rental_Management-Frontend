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
          viewport={{ once: true }}
          className="relative bg-primary rounded-[3rem] p-12 md:p-24 overflow-hidden text-center"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8">
              <Star className="w-4 h-4 fill-white" />
              Limited Time Offer
            </div>
            
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white leading-[1.1] mb-8 tracking-tighter">
              Ready to hit the <br />
              <span className="italic">open road?</span>
            </h2>
            
            <p className="text-white/80 max-w-xl mx-auto text-lg md:text-xl mb-12 font-medium">
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
              <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white">
                View All Vehicles
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
