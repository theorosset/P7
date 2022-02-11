const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../config/db-config");

/**
 * connexion
 */
const login = (req, res, next) => {};

/**
 * inscription
 */
const signup = async (req, res, next) => {
  try {
    // constante de destructuration
    const { user_name, user_firstname, user_email, user_password } = req.body;

    //chiffrement du mot de pass bcrypt
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(user_password, salt);

    //recuperation de l'utilisateur créer
    const user = [
      {
        ...req.body,
        user_password: passHash,
      },
    ];
    //requête sql pour inserer les valeurs dans la table
    const sql =
      "INSERT INTO users VALUES ( user_id, user_name, user_firstname, user_email, user_password)";
    //enregistrement dans la BDD
    db.execute(sql, user, (err) => {
      if (err) {
        return res.status(400).json(console.log(err));
      } else {
        return res.status(201).json({ message: "utilisateur créer" });
      }
    });
  } catch (err) {
    res.status(400).json(console.log(err));
  }
};

module.exports = {
  login,
  signup,
};
