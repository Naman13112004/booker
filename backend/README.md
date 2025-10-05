# ⚙️ Backend – Booker API (Express + MongoDB)

This is the **backend API** for the Booker platform, built using **Node.js**, **Express**, and **MongoDB** with **JWT authentication** and **bcrypt password hashing**.

---

## 🚀 Features
- RESTful API design
- JWT-based user authentication
- MongoDB Atlas database with Mongoose models
- Secure headers (Helmet) and request logging (Morgan)
- Error handling middleware
- CORS-enabled for frontend connection

---

## 🧩 Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcrypt.js
- Helmet
- Cors
- Morgan

---

## ⚙️ Installation

```bash
cd backend
npm install
```

Create a `.env` file:
```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
```

Start the server:
```bash
node ./src/index.js
```
Server runs on: `http://localhost:5000`

---

## 🧱 Folder Structure

```
backend/
├── src
  ├── models/
  ├── routes/
  ├── controllers/
  ├── middlewares/
  ├── utils/
  ├── validators/
  ├── config/
  ├── app.js
  └── index.js
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login & get JWT |
| GET | `/api/books?page=1` | Get all books (paginated) |
| POST | `/api/books` | Add a new book |
| PATCH | `/api/books/:id` | Edit book (only creator) |
| DELETE | `/api/books/:id` | Delete book |
| GET | `/api/reviews/:bookId` | Get all reviews for a book |
| POST | `/api/reviews/:bookId` | Add review |
| PATCH | `/api/reviews/:id` | Edit review |
| DELETE | `/api/reviews/:id` | Delete review |

---
