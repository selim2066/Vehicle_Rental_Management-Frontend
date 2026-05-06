"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, Clock, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    title: "Secure Payments",
    description: "Multi-layered security protocols to ensure your transactions are always safe and private.",
    icon: Shield,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Instant Booking",
    description: "Book your favorite vehicle in seconds with our streamlined, one-tap reservation system.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Global Reach",
    description: "Access our premium fleet in over 50 cities worldwide, with seamless cross-border support.",
    icon: Globe,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is always available to assist you, day or night, anywhere in the world.",
    icon: Headphones,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Flexible Rentals",
    description: "From hourly rentals to long-term leases, we offer flexible plans tailored to your specific needs.",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees, no surprises. What you see is what you pay, with detailed receipts for every trip.",
    icon: CreditCard,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight"
          >
            Why Choose <span className="text-primary">Vroom?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg"
          >
            We combine cutting-edge technology with a passion for luxury to provide a rental experience that is truly second to none.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-card border border-border/40 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
