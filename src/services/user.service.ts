import { ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar?: string;
  is_active: boolean;
  created_at: string;
}

export const userService = {
  getAll: async (token: string, query: any = {}): Promise<{ success: boolean, users: User[], meta: any }> => {
    const params = new URLSearchParams(query);
    const res = await fetch(`${API_BASE_URL}/users?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  },

  delete: async (token: string, id: number): Promise<ApiResponse<any>> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete user");
    }

    return res.json();
  },

  updateMe: async (token: string, data: any): Promise<ApiResponse<User>> => {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update profile");
    }

    return res.json();
  },
};
