"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import { 
  Users, Car, Clock, CreditCard, LogOut, 
  Settings, Plus, BarChart3, Search, Filter 
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { vehicleService } from "@/services/vehicle.service";
import { bookingService } from "@/services/booking.service";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push("/dashboard");
      return;
    }

    if (user) {
      fetchAdminData();
    }
  }, [user, isLoading, router]);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const [vRes, bRes] = await Promise.all([
        vehicleService.getAll(),
        bookingService.getMyBookings(token)
      ]);

      if (vRes.success) setVehicles(vRes.data);
      if (bRes.success || (bRes as any).bookings) {
        setBookings((bRes as any).bookings || (bRes as any).data?.bookings || bRes);
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
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

  return (
    <main className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="max-w-[1600px] mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-80 space-y-4">
            <div className="bg-card border border-border/40 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{user.name}</h2>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest">Admin Panel</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { label: "Overview", icon: BarChart3, active: true },
                  { label: "Fleet Management", icon: Car },
                  { label: "Bookings", icon: Clock },
                  { label: "Users", icon: Users },
                  { label: "Settings", icon: Settings },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                      item.active 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Total Revenue", value: "$45,280", icon: CreditCard, color: "text-green-500", bg: "bg-green-500/10" },
                { label: "Active Rentals", value: bookings.length.toString(), icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "Total Fleet", value: vehicles.length.toString(), icon: Car, color: "text-primary", bg: "bg-primary/10" },
                { label: "New Users", value: "128", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border/40 rounded-3xl p-6 flex items-center gap-4"
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fleet Section */}
            <div className="bg-card border border-border/40 rounded-[2.5rem] overflow-hidden">
              <div className="p-8 border-b border-border/40 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Fleet Management</h3>
                  <p className="text-muted-foreground text-sm">Manage your vehicle availability and details.</p>
                </div>
                <Button className="rounded-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Vehicle
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <th className="px-8 py-4">Vehicle</th>
                      <th className="px-8 py-4">Type</th>
                      <th className="px-8 py-4">Price/Day</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {vehicles.slice(0, 5).map((v) => (
                      <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-8 py-4 font-bold">{v.vehicle_name}</td>
                        <td className="px-8 py-4 text-sm">{v.type}</td>
                        <td className="px-8 py-4 font-bold text-primary">${v.daily_rent_price}</td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                            v.availability_status === 'available' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                          )}>
                            {v.availability_status}
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          <Button variant="ghost" size="sm" className="font-bold">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
