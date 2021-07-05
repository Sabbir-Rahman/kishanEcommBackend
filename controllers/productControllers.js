const product = require('../model/productModel')
const productSchema = require('../model/productModel')

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()
const test = ((req, res) => {
    res.json({ 'message': 'Test succesfull' })
})

const viewAllProducts = async (req, res) => {
    

    res.json({ 'message': 'View Product Succesfull'})
}

const addProducts = async (req, res) => {

    const { name, description, unitname, unitPrize, available, minOrder, availableDate, division, district, upazilla, isAvailableNow } = req.body

    const newProduct = {
        "seller_id": req.user.id,
        "name": name,
        "description": description,
        "unitName": unitname,
        "unitPrize": unitPrize,
        "available": available,
        "minOrder": minOrder,
        "availableDate": availableDate,
        "division": division,
        "district": district,
        "upazilla": upazilla,
        "isVerified": false,
        "isAvailableNow": false
    }


    if (req.user.email == 'testadmin@kishan.com') {
        res.json({ 'message': 'Add Product Succesfull', 'data': 'You are testing datbase product not added' }).status(201)
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
    res.json({ 'message': 'Edit Product Succesfull' })
}

const productVerify = async (req, res) => {

    const {productId,isVerified,message} = req.body

   

    const product = await productSchema.findOneAndUpdate(
        {
            _id: productId,
        },
        {
            isVerified:isVerified,
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

    
    if (req.user.email == 'testadmin@kishan.com') {
        res.json({ 'message': 'Verify Product Succesfull','data':'This test admin not hit main db'})
    }
  
    const notificationResultSeller = await new notificationSchema(newNotificationSeller).save()

    res.json({ 'message': 'Verify Product Succesfull','data':product,'notificationSeller': notificationResultSeller})
}

const productViewAdmin = async (req, res) => {
    const products = await product.find({
        "isVerified": false
    })

    res.json({ 'message': 'View Product by admin Succesfull', 'data': products })

}


module.exports = { test, viewAllProducts, addProducts, editProducts, productVerify, productViewAdmin }