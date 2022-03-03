const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../config/db-config");

/**
 * connexion
 */
const login = (req, res, next) => {
  const { password: passNotHash } = req.body;
  try {
    const sqlUser = "SELECT * FROM users WHERE email = ?";

    //verification de l'email
    db.query(sqlUser, req.body.email, async (err, results) => {
      //si l'email n'est pas présent dans la BDD
      if (results.length == 0) {
        return res
          .status(401)
          .json({ message: "email ou mot de passe incorrect" });
      }
      //sinon on vérifie le MDP
      else {
        //vérification du mdp
        console.log(results);
        const auth = await bcrypt.compare(passNotHash, results[0].password);
        if (!auth) {
          return res
            .status(401)
            .json({ message: "email ou mot de passe incorrect" });
        } else {
          return res.status(200).json({
            userId: results[0].id,
            token: jwt.sign(
              { userId: results[0].id },
              process.env.SECRET_TOKEN,
              { expiresIn: "24h" }
            ),
          });
        }
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

/**
 * inscription
 */
const signup = async (req, res, next) => {
  // constante de destructuration
  const { lastName, firstName, email, password } = req.body;
  try {
    //chiffrement du mot de pass bcrypt
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    //recuperation de l'utilisateur créer
    const user = {
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: passHash,
    };

    //requête sql pour inserer les valeurs dans la table
    const sql = "INSERT INTO users SET ?";
    //enregistrement dans la BDD
    db.query(sql, user, (err) => {
      if (err) {
        return res.status(401).json(err);
      } else {
        return res.status(201).json({ message: "utilisateur créer" });
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 * end point juste pour vérifier si la personne contien un token valide dans le localstorage
 *
 */
const verif = (req, res, next) => {
  res.status(204).json({ message: "tu peut rester" });
};

/**
 * récuperation du profil utilisateur
 */

const profil = (req, res, next) => {
  const userId = req.auth.userId;
  const sqlSelect = `SELECT u.firstName, u.lastName, u.email FROM users AS u WHERE u.id = ${userId}`;

  db.query(sqlSelect, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(results);
    }
  });
};

/**
 * Suppression du compte
 */
const deleteAccount = (req, res, next) => {
  const userId = req.auth.userId;

  const sqlSelect = `SELECT u.firstName, u.lastName, u.email, u.password, p.id, p.text, p.user, p.date 
                     FROM users AS u  
                     INNER JOIN posts AS p 
                     ON u.id = p.user
                     WHERE u.id = ${userId}`;

  db.query(sqlSelect, (err, results) => {
    if (results[0].user !== userId) {
      return res.status(403).json({ message: " Vous ne pouvez pas faire sa" });
    } else {
      const sqlDelete = `DELETE FROM users WHERE users.id = ${userId} `;

      db.query(sqlDelete, (err, results) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          const sqlDeletePost = `DELETE FROM posts WHERE posts.user = ${userId}`;

          db.query(sqlDeletePost, (err, results) => {
            if (err) {
              return res.status(400).json(err);
            } else {
              return res.status(200).json("supprimez");
            }
          });
        }
      });
    }
  });
};

module.exports = {
  login,
  signup,
  verif,
  profil,
  deleteAccount,
};
