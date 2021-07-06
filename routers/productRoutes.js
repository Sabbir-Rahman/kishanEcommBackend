const express = require('express')
const router = express.Router()



const isAllowProductVerify = require('../middleware/authMiddleware').isAllowProductVerify
const isLoggedIn = require('../middleware/authMiddleware').isLoggedIn

const {test,addProducts,editProducts,productVerify,productViewAdmin} = require('../controllers/productUploadControllers')

const {testView, viewAllProduct} = require('../controllers/productViewControllers')

router.use('/add',isLoggedIn)
router.use('/verify',isAllowProductVerify)



router.get('/',testView)
router.post('/add',addProducts)
router.put('/update',editProducts)
router.route('/verify').get(productViewAdmin).post(productVerify)

router.get('/view',viewAllProduct)

module.exports = router