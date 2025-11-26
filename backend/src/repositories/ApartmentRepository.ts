import { AppDataSource } from "../config/database";
import { ApartmentFilterDto } from "../dtos/ApartmentFilterDTO";
import { Apartment } from "../models/Apartment";

export class ApartmentRepository
{
    private repository = AppDataSource.getRepository(Apartment);

    async FindAll(filters:ApartmentFilterDto)
    {
        const {
            search,
            project,
            minPrice,
            maxPrice,
            bedrooms,
            page=1, // default,
            limit=10,
        }=filters;

        const query = this.repository.createQueryBuilder('apartment');


        if(search)
        {
             query.where(
        '(apartment.unitName LIKE :search OR apartment.unitNumber LIKE :search OR apartment.project LIKE :search)',
        { search: `%${search}%` }
             );
        }
        
        // filters
        if(project)
        {
            query.andWhere('apartment.project = :project',{project});
        }
        if(minPrice)
        {
            query.andWhere('apartment.price >= :minPrice',{minPrice});
        }
        if(maxPrice)
        {
            query.andWhere('apartment.price <= :maxPrice',{maxPrice});
        }
        
        if(bedrooms)
        {
            query.andWhere('apartment.bedrooms = :bedrooms',{bedrooms});
        }


        // pagination
        const skip = (page-1)*limit;
        query.skip(skip).take(limit);

        query.orderBy('apartment.createdAt','DESC');
        const [apartments, total] = await query.getManyAndCount();
        
    return {
      data: apartments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
    }

    async findById(id: number): Promise<Apartment | null> 
    {
        return await this.repository.findOne({ where: { id } });
    }

    async create(apartmentData: Partial<Apartment>): Promise<Apartment>
    {
        const apartment = this.repository.create(apartmentData);
        return await this.repository.save(apartment);
    }

    async update(id: number, apartmentData: Partial<Apartment>): Promise<Apartment | null>
    {
        await this.repository.update(id, apartmentData);
        return await this.findById(id);
    }

  async delete(id: number): Promise<boolean>
    {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
    
}