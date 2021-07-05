const product = require('../model/productModel')
const productSchema = require('../model/productModel')

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()
const test = ((req,res) => {
    res.json({'message':'Test succesfull'})
})

const viewAllProducts = async(req,res) => {
    
    res.json({'message':'View Product Succesfull'})
}

const addProducts = async (req,res) => {
    
    const {name,description,unitname,unitPrize,available,minOrder,availableDate,division,district,upazilla,isAvailableNow} = req.body
    
    const newProduct = {
        "seller_id": req.user.id,
        "name":name,
        "description": description,
        "unitName": unitname,
        "unitPrize": unitPrize,
        "available": available,
        "minOrder": minOrder,
        "availableDate":availableDate,
        "division": division,
        "district": district,
        "upazilla": upazilla,
        "isVerified": false,
        "isAvailableNow": false
    }
    

    if(req.user.email=='testadmin@kishan.com')
    {
        res.json({'message':'Add Product Succesfull','data':'You are testing datbase product not added'}).status(201)
    }
    
    const result =  await new productSchema(newProduct).save()

    const notificationMessage = `Seller id:${req.user.id} added product id:${result._id} for verification`

    const newNotification = {
        "user_role": "admin",
        "message": notificationMessage,
        "type": "product_verification"
    }
    const notificationResult = await new notificationSchema(newNotification).save()

    res.json({'message':'Add Product Succesfull','data':result,'notification':notificationResult}).status(201)
}

const editProducts = async (req,res) => {
    res.json({'message':'Edit Product Succesfull'})
}

const productVerify = async (req,res) => {
    res.json({'message':'Verify Product Succesfull'})
}

const productViewAdmin = async (req,res) => {
    res.json({'message':'View Product Succesfull'})
}


module.exports = {test,viewAllProducts,addProducts,editProducts,productVerify,productViewAdmin}