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




const orderProduct = async(req,res) => {

    const { productId,quantity} = req.body

    const product =  await productSchema.findOne({ "_id":productId });
    
    const existingProductRequest = await productBuyRequest.find({
        "product_id": productId,
        "buyer_id": req.user.id,
        "status":"pending"
    })

    //bypass logic for admin
    if(existingProductRequest && req.user.email != 'testadmin@kishan.com'){
        return res.status(400).json({'message':"You have a pending order for the same product"})
    }

    const user = await User.findOne({ "_id":req.user.id })

    //default booking percentage
    var bookingPercentage = 10

    if(!product){
        return res.status(400).json({'message':"Product not find"})
    }

    if(!quantity){
        return res.status(400).json({'message':"You must add quantity"})
    }

    if(quantity< product.minOrder){
        return res.status(400).json({'message':"Please order atleast the minimum amount"})
    }

    if(quantity> product.available){
        return res.status(400).json({'message':"Please order less than available amount"})
    }

    if(product.bookingPercentage){
        bookingPercentage = product.bookingPercentage
    }


    const buyRequest = {
        "product_id": productId,
        "productName": product.name,
        "buyer_id": req.user.id,
        "seller_id": product.seller_id,
        "buyerName": req.user?.fullname,
        "buyerAddress": user?.address,
        "buyerPhone": user?.phone_no,
        "buyerEmail": req.user.email,
        "buyingQuantityUnit": product.unitName,
        "buyingQuantity": quantity,
        "buyingMoney": product.unitPrize * quantity,
        "bookingMoney": (product.unitPrize * quantity)* (bookingPercentage/100),
        "status" : "pending",

        
    }

    const orderRequest = {
        "product_id": productId,
        "productName": product.name,
        "buyer_id": req.user.id,
        "seller_id": product.seller_id,
        "buyingQuantityUnit": product.unitName,
        "buyingQuantity": quantity,
        "buyingMoney": product.unitPrize * quantity,
        "bookingMoney": (product.unitPrize * quantity)* (bookingPercentage/100),
        "status" : "pending",
    }

    sellerNotificationMessage = `Your product id:${productId} name:${product.name} has order for quantity:${quantity} ${product.unitName}. Only accept if you agree to this order and you have product availabilty otherwise reject it and update your productinfo`

    buyerNotificationMessage = `Your order for product id:${productId} is placed please wait for seller acceptance`

    const newNotificationSeller = {
        "user_id": product.seller_id,
        "message": sellerNotificationMessage,
        "type": "product_buying_request",
        "timestamp": new Date()
    }

    const newNotificationBuyer = {
        "user_id": req.user.id,
        "message": buyerNotificationMessage,
        "type": "product_order_request",
        "timestamp": new Date()
    }

    //bypass data for testing not added to real db
    if (req.user.email == 'testadmin@kishan.com') {
        return res.json({ 'message': 'Add Product Succesfull', 'data': 'You are testing datbase product not added' })
    }

    const newBuyRequest = await new productBuyRequestSchema(buyRequest).save()
    const newOrderRequest = await new productOrderRequestSchema(orderRequest).save()
    const notificationSeller = await new notificationSchema(newNotificationSeller).save()
    const notificationBuyer = await new notificationSchema(newNotificationBuyer).save()
    

    return res.status(200).json({ 'message': 'Product order Succesfull wait for acceptance',"orderRequest":newOrderRequest,"buyRequst":newBuyRequest,"sellerNotification":notificationSeller,"buyerNotification":notificationBuyer})
}


const viewBuyProductRequest = async(req,res)=> {
    const sortByTimestampDesc = {'_id': -1}
    const request = await productBuyRequest.find({
        "seller_id":req.user.id,
        "status": "pending"
    }).sort(sortByTimestampDesc)

    return res.status(200).json({ 'message': 'Product order buy request view succesfully','data':request})
}

const acceptOrder = async(req,res)=>{

    return res.status(200).json({ 'message': 'Product order accepted succesfully'})
}


const viewOrderRequest = async(req,res)=> {
    return res.status(200).json({ 'message': 'Product order request view succesfully'})
}



module.exports = {orderProduct,viewBuyProductRequest,acceptOrder,viewOrderRequest}
