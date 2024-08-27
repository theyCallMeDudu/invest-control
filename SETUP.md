# InvestControl Installation Guide

This guide describes the installation process for the Laravel `InvestControl` application. You can automate the setup using a `setup.sh` script (if you have Git Bash installed) or follow the manual instructions.

## Prerequisites

- **PHP** (version 7.3 or higher)
- **Composer** (to manage PHP dependencies)
- **MySQL** (or MariaDB)
------------------------------------------------------------------------------------------------------------------------------------

## 1. Automating the Installation with Git Bash

If you have Git Bash installed, follow these steps to automate the installation.

### 1.1. Navigate to the `ic-backend` Directory

```bash
cd ic-backend
```

### 1.2. Execute the `setup.sh` script
```bash
./setup.sh
```
------------------------------------------------------------------------------------------------------------------------------------

## 2. Manual installation

### 2.1. Create the database 
```sql
CREATE DATABASE nome_do_banco_de_dados;
```

### 2.2. Configure the `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=invest_control
DB_USERNAME=root
DB_PASSWORD=
```

### 2.3. Run the migrations
```bash
php artisan migrate
```

### 2.4 Execute the seeders
```bash
php artisan db:seed
```
