"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Fuel, Gauge, ArrowUpRight } from "lucide-react";
import { Vehicle } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card border border-border/40 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={vehicle.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"}
          alt={vehicle.vehicle_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-primary/90 text-primary-foreground backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20 shadow-xl">
            {vehicle.brand}
          </div>
        </div>

        {vehicle.availability_status === "available" && (
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-emerald-500/90 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20 shadow-xl">
              Available
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {vehicle.vehicle_name}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
              {vehicle.type} • {vehicle.year}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">${vehicle.daily_rent_price}</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">/ day</span>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: Users, label: `${vehicle.seats} Seats` },
            { icon: Fuel, label: vehicle.fuel_type },
            { icon: Gauge, label: vehicle.transmission }
          ].map((spec, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-muted/30 border border-border/10 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors duration-500">
              <spec.icon className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-foreground/70">{spec.label}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Link 
          href={`/vehicles/${vehicle.id}`} 
          className={cn(buttonVariants({}), "w-full rounded-2xl h-14 text-lg font-bold group/btn shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300")}
        >
          View Details
          <ArrowUpRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

