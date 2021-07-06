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

    const { productId,quantity} = req.body

    const product =  await productSchema.findOne({ "_id":productId });

    if(!product){
        res.status(400).json({'message':"Product not find"})
    }

    if(quantity< product.minOrder){
        res.status(400).json({'message':"Please order atleast the minimum amount"}).status(400)
    }

    console.log(product.unitPrize * quantity)
   
    
    
    res.status(200).json({ 'message': 'Product order Succesfull wait for acceptance'})
}

module.exports = {testView, orderProduct}
