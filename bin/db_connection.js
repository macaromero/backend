const mysql = require("mysql");
const util = require("util");

let pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

pool.query = util.promisify(pool.query);

module.exports = pool;


