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

# Installs Xdebug 3.1.6 (last compatible with PHP 7.4)
RUN pecl install xdebug-3.1.6 && docker-php-ext-enable xdebug

# Xdebug settings
RUN echo "xdebug.mode=develop,debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.log=/var/log/xdebug.log" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.log_level=7" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

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
CMD php artisan migrate --force \
    && [[ $(php artisan tinker --execute="echo DB::table('users')->count() + DB::table('operation_type')->count() + DB::table('investment_type')->count() + DB::table('currency_type')->count() + DB::table('investment')->count();") -eq 0 ]] \
    && php artisan db:seed --force || echo 'Seed already executed.' \
    && php artisan serve --host=0.0.0.0 --port=8000

