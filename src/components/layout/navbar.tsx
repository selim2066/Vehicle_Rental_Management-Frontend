"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, User, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import { LogOut, LayoutDashboard } from "lucide-react";

const navLinks = [
  { name: "Fleet", href: "/vehicles" },
  { name: "Deals", href: "/deals" },
  { name: "How it works", href: "/how-it-works" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Car className="text-primary-foreground w-6 h-6" />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight">
            VROOM<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 transition-transform active:scale-95"
          >
            {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            {!mounted && <div className="w-5 h-5" />}
          </Button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard" 
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 rounded-full px-4 border border-border/40")}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} className="rounded-full w-10 h-10 text-destructive hover:bg-destructive/10">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <>
              <Link 
                href="/signin" 
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className={cn(buttonVariants({ size: "sm" }), "rounded-full px-6")}
              >
                Book Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border/40" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Appearance</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-10 h-10 border border-border/40"
              >
                {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
              </Button>
            </div>
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start gap-2")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Button className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10" variant="ghost" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start gap-2")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className={cn(buttonVariants({}), "w-full rounded-full justify-center")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
