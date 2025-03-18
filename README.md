# Furniture E-commerce Backend

A RESTful API backend for a furniture e-commerce platform built with Node.js and Express.

## Features

- Complete furniture catalog management
- Category management
- User authentication and authorization
- Shopping cart functionality
- Order processing
- Product reviews
- API documentation with Swagger

## Tech Stack

- Node.js
- Express.js
- MongoDB (assumed from project structure)
- JWT Authentication
- Swagger for API documentation

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB database

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd furniture-backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=7d
   ```

## Running the Application

### Development Mode

```
npm run dev
```

### Production Mode

```
npm start
```

## API Endpoints

The API is organized around the following resources:

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Furniture

- `GET /api/furniture` - Get all furniture items
- `GET /api/furniture/:id` - Get furniture by ID
- `POST /api/furniture` - Create new furniture (admin)
- `PUT /api/furniture/:id` - Update furniture (admin)
- `DELETE /api/furniture/:id` - Delete furniture (admin)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Cart (Authenticated)

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders (Authenticated)

- `GET /api/order` - Get user's orders
- `GET /api/order/:id` - Get order by ID
- `POST /api/order` - Create new order
- `PUT /api/order/:id` - Update order status (admin)

### Reviews (Authenticated)

- `GET /api/review/:productId` - Get reviews for a product
- `POST /api/review` - Add a review
- `PUT /api/review/:id` - Update a review
- `DELETE /api/review/:id` - Delete a review

## API Documentation

API documentation is available via Swagger UI at:

```
http://localhost:5000/api-docs
```

## Authentication

The API uses JWT for authentication. To access protected endpoints:

1. Login to get an access token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer your_access_token
   ```

## Error Handling

The API returns appropriate HTTP status codes along with JSON error messages.

## License

[MIT](LICENSE)

## Contributors

- [Your Name]

## Contact

For any inquiries, please reach out to [your-email@example.com]
