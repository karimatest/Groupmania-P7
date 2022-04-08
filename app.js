const express = require('express');

const app = express();
const path = require('path');
const helmet = require('helmet');
//Importation du 'router' pour le parcours des utilisateurs
const userRoute = require('./routes/user');
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 //Création d'un middleware qui sert le dossier image
 app.use('/images', express.static(path.join(__dirname, 'images')));
 app.use(helmet());
 
 app.use('/api/auth', userRoute);
module.exports = app;