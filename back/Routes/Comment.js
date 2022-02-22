const Router = require("express").Router();
const CommentControllers = require("../Controllers/comment");
const auth = require("../middleware/auth");

Router.get("/", CommentControllers.getAllComment);
Router.post("/", auth, CommentControllers.createComment);
Router.delete("/:id", auth, CommentControllers.deleteComment);

module.exports = Router;
