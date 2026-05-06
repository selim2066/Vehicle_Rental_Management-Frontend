"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Car as CarIcon } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
      })
      .from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, "-=0.8")
      .from(actionsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4")
      .from(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
      }, "-=1.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/10 blur-[100px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Premium Fleet Available
          </div>
          
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-heading font-bold leading-[1.1] mb-6 tracking-tight"
          >
            Drive the <br />
            <span className="text-primary italic">Future</span> of Luxury.
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-foreground/60 max-w-lg mb-10 leading-relaxed"
          >
            Experience unparalleled performance and sophistication. From sleek sports cars to spacious SUVs, find the perfect vehicle for your next adventure.
          </p>
          
          <div ref={actionsRef} className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg group" asChild>
              <Link href="/vehicles">
                Browse Fleet
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg gap-2 border-white/10 hover:bg-white/5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-3 h-3 text-primary-foreground ml-0.5" />
              </div>
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/5">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-foreground/40">Luxury Cars</div>
            </div>
            <div>
              <div className="text-3xl font-bold">12k+</div>
              <div className="text-sm text-foreground/40">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-foreground/40">Support</div>
            </div>
          </div>
        </div>

        {/* Visual Content */}
        <div ref={imageRef} className="relative aspect-[4/5] lg:aspect-square group">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/hero.png"
              alt="Premium Luxury Car"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-20 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <CarIcon className="text-primary w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold">Tesla Model 3 2024</div>
                <div className="text-xs text-primary font-semibold">$120 / Day</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
