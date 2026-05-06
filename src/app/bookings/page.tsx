"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import { 
  Car, Calendar, Clock, CreditCard, 
  ChevronRight, ArrowLeft, Filter, Search 
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { bookingService, Booking } from "@/services/booking.service";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BookingsPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
      return;
    }

    if (user) {
      fetchBookings();
    }
  }, [user, isLoading, router]);

  const fetchBookings = async () => {
    try {
      const storedToken = localStorage.getItem("token") || token;
      if (!storedToken) return;

      const response = await bookingService.getMyBookings(storedToken);
      const bookingsData = response.bookings || (response as any).data?.bookings || (response as any).data || [];
      
      if (Array.isArray(bookingsData)) {
        setBookings(bookingsData);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => 
    filter === "all" ? true : b.status === filter
  );

  if (isLoading || isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">Manage your past and upcoming luxury rentals.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-card border border-border/40 p-1 rounded-2xl">
            {["all", "active", "returned", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  filter === status 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border/40 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 hover:border-primary/40 transition-all group"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <Car className="w-10 h-10" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="text-xl font-bold">{booking.vehicles?.vehicle_name || `Booking #${booking.id}`}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                      booking.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                      booking.status === 'returned' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      "bg-muted text-muted-foreground border-border"
                    )}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-6 text-sm text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.rent_start_date).toLocaleDateString()} - {new Date(booking.rent_end_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Total: <span className="text-foreground font-bold">${parseFloat(booking.total_price).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button variant="outline" className="flex-1 md:flex-none rounded-2xl font-bold">View Details</Button>
                  {booking.status === 'active' && (
                    <Button variant="secondary" className="flex-1 md:flex-none rounded-2xl font-bold text-red-500">Cancel</Button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 bg-card border border-dashed border-border/60 rounded-[3rem]">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No {filter !== 'all' ? filter : ''} bookings found</h2>
              <p className="text-muted-foreground max-w-xs mx-auto">Try adjusting your filters or explore our fleet for your next ride.</p>
              <Link href="/vehicles" className={cn(buttonVariants({ variant: "link" }), "mt-4")}>
                Explore Fleet
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
