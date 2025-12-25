FROM php:8.2-apache

# Carpeta de trabajo
WORKDIR /var/www/html

# Instalar dependencias del sistema si fueran necesarias
# RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev && docker-php-ext-install gd

# Copiar archivos del proyecto
COPY . /var/www/html/

# Ajustar permisos para que PHP pueda escribir en data/ y messages.txt
RUN chown -R www-data:www-data /var/www/html/data \
    && touch /var/www/html/api/messages.txt \
    && chown www-data:www-data /var/www/html/api/messages.txt

# Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# Exponer el puerto 80
EXPOSE 80
