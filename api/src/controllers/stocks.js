const async = require("async");
const Stocks = require('../models/Stocks')
const Message = rootRequire('config/messages')

var _self = {

  //api to get all stock data,optional params are passed
  get_stocks_All: async (req, res) => {

    async.waterfall(
      [

        async (nextCall) => {
          let stock_data = []
          if (req.query.type && req.query.user_id) {
            stock_data = await Stocks.findAll(
              {
                where: {
                  Type: req.query.type,
                  User_id: req.query.user_id
                }
              }
            )
          }
          else {
            stock_data = await Stocks.findAll()

          }



          if (stock_data.length > 0) {
            nextCall(null, stock_data

            );

          } else {
            return nextCall({
              message: Message.NOT_FOUND
            })
          }
        },

      ],
      (err, stock_data

      ) => {
        if (err) {
          res.status(400).send({
            message: "Error",
            error: err,
          });
        } else {
          res.status(200).send({
            message: "done",
            stock_data: stock_data
          })


        }
      }
    );
  },


  //api to get single  stock data info by id
  get_stocks_by_Id: async (req, res) => {

    async.waterfall(
      [

        async (nextCall) => {
          if (req.params.id) {
            let find_by_id = await Stocks.findOne({
              where: {
                id: req.params.id
              }
            })
            if (find_by_id) {
              nextCall(null, find_by_id)

            }
            else {
              return nextCall({
                message: Message.NOT_FOUND
              })
            }
          }
          else {
            return nextCall({
              message: Message.MISSING_PARAMS
            })
          }


        },

      ],
      (err, find_by_id

      ) => {
        if (err) {
          res.status(404).send({
            message: "Error",
            error: err,
          });
        } else {
          res.status(200).send({
            message: "done",
            stock_data: find_by_id
          })


        }
      }
    );
  },



  // POST API for trade creations
  create_trade_entry: async (req, res) => {

    async.waterfall(
      [

        async (nextCall) => {
          req.checkBody('id', Message.ID_MISSING).notEmpty()
          req.checkBody('Type', Message.TYPE_ERROR).notEmpty()
          req.checkBody('User_id', Message.USER_ID_MISSING).notEmpty()
          req.checkBody('symbol', Message.SYMBOL_MISSING).notEmpty()
          req.checkBody('Shares', Message.Shares_MISSING).notEmpty()
          req.checkBody('Price', Message.PRICE_MISSING).notEmpty()

          if (req.body.Shares < 1 || req.body.Shares > 100) {
            return nextCall({
              message: Message.Share_value_range
            })
          }
          if (req.body.Type != 'sell' && req.body.Type != 'buy') {
            return nextCall({
              message: Message.Type_Valid
            })
          }

          var error = req.validationErrors()
          if (error && error.length) {
            return nextCall({
              message: error[0].msg
            })
          } else {
            nextCall(null, req.body)
          }
        },
        async (body, nextCall) => {
          let find_if_existing_id = await Stocks.findOne({
            where: { id: body.id }
          })
          if (find_if_existing_id) {
            return nextCall({
              message: Message.ID_EXISTING
            })
          }
          else {
            let save_trade_data = await Stocks.create(body)
            if (save_trade_data) {
              nextCall(null, save_trade_data)
            }
            else {
              return nextCall({
                message: Message.ERROR_IN_SAVING
              })
            }
          }



        },

      ],
      (err, data

      ) => {
        if (err) {
          res.status(400).send({
            message: "Error",
            error: err,
          });
        } else {
          res.status(201).send({
            message: "done",
            saved_data: data
          })


        }
      }
    );
  },



  // DELETE API for trade based on id
  delete_trade_entry_by_id: async (req, res) => {

    async.waterfall(
      [

        async (nextCall) => {
          if (req.params.id) {
            let find_if_existing_id = await Stocks.findOne({
              where: { id: req.params.id }
            })
            if (find_if_existing_id) {
              let delete_trade_info_by_id = await Stocks.destroy({ where: { id: req.params.id } })
              if (delete_trade_info_by_id) {
                nextCall(null, delete_trade_info_by_id)
              }
              else {
                return nextCall({
                  message: Message.ERROR_IN_SAVING
                })
              }



            }
            else {
              return nextCall({
                message: Message.NOT_FOUND
              })
            }
          }
          else {
            return nextCall({
              message: Message.NOT_FOUND
            })
          }


        },

      ],
      (err, data

      ) => {
        if (err) {
          res.status(400).send({
            message: "Error",
            error: err,
          });
        } else {
          res.status(201).send({
            message: "done",
            deleted: data
          })


        }
      }
    );
  },




  // PUT API for trade by id
  put_trade_by_id: async (req, res) => {

    async.waterfall(
      [

        async (nextCall) => {
          req.checkBody('Type', Message.TYPE_ERROR).notEmpty()
          req.checkBody('User_id', Message.USER_ID_MISSING).notEmpty()
          req.checkBody('symbol', Message.SYMBOL_MISSING).notEmpty()
          req.checkBody('Shares', Message.Shares_MISSING).notEmpty()
          req.checkBody('Price', Message.PRICE_MISSING).notEmpty()

          if (req.body.Shares < 1 || req.body.Shares > 100) {
            return nextCall({
              message: Message.Share_value_range
            })
          }
          if (req.body.Type != 'sell' && req.body.Type != 'buy') {
            return nextCall({
              message: Message.Type_Valid
            })
          }
          if (!req.params.id) {
            return nextCall({
              message: Message.ID_MISSING
            })
          }

          var error = req.validationErrors()
          if (error && error.length) {
            return nextCall({
              message: error[0].msg
            })
          } else {
            nextCall(null, req.body)
          }
        },
        async (body, nextCall) => {
          let find_if_existing_id = await Stocks.findOne({
            where: { id: req.params.id }
          })
          if (find_if_existing_id) {

            let save_trade_data = await Stocks.update(body, { where: { id: req.params.id } }).catch((err) => {
              console.log(err)
              return 0
            });
            if (save_trade_data) {
              nextCall(null, save_trade_data)
            }
            else {
              return nextCall({
                message: Message.ERROR_IN_SAVING
              })
            }
          }
          else {
            return nextCall({
              message: Message.ID_NOT_EXISTING
            })

          }



        },

      ],
      (err, data

      ) => {
        if (err) {
          res.status(400).send({
            message: "Error",
            error: err,
          });
        } else {
          res.status(201).send({
            message: "done",
            saved_data: data
          })


        }
      }
    );
  },



  // PATCH API for trade by id
  patch_trade_by_id: async (req, res) => {

    async.waterfall(
      [

        async (nextCall) => {

          if(req.body.Shares) {
            if (req.body.Shares < 1 || req.body.Shares > 100) {
              return nextCall({
                message: Message.Share_value_range
              })
            }
          }

          if(req.body.Type) {
            if (req.body.Type != 'sell' && req.body.Type != 'buy') {
              return nextCall({
                message: Message.Type_Valid
              })
            }
          }

          if (!req.params.id) {
            return nextCall({
              message: Message.ID_MISSING
            })
          }

          var error = req.validationErrors()
          if (error && error.length) {
            return nextCall({
              message: error[0].msg
            })
          } else {
            nextCall(null, req.body)
          }
        },
        async (body, nextCall) => {
          let find_if_existing_id = await Stocks.findOne({
            where: { id: req.params.id }
          })
          if (find_if_existing_id) {

            let save_trade_data = await Stocks.update(body, { where: { id: req.params.id } }).catch((err) => {
              console.log(err)
              return 0
            });
            if (save_trade_data) {
              nextCall(null, save_trade_data)
            }
            else {
              return nextCall({
                message: Message.ERROR_IN_SAVING
              })
            }
          }
          else {
            return nextCall({
              message: Message.ID_NOT_EXISTING
            })

          }



        },

      ],
      (err, data

      ) => {
        if (err) {
          res.status(400).send({
            message: "Error",
            error: err,
          });
        } else {
          res.status(201).send({
            message: "done",
            saved_data: data
          })


        }
      }
    );
  },



}


module.exports = _self;
