import { ApartmentService } from "../services/ApartmentService";
import { Request, Response } from "express";

export class ApartmentController
{
    private apartmentService: ApartmentService;

    constructor()
    {
        this.apartmentService = new ApartmentService();
    }

    // GET /api/apartments
    listApartments = async (req: Request, res: Response): Promise<void> =>
    {
        try
        {
            const filters =
            {
                search: req.query.search as string,
                project: req.query.project as string,
                minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
                maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
                bedrooms: req.query.bedrooms ? parseInt(req.query.bedrooms as string) : undefined,
                page: req.query.page ? parseInt(req.query.page as string) : 1,
                limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
            }
            const result = await this.apartmentService.getAllApartments(filters);
        
            res.json({
                status: 'success',
                ...result,
            });
        }
        catch(error)
        {
            res.status(500).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Failed to fetch apartments',
            });
        }
    }

    // GET /api/apartments/:id
    getApartmentDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id); // Fixed: parseInt instead of Number

            if (isNaN(id) || id <=0) {
                res.status(400).json({
                    status: 'error',
                    message: 'Invalid apartment ID',
                });
                return;
            }

            const apartment = await this.apartmentService.getApartmentById(id);

            res.json({
                status: 'success',
                data: apartment,
            });
        } 
        catch (error)
        {
            if (error instanceof ReferenceError) {
                res.status(404).json({
                    status: 'error',
                    message: 'Apartment not found',
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: error instanceof Error ? error.message : 'Failed to fetch apartment',
                });
            }
        }
    };

    // POST /api/apartments
    addApartment = async (req: Request, res: Response): Promise<void> => {
        try {
            const apartmentData = req.body;
            const apartment = await this.apartmentService.createApartment(apartmentData);

            res.status(201).json({
                status: 'success',
                message: 'Apartment created successfully',
                data: apartment,
            });
        }
        catch (error)
        {
            res.status(400).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Failed to create apartment',
            });
        }
    };
}