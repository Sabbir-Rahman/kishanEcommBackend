const User =  require('../model/userModel')
const userRole = require('../model/userRole')
const product = require('../model/productModel')
const productSchema = require('../model/productModel')
const productOrderRequest = require('../model/productOrderRequestModel')
const productOrderRequestSchema = require('../model/productOrderRequestModel')
const productBuyRequest = require('../model/productBuyRequestModel')
const productBuyRequestSchema = require('../model/productBuyRequestModel')
var mongoose = require('mongoose');

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()


//buyer can rate the product
const ratingProduct = async(req,res) => {
    const { orderRequestId,rating } = req.body

    if (rating> 5){
        return res.status(400).json({ 'message': 'Please rate in 0 to 5 scale'})
    }

    const requestOrder = await productOrderRequestSchema.findOne({_id:orderRequestId})

    
    //it means already rate the product
    if ( requestOrder.rating> 0){
        return res.status(400).json({ 'message': 'You already rate it for this order you cannot do it again'})
    } 

    
    const product = await productSchema.findOne({_id:requestOrder.product_id})

    const oldRating = product.rating
    const rating_count = product.ratingCount
    const newRating = ((rating_count*oldRating) + rating )/(rating_count + 1)

    const productUpdate = await productSchema.findOneAndUpdate(
        {
            _id: requestOrder.product_id
        },
        {
            rating: newRating,
            ratingCount: rating_count + 1
        },
        {
            new: true
        }
    )

    const requestOrderUpdate = await productOrderRequestSchema.findOneAndUpdate(
        {
            _id: orderRequestId,
            status: "complete"
        },
        {
            rating: rating
        },
        {
            new: true
        }
    )




    
    buyerNotificationMessage = `Your rating:${rating} for product id:${requestOrder.product_id} is recorded. Thanks for the rating`

    

    const newNotificationBuyer = {
        "user_id": req.user.id,
        "message": buyerNotificationMessage,
        "type": "product_order_request",
        "timestamp": new Date()
    }

    const notificationBuyer = await new notificationSchema(newNotificationBuyer).save()

    return res.status(200).json({ 'message': 'Product rating done succesfully','product':productUpdate,'requestOrder': requestOrderUpdate,'buyerNotificationMessage':notificationBuyer})

}

module.exports = { ratingProduct }