"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Car, Settings, Image as ImageIcon, 
  Sparkles, ArrowLeft, Save, X, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vehicleService } from "@/services/vehicle.service";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    vehicle_name: "",
    brand: "",
    model: "",
    type: "sports",
    registration_number: "",
    daily_rent_price: "",
    year: new Date().getFullYear(),
    color: "",
    seats: 4,
    fuel_type: "Petrol",
    transmission: "Automatic",
    mileage: "",
    description: "",
    mainImage: "",
    optImage1: "",
    optImage2: "",
    optImage3: "",
    features: ""
  });

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await vehicleService.getById(vehicleId);
        if (response.success && response.data) {
          const v = response.data;
          setFormData({
            vehicle_name: v.vehicle_name || "",
            brand: v.brand || "",
            model: v.model || "",
            type: v.type || "sports",
            registration_number: v.registration_number || "",
            daily_rent_price: v.daily_rent_price?.toString() || "",
            year: v.year || new Date().getFullYear(),
            color: v.color || "",
            seats: v.seats || 4,
            fuel_type: v.fuel_type || "Petrol",
            transmission: v.transmission || "Automatic",
            mileage: v.mileage?.toString() || "",
            description: v.description || "",
            mainImage: v.images?.[0] || "",
            optImage1: v.images?.[1] || "",
            optImage2: v.images?.[2] || "",
            optImage3: v.images?.[3] || "",
            features: v.features?.join(", ") || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch vehicle:", error);
        toast.error("Failed to load vehicle data");
        router.push("/dashboard/vehicles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleData();
  }, [vehicleId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const images = [formData.mainImage, formData.optImage1, formData.optImage2, formData.optImage3].filter(Boolean);
      const features = formData.features.split(",").map(f => f.trim()).filter(Boolean);

      const payload = {
        vehicle_name: formData.vehicle_name,
        brand: formData.brand,
        model: formData.model,
        type: formData.type,
        registration_number: formData.registration_number,
        daily_rent_price: parseFloat(formData.daily_rent_price),
        year: parseInt(formData.year.toString()),
        color: formData.color,
        seats: parseInt(formData.seats.toString()),
        fuel_type: formData.fuel_type,
        transmission: formData.transmission,
        mileage: parseFloat(formData.mileage || "0"),
        description: formData.description,
        images,
        features
      };

      const response = await vehicleService.update(vehicleId, payload, token);
      if (response.success) {
        toast.success("Vehicle updated successfully");
        router.push("/dashboard/vehicles");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update vehicle");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link 
            href="/dashboard/vehicles" 
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Fleet
          </Link>
          <h1 className="text-4xl font-heading font-bold tracking-tight">Edit Vehicle</h1>
          <p className="text-muted-foreground">Modify details for {formData.vehicle_name}</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="rounded-2xl h-14 px-8 font-bold border-border/40"
            onClick={() => router.push("/dashboard/vehicles")}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSaving}
            className="rounded-2xl gap-2 h-14 px-10 font-bold shadow-lg shadow-primary/20"
          >
            {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <Save className="w-5 h-5" />
            )}
            {isSaving ? "Saving..." : "Update Vehicle"}
          </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border/40 rounded-[3rem] overflow-hidden shadow-sm"
      >
        <form onSubmit={handleSubmit} className="divide-y divide-border/40">
          {/* Section 1: Basic Info */}
          <div className="p-8 lg:p-12 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Basic Information</h3>
                <p className="text-sm text-muted-foreground">General details and identifying info</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label htmlFor="vehicle_name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Vehicle Name</Label>
                <Input 
                    id="vehicle_name" 
                    required 
                    placeholder="e.g. Porsche 911 Carrera" 
                    value={formData.vehicle_name}
                    onChange={(e) => setFormData({...formData, vehicle_name: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="brand" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Brand</Label>
                <Input 
                    id="brand" 
                    required 
                    placeholder="e.g. Porsche" 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="model" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Model</Label>
                <Input 
                    id="model" 
                    required 
                    placeholder="e.g. Carrera S" 
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="type" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Vehicle Type</Label>
                <select 
                    id="type"
                    className="flex h-14 w-full rounded-2xl border border-border/40 bg-muted/30 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                    <option value="sports">Sports Car</option>
                    <option value="luxury">Luxury Sedan</option>
                    <option value="suv">Premium SUV</option>
                    <option value="sedan">Classic Sedan</option>
                    <option value="electric">Electric Vehicle</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="reg" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Registration Number</Label>
                <Input 
                    id="reg" 
                    required 
                    placeholder="ABC-1234" 
                    value={formData.registration_number}
                    onChange={(e) => setFormData({...formData, registration_number: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Daily Rent Price ($)</Label>
                <Input 
                    id="price" 
                    type="number" 
                    required 
                    placeholder="250.00" 
                    value={formData.daily_rent_price}
                    onChange={(e) => setFormData({...formData, daily_rent_price: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specs */}
          <div className="p-8 lg:p-12 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Technical Specifications</h3>
                <p className="text-sm text-muted-foreground">Performance and configuration details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label htmlFor="year" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Manufacturing Year</Label>
                <Input 
                    id="year" 
                    type="number" 
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="fuel" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Fuel Type</Label>
                <select 
                    id="fuel"
                    className="flex h-14 w-full rounded-2xl border border-border/40 bg-muted/30 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={formData.fuel_type}
                    onChange={(e) => setFormData({...formData, fuel_type: e.target.value})}
                >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="trans" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Transmission</Label>
                <select 
                    id="trans"
                    className="flex h-14 w-full rounded-2xl border border-border/40 bg-muted/30 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={formData.transmission}
                    onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="seats" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Seating Capacity</Label>
                <Input 
                    id="seats" 
                    type="number" 
                    value={formData.seats}
                    onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value)})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="mileage" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Mileage (km/l)</Label>
                <Input 
                    id="mileage" 
                    type="number" 
                    placeholder="12.5" 
                    value={formData.mileage}
                    onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="color" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Exterior Color</Label>
                <Input 
                    id="color" 
                    placeholder="e.g. Metallic Black" 
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="p-8 lg:p-12 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Media & Gallery</h3>
                <p className="text-sm text-muted-foreground">Showcase the vehicle with high-quality images</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="mainImage" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Main Image URL (Primary)</Label>
                <Input 
                  id="mainImage" 
                  required 
                  placeholder="https://images.unsplash.com/..." 
                  value={formData.mainImage}
                  onChange={(e) => setFormData({...formData, mainImage: e.target.value})}
                  className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                      <Label htmlFor="opt1" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Gallery Image 1</Label>
                      <Input id="opt1" placeholder="URL" value={formData.optImage1} onChange={(e) => setFormData({...formData, optImage1: e.target.value})} className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-3">
                      <Label htmlFor="opt2" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Gallery Image 2</Label>
                      <Input id="opt2" placeholder="URL" value={formData.optImage2} onChange={(e) => setFormData({...formData, optImage2: e.target.value})} className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-3">
                      <Label htmlFor="opt3" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Gallery Image 3</Label>
                      <Input id="opt3" placeholder="URL" value={formData.optImage3} onChange={(e) => setFormData({...formData, optImage3: e.target.value})} className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20" />
                  </div>
              </div>
            </div>
          </div>

          {/* Section 4: Extra Info */}
          <div className="p-8 lg:p-12 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Description & Features</h3>
                <p className="text-sm text-muted-foreground">Tell more about what makes this vehicle special</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Vehicle Description</Label>
                <textarea 
                  id="desc"
                  rows={6}
                  className="flex w-full rounded-[2rem] border border-border/40 bg-muted/30 px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Tell us about this vehicle, its history, or special features..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="features" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Premium Features (Comma separated)</Label>
                <Input 
                    id="features" 
                    placeholder="Bluetooth, Sunroof, Leather Seats, Navigation, Adaptive Cruise Control..." 
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Floating Bottom Bar for mobile/easy access */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-xl border border-border/40 p-3 rounded-3xl shadow-2xl flex items-center gap-4 min-w-[320px] justify-between">
         <div className="flex items-center gap-3 ml-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Car className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold truncate max-w-[150px]">
                {formData.vehicle_name || "Editing Vehicle"}
            </span>
         </div>
         <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/vehicles")} className="rounded-xl font-bold">Discard</Button>
            <Button size="sm" onClick={handleSubmit} disabled={isSaving} className="rounded-xl font-bold px-6">
                {isSaving ? "Saving..." : "Update Vehicle"}
            </Button>
         </div>
      </div>
    </div>
  );
}
