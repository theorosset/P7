const Router = require("express").Router();
const UserControllers = require("../Controllers/user");
const auth = require("../middleware/auth");

Router.post("/signup", UserControllers.signup);
Router.post("/login", UserControllers.login);
Router.get("/verif", auth, UserControllers.verif);
module.exports = Router;
