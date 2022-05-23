/* Import des packages */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// Permet l'unicité des emails dans la BDD. 

/* Variables */
const passwordAdmin = process.env.PASSWORD_ADMIN;
const userNameAdmin = process.env.USERNAME_ADMIN;
const uri = `mongodb+srv://${userNameAdmin}:${passwordAdmin}@cluster0.fhy6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// URI de connexion à la BDD avec UserName et MDP caché dans un document .env. 

/* Configuration Mongoose */
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MangoDB réussi"))
  .catch((error) => console.error("Type d'erreur : ", error));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Définition du Schéma type des utilisateurs. 

userSchema.plugin(uniqueValidator);
// Plugin pour s'assurer qu'une seule adresse e-mail puisse avoir un compte. 

const User = mongoose.model("User", userSchema);
// Définition du modèle pour exportation. 

module.exports = { mongoose, User };