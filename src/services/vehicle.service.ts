import { ApiResponse, Vehicle } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const mapVehicle = (v: any): Vehicle => ({
  ...v,
  images: v.vehicle_images?.map((img: any) => img.image_url) || [],
  features: v.vehicle_features?.map((f: any) => f.feature) || [],
});

export const vehicleService = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<Vehicle[]>> => {
    const searchParams = new URLSearchParams(params);
    const url = `${API_BASE_URL}/vehicles?${searchParams.toString()}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch vehicles");
    }

    const json = await res.json();
    if (json.success && json.vehicles) {
      json.data = json.vehicles.map(mapVehicle);
    } else if (json.success && json.data && Array.isArray(json.data)) {
      json.data = json.data.map(mapVehicle);
    }
    return json;
  },

  getById: async (id: string): Promise<ApiResponse<Vehicle>> => {
    const res = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch vehicle details");
    }

    const json = await res.json();
    if (json.success && json.data) {
      json.data = mapVehicle(json.data);
    }
    return json;
  },

  getFeatured: async (): Promise<ApiResponse<Vehicle[]>> => {
    const res = await fetch(`${API_BASE_URL}/vehicles/featured`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured vehicles");
    }

    const json = await res.json();
    if (json.success && json.data) {
      json.data = json.data.map(mapVehicle);
    }
    return json;
  }
};
