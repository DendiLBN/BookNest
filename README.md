# BookNest

BookNest is a full-stack bookstore application built with React, TypeScript, NestJS, MongoDB, and RTK Query. The goal of the project is to provide a functional online bookstore experience with authenticated user flows, book discovery, profile management, and a clear frontend/backend architecture.

## About This App

The frontend is created with React, TypeScript, Vite, Redux Toolkit, RTK Query, React Router, Ant Design, Tailwind CSS, Storybook, and Vitest.

The backend is created with NestJS, TypeScript, MongoDB, Mongoose, JWT authentication, Nodemailer, and Jest.

## Core Features

- User registration and login
- Password change and password reset flow
- Access token and refresh token authentication
- Book catalog with search, categories, ratings, and covers
- Favorite books
- Avatar upload
- Protected user flows
- Error handling on the frontend
- Storybook stories and fixtures for isolated component development
- Focused frontend tests and backend tests
- Formatting and verification scripts for a consistent workflow

## Recent Improvements

- Rebranded the application to BookNest across the UI, browser title, footer, and email templates.
- Improved the book catalog with more realistic titles, category data, ratings, and cover support.
- Added favorite books support so users can keep a personal reading list.
- Added avatar upload support for user profiles.
- Added Storybook stories and fixtures close to the related components.
- Added focused frontend tests for isolated component behavior.
- Added backend tests for core API behavior.
- Added formatting and verification scripts for a more professional development workflow.
- Improved frontend API organization while keeping RTK Query as the main data fetching layer.

## Tech Stack

Frontend:

- TypeScript
- React
- Vite
- Redux Toolkit
- RTK Query
- React Router
- Ant Design
- Tailwind CSS
- Storybook
- Vitest

Backend:

- NestJS
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Nodemailer
- NestJS Throttler
- Jest

## Roadmap

- Add shopping cart flow
- Add checkout and payment flow
- Add transaction history and purchase details
- Add admin-only book management
- Add user settings panel
- Improve uploaded image processing on the backend
- Expand frontend and backend test coverage

## Scripts

```bash
npm run dev
npm run frontend
npm run backend
npm run format
npm run format:check
npm run test
npm run build
npm run verify
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/DendiLBN/BookNest.git
```

Install root, frontend, and backend dependencies:

```bash
npm install
npm install --prefix ./frontend
npm install --prefix ./backend
```

Create local environment files for the frontend and backend. Do not commit `.env` files or secrets.

Run the application:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

Backend runs on `http://localhost:5000`.
