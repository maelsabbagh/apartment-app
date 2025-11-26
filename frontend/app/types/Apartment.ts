export interface Apartment {
  id: number;
  unitName: string;
  unitNumber: string;
  project: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: number;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApartmentListResponse {
  status: string;
  data: Apartment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApartmentDetailResponse {
  status: string;
  data: Apartment;
}

export interface ApartmentFilters {
  search?: string;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  page?: number;
  limit?: number;
}