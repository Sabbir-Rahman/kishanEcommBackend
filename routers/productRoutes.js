const express = require('express')
const router = express.Router()



const isAllowProductVerify = require('../middleware/authMiddleware').isAllowProductVerify
const isLoggedIn = require('../middleware/authMiddleware').isLoggedIn

const {test,viewAllProducts,addProducts,editProducts,productVerify,productViewAdmin} = require('../controllers/productControllers')


router.use('/add',isLoggedIn)
router.use('/verify',isAllowProductVerify)



router.get('/',test)
router.post('/add',addProducts)
router.post('/view',viewAllProducts)
router.route('/verify').get().post()


module.exports = router