import { vehicleService } from "@/services/vehicle.service";
import Navbar from "@/components/layout/navbar";
import VehicleCard from "@/components/vehicles/vehicle-card";
import VehicleFilters from "@/components/vehicles/vehicle-filters";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NoResults from "@/components/vehicles/no-results";

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  let vehicles: any[] = [];
  let pagination = { total: 0, page: 1, limit: 12, totalPages: 1 };

  try {
    const response = await vehicleService.getAll(params);
    if (response && response.success && Array.isArray(response.data)) {
      vehicles = response.data;
      // Mocking pagination for now as backend might not return it yet
      pagination = {
        total: vehicles.length,
        page: Number(params.page) || 1,
        limit: 12,
        totalPages: Math.ceil(vehicles.length / 12) || 1
      };
    }
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
  }

  return (
    <main className="max-w-7xl mx-auto px-6min-h-screen pt-24 pb-24">
      <Navbar />

      {/* Header Section */}
      <section className="py-16 bg-muted/20 border-b border-border/40">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="space-y-6 text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter">
              Discover Your <span className="text-primary italic">Perfect</span> Ride
            </h1>
            <p className="text-muted-foreground text-xl">
              From high-performance sports cars to spacious family SUVs, find the premium vehicle that suits your journey.
            </p>
          </div>

          <VehicleFilters />
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          {vehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-20">
                  <Button
                    variant="outline"
                    className="rounded-full w-12 h-12 p-0 border-border/40"
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex gap-2">
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={pagination.page === i + 1 ? "default" : "outline"}
                        className={cn(
                          "w-12 h-12 rounded-full font-bold",
                          pagination.page === i + 1 ? "shadow-lg shadow-primary/20" : "border-border/40"
                        )}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full w-12 h-12 p-0 border-border/40"
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <NoResults />
          )}
        </div>
      </section>
    </main>
  );
}