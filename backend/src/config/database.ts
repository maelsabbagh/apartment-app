import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Apartment } from '../models/Apartment'; // Import the entity directly

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'springstudent',
  password: process.env.DB_PASSWORD || 'springstudent',
  database: process.env.DB_DATABASE || 'apartment_db',
  synchronize: true, // ⭐ This creates tables automatically - only use in development!
  logging: process.env.NODE_ENV === 'development',
  entities: [Apartment], // Import entities directly instead of using path
  subscribers: [],
  migrations: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully!');
    console.log('Tables created/synced automatically!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};