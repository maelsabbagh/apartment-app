import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApartmentController } from './controllers/ApartmentController';
import { initializeDatabase } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


const apartmentController = new ApartmentController();
// routes
app.get('/api/apartments', apartmentController.listApartments);
app.get('/api/apartments/:id', apartmentController.getApartmentDetails);
app.post('/api/apartments', apartmentController.addApartment);



// testing
// Hello World endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Hello World! Apartment API is running',
    timestamp: new Date().toISOString()
  });
});

// Test apartments endpoint (placeholder)
app.get('/api/apartments', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Apartments endpoint - Coming soon!',
    data: []
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const startServer = async () => {
  try {
    // Initialize database first
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Apartments: http://localhost:${PORT}/api/apartments`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();