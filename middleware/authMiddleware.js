let express = require('express');
let cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
//setup express app
const app = express()
app.use(cookieParser())
const dotenv = require('dotenv')
dotenv.config()

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const alert = require('alert');
const { JsonWebTokenError } = require('jsonwebtoken');



const isLoggedIn = (req,res,next) => {

    const autheHeader = req.headers['authorization']
    const token = autheHeader && autheHeader.split(' ')[1]

    if (token== null) return res.status(401).json({'message':'Token invalid'})

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,tokenUser)=>{
        if (err) return res.status(403).json({'message':err})
        req.user = tokenUser
        next()
    })


    
}

const isSuperAdmin = (req,res,next) => {

   
    const autheHeader = req.headers['authorization']
    const token = autheHeader && autheHeader.split(' ')[1]

    if (token== null) return res.status(401).json({'message':'Token invalid'})

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,tokenUser)=>{
        if (err) return res.status(403).json({'message':err})
        console.log(tokenUser.user_role)
        if(tokenUser.user_role =='super_admin'){
            req.user = tokenUser
            next()
        }
        else{
            res.status(400).json({'message':'You are not superadmin'})
        }
       
    })


    
}


const isAdmin = (req,res,next) => {

   
    const autheHeader = req.headers['authorization']
    const token = autheHeader && autheHeader.split(' ')[1]

    if (token== null) return res.status(401).json({'message':'Token invalid'})

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,tokenUser)=>{
        if (err) return res.status(403).json({'message':err})
        console.log(tokenUser.user_role)
        if(tokenUser.user_role =='admin'){
            req.user = tokenUser
            next()
        }
        else{
            res.status(400).json({'message':'You are not admin'})
        }
        
       
    })


    
}

const isOperator = (req,res,next) => {

   
    const autheHeader = req.headers['authorization']
    const token = autheHeader && autheHeader.split(' ')[1]

    if (token== null) return res.status(401).json({'message':'Token invalid'})

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,tokenUser)=>{
        if (err) return res.status(403).json({'message':err})
        console.log(tokenUser.user_role)
        if(tokenUser.user_role =='operator'){
            req.user = tokenUser
            next()
        }else{
            res.status(400).json({'message':'You are not operator'})
        }
        
       
    })


    
}
module.exports = { isLoggedIn, isSuperAdmin,isAdmin,isOperator}
