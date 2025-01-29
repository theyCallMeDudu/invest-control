# InvestControl Installation Guide

This guide describes the installation process for the Laravel `InvestControl` application using **Docker**. You can run the entire application without manually installing PHP, MySQL, or Composer on your machine.

---

## 📌 1. Prerequisites
Before you begin, make sure you have the following software installed:

- **[Docker](https://www.docker.com/get-started)** 🐳 (to run containers)
- **[Git](https://git-scm.com/)** (to clone the repository)

---

## 📌 2. Clone the repository
If you don’t have the project yet, clone it using:

```bash
git clone https://github.com/theyCallMeDudu/invest-control.git
cd invest-control
```

---

## 📌 3. Create the environment
### 🔹 3.1. Create the `.env` File
Copy the example file and configure the environment variables:

```bash
cp ic-backend/.env.example ic-backend/.env
```

Ensure that the `.env` file contains the following database settings:

```bash
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=ic-database
DB_USERNAME=root
DB_PASSWORD=root
```

## 📌 4. Start InvestControl with Docker
### 🔹 4.1. Start the containers
Run the following command from the project root to start the application:

```bash
docker-compose up --build
```

This will:

✅ Create and start the Laravel and MySQL containers
✅ Download and install all dependencies automatically
✅ Set up the application without manual installation

🚀 The Laravel API will be available at: http://localhost:8000
🌍 The Angular frontend will be available at: http://localhost:4200

## 📌 5. Run the migrations and seeders
After the containers are running, execute the following command to set up the database:

```bash
docker exec -it ic-backend php artisan migrate --seed
```

This will:

✅ Create the database tables
✅ Populate the database with initial data

If you only need to run migrations without seeders, use:
```bash
docker exec -it ic-backend php artisan migrate
```

## 📌 6. To stop the containers
If you need to stop the application, run:

```bash
docker-compose down
```

This will stop the services but keep the database intact.
To remove everything (including the database), use:

```bash
docker-compose down -v
```

## 📌 7. Useful Docker commands
To access Laravel inside the container:

```bash
docker exec -it ic-backend bash
```

To run Laravel commands without entering the container:

```bash
docker exec -it ic-backend php artisan migrate
docker exec -it ic-backend php artisan tinker
docker exec -it ic-backend php artisan queue:work
```

To connect to MySQL inside the container:

```bash
docker exec -it investcontrol-db mysql -u root -p
```
(Password: root)

## 📌 In short: Quick start setting up from scratch
If you are starting the project from scratch, just run:

```bash
git clone https://github.com/theyCallMeDudu/invest-control.git
cd invest-control
cp ic-backend/.env.example ic-backend/.env
docker-compose up --build
docker exec -it ic-backend php artisan migrate --seed
```