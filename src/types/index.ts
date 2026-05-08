export interface Vehicle {
  id: number;
  vehicle_name: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  registration_number: string;
  daily_rent_price: number;
  availability_status: 'available' | 'booked' | 'maintenance';
  fuel_type: string;
  transmission: string;
  seats: number;
  is_featured: boolean;
  color?: string;
  mileage?: number;
  description?: string;
  images: string[];
  features: string[];
  created_at: string;
  updated_at: string;
  average_rating?: number;
  total_reviews?: number;
  reviews?: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  users: {
    name: string;
    avatar: string | null;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
