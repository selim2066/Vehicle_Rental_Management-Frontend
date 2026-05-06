"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, CreditCard, Headphones } from "lucide-react";

const highlights = [
  {
    title: "Secure Rentals",
    description: "Every vehicle is fully insured and meticulously maintained for your safety.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is always available to assist you on the road.",
    icon: Headphones,
  },
  {
    title: "Flexible Payments",
    description: "Pay securely with multiple options including credit cards and local mobile banking.",
    icon: CreditCard,
  },
  {
    title: "Instant Booking",
    description: "Reserve your premium ride in minutes with our streamlined digital platform.",
    icon: Clock,
  },
];

export default function Highlights() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-[1.1]">
              The <span className="text-primary italic">Gold Standard</span> in Vehicle Rentals
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              We've redefined the rental experience by combining premium fleet selection with world-class customer service and cutting-edge technology.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              {highlights.map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[4rem] overflow-hidden group shadow-2xl shadow-primary/20"
            >
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop" 
                alt="Premium Interior" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <p className="text-white text-3xl font-bold tracking-tight italic">
                  "Unmatched quality, exceptional comfort."
                </p>
              </div>
            </motion.div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 p-8 bg-card border border-border/40 rounded-[2.5rem] shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="font-bold text-lg">Fully Verified</p>
                  <p className="text-sm text-muted-foreground">Certified Premium Fleet</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
