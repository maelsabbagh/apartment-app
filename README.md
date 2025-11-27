# Apartment Management App

Full-stack apartment listing application with search and filter capabilities.

## Tech Stack

- **Backend:** Node.js, TypeScript, Express, TypeORM, MySQL
- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Database:** MySQL 8.0
- **Container:** Docker, Docker Compose

## Features

- ✅ List apartments with pagination
- ✅ Search by unit name, number, or project
- ✅ Filter by project, bedrooms, price range
- ✅ View detailed apartment information
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ RESTful API
- ✅ Dockerized for easy deployment


## Quick Start

- Update `.env` with your credentials
- run docker compose up
- Create MySQL database: `apartment_db` 
- initially no apartment data so you can use the post method with postman to create new apartments

**POST URL: /api/apartments**

**body:**
```
{
  "unitName": "Modern Studio",
  "unitNumber": "A-102",
  "project": "Downtown Plaza",
  "bedrooms": 2,
  "bathrooms": 1,
  "area": 70.0,
  "floor": 3,
  "price": 2000000,
  "description": "Cozy studio apartment in the heart of downtown. Perfect for young professionals or students. Walking distance to metro and shopping centers.",
  "imageUrl": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "isAvailable": true
}
```

## API Endpoints

### List Apartments
```
GET /api/apartments
Query params: search, project, bedrooms, minPrice, maxPrice, page, limit
```

### Get Apartment Details
```
GET /api/apartments/:id
```

### Create Apartment
```
POST /api/apartments
Body: {unitName, unitNumber, project, bedrooms, bathrooms, area, floor, price, description, imageUrl, isAvailable}
```

## Docker Commands
```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose up --build

# Clean slate (remove volumes)
docker-compose down -v
```

## Project Structure
```
apartment-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── dtos/
│   │   ├── config/
│   │   └── app.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=5000
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root123
DB_DATABASE=apartment_db
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 3000
- MySQL runs on port 3306
- TypeORM synchronize is enabled (auto-creates tables)
- Hot reload is supported in development mode

