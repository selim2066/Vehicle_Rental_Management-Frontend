"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Car, Zap, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Luxury",
    description: "Experience the ultimate in comfort and style.",
    icon: Sparkles,
    href: "/vehicles?type=luxury",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    name: "SUV",
    description: "Spacious and powerful for all your adventures.",
    icon: Shield,
    href: "/vehicles?type=suv",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    name: "Sports",
    description: "High-performance engines for thrill seekers.",
    icon: Zap,
    href: "/vehicles?type=sports",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    name: "Standard",
    description: "Reliable and efficient for everyday travel.",
    icon: Car,
    href: "/vehicles?type=standard",
    color: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-8xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Browse by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect vehicle for any occasion, from business meetings to weekend getaways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: false }}
            >
              <Link
                href={category.href}
                className="group block p-8 rounded-[2rem] bg-card border border-border/40 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", category.color)}>
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
