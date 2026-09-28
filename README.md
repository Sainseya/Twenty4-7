<a name="readme-top"></a>

<div align="center">

# Twenty4/7

### The influencer e-commerce website

<a href="https://github.com/Sainseya">Sainseya</a>
·
<a href="https://github.com/Darkbuilder646">Darkbuilder646</a>
·
<a href="https://github.com/BenyahiaM">BenyahiaM</a>

</div>

<details>
<summary>Table of Contents</summary>

- [About The Project](#about-the-project)
  - [Built With](#built-with)
  - [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

</details>

## About The Project

Twenty4/7 is an influencer e-commerce platform offering a wide range of products associated with influencers, such as NFTs, bathwater, and online courses. Users can browse products without an account, but a free account is required for purchases. The platform provides a seamless, intuitive registration process for all users.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

**Frontend:**

[![React][React.js]][React-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Tailwind][Tailwind.css]][Tailwind-url]

**Backend:**

[![PHP][PHP]][PHP-url]
[![Symfony][Symfony]][Symfony-url]
[![Postgres][Postgres]][Postgres-url]
[![Stripe][Strip]][Strip-url]

**API:**

[![Axios][Axios]][Axios-url]

**Tests & CI:**

[![Jest][Jest]][Jest-url]
[![Testing-Library][Testing-Library]][Testing-Library-url]
[![GitHub Actions][GitHub Actions]][GitHub Actions-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- **Product Categories**: Browse different categories such as NFTs, bathwater, and online courses.
- **Exclusive NFT Collections**: Explore the latest MineBlock NFT collection, tradable for Solana.
- **Customizable Theme**: Switch between light and dark themes based on personal preference.
- **Enhanced User Experience**: Smooth button animations and loading indicators throughout.
- **Multi-Currency Support**: Purchase products using different currencies, such as Solana and USD.
- **Order Tracking**: Monitor order status and delivery progress through an intuitive timeline with status indicators.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To get Twenty4/7 running on your system, follow these steps.

### Prerequisites

- **Docker**: download from [docker.com](https://www.docker.com/get-started)
- **Docker Compose**: usually bundled with Docker
- **Yarn**: a package manager for Node.js. Install by following [these instructions](https://classic.yarnpkg.com/en/docs/install)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EpitechMscProPromo2026/T-WEB-600-LIL_13.git
   ```

2. **Backend setup:**

   ```sh
   docker-compose up -d --build
   docker exec -it php bash
   composer install
   php bin/console make:migration
   php bin/console doctrine:migrations:migrate
   ```

   Generate the JWT keys:

   ```sh
   mkdir -p config/jwt
   openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
   openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
   ```

   Start the server:

   ```sh
   symfony server:start
   ```

3. **Frontend setup:**

   ```sh
   cd app/twenty7-seven
   yarn install
   yarn start
   ```

4. **Access Twenty4/7:**

   Open your web browser and go to the development server URL to access the website.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1. **Create an Account**: before making purchases, create a free account by following the intuitive registration process.
2. **Browse Products**: visit the main page to explore different product categories and their descriptions.
3. **Explore NFTs**: navigate to the NFT page to discover the latest MineBlock collection, tradable for Solana.
4. **Add to Cart**: add desired products to the cart, where you can view quantity and pricing details.
5. **Checkout**: finalize the purchase by selecting the preferred payment method and currency.
6. **Track Orders**: monitor order status and delivery progress through the orders panel.

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
[Jest-url]: https://jestjs.io/
[Testing-Library]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[Testing-Library-url]: https://testing-library.com/
[GitHub Actions]: https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white
[GitHub Actions-url]: https://docs.github.com/en/actions
