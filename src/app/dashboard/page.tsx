"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { 
  Car, Clock, CreditCard, 
  ChevronRight, TrendingUp,
  Calendar as CalendarIcon,
  Plus
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bookingService } from "@/services/booking.service";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const activeBookings = bookings.filter(b => b.status === 'active' || b.status === 'pending');
  const totalSpent = bookings.reduce((acc, b) => acc + (parseFloat(b.total_price) || 0), 0);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, <span className="text-primary font-bold">{user?.name}</span></p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/vehicles" 
            className={cn(buttonVariants({}), "rounded-2xl gap-2 h-14 px-8 font-bold shadow-lg shadow-primary/20")}
          >
            <Plus className="w-5 h-5" />
            Book New Ride
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Active Rentals", value: activeBookings.length, icon: Car, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Total Bookings", value: bookings.length, icon: CalendarIcon, color: "text-primary", bg: "bg-primary/10" },
          { label: "Total Spent", value: `$${totalSpent.toLocaleString()}`, icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border/40 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-primary/20 transition-all"
          >
            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-4xl font-bold mt-1">{stat.value}</p>
            </div>
            <TrendingUp className="absolute top-8 right-8 w-12 h-12 text-muted-foreground/5 group-hover:text-primary/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Analytics Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-8 bg-card border border-border/40 rounded-[3rem] p-8 lg:p-12"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Spending Analytics</h3>
              <p className="text-sm text-muted-foreground">Your rental activity over the last 6 months</p>
            </div>
            <div className="bg-muted/50 p-1 rounded-xl flex gap-1">
              <Button variant="ghost" size="sm" className="rounded-lg h-8 text-xs font-bold bg-background shadow-sm">Monthly</Button>
              <Button variant="ghost" size="sm" className="rounded-lg h-8 text-xs font-bold">Yearly</Button>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '1rem',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 bg-primary text-primary-foreground rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-tight leading-tight">Join the Vroom Loyalty Program</h3>
            <p className="text-primary-foreground/70 text-lg">Save up to 15% on every rental and get priority access to new fleet additions.</p>
          </div>

          <Button variant="secondary" className="w-full h-14 rounded-2xl font-bold text-lg mt-12">Learn More</Button>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border/40 rounded-[3rem] p-8 lg:p-12 overflow-hidden"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Detailed history of your recent rental bookings</p>
          </div>
          <Link 
            href="/dashboard/bookings" 
            className={cn(buttonVariants({ variant: "outline" }), "rounded-xl font-bold border-border/40")}
          >
            See All Bookings
          </Link>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/40">
                <th className="pb-4 px-4">Vehicle</th>
                <th className="pb-4 px-4">Duration</th>
                <th className="pb-4 px-4">Total Amount</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="group hover:bg-muted/30 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Car className="w-6 h-6" />
                      </div>
                      <span className="font-bold">{booking.vehicles?.vehicle_name || `Booking #${booking.id}`}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="text-sm">
                      <p className="font-medium">{new Date(booking.rent_start_date).toLocaleDateString()}</p>
                      <p className="text-muted-foreground text-xs">to {new Date(booking.rent_end_date).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className="font-bold">${parseFloat(booking.total_price).toLocaleString()}</span>
                  </td>
                  <td className="py-6 px-4">
                    <div className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block border",
                      booking.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      booking.status === 'returned' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      booking.status === 'pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-muted text-muted-foreground border-border"
                    )}>
                      {booking.status}
                    </div>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <Link 
                      href={`/dashboard/bookings/${booking.id}`}
                      className="p-2 hover:text-primary transition-colors inline-block"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && !isLoading && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No bookings found</p>
              <p className="text-sm">Start your premium journey today!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

