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
                <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              className="w-full h-14 rounded-2xl text-lg font-bold group mt-4 shadow-lg shadow-primary/20"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Quick Access / Demo Login */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full h-14 rounded-2xl border-dashed border-primary/40 hover:bg-primary/5 text-primary font-bold gap-2"
              onClick={() => {
                setFormData({ email: "mdselimreza2066@gmail.com", password: "admin123" });
              }}
            >
              <Command className="w-5 h-5" />
              Demo Login (Admin)
            </Button>
          </div>

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
            <Button variant="outline" className="h-14 rounded-2xl gap-3 border-border/40 hover:bg-primary/5 font-bold transition-all hover:border-primary/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl gap-3 border-border/40 hover:bg-primary/5 font-bold transition-all hover:border-primary/20">
              <Globe className="w-5 h-5 text-blue-500" />
              Github
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-10">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline underline-offset-4">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </main>

  );
}
