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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "Fleet", href: "/vehicles" },
  { name: "Deals", href: "/deals" },
  { name: "About", href: "/about" },
];

const authLinks = [
  { name: "Home", href: "/" },
  { name: "Fleet", href: "/vehicles" },
  { name: "Deals", href: "/deals" },
  { name: "My Bookings", href: "/bookings" },
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

  const currentLinks = user ? authLinks : publicLinks;

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
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
            <Car className="text-primary-foreground w-6 h-6" />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight">
            VROOM<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {currentLinks.map((link) => (
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
            <DropdownMenu>
              <DropdownMenuTrigger className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/50 hover:ring-8 hover:ring-primary/10 transition-all duration-500 outline-none group">
                <Avatar className="h-full w-full group-hover:scale-110 transition-transform duration-500">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2 p-2 rounded-2xl" align="end" forceMount>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-bold leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center w-full">
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center w-full">
                      <User className="mr-3 h-4 w-4" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10 cursor-pointer py-3 rounded-xl">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/signin" 
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 rounded-full")}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className={cn(buttonVariants({ size: "sm" }), "rounded-full px-6 shadow-lg shadow-primary/20")}
              >
                Join Now
              </Link>
            </div>
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
            {currentLinks.map((link) => (
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
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-3 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/dashboard/profile" 
                  className="flex items-center gap-3 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-primary" />
                  <span>Profile</span>
                </Link>
                <Button 
                  className="w-full justify-start gap-3 text-destructive px-0" 
                  variant="ghost" 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link 
                  href="/signin" 
                  className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-full")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className={cn(buttonVariants({}), "w-full rounded-full")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Vroom
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}

