import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import Features from "@/components/sections/features";
import CTA from "@/components/sections/cta";
import { vehicleService } from "@/services/vehicle.service";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  // Fetch featured vehicles for the landing page with safety check
  let featuredVehicles = [];
  try {
    const response = await vehicleService.getAll();
    if (response && response.success && Array.isArray(response.data)) {
      featuredVehicles = response.data.slice(0, 3);
    }
  } catch (error) {
    console.error("Failed to fetch featured vehicles:", error);
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Featured Fleet Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Our Premium Fleet</h2>
              <p className="text-foreground/60 max-w-xl text-lg">
                Explore our curated selection of high-performance and luxury vehicles, available for immediate rental.
              </p>
            </div>
            <Button variant="outline" className="rounded-full px-8 h-12 gap-2 border-border/40 group" asChild>
              <Link href="/vehicles">
                View All Vehicles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.length > 0 ? (
              featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))
            ) : (
              /* If no vehicles found in backend, show placeholder message */
              <div className="col-span-full py-20 text-center bg-card rounded-[3rem] border border-dashed border-border/60">
                <p className="text-muted-foreground text-lg">
                  {/* If no vehicles are loaded, we show a friendly message */}
                  Check back soon! Our premium fleet is currently being updated.
                </p>
                <p className="text-sm text-muted-foreground/60 mt-2">
                  (Make sure the backend is running and seeded)
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Features />
      <CTA />

      {/* Simple Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © 2026 Vroom Premium Rental. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
