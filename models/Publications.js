const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("publications", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true,
    autoIncrement :true
  },
  title :{
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
},
 {
  sequelize, 
  modelName: 'puplications' 
 
});
