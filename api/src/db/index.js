'use strict';
const sequelize = require('../db/connection')


sequelize.sync({ force: false }).then(function () {
    console.log("Database Configured");
});