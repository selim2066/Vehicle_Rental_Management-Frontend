import Navbar from "@/components/layout/navbar";
import { Search, Calendar, Car, Key, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Find Your Match",
      desc: "Browse our extensive collection of premium vehicles and choose the one that fits your style and needs.",
      icon: Search,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Pick Your Dates",
      desc: "Select your pick-up and drop-off dates. Our flexible booking system lets you rent by the day or week.",
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "Easy Booking",
      desc: "Confirm your reservation with our secure checkout. No hidden fees, just simple, transparent pricing.",
      icon: Car,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Hit the Road",
      desc: "Collect your keys and start your journey. Our 24/7 support is always here if you need anything.",
      icon: Key,
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ];

  return (
    <main className="min-h-screen pt-24 bg-background">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">Simple <span className="text-primary italic">Process.</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              We've redesigned the car rental experience from the ground up to be as smooth as the drive itself.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/40 -translate-y-1/2 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {steps.map((step, i) => (
                <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
                  <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl transition-transform hover:scale-110 duration-300", step.bg)}>
                    <step.icon className={cn("w-10 h-10", step.color)} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center text-xs font-bold mb-6 lg:absolute lg:top-1/2 lg:-translate-y-1/2">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 mt-4 lg:mt-12">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-32 relative rounded-[4rem] overflow-hidden aspect-[21/9] flex items-center justify-center group">
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              alt="Luxury Car"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <div className="relative z-10 text-center text-white px-6">
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Ready to start your journey?</h2>
              <Link href="/vehicles" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-12 h-16 text-lg font-bold")}>
                Browse the Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
