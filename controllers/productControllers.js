const userRole = require('../model/userRole')
const User =  require('../model/userModel')
const jwt = require('jsonwebtoken')
const userRoleSchema = require('../model/userRole')
const userSchema = require('../model/userModel')

const dotenv = require('dotenv')
dotenv.config()
const test = ((req,res) => {
    res.json({'message':'Test succesfull'})
})

const viewAllProducts = async(req,res) => {
    
    res.json({'message':'View Product Succesfull'})
}

const addProducts = async (req,res) => {
    res.json({'message':'Add Product Succesfull'}).status(200)
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