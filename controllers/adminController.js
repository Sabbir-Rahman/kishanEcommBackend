const User =  require('../model/userModel')
const userRole = require('../model/userRole')
const product = require('../model/productModel')
const productSchema = require('../model/productModel')
const productOrderRequest = require('../model/productOrderRequestModel')
const productOrderRequestSchema = require('../model/productOrderRequestModel')
const productBuyRequest = require('../model/productBuyRequestModel')
const productBuyRequestSchema = require('../model/productBuyRequestModel')
const reportModel = require('../model/reportModel')
const reportSchema = require('../model/reportModel')
var mongoose = require('mongoose');

const notification = require('../model/notificationModel')
const notificationSchema = require('../model/notificationModel')

const dotenv = require('dotenv')
dotenv.config()

//buyer can rate the product
const report = async(req,res) => {
    const { message } = req.body
    const newReport = {
        userId: req.user.id,
        message : message
    }

    const result = await new reportSchema(newReport).save()


    

    
    adminNotificationMessage = `One report is submit by user id: ${req.user.id}`

    

    const newNotificationAdmin = {
        "user_id": req.user.id,
        "user_role": 'admin',
        "message": adminNotificationMessage,
        "type": "report",
        "timestamp": new Date()
    }

    const notificationAdmin = await new notificationSchema(newNotificationAdmin).save()

    return res.status(200).json({ 'message': 'Report done succesfully'})

}

const customNotification = async(req,res) => {
    const { message,userId,userRole } = req.body

    let newNotification;
    if(userId){
        newNotification = {
            "user_id": userId,
            "message": message,
            "type": "admin_notification",
            "timestamp": new Date()
        }
    }else{
        newNotification = {
            "user_role": userRole,
            "message": message,
            "type": "admin_notification",
            "timestamp": new Date()
        }
    }
    

    

    const notification = await new notificationSchema(newNotification).save()

    return res.status(200).json({ 'message': 'Notification done succesfully'})

}

module.exports = { report,customNotification }