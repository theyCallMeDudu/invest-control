#!/bin/bash

# Database config
DB_NAME="invest_control"
DB_USER="root"
DB_PASS=""
DB_HOST="127.0.0.1"

# Creating database
echo "Creating database $DB_NAME..."
mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Updating .env file
echo "Setting .env up..."
sed -i.bak "s/DB_DATABASE=.*/DB_DATABASE=$DB_NAME/" .env
sed -i.bak "s/DB_USERNAME=.*/DB_USERNAME=$DB_USER/" .env
sed -i.bak "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" .env

# Running migrations
echo "Running the migrations..."
php artisan migrate

# Executing seeders
echo "Executing the seeders..."
php artisan db:seed

echo "Setup finished!"
