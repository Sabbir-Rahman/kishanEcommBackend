const express = require('express')
const router = express.Router()



const isLoggedIn = require('../middleware/authMiddleware')

const { test,databaseTest, userRegister, userLogin,authTest } = require('../controllers/authControllers')


router.use('/check',isLoggedIn)


router.get('/',test)
router.get('/check',authTest)
router.post('/',databaseTest)
router.post('/register',userRegister)
router.post('/login',userLogin)

module.exports = router