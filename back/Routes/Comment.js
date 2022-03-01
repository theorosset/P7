const Router = require("express").Router();
const CommentControllers = require("../Controllers/comment");
const auth = require("../middleware/auth");

Router.get("/:id", auth, CommentControllers.getCommentOfOnePost);
Router.post("/", auth, CommentControllers.createComment);
Router.delete("/:id", auth, CommentControllers.deleteComment);

module.exports = Router;
