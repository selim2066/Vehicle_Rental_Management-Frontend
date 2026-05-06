"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce"; // I'll need to create this hook

export default function VehicleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 500);

  const currentType = searchParams.get("type") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/vehicles?${params.toString()}`);
  };

  useEffect(() => {
    updateFilters("search", debouncedSearch);
  }, [debouncedSearch]);

  const categories = [
    { name: "All Types", value: "all" },
    { name: "Luxury", value: "luxury" },
    { name: "SUV", value: "SUV" },
    { name: "Sedan", value: "sedan" },
    { name: "Sports", value: "sports" },
    { name: "Electric", value: "electric" },
  ];

  const sortOptions = [
    { name: "Newest First", value: "newest" },
    { name: "Price: Low to High", value: "price_asc" },
    { name: "Price: High to Low", value: "price_desc" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full bg-card p-4 rounded-[2rem] border border-border/40 shadow-sm">
      {/* Search Input */}
      <div className="relative flex-grow w-full md:w-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, brand, or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 pl-12 pr-4 bg-muted/50 border-none rounded-2xl focus-visible:ring-primary/20 w-full"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="h-14 rounded-2xl gap-3 px-8 border-2 border-white/5 bg-white/5 backdrop-blur-xl font-bold inline-flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary/50 transition-all duration-300 outline-none shadow-xl shadow-black/20 group">
            <SlidersHorizontal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="tracking-tight">{categories.find(c => c.value === currentType)?.name}</span>
            <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-[2rem] p-3" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest px-4 py-3 opacity-60">Vehicle Type</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-2 bg-white/5" />
            <DropdownMenuRadioGroup value={currentType} onValueChange={(v) => updateFilters("type", v)}>
              {categories.map((cat) => (
                <DropdownMenuRadioItem key={cat.value} value={cat.value} className="rounded-xl cursor-pointer py-3 font-medium">
                  {cat.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="h-14 rounded-2xl gap-3 px-8 border-2 border-white/5 bg-white/5 backdrop-blur-xl font-bold inline-flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary/50 transition-all duration-300 outline-none shadow-xl shadow-black/20 group">
            <span className="tracking-tight">Sort by</span>
            <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-[2rem] p-3" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest px-4 py-3 opacity-60">Sort Order</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-2 bg-white/5" />
            <DropdownMenuRadioGroup value={currentSort} onValueChange={(v) => updateFilters("sort", v)}>
              {sortOptions.map((opt) => (
                <DropdownMenuRadioItem key={opt.value} value={opt.value} className="rounded-xl cursor-pointer py-3 font-medium">
                  {opt.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
