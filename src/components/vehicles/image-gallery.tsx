"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop");

  const displayImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden bg-muted group shadow-2xl">
        <Image
          src={activeImage}
          alt="Vehicle Preview"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {displayImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border-2 transition-all duration-300",
              activeImage === img ? "border-primary shadow-lg shadow-primary/20 scale-95" : "border-transparent hover:border-primary/40"
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 15vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
