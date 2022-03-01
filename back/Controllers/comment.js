const db = require("../config/db-config");

const getCommentOfOnePost = (req, res, next) => {
  const postId = req.params.id;

  const sql = `SELECT c.id, p.id AS postId, u.lastName, u.firstName, c.text, c.post_id FROM comments AS c INNER JOIN users AS u ON c.user = u.id LEFT JOIN posts AS p ON p.id = c.post_id WHERE c.post_id = ${postId} ORDER BY c.date DESC`;
  db.execute(sql, (err, result) => {
    if (err) {
      return res
        .status(200)
        .json({ message: "aucun commentaire n'est présent" });
    } else {
      return res.status(200).json(result);
    }
  });
};

const createComment = (req, res, next) => {
  const userId = req.auth.userId;
  // requête sql
  const sql = "INSERT INTO comments SET ?";
  // information a ajouter dans la BDD
  const comment = {
    ...req.body,
    user: userId,
  };

  //ajout a la base de donner
  db.query(sql, comment, (err, results) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json({ message: "commentaire créer avec succes" });
    }
  });
};

const deleteComment = (req, res, next) => {
  //requête sql pour selection du commentaire a supprimer
  //utiliser count
  const sqlSelect = "SELECT * From comments WHERE `comments`.`id` = ?";

  const commentDelete = {
    id: req.params.id,
  };
  //récuperation du commentaire a supprimer
  db.query(sqlSelect, commentDelete.id, (err, results) => {
    console.log(results);

    //si l'id du commentaire est differant de celui du créateur
    if (results[0].user !== req.auth.userId) {
      return res
        .status(403)
        .json({ message: "ceci n'est pas votre commentaire" });
    } else {
      //requête sql pour supprimer le commentaire
      const sqlDelete = "DELETE FROM comments WHERE `comments`.`id` = ?";

      //suppression du commentaire
      db.query(sqlDelete, commentDelete.id, (err, results) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res.status(200).json({ message: "commentaire supprimer" });
        }
      });
    }
  });
};

module.exports = {
  createComment,
  deleteComment,
  getCommentOfOnePost,
};
