"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="max-w-7xl mx-auto rounded-[4rem] bg-card border border-border/40 overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 p-12 md:p-24 items-center">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-none">
              Stay Updated on <span className="text-primary">Exclusive</span> Deals
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Subscribe to our newsletter and be the first to know about new fleet additions and special member discounts.
            </p>
          </div>

          <div className="relative">
            <form className="flex flex-col sm:flex-row gap-4 p-3 rounded-[2.5rem] bg-muted/50 border border-border/40 focus-within:border-primary/40 transition-colors">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="h-14 bg-transparent border-none focus-visible:ring-0 text-lg px-6 rounded-full"
                required
              />
              <Button className="h-14 px-10 rounded-full gap-2 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Subscribe
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4 text-center sm:text-left px-6">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
