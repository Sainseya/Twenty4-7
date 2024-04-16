# # Utilisation de l'image officielle de PostgreSQL
# FROM postgres:latest

# # Définition des variables d'environnement pour définir l'utilisateur, le mot de passe et le nom de la base de données
# ENV POSTGRES_USER admin
# ENV POSTGRES_PASSWORD admin
# ENV POSTGRES_DB twenty4-seven-db

# # Optionnel : vous pouvez personnaliser la configuration de PostgreSQL en ajoutant des fichiers de configuration
# # COPY postgresql.conf /etc/postgresql/postgresql.conf

# EXPOSE 5432

# CMD ["postgres"]

# FROM node:21.7.3-alpine3.18

# WORKDIR /tweny4-seven

# COPY package*.json ./

# RUN yarn

# EXPOSE 3000

# CMD ["npm", "start"]


############################################################


# Use an official PHP base image
FROM php:latest

# Install PHP extensions and dependencies
RUN apt update \
    && apt install -y zlib1g-dev g++ git libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl opcache pdo pdo_mysql \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

WORKDIR /var/www/symfony_docker

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash
# RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony
# RUN git config --global user.email "you@example.com" \ 
#     && git config --global user.name "Your Name"

