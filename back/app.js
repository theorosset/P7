const express = require("express");
const userRoute = require("./Routes/User");
const postRoute = require("./Routes/Post");
const commentRoute = require("./Routes/Comment");
const app = express();
app.use(express.json());

/**
 * connexion a la BDD Mysql
 */
const db = require("./config/db-config");

app.use((req, res, next) => {
  req.db = db;
  next();
});

//recupération des requête qui ont un content-type json

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
app.use("/api/groupomania/post", postRoute);
app.use("/api/groupomania/comment", commentRoute);

module.exports = app;
