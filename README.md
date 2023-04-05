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

- MongoDB
- Express JS
- JavaScript

> Front-End

- EJS
- CSS
- BootStrap
- jQuery

## Installation

- All the `code` required to get started

### Clone

- Clone this repo to your local machine using `git clone https://github.com/ChicoState/PantryNode`

```shell
$ cd PantryNode
```

> Create a .env file with the following contents

#DB CONFIG  
DB_USER='postgres'  
DB_HOST='database'  
DB_NAME='pantrynode'  
DB_PASSWORD=Update Password  

DB_PORT=5432  

#DB ADMIN  
PGADMIN_EMAIL='admin@admin.com'  
PGADMIN_PASSWORD=Update Password  

### Docker setup

> Docker containerization 

```shell
$ docker-compose up
```

> Browser

```shell
 http://localhost:3000/
```

### DB Backend Console

> Open http://localhost:82 in a web broswer

> login using the credentials define in the docker-compose file

> add a new server to the management console using db_sandbox as the host name/address field and the POSTGRES_PASSWORD value

> Note that the default username for postgres is postgres

### Updating Codebase

> Currently no live mounts are used for the docker comtainer because of this you must rebuild the container to sync code changes

```shell
 docker compose build
```

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

> Install ESLint dependencies

```shell
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-react-app eslint@^8.0.0 typescript
```

> Run ESLint Locally

```shell
npx eslint .
```

## Contributing

See the [Contributing](contributing.md) guide to contribute to the project!
