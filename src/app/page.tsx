import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import Features from "@/components/sections/features";
import CTA from "@/components/sections/cta";
import Categories from "@/components/sections/categories";
import Statistics from "@/components/sections/statistics";
import Highlights from "@/components/sections/highlights";
import Testimonials from "@/components/sections/testimonials";
import Newsletter from "@/components/sections/newsletter";
import FAQ from "@/components/sections/faq";
import { vehicleService } from "@/services/vehicle.service";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function Home() {
  // Fetch featured vehicles for the landing page with safety check
  let featuredVehicles = [];
  try {
    const response = await vehicleService.getAll();
    if (response && response.success && Array.isArray(response.data)) {
      // Sort or filter featured ones if available, otherwise just first 3
      featuredVehicles = response.data.slice(0, 3);
    }
  } catch (error) {
    console.error("Failed to fetch featured vehicles:", error);
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      
      <Categories />

      {/* Featured Fleet Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Featured Fleet</h2>
              <p className="text-foreground/60 max-w-xl text-lg">
                Explore our curated selection of high-performance and luxury vehicles, available for immediate rental.
              </p>
            </div>
            <Link 
              href="/vehicles" 
              className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-8 h-12 gap-2 border-border/40 group")}
            >
              Explore Full Fleet
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.length > 0 ? (
              featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))
            ) : (
              /* If no vehicles found in backend, show skeleton-like placeholders or friendly message */
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] bg-muted animate-pulse rounded-[3rem]" />
              ))
            )}
          </div>
        </div>
      </section>

      <Statistics />
      <Features />
      <Highlights />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <CTA />
    </main>
  );
}
