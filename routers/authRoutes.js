const express = require('express')
const router = express.Router()



const isLoggedIn = require('../middleware/authMiddleware')

const { test,databaseTest, userRegister, userLogin } = require('../controllers/authControllers')





router.get('/',test)
router.post('/',databaseTest)
router.post('/register',userRegister)
router.post('/login',userLogin)

module.exports = router