const { createPool } = require('mysql');

const pool = createPool({
    host:
        process.env.NODE_ENV == "DEV"
            ? process.env.DB_DEV_HOST
            : process.env.DB_PROD_HOST,
    user:
        process.env.NODE_ENV == "DEV"
            ? process.env.DB_DEV_USER
            : process.env.DB_PROD_USER,
    password:
        process.env.NODE_ENV == "DEV"
            ? process.env.DB_DEV_PASS
            : process.env.DB_PROD_PASS,
    database:
        process.env.NODE_ENV == "DEV"
            ? process.env.DB_DEV_DATABASE
            : process.env.DB_PROD_DATABASE,
    port:
        process.env.NODE_ENV == "DEV"
            ? process.env.DB_DEV_PORT
            : process.env.DB_PROD_PORT,
})

module.exports = pool; 