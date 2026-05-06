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
    <main className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl z-10"
      >
        <div className="bg-card/50 backdrop-blur-2xl border border-border/40 p-10 rounded-[2.5rem] shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Car className="text-primary-foreground w-7 h-7" />
              </div>
              <span className="text-3xl font-heading font-bold tracking-tight">
                VROOM<span className="text-primary">.</span>
              </span>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight">Create an Account</h2>
            <p className="text-sm text-muted-foreground mt-1">Join the ultimate luxury rental experience</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    name="full_name"
                    placeholder="Full Name" 
                    value={formData.full_name}
                    onChange={handleChange}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    name="phone_number"
                    placeholder="Phone Number" 
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                  className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    name="confirm_password"
                    placeholder="Confirm Password" 
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 py-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button 
              className="w-full h-14 rounded-2xl text-lg font-bold group mt-2" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
