const User = require("../model/userModel");
const userRole = require("../model/userRole");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const dotenv = require("dotenv");
dotenv.config();
const notification = require("../model/notificationModel");

const test = (req, res) => {
  res.send("Hello this is from notification");
};


const getUserNotification = async(req,res) => {
    const sortByTimestampDesc = { _id: -1 };
    const notifications = await notification.find({user_id: req.user.id}).sort(sortByTimestampDesc);

    res.json({ message: "View Notification Succesfull", data: notifications });
}


module.exports = {getUserNotification}