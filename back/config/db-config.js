const mysql = require("mysql2");

const dbConnect = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

dbConnect.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connexion a la BDD réussi");
  }
});

module.exports = dbConnect;
