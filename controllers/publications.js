const Publications = require('../models/Publications')

// fs veut dire file-system, c'est ce qui nous permet de
// modifier et supprimer un fichier
const fs = require('fs');

//Créer une sauce
exports.createPublications = (req, res, next) => {
    if(!req.body.Publications){
   return res.status(400).json({message:"parametre manquant"})
    }
    
    const Publications = new Publications({
      // on récupère toutes les infos du body grâce à cette fonction ...spread
      ...publicationsObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    publicationsObject.save() //sauvegarder dans la base de donnée
      .then(() => res.status(201).json({ message: 'Publications enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };
  