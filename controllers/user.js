require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
console.log(User);
exports.signup = (req, res, next) => {
let nom = req.body.nom;
let prénom = req.body.prénom;
let email = req.body.email;
let password = req.body.password;
if (email == null || nom == null || prénom == null || password || null){
  return res.status(400).json({'error': 'fichier manquants'});
}
  User.findOne({where: {email: email}})
  .then(function(user){
    console.log(user)
    if(!user){
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.create({
          email: req.body.email,
          password: hash,
          nom: req.body.nom,
          prénom: req.body.prénom,
          admin: 0,
        })
        .then(function(){
          return res.status(201).json({'Message': 'Compte créer'});
        })
        .catch(function(error){
          return res.status(500).json({'error': 'Utilisateur non trouvé'});
        });
      });
    }
    else{
      return res.status(409).json({ error: "Utilisateur existant" }); 
    }
  })

 .catch(function(err){
   return res.status(500).json({err});
 });
};

  // fonction login pour connecter les users existants
exports.login = (req, res, next) => {
  //Chercher l'utilisateur dans la base de données
  console.log(req.body.email);
    User.findOne({ where: { email: req.body.email } })
    
    .then(user => {
      //Utilisateur non trouvé 
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
       //Utilisateur trouvé
      //Comparaison du mot de passe envoyé par l'utilisateur qui essai de se connecter avec le hash qui est enregistré dans la base de données
      //bcrypt.compare(mot de passe envoyé dans la requête, hash enregistré dans le document user)
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          //Le mot de passe ne correspond pas 
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //Le mot de passe correspond
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
