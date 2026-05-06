"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

interface AuthContextType {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      checkSession(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkSession = async (t: string) => {
    try {
      const response = await authService.getMe(t);
      if (response.success) {
        setUser(response.data);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: any) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        toast.success("Welcome back, " + user.full_name);
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response = await authService.register(data);
      if (response.success) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
