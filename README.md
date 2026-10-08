# Task Manager

A full-stack task management app. Users sign up and sign in. They can then create, edit, delete and track their own tasks in a sortable list view or a drag-and-drop Kanban board.

The repository has two parts:

- `express-backend`: a REST API built with Express, TypeScript and MongoDB (Mongoose), using JWT authentication
- `next-frontend`: a Next.js 14 (App Router) client styled with Tailwind CSS and shadcn/ui components

## Features

- User sign up and sign in. Passwords are hashed with bcrypt, and JWTs expire after 1 hour.
- Each user sees and manages only their own tasks.
- Tasks have a title, description, status (`To Do`, `In Progress`, `Completed`), priority (`Low`, `High`) and due date.
- List view (`/home/list`): a sortable, filterable table with add, edit and delete actions.
- Kanban view (`/home/kanban`): drag tasks between status columns to update their status.
- Light and dark theme toggle.

## Tech Stack

| Part     | Technologies |
|----------|--------------|
| Backend  | Node.js, Express 4, TypeScript, Mongoose 8, jsonwebtoken, bcrypt, zod, cors, dotenv |
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI / shadcn/ui, TanStack Table, @hello-pangea/dnd, axios, next-themes |

## Project Structure

```
Task-Manager/
├── express-backend/
│   ├── api/index.ts            # Exports the Express app (Vercel entry)
│   ├── src/
│   │   ├── index.ts            # App setup, MongoDB connection, server start
│   │   ├── database/db.ts      # User and Task Mongoose models
│   │   ├── middlewares/auth.ts # JWT auth middleware
│   │   └── routes/             # /user and /task routers
│   ├── .env.example
│   └── vercel.json
└── next-frontend/
    ├── app/                    # Pages: / (sign in), /signup, /home/list, /home/kanban
    ├── components/             # Login, Signup, List, Kanban, AddEditTask, ui/ ...
    ├── config/ApiConfig.ts     # Backend URL used by the frontend
    └── .env.example
```

## API Endpoints

All routes are prefixed with `/api/v1`. Task routes need an `Authorization: Bearer <token>` header.

| Method | Route               | Description |
|--------|---------------------|-------------|
| POST   | `/user/signup`      | Create an account (`name`, `email`, `password`) and return a token |
| POST   | `/user/signin`      | Sign in (`email`, `password`) and return a token |
| POST   | `/task/add`         | Create a task |
| GET    | `/task/getall`      | Get all tasks for the signed-in user |
| PUT    | `/task/edit/:id`    | Update a task |
| DELETE | `/task/delete/:id`  | Delete a task |
| PATCH  | `/task/status/:id`  | Update only a task's status |

## Prerequisites

- Node.js
- pnpm (both folders include a `pnpm-lock.yaml`)
- A MongoDB database (local or hosted)

## How to set up locally

### 1. Backend

```
cd express-backend
pnpm install
```

Create a `.env` file in `express-backend` based on `.env.example`:

```
PORT=4000
JWT_Sectret=<your JWT secret>
ConnectionString=<your MongoDB connection string including the database name>
```

Note: the variable name `JWT_Sectret` is spelled this way in the code. Keep this spelling.

Then build and start the server. It listens on `PORT`, which defaults to 4000:

```
pnpm start
```

`pnpm start` runs the TypeScript build (`tsc -b`) and then `node dist/index.js`.

### 2. Frontend

```
cd next-frontend
pnpm install
pnpm dev
```

The app runs at http://localhost:3000.

Update the `.env` files in both the frontend and backend folders by looking at the respective `.env.example` files.

Note: the frontend currently reads the backend URL from `next-frontend/config/ApiConfig.ts`. This file is hardcoded to a deployed backend. The line that reads the `BackendUrl` environment variable is commented out. To use your local backend, change `backendUrl` in that file to `http://localhost:4000`.

### Other frontend scripts

```
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # run ESLint
```

## Known Issue

`express-backend/src/middlewares/auth.ts` uses `TokenExpiredError` and `JsonWebTokenError` without importing them. The TypeScript build reports errors until they are imported from `jsonwebtoken`.
