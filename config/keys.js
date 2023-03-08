let user = process.env.DB_USER ;
let pass = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let name = process.env.DB_NAME;
let port = process.env.DB_PORT;

module.exports = {
    PostgresURI: `postgres://${user}:${pass}@${host}:${port}/${name}`
}
