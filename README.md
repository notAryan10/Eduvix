# AI Learning Companion - Phase 1

This repository contains the foundational infrastructure for the AI Learning Companion platform.

## Project Structure

- `frontend/`: Next.js application (App Router, TypeScript, TailwindCSS, Framer Motion)
- `backend/`: Express.js server (Node.js, MongoDB, JWT Auth, Multer)
- `ai-service/`: FastAPI service skeleton (Python)

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### AI Service

1. Navigate to the `ai-service` directory:
   ```bash
   cd ai-service
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Start the service:
   ```bash
   python3 app/main.py
   ```

## Phase 1 Features

- **Frontend:** Landing page, Login/Register forms, Dashboard with child-friendly UI, File upload component.
- **Backend:** JWT Authentication, MongoDB models (User, PDF, Test, Quiz), File upload system (Multer), Error handling.
- **AI Service:** Basic FastAPI skeleton.
- **Architecture:** Clean, modular, and production-ready.
