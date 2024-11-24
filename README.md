# API Application

A RESTful API for transactify built with Express.js, SQLite, and Sequelize. This application provides authentication, product management, and transaction handling functionalities.

## Features

- User Authentication (Register/Login)
- Product Management
- Transaction Handling
- API Documentation with Swagger
- JWT-based Authentication
- SQLite Database
- Sequelize ORM

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- Yarn package manager
- SQLite3

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
yarn install
```

3. Create a .env file in the root directory:
```bash
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Initialize the database:
```bash
yarn sequelize-cli db:migrate
```

## Running the Application

Start the development server:
```bash
yarn dev
```

Or start in production mode:
```bash
yarn start
```

The server will start running at `http://localhost:3000`

## API Documentation

Access the Swagger API documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login user

### Products
- GET `/products` - Get all products (requires authentication)
- POST `/products` - Create a new product (requires authentication)

### Transactions
- GET `/transactions` - Get all transactions (requires authentication)
- POST `/transactions` - Create a new transaction (requires authentication)
- DELETE `/transactions/:id` - Delete a transaction (requires authentication)

## Project Structure

```
.
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── transactionController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── index.js
│   ├── user.js
│   ├── product.js
│   └── transaction.js
├── routes/
│   ├── auth.js
│   ├── product.js
│   └── transaction.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Dependencies

Main dependencies used in this project:
- express
- sequelize
- sqlite3
- jsonwebtoken
- bcryptjs
- swagger-jsdoc
- swagger-ui-express

## Development Dependencies
- nodemon
- sequelize-cli

## Scripts

```bash
# Start development server
yarn dev

# Start production server
yarn start

# Run database migrations
yarn migrate

# Undo database migrations
yarn migrate:undo
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request