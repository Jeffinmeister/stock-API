const { Sequelize, DataTypes } = require('sequelize');
const { models } = require('../db/connection');
const sequelize = require('../db/connection');
const config = rootRequire('config')

const Stocks = sequelize.define('stocks', {
   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type:{
        type: DataTypes.TEXT
    },
    User_id:{
        type: DataTypes.INTEGER
    },
    symbol:{
        type: DataTypes.TEXT
    },
    Shares:{
        type:DataTypes.NUMBER
    },
    Price:{
        type:DataTypes.NUMBER
    },


   // Timestamps
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,

});


module.exports = Stocks