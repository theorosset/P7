const Router = require("express").Router();
const CommentControllers = require("../Controllers/comment");
const auth = require("../middleware/auth");

//Router.get("/", auth, CommentControllers.getAllComment);
Router.get("/:id", auth, CommentControllers.getCommentOfOnePost);
Router.get("/like/:id", auth, CommentControllers.allLikeComment);
Router.post("/", auth, CommentControllers.createComment);
Router.delete("/:id", auth, CommentControllers.deleteComment);
Router.post("/like/:id", auth, CommentControllers.likeComment);

module.exports = Router;
