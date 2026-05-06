"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { 
  Car, Plus, Search, Filter, 
  MoreVertical, Edit3, Trash2, 
  Eye, CheckCircle2, XCircle,
  ExternalLink, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

export default function FleetManagementPage() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await vehicleService.getAll({});
      if (response && response.success) setVehicles(response.data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(v => 
    v.vehicle_name.toLowerCase().includes(search.toLowerCase()) ||
    v.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await vehicleService.delete(id, token);
      toast.success("Vehicle deleted successfully");
      fetchVehicles();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete vehicle");
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight">Fleet Management</h1>
          <p className="text-muted-foreground mt-1">Manage your vehicle inventory and availability</p>
        </div>
        <div className="flex gap-4">
          <Button className="rounded-2xl gap-2 h-14 px-8 font-bold shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" />
            Add New Vehicle
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Fleet", value: vehicles.length, color: "text-primary" },
          { label: "Available", value: vehicles.filter(v => v.availability_status === 'available').length, color: "text-emerald-500" },
          { label: "In Maintenance", value: 0, color: "text-amber-500" },
          { label: "Rented Out", value: 0, color: "text-blue-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border/40 rounded-3xl p-6 shadow-sm">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <p className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search by vehicle name, brand or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-14 pl-12 rounded-2xl bg-card border-border/40 focus:ring-primary/20"
          />
        </div>
        <Button variant="outline" className="h-14 rounded-2xl gap-2 px-6 border-border/40 font-bold bg-card">
          <Filter className="w-5 h-5" />
          Filters
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border/40 rounded-[3rem] overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/40">
                  <th className="py-6 px-8">Vehicle Info</th>
                  <th className="py-6 px-8">Type & Specs</th>
                  <th className="py-6 px-8">Pricing</th>
                  <th className="py-6 px-8">Status</th>
                  <th className="py-6 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-5">
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-muted shadow-sm">
                          <Image 
                            src={vehicle.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=200"}
                            alt={vehicle.vehicle_name}
                            fill
                            sizes="100px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {vehicle.vehicle_name}
                          </h4>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{vehicle.brand} • {vehicle.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="space-y-1">
                        <p className="text-sm font-bold capitalize">{vehicle.type}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                          {vehicle.seats} Seats • {vehicle.transmission} • {vehicle.fuel_type}
                        </p>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="space-y-0.5">
                        <p className="text-lg font-bold">${vehicle.daily_rent_price}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">per day</p>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className={cn(
                        "flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest w-fit",
                        vehicle.availability_status === 'available' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      )}>
                        {vehicle.availability_status === 'available' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {vehicle.availability_status}
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-2xl h-12 w-12 border-2 border-white/5 bg-white/5 backdrop-blur-lg hover:bg-primary hover:text-primary-foreground hover:border-primary/50 inline-flex items-center justify-center transition-all duration-300 outline-none shadow-lg">
                          <MoreVertical className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                          <DropdownMenuItem asChild>
                            <Link href={`/vehicles/${vehicle.id}`} className="rounded-xl font-bold py-3 cursor-pointer gap-2">
                              <Eye className="w-4 h-4 text-primary" /> View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => toast.info("Edit feature coming soon!")}
                            className="rounded-xl font-bold py-3 cursor-pointer gap-2"
                          >
                            <Edit3 className="w-4 h-4 text-blue-500" /> Edit Vehicle
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(vehicle.id)}
                            className="rounded-xl font-bold py-3 cursor-pointer gap-2 text-rose-500 hover:bg-rose-500/10"
                          >
                            <Trash2 className="w-4 h-4" /> Delete Vehicle
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
