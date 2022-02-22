const db = require("../config/db-config");

const getAllComment = (req, res, next) => {
  const sql =
    "SELECT comments.id, lastName, firstName, comments.date, comments.text FROM comments INNER JOIN users ON comments.user = users.id ORDER BY date DESC";
  db.execute(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
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
    console.log(results);
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json({ message: "commentaire créer avec succes" });
    }
  });
};

const deleteComment = (req, res, next) => {
  //requête sql pour selection le post a supprimer
  //utiliser count
  const sqlSelect = "SELECT * From comments WHERE `comments`.`id` = ?";

  const commentDelete = {
    id: req.params.id,
  };
  //récuperation du post a supprimer
  db.query(sqlSelect, commentDelete.id, (err, results) => {
    console.log(results);

    //si l'id du post est differant de celui du créateur
    if (results[0].user !== req.auth.userId) {
      return res
        .status(403)
        .json({ message: "ceci n'est pas votre commentaire" });
    } else {
      //requête sql pour supprimer le post
      const sqlDelete = "DELETE FROM comments WHERE `comments`.`id` = ?";

      //suppression du post
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

module.exports = { getAllComment, createComment, deleteComment };
