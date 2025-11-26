import { error } from "console";
import { ApartmentFilterDto } from "../dtos/ApartmentFilterDTO";
import { ApartmentRepository } from "../repositories/ApartmentRepository";
import { CreateApartmentDTO } from "../dtos/CreateApartmentDTO";

export class ApartmentService
{
    private apartmentRepository:ApartmentRepository;

    constructor()
    {
        this.apartmentRepository = new ApartmentRepository();
    }

    async getAllApartments(filters:ApartmentFilterDto)
    {
        try
        {
            return await this.apartmentRepository.FindAll(filters);
        }
        catch(error)
        {
            throw new Error("failed");
        }
    }

    async getApartmentById(id:number)
    {
        try
        {
            const aparment = await this.apartmentRepository.findById(id);
            if(!aparment)
            {
                throw new Error("Apartment not found");
            }

            return aparment;
        }
        catch(error)
        {
            throw error;
        }
    }

    async createApartment(aparment:CreateApartmentDTO)
    {
        try
        {
            if(!aparment.unitName || !aparment.unitNumber || !aparment.project)
            {
                throw new Error("missing fields");
            }

            if(aparment.price<=0)
            {
                throw new Error("apartment price must be greater than 0");
            }

            if(aparment.bedrooms<=0 || aparment.bathrooms<=0)
            {
                throw new Error("apartment should have bedrooms and bathrooms");
            }

            return await this.apartmentRepository.create(aparment);
        }
        catch(error)
        {
            throw error;
        }
    
    }

    
}