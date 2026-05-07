import { ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface CreateBookingPayload {
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

export interface Booking {
  id: number;
  vehicle_id: number;
  customer_id: number;
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status: 'active' | 'returned' | 'cancelled' | 'pending';
  created_at: string;
  vehicles?: {
    vehicle_name: string;
    registration_number: string;
    vehicle_images: { image_url: string }[];
  };
  user?: any;
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

  getMyBookings: async (token: string): Promise<{ success: boolean, bookings: Booking[], meta: any }> => {
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

  getById: async (id: string, token: string): Promise<ApiResponse<Booking>> => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch booking details");
    }

    return res.json();
  },

  updateStatus: async (id: number, status: string, token: string): Promise<ApiResponse<Booking>> => {
    // Note: The current backend PUT /bookings/:id endpoint determines status based on role
    // and doesn't explicitly use the status sent in the body.
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update booking status");
    }

    return res.json();
  },

  cancel: async (id: number, token: string): Promise<ApiResponse<Booking>> => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to cancel booking");
    }

    return res.json();
  },

  delete: async (id: number, token: string): Promise<ApiResponse<any>> => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete booking");
    }

    return res.json();
  },
};
