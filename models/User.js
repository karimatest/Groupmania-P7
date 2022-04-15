const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/groupomania');

module.exports = sequelize.define("user", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prénom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }

}, {
  sequelize, 
  tableName: 'user',
  timestamps: false
 
});