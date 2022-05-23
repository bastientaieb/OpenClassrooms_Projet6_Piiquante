/* Import d'express et création du router */
const express = require("express");
const saucesRoutes = express.Router();

/* Import des middlewares */
const { verifyUser } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

/* Import des controllers */
const {
  createSauces,
  displaySauces,
  displayOneSauce,
  deleteSauce,
  modifySauce,
  displayVotes,
} = require("../controllers/sauces");

/* Routers */
saucesRoutes.post("/", verifyUser, multer, createSauces);
// Route de création des sauces.
saucesRoutes.put("/:id", verifyUser, multer, modifySauce);
// Route de modification des sauces.
saucesRoutes.post("/:id/like", verifyUser, displayVotes);
// Route des likes et des dislikes. 
saucesRoutes.delete("/:id", verifyUser, deleteSauce);
// Route de suppression des sauces.
saucesRoutes.get("/:id", verifyUser, displayOneSauce);
//Route d'affichage d'une seule sauce.
saucesRoutes.get("/", verifyUser, displaySauces);
// Route de vérification des utilisateurs, de token & affichage de contenu.

module.exports = { saucesRoutes };
