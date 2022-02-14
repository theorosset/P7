const db = require("../config/db-config");

/**
 * récuperation de tout les posts
 */
const getAllPost = (req, res, next) => {
  const sql = "SELECT * FROM posts";
  db.execute(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: " aucun post est  présent" });
    } else {
      return res.status(200).json(result);
    }
  });
};

/**
 * création d'un post
 */
const createPost = (req, res, next) => {
  const userId = req.auth.userId;

  // requête sql
  const sql = "INSERT INTO posts SET ?";
  // information a ajouter dans la BDD
  const post = {
    ...req.body,
    post_id: userId,
  };
  //ajout a la base de donner
  db.query(sql, post, (err, results) => {
    console.log(results);
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json({ message: "post créer avec succses" });
    }
  });
};

module.exports = { getAllPost, createPost };
