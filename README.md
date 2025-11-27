# Apartment Management App

> Full‑stack apartment listing application with search, filtering, and Dockerized deployment.

---

## Table of contents

1. [Overview](#overview)
2. [Tech stack](#tech-stack)
3. [Features](#features)
4. [Quick start](#quick-start)
5. [API Reference](#api-reference)
6. [Examples](#examples)
7. [Docker commands](#docker-commands)
8. [Project structure](#project-structure)
9. [Environment variables](#environment-variables)
10. [Development notes](#development-notes)

---

## Overview

A simple, production‑ready apartment management application built with a Node.js + TypeScript backend (Express + TypeORM) and a Next.js frontend. The app demonstrates good practices for REST APIs, pagination, search & filters, and containerized local development using Docker Compose.

## Tech stack

* **Backend:** Node.js, TypeScript, Express, TypeORM, MySQL
* **Frontend:** Next.js 16, TypeScript, Tailwind CSS
* **Database:** MySQL 8.0
* **Containerization:** Docker, Docker Compose

## Features

* List apartments with pagination
* Search by `unitName`, `unitNumber`, or `project`
* Filter by `bedrooms`, `price range`
* View detailed apartment information
* Responsive UI (mobile, tablet, desktop)
* RESTful API with JSON payloads
* Dockerized for easy local setup & development

## Quick start

1. You can change environment variables if needed `.env` file in the root directory
2. Start services:

```bash
# from repo root
docker-compose up
```

3. Create the MySQL database (if not auto-created) or load seed data.

### Initialize DB manually (example)

```bash
# list running containers
docker ps

# open shell inside mysql container
docker exec -it <mysql-container-id> bash

# in container
mysql -u root -p
# enter password (e.g. root123)

mysql> SHOW DATABASES;
mysql> CREATE DATABASE IF NOT EXISTS apartment_db;
mysql> USE apartment_db;
# then paste the contents of ./seed-data.sql
```

> **Note:** `MYSQL_USER` is commented out in `docker-compose.yml` to avoid conflicts with an existing root user. Uncomment if you want a dedicated non-root DB user.

Frontend is running on port `3000`
## API Reference

Base URL: `http://localhost:5000/api`

### List apartments

```
GET /api/apartments
Query params: search, project, bedrooms, minPrice, maxPrice, page, limit
```

Response: JSON with `items`, `meta` (pagination).

### Get apartment details

```
GET /api/apartments/:id
```

### Create apartment

```
POST /api/apartments
Content-Type: application/json
Body: { unitName, unitNumber, project, bedrooms, bathrooms, area, floor, price, description, imageUrl, isAvailable }
```

## Examples

### Create an apartment — request (JSON)

```json
{
  "unitName": "Modern Studio",
  "unitNumber": "A-102",
  "project": "Downtown Plaza",
  "bedrooms": 4,
  "bathrooms": 1,
  "area": 55.0,
  "floor": 3,
  "price": 180000,
  "description": "Cozy studio apartment in the heart of downtown. Perfect for young professionals or students. Walking distance to metro and shopping centers.",
  "imageUrl": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "isAvailable": true
}
```


### Response (example)

```json
{
    "status": "success",
    "message": "Apartment created successfully",
    "data": {
        "unitName": "Modern Studio",
        "unitNumber": "A-102",
        "project": "Downtown Plaza",
        "bedrooms": 4,
        "bathrooms": 1,
        "area": 55,
        "floor": 3,
        "price": 180000,
        "description": "Cozy studio apartment in the heart of downtown. Perfect for young professionals or students. Walking distance to metro and shopping centers.",
        "imageUrl": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        "isAvailable": true,
        "id": 46,
        "createdAt": "2025-11-27T15:49:33.295Z",
        "updatedAt": "2025-11-27T15:49:33.295Z"
    }
}
```

## Docker commands

```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs (follow)
docker-compose logs -f

# Rebuild images
docker-compose up --build

# Clean slate (remove volumes)
docker-compose down -v
```

## Project structure

```text
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

## Environment variables

### Backend — `.env`

```env
NODE_ENV=production
PORT=5000
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root123
DB_DATABASE=apartment_db
```

### Frontend — `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Notes

* Backend runs on **port 5000** (configurable via `PORT`).
* Frontend runs on **port 3000**.
* MySQL default port is **3306**.
* TypeORM `synchronize` is enabled for convenience in local development — **disable in production**.
* Hot reload is supported in development mode for both frontend and backend.

