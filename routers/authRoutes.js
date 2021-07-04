const express = require('express')
const router = express.Router()



const isLoggedIn = require('../middleware/authMiddleware')

const { test,databaseTest } = require('../controllers/authControllers')





router.get('/',test)
router.post('/',databaseTest)

module.exports = router