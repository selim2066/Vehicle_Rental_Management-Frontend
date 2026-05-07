"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Mail, Lock, ArrowRight, Command, Globe, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { AuthLayout } from "@/components/layout/auth-layout";

export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData);
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
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
      welcomeTitle="DRIVE THE FUTURE TODAY."
      welcomeSubtitle="Experience the next level of luxury and performance. Your journey starts with a single click."
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
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
        <div className="space-y-2">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="h-14 pl-12 pr-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 focus:bg-background transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex justify-end">
            <Link href="/forgot-password" alt-text="Forgot password" title="Forgot Password" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button
          className="w-full h-14 rounded-2xl text-lg font-bold group mt-4 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 overflow-hidden relative"
          type="submit"
          disabled={isLoading}
        >
          <span className="relative z-10 flex items-center justify-center">
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary group-hover:scale-105 transition-transform duration-500" />
        </Button>
      </form>

      {/* Quick Access / Demo Login */}
      <div className="mt-8">
        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-border/40"></div>
          <span className="flex-shrink mx-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">Quick Access</span>
          <div className="flex-grow border-t border-border/40"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-14 rounded-2xl border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary font-bold gap-2 px-4 transition-all"
            onClick={() => {
              setFormData({ email: "mdselimreza2066@gmail.com", password: "admin123" });
            }}
          >
            <Command className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Admin Demo</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 rounded-2xl border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-emerald-600 font-bold gap-2 px-4 transition-all"
            onClick={() => {
              setFormData({ email: "selimrezaibnal@gmail.com", password: "selim123" });
            }}
          >
            <Globe className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Customer Demo</span>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-10">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-bold hover:text-primary/80 transition-colors">
          Sign Up Now
        </Link>
      </p>
    </AuthLayout>
  );
}

