"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { 
  User as UserIcon, Mail, Phone, 
  MapPin, Camera, Save, Shield,
  Key, Bell, CheckCircle2, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { userService } from "@/services/user.service";

export default function ProfilePage() {
  const { user, token, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    role: "customer"
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "123 Premium Lane, Dhaka",
        avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}`,
        role: user.role || "customer"
      });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await userService.updateMe(token, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        avatar: formData.avatar,
      });

      if (response.success) {
        await refreshUser();
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    // For now, we'll just allow entering a URL since backend doesn't have upload middleware
    const newUrl = prompt("Enter new avatar URL:", formData.avatar);
    if (newUrl) {
      setFormData({ ...formData, avatar: newUrl });
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border/40 rounded-[3rem] p-10 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-24 bg-primary/10" />
            
            <div className="relative mt-8">
              <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
                  {formData.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <button 
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-4 border-background shadow-lg hover:scale-110 transition-transform"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-1">
              <h3 className="text-2xl font-bold">{formData.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">{formData.email}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mt-4">
                <Shield className="w-3 h-3" />
                Verified Account
              </div>
            </div>

            <div className="w-full mt-10 space-y-4 text-left">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                <span className="text-sm font-bold text-muted-foreground">Account Status</span>
                <span className="text-xs font-bold text-emerald-500 uppercase">Active</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                <span className="text-sm font-bold text-muted-foreground">Member Since</span>
                <span className="text-sm font-bold">May 2026</span>
              </div>
            </div>
          </motion.div>

          <div className="bg-primary rounded-[3rem] p-10 text-primary-foreground relative overflow-hidden shadow-xl shadow-primary/20">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="space-y-4 relative z-10">
              <Key className="w-10 h-10 mb-4" />
              <h4 className="text-xl font-bold">Security Tip</h4>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Keep your account secure by enabling two-factor authentication and updating your password regularly.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-bold mt-4">Update Security</Button>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border/40 rounded-[3rem] p-10 lg:p-12"
          >
            <form onSubmit={handleSave} className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Full Name</Label>
                    <div className="relative group">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        id="email"
                        value={formData.email}
                        readOnly
                        className="h-14 pl-12 rounded-2xl bg-muted/10 border-border/40 text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Phone Number</Label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Location</Label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                        placeholder="Your address"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label htmlFor="avatar" className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Avatar URL</Label>
                    <div className="relative group">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        id="avatar"
                        value={formData.avatar}
                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                        className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/40 focus:ring-primary/20"
                        placeholder="Image URL (e.g. https://...)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-border/40 space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: "Email Notifications", desc: "Receive booking confirmations and updates via email" },
                    { label: "SMS Alerts", desc: "Get real-time trip alerts and driver information" },
                    { label: "Marketing Offers", desc: "Stay updated on new fleet additions and promotions" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-muted/30 border border-border/10">
                      <div className="space-y-1">
                        <p className="font-bold">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="h-14 rounded-2xl px-12 font-bold text-lg gap-2 shadow-lg shadow-primary/20"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
