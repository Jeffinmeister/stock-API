const express = require('express')

const router = express.Router()
const Stocks_ctl = require('../controllers/stocks')


//HOME PAGE ROUTER
router.get('/', (req, res) => {
    res.send('hi from base page')
})


router.get('/trades/',Stocks_ctl.get_stocks_All)

router.post('/trades',Stocks_ctl.create_trade_entry)

router.get('/trades/:id',Stocks_ctl.get_stocks_by_Id)

router.delete('/trades/:id',Stocks_ctl.delete_trade_entry_by_id)

router.put('/trades/:id',Stocks_ctl.put_trade_by_id)

 router.patch('/trades/:id',Stocks_ctl.patch_trade_by_id)


// exports router
module.exports = router