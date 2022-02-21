const db = require("../config/db-config");

/**
 * récuperation de tout les posts
 */
const getAllPost = (req, res, next) => {
  /**
   *  requête sql
   *  recupération du nom et du prenom de la personne qui a créer le post.
   *  recupération de la date de création.
   *  trier par rapport a la date
   */
  const sql =
    "SELECT posts.id, lastName, firstName, date, text FROM posts INNER JOIN users ON posts.user = users.id ORDER BY date DESC";
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
    user: userId,
  };

  //ajout a la base de donner
  db.query(sql, post, (err, results) => {
    console.log(results);
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json({ message: "post créer avec succes" });
    }
  });
};

/**
 * suppression d'un post
 */
const deletePost = (req, res, next) => {
  //requête sql pour selection le post a supprimer
  //utiliser count
  const sqlSelect = "SELECT * From posts WHERE `posts`.`post_num` = ?";

  const postDelete = {
    post_num: req.params.id,
  };
  //récuperation du post a supprimer
  db.query(sqlSelect, postDelete.post_num, (err, results) => {
    console.log(results);
    //si l'id du post est differant de celui du créateur
    if (results[0].post_id !== req.auth.userId) {
      return res.status(403).json({ message: "ceci n'est pas votre status" });
    } else {
      //requête sql pour supprimer le post
      const sqlDelete = "DELETE FROM posts WHERE `posts`.`post_num` = ?";

      //suppression du post
      db.query(sqlDelete, postDelete.post_num, (err, results) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res.status(200).json({ message: "status supprimer" });
        }
      });
    }
  });
};
/**
 * mise a jours d'un post
 */
const updatePost = (req, res, next) => {
  //requête sql pour selectionner le status a modifier
  const sqlSelect = "SELECT * From posts WHERE `posts`.`post_num` = ?";
  //requête sql pour modifier le status
  const sqlUpdate =
    "UPDATE `posts` SET `post_post` = ? WHERE `posts`.`post_num` = ?";

  const postUpdate = {
    post_num: req.params.id,
    post_post: req.body.post_post,
  };
  //recupération du status a modifier
  db.query(sqlSelect, postUpdate.post_num, (err, results) => {
    console.log(results);
    if (results[0].post_id !== req.auth.userId) {
      return res.status(403).json({ message: "ceci n'est pas votre status" });
    } else {
      //modification du status
      db.execute(
        sqlUpdate,
        [postUpdate.post_post, postUpdate.post_num],
        (err, results) => {
          console.log(results);
          if (err) {
            return res.status(400).json(err);
          } else {
            return res.status(200).json({ message: "status modifier" });
          }
        }
      );
    }
  });
};

const like = (req, res, next) => {};

module.exports = { getAllPost, createPost, deletePost, updatePost, like };
