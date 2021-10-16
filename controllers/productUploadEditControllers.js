const product = require('../model/productModel')
const productSchema = require('../model/productModel')
var mongoose = require('mongoose');

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()
const test = ((req, res) => {
    res.json({ 'message': 'Test succesfull' })
})



const addProducts = async (req, res) => {

    const { name, description,category,subCategory,image,image2,image3,video,unitname, unitPrize,bookingPercentage, available, minOrder, availableDate,expireDate, division, district, upazilla, isAvailableNow } = req.body

    const newProduct = {
        "seller_id": req.user.id,
        "name": name,
        "description": description,
        "category":category,
        "subCategory":subCategory,
        "image":image,
        "image2":image2,
        "image3":image3,
        "video":video,
        "reVerificationMessage":'none',
        "unitName": unitname,
        "unitPrize": unitPrize,
        "bookingPercentage": bookingPercentage,
        "available": available,
        "minOrder": minOrder,
        "rating": 0,
        "ratingCount":0,
        "availableDate": availableDate,
        "expireDate": expireDate,
        "division": division,
        "district": district,
        "upazilla": upazilla,
        "isVerified": false,
        "isAvailableNow": isAvailableNow
    }

    //bypass data for testing not added to real db
    if (req.user.email == 'testadmin@kishan.com') {
        return res.json({ 'message': 'Add Product Succesfull', 'data': 'You are testing datbase product not added' }).status(201)
    }

    //stop the user if avaiable date is longer and isAvailable true
    todayDate = new Date()
    availDate = new Date(newProduct.availableDate)
    if ( availDate.getTime() > todayDate.getTime() && newProduct.isAvailableNow == true) {
        return res.json({ 'message': 'Product not added', 'data': 'You cannot on the availability with future available date' }).status(201)
    }

    const result = await new productSchema(newProduct).save()

    const notificationMessage = `Seller id:${req.user.id} added product id:${result._id} for verification`

    const newNotificationAdmin = {
        "user_role": "admin",
        "message": notificationMessage,
        "type": "product_verification",
        "timestamp": new Date()
    }

    const newNotificationManager = {
        "user_role": "manager",
        "message": notificationMessage,
        "type": "product_verification",
        "timestamp": new Date()
    }
    const notificationResultAdmin = await new notificationSchema(newNotificationAdmin).save()
    const notificationResultManager = await new notificationSchema(newNotificationManager).save()

    res.json({ 'message': 'Add Product Succesfull', 'data': result, 'notificationAdmin': notificationResultAdmin, 'notificationManager': notificationResultManager }).status(201)
}



const editProducts = async (req, res) => {
    const { id } = req.query
    const product = req.body
    product.isVerified = false
    product.timestamp = new Date()

   

   //check if product exist
    const existingProduct = await productSchema.findById(mongoose.Types.ObjectId(id))

    
    

    if(!existingProduct) return res.status(400).json({ message: "Product doesn't exist"})
    
    if(existingProduct.seller_id != req.user.id){
        return res.status(400).json({ 'message': 'This is not your product' })
    }
    //bypass data for testing not added to real db
    if (req.user.email == 'testadmin@kishan.com') {
        return res.status(200).json({ 'message': 'Edit Product Succesfull', 'data': 'You are testing datbase product not added' })
    }
    const updatedProduct = await productSchema.findByIdAndUpdate(id, { ...product,id}, { new: true})

    const notificationMessage = `Seller id:${updatedProduct.seller_id} updated product id:${updatedProduct._id} please check for verify`

    const newNotificationAdmin = {
        "user_role": "admin",
        "message": notificationMessage,
        "type": "product_verification",
        "timestamp": new Date()
    }

    const newNotificationManager = {
        "user_role": "manager",
        "message": notificationMessage,
        "type": "product_verification",
        "timestamp": new Date()
    }

    
    const notificationResultAdmin = await new notificationSchema(newNotificationAdmin).save()
    const notificationResultManager = await new notificationSchema(newNotificationManager).save()


    return res.json({ 'message': 'Edit Product Succesfull' ,'date':updatedProduct,'notificationAdmin': notificationResultAdmin, 'notificationManager': notificationResultManager})
}



const productVerify = async (req, res) => {

    const {productId,isVerified,message} = req.body

   

    const product = await productSchema.findOneAndUpdate(
        {
            _id: productId,
        },
        {
            isVerified:isVerified,
            reVerificationMessage:'none',
        },
        {
            new: true
        }
    )
    

    
    const notificationMessage = message
    const newNotificationSeller = {
        "user_id": product.seller_id,
        "user_role": "customer",
        "message": notificationMessage,
        "type": "product_verification",
        "timestamp": new Date()
    }

    //bypass data for testing not added to real db
    if (req.user.email == 'testadmin@kishan.com') {
        return res.json({ 'message': 'Verify Product Succesfull','data':'This test admin not hit main db'})
    }
  
    const notificationResultSeller = await new notificationSchema(newNotificationSeller).save()

    res.json({ 'message': 'Verify Product Succesfull','data':product,'notificationSeller': notificationResultSeller})
}

const productViewAdmin = async (req, res) => {
    const sortByTimestampDesc = {'_id': -1}
    const products = await product.find({
        "isVerified": false
    }).sort(sortByTimestampDesc)

    res.json({ 'message': 'View Product by admin Succesfull', 'data': products })

}

const productVerifyCancel = async (req,res) => {

    const {productId,message} = req.body
    
    const product = await productSchema.findOneAndUpdate(
        {
            _id: productId,
        },
        {
            reVerificationMessage:message,
        },
        {
            new: true
        }
    )

    const newNotificationSeller = {
        "user_id": product.seller_id,
        "user_role": "customer",
        "message": `Your product id:${productId} need to reviewed for ${message}`,
        "type": "product_verification",
        "timestamp": new Date()
    }

  
    const notificationResultSeller = await new notificationSchema(newNotificationSeller).save()

    res.json({ 'message': 'Verify Product Cance Succesfull','data':product,'notificationSeller': notificationResultSeller})



}


module.exports = { test, addProducts, editProducts, productVerify, productViewAdmin, productVerifyCancel }