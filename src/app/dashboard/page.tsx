"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Navbar from "@/components/layout/navbar";
import { 
  User, Mail, Phone, Calendar, 
  Settings, LogOut, Car, Clock, 
  CreditCard, ShieldCheck, ChevronRight
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bookingService } from "@/services/booking.service";

export default function DashboardPage() {
  const { user, token, logout, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Redirect if not logged in
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
      const storedToken = localStorage.getItem("token");
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

  if (isLoading || !user || isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeBookings = bookings.filter(b => b.status === 'active' || b.status === 'pending');
  const totalBalance = bookings.reduce((acc, b) => acc + (parseFloat(b.total_price) || 0), 0);

  return (
    <main className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-heading font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {user.full_name || user.name}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full px-6 gap-2 border-border/40" onClick={logout}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Sidebar Info */}
            <div className="lg:col-span-4 space-y-8">
              {/* Profile Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border/40 rounded-[2.5rem] p-8"
              >
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 border-4 border-background shadow-xl">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{user.full_name || user.name}</h2>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">Premium Member</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email</p>
                      <p className="font-medium truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Phone</p>
                      <p className="font-medium">{user.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Member Since</p>
                      <p className="font-medium">May 2026</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-8 rounded-2xl gap-2" variant="outline">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </Button>
              </motion.div>

              {/* Quick Info */}
              <div className="bg-primary dark:bg-muted/10 rounded-[2.5rem] p-8 text-primary-foreground dark:text-foreground overflow-hidden relative border border-primary/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <h3 className="text-xl font-bold mb-2">Need help?</h3>
                <p className="text-primary-foreground/70 dark:text-muted-foreground text-sm mb-6">Our priority support is here for you 24/7 for all your premium rentals.</p>
                <Button variant="secondary" className="w-full rounded-2xl font-bold">Contact Support</Button>
              </div>
            </div>

            {/* Right Column: Stats & Bookings */}
            <div className="lg:col-span-8 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Active Rentals", value: activeBookings.length.toString(), icon: Car, color: "text-blue-500", bg: "bg-blue-500/10" },
                  { label: "Total Bookings", value: bookings.length.toString(), icon: Clock, color: "text-primary", bg: "bg-primary/10" },
                  { label: "Total Spent", value: `$${totalBalance.toLocaleString()}`, icon: CreditCard, color: "text-green-500", bg: "bg-green-500/10" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border/40 rounded-[2rem] p-6 flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bookings Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border/40 rounded-[2.5rem] p-8 min-h-[400px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold tracking-tight">Recent Bookings</h3>
                  <Link 
                    href="/dashboard/bookings" 
                    className={cn(buttonVariants({ variant: "link" }), "text-primary font-bold gap-1")}
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking, i) => (
                      <div 
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/20 hover:border-primary/20 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Car className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold group-hover:text-primary transition-colors">
                              {booking.vehicles?.vehicle_name || `Booking #${booking.id}`}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(booking.rent_start_date).toLocaleDateString()} - {new Date(booking.rent_end_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${parseFloat(booking.total_price).toLocaleString()}</div>
                          <div className={cn(
                            "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mt-1 border",
                            booking.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            booking.status === 'returned' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                            booking.status === 'pending' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                            "bg-muted text-muted-foreground border-border"
                          )}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                      <Car className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">No bookings yet</h4>
                    <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                      Your luxury travel history is currently empty. Explore our fleet and start your adventure.
                    </p>
                    <Link 
                      href="/vehicles" 
                      className={cn(buttonVariants({}), "rounded-full px-8 h-12")}
                    >
                      Explore Fleet
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
