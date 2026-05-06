import { ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const reviewService = {
  create: async (data: { vehicle_id: number; rating: number; comment: string }, token: string): Promise<ApiResponse<any>> => {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to submit review");
    }

    return res.json();
  },

  getVehicleReviews: async (vehicleId: string | number): Promise<ApiResponse<any[]>> => {
    const res = await fetch(`${API_BASE_URL}/reviews/vehicle/${vehicleId}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return res.json();
  }
};
