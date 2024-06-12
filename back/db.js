const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);
