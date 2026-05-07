"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { 
  Car, Calendar as CalendarIcon, 
  Search, Filter, ChevronRight,
  MoreVertical, Download, Clock,
  CheckCircle2, AlertCircle, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { bookingService } from "@/services/booking.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;
      const response = await bookingService.getMyBookings(storedToken);
      const bookingsData = response.bookings || (response as any).data?.bookings || (response as any).data || [];
      if (Array.isArray(bookingsData)) setBookings(bookingsData);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.vehicles?.vehicle_name?.toLowerCase().includes(search.toLowerCase()) ||
    b.id.toString().includes(search)
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case 'returned': return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case 'pending': return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case 'cancelled': return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'returned': return <Clock className="w-3.5 h-3.5" />;
      case 'pending': return <AlertCircle className="w-3.5 h-3.5" />;
      case 'cancelled': return <XCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your vehicle rentals</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl gap-2 h-14 px-6 border-border/40 font-bold">
            <Download className="w-5 h-5" />
            Export History
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search by vehicle name or booking ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-14 pl-12 rounded-2xl bg-card border-border/40 focus:ring-primary/20"
          />
        </div>
        <Button variant="outline" className="h-14 rounded-2xl gap-2 px-6 border-border/40 font-bold bg-card">
          <Filter className="w-5 h-5" />
          Filter
        </Button>
      </div>

      {/* Bookings Grid/Table */}
      <div className="bg-card border border-border/40 rounded-[3rem] overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/40">
                  <th className="py-6 px-8">Booking Details</th>
                  <th className="py-6 px-8">Rental Period</th>
                  <th className="py-6 px-8">Price</th>
                  <th className="py-6 px-8">Status</th>
                  <th className="py-6 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-8 px-8">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:rotate-6 transition-transform">
                          <Car className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {booking.vehicles?.vehicle_name || "Premium Vehicle"}
                          </h4>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">ID: #{booking.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <CalendarIcon className="w-4 h-4 text-primary" />
                          {new Date(booking.rent_start_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-bold px-6">TO</div>
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <CalendarIcon className="w-4 h-4 text-primary" />
                          {new Date(booking.rent_end_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-8">
                      <div className="space-y-0.5">
                        <p className="text-xl font-bold">${parseFloat(booking.total_price).toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Paid via Card</p>
                      </div>
                    </td>
                    <td className="py-8 px-8">
                      <div className={cn(
                        "flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest w-fit",
                        getStatusStyle(booking.status)
                      )}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </div>
                    </td>
                    <td className="py-8 px-8 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-2xl h-12 w-12 border-2 border-white/5 bg-white/5 backdrop-blur-lg hover:bg-primary hover:text-primary-foreground hover:border-primary/50 inline-flex items-center justify-center transition-all duration-300 outline-none shadow-lg">
                          <MoreVertical className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2">
                          <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer">Download Invoice</DropdownMenuItem>
                          {booking.status === 'pending' && (
                            <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer text-rose-500 hover:bg-rose-500/10">Cancel Booking</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-32 space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">No bookings found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                We couldn't find any bookings matching your criteria. Try adjusting your search or explore our fleet.
              </p>
            </div>
            <Button size="lg" className="rounded-full px-10 font-bold mt-4" asChild>
              <Link href="/vehicles">Explore Fleet</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
