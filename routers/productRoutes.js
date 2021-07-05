const express = require('express')
const router = express.Router()



const isAllowProductVerify = require('../middleware/authMiddleware').isAllowProductVerify
const isLoggedIn = require('../middleware/authMiddleware').isLoggedIn

const {test,viewAllProducts,addProducts,editProducts,productVerify,productViewAdmin} = require('../controllers/productControllers')


router.use('/add',isLoggedIn)
router.use('/verify',isAllowProductVerify)



router.get('/',test)
router.post('/add',addProducts)
router.put('/update',editProducts)
router.get('/view',viewAllProducts)
router.route('/verify').get(productViewAdmin).post(productVerify)


module.exports = router