"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HowItWorks from "@/components/home/how-it-works";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / Intro section for the page */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="max-w-8xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
              <span>Quick Guide</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tight max-w-4xl">
              Seamless Rentals, <span className="text-primary">Exceptional</span> Journeys
            </h1>
            <p className="text-foreground/60 text-lg md:text-xl max-w-2xl">
              Discover how easy it is to rent your dream car with Vroom. We've streamlined the process so you can spend less time booking and more time driving.
            </p>
          </motion.div>
        </div>
      </section>

      <HowItWorks />

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground">Ready to start your journey?</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
              Choose from our curated fleet of premium vehicles and experience luxury like never before.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Button size="lg" variant="secondary" className="h-16 px-10 rounded-2xl text-lg font-bold w-full md:w-auto group" asChild>
                <Link href="/vehicles">
                  Browse Fleet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold w-full md:w-auto bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
