import { Apartment,ApartmentListResponse, ApartmentDetailResponse, ApartmentFilters  } from "../types/Apartment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const apartmentApi = {
  // Get all apartments with filters
  async getApartments(filters?: ApartmentFilters): Promise<ApartmentListResponse> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.project) params.append('project', filters.project);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const url = `${API_URL}/api/apartments${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch apartments');
    }
    return response.json();
  },

  // Get single apartment by ID
  async getApartmentById(id: number): Promise<ApartmentDetailResponse> {
    const response = await fetch(`${API_URL}/api/apartments/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch apartment details');
    }
    return response.json();
  },

  // Create new apartment (optional - for future use)
  async createApartment(apartment: Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApartmentDetailResponse> {
    const response = await fetch(`${API_URL}/api/apartments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apartment),
    });
    if (!response.ok) {
      throw new Error('Failed to create apartment');
    }
    return response.json();
  },
};