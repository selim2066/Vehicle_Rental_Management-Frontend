import Navbar from "@/components/layout/navbar";
import { buttonVariants } from "@/components/ui/button";
import BookingForm from "@/components/vehicles/booking-form";
import ImageGallery from "@/components/vehicles/image-gallery";
import ReviewSection from "@/components/vehicles/review-section";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { cn } from "@/lib/utils";
import { vehicleService } from "@/services/vehicle.service";
import { Calendar, CheckCircle2, ChevronRight, Fuel, Gauge, Info, MapPin, ShieldCheck, Star, Users, Zap } from "lucide-react";
import Link from "next/link";

export default async function VehicleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: vehicle } = await vehicleService.getById(id);

  // Fetch related vehicles
  let relatedVehicles: any[] = [];
  try {
    const response = await vehicleService.getAll({ type: vehicle?.type, limit: "4" });
    if (response && response.success) {
      relatedVehicles = response.data.filter((v: any) => v.id !== id).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to fetch related vehicles:", error);
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <Link
            href="/vehicles"
            className={cn(buttonVariants({}), "mt-4")}
          >
            Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      <Navbar />

      {/* Hero Section with Breadcrumbs */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/vehicles" className="hover:text-primary transition-colors">Fleet</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{vehicle.vehicle_name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Info & Gallery */}
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
                    <Star className="w-3.4 h-3.4 fill-primary" />
                    Premium Selection
                  </div>
                  <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tight mb-6">
                    {vehicle.vehicle_name} <span className="text-primary italic">{vehicle.year}</span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-8 text-muted-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Dhaka City Office</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="font-medium">Fully Insured Rental</span>
                    </div>
                  </div>
                </div>

                <ImageGallery images={vehicle.images || []} />
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Users, label: "Capacity", value: `${vehicle.seats} Seats` },
                  { icon: Fuel, label: "Fuel Type", value: vehicle.fuel_type },
                  { icon: Gauge, label: "Transmission", value: vehicle.transmission },
                  { icon: Calendar, label: "Year", value: vehicle.year }
                ].map((spec, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-card border border-border/40 space-y-4 hover:border-primary/20 transition-colors shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <spec.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{spec.label}</p>
                      <p className="font-bold text-xl capitalize">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description & Features */}
              <div className="space-y-16">
                <div className="max-w-3xl">
                  <h3 className="text-3xl font-bold mb-6 tracking-tight">Vehicle Overview</h3>
                  <p className="text-muted-foreground leading-relaxed text-xl">
                    Experience the ultimate in driving pleasure with the {vehicle.vehicle_name}.
                    This {vehicle.brand} model combines performance, comfort, and style, making it
                    the perfect choice for both business trips and weekend getaways. Our fleet is
                    meticulously maintained to ensure the highest standards of safety and reliability.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold flex items-center gap-3">
                      <Zap className="w-6 h-6 text-primary" />
                      Premium Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-4">
                      {(vehicle.features || ["Premium Audio System", "GPS Navigation", "Leather Interior", "Adaptive Cruise Control"]).map((feature, index) => (
                        <li key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/10 text-muted-foreground font-medium">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10 space-y-6">
                    <h4 className="text-2xl font-bold flex items-center gap-3">
                      <Info className="w-6 h-6 text-primary" />
                      Requirements
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "Valid National/International Driving License",
                        "Minimum driver age of 21 years",
                        "Security deposit (refundable) required",
                        "Proof of Identity (NID or Passport)"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <ReviewSection
                vehicleId={vehicle.id}
                initialAverageRating={vehicle.average_rating}
                initialTotalReviews={vehicle.total_reviews}
              />
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <BookingForm vehicle={vehicle} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Vehicles Section */}
      {relatedVehicles.length > 0 && (
        <section className="py-24 border-t border-border/40 bg-muted/10">
          <div className="max-w-8xl mx-auto px-6">
            <h3 className="text-4xl font-bold mb-12 tracking-tight">You might also like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
