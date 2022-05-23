/* Packages */
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
// Gestion des tokens de session.

/* Import BDD User */
const { User } = require("../models/user");

async function createUser(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "Utilisateur enregistré!" });
  } catch (error) {
    res.status(409).send({ message: "Utilisateur non enregistré:" + error });
  }
}
// Fonction de création des utilisateurs.

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
// Fonction de cryptage du mot de passe.

async function logUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    const passwordVerification = await bcrypt.compare(password, user.password);
    if (!passwordVerification) {
      res.status(403).send({ message: "Mot de passe incorrect" });
    }
    const tokenUser = createToken(email);
    res.status(200).send({ userId: user._id, token: tokenUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erreur du serveur" });
  }
}
// Fonction de connexion des utilisateurs.

function createToken(email) {
  const jwtPassword = process.env.JWT_PASSWORD;
  return jsonwebtoken.sign({ email }, jwtPassword, {
    expiresIn: "24h",
  });
}
// Fonction de création de token.

module.exports = { createUser, logUser };
// Export des fonctions
