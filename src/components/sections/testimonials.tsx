"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Ahmed Al-Sayed",
    role: "Business Executive",
    content: "The premium service and vehicle quality were outstanding. Vroom made my business trip across Dhaka seamless and stylish.",
    image: "/images/client-1.jpeg",
    rating: 5,
  },
  {
    name: "Omar Farooq",
    role: "Tech Entrepreneur",
    content: "Absolute best rental experience I've had. The booking process is incredibly smooth, and the cars are in pristine condition.",
    image: "/images/client-2.png",
    rating: 5,
  },
  {
    name: "Zaid Al-Mansour",
    role: "Luxury Traveler",
    content: "Highly recommend the luxury SUV fleet. Perfect for group trips with all the modern amenities you could ask for.",
    image: "/images/client-3.png",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Don't just take our word for it. Hear from the people who drive with us every day.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 20 },
                default: { delay: i * 0.1 }
              }}
              viewport={{ once: false }}
              className="p-10 rounded-[3rem] bg-card border border-border/40 relative group hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 transition-transform duration-500 group-hover:scale-110" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={testimonial.image} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
