import { ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    full_name: string;
    role: string;
  };
  token: string;
}

export const authService = {
  login: async (credentials: any): Promise<ApiResponse<AuthResponse>> => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to sign in");
    }

    return res.json();
  },

  register: async (data: any): Promise<ApiResponse<AuthResponse>> => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create account");
    }

    return res.json();
  },

  getMe: async (token: string): Promise<ApiResponse<any>> => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Session expired");
    }

    return res.json();
  },
};
