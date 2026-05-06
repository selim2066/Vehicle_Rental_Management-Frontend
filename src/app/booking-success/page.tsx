"use client";

import Navbar from "@/components/layout/navbar";
import { CheckCircle2, Calendar, Car, ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen pt-24 bg-background">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-green-500/20 shadow-2xl shadow-green-500/10"
          >
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-6"
          >
            Booking <span className="text-primary italic">Confirmed!</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto"
          >
            Your luxury ride is waiting for you. We've sent the confirmation details and pick-up instructions to your email.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <div className="p-8 rounded-[2.5rem] bg-card border border-border/40 text-left">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-1">Pick-up Info</h3>
              <p className="text-sm text-muted-foreground">Check your dashboard for the exact location and agent contact details.</p>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-card border border-border/40 text-left">
              <Car className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-1">Premium Support</h3>
              <p className="text-sm text-muted-foreground">Our 24/7 concierge is available if you need any assistance with your rental.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/dashboard" 
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10 h-16 text-lg font-bold w-full sm:w-auto gap-2")}
            >
              <LayoutDashboard className="w-5 h-5" />
              Go to Dashboard
            </Link>
            <Link 
              href="/vehicles" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-10 h-16 text-lg font-bold w-full sm:w-auto")}
            >
              Rent Another Car
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
