"use client";

import Link from "next/link";
import { Car, MessageSquare, Bird, Camera, Share2, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Fleet", href: "/vehicles" },
    { name: "Deals", href: "/deals" },
    { name: "How it works", href: "/how-it-works" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  categories: [
    { name: "Luxury Cars", href: "/vehicles?type=luxury" },
    { name: "SUVs", href: "/vehicles?type=suv" },
    { name: "Sports Cars", href: "/vehicles?type=sports" },
    { name: "Electric", href: "/vehicles?type=electric" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Car className="text-primary-foreground w-6 h-6" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight">
                VROOM<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Experience the ultimate in luxury and performance. Our premium fleet ensures every journey is unforgettable.
            </p>
            <div className="flex gap-4">
              {[MessageSquare, Bird, Camera, Share2].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bold text-lg">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bold text-lg">Categories</h4>
            <ul className="space-y-4">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Premium Drive, Luxury District, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+880 1580-912090</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>mdselimreza2066@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-border/40 mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Vroom Premium Rental. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
