require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
console.log(User);

// fonction signup pour s'inscrir les nouveaux utilisateurs
exports.signup = (req, res) => {
  console.log(req.body);
//salage du mot de passe
 bcrypt.hash(req.body.password, 10)
    .then(hash => {
        // Création de l'objet utilisateur
        const newUser = {
           nom: req.body.nom,
            prénom: req.body.prénom,
            email: req.body.email,
            password: hash,
            admin: 0
 }         
    console.log(newUser);
    
        // Création de l'utilisateur
        User.create(newUser)
            .then(() => res.status(200).json({ message: 'Utilisateur créé' }))
            .catch((error) =>{
              console.log(error)
             return res.status(400).json({ message: 'Utilisateur déjà existant' });
            });
    })
    .catch(error => res.status(500).json({ error }));


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
        .catch(error =>{console.log(error)
          return res.status(500).json({ error });
        });
    })
    .catch(error =>{console.log(error) 
       return res.status(500).json({ error });
    });
};

//exports.modifyUser = (req, res, next) => {
 // const user = new User({
   //   nom: req.body.nom,
    //  prénom: req.body.prénom,
    //  email: req.body.email,
    //  userId: req.body.userId
//});
 // console.log(user);
  //User.updateOne({ id: req.params.id }, user)
 // .then(
     // () => {
        //  res.status(201).json({
             // message: 'User updated successfully!'
        //  });
     // }
  //).catch(
     // (error) => {
       //   res.status(400).json({
         //     error: error
         // });
     // }
 // );
//};


exports.deleteUser = (req, res, next) => {
  User.deleteOne({ id: req.params.id })
  .then(
    () => {
      res.status(200).json({
        message: 'Utilisateur supprimé!'
      });
    }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
      );
    };

    //je récupère les infos de mon user 
    exports.getOneUser = (req, res, next) => {
      User.findOne({
          id: req.params.id
      }).then(
          (user) => {
              res.status(200).json(user);
              console.log(user);
          }
      ).catch(
          (error) => {
              res.status(404).json({
                  error: error
              });
          }
      );
    };