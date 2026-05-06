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
  images: string[];
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
