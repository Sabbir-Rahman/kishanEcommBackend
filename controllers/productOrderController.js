const User =  require('../model/userModel')
const userRole = require('../model/userRole')
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

    const user = await User.findOne({ "_id":req.user.id })

    if(!product){
        return res.status(400).json({'message':"Product not find"})
    }

    if(quantity< product.minOrder){
        return res.status(400).json({'message':"Please order atleast the minimum amount"}).status(400)
    }

    const buyRequest = {
        "product_id": productId,
        "productName": product.name,
        "buyer_id": req.user.id,
        "buyerName": req.user?.fullname,
        "buyerAddress": user?.address,
        "buyerPhone": user?.phone_no,
        "buyerEmail": req.user.email,
        "buyingQuantityUnit": product.unitName,
        "buyingQuantity": quantity,
        "buyingMoney": product.unitPrize * quantity,
        "status" : "pending",

        
    }

    const orderRequest = {
        "product_id": productId,
        "productName": product.name,
        "seller_id": product.seller_id,
        "buyingQuantityUnit": product.unitName,
        "buyingQuantity": quantity,
        "buyingMoney": product.unitPrize * quantity,
        "status" : "pending",
    }

    console.log(orderRequest)
    
    
   
    
    
    return res.status(200).json({ 'message': 'Product order Succesfull wait for acceptance'})
}

module.exports = {testView, orderProduct}
