import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME
});

module.exports = connection;
