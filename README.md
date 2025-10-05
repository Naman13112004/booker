# 📚 Booker – MERN Book Review Platform

A full-stack **Book Review Platform** built using the **MERN** stack (MongoDB, Express, React, Node.js).  
Users can sign up, log in, add books, and post/edit/delete reviews with dynamic average ratings and authentication using **JWT**.

---

## 🚀 Features

- 👤 **User Authentication** (JWT + bcrypt)
- 📘 **Book Management** (CRUD operations, pagination)
- ⭐ **Review System** (add/edit/delete reviews, average ratings)
- 🔒 **Protected Routes** (only authorized users can edit/delete)
- 🌗 **Dark/Light Mode Support**
- ⚙️ **Deployed Backend (Render)** + **Frontend (Vercel)**

---

## 🧩 Tech Stack

**Frontend:**
- React.js (Vite)
- React Router
- Axios
- Context API (for Auth)
- Tailwind CSS

**Backend:**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcrypt.js
- CORS, Helmet, Morgan (security & logging)

---

## 🗂 Folder Structure

```
booker/
│
├── backend/       # Express + MongoDB API
├── frontend/      # React frontend
└── README.md      # Main project overview
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Naman13112004/booker.git
cd booker
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file inside `/backend`:
```
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-jwt-secret>
```
Then run:
```bash
node ./src/index.js
```
Backend runs on `http://localhost:5000`.

---

### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install
```
Then run:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173` (or as shown in terminal).

---

## 🌍 Deployment Links
- **Frontend (Vercel):** [https://booker-beige.vercel.app](https://booker-beige.vercel.app/)
- **Backend (Render):** [https://booker-p26c.onrender.com](https://booker-p26c.onrender.com)

---

## 🧱 Database Schema Overview

### User
```js
{
  name: String,
  email: String,
  password: String
}
```

### Book
```js
{
  title: String,
  author: String,
  description: String,
  genre: String,
  year: Number,
  addedBy: ObjectId (ref: User)
}
```

### Review
```js
{
  bookId: ObjectId (ref: Book),
  userId: ObjectId (ref: User),
  rating: Number,
  reviewText: String
}
```
