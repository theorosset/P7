const Router = require("express").Router();
const PostControllers = require("../Controllers/post");
const auth = require("../middleware/auth");

Router.get("/", PostControllers.getAllPost);
Router.post("/", auth, PostControllers.createPost);
module.exports = Router;
