const express = require("express");
const userRoute = require("./Routes/User");

const app = express();

/**
 * connexion a la BDD Mysql
 */
const db = require("./config/db-config");

app.use((req, res, next) => {
  req.db = db;
  next();
});

//recupération des requête qui ont un content-type json
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", userRoute);

module.exports = app;
