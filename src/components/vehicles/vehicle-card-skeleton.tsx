import { Skeleton } from "@/components/ui/skeleton";

export default function VehicleCardSkeleton() {
  return (
    <div className="bg-card border border-border/40 rounded-[2rem] overflow-hidden shadow-sm">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[16/10] w-full" />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-2 text-right">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-3 w-8 ml-auto" />
          </div>
        </div>

        {/* Specs Grid Skeleton */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 rounded-2xl" />
          ))}
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  );
}
