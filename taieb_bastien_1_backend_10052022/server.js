/* Importation des packages */
const http = require("http");
require("dotenv").config();
// Rend les données chiffrées disponibles globalement.
const express = require("express");
const app = express();
const cors = require("cors");

/* Middleware */
app.use(cors());
// Package qui autorise tous les types de requêtes.
app.use(express.json());
const server = http.createServer(app);

module.exports = { app, express, server };
