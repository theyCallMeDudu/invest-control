FROM php:7.4-cli

# Basic installation
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    inotify-tools \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer install
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Dev environment set up
WORKDIR /var/www

# Copy the files
COPY . /var/www

# Install Laravel dependencies
RUN composer install

# Define permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose port
EXPOSE 8000

# Start up command
CMD php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=8000
