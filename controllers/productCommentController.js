const User =  require('../model/userModel')
const userRole = require('../model/userRole')
const product = require('../model/productModel')
const productSchema = require('../model/productModel')
const productOrderRequest = require('../model/productOrderRequestModel')
const productOrderRequestSchema = require('../model/productOrderRequestModel')
const productBuyRequest = require('../model/productBuyRequestModel')
const productBuyRequestSchema = require('../model/productBuyRequestModel')
const productComment = require('../model/productCommentModel')
const commentSchema = require('../model/productCommentModel')

var mongoose = require('mongoose');

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()

//any login user can comment on the product
const commentProduct  = async(req,res) => {
    //req.user.id
    const { productId,comment} = req.body
    const comment = await commentSchema.findOne({ "_id":productId })
    console.log(comment)
    // const comment = {
    //     productId: productId,
    //     comments : {

    //     }
    // }

}