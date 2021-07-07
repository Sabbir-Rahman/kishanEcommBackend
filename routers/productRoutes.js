const express = require('express')
const router = express.Router()



const isAllowProductVerify = require('../middleware/authMiddleware').isAllowProductVerify
const isLoggedIn = require('../middleware/authMiddleware').isLoggedIn

const {test,addProducts,editProducts,productVerify,productViewAdmin} = require('../controllers/productUploadEditControllers')

const {testView, viewAllProduct} = require('../controllers/productViewControllers')

const {orderProduct,viewBuyProductRequest,acceptOrder,viewOrderRequest}  = require('../controllers/productOrderController')

const {bookingMoneyPayment, bookingPaymentInfo,sslCommerze,sslCommerzeSuccess,sslCommerzeFail,sslCommerzeCancel,sslCommerzeIpn} = require('../controllers/productPaymentControllers')

//(base/product) url
router.use('/add',isLoggedIn)
router.use('/verify',isAllowProductVerify)
router.use('/order',isLoggedIn)
router.use('/update',isLoggedIn)
router.use('/ssl-commerze/payment',isLoggedIn)
router.use('/payment',isLoggedIn)


router.get('/',testView)
router.post('/add',addProducts)
router.post('/',addProducts)
router.put('/update',editProducts)
router.route('/verify').get(productViewAdmin).post(productVerify)

router.get('/view',viewAllProduct)

router.post('/order',orderProduct)
router.route('/order/buyRequest').get(viewBuyProductRequest).post(acceptOrder)
router.get('/order/orderRequest',viewOrderRequest)
router.post('/order/accept',acceptOrder)

router.route('/payment/booking').get(bookingPaymentInfo).post(bookingMoneyPayment)

router.get('/ssl-commerze/payment',sslCommerze)
router.post('/ssl-commerze/success',sslCommerzeSuccess)
router.post('/ssl-commerze/fail',sslCommerzeFail)
router.post('/ssl-commerze/cancel',sslCommerzeCancel)
router.post('/ssl-commerze/ipn',sslCommerzeIpn)

module.exports = router