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
const commentProduct  = async (req,res) => {
    //req.user.id
    const { productId,comment} = req.body
    const commentExist = await commentSchema.findOne({ "productId":productId })
    const product = await productSchema.findById(productId)

    
    if(commentExist){
        
        
        const singleComment = {
            'userId': req.user.id,
            'userName': req.user.fullname,
            'comments': comment,
            'isVisible': true,
            'replyComment': []

        }
        commentExist.comments.push(singleComment)

        const updatedComment = await commentSchema.findByIdAndUpdate(commentExist._id, commentExist, { new: true})

        const newNotificationSeller = {
            "user_id": product.seller_id,
            "message": `userid:${req.user.id} Name:${req.user.fullname} commented on your productId: ${productId}`,
            "type": "product_comment",
            "timestamp": new Date()
        }
        const notificationSeller = await new notificationSchema(newNotificationSeller).save()

        return res.status(200).json({ 'message': 'Product comment done succesfully','comment': updatedComment})
        
    }else {
        const singleComment = {
            'userId': req.user.id,
            'userName': req.user.fullname,
            'comments': comment,
            'isVisible': true,
            'replyComment': []

        }
        const newComment = {
            productId:productId,
            comments: [singleComment]

        }
        const commentSave = new commentSchema(newComment).save()

        return res.status(200).json({ 'message': 'Product comment done succesfully','comment': commentSave})
    }
    

}


const viewCommentsProduct = async (req,res) => {

    const {productId} = req.query
    const comments = await commentSchema.findOne({ "productId":productId })
    if(comments){
        console.log(comments.comments.length)
        return res.status(200).json({ 'message': 'Comment fetch succesfylly','comments': comments,'count':comments.comments.length})
    } else {
        return res.status(200).json({ 'message': 'This product has no comment yet'})
    }

}

module.exports = {commentProduct, viewCommentsProduct}