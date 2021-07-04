let express = require('express');
let cookieParser = require('cookie-parser');
//setup express app
const app = express()
app.use(cookieParser())

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const alert = require('alert');



const isLoggedIn = (req,res,next) => {

    next()
}
