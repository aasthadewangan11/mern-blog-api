# MERN Blog API

A RESTful API for a full-featured blog platform built with **Node.js**, **Express.js**, and **MongoDB**, featuring user authentication, blog and category CRUD operations, and image upload support via **Cloudinary**.

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for image uploads)
- JWT (Authentication)
- Bcrypt (Password hashing)
- Express FileUpload
- Body-Parser

## 🚀 Features

- User authentication with JWT
- Role-based access (Admin/User)
- CRUD operations for:
  - Blog Posts
  - Categories
  - Users
- Secure image upload using Cloudinary
- Modular route structure

## 📁 API Endpoints

### Auth
- `POST /user/register` – Register a new user
- `POST /user/login` – Login and get token

### Blogs
- `GET /blog/` – Get all blogs
- `POST /blog/` – Create new blog (auth required)
- `PUT /blog/:id` – Update blog by ID (auth required)
- `DELETE /blog/:id` – Delete blog by ID (admin only)

### Categories
- `GET /category/` – Get all categories
- `POST /category/` – Add a new category (admin only)

## 🛠️ Setup

1. Clone the repository  
   `git clone https://github.com/your-username/mern-blog-api.git`

2. Navigate to the folder  
   `cd mern-blog-api`

3. Install dependencies  
   `npm install`

4. Add `.env` file with MongoDB URI and Cloudinary credentials

5. Run the server  
   `npm start`

## 🌐 Deployment

To deploy the API, ensure the environment variables for MongoDB and Cloudinary are properly configured on your hosting platform (e.g., Heroku, Render).
