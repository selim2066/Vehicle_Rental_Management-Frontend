"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Play, Car as CarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      className="relative min-h-[90vh] flex items-center pt-32 pb-20 z-10 overflow-hidden bg-background"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/10 blur-[100px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* Text Content */}
        <div className="z-10 flex flex-col">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl xl:text-[7rem] font-heading font-extrabold leading-[0.95] mb-10 tracking-tight"
          >
            Drive the <br />
            <span className="text-primary italic font-serif">Future</span> of <br />
            Luxury.
          </h1>

          <p
            ref={subtitleRef}
            className="text-base md:text-xl text-foreground/60 max-w-lg mb-12 leading-relaxed font-medium"
          >
            Experience unparalleled performance and sophistication. From sleek sports cars to spacious SUVs, find the perfect vehicle for your next adventure.
          </p>

          <div ref={actionsRef} className="flex flex-col sm:flex-row items-center gap-5">
            <Link
              href="/vehicles"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto rounded-full px-10 h-16 text-lg font-bold group shadow-2xl shadow-primary/20")}
            >
              Browse Fleet
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-10 h-16 text-lg font-bold gap-3 border-white/10 hover:bg-white/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <Play className="w-3.5 h-3.5 text-primary fill-primary ml-0.5" />
              </div>
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Visual Content — desktop */}
        <motion.div
          ref={imageRef}
          whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative aspect-square lg:aspect-[4/4.5] hidden lg:block group perspective-1000"
        >
          <div className="relative w-full h-full rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl bg-muted ring-1 ring-white/5">
            <Image
              src="/images/entop-simurgh.png"
              alt="Entop Simurgh Hypercar"
              fill
              priority
              sizes="50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-1000 rounded-[4rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10" />
          </div>
        </motion.div>

        {/* Visual Content — mobile */}
        <div className="relative aspect-[16/9] w-full lg:hidden rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-muted">
          <Image
            src="/images/entop-simurgh.png"
            alt="Entop Simurgh Hypercar"
            fill
            priority
            sizes="100vw"
            className="object-cover rounded-[2.5rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
