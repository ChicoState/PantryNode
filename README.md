# PantryNode

[![NPM](https://img.shields.io/npm/v/npm/latest)](https://img.shields.io/npm/v/npm/latest)
[![NodeJS](https://img.shields.io/github/languages/top/badges/shields.svg)](https://img.shields.io/github/languages/top/badges/shields.svg)

## Description

In this project, we have implemented food pantry management using a NodeJS-based web framework. This project allows the organizations to keep track of the food items available and utilized by community members. It ensures the control of pantry services for the staff and administration. The application also helps to keep track of donations from various sources and effectively visualize the records.

## Code of Conduct

- Code of conduct for this project is given in [Code of Conduct](Code_of_Conduct.md).

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](LICENSE)**

## Continous Integration with GitHub Actions

[![Build Node](https://github.com/ChicoState/PantryNode/actions/workflows/actions.yml/badge.svg)](https://github.com/ChicoState/PantryNode/actions/workflows/actions.yml)

## Technology Stack

> Back-End

- Express JS (New, Legacy)
- PostgreSQL (New)
- TypeScript (New)
- MongoDB (Legacy)
- JavaScript (Legacy)

> Front-End

- React (New)
- Material UI (New)
- EJS (Legacy)
- BootStrap (Legacy)
- jQuery (Legacy)

## Installation steps

- All the `code` required to get started

### 1. Clone

- Clone this repo to your local machine using `git clone https://github.com/ChicoState/PantryNode`

```shell
cd PantryNode
```

### 2. Install Dependencies

> Create a .env file with the contents .env.example

```shell
cp .env.example .env
```

### 3. Docker setup

> Docker containerization

```shell
docker-compose up
```

> Browser for React

`http://localhost:3000/`

> Browser for Legacy Backend

`http://localhost:3001/`

### 4. DB Backend Console

> Open `http://localhost:82` in a web broswer
> Login using the credentials defined in the `docker-compose.yml` file
> Add a new server to the management console using `database` as the host name/address field and the POSTGRES_PASSWORD value as the password field
> Note that the default username for postgres is `postgres`

## Features

> Dashboard System

- This project implements a dashboard system for various operations, like checkout students, stock management, and donation tracking.

> Stock Management

- This functionality allows to add the stock and maintain the record for various type of donations by category i.e., Anonymous, Organization, and Pantry Purchased.

- Additionally, Allowing to manage the purchase and expiry of the stock.

> Sales Report

- The sales report allows the admin or the pantry organization to visualize the stock, expiry, and waste management. It also helps to keep the count of various parameters such as students count, expired item count, available item count, and utilized item count.

## Static Code Analysis Tool

### ESLint

> Run ESLint Locally in `backend/` or `frotend/`

```shell
npm run lint
```

## Contributing

See the [Contributing](contributing.md) guide to contribute to the project!
