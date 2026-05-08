
"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background max-w-7xl mx-auto px-6">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="max-w-8xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Get in Touch
            </div>
            <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6 tracking-tight">
              Let&apos;s Start a <span className="text-primary italic">Conversation.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about our fleet or need a custom rental package? Our team is here to provide you with a seamless luxury experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      {/* Content Section */}
      <section className="pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <div className="space-y-2">
                {[
                  { icon: MapPin, label: "Visit Us", value: "123 Premium Drive, Luxury District, Dhaka, Bangladesh" },
                  { icon: Phone, label: "Call Us", value: "+880 1580-912090" },
                  { icon: Mail, label: "Email Us", value: "mdselimreza2066@gmail.com" },
                  { icon: Globe, label: "Portfolio", value: "portfolio-msr2000.vercel.app" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-5 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-5 h-5" />
                    <h3 className="text-lg font-bold">Business Hours</h3>
                  </div>
                  <div className="space-y-1 text-sm opacity-90">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-bold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-bold">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Sunday</span>
                      <span className="font-bold italic">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 py-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border/40 rounded-3xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Send a Message</h3>
                    <p className="text-sm text-muted-foreground">We typically respond within 2 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-xs font-bold ml-1 uppercase tracking-wide">Full Name</Label>
                      <Input id="name" placeholder="Md Selim Reza" required className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-xs font-bold ml-1 uppercase tracking-wide">Email Address</Label>
                      <Input id="email" type="email" placeholder="mdselimreza2066@gmail.com" required className="h-11 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="subject" className="text-xs font-bold ml-1 uppercase tracking-wide">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs font-bold ml-1 uppercase tracking-wide">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your requirements..."
                      required
                      className="min-h-[100px] rounded-xl resize-none p-3"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-base font-bold group">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
