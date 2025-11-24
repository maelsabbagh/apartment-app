import { DataSource } from 'typeorm';
import dotenv from 'dotenv';


dotenv.config();

export const AppDataSource = new DataSource({
type:'mysql',
host: process.env.DB_HOST || 'localhost',
port: parseInt(process.env.DB_PORT || '3306'),
username: process.env.DB_USERNAME || 'root',
password: process.env.DB_PASSWORD || '',
database: process.env.DB_DATABASE || 'apartment_db',
logging: process.env.NODE_ENV === 'development',
entities: ['src/models/**/*.ts'],
subscribers: [],
migrations: [],
});

export const initializeDatabase = async():Promise<void> => {
     try {
    await AppDataSource.initialize();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}