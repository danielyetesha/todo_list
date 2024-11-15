# Todo App - Medanit Developer Internship Program

This project is a Todo application built for the **Medanit Developer Internship Program**. It consists of three parts: a **Laravel backend API**, a **React.js frontend**, and a **Flutter mobile app**. The application allows users to manage their todos, with functionalities for adding, editing, filtering, and pagination.

## Project Structure

The repository is divided into three main parts:
- **Backend (Laravel API)**
- **Frontend (React.js)**
- **Mobile (Flutter)**

---

## Backend - Laravel API

The backend is built with **Laravel**, providing a RESTful API for managing todos.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/danielyetesha/todo-app.git
   cd todo-app/backend
Install dependencies:

bash
Copy code
composer install
Set up the .env file: Copy .env.example to .env and configure your database settings.

Run migrations:

bash
Copy code
php artisan migrate
Start the server:

bash
Copy code
php artisan serve
The API will be available at http://localhost:8000.

Frontend - React.js
The frontend is built with React.js and communicates with the Laravel backend API.

Setup
Clone the repository:

bash
Copy code
git clone https://github.com/danielyetesha/todo-app.git
cd todo-app/frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
The frontend will be available at http://localhost:3000.

Mobile - Flutter
The mobile version of the Todo app is built using Flutter, enabling users to manage their todos from a mobile device.

Setup
Clone the repository:

bash
Copy code
git clone https://github.com/danielyetesha/todo-app.git
cd todo-app/mobile
Install dependencies:

bash
Copy code
flutter pub get
Run the app:

bash
Copy code
flutter run
Ensure the backend API is running at http://localhost:8000 or update the app settings with the appropriate API URL.

Features
Backend:

RESTful API built with Laravel
CRUD operations for todos
Database interactions using Eloquent ORM
Frontend:

Todo list with pagination and filtering
React state management and API integration
Responsive UI with Tailwind CSS
Mobile:

Flutter app for Android/iOS
Syncs with the Laravel API for managing todos
Contributing
Contributions are welcome! Feel free to fork the repository, make changes, and create pull requests.

License
This project is open-source and available under the MIT License.

rust
Copy code

This combined `README.md` covers the full setup and usage for the backend, frontend, and mobile  components, while also specifying that it is built for the **Medanit Developer Internship Program**.