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

const bookingPaymentInfo = async(req,res)=> {
    const {productId} = req.query

    //pass req.query for filter as req.query want
    const sortByTimestampDesc = {'_id': -1}
    const request = await productOrderRequest.findOne({
        "product_id":productId,
        "buyer_id": req.user.id,
        "status":"accepted"
    }).sort(sortByTimestampDesc)

    return res.status(200).json({ 'message': 'Booking money payment view succesfully succesfully','data':request})
}

const bookingMoneyPayment = async(req,res)=> {
    return res.status(200).json({ 'message': 'Product order booking succesfully'})
}

const sslCommerze = async(req,res) =>{
    return res.status(200).json({ 'message': 'Ssl commerce payment succesfully'})
}

module.exports = {bookingMoneyPayment, bookingPaymentInfo,sslCommerze}
