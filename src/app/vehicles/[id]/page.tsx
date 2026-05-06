import { vehicleService } from "@/services/vehicle.service";
import Navbar from "@/components/layout/navbar";
import Image from "next/image";
import { 
  Users, Fuel, Gauge, Calendar, ShieldCheck, 
  MapPin, Star, ArrowLeft, ChevronRight,
  Zap, Info, CheckCircle2
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import BookingForm from "../../../components/vehicles/booking-form";
import { cn } from "@/lib/utils";

export default async function VehicleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: vehicle } = await vehicleService.getById(id);

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
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Breadcrumbs */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/vehicles" className="hover:text-primary transition-colors">Fleet</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{vehicle.vehicle_name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Info & Gallery */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                  <Star className="w-3 h-3 fill-primary" />
                  Premium Selection
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
                  {vehicle.vehicle_name} <span className="text-primary">{vehicle.year}</span>
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Available in Dhaka & Sylhet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>Fully Insured</span>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden bg-muted group">
                <Image
                  src={vehicle.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"}
                  alt={vehicle.vehicle_name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-card border border-border/40 space-y-2">
                  <Users className="w-6 h-6 text-primary" />
                  <p className="text-xs text-muted-foreground font-medium">Capacity</p>
                  <p className="font-bold text-lg">{vehicle.seats} Seats</p>
                </div>
                <div className="p-6 rounded-3xl bg-card border border-border/40 space-y-2">
                  <Fuel className="w-6 h-6 text-primary" />
                  <p className="text-xs text-muted-foreground font-medium">Fuel Type</p>
                  <p className="font-bold text-lg capitalize">{vehicle.fuel_type}</p>
                </div>
                <div className="p-6 rounded-3xl bg-card border border-border/40 space-y-2">
                  <Gauge className="w-6 h-6 text-primary" />
                  <p className="text-xs text-muted-foreground font-medium">Transmission</p>
                  <p className="font-bold text-lg capitalize">{vehicle.transmission}</p>
                </div>
                <div className="p-6 rounded-3xl bg-card border border-border/40 space-y-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  <p className="text-xs text-muted-foreground font-medium">Year</p>
                  <p className="font-bold text-lg">{vehicle.year}</p>
                </div>
              </div>

              {/* Description & Features */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">About this Vehicle</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Experience the ultimate in driving pleasure with the {vehicle.vehicle_name}. 
                    This {vehicle.brand} model combines performance, comfort, and style, making it 
                    the perfect choice for both business trips and weekend getaways. Our fleet is 
                    meticulously maintained to ensure the highest standards of safety and reliability.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {vehicle.features && vehicle.features.length > 0 ? (
                        vehicle.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))
                      ) : (
                        ["Premium Audio System", "GPS Navigation", "Leather Interior", "Adaptive Cruise Control"].map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {f}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      Rental Requirements
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Valid Driving License</li>
                      <li>• Age 21 or older</li>
                      <li>• Security Deposit Required</li>
                      <li>• Proof of Identity</li>
                    </ul>
                  </div>
                </div>
              </div>
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

      {/* Related Vehicles Section - Could be added here */}
    </main>
  );
}
