const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/authMiddleware").isLoggedIn;

const {getUserNotification} = require("../controllers/notificationController")


router.use('/view',isLoggedIn)

router.get('/view',getUserNotification)

module.exports = router
