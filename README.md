# BookNest

BookNest is a full-stack bookstore application built with React, TypeScript, NestJS, MongoDB, and RTK Query. It combines a customer-facing catalog with authenticated account flows and admin-only inventory tools.

## Features

- User registration, login, logout, password change, and password reset
- Access-token and refresh-token authentication
- Role-based flows for customers and administrators
- Dashboard with catalog summary data and featured shelves
- Book catalog with search, categories, ratings, details, and cover images
- Favorite books and customer cart flow
- User profile editing, avatar upload, and account deletion
- Admin-only book management and cover upload
- Storybook stories kept close to related components
- Focused frontend tests and backend tests
- Automated formatting and verification through Lefthook, ESLint, Biome, and Prettier

## Recent improvements

- Rebranded the application to BookNest across the interface and project documentation.
- Split customer and admin book flows so only administrators manage inventory.
- Added a cart experience with a header drawer and dedicated cart page.
- Added support for favorite books with throttled interactions and notification history.
- Added profile editing, avatar upload, password controls, and delete-account flow.
- Added book cover upload with backend validation for image MIME type, extension, and file signature.
- Expanded seeded catalog data with more realistic titles and public-domain cover assets.
- Added dashboard summary data from the backend.
- Reorganized frontend API usage around shared RTK Query modules and shared API config.
- Added Storybook fixtures, focused component tests, and repository-level verification hooks.
- Replaced committed environment secrets with local `.env` files and tracked `.env.example` templates.

## Stack

Frontend:

- Vite
- React 18
- TypeScript
- Redux Toolkit Query
- React Router
- Ant Design
- Tailwind CSS
- Yup
- Vitest
- Storybook

Backend:

- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Jest

Tooling:

- npm
- Lefthook
- lint-staged
- ESLint
- Biome
- Prettier

## Project structure

```text
frontend/src/features/   domain modules
frontend/src/common/     shared frontend code
frontend/src/layouts/    application layout
frontend/src/store/      Redux and RTK Query setup
backend/src/modules/     backend domain modules
backend/src/common/      shared backend code
```

## Local setup

Install dependencies:

```bash
npm install
npm install --prefix ./frontend
npm install --prefix ./backend
```

Create local environment files from the tracked examples:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

Fill in your local backend credentials in `backend/.env`, then start the app:

```bash
npm run dev
```

Local services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Storybook: `http://localhost:6006`

## Useful scripts

```bash
npm run dev
npm run frontend
npm run backend
npm run format
npm run format:check
npm run test
npm run build
```

Frontend-only:

```bash
npm run storybook --prefix ./frontend
npm run test --prefix ./frontend
```

Backend-only:

```bash
npm run test --prefix ./backend
npm run test:e2e --prefix ./backend
```

## Notes

- Real `.env` files are intentionally ignored by Git. Keep secrets local and use `.env.example` only as a template.
- RTK Query is the frontend data-fetching layer.
- Storybook is used to inspect isolated component states without running the whole application flow.
