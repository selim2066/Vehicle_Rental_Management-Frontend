"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Car } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  welcomeTitle,
  welcomeSubtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-background overflow-hidden">
      {/* Left Side: Image & Welcome Text (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/car-login.avif"
            alt="Futuristic Car"
            fill
            className="object-cover opacity-60 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/20" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 max-w-xl text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/" className="flex items-center gap-2 group mb-12 inline-flex">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]">
                <Car className="text-primary-foreground w-7 h-7" />
              </div>
              <span className="text-3xl font-heading font-bold tracking-tight">
                VROOM<span className="text-primary">.</span>
              </span>
            </Link>

            <h1 className="text-6xl font-black mb-6 tracking-tighter leading-tight">
              {welcomeTitle}
            </h1>
            <p className="text-xl text-neutral-300 font-medium leading-relaxed max-w-md">
              {welcomeSubtitle}
            </p>

            <div className="mt-12 flex gap-8">
              <div className="flex flex-col">
                <span className="text-primary font-bold text-2xl">500+</span>
                <span className="text-neutral-400 text-sm uppercase tracking-widest">Premium Cars</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-bold text-2xl">24/7</span>
                <span className="text-neutral-400 text-sm uppercase tracking-widest">Global Support</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #ffffff10 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Background Decor for Mobile */}
        <div className="absolute top-0 left-0 w-full h-full lg:hidden z-0">
          <Image
            src="/images/car-login.avif"
            alt="Background"
            fill
            className="object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md z-10"
        >
          <div className="mb-8 lg:mb-12">
            <Link href="/" className="lg:hidden flex items-center gap-2 group mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Car className="text-primary-foreground w-6 h-6" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight">
                VROOM<span className="text-primary">.</span>
              </span>
            </Link>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-xl border border-border/50 p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-primary/5">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
