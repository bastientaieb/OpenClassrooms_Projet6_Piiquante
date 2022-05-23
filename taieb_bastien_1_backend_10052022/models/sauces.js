/* Import package */
const mongoose = require("mongoose");

const sauceSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String },
  manufacturer: { type: String },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { type: String },
  heat: { type: Number, min: 1, max: 10 },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [String],
  usersDisliked: [String],
});
// Définition du Schéma type des nouvelles sauces.

const Sauces = mongoose.model("Sauces", sauceSchema);
// Définition du modèle pour exportation.

module.exports = Sauces;
