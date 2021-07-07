const express = require('express')
const router = express.Router()



const isAllowProductVerify = require('../middleware/authMiddleware').isAllowProductVerify
const isLoggedIn = require('../middleware/authMiddleware').isLoggedIn

const {test,addProducts,editProducts,productVerify,productViewAdmin} = require('../controllers/productUploadEditControllers')

const {testView, viewAllProduct} = require('../controllers/productViewControllers')

const {orderProduct,viewBuyProductRequest,acceptOrder,viewOrderRequest}  = require('../controllers/productOrderController')



router.use('/add',isLoggedIn)
router.use('/verify',isAllowProductVerify)
router.use('/order',isLoggedIn)
router.use('/update',isLoggedIn)


router.get('/',testView)
router.post('/add',addProducts)
router.post('/',addProducts)
router.put('/update',editProducts)
router.route('/verify').get(productViewAdmin).post(productVerify)

router.get('/view',viewAllProduct)

router.post('/order',orderProduct)
router.route('/order/buyRequest').get(viewBuyProductRequest).post(acceptOrder)
router.post('/order/accept',acceptOrder)
module.exports = router