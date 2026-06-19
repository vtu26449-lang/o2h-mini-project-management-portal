# Mini Project Management Portal

A full-stack web application to manage project tasks — built with **React.js** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## Features

- View all tasks in a responsive card grid
- Create tasks with title, description, and status
- Mark tasks as Completed
- Delete tasks
- Filter tasks by status (All / Pending / In Progress / Completed)
- Dashboard statistics (Total, Pending, In Progress, Completed)
- Loading indicator and empty state UI
- Dark Mode toggle (bonus)
- Fully responsive — mobile-friendly

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js, Axios, React Router DOM |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB (Mongoose ODM)            |
| Styling   | Pure CSS with CSS Variables       |

---

## Folder Structure

```
project-root/
├── frontend/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Dashboard, AddTask pages
│       └── services/        # Axios API calls
├── backend/
│   ├── config/              # Database connection
│   ├── controllers/         # Route handler logic
│   ├── models/              # Mongoose schema
│   └── routes/              # Express routes
└── README.md
```

---

## Prerequisites

- Node.js v16+
- MongoDB (local installation or MongoDB Atlas)
- npm v7+

---

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager-portal.git
cd task-manager-portal
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

> For MongoDB Atlas, replace MONGO_URI with your Atlas connection string.

Start the backend server:

```bash
npm start
```

The API will run at: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The app will open at: `http://localhost:3000`

---

## API Documentation

Base URL: `http://localhost:5000/api`

### GET /tasks
Returns all tasks. Supports optional `?status=` query param.

**Query Params:**
- `status` — `Pending` | `In Progress` | `Completed` (optional)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "664abc...",
      "title": "Build Login Page",
      "description": "Create a responsive login page with validation",
      "status": "Pending",
      "createdAt": "2024-05-20T10:00:00.000Z"
    }
  ]
}
```

---

### POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Build Login Page",
  "description": "Create a responsive login page with form validation",
  "status": "Pending"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": { ... },
  "message": "Task created successfully"
}
```

---

### PUT /tasks/:id
Update the status of a task.

**Request Body:**
```json
{
  "status": "Completed"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { ... },
  "message": "Task updated successfully"
}
```

---

### DELETE /tasks/:id
Delete a task by ID.

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Assumptions

1. No user authentication is required for this version — all users share the same task list.
2. MongoDB is assumed to be running locally on the default port `27017`. For cloud deployment, update `MONGO_URI` in `.env`.
3. Status values are strictly `Pending`, `In Progress`, or `Completed`.
4. Task creation from the UI only allows `Pending` or `In Progress` as initial status; `Completed` is set via the Complete button.
5. The frontend uses React's built-in proxy (`"proxy": "http://localhost:5000"`) so no CORS issues in development.

---

## Git Commit History

```
Initial project setup
Implemented task APIs
Added React Dashboard
Integrated frontend with backend
Updated README
```
