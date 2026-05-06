import Navbar from "@/components/layout/navbar";
import { Tag, Timer, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function DealsPage() {
  const deals = [
    {
      title: "Weekend Warrior",
      discount: "15% OFF",
      desc: "Perfect for quick getaways. Valid for all SUV rentals from Friday to Sunday.",
      code: "WEEKEND15",
      color: "bg-blue-500"
    },
    {
      title: "First-Time Rental",
      discount: "20% OFF",
      desc: "New to Vroom? Get a special discount on your very first luxury car booking.",
      code: "WELCOME20",
      color: "bg-primary"
    },
    {
      title: "Long-Term Stay",
      discount: "30% OFF",
      desc: "Rent any vehicle for more than 7 days and enjoy massive savings.",
      code: "LONGSTAY30",
      color: "bg-purple-500"
    }
  ];

  return (
    <main className="min-h-screen pt-24 bg-background">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Tag className="w-3 h-3" />
              Exclusive Offers
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">Premium <span className="text-primary italic">Savings</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Luxury doesn't have to be expensive. Explore our handpicked deals and drive your dream car for less.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <div key={deal.title} className="group relative bg-card border border-border/40 rounded-[2.5rem] p-10 overflow-hidden hover:border-primary/40 transition-all duration-500">
                <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 -translate-x-1/2 -translate-y-1/2", deal.color)} />
                
                <div className="relative z-10">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", deal.color)}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                  <div className="text-4xl font-heading font-bold text-primary mb-4">{deal.discount}</div>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {deal.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-border/40">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Code: <span className="text-foreground">{deal.code}</span></div>
                    <Link href="/vehicles" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}>
                      Apply
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 rounded-[3rem] bg-primary/5 border border-primary/10 text-center">
            <Timer className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Flash Sales Coming Soon</h2>
            <p className="text-muted-foreground mb-8">Sign up for our newsletter to get notified about 24-hour flash deals on supercars.</p>
            <div className="max-w-md mx-auto flex gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 h-12 px-6 rounded-full bg-background border border-border/40 outline-none focus:border-primary/50" />
              <button className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform">Notify Me</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
