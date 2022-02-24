const Router = require("express").Router();
const PostControllers = require("../Controllers/post");
const auth = require("../middleware/auth");

Router.get("/", auth, PostControllers.getAllPost);
Router.get("/like/:id", auth, PostControllers.allUserLikePost);
Router.get("/like/count/:id", auth, PostControllers.allLikePost);
Router.post("/like/:id", auth, PostControllers.like);
Router.post("/", auth, PostControllers.createPost);
Router.delete("/:id", auth, PostControllers.deletePost);

//TODO apres formation
//Router.put("/:id", auth, PostControllers.updatePost);

module.exports = Router;
