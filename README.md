# BookNest

BookNest is a full-stack bookstore application built with React, TypeScript, NestJS, MongoDB, and RTK Query. It is designed as a bookstore dashboard where users can browse books, manage their account, save favorites, and use authenticated flows backed by a NestJS API.

## Features

- User registration and login
- Password change and reset
- Book catalog with search, categories, ratings, and covers
- Favorite books
- Avatar upload
- Protected user flows with access and refresh tokens
- Storybook and focused frontend tests
- Backend tests and CI verification

## Recent improvements

- Rebranded the application from the original bookstore name to BookNest across the UI, browser title, footer, and email templates.
- Improved the book catalog with more realistic titles, category data, ratings, and cover support instead of placeholder-only content.
- Added favorite books support so users can keep a personal reading list.
- Added avatar upload support for user profiles.
- Added Storybook stories and fixtures close to the related frontend components.
- Added focused frontend tests for isolated component behavior.
- Added backend tests for core API behavior.
- Added formatting and verification scripts for a more consistent development workflow.
- Improved API organization on the frontend while keeping RTK Query as the main data fetching layer.

## Stack

Frontend:

- Vite
- React
- TypeScript
- Redux Toolkit Query
- React Router
- Ant Design
- Tailwind CSS
- Vitest
- Storybook

Backend:

- NestJS
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Jest

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

## Local setup

Install root, frontend, and backend dependencies:

```bash
npm install
npm install --prefix ./frontend
npm install --prefix ./backend
```

Create local environment files for frontend and backend, then run:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:5000`.
