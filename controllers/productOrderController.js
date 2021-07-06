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


const orderProduct = async(req,res) => {

    

   
    // //pass req.query for filter as req.query want
    
    // const sortByTimestampDesc = {'_id': -1}
    // const products = await product.find(
    //     req.query
    // ).sort(sortByTimestampDesc)
    
    res.json({ 'message': 'Product order Succesfull wait for acceptance'})
}

module.exports = {testView, orderProduct}
