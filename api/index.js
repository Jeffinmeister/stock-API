/**
 * Initilize all api verions according to application release
 **/
 module.exports = function (app, apiBase) {
    require('./src')(app, `${apiBase}`)
  }