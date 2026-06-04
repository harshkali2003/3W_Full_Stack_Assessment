# 3W Full Stack Assessment

A full-stack social media application inspired by the TaskPlanet Social Feed. Users can create accounts, share text and image posts, interact through likes and comments, and browse a public feed of posts from all users.

## Features

### Authentication

* User Registration
* User Login
* Secure Password Hashing
* JWT-based Authentication

### Social Feed

* Create text posts
* Upload image posts
* Create posts with both text and images
* Public feed displaying posts from all users

### Engagement

* Like posts
* Comment on posts
* View total likes and comments
* Track users who liked or commented on a post

### Additional Features

* Responsive UI
* Modular Monolith Backend Architecture
* RESTful API Design
* MongoDB Atlas Integration

---

## Tech Stack

### Frontend

* React.js
* Material UI / React Bootstrap
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication
* Bcrypt

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

## Project Structure

3W Full Stack Assessment/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── common/
│   │   ├── errors/
│   │   │   └── global.error.js
│   │   │
│   │   └── middlewares/
│   │       ├── error.middleware.js
│   │       └── jwt.middleware.js
│   │
│   ├── config/
│   │   ├── db.config.js
│   │   └── multer.config.js
│   │
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   ├── user.model.js
│   │   │   └── user.route.js
│   │   │
│   │   ├── post/
│   │   ├── likes/
│   │   └── comments/
│   │
│   ├── .env
│   ├── .gitignore
|   ├── index.js
│   └── package.json
│
├── README.md
```

### Architecture

The backend follows a Modular Monolith Architecture where each business domain is organized as an independent module.

* User Module → Authentication and user management
* Post Module → Post creation and feed management
* Like Module → Post engagement through likes
* Comment Module → User comments and discussions

Shared concerns such as middleware, error handling, and configuration are centralized under the `common` and `config` directories to keep modules independent and maintainable.

```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd social-post-app
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login user          |

### Posts

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | /api/posts             | Create post       |
| GET    | /api/posts             | Fetch all posts   |
| POST   | /api/posts/:id/like    | Like a post       |
| POST   | /api/posts/:id/comment | Comment on a post |

---

## Environment Variables

Backend:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

Frontend:

```env
REACT_APP_API_URL=
```

---

## Deployment Links

### Frontend

Vercel URL: Coming Soon

### Backend

Render URL: Coming Soon

---

## Assignment Requirements Covered

* User Signup/Login
* Create Text Posts
* Create Image Posts
* Public Feed
* Like Functionality
* Comment Functionality
* MongoDB Database
* React Frontend
* Express Backend
* Responsive UI

---

## Future Improvements

* Pagination / Infinite Scroll
* User Profiles
* Image Optimization
* Notifications
* Real-time Updates with Socket.io

---

## Author

Harsh Vardhan
