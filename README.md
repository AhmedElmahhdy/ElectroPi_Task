# Online Food Ordering Prototype

This repository contains a full-stack online food ordering prototype built with React, Tailwind CSS, React Router, Axios, Node.js, Express, MongoDB, Mongoose, JWT authentication, and i18n support for English and Arabic.

## Features

- Customer authentication (register/login)
- JWT protected routes
- Product menu with search and category filters
- Shopping cart with quantity updates and persistence
- Checkout with address, phone, notes, and payment method
- Order tracking and order history
- Admin dashboard with product and order management
- Multi-language UI (English/Arabic) with RTL support
- Seed script with 15 food items and admin account

## Structure

- `Backend/` - Express API, MongoDB models, auth middleware, seed data
- `Frontend/` - React app, contexts, pages, components, translations

## Installation

### Backend

1. Navigate to backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` based on `.env.example` and set values:
   ```ini
   MONGO_URI=mongodb://localhost:27017/food-ordering
   JWT_SECRET=yourjwtsecret
   PORT=5000
   ```
4. Seed initial data:
   ```bash
   npm run seed
   ```
5. Start backend:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` based on `.env.example` and set values:
   ```ini
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start frontend:
   ```bash
   npm start
   ```

## Admin Account

- Email: `admin@example.com`
- Password: `Admin123`

## API Routes

### Users
- `POST /api/users/register` - register new user
- `POST /api/users/login` - authenticate user

### Products
- `GET /api/products` - list products
- `POST /api/products` - admin create product
- `PUT /api/products/:id` - admin update product
- `DELETE /api/products/:id` - admin delete product

### Orders
- `POST /api/orders` - create order
- `GET /api/orders/my` - get current user orders
- `GET /api/orders/:id` - get order details
- `GET /api/orders` - admin list orders
- `PUT /api/orders/:id/status` - admin update order status

## Notes

- Online payment is simulated and does not integrate a real gateway.
- Use the language switcher in the UI to toggle English/Arabic.
- Cart state, auth token, and selected language are persisted in local storage.
