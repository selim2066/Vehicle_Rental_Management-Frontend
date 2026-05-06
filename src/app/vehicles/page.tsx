import { vehicleService } from "@/services/vehicle.service";
import Navbar from "@/components/layout/navbar";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function VehiclesPage() {
  let vehicles: any[] = [];
  try {
    const response = await vehicleService.getAll();
    if (response && response.success && Array.isArray(response.data)) {
      vehicles = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
  }

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
              <Button variant="outline" className="rounded-full px-6 gap-2 border-border/40 hover:bg-primary/5">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <div className="text-sm font-semibold flex items-center gap-2 bg-background border border-border/40 px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {vehicles.length} Vehicles Available
              </div>
            </div>
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
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
