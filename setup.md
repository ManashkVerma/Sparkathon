# WWalmart Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

2. **Initialize Database**
   ```bash
   cd server
   npm run init-db
   ```

3. **Start Development Servers**
   ```bash
   # From root directory
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Environment Variables

Create a `.env` file in the `server` directory:
```
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:3000
```

## Features Included

### Backend (Node.js/Express)
- ✅ User authentication (JWT)
- ✅ Product catalog with categories
- ✅ Shopping cart management
- ✅ Order processing
- ✅ SQLite database with sample data
- ✅ RESTful API endpoints
- ✅ Input validation and error handling

### Frontend (React/TypeScript)
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive design
- ✅ TypeScript for type safety
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Placeholder pages for all features

## Sample Data

The database comes pre-populated with:
- 8 product categories
- 10 sample products
- Admin user (email: admin@wwalmart.com, password: admin123)

## Next Steps

1. **Complete Frontend Implementation**
   - Implement authentication forms
   - Build product catalog with filters
   - Create shopping cart interface
   - Add checkout process
   - Build user profile management

2. **Enhance Backend**
   - Add product reviews
   - Implement search functionality
   - Add payment processing
   - Add image upload for products
   - Add admin panel

3. **Production Deployment**
   - Switch to PostgreSQL/MySQL
   - Add proper environment variables
   - Set up CI/CD pipeline
   - Add monitoring and logging

## Tech Stack

- **Backend**: Node.js, Express, SQLite, JWT, bcrypt
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Database**: SQLite (development), PostgreSQL (production ready)
- **Authentication**: JWT tokens
- **Styling**: Tailwind CSS with custom Walmart theme 