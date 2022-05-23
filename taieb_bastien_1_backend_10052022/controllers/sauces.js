const Sauces = require("../models/sauces");
// Import du model de constructor Sauces de la BDD

// Import package fs (Suppression de fichier) & process (Méthode send)
const fs = require("fs");
const { send } = require("process");

function displaySauces(req, res) {
  Sauces.find()
    .then((sauces) => {
      res.status(201).send(sauces);
    })
    .catch((err) => {
      res.status(500).send({ message: "Erreur d'affichage", err });
    });
}
// Fonction qui affiche les sauces.

function createSauces(req, res) {
  const sauce = JSON.parse(req.body.sauce);
  const { name, manufacturer, description, mainPepper, heat, userId } = sauce;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const product = new Sauces({
    userId,
    name,
    manufacturer,
    description,
    mainPepper,
    imageUrl,
    heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  product
    .save()
    .then(() =>
      res.status(201).send({ message: "Nouvelle sauce sauvegardée :", product })
    )
    .catch((error) => res.status(400).send({ error }));
}
// Fonction qui créé les sauces.

function displayOneSauce(req, res) {
  Sauces.findOne({
    _id: req.params.id,
  })
    .then((sauce) => res.status(200).send(sauce))
    .catch((error) =>
      res.status(404).send({
        error: error,
      })
    );
}
// Fonction qui affiche la sauce sélectionnée.

function deleteSauce(req, res) {
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).send({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).send({ error }));
      });
    })
    .catch((error) => res.status(500).send({ error }));
}
// Fonction de suppression d'une sauce.
// Suppression de l'image avec FileSystem & suppression sur le site web avec deleteOne.

function modifySauce(req, res) {
  const id = req.params.id;
  let sauce;
  if (req.file != null) {
    sauce = JSON.parse(req.body.sauce);
    const newImageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    sauce.imageUrl = newImageUrl;
  } else {
    sauce = req.body;
  }
  Sauces.findByIdAndUpdate(id, sauce)
    .then((response) => {
      if (response != null) {
        const lastImage = response.imageUrl.split("/").at(-1);
        fs.unlink("images/" + lastImage, (err) => {
          if (err) console.log(err);
          console.log("Ancienne image de sauce supprimée");
        });
        res.status(200).send({ message: "Sauce modifiée !" });
      } else {
        res
          .status(400)
          .send({ message: "Sauce introuvable dans la base de donnée" });
      }
    })
    .catch((error) => res.status(400).send({ error }));
}
// Fonction de modification d'une sauce.
// On défini "sauce" dans une variable vide puis on lui donne une valeur dans deux cas de figure, si la requête contient une image ou non.
// Avec une image, on défini la nouvelle sauce avec une nouvelle imageUrl et le nouveau contenu.
// Sans image, la sauce garde l'image et change juste de body.
// Dans la 1ère promesse de findByIdAndUpdate, on utilise la réponse pour trouver, supprimer l'ancienne image du serveur et envoyer le message de confirmation.
// Puis on retrouve les cas d'erreur.

function displayVotes(req, res) {
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

  if (like === 1) {
    Sauces.updateOne(
      {
        _id: sauceId,
      },
      {
        $push: {
          usersLiked: userId,
        },
        $inc: {
          likes: +1,
        },
      }
    )
      .then(() =>
        res.status(200).send({
          message: "Like pris en compte !",
        })
      )
      .catch((error) =>
        res.status(400).send({
          error,
        })
      );
  }
  if (like === -1) {
    Sauces.updateOne(
      {
        _id: sauceId,
      },
      {
        $push: {
          usersDisliked: userId,
        },
        $inc: {
          dislikes: +1,
        },
      }
    )
      .then(() => {
        res.status(200).send({
          message: "Dislike pris en compte",
        });
      })
      .catch((error) =>
        res.status(400).send({
          error,
        })
      );
  }
  if (like === 0) {
    Sauces.findOne({
      _id: sauceId,
    })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          Sauces.updateOne(
            {
              _id: sauceId,
            },
            {
              $pull: {
                usersLiked: userId,
              },
              $inc: {
                likes: -1,
              },
            }
          )
            .then(() =>
              res.status(200).send({
                message: "Like retiré !",
              })
            )
            .catch((error) =>
              res.status(400).send({
                error,
              })
            );
        }
        if (sauce.usersDisliked.includes(userId)) {
          Sauces.updateOne(
            {
              _id: sauceId,
            },
            {
              $pull: {
                usersDisliked: userId,
              },
              $inc: {
                dislikes: -1,
              },
            }
          )
            .then(() =>
              res.status(200).send({
                message: "Dislike retiré !",
              })
            )
            .catch((error) =>
              res.status(400).send({
                error,
              })
            );
        }
      })
      .catch((error) =>
        res.status(404).send({
          error,
        })
      );
  }
}
// Fonction de gestion des likes / dislikes.
// Deux premiers "if" -> Attribution d'un like/dislike d'un utilisateur. A chaque vote, on utilise updateOne avec l'argument qui permet de sélectionner la bonne sauce. Puis on push dans l'array users(Dis)Liked l'Id utilisateur et on incrémente de un le type de vote correspondant.

// Pour if === 0, on doit gérer les retraits des votes avec une remise à 0 des array vis à vis de l'utilisateur qui retire son like.
// On récupère la sauce en question avec findOne qu'on obtient dans la promesse sous le nom "sauce", que l'on passe ensuite aux deux cas de figure.
// Cas de figure 1 => userId présent dans l'array quand on il clique sur le bouton like. On retire userId des usersLiked et on décrémente de 1.
// Cas de figure 2 => même chose pour l'array usersDisliked.

module.exports = {
  createSauces,
  displaySauces,
  displayOneSauce,
  deleteSauce,
  modifySauce,
  displayVotes,
};
// Export des controllers.
