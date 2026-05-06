import { ApiResponse, Vehicle } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const vehicleService = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<Vehicle[]>> => {
    const searchParams = new URLSearchParams(params);
    const url = `${API_BASE_URL}/vehicles?${searchParams.toString()}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch vehicles");
    }

    return res.json();
  },

  getById: async (id: string): Promise<ApiResponse<Vehicle>> => {
    const res = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch vehicle details");
    }

    return res.json();
  },

  getFeatured: async (): Promise<ApiResponse<Vehicle[]>> => {
    const res = await fetch(`${API_BASE_URL}/vehicles/featured`, {
      next: { revalidate: 3600 }, // Cache featured vehicles longer
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured vehicles");
    }

    return res.json();
  }
};
