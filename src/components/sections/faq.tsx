"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What documents do I need to rent a vehicle?",
    answer: "You'll need a valid driving license, proof of identity (NID or Passport), and a security deposit. For international travelers, an international driving permit is required.",
  },
  {
    question: "Is there a minimum age requirement?",
    answer: "Yes, the minimum age to rent a vehicle is 21 years. For premium luxury vehicles, the minimum age is 25 years.",
  },
  {
    question: "Does the rental include insurance?",
    answer: "All our rentals include basic comprehensive insurance. We also offer premium insurance packages for extra peace of mind during your journey.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking through your dashboard. Cancellations made 24 hours before the rental start time are free of charge.",
  },
  {
    question: "Are there mileage limits?",
    answer: "Our standard rentals come with a 200km/day limit. Unlimited mileage packages are available for long-distance trips.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our premium rental services.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="bg-card border border-border/40 rounded-[2rem] px-8 py-2 overflow-hidden"
              >
                <AccordionTrigger className="text-xl font-bold hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg leading-relaxed pt-2 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
