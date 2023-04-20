# PantryNode

[![NPM](https://img.shields.io/npm/v/npm/latest)](https://img.shields.io/npm/v/npm/latest)
[![NodeJS](https://img.shields.io/github/languages/top/badges/shields.svg)](https://img.shields.io/github/languages/top/badges/shields.svg)

[![Build Node](https://github.com/ChicoState/PantryNode/actions/workflows/actions.yml/badge.svg)](https://github.com/ChicoState/PantryNode/actions/workflows/actions.yml)

## Description

In this project, we have implemented food pantry management using a NodeJS-based web framework. This project allows the
organizations to keep track of the food items available and utilized by community members. It ensures the control of
pantry services for the staff and administration. The application also helps to keep track of donations from various
sources and effectively visualize the records.

## Important Things

### Code of Conduct

- Code of conduct for this project is given in [Code of Conduct](Code_of_Conduct.md).

### License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](LICENSE)**

### Contributing

See the [Contributing](contributing.md) guide if you want to find out who has contributed and how you can too!

### Technology Stack

#### Database

- PostgreSQL

#### Back-End

More Info: [Back-End README](backend/README.md)

- Express JS
- TypeScript
- PostgreSQL
- Sequelize

#### Front-End

- Material UI
- CSS
- React
- Axios

More Info: [Front-End README](frontend/README.md)


### Features

#### Dashboard System

This project implements a dashboard system for various operations, like checkout students, stock management, and
donation tracking.

#### Stock Management

This functionality allows to add the stock and maintain the record for various type of donations by category i.e.,
Anonymous, Organization, and Pantry Purchased.

Additionally, Allowing to manage the purchase and expiry of the stock.

#### Sales Report

The sales report allows the admin or the pantry organization to visualize the stock, expiry, and waste management. It
also helps to keep the count of various parameters such as students count, expired item count, available item count, and
utilized item count.

## Development

This project is currently build with 3 major components. A database, a backend, and a frontend. All are able to run
inside of containers. You can find instructions to run each locally, outside of containers, in their respective READMEs.
In this section we'll use docker-compose to get the full application running.

### First Run

=======

#### Front-End

More Info: [Front-End README](frontend/README.md)

- React
- Material UI

### Features

#### Dashboard System

This project implements a dashboard system for various operations, like checkout students, stock management, and
donation tracking.

#### Stock Management

This functionality allows to add the stock and maintain the record for various type of donations by category i.e.,
Anonymous, Organization, and Pantry Purchased.

Additionally, Allowing to manage the purchase and expiry of the stock.

#### Sales Report

The sales report allows the admin or the pantry organization to visualize the stock, expiry, and waste management. It
also helps to keep the count of various parameters such as students count, expired item count, available item count, and
utilized item count.

## Development

This project is currently build with 3 major components. A database, a backend, and a frontend. All are able to run
inside of containers. You can find instructions to run each locally, outside of containers, in their respective READMEs.
In this section we'll use docker-compose to get the full application running.

### First Run

Clone this repo to your local machine.

```shell
git clone https://github.com/ChicoState/PantryNode
```

Set up your environment variables.

```shell
cp .env.example .env
```

### Start

Build and start all the docker containers.

```shell
docker-compose up
```

### Interact

You can view the frontend at: http://localhost:3000

#### Database Administration Console

You can access the database administration console at: http://localhost:82

You'll need to use the PGADMIN credentials from your `.env` file.

To connect to the running database, you'll need to add a new server to the management console by:

* Click `Add New Server`.
* Enter a name like `local-pantry`.
* Navigate to the Connection tab.
* Provide the host name.
    * Since we started both the database and this admin tool through the docker-compose file, use `database` for the
      host.
* Make sure the **Port** matches the **DB_PORT** you set in the .env file.
* Make sure the **Username** matches the **DB_USER** you set in the .env file.
* Make sure the **Password** matches the **DB_PASSWORD** you set in the .env file.
* Click Save

##### Test it out!

1. Expand your database connection (`local-pantry` from above).
2. Expand *Databases*.
3. Expand your database name (`pantrynode` normally).

You can locate the tables under *Schemas* > *public* > *Tables*.

You can open up a query view using the icon on the top left with the Database and Play Button, then try out this query
below.

```sql
SELECT * FROM person;
```

This will show you the emails and hashed passwords for all the registered users in this database.
