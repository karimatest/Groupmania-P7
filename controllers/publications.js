const Publications = require('../models/Publications')

// fs veut dire file-system, c'est ce qui nous permet de
// modifier et supprimer un fichier
const fs = require('fs');

//Créer une publications
exports.createPublications = (req, res) => {
    let publicationImage;
    // Si l'utilisateur publie une image
    if(req.file) {
        publicationImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };
    // Création de l'objet publication
    const newPublication = {
        titre: req.body.titre,
        content: req.body.content,
        //imageUrl: publicationImage,
        userId: req.body.userId
    };
    // Création de la publications
    Publications.create(newPublication)
        .then(publication => res.status(201).json(publication))
        .catch(error => res.status(500).json({ error }));
};
  
  // Modifie une publications
exports.modifyPublications = (req, res, next) => {
    const publicationsObject = req.file ?
      {
        ...JSON.parse(req.body.Publications),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Publications.updateOne({ _id: req.params.id }, { ...publicationsObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Publications modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
//Afficher une publication
    exports.getOnePublication = (req, res, next) => {
        Publications.findOne({
          _id: req.params.id
        }).then(
          (publication) => {
            res.status(200).json(publication);
          }
        ).catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
      };

