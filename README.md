<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

# Auction App

The Auction App is a web application designed to facilitate online auctions. It provides a platform where users can list items for auction and participate in bidding. The application offers features for buyers, sellers, and administrators, each with their own set of functionalities:

- **Buyers**: Users interested in purchasing items can browse through the list of items currently being auctioned, place bids on items they want, and track their bids. Once the auction ends, the highest bidder can proceed with payment to complete the transaction.

- **Sellers**: Individuals or businesses can list their items for auction, set starting bids, and monitor the bidding process. Sellers have the ability to manage their listed items, including updating item details and closing auctions.

- **Administrators**: Admins oversee the entire auction platform, managing user accounts, approving seller listings, and ensuring the smooth operation of auctions. They have the authority to control user access and intervene when necessary.

Key features of the Auction App include:

- User authentication and authorization: Users can sign up, sign in, and securely authenticate their identity. Access to certain features is restricted based on user roles.

- Real-time bidding: The bidding process is dynamic, with bids being updated in real-time as users place their bids. This creates an engaging and competitive auction environment.

- Image uploads: Sellers can upload images of their items to provide visual representations, attracting potential buyers.

- Cloudinary integration: The app utilizes Cloudinary for handling image uploads and storage, ensuring efficient management of multimedia content.

- Role-based access control: Different user roles (buyer, seller, administrator) have distinct permissions and access levels, ensuring that each user group can only perform authorized actions.

- RESTful API: The backend of the application follows RESTful principles, providing a structured and standardized interface for communication between the client and server.

The Auction App is built using the Nest.js framework for the backend, with Prisma as the ORM (Object-Relational Mapping) tool for database management. The frontend is developed using a modern JavaScript framework such as React or Angular, providing a responsive and user-friendly interface.

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoint

| Method | Endpoint                    | Access    | Authorized to            | Description                                       |
| ------ | --------------------------- | --------- | ------------------------ | ------------------------------------------------- |
| GET    | /auth                       | Public    | All Users                | Get cookies                                       |
| POST   | /auth/signup                | Public    | All Users                | Sign up a new user                                |
| POST   | /auth/signin                | Public    | All Users                | Sign in an existing user                          |
| DELETE | /auth/logout                | Protected | Logged in Users          | Log out the current user                          |
| POST   | /auth/refresh-token         | Protected | Users with Refresh Token | Refresh access token                              |
| GET    | /protected/users            | Protected | Administrator            | Get all users with optional query params          |
| GET    | /protected/users/email      | Protected | All Users                | Get user by email                                 |
| GET    | /protected/users/:id        | Protected | All Users                | Get user by ID                                    |
| PATCH  | /protected/users/:id        | Protected | All Users                | Update user by ID with optional image             |
| DELETE | /protected/users/:id        | Protected | Administrator            | Delete user by ID                                 |
| GET    | /protected/items            | Protected | All Users                | Get all items with optional query params          |
| GET    | /protected/items/:id        | Protected | All Users                | Get item by ID                                    |
| GET    | /protected/items/seller/:id | Protected | All Users                | Get items by seller ID with optional query params |
| POST   | /protected/items            | Protected | Seller                   | Create a new item                                 |
| PATCH  | /protected/items/:id        | Protected | Administrator, Seller    | Update item by ID with optional image             |
| DELETE | /protected/items/:id        | Protected | Administrator, Seller    | Delete item by ID                                 |

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Zidan Indratama](https://zidanindratama.vercel.app/)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
