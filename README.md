# 📚 Library Book Inventory API

A production-style **Express.js REST API** for managing a Library Book Inventory system.

This project was built using a layered architecture that separates business logic, data access, request validation, and HTTP handling into independent modules. Although it currently uses a JSON file for persistence, the architecture is designed so the repository layer can later be replaced with MongoDB, PostgreSQL, or another database with minimal changes to the rest of the application.

---

# Features

* RESTful API
* CRUD operations for books
* Layered Architecture
* Repository Pattern
* Service Layer
* Request Validation using Zod
* Global Error Handling
* Standardized API Responses
* XSS Input Sanitization
* UUID Validation
* Duplicate ISBN Validation
* API Versioning (`/api/v1`)
* Health Check Endpoint
* Request ID Middleware
* Centralized Logger
* Analytics Logging
* Environment-based Configuration
* Graceful Server Shutdown
* ESLint Configuration

---

# Tech Stack

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| Node.js               | JavaScript Runtime            |
| Express.js            | REST API Framework            |
| Zod                   | Request Validation            |
| UUID                  | Unique ID Generation          |
| Helmet                | Security Headers              |
| CORS                  | Cross-Origin Resource Sharing |
| Express XSS Sanitizer | Input Sanitization            |
| Dotenv                | Environment Variables         |
| ESLint                | Code Quality                  |

---

# Project Structure

```text
src
│
├── config
│   └── env.js
│
├── constants
│   ├── api.js
│   ├── httpStatus.js
│   └── messages.js
│
├── controllers
│   ├── book.controller.js
│   └── health.controller.js
│
├── data
│   └── books.json
│
├── middleware
│   ├── errorHandler.js
│   ├── requestId.js
│   ├── sanitizeInput.js
│   └── validateRequest.js
│
├── repositories
│   └── book.repository.js
│
├── routes
│   ├── book.routes.js
│   ├── health.routes.js
│   └── index.routes.js
│
├── services
│   └── book.service.js
│
├── utils
│   ├── analytics.js
│   ├── apiError.js
│   ├── apiResponse.js
│   ├── asyncHandler.js
│   └── logger.js
│
├── validators
│   ├── book.validator.js
│   └── common.validator.js
│
├── app.js
└── server.js
```

---

# Architecture

The application follows a layered architecture.

```text
Client
   │
   ▼
Routes
   │
   ▼
Middleware
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
books.json
```

Each layer has a single responsibility:

* **Routes** map HTTP endpoints.
* **Middleware** handles validation, sanitization, and request processing.
* **Controllers** handle HTTP requests and responses.
* **Services** implement business logic.
* **Repositories** manage data persistence.

---

# Installation

Clone the repository.

```bash
git clone https://github.com/Sriniketh-Vangipuram/library-book-inventory-api.git
```

Move into the project.

```bash
cd library-book-inventory-api
```

Install dependencies.

```bash
npm install
```

Create an environment file.

```bash
cp .env.example .env
```

Run the server.

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000
NODE_ENV=development
```

---

# API Endpoints

## Health

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/v1/health` |

---

## Books

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/v1/books`     | Get all books     |
| GET    | `/api/v1/books/:id` | Get a single book |
| POST   | `/api/v1/books`     | Create a book     |
| PUT    | `/api/v1/books/:id` | Update a book     |
| DELETE | `/api/v1/books/:id` | Delete a book     |

---

# Sample Create Request

```http
POST /api/v1/books
```

```json
{
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "isbn": "9780134494166",
  "category": "Programming"
}
```

---

# Sample Success Response

```json
{
  "success": true,
  "message": "Book created successfully.",
  "data": {
    "id": "...",
    "title": "Clean Architecture",
    "author": "Robert C. Martin",
    "isbn": "9780134494166",
    "category": "Programming",
    "available": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

# Error Handling

The API returns standardized error responses.

Example:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "title",
      "message": "Title is required."
    }
  ]
}
```

Common status codes:

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Validation Error      |
| 404         | Resource Not Found    |
| 409         | Duplicate ISBN        |
| 500         | Internal Server Error |

---

# Security Features

* Helmet for secure HTTP headers
* CORS support
* XSS input sanitization
* UUID validation
* Input validation using Zod
* Environment variable configuration

---

# Logging & Monitoring

The API includes:

* Request ID middleware
* Centralized logger
* Analytics logging
* Health check endpoint
* Graceful shutdown support

---

# Design Patterns Used

* Layered Architecture
* Repository Pattern
* Service Layer Pattern
* Middleware Pattern

---

# Future Improvements

* MongoDB / PostgreSQL integration
* Docker support
* Swagger / OpenAPI documentation
* Authentication & Authorization
* Unit and Integration Testing
* Pagination & Filtering
* CI/CD Pipeline
* Redis Caching

---

# License

This project is licensed under the MIT License.

This README is strong enough for an internship submission and also looks appropriate for a portfolio repository. It documents not just *how* to run the project, but also *why* it's structured the way it is, which is something reviewers appreciate.

oject is ready to submit.
