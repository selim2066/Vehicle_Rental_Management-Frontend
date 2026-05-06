"use client";

import { Star, MessageSquare, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { reviewService } from "@/services/review.service";
import { Review } from "@/types";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReviewSectionProps {
  vehicleId: number | string;
  initialAverageRating?: number;
  initialTotalReviews?: number;
}

export default function ReviewSection({ 
  vehicleId, 
  initialAverageRating = 0, 
  initialTotalReviews = 0 
}: ReviewSectionProps) {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [vehicleId]);

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getVehicleReviews(vehicleId);
      if (response.success) {
        const fetchedReviews = response.data;
        setReviews(fetchedReviews);
        
        // Update stats based on real reviews
        if (fetchedReviews.length > 0) {
          const total = fetchedReviews.length;
          const sum = fetchedReviews.reduce((acc: number, r: Review) => acc + r.rating, 0);
          setAverageRating(sum / total);
          setTotalReviews(total);
        } else {
          setAverageRating(0);
          setTotalReviews(0);
        }

        // Check if current user has already reviewed
        if (user) {
          const alreadyReviewed = fetchedReviews.some((r: any) => r.user_id === user.id);
          setHasReviewed(alreadyReviewed);
        }
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await reviewService.create({
        vehicle_id: Number(vehicleId),
        rating,
        comment
      }, token);

      if (response.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(5);
        fetchReviews(); // Refresh reviews
        // Note: In a real app, you'd also update the average rating here or re-fetch vehicle data
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate star distribution
  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { label: `${star} Star`, value: Math.round(percentage) };
  });

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Rating Overview */}
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">Reviews & Ratings</h3>
            <div className="flex items-center gap-4">
              <span className="text-6xl font-bold">{averageRating.toFixed(1)}</span>
              <div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-5 h-5", 
                        i < Math.round(averageRating) ? "fill-amber-500 text-amber-500" : "text-muted"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm font-medium mt-1">
                  Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {distribution.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="text-sm font-medium w-12">{stat.label}</span>
                <Progress value={stat.value} className="h-2 flex-grow" />
                <span className="text-sm font-medium w-10 text-right">{stat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List & Form */}
        <div className="w-full md:w-2/3 space-y-12">
          {/* Submit Review Form */}
          {user && !hasReviewed && (
            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-6">
              <h4 className="text-xl font-bold">Write a Review</h4>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        className={cn(
                          "w-6 h-6 transition-colors",
                          star <= rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <textarea
                    required
                    placeholder="Share your experience with this vehicle..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full min-h-[120px] p-5 rounded-2xl bg-background border border-border/40 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="rounded-xl px-8 h-12 gap-2 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {/* List */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="py-10 flex justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="p-8 rounded-3xl bg-card border border-border/40 space-y-4 shadow-sm hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                        <AvatarImage src={review.users.avatar || ""} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {review.users.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">{review.users.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          {new Date(review.created_at).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/20")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-muted/20 rounded-[3rem] border border-dashed border-border/40">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <MessageSquare className="w-8 h-8 text-muted-foreground/40" />
                </div>
                <h4 className="text-xl font-bold text-muted-foreground">No reviews yet</h4>
                <p className="text-sm text-muted-foreground mt-2">Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
