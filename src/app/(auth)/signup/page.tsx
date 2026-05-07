"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/auth-layout";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await register(formData);
    } catch (error) {
      // Error handled in provider
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the ultimate luxury rental experience"
      welcomeTitle="JOIN THE ELITE CIRCLE."
      welcomeSubtitle="Unlock access to the world's most exclusive fleet. Your premium adventure begins here."
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
              <Input 
                name="full_name"
                placeholder="Full Name" 
                value={formData.full_name}
                onChange={handleChange}
                className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 focus:bg-background transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
              <Input 
                name="phone_number"
                placeholder="Phone Number" 
                value={formData.phone_number}
                onChange={handleChange}
                className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 focus:bg-background transition-all duration-300"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
            <Input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 focus:bg-background transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
              <Input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 focus:bg-background transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
              <Input 
                type="password" 
                name="confirm_password"
                placeholder="Confirm Password" 
                value={formData.confirm_password}
                onChange={handleChange}
                className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 focus:bg-background transition-all duration-300"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox id="terms" required className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
          <Label htmlFor="terms" className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </Label>
        </div>

        <Button 
          className="w-full h-14 rounded-2xl text-lg font-bold group mt-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 overflow-hidden relative" 
          type="submit"
          disabled={isLoading}
        >
          <span className="relative z-10 flex items-center justify-center">
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary group-hover:scale-105 transition-transform duration-500" />
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-8">
        Already have an account?{" "}
        <Link href="/signin" className="text-primary font-bold hover:text-primary/80 transition-colors">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}

