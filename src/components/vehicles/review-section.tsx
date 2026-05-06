"use client";

import { Star, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const mockReviews = [
  {
    id: 1,
    name: "Alex Thompson",
    date: "2 weeks ago",
    rating: 5,
    comment: "Absolutely loved driving this car. It was clean, well-maintained, and the performance was incredible. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: 2,
    name: "Jessica Wu",
    date: "1 month ago",
    rating: 4,
    comment: "Great experience overall. The car was perfect for our weekend trip. The only minor thing was the sound system could be better.",
    avatar: "https://i.pravatar.cc/150?u=jessica",
  },
];

export default function ReviewSection({ vehicleId }: { vehicleId: number | string }) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Rating Overview */}
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">Reviews & Ratings</h3>
            <div className="flex items-center gap-4">
              <span className="text-6xl font-bold">4.8</span>
              <div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm font-medium mt-1">Based on 12 reviews</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "5 Star", value: 85 },
              { label: "4 Star", value: 10 },
              { label: "3 Star", value: 5 },
              { label: "2 Star", value: 0 },
              { label: "1 Star", value: 0 },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="text-sm font-medium w-12">{stat.label}</span>
                <Progress value={stat.value} className="h-2 flex-grow" />
                <span className="text-sm font-medium w-10 text-right">{stat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="w-full md:w-2/3 space-y-8">
          {mockReviews.map((review) => (
            <div key={review.id} className="p-8 rounded-3xl bg-card border border-border/40 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted")} />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
          
          <button className="w-full py-4 rounded-2xl border border-dashed border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all font-bold">
            View All Reviews
          </button>
        </div>
      </div>
    </div>
  );
}


