import { vehicleService } from "@/services/vehicle.service";
import Navbar from "@/components/layout/navbar";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const currentCategory = params.type || "all";
  
  let vehicles: any[] = [];
  try {
    const response = await vehicleService.getAll(params);
    if (response && response.success && Array.isArray(response.data)) {
      vehicles = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
  }

  const categories = [
    { name: "All", value: "all" },
    { name: "Luxury", value: "luxury" },
    { name: "SUV", value: "SUV" },
    { name: "Sedan", value: "sedan" },
    { name: "Sports", value: "sports" },
    { name: "Electric", value: "electric" },
  ];

  return (
    <main className="min-h-screen pt-24">
      <Navbar />
      
      {/* Header Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Explore Our Fleet</h1>
              <p className="text-muted-foreground max-w-xl">
                Choose from our wide range of premium vehicles. Whether you're looking for luxury, speed, or utility, we have the perfect ride for you.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-sm font-semibold flex items-center gap-2 bg-background border border-border/40 px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {vehicles.length} Vehicles Available
              </div>
            </div>
          </div>

          {/* Categories Filter Bar */}
          <div className="flex items-center gap-3 mt-12 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/vehicles" : `/vehicles?type=${cat.value}`}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border",
                  currentCategory === cat.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground/60 border-border/40 hover:border-primary/40 hover:text-primary"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-[3rem] border border-dashed border-border/60">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No vehicles found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
              <Button variant="link" asChild className="mt-4">
                <Link href="/vehicles">Clear all filters</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
