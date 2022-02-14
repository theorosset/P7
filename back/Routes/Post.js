const Router = require("express").Router();
const PostControllers = require("../Controllers/post");
const auth = require("../middleware/auth");

Router.get("/", PostControllers.getAllPost);
Router.post("/", auth, PostControllers.createPost);
Router.delete("/:id", auth, PostControllers.deletePost);
Router.put("/:id", auth, PostControllers.updatePost);
module.exports = Router;
