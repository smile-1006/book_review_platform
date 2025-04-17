# Book Review Platform

A full-stack web application where users can browse, search, and filter books, read/write reviews, and rate books.

## Features

- User authentication and authorization
- Browse and search books
- Filter books by various criteria
- Read and write book reviews
- Rate books
- User profiles
- Responsive design

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- Material-UI for styling

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Mongoose for ODM

## Project Structure

```
book_review_platform/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json       # Frontend dependencies
│
├── server/                 # Express backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/book_review_platform
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Books
- GET /api/books - Get all books
- GET /api/books/:id - Get book by ID
- POST /api/books - Create a new book
- PUT /api/books/:id - Update book
- DELETE /api/books/:id - Delete book

### Reviews
- GET /api/books/:id/reviews - Get book reviews
- POST /api/books/:id/reviews - Create a review
- PUT /api/reviews/:id - Update review
- DELETE /api/reviews/:id - Delete review

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request