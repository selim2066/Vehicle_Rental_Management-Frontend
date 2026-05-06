import Navbar from "@/components/layout/navbar";
import { Shield, Users, Globe, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AboutPage() {
  const stats = [
    { label: "Founded", value: "2026" },
    { label: "Cars in Fleet", value: "500+" },
    { label: "Happy Clients", value: "12k+" },
    { label: "Cities Covered", value: "15" },
  ];

  return (
    <main className="min-h-screen pt-24 bg-background">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                Our Story
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight">
                Redefining the <span className="text-primary italic">Drive.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At Vroom, we believe that renting a car should be more than just a transaction. It should be the start of an adventure. Since 2026, we've been curating a fleet of the world's most exceptional vehicles to ensure that every journey you take is memorable.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-heading font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c3d9?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt="Our Heritage"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-card border border-border/40 p-8 rounded-[2rem] shadow-xl max-w-xs hidden md:block">
                <Trophy className="w-10 h-10 text-primary mb-4" />
                <p className="font-bold text-lg mb-1">Award Winning Service</p>
                <p className="text-sm text-muted-foreground">Voted #1 Premium Rental Service in the region for 3 consecutive years.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-y border-border/40">
            {[
              { title: "Safety First", desc: "Every vehicle undergoes a rigorous 150-point inspection before every rental.", icon: Shield },
              { title: "Customer Obsessed", desc: "Our 24/7 concierge team is always available to assist with any request.", icon: Users },
              { title: "Sustainable Future", desc: "We are committed to transitioning 50% of our fleet to electric by 2026.", icon: Globe },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <h2 className="text-4xl font-heading font-bold mb-8">Join the Vroom Community</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-12">
              Stay updated with our latest additions and exclusive member events.
            </p>
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10 h-14 font-bold group")}>
              Become a Member
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
