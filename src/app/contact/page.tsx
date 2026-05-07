
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
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Get in Touch
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
              Let&apos;s Start a <span className="text-primary italic">Conversation.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about our fleet or need a custom rental package? Our team is here to provide you with a seamless luxury experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Visit Us", value: "123 Premium Drive, Luxury District, Dhaka, Bangladesh" },
                    { icon: Phone, label: "Call Us", value: "+880 1580-912090" },
                    { icon: Mail, label: "Email Us", value: "mdselimreza2066@gmail.com" },
                    { icon: Globe, label: "Portfolio", value: "porfolio-msr2000.vercel.app" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 p-6 rounded-3xl bg-card border border-border/40 hover:border-primary/40 transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-lg font-semibold">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 space-y-4">
                  <Clock className="w-10 h-10 mb-2" />
                  <h3 className="text-2xl font-bold">Business Hours</h3>
                  <div className="space-y-2 opacity-90">
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
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border/40 rounded-[3rem] p-8 md:p-12 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Send a Message</h3>
                    <p className="text-muted-foreground">We typically respond within 2 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-bold ml-1">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Md Selim Reza"
                        required
                        className="h-14 rounded-2xl bg-background/50 border-border/40 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-bold ml-1">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="mdselimreza2066@gmail.com"
                        required
                        className="h-14 rounded-2xl bg-background/50 border-border/40 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-bold ml-1">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      required
                      className="h-14 rounded-2xl bg-background/50 border-border/40 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-bold ml-1">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your requirements..."
                      required
                      className="min-h-[150px] rounded-2xl bg-background/50 border-border/40 focus:ring-primary/20 resize-none p-4"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
