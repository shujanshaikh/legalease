# Indian Law Chatbot

## Overview

The **Indian Law Chatbot** is a web-based platform that provides users with legal information about the Indian legal system. It features a chatbot integrated with PDF processing to assist users with legal queries. The platform includes basic user authentication and utilizes modern web technologies for efficient performance and scalability.

## Features

- **User Authentication**: Signup and Sign-in functionality.
- **Chatbot Integration**: AI-powered chatbot using the Gemini API.
- **PDF Chatbot**: Enables users to interact with PDF documents for legal queries.
- **Legal Information Access**: Provides information related to Indian laws.
- **Scalable Architecture**: Managed using Turborepo for better project structure.

## Tech Stack

### Frontend:

- **Next.js** - React-based framework for server-side rendering and performance optimization.
- **Tailwind CSS** - Utility-first CSS framework for styling.

### Backend:

- **Express.js** - Lightweight Node.js framework for building APIs.
- **Prisma** - ORM for interacting with PostgreSQL database.
- **PostgreSQL** - Relational database management system.
- **Gemini API** - AI-powered chatbot API for answering legal queries.
- **Turborepo** - Monorepo tool for efficient project management.

## Installation & Setup

### Prerequisites:

- Node.js & Bun (if using Bun for package management)
- PostgreSQL Database
- Environment variables setup (.env file)

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/shujanshaikh/legalease.git
   cd legalease
   ```
2. Install dependencies:
   ```bash
   bun install  # If using Bun
   # OR
   npm install  # If using npm
   ```
3. Set up the environment variables in a `.env` file:
   ```env
   .env.example
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   bun run server  # If using Bun
   # OR
   npm run server  # If using npm
   ```
6. Start the frontend:
   ```bash
   bun run dev  # If using Bun
   # OR
   npm run dev  # If using npm
   ```
7. Open the app in your browser at `http://localhost:3000`

## Project Structure

```
indian-law-chatbot/
├── apps/
│   ├── web/      # Next.js frontend
│   ├── backend/  # Express backend
│
├── packages/
│   ├── db/       # Prisma ORM setup
├── turbo.json    # Turborepo configuration
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and submit a pull request.

