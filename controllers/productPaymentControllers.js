const User =  require('../model/userModel')
const userRole = require('../model/userRole')
const product = require('../model/productModel')
const productSchema = require('../model/productModel')
const productOrderRequest = require('../model/productOrderRequestModel')
const productOrderRequestSchema = require('../model/productOrderRequestModel')
const productBuyRequest = require('../model/productBuyRequestModel')
const productBuyRequestSchema = require('../model/productBuyRequestModel')
const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment
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

const sslCommerze = async(req,res,next)=>{

    const {productId} = req.query

    //pass req.query for filter as req.query want
    const sortByTimestampDesc = {'_id': -1}
    const request = await productOrderRequest.findOne({
        "product_id":productId,
        "buyer_id": req.user.id,
        "status":"accepted"
    }).sort(sortByTimestampDesc)

    if(!request){
        return res.status(400).json({'message':'Product not find or you are not allowed to pay'})
    }

    const data = {
        total_amount: request.bookingMoney,
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: 'http://127.0.0.1:5000/product/ssl-commerze/success',
        fail_url: 'http://127.0.0.1:5000/product/ssl-commerze/fail',
        cancel_url: 'http://127.0.0.1:5000/product/ssl-commerze/cancel',
        ipn_url: 'http://127.0.0.1:5000/product/ssl-commerze/ipn',
        shipping_method: 'Courier',
        product_name: request.productName,
        product_category: 'Agricultural',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: productId,
        value_b: req.user.id,
        value_c: request.seller_id,
        value_d: request.buyingQuantity
    };

    
    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID,process.env.PASSWORD, false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
      
        if(data?.GatewayPageURL){
            return res.status(200).json({'url':(data?.GatewayPageURL),'data':data})
        }else{
            return res.status(400).json({'message':'Session fail'})
        }
        
    });

    
}

const sslCommerzeSuccess = async(req,res,next)=>{
    return res.status(200).json({ 'message': 'Ssl commerce payment succesfully','data':req.body})
}

const sslCommerzeFail = async(req,res,next)=>{
    return res.status(200).json({ 'message': 'Ssl commerce payment fail','data':req.body})
}
const sslCommerzeCancel = async(req,res,next)=>{
    return res.status(200).json({ 'message': 'Ssl commerce payment cancel','data':req.body})
}
const sslCommerzeIpn = async(req,res,next)=>{
    return res.status(200).json({ 'message': 'Ssl commerce payment Ipn','data':req.body})
}


module.exports = {bookingMoneyPayment, bookingPaymentInfo,sslCommerze,sslCommerzeSuccess,sslCommerzeFail,sslCommerzeCancel,sslCommerzeIpn,}
