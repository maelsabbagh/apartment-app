export class ApartmentFilterDto {
  search?: string; // search by unitName, unitNumber,project
  project?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  page?: number;
  limit?: number;
}