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

    const { productId } = req.body

    const product =  await productSchema.findOne({ "_id":productId });

    if(!product){
        res.json({'message':"Product not find"})
    }

    console.log(product)
   
    
    
    res.json({ 'message': 'Product order Succesfull wait for acceptance'})
}

module.exports = {testView, orderProduct}
