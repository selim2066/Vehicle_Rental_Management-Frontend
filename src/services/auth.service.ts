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
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to sign in");
    }

    const json = await res.json();
    // Map accessToken to token for internal frontend use if needed, 
    // but better to keep it consistent. I'll map it to token for the provider.
    if (json.success && json.data.accessToken) {
      json.data.token = json.data.accessToken;
    }
    return json;
  },

  register: async (data: any): Promise<ApiResponse<any>> => {
    // Map frontend fields to backend fields
    const payload = {
      name: data.full_name,
      email: data.email,
      password: data.password,
      phone: data.phone_number,
    };

    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create account");
    }

    return res.json();
  },

  getMe: async (token: string): Promise<ApiResponse<any>> => {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
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
