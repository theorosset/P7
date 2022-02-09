const mysql = require("mysql");

const dbConnect = mysql.createConnection({
 process.env.DB_CONNECT
});
