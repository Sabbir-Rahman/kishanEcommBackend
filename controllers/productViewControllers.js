const product = require('../model/productModel')
const productSchema = require('../model/productModel')
var mongoose = require('mongoose');

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()

const testView = ((req, res) => {
    res.json({ 'message': 'View Test succesfull' })
})


const viewAllProduct = async(req,res) => {

    req.query.isVerified = true
    

   
    //pass req.query for filter as req.query want
    
    const sortByTimestampDesc = {'_id': -1}
    const products = await product.find(
        req.query
    ).sort(sortByTimestampDesc)
    
    res.json({ 'message': 'View Product by anyone Succesfull', 'data': products })
}

module.exports = {testView, viewAllProduct}
