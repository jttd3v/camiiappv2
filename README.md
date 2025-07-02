# CAMII Application Portal

This repository contains prototype React components and a minimal PHP backend for storing maritime job applications. The project is intended to run on **XAMPP** with a **MySQL** database.

## Requirements

- PHP 8+ and MySQL (included in XAMPP)
- Node.js (optional if you plan to build the React frontend)

## Setup

1. Clone this repository inside your XAMPP `htdocs` directory.
2. Create a new MySQL database:
   ```sql
   CREATE DATABASE camiiapp CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   ```
3. Import the schema:
   ```bash
   mysql -u root -p camiiapp < backend/create_tables.sql
   ```
4. Adjust the credentials in `backend/db.php` or set the environment variables `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS`.
5. Start Apache and MySQL via the XAMPP control panel.
6. Navigate to `http://localhost/camiiappv2/index.php`.

## API Endpoints

- `GET /backend/applications.php` – List all applications.
- `POST /backend/applications.php` – Create a new application. Send JSON formatted according to `Database.txt`.

## Building the Frontend

The React components in this repository are not bundled. Use your preferred tool (e.g., Vite or Create React App) to build the frontend and place the generated assets in the project root or serve them separately.

## License

MIT
