# KK Builders Portfolio

A full-stack portfolio web application for KK Builders, featuring a modern frontend built with React, Vite, and Tailwind CSS, and a backend powered by Node.js and Express. The project showcases company information, projects, blogs, and more, with admin functionality for content management.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview
KK Builders Portfolio is designed to present company information, showcase projects, publish blogs, and provide a secure admin dashboard for content management. The site is fully responsive and optimized for performance and user experience.

## Features
- Animated intro on first visit
- Responsive design with Tailwind CSS
- Home, About, Project, Contact, Architect, and Blog pages
- Admin panel for managing blogs and projects
- Protected routes for admin features
- RESTful API for blog and project management
- MongoDB integration for data persistence
- Lazy loading for faster performance
- Error handling and loading states

## Technology Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Other:** React Router, Session Storage, ESLint

## Project Structure
```
admin/         # Admin dashboard (React, Vite)
backend/       # Node.js/Express backend API
frontend/      # Main portfolio frontend (React, Vite)
```

### Frontend
- Built with React, Vite, and Tailwind CSS
- Located in `frontend/`
- Main entry: `src/App.jsx`
- Components: `src/components/`, `src/components/child-components/`
- Assets: `src/assets/`

### Backend
- Node.js/Express REST API
- Located in `backend/`
- Main entry: `server.js`
- Routes: `src/routes/`
- Controllers: `src/controllers/`
- Models: `src/models/`
- Config: `src/config/`
- Middleware: `src/middleware/`

### Admin
- Separate React app for admin dashboard
- Located in `admin/`

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas)

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd KK-Builders-Portoflio
```

### 2. Install dependencies
```sh
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 3. Configure environment variables
- Copy `.env.example` to `.env` in `backend/`
- Set your MongoDB URI and other secrets

### 4. Run the backend server
```sh
cd backend
npm start
```

### 5. Run the frontend
```sh
cd frontend
npm run dev
```

### 6. Run the admin dashboard (optional)
```sh
cd admin
npm run dev
```

## Usage
- Access the frontend at `http://localhost:5173` (default Vite port)
- Access the backend API at `http://localhost:5000` (default Express port)
- Admin dashboard runs on its own Vite port (check terminal output)

## API Endpoints
- `GET /api/projects` - List all projects
- `POST /api/projects` - Add a new project (admin only)
- `GET /api/blogs` - List all blogs
- `POST /api/blogs` - Add a new blog (admin only)
- `POST /api/admin/login` - Admin login
- More endpoints available in `backend/src/routes/`

## Scripts
- `npm start` (backend): Start Express server
- `npm run dev` (frontend/admin): Start Vite development server

## Environment Variables
Backend requires:
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- Other secrets as needed

## Troubleshooting
- Ensure MongoDB is running and accessible
- Check `.env` configuration for typos
- Use `npm install` in each folder if dependencies are missing
- For port conflicts, change the port in `.env` or Vite config

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.

## Contact
For questions or support, contact the project maintainer at [your-email@example.com].

