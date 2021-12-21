const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/authMiddleware").isLoggedIn;


const { report,customNotification } = require('../controllers/adminController')


router.use('/',isLoggedIn)

router.post('/report',report)
router.post('/customnotification',customNotification)

module.exports = router
