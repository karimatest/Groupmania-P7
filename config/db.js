require('dotenv').config();
const mysql = require('mysql2');

// Connexion bdd
const db = mysql.createConnection({
  host: 'localhost',
  user : 'root',
  password : '',
  database : 'groupomania'
});


db.connect(function(err) {
      if (err) throw err;
      db.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });

module.exports = db;