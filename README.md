<a name="readme-top"></a>

<!-- PROJECT INTRO -->
<div align="center">

  <h1 align="center">Twenty4/7</h1>

  <p align="center">
    <h3>The influencer E-commerce website</h3>
    An Epitech project by
    <br />
    <a href="https://github.com/Darkbuilder646">Darkbuilder646</a>
    ·
    <a href="https://github.com/Sainseya">Sainseya</a>
    .
    <a href="https://github.com/BenyahiaM">BenyahiaM</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#utilisation">Utilisation</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
Twenty4/7 is an influencer e-commerce platform offering a wide range of products associated with influencers such as NFTs, bathwater, and online courses. Users can browse products without an account, but a free account is required for purchases. The platform provides a seamless and intuitive registration process for all users.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The project was created using the following main languages and frameworks :

<strong>For the Front : </strong>

[![React][React.js]][React-url]
[![TypeScript][TypeScript]][TypeScript-url] 
[![Tailwind][Tailwind.css]][Tailwind-url]

<strong>For the Back : </strong>

[![PHP][PHP]][PHP-url]
[![Symfony][Symfony]][Symfony-url]
[![Postgres][Postgres]][Postgres-url]
[![Strip][Strip]][Strip-url]

<strong>API : </strong>

[![Axios][Axios]][Axios-url]

<strong>Tests & CI : </strong>

[![Jest][Jest]][Jest-url]
[![Testing-Library][Testing-Library]][Testing-Library-url]
[![GitHub Actions][GitHub Actions]][GitHub Actions-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
### Features

* <strong>Product Categories</strong> : Browse through different categories such as NFTs, bathwater, and online courses.

* <strong>Exclusive NFT Collections</strong> : Explore the latest MineBlock NFT collection, tradable for Solana.

* <strong>Customizable Theme</strong> : Switch between light and dark themes based on personal preference.

* <strong>Enhanced User Experience</strong> : Enjoy smooth button animations and loading indicators for improved visual experience.

* <strong>Multi-Currency Support</strong> : Purchase products using different currencies, such as Solana and USD.

* <strong>Order Tracking</strong> : Monitor order status and delivery progress through an intuitive timeline and status indicators.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Installation -->
## Getting Started

To get Twenty4/7 running on your system, follow these steps :

### Prerequisites

Before getting started, ensure you have the following installed :

* <strong>Docker</strong> : Download and install Docker from  https://www.docker.com/get-started.
* <strong>Docker Compose</strong> : Ensure you have Docker Compose installed, which is usually bundled with Docker.
* <strong>Yarn</strong> : Yarn is a package manager for Node.js. You can install by following https://classic.yarnpkg.com/en/docs/install

### Installation

1. <strong>Clone the Repository :</strong> 

    ```bash
    git clone https://github.com/EpitechMscProPromo2026/T-WEB-600-LIL_13.git
    ```

<br/>

2. <strong>Backend Setup :</strong> 

    Create all the Docker container :
    ```sh
    docker-compose up -d --build
    ```

    Enter the PHP container :
    ```sh
    docker exec -it php bash
    ```

    Install all the dependencies for the backend in the container :
    ```sh
    composer install
    ```

    Create a migration for the database :
    ```sh
    php bin/console make:migration
    ```
    ```sh
    php bin/console doctrine:migrations:migrate
    ```

    Generate JWT keys:
    ```sh
    mkdir -p config/jwt
    ```
    ```sh
    openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
    ```
    ```sh
    openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
    ```

    Start the server with Symfony :
    ```sh
    symfony server:start
    ```
<br/>

3. <strong>Frontend Setup :</strong> 

    From the root, navigate to the "app/twenty7-seven" directory :
    ```sh
    cd app/twenty7-seven
    ```

    Install dependencies with yarn :
    ```sh
    yarn install
    ```

    Start the development server :
    ```sh
    yarn start
    ```
<br/>

4. <strong>Access Twenty4/7 :</strong>

    Open your web browser and go to the development server URL to access the Twenty4/7 website

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Utilisation

1. <strong>Create an Account</strong> : Before making purchases, create a free account by following the intuitive registration process.

2. <strong>Browse Products</strong> : Visit the main page to explore different product categories and their descriptions.

3. <strong>Explore NFTs</strong> : Navigate to the NFT page to discover the latest MineBlock collection, tradable for Solana.

4. <strong>Add to Cart</strong> : Add desired products to the cart, where you can view quantity and pricing details.

5. <strong>Checkout</strong> : Finalize the purchase process by selecting the preferred payment method and currency.

6. <strong>Track Orders</strong> : Monitor order status and delivery progress through the orders panel, featuring a timeline and status indicators.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[PHP]: https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white
[PHP-url]: https://www.php.net/manual/en/intro-whatis.php

[Symfony]: https://img.shields.io/badge/symfony-%23000000.svg?style=for-the-badge&logo=symfony&logoColor=white
[Symfony-url]: https://symfony.com/

[Strip]: https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white
[Strip-url]: https://stripe.com

[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/

[Axios]: https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/

[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/fr/

[Testing-Library]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[Testing-Library-url]: https://testing-library.com/

[GitHub Actions]: https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white
[GitHub Actions-url]: https://docs.github.com/en/actions