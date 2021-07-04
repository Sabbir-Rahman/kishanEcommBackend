const express = require('express')
const router = express.Router()



const isLoggedIn = require('../middleware/authMiddleware')

const { test,databaseTest, postRegister } = require('../controllers/authControllers')





router.get('/',test)
router.post('/',databaseTest)
router.post('/register',postRegister)

module.exports = router