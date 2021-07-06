const express = require('express')
const router = express.Router()



const isAllowProductVerify = require('../middleware/authMiddleware').isAllowProductVerify
const isLoggedIn = require('../middleware/authMiddleware').isLoggedIn

const {test,addProducts,editProducts,productVerify,productViewAdmin} = require('../controllers/productUploadControllers')


router.use('/add',isLoggedIn)
router.use('/verify',isAllowProductVerify)



router.get('/',test)
router.post('/add',addProducts)
router.put('/update',editProducts)

router.route('/verify').get(productViewAdmin).post(productVerify)


module.exports = router