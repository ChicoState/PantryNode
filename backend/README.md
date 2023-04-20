# PantryNode's Backend!

This is the ExpressJS backend for PantryNode.

## Development
### Prerequisites

Install all dependencies.

```shell
npm install
```

Set up your environment variables.

| Name        | Value      | Description                                              |
|-------------|------------|----------------------------------------------------------|
| DB_USER     | postgres   | The user to log into the database with.                  |
| DB_NAME     | pantrynode | The user to log into the database with.                  |
| DB_PASSWORD | somepass   | The password for the user to log into the database with. |
| DB_HOST     | localhost  | What host the database is running on.                    |
| DB_PORT     | postgres   | What port the database is running on.                    |

**Note:** The above values depend on how your database was configured. If you used different values during deployment of
your database, you'll need to use those here as well.

You can export these into your shell / terminal / bash session.
```shell
export DB_USER=postgres
export DB_NAME=pantrynode
export DB_PASSWORD=somepass
export DB_HOST=localhost
export DB_PORT=5432
```

That's all!

### Run

```shell
npm start
```

### Validate

Run the tests.

```shell
npm test
```

Run the linter.

```shell
npm run lint
```


