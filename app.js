const express =require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const initAPISVersions = require('./api')
var path = require('path');
const session = require('express-session');

//express app init
const app = express()

global.rootRequire = function (name) {
  return require(`${__dirname}/${name}`)
}
global.rootPath = __dirname

app.use(express.static(path.join(__dirname, './public')));

// //Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))


// parse application/json
app.use(bodyParser.json())


app.use(cookieParser())




//express validator
app.use(expressValidator({
  customValidators: {
    gte: function (param, num) {
      return param >= num
    }
  }
}))


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next()
})


// initilize API versions
initAPISVersions(app, '')


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    // res.status(err.status || 500)
    res.status(err.status || 500).send({
      message: err.message,
      error: {}
    })
  })
}

// production error handler - no stacktraces leaked to user
app.use(function (err, req, res) {
  // res.status(err.status || 500)
  res.status(err.status || 500).send({
    message: err.message,
    error: {}
  })
})


module.exports = app
