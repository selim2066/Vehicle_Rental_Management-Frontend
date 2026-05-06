import { ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface CreateBookingPayload {
  vehicle_id: number;
  start_date: string;
  end_date: string;
}

export interface Booking {
  id: number;
  vehicle_id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  vehicle?: any;
}

export const bookingService = {
  create: async (payload: CreateBookingPayload, token: string): Promise<ApiResponse<Booking>> => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create booking");
    }

    return res.json();
  },

  getMyBookings: async (token: string): Promise<ApiResponse<Booking[]>> => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return res.json();
  },
};
