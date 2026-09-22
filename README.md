# Employee Management System

A full-stack Human Resource Management System (HRMS) for managing employees, organizational structures, roles, permissions, and leave requests.

## Features

- Authentication & authorization
- Role & permission management
- Employee management
- Department, position & job level management
- Leave request & approval
- Search, filtering & pagination
- Dashboard
- Activity tracking

## Tech Stack

**Frontend**

- React.JS
- Tailwind CSS
- shadcn/ui
- Lucide React

**Backend**

- Node.js
- Express.js

**Database**

- MySQL
- Prisma ORM

**Authentication & Security**

- JWT
- Password hashing
- Role-Based Access Control (RBAC)
- Permission-Based Access Control

**Development & Testing**

- Git
- GitHub
- Jest
- Prisma Migrate
- npm

## Project Structure

    employee_management/
    ├── frontend/
    └── backend/

## Getting Started

### Backend

    cd backend
    npm install

Create `.env`:

    DATABASE_URL="your_database_url"
    JWT_SECRET="your_secret"

Run database migration:

    npx prisma migrate dev

Start the server:

    npm run dev

### Frontend

    cd frontend
    npm install
    npm run dev

## Testing

    npm test

## Author

**Andre Bagus Setiawan**
