const dotenv =require('dotenv')
dotenv.config()

module.exports = {
  'PROJECT_NAME': 'xCode',
  'PORT': process.env.PORT || 3000,
  'appHost': process.env.APP_HOST,
  'apiHost': process.env.APP_HOST + "/" + process.env.API_VERSION,

  'database': {
    'config': {
      'dialect': process.env.DB_ADAPTER,
      'connectionLimit': 10, // Max. connection limit
      'host': process.env.DB_HOST, // DB Hostname
      'user': process.env.DB_USER, // DB username
      'password': process.env.DB_PASSWORD, // DB Password
      'database': process.env.DB_NAME,  // DB name
      'db_port': process.env.DB_PORT   // Custom db port 
      
    }
  },
  

}