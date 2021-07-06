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

const testView = ((req, res) => {
    res.json({ 'message': 'View Test succesfull' })
})


const bookingMoneyPayment = async(req,res)=> {
    return res.status(200).json({ 'message': 'Product order booking succesfully'})
}

const sslCommerze = async(req,res) {
    return res.status(200).json({ 'message': 'Ssl commerce payment succesfully'})
}

module.exports = {testView, bookingMoneyPayment, sslCommerze}
