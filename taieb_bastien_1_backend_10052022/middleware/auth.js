const jsonwebtoken = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const header = req.header("Authorization");
  if (header == null)
    return res.status(401).send({ message: "Requête non autorisée" });

  const token = header.split(" ")[1];
  if (token == null) return res.status(403).send({ message: "Tokan manquant" });

  jsonwebtoken.verify(token, process.env.JWT_PASSWORD, (err) => {
    if (err)
      return res.status(403).send({ message: "Requête non autorisée" + err });
    next();
  });
}
// Fonction de vérification du token de session.
// 1 -> Vérifie que le header n'est pas null.
// 2 -> Vérifie que le token n'est pas null.
// 3 -> Vérifie l'authenticité du token.

module.exports = { verifyUser };
