const mysql = require('mysql2');
require('dotenv').config();

// Connexion bdd

const db = mysql.createConnection({
  host: 'localhost',
  user : 'root',
  password : '',
  database : Groupomania
});

db.connect( err => {
  if (err) {
    throw err;
  }
  console.log('Connexion à MySQL réussie !');
});

module.exports = db;