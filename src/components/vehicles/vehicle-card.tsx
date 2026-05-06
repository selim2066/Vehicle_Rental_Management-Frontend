"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Fuel, Gauge, ArrowUpRight } from "lucide-react";
import { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card border border-border/40 rounded-[2rem] overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={vehicle.images?.[0] || "/images/placeholder-car.png"}
          alt={vehicle.vehicle_name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 shadow-lg">
            {vehicle.brand}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
              {vehicle.vehicle_name}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {vehicle.type} • {vehicle.year}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-primary">${vehicle.daily_rent_price}</span>
            <span className="text-[10px] block text-muted-foreground font-bold">/ DAY</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-muted/50 border border-border/20">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] font-bold">{vehicle.seats} Seats</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-muted/50 border border-border/20">
            <Fuel className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] font-bold capitalize">{vehicle.fuel_type}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-muted/50 border border-border/20">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] font-bold capitalize">{vehicle.transmission}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full rounded-2xl h-12 font-bold group/btn" asChild>
          <Link href={`/vehicles/${vehicle.id}`}>
            View Details
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
