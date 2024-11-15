Backend README.md (Laravel API)
markdown
Copy code
# Backend - Todo App (Laravel API)

This is the backend API for the Todo application, built using **Laravel**. The API provides endpoints to manage todos, including creation, retrieval, updating, and deletion. It uses **Eloquent ORM** for database interaction.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/danielyetesha/todo-app.git
   cd todo-app/backend
Install dependencies:

bash
Copy code
composer install
Copy .env.example to .env and set up your database connection.

Run migrations:

bash
Copy code
php artisan migrate
Serve the app:

bash
Copy code
php artisan serve
API endpoints are available at http://localhost:8000.