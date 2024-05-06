FROM php:latest

WORKDIR /var/www

RUN apt-get update \
    &&  apt-get install -y --no-install-recommends \
        locales apt-utils git libicu-dev g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev unzip libpq-dev nodejs npm wget \
        apt-transport-https lsb-release ca-certificates
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen  \
    &&  echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen \
    &&  locale-gen

RUN curl -sS https://getcomposer.org/installer | php -- \
    &&  mv composer.phar /usr/local/bin/composer

RUN curl -sS https://get.symfony.com/cli/installer | bash\
    &&  mv /root/.symfony5/bin/symfony /usr/local/bin

RUN docker-php-ext-configure \
            intl \
    &&  docker-php-ext-install \
            pdo pdo_mysql pdo_pgsql opcache intl zip calendar dom mbstring gd xsl

RUN pecl install apcu && docker-php-ext-enable apcu

RUN npm install --global yarn

RUN COMPOSER_ALLOW_SUPERUSER=1

RUN composer require symfony/orm-pack \
    && composer require doctrine/common \
    # && composer require symfony/routing \
    # && composer require maker --dev \
    && composer require symfony/maker-bundle


CMD ["php", "bin/console", "make:migration", "&&", "php", "bin/console", "doctrine:migrations:migrate", "&&", "php", "bin/console", "doctrine:schema:update", "--force"]
# Définition des variables d'environnement
ARG GIT_USER_NAME
ARG GIT_USER_EMAIL

# Configuration de git avec les variables d'environnement
RUN git config --global user.name "$GIT_USER_NAME" \
    && git config --global user.email "$GIT_USER_EMAIL"

CMD ["composer install"]



CMD tail -f /dev/null
