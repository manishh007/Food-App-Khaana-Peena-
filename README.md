# 🍔 Food Ordering Backend (MERN)

A full-featured backend system for a food ordering application built using Node.js, Express, and MongoDB.
This project includes user authentication, product management, cart functionality, and order processing.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Forgot password (reset functionality)

### 🍔 Products

* Add products (only logged-in users)
* Get all products
* Delete product (only owner)

### 🛒 Cart System

* Add items to cart
* Prevent duplicate items (auto quantity update)
* Get user-specific cart
* Update item quantity
* Remove items from cart

### 📦 Orders

* Place order from cart
* Automatic total price calculation
* Cart gets cleared after order
* Order status management

---

## 🧰 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs

---

## 📁 Folder Structure

```
food-backend/
│── models/
│── routes/
│── middleware/
│── .env
│── server.js
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```
git clone https://github.com/your-username/food-backend.git
```

2. Navigate to project folder

```
cd food-backend
```

3. Install dependencies

```
npm install
```

4. Create a `.env` file

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Run the server

```
npm run dev
```

---

## 🔑 API Endpoints

### 👤 User Routes

* POST `/api/users/signup`
* POST `/api/users/login`
* PUT `/api/users/forgot-password`
* GET `/api/users/profile`

### 🍔 Product Routes

* POST `/api/products` (Protected)
* GET `/api/products`
* DELETE `/api/products/:id` (Owner only)

### 🛒 Cart Routes

* POST `/api/cart`
* GET `/api/cart`
* PUT `/api/cart`
* DELETE `/api/cart/:productId`

### 📦 Order Routes

* POST `/api/orders`

---

## 🧠 Learning Highlights

* Built secure authentication system using JWT
* Implemented role-based and ownership-based authorization
* Designed relational data flow between users, products, cart, and orders
* Practiced real-world backend architecture and API design

---

## 📌 Future Improvements

* Email-based password reset (OTP / token)
* Payment integration (Stripe/Razorpay)
* Admin panel for product management
* Frontend integration (React)

---

## 🚀 Live API
https://khaana-peena.onrender.com

## 👨‍💻 Author

Mani