const { Sequelize } = require('sequelize');
const config = require('../../../config/index')
const logger = rootRequire('./utils/logger')


let sequelize = new Sequelize(config.database.config.database, config.database.config.user, config.database.config.password, {
  host: config.database.config.host,
  port:config.database.config.db_port,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
       require: true,
       rejectUnauthorized: false
     },
    supportBigNumbers: true,
    multipleStatements: true,
    logging: true,
  },
 // logging: true,
  pool: {
    max: 20,
    min: 0,
    acquire: 800000,
    idle: 10000
  }
});

sequelize.authenticate().then(function (err) {
  console.log('DB Connection has been established successfully');
}).catch((err) => {
  console.log('There is connection in ERROR', err);
  
});

module.exports = sequelize