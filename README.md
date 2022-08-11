# OpenClassrooms_Projet6_Piiquante

Contexte : L'entreprise Piiquante cherche à créer une API et son backend pour son site d'avis culinaire en ligne.
Toute la partie front-end existe déjà.

L'application permet de publier une sauce avec sa description, son fabricant, ses ingrédients, sa photo et une note de 1 à 10 qui mesure son piquant. (Echelle de Scoville)

L'application comporte la page de création d'utilisateur, de connexion, d'accueil & la page produit d'une sauce. 

L'application permet de : 
- De créer des utilisateurs,
- Se connecter à son compte,
- D'afficher toutes les sauces sauvegardées sur la page d'accueil,
- Créer ses propres sauces,
- Modifier et supprimer ses sauces,
- Ajouter des likes et des dislikes aux sauces disponibles en page d'accueil,
- Stocker tous les nouveaux utilisateurs et toutes les nouvelles sauces dans la base de données de MongoDB. 

L'application est sécurisée et respecte les normes du RGPD et de l'OWASP. 

J'ai pu travailler sur : 
- Création d'un backend structuré (Router avec controllers, middleware, modèles de base de données & fichier principal avec Express,
- Utilisation de Node et plusieurs packages (Express, Dotenv, Cors, Jsonwebtoken, Path, FileSystem, Mongoose-unique-validator, Mongoose & bcrypt),
- Création et configuration d'une base de données MongoDB,
- Gestion du hashage de mot de passe,
- Création et configuration d'un token de session pour les utilisateurs,
- Gestion des images sur le serveur via Multer. (Configuration du diskstorage et de la nomination),
- Gestion des routes des requêtes (Vérifier que les actions des utilisateurs se cantonnent bien à leurs champs d'action possibles, ex : Un user qui modifie une sauce qui n'est pas à lui),
- Gestion des conditions pour les likes et les dislikes avec plusieurs de cas de figure,
- Tester toutes les fonctionnalités de l'application,
- Présenter tous ses choix techniques. 
