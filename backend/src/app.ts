import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Hello World endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Hello World! Apartment API is running 🏢',
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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Apartments: http://localhost:${PORT}/api/apartments`);
});