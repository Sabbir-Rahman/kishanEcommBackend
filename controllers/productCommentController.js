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
    
    if(commentExist){
        console.log(commentExist.productId)
        
        const singleComment = {
            'userId': req.user.id,
            'comments': comment,
            'isVisible': true,
            'replyComment': []

        }
        commentExist.comments.push(singleComment)

        const updatedComment = await commentSchema.findByIdAndUpdate(commentExist._id, commentExist, { new: true})

        console.log(updatedComment)

        //const commentSave = new commentSchema(newComment).save()
    }else {
        const singleComment = {
            'userId': req.user.id,
            'comments': comment,
            'isVisible': true,
            'replyComment': []

        }
        const newComment = {
            productId:productId,
            comments: [singleComment]

        }
        const commentSave = new commentSchema(newComment).save()

        console.log('commentSave')
    }
    


    // const comment = {
    //     productId: productId,
    //     comments : {

    //     }
    // }

}

module.exports = {commentProduct}