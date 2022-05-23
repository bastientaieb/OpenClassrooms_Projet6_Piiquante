/* Import d'express et de l'app */
const { app, express, server } = require("./server");
const { saucesRoutes } = require("./routes/sauces");
const { userRoutes } = require("./routes/user");
const path = require("path");

const port = process.env.PORT || "3000";
// Définition du port utilisé.

require("./models/user");
// Import de la BDD configurée

app.use(express.json());
// Permet de rendre exploitable le body des requêtes.

/* Routes */
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));
// Rend accessible le dossier images lors de la création des sauces.

server.listen(port);
// lance le port 3000
