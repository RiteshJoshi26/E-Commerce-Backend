# 👜 E-Commerce Backend

A fully functional **E-Commerce Backend** built with **Node.js, Express, MongoDB, and JWT Authentication**.  
This project handles user authentication, admin access, product management (bags), and shopping cart functionality.

---

## 🚀 Features
- 🔑 **Authentication** (Register, Login, Logout with JWT & Cookies)
- 👤 **User Profile** (View and manage cart)
- 🛒 **Cart Management** (Add, remove, update cart items)
- 👜 **Admin Panel** (Only admins can add/manage bags)
- 🔐 **Middleware Protection** (Auth & Role-based access)
- 🗄️ **MongoDB Database** with Mongoose ODM

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas for deployment)
- **Auth:** JWT (JSON Web Tokens), Cookies
- **View Engine:** EJS
- **Deployment:** Render / Railway

---

## 📂 Project Structure
ecommerce-backend/
│── config/ # Database connection
│── controllers/ # Request handlers
│── middleware/ # Auth middlewares
│── models/ # Mongoose models (User, Bag, Cart)
│── routes/ # Express routes
│── views/ # EJS templates (if using server-side rendering)
│── public/ # Static files (CSS, images, JS)
│── app.js # Main entry point
│── package.json
│── .env.example # Example environment variables
