const User =  require('../model/userModel')
const userRole = require('../model/userRole')
const product = require('../model/productModel')
const productSchema = require('../model/productModel')
const productOrderRequest = require('../model/productOrderRequestModel')
const productOrderRequestSchema = require('../model/productOrderRequestModel')
const productBuyRequest = require('../model/productBuyRequestModel')
const productBuyRequestSchema = require('../model/productBuyRequestModel')
var mongoose = require('mongoose');

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()




const orderProduct = async(req,res) => {

    const { productId,quantity} = req.body

    const product =  await productSchema.findOne({ "_id":productId });
    
    const existingPendingProductRequest = await productBuyRequest.findOne({
        "product_id": productId,
        "buyer_id": req.user.id,
        "status":"pending"
    })

    const existingAcceptedProductRequest = await productBuyRequest.findOne({
        "product_id": productId,
        "buyer_id": req.user.id,
        "status":"accepted"
    })

    // const existingBookedProductRequest = await productBuyRequest.findOne({
    //     "product_id": productId,
    //     "buyer_id": req.user.id,
    //     "status":"booked"
    // })

   
    //bypass logic for admin
    if(existingPendingProductRequest || existingAcceptedProductRequest ){
        console.log('hit')
        return res.status(400).json({'message':"You have a not paid order for the same product please complete it first"})
    }

    const user = await User.findOne({ "_id":req.user.id })

    //default booking percentage
    var bookingPercentage = 10

    if(!product){
        return res.status(400).json({'message':"Product not find"})
    }

    if(!quantity){
        return res.status(400).json({'message':"You must add quantity"})
    }

    if(quantity< product.minOrder){
        return res.status(400).json({'message':"Please order atleast the minimum amount"})
    }

    if(quantity> product.available){
        return res.status(400).json({'message':"Please order less than available amount"})
    }
    if (req.user.email == 'testbuyer@kishan.com'){
        return res.status(200).json({'message':"Endpoint ok no data added for test buyer"})
    }

    if(product.bookingPercentage){
        bookingPercentage = product.bookingPercentage
    }


    const buyRequest = {
        "product_id": productId,
        "productName": product.name,
        "buyer_id": req.user.id,
        "seller_id": product.seller_id,
        "buyerName": req.user?.fullname,
        "buyerAddress": user?.address,
        "buyerPhone": user?.phone_no,
        "buyerEmail": req.user.email,
        "buyingQuantityUnit": product.unitName,
        "buyingQuantity": quantity,
        "buyingMoney": product.unitPrize * quantity,
        "bookingMoney": (product.unitPrize * quantity)* (bookingPercentage/100),
        "status" : "pending",

        
    }

    const orderRequest = {
        "product_id": productId,
        "productName": product.name,
        "buyer_id": req.user.id,
        "seller_id": product.seller_id,
        "buyingQuantityUnit": product.unitName,
        "buyingQuantity": quantity,
        "buyingMoney": product.unitPrize * quantity,
        "bookingMoney": (product.unitPrize * quantity)* (bookingPercentage/100),
        "status" : "pending",
    }

    sellerNotificationMessage = `আপনার পণ্য- আইডি:${productId} নাম:${product.name} অর্ডার করা হয়েছে। পরিমাণ:${quantity} ${product.unitName}.`

    buyerNotificationMessage = `আপনার অর্ডার- আইডি:${productId} নাম:${product.name} স্থাপন করা হয়েছে। বিক্রেতার সম্মতির জন্য অপেক্ষা করুন।`

    const newNotificationSeller = {
        "user_id": product.seller_id,
        "message": sellerNotificationMessage,
        "type": "product_buying_request",
        "timestamp": new Date()
    }

    const newNotificationBuyer = {
        "user_id": req.user.id,
        "message": buyerNotificationMessage,
        "type": "product_order_request",
        "timestamp": new Date()
    }


    const newBuyRequest = await new productBuyRequestSchema(buyRequest).save()
    const newOrderRequest = await new productOrderRequestSchema(orderRequest).save()
    const notificationSeller = await new notificationSchema(newNotificationSeller).save()
    const notificationBuyer = await new notificationSchema(newNotificationBuyer).save()
    

    return res.status(200).json({ 'message': 'Product order Succesfull wait for acceptance',"orderRequest":newOrderRequest,"buyRequst":newBuyRequest,"sellerNotification":notificationSeller,"buyerNotification":notificationBuyer})
}


const viewBuyProductRequest = async(req,res)=> {

    req.query.seller_id = req.user.id

    //pass req.query for filter as req.query want
    const sortByTimestampDesc = {'_id': -1}
    const request = await productBuyRequest.find(
        req.query
    ).sort(sortByTimestampDesc)

    return res.status(200).json({ 'message': 'Product order buy request view succesfully','data':request})
}

const acceptOrder = async(req,res)=>{

    const { productId } = req.body

    
    const requestBuy = await productBuyRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            seller_id:req.user.id,
            status: "pending"
        },
        {
            status: "accepted"
        },
        {
            new: true
        }
    )

    const requestOrder = await productOrderRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            seller_id:req.user.id,
            status: "pending"
        },
        {
            status: "accepted"
        },
        {
            new: true
        }
    )
    if(!requestOrder||!requestBuy){
        return res.status(400).json({ 'message': 'Product not find for in your buy request'})
    }

    const product = await productSchema.findById(productId)


    //auto adjust the quantity
    const productUpdate = await productSchema.findOneAndUpdate(
        {
            _id: productId,
        
        },
        {
            available: product.available-requestBuy.buyingQuantity
        },
        {
            new: true
        }
    )    

    sellerNotificationMessage = `পণ্য আইডি:${requestBuy.product_id} নাম:${requestBuy.productName} বিক্রয়ের জন্য সম্মতি দেয়া হয়েছে।`
    buyerNotificationMessage = `আপনার অর্ডার- আইডি:${requestOrder.product_id} নাম:${requestOrder.productName} বিক্রয় করতে বিক্রেতা সম্মত হয়েছেন। অনুগ্রহ করে বুকিং মানি পরিশোধ করুন। বুকিং মানির পরিমাণ:${requestOrder.bookingMoney}`

    const newNotificationSeller = {
        "user_id": req.user.id,
        "message": sellerNotificationMessage,
        "type": "product_buying_request",
        "timestamp": new Date()
    }

    const newNotificationBuyer = {
        "user_id": req.user.id,
        "message": buyerNotificationMessage,
        "type": "product_order_request",
        "timestamp": new Date()
    }

   
    
    const notificationSeller = await new notificationSchema(newNotificationSeller).save()
    const notificationBuyer = await new notificationSchema(newNotificationBuyer).save()

    
    return res.status(200).json({ 'message': 'Product order accepted succesfully','dataBuyRequest':requestBuy,'dataOrderRequest':requestOrder,'sellerNotification':notificationSeller,'buyerNotificationMessage':notificationBuyer})
}


const cancelOrder = async(req,res)=>{

    const { productId,message } = req.body

    
    const requestBuy = await productBuyRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            seller_id:req.user.id,
            status: "pending"
        },
        {
            status: "cancel"
        },
        {
            new: true
        }
    )

    const requestOrder = await productOrderRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            seller_id:req.user.id,
            status: "pending"
        },
        {
            status: "cancel"
        },
        {
            new: true
        }
    )
    if(!requestOrder||!requestBuy){
        return res.status(400).json({ 'message': 'Product not find for in your buy request'})
    }

    const product = await productSchema.findById(productId)


    //auto adjust the quantity
    const productUpdate = await productSchema.findOneAndUpdate(
        {
            _id: productId,
        
        },
        {
            available: product.available+requestBuy.buyingQuantity
        },
        {
            new: true
        }
    )    

    sellerNotificationMessage = `পণ্য আইডি:${requestBuy.product_id} নাম:${requestBuy.productName} বিক্রয়ের জন্য সম্মতি den ni`
    buyerNotificationMessage = `আপনার অর্ডার- আইডি:${requestOrder.product_id} নাম:${requestOrder.productName} বিক্রয় করতে বিক্রেতা সম্মত hon ni karon ${message}`

    const newNotificationSeller = {
        "user_id": req.user.id,
        "message": sellerNotificationMessage,
        "type": "product_buying_request",
        "timestamp": new Date()
    }

    const newNotificationBuyer = {
        "user_id": req.user.id,
        "message": buyerNotificationMessage,
        "type": "product_order_request",
        "timestamp": new Date()
    }

   
    
    const notificationSeller = await new notificationSchema(newNotificationSeller).save()
    const notificationBuyer = await new notificationSchema(newNotificationBuyer).save()

    
    return res.status(200).json({ 'message': 'Product order cancel succesfully','dataBuyRequest':requestBuy,'dataOrderRequest':requestOrder,'sellerNotification':notificationSeller,'buyerNotificationMessage':notificationBuyer})
}


const viewOrderRequest = async(req,res)=> {

    req.query.buyer_id = req.user.id

    //pass req.query for filter as req.query want
    const sortByTimestampDesc = {'_id': -1}
    const request = await productOrderRequest.find(
        req.query
    ).sort(sortByTimestampDesc)


    return res.status(200).json({ 'message': 'Product order request view succesfully','data':request})
}


//change status to full payment by seller if buyer pay the full money
const orderPaymentConfirm = async(req,res)=>{

    const { productId } = req.body

    
    const requestBuy = await productBuyRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            seller_id:req.user.id,
            status: "booked"
        },
        {
            status: "paid"
        },
        {
            new: true
        }
    )

    const requestOrder = await productOrderRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            seller_id:req.user.id,
            status: "booked"
        },
        {
            status: "paid"
        },
        {
            new: true
        }
    )
    if(!requestOrder||!requestBuy){
        return res.status(400).json({ 'message': 'Product not find for in your buy request'})
    }


    sellerNotificationMessage = `পন্য- আইডি:${requestBuy.product_id} নাম:${requestBuy.productName} পেমেন্ট বুঝে পেয়েছেন।`

    buyerNotificationMessage = `পণ্য- আইডি:${requestOrder.product_id} নাম:${requestOrder.productName} এর জন্য পেমেন্ট বিক্রেতা বুঝে পেয়েছেন। অনুগ্রহ করে পণ্য বুঝে পেয়ে অর্ডার স্ট্যাটাস বদল করুন।`

    const newNotificationSeller = {
        "user_id": req.user.id,
        "message": sellerNotificationMessage,
        "type": "product_buying_request",
        "timestamp": new Date()
    }

    const newNotificationBuyer = {
        "user_id": req.user.id,
        "message": buyerNotificationMessage,
        "type": "product_order_request",
        "timestamp": new Date()
    }

   
    
    const notificationSeller = await new notificationSchema(newNotificationSeller).save()
    const notificationBuyer = await new notificationSchema(newNotificationBuyer).save()

    
    return res.status(200).json({ 'message': 'Product order payment confirmed succesfully','dataBuyRequest':requestBuy,'dataOrderRequest':requestOrder,'sellerNotification':notificationSeller,'buyerNotificationMessage':notificationBuyer})
}

//change status to complete by buyer if seller already confirm the payment
const orderComplete = async(req,res)=>{

    const { productId } = req.body

    
    const requestBuy = await productBuyRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            buyer_id:req.user.id,
            status: "paid"
        },
        {
            status: "complete"
        },
        {
            new: true
        }
    )

    const requestOrder = await productOrderRequestSchema.findOneAndUpdate(
        {
            product_id: productId,
            buyer_id:req.user.id,
            status: "paid"
        },
        {
            status: "complete"
        },
        {
            new: true
        }
    )
    if(!requestOrder||!requestBuy){
        return res.status(400).json({ 'message': 'Product not find for in your buy request'})
    }


    sellerNotificationMessage = `আপনার অর্ডার- আইডি::${requestBuy.product_id} নাম:${requestBuy.productName} সম্পন্ন হয়েছে। কিষাণের সাথে থাকার জন্য ধন্যবাদ।`

    buyerNotificationMessage = `আপনার অর্ডার- আইডি::${requestBuy.product_id} নাম:${requestBuy.productName} সম্পন্ন হয়েছে। আপনি এখন পণ্যের রেটিং দিতে পারবেন। কিষাণের সাথে থাকার জন্য ধন্যবাদ।`

    const newNotificationSeller = {
        "user_id": req.user.id,
        "message": sellerNotificationMessage,
        "type": "product_buying_request",
        "timestamp": new Date()
    }

    const newNotificationBuyer = {
        "user_id": req.user.id,
        "message": buyerNotificationMessage,
        "type": "product_order_request",
        "timestamp": new Date()
    }

   
    
    const notificationSeller = await new notificationSchema(newNotificationSeller).save()
    const notificationBuyer = await new notificationSchema(newNotificationBuyer).save()

    
    return res.status(200).json({ 'message': 'Product order complete confirmed succesfully. Please give the rating','dataBuyRequest':requestBuy,'dataOrderRequest':requestOrder,'sellerNotification':notificationSeller,'buyerNotificationMessage':notificationBuyer})
}




module.exports = {orderProduct,viewBuyProductRequest,acceptOrder,viewOrderRequest,orderPaymentConfirm, orderComplete, cancelOrder}
