const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../config/db-config");

/**
 * connexion
 */
const login = (req, res, next) => {
  const { user_email, user_password: passNotHash } = req.body;
  try {
    const sqlUser = "SELECT * FROM users WHERE user_email = ?";

    //verification de l'email
    db.query(sqlUser, user_email, async (err, results) => {
      //si l'email n'est pas présent dans la BDD
      if (results[0] === undefined) {
        return res.status(401).json({ message: "email incorrect" });
      }
      //sinon on vérifie le MDP
      else {
        //vérification du mdp
        console.log(results);
        const auth = await bcrypt.compare(
          passNotHash,
          results[0].user_password
        );
        if (!auth) {
          return res.status(401).json({ message: "mdp incorrect" });
        } else {
          return res.status(200).json({
            userId: results[0].user_id,
            token: jwt.sign(
              { userId: results[0].user_id },
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
  const { user_name, user_firstname, user_email, user_password } = req.body;
  try {
    //chiffrement du mot de pass bcrypt
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(user_password, salt);

    //recuperation de l'utilisateur créer
    const user = {
      ...req.body,
      user_password: passHash,
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

module.exports = {
  login,
  signup,
};
