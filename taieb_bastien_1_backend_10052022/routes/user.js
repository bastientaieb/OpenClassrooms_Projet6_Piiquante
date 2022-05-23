/* Import des controllers */
const { createUser, logUser } = require("../controllers/users");

/* Import d'express & création du router */
const express = require("express");
const userRoutes = express.Router();


userRoutes.post("/signup", createUser);
// Route de création des utilisateurs.
userRoutes.post("/login", logUser);
// Route de connexion d'un utilisateur déjà créé en appellant la fonction logUser.

module.exports = { userRoutes };
// Exportation des routes.
