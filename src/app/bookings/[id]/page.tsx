"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { bookingService, Booking } from "@/services/booking.service";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import {
  ArrowLeft, Calendar, Car, CheckCircle2,
  CreditCard, ShieldCheck, MapPin, Star,
  Info, Zap, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { LoadingState } from "@/components/ui/loading-state";

export default function BookingDetailsPage() {
  const { id } = useParams();
  const { user, token, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/signin");
      return;
    }

    if (user && id) {
      fetchBookingDetails();
    }
  }, [user, isAuthLoading, id]);

  const fetchBookingDetails = async () => {
    try {
      const storedToken = localStorage.getItem("token") || token;
      if (!storedToken) return;

      const response = await bookingService.getById(id as string, storedToken);
      if (response.success) {
        setBooking(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load booking details");
      router.push("/bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!booking) return;

    setIsCancelling(true);
    try {
      const storedToken = localStorage.getItem("token") || token;
      if (!storedToken) return;

      await bookingService.cancel(booking.id, storedToken);
      toast.success("Booking cancelled successfully");
      setIsConfirmOpen(false);
      fetchBookingDetails(); // Refresh details
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
          <LoadingState title="Loading Details" subtitle="Retrieving your reservation summary..." />
        </div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />

      <div className="max-w-8xl mx-auto px-6 pt-32">
        <Link
          href="/bookings"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to My Bookings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Vehicle Info & Large Image */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border tracking-widest",
                  booking.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    booking.status === 'returned' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      "bg-muted text-muted-foreground border-border"
                )}>
                  {booking.status}
                </span>
                <span className="text-muted-foreground text-xs font-medium">Ref: #{booking.id}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-8xl font-heading font-bold tracking-tight">
                {booking.vehicles?.vehicle_name}
              </h1>

              <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-border/40 shadow-2xl">
                {booking.vehicles?.vehicle_images?.[0]?.image_url ? (
                  <Image
                    src={booking.vehicles.vehicle_images[0].image_url}
                    alt={booking.vehicles.vehicle_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Car className="w-20 h-20 text-muted-foreground/20" />
                  </div>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  Vehicle Specs
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/10 font-medium">
                    <span className="text-muted-foreground">Registration</span>
                    <span className="font-bold">{booking.vehicles?.registration_number}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/10 font-medium">
                    <span className="text-muted-foreground">Booking Date</span>
                    <span className="font-bold">{new Date(booking.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10 space-y-6">
                <h4 className="text-2xl font-bold flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Support & Safety
                </h4>
                <ul className="space-y-4">
                  {[
                    "24/7 Roadside Assistance",
                    "Premium Insurance Coverage",
                    "Contactless Key Pickup",
                    "Full Tank of Fuel Included"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground font-medium text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border/40 rounded-[3rem] p-10 shadow-2xl shadow-primary/5"
              >
                <h3 className="text-2xl font-bold mb-8">Order Summary</h3>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pick-up</p>
                      <div className="text-lg font-bold">
                        {new Date(booking.rent_start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Return</p>
                      <div className="text-lg font-bold">
                        {new Date(booking.rent_end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-muted/50 border border-border/40 space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground font-medium">
                      <span>Rental Duration</span>
                      <span className="text-foreground font-bold">
                        {Math.ceil((new Date(booking.rent_end_date).getTime() - new Date(booking.rent_start_date).getTime()) / (1000 * 60 * 60 * 24))} Days
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/40 pt-4">
                      <span className="text-xl font-bold">Total Paid</span>
                      <span className="text-3xl font-heading font-bold text-primary">
                        ${Number(booking.total_price).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    {booking.status === 'active' && (
                      <Button
                        variant="destructive"
                        className="w-full h-16 rounded-2xl font-bold text-lg"
                        onClick={() => setIsConfirmOpen(true)}
                      >
                        Cancel Booking
                      </Button>
                    )}
                    <Link
                      href="/vehicles"
                      className={cn("w-full h-16 rounded-2xl font-bold text-lg flex items-center justify-center border-2 border-border/40 hover:bg-muted transition-colors")}
                    >
                      Rent Another Car
                    </Link>
                  </div>

                  <p className="text-center text-xs text-muted-foreground px-6 leading-relaxed">
                    Cancellation is only possible before the rental period starts.
                    Refunds are processed within 3-5 business days.
                  </p>
                </div>
              </motion.div>

              <div className="bg-muted/30 border border-border/20 rounded-[2.5rem] p-8 flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Rate your experience</p>
                  <p className="text-xs text-muted-foreground">Share your feedback once the rental is completed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleCancel}
        title="Cancel Booking?"
        description="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Yes, Cancel"
        isLoading={isCancelling}
      />
    </main>
  );
}
