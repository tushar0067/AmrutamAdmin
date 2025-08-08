Amrutam Admin Portal
A comprehensive, full-stack admin dashboard for Amrutam Pharmaceutics, designed to manage Ayurvedic ingredients. This internal tool provides a secure and efficient interface for all CRUD (Create, Read, Update, Delete) operations, complete with a multi-step form, validation, and cloud-based image hosting.

✨ Features
Secure Authentication: JWT-based login system with password hashing (bcryptjs) to protect admin credentials.

Persistent Login: Admin session is maintained across page reloads using localStorage.

Full Ingredient Management:

Create: A detailed 5-step form for adding new ingredients with step-by-step validation.

Read: View all ingredients in a paginated and searchable list.

Update: Edit existing ingredients using the same multi-step form.

Delete/Deactivate: Functionality to mark ingredients as "Inactive".

Cloud Image Uploads: Seamless integration with Cloudinary via multer for efficient and scalable image hosting.

Robust Backend Validation: Uses express-validator to sanitize and validate all incoming data before it reaches the database.

Dynamic Frontend: A responsive and interactive single-page application built with React.

Detailed Views: A dedicated page to view all details of a specific ingredient.

🛠️ Tech Stack
This project is a full-stack MERN application.

Category

Technology

Frontend

React.js, Tailwind CSS, Lucide React (Icons)

Backend

Node.js, Express.js

Database

MongoDB with Mongoose

Authentication

JSON Web Tokens (JWT), bcryptjs

Image Hosting

Cloudinary

Bundler

Parcel

📂 Project Structure
The project is structured as a monorepo with two main folders:

/amrutam-project
├── /amrutam-backend/   # The Node.js/Express server
└── /amrutam-frontend/  # The React.js client application

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Node.js (v14 or later)

MongoDB installed and running locally, or a MongoDB Atlas cluster.

A Cloudinary account for image hosting.

Installation & Setup
Clone the repository:

git clone <your-repository-url>
cd amrutam-project

Set up the Backend:

Navigate to the backend folder:

cd amrutam-backend

Install dependencies:

npm install

Create a .env file in the amrutam-backend root and add your environment variables. See the template below.

Set up the Frontend:

Open a new terminal window.

Navigate to the frontend folder:

cd amrutam-frontend

Install dependencies:

npm install

amrutam-backend/.env Template
Create a .env file in the backend's root directory and fill it with your credentials.

# MongoDB Connection String (local or Atlas)
DATABASE_URL=your_mongodb_connection_string

# JWT Secret Key (create a long, random string)
JWT_SECRET=your_super_secret_key

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

▶️ Running the Application
You need to run both the frontend and backend servers concurrently in two separate terminals.

Terminal 1 (Backend):

cd amrutam-backend
node server.js

The backend will be running at http://localhost:5000.

Terminal 2 (Frontend):

cd amrutam-frontend
npm run start

The frontend will open automatically in your browser at `http://localhost:1