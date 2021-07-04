const express = require('express')
const router = express.Router()

const isLoggedIn = require('../middleware/authMiddleware')

const { test } = require('../controllers/authControllers')
const { route } = require('../app')


router.get('/',test)

module.exports = router