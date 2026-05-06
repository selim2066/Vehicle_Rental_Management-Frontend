"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Mail, Lock, ArrowRight, Command, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";

export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false);
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
    <main className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-card/50 backdrop-blur-2xl border border-border/40 p-10 rounded-[2.5rem] shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Car className="text-primary-foreground w-7 h-7" />
              </div>
              <span className="text-3xl font-heading font-bold tracking-tight">
                VROOM<span className="text-primary">.</span>
              </span>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                  className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  className="h-14 pl-12 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link href="/forgot-password" size="sm" className="text-xs font-semibold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button 
              className="w-full h-14 rounded-2xl text-lg font-bold group mt-4" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Separator */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground font-semibold tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl gap-2 border-border/40 hover:bg-primary/5">
              <Globe className="w-5 h-5 text-blue-500" />
              Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl gap-2 border-border/40 hover:bg-primary/5">
              <Command className="w-5 h-5" />
              Github
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-10">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
