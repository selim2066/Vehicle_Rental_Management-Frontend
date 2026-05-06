"use client";

import { motion } from "framer-motion";
import { Users, Car, MapPin, Award } from "lucide-react";

const stats = [
  { label: "Happy Customers", value: "15k+", icon: Users },
  { label: "Premium Vehicles", value: "250+", icon: Car },
  { label: "Available Cities", value: "12", icon: MapPin },
  { label: "Awards Won", value: "24", icon: Award },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{stat.value}</h3>
                <p className="text-primary-foreground/70 font-medium uppercase tracking-wider text-sm mt-2">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
