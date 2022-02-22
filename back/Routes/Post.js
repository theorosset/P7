const Router = require("express").Router();
const PostControllers = require("../Controllers/post");
const auth = require("../middleware/auth");

Router.get("/", PostControllers.getAllPost);
Router.post("/", auth, PostControllers.createPost);
Router.delete("/:id", auth, PostControllers.deletePost);
//TODO apres formation
//Router.put("/:id", auth, PostControllers.updatePost);

Router.post("/like/:id", auth, PostControllers.like);

module.exports = Router;
