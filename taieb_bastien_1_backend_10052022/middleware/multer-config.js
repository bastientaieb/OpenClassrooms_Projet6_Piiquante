/* Package */
const multer = require("multer");
// Gestion des form-datas 

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
// Définition des extensions acceptées. 

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.replace(/\s/g, "_");
    let newName = name.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "-" + newName + "." + extension);
  },
});
// Méthode de gestion et de nomination des images enregistrées. 
// DiskStorage prend 2 arguments, le premier gère la destination de l'image et le second gère sa nomination. 

module.exports = multer({ storage }).single("image");
// Export du multer configuré pour la gestion des fichiers. 
