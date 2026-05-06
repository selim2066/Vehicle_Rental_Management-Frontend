"use client";

import { useState, useEffect } from "react";
import { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import Link from "next/link";

interface BookingFormProps {
  vehicle: Vehicle;
}

export default function BookingForm({ vehicle }: BookingFormProps) {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (end >= start) {
        setTotalDays(diffDays || 1); // Minimum 1 day
        setTotalPrice((diffDays || 1) * vehicle.daily_rent_price);
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, vehicle.daily_rent_price]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to book a vehicle");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    toast.success("Booking initiated! Redirecting to checkout...");
    // TODO: Implement actual booking logic
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border/40 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-1">Price</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-heading font-bold text-primary">${vehicle.daily_rent_price}</span>
            <span className="text-muted-foreground font-medium">/ day</span>
          </div>
        </div>
        <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
          Available Now
        </div>
      </div>

      <form onSubmit={handleBooking} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Pick-up Date</label>
              <div className="relative group">
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Drop-off Date</label>
              <div className="relative group">
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="date"
                  required
                  min={startDate || new Date().toISOString().split("T")[0]}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {totalDays > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-4 border-t border-border/40"
            >
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">${vehicle.daily_rent_price} x {totalDays} days</span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Insurance & Fees</span>
                <span className="text-green-500 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border/40 border-dashed">
                <span>Total Amount</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {user ? (
          <Button type="submit" className="w-full h-16 rounded-2xl text-lg font-bold group mt-4">
            Confirm Booking
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <Button type="button" variant="secondary" className="w-full h-16 rounded-2xl text-lg font-bold group mt-4" asChild>
            <Link href="/signin">
              Sign In to Book
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        )}
      </form>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground font-medium">
            Your booking includes standard insurance and 24/7 roadside assistance.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          Cancellation Policy
        </div>
      </div>
    </motion.div>
  );
}
