"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8 p-12 bg-card border border-border/40 rounded-[3rem] shadow-2xl"
      >
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error while processing your request. Please try again or return home.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()}
            size="lg"
            className="rounded-2xl h-14 font-bold text-lg gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            asChild
            className="rounded-2xl h-14 font-bold text-lg border-border/40"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
        
        <p className="text-[10px] text-muted-foreground font-mono bg-muted/50 p-2 rounded-lg">
          Error ID: {error.digest || "N/A"}
        </p>
      </motion.div>
    </div>
  );
}
