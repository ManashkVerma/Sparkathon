# WWalmart - Walmart Clone

A modern e-commerce application built with React, Node.js, and Express, featuring a Walmart-like shopping experience.

## Features

- 🛍️ **Product Catalog** - Browse thousands of products across multiple categories
- 🔍 **Advanced Search** - Find products quickly with filters and sorting
- 🛒 **Shopping Cart** - Add, remove, and manage items in your cart
- 👤 **User Authentication** - Secure login and registration system
- 💳 **Checkout Process** - Streamlined payment and order completion
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⭐ **Product Reviews** - Read and write customer reviews
- 🏷️ **Categories & Filters** - Easy navigation through product categories

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for state management
- Axios for API calls

### Backend
- Node.js with Express
- SQLite database (easily upgradable to PostgreSQL/MySQL)
- JWT authentication
- Multer for file uploads
- bcrypt for password hashing

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wwalmart
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
wwalmart/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Express middleware
│   └── utils/             # Utility functions
└── database/              # Database files and migrations
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search` - Search products
- `GET /api/categories` - Get all categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. # Sparkathon
